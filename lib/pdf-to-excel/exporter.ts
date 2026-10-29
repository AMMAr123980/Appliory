import JSZip from "jszip";
import type { ExtractedRow, ColumnConfig } from "./models";

export interface ExportOptions {
  fileName?: string;
  sheetName?: string;
  includeSummarySheet?: boolean;
  metadata?: {
    originalFileName?: string;
    totalPages?: number;
    processedPages?: number;
    scannedPages?: number[];
    warnings?: string[];
  };
}

/**
 * Escapes characters for XML attributes and text content.
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Prevents formula injection attacks in Excel / CSV when opening spreadsheets.
 * Cells starting with =, +, -, @ or control characters are prepended with a single quote.
 */
export function sanitizeCellForFormulaInjection(val: string): string {
  if (!val) return "";
  const trimmed = val.trimStart();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    // If it's a negative number like -123.45, that's a safe valid numeric value
    if (/^-\d+(\.\d+)?$/.test(trimmed)) {
      return val;
    }
    return `'${val}`;
  }
  return val;
}

/**
 * Converts a 0-indexed column number to an Excel column letter (0 -> A, 25 -> Z, 26 -> AA).
 */
function getColumnLetter(colIndex: number): string {
  let temp = colIndex;
  let letter = "";
  while (temp >= 0) {
    letter = String.fromCharCode((temp % 26) + 65) + letter;
    temp = Math.floor(temp / 26) - 1;
  }
  return letter;
}

/**
 * Builds standard OpenXML files and packages them into a valid .xlsx file using JSZip.
 */
