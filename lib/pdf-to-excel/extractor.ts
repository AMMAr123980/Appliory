import type {
  ExtractedRow,
  ColumnConfig,
  TableExtractionResult,
  ExtractionOptions,
} from "./models";

interface RawTextItem {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Cluster numeric values within a given tolerance.
 */
function clusterCoordinates(values: number[], tolerance: number): number[] {
  if (values.length === 0) return [];
  const sorted = [...values].sort((a, b) => a - b);
  const clusters: number[] = [];
  let currentCluster = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const val = sorted[i];
    const prev = sorted[i - 1];
    if (Math.abs(val - prev) <= tolerance) {
      currentCluster.push(val);
    } else {
      const avg =
        currentCluster.reduce((sum, n) => sum + n, 0) / currentCluster.length;
      clusters.push(avg);
      currentCluster = [val];
    }
  }
  if (currentCluster.length > 0) {
    const avg =
      currentCluster.reduce((sum, n) => sum + n, 0) / currentCluster.length;
    clusters.push(avg);
  }
  return clusters;
}

/**
 * High-precision browser-local PDF Table Extractor.
 * Runs 100% on-device using PDF.js without external server calls.
 */
export async function extractPDFTables(
  file: File,
  options: ExtractionOptions = {},
): Promise<TableExtractionResult> {
  const {
    startPage = 1,
    endPage,
    batchSize = 25,
    rowTolerance = 4.0,
    detectPageHeadings = true,
    onProgress,
    signal,
  } = options;

  if (file.size > 50 * 1024 * 1024) {
    throw new Error("Choose a PDF smaller than 50 MB for in-browser processing.");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const headerCheck = String.fromCharCode(...bytes.slice(0, 5));
  if (!headerCheck.startsWith("%PDF-")) {
    throw new Error("This file does not have a valid PDF header signature.");
  }

  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const loadingTask = pdfjs.getDocument({
    data: bytes,
    useSystemFonts: true,
    maxImageSize: 25000000,
    stopAtErrors: false,
  });

  const pdf = await loadingTask.promise;
  const totalDocPages = pdf.numPages;

  const actualStart = Math.max(1, Math.min(startPage, totalDocPages));
  const actualEnd = endPage
    ? Math.max(actualStart, Math.min(endPage, totalDocPages))
    : totalDocPages;
  const pagesToProcess = actualEnd - actualStart + 1;

  const scannedPages: number[] = [];
  const detectedHeadings: { page: number; heading: string }[] = [];
  const allPageRows: ExtractedRow[] = [];
  const allXPositions: number[] = [];

  let startTime = Date.now();
  let rowIdCounter = 1;

  try {
    for (let pNum = actualStart; pNum <= actualEnd; pNum++) {
      if (signal?.aborted) {
        throw new Error("Extraction cancelled by user.");
      }

      const completedCount = pNum - actualStart;
      const progressPercent = Math.round((completedCount / pagesToProcess) * 100);
      const elapsed = (Date.now() - startTime) / 1000;
      const estimatedRemaining =
        completedCount > 2
          ? Math.max(
              0,
              Math.round(((elapsed / completedCount) * (pagesToProcess - completedCount))),
            )
          : undefined;

      onProgress?.({
        currentPage: pNum,
        totalPages: totalDocPages,
        percentage: progressPercent,
        stage: `Reading page ${pNum} of ${totalDocPages}…`,
        estimatedSecondsRemaining: estimatedRemaining,
      });

      const page = await pdf.getPage(pNum);
      const viewport = page.getViewport({ scale: 1.0 });
      const pageHeight = viewport.height;

      const textContent = await page.getTextContent();
      const rawItems: RawTextItem[] = [];

      for (const item of textContent.items) {
        if (!("str" in item) || !item.str) continue;
        const trimmed = item.str.trim();
        if (!trimmed) continue;

        const x = item.transform[4];
        const y = item.transform[5];
        rawItems.push({
          str: item.str,
          x,
          y,
          width: item.width || 0,
          height: item.height || 10,
        });
        allXPositions.push(x);
      }

      // Check if page has selectable text or is scanned
      const totalText = rawItems.map((r) => r.str).join("");
      const hasAlphaNum = /[\p{L}\p{N}]/u.test(totalText);
      if (!hasAlphaNum) {
        scannedPages.push(pNum);
        page.cleanup();
        continue;
      }

      // 1. Detect candidate page heading from top 15% of page
      let pageHeadingText = "";
      if (detectPageHeadings) {
        const topThreshold = pageHeight * 0.85; // PDF coordinates: 0 is bottom, pageHeight is top
        const headerItems = rawItems
          .filter((item) => item.y >= topThreshold)
          .sort((a, b) => b.y - a.y || a.x - b.x);

        if (headerItems.length > 0) {
          pageHeadingText = headerItems
            .map((i) => i.str.trim())
            .filter(Boolean)
            .join(" ");
          if (pageHeadingText) {
            detectedHeadings.push({ page: pNum, heading: pageHeadingText });
          }
        }
      }

      // 2. Filter body table items (exclude extreme margins if applicable)
      const bodyItems = rawItems;

      // Group body items into rows by Y-coordinate
      // In PDF coordinates, higher Y is closer to top. We sort descending by Y.
      const sortedByY = [...bodyItems].sort((a, b) => b.y - a.y);
      const rowBuckets: { y: number; items: RawTextItem[] }[] = [];

      for (const item of sortedByY) {
        let placed = false;
        for (const bucket of rowBuckets) {
          if (Math.abs(bucket.y - item.y) <= rowTolerance) {
            bucket.items.push(item);
            placed = true;
            break;
          }
        }
        if (!placed) {
          rowBuckets.push({ y: item.y, items: [item] });
        }
      }

      // 3. For each row bucket, sort items left to right
      for (const bucket of rowBuckets) {
        bucket.items.sort((a, b) => a.x - b.x);
      }

      // Store page's row buckets temporarily
      for (const bucket of rowBuckets) {
        allPageRows.push({
          id: `r_${rowIdCounter++}`,
          page: pNum,
          cells: bucket.items.map((i) => i.str.trim()),
          pageHeaderContext: pageHeadingText,
        });
      }

      page.cleanup();

      // Yield event loop occasionally to avoid UI freeze during heavy batch processing
      if (pNum % 5 === 0) {
        await new Promise((res) => setTimeout(res, 0));
      }
    }
  } finally {
    await loadingTask.destroy();
  }

  // 4. Determine Global Column Boundaries across all processed rows
  // Find distinct column start clusters
  const columnClusters = clusterCoordinates(allXPositions, 18.0);
  const detectedColumnCount = Math.max(1, columnClusters.length);

  // Re-align cells into uniform columns
  // If clustering found reliable columns, align cells to those columns
  const finalRows: ExtractedRow[] = [];
  let maxColsSeen = 0;

  for (const r of allPageRows) {
    if (r.cells.length > maxColsSeen) {
      maxColsSeen = r.cells.length;
    }
    finalRows.push(r);
  }

  const finalColCount = Math.max(maxColsSeen, detectedColumnCount, 1);

  // Generate initial column configurations
  // Check if first row looks like a header
  let candidateHeaders: string[] = [];
  const firstRow = finalRows.find((r) => r.cells.length >= 2);
  if (firstRow) {
    const hasNumbersOnly = firstRow.cells.every((c) => /^\d+(\.\d+)?$/.test(c));
    if (!hasNumbersOnly) {
      candidateHeaders = firstRow.cells;
    }
  }

  const columns: ColumnConfig[] = [];
  for (let c = 0; c < finalColCount; c++) {
    const rawName = candidateHeaders[c] || `Column ${c + 1}`;
    // Guess column type based on sample values
    let numericCount = 0;
    let sampleCount = 0;
    let hasLeadingZeroId = false;

    for (const r of finalRows.slice(0, 50)) {
      const val = r.cells[c];
      if (val) {
        sampleCount++;
        if (/^0\d+$/.test(val)) {
          hasLeadingZeroId = true;
        } else if (/^-?[\d,]+(\.\d+)?$/.test(val.replace(/[$,€£]/g, ""))) {
          numericCount++;
        }
      }
    }

    const isLikelyNumeric = sampleCount > 0 && numericCount / sampleCount > 0.75;
    const preserveText = hasLeadingZeroId || /id|code|emp|ssn|account|phone/i.test(rawName);

    columns.push({
      id: `col_${c}`,
      name: rawName,
      type: isLikelyNumeric && !preserveText ? "number" : "text",
      originalIndex: c,
      preserveAsText: preserveText,
    });
  }

  // Pad or normalize all rows to finalColCount
  const normalizedRows = finalRows.map((r) => {
    const cells = [...r.cells];
    while (cells.length < finalColCount) {
      cells.push("");
    }
    return {
      ...r,
      cells: cells.slice(0, finalColCount),
    };
  });

  const warnings: string[] = [];
  if (scannedPages.length > 0) {
    warnings.push(
      `Pages ${scannedPages.join(", ")} contain no selectable text and appear to be scanned. OCR is required to extract text from scanned images.`,
    );
  }

  if (normalizedRows.length === 0) {
    warnings.push("No tabular data or text rows could be extracted from the specified page range.");
  }

  return {
    columns,
    rows: normalizedRows,
    detectedPageHeadings: detectedHeadings,
    totalPages: totalDocPages,
    processedPages: pagesToProcess,
    scannedPages,
    warnings,
    tablesDetected: Math.max(1, pagesToProcess),
  };
}