export async function generateExcelBlob(
  columns: ColumnConfig[],
  rows: ExtractedRow[],
  options: ExportOptions = {},
): Promise<Blob> {
  const { sheetName = "Extracted_Data", includeSummarySheet = true, metadata } = options;

  const zip = new JSZip();

  // 1. [Content_Types].xml
  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  ${includeSummarySheet ? '<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' : ''}
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;
  zip.file("[Content_Types].xml", contentTypesXml);

  // 2. _rels/.rels
  const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;
  zip.file("_rels/.rels", rootRelsXml);

  // 3. xl/_rels/workbook.xml.rels
  const workbookRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  ${includeSummarySheet ? '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>' : ''}
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  zip.file("xl/_rels/workbook.xml.rels", workbookRelsXml);

  // 4. xl/workbook.xml
  const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="${escapeXml(sheetName.slice(0, 31))}" sheetId="1" r:id="rId1"/>
    ${includeSummarySheet ? '<sheet name="Extraction_Summary" sheetId="2" r:id="rId2"/>' : ''}
  </sheets>
</workbook>`;
  zip.file("xl/workbook.xml", workbookXml);

  // 5. xl/styles.xml (Basic formatting: bold headers, borders, number formatting)
  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><name val="Calibri"/><sz val="11"/></font>
    <font><b/><name val="Calibri"/><sz val="11"/></font>
  </fonts>
  <fills count="2">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
  </fills>
  <borders count="1">
    <border><left/><right/><top/><bottom/><diagonal/></border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
  </cellXfs>
</styleSheet>`;
  zip.file("xl/styles.xml", stylesXml);

  // 6. xl/worksheets/sheet1.xml (Data Sheet)
  let sheetDataXml = "";

  // Row 1: Headers
  let headerRowXml = `<row r="1">`;
  columns.forEach((col, idx) => {
    const cellRef = `${getColumnLetter(idx)}1`;
    const escapedText = escapeXml(col.name);
    headerRowXml += `<c r="${cellRef}" s="1" t="inlineStr"><is><t>${escapedText}</t></is></c>`;
  });
  headerRowXml += `</row>`;
  sheetDataXml += headerRowXml;

  // Data rows
  rows.forEach((row, rowIdx) => {
    const excelRowNum = rowIdx + 2;
    let rowXml = `<row r="${excelRowNum}">`;

    columns.forEach((col, colIdx) => {
      const cellRef = `${getColumnLetter(colIdx)}${excelRowNum}`;
      const rawVal = row.cells[colIdx] ?? "";
      const sanitized = sanitizeCellForFormulaInjection(rawVal);

      if (sanitized === "") {
        // empty cell, omit or empty
        return;
      }

      // Check if this should be formatted as numeric
      const isCleanNumber =
        col.type === "number" &&
        !col.preserveAsText &&
        !/^0\d+/.test(sanitized) && // Preserve leading zero IDs like 00123 as text!
        /^-?\d+(\.\d+)?$/.test(sanitized.replace(/,/g, ""));

      if (isCleanNumber) {
        const numVal = sanitized.replace(/,/g, "");
        rowXml += `<c r="${cellRef}"><v>${numVal}</v></c>`;
      } else {
        rowXml += `<c r="${cellRef}" t="inlineStr"><is><t>${escapeXml(sanitized)}</t></is></c>`;
      }
    });

    rowXml += `</row>`;
    sheetDataXml += rowXml;
  });

  const sheet1Xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>${sheetDataXml}</sheetData>
</worksheet>`;
  zip.file("xl/worksheets/sheet1.xml", sheet1Xml);

  // 7. xl/worksheets/sheet2.xml (Optional Summary / Audit Trail)
  if (includeSummarySheet) {
    const nowStr = new Date().toISOString();
    const summaryRows = [
      ["Metric / Property", "Value"],
      ["Source File", metadata?.originalFileName || "Uploaded PDF Document"],
      ["Total Document Pages", String(metadata?.totalPages || "N/A")],
      ["Processed Pages", String(metadata?.processedPages || rows.length > 0 ? "All" : "0")],
      ["Total Extracted Rows", String(rows.length)],
      ["Total Columns", String(columns.length)],
      ["Processing Engine", "Appliory 100% In-Browser Privacy Pipeline"],
      ["Extraction Timestamp (UTC)", nowStr],
      [
        "Scanned Pages (No selectable text)",
        metadata?.scannedPages && metadata.scannedPages.length > 0
          ? metadata.scannedPages.join(", ")
          : "None detected (pure digital vector text)",
      ],
      [
        "Extraction Warnings",
        metadata?.warnings && metadata.warnings.length > 0
          ? metadata.warnings.join(" | ")
          : "None",
      ],
    ];

    let summaryDataXml = "";
    summaryRows.forEach((sRow, sIdx) => {
      const rNum = sIdx + 1;
      const sStyle = sIdx === 0 ? ` s="1"` : "";
      summaryDataXml += `<row r="${rNum}">
        <c r="A${rNum}"${sStyle} t="inlineStr"><is><t>${escapeXml(sRow[0])}</t></is></c>
        <c r="B${rNum}" t="inlineStr"><is><t>${escapeXml(sRow[1])}</t></is></c>
      </row>`;
    });

    const sheet2Xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>${summaryDataXml}</sheetData>
</worksheet>`;
    zip.file("xl/worksheets/sheet2.xml", sheet2Xml);
  }

  return await zip.generateAsync({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}

/**
 * Generates an RFC 4180-compliant CSV string with UTF-8 BOM and formula sanitization.
 */
export function generateCSVString(
  columns: ColumnConfig[],
  rows: ExtractedRow[],
): string {
  const formatCell = (val: string): string => {
    const sanitized = sanitizeCellForFormulaInjection(val ?? "");
    // If it contains comma, double-quote, or newline, wrap in quotes and escape inner quotes
    if (/[",\r\n]/.test(sanitized)) {
      return `"${sanitized.replace(/"/g, '""')}"`;
    }
    return sanitized;
  };

  const headerLine = columns.map((c) => formatCell(c.name)).join(",");
  const dataLines = rows.map((r) =>
    columns.map((_, idx) => formatCell(r.cells[idx] || "")).join(","),
  );

  // Prepend UTF-8 BOM so Excel opens special characters correctly
  return "\uFEFF" + [headerLine, ...dataLines].join("\r\n");
}

/**
 * Triggers a browser download of a given Blob.
 */
export function triggerFileDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
