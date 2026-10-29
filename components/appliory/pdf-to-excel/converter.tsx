"use client";

import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  FileSpreadsheet,
  UploadCloud,
  FileText,
  RotateCcw,
  Download,
  TriangleAlert,
  Search,
  Trash2,
  ArrowDown,
  Layers,
  ShieldCheck,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Edit2,
  Sliders,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import type {
  ExtractedRow,
  ColumnConfig,
  TableExtractionResult,
  ExtractionProgress,
} from "@/lib/pdf-to-excel/models";
import { extractPDFTables } from "@/lib/pdf-to-excel/extractor";
import {
  fillDownColumn,
  removeRepeatedHeaders,
  repeatPageHeadingsAsColumn,
  removeBlankRows,
  updateCellValue,
  deleteRow,
  deleteColumn,
  updateColumnConfig,
  type CleanupHistoryEntry,
} from "@/lib/pdf-to-excel/cleanup";
import {
  generateExcelBlob,
  generateCSVString,
  triggerFileDownload,
} from "@/lib/pdf-to-excel/exporter";

export function PDFToExcelConverter() {
  // File & configuration state
  const [file, setFile] = useState<File | null>(null);
  const [pageRangeMode, setPageRangeMode] = useState<"all" | "custom">("all");
  const [startPageInput, setStartPageInput] = useState<number>(1);
  const [endPageInput, setEndPageInput] = useState<number>(50);
  const [detectedTotalPages, setDetectedTotalPages] = useState<number | null>(null);
  const [rowTolerance, setRowTolerance] = useState<number>(4.0);
  const [detectHeadings, setDetectHeadings] = useState<boolean>(true);
  const [autoRemoveHeaders, setAutoRemoveHeaders] = useState<boolean>(true);
  const [includeSummarySheet, setIncludeSummarySheet] = useState<boolean>(true);

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<ExtractionProgress | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Results & cleanup state
  const [extractionResult, setExtractionResult] = useState<TableExtractionResult | null>(null);
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [rows, setRows] = useState<ExtractedRow[]>([]);
  const [history, setHistory] = useState<CleanupHistoryEntry[]>([]);
  const [activeSearch, setActiveSearch] = useState<string>("");

  // Pagination state for preview table
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Modal / Dropdown state
  const [fillDownColIdx, setFillDownColIdx] = useState<number>(0);
  const [showFillDownModal, setShowFillDownModal] = useState<boolean>(false);
  const [editingColId, setEditingColId] = useState<string | null>(null);
  const [editingColName, setEditingColName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop handlers
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleSelectFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleSelectFile = async (selected: File) => {
    setErrorMessage(null);
    if (selected.type !== "application/pdf" && !selected.name.toLowerCase().endsWith(".pdf")) {
      setErrorMessage("Please select a valid PDF document (.pdf).");
      return;
    }
    if (selected.size > 50 * 1024 * 1024) {
      setErrorMessage("PDF file size exceeds 50 MB. Please choose a smaller document.");
      return;
    }

    setFile(selected);
    setExtractionResult(null);
    setRows([]);
    setColumns([]);
    setHistory([]);

    // Quick inspect to get page count preview
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const bytes = new Uint8Array(await selected.slice(0, 1024 * 1024).arrayBuffer());
      const headerCheck = String.fromCharCode(...bytes.slice(0, 5));
      if (!headerCheck.startsWith("%PDF-")) {
        setErrorMessage("File signature does not match standard PDF format.");
        return;
      }
      const task = pdfjs.getDocument({ data: new Uint8Array(await selected.arrayBuffer()) });
      try {
        const doc = await task.promise;
        setDetectedTotalPages(doc.numPages);
        setEndPageInput(doc.numPages);
      } finally {
        await task.destroy();
      }
    } catch {
      // If preview fails, user can still proceed with conversion
      setDetectedTotalPages(null);
    }
  };

  const handleStartExtraction = async () => {
    if (!file) return;

    setErrorMessage(null);
    setIsProcessing(true);
    setProgress({
      currentPage: 1,
      totalPages: detectedTotalPages || 1,
      percentage: 0,
      stage: "Initializing in-browser PDF parser…",
    });

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const result = await extractPDFTables(file, {
        startPage: pageRangeMode === "custom" ? startPageInput : 1,
        endPage: pageRangeMode === "custom" ? endPageInput : undefined,
        rowTolerance,
        detectPageHeadings: detectHeadings,
        onProgress: (p) => setProgress(p),
        signal: controller.signal,
      });

      let initialRows = result.rows;
      if (autoRemoveHeaders && initialRows.length > 1) {
        const { cleanedRows } = removeRepeatedHeaders(initialRows, 0);
        initialRows = cleanedRows;
      }

      setExtractionResult(result);
      setColumns(result.columns);
      setRows(initialRows);
      setHistory([]);
      setCurrentPage(1);
      toast.success(`Extracted ${initialRows.length} rows across ${result.columns.length} columns!`);
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("cancelled")) {
        setErrorMessage("Extraction was cancelled.");
        toast.info("Extraction cancelled");
      } else {
        const msg =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while parsing the PDF tables.";
        setErrorMessage(msg);
        toast.error(msg);
      }
    } finally {
      setIsProcessing(false);
      setProgress(null);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Reset view to allow extracting another PDF
  const handleExtractAnother = () => {
    setFile(null);
    setExtractionResult(null);
    setRows([]);
    setColumns([]);
    setHistory([]);
    setDetectedTotalPages(null);
    setErrorMessage(null);
    setCurrentPage(1);
    setActiveSearch("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Push state to undo stack
  const pushHistory = (actionLabel: string, nextCols: ColumnConfig[], nextRows: ExtractedRow[]) => {
    setHistory((prev) => [
      ...prev.slice(-10), // keep last 10 actions
      { columns: [...columns], rows: [...rows], actionLabel },
    ]);
    setColumns(nextCols);
    setRows(nextRows);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setColumns(last.columns);
    setRows(last.rows);
    setHistory((prev) => prev.slice(0, -1));
    toast.info(`Reverted: ${last.actionLabel}`);
  };

  const handleReset = () => {
    if (!extractionResult) return;
    setColumns(extractionResult.columns);
    setRows(extractionResult.rows);
    setHistory([]);
    setCurrentPage(1);
    toast.info("Table reset to original extraction");
  };

  // Table cleanup actions
  const applyFillDown = (colIndex: number) => {
    const updated = fillDownColumn(rows, colIndex);
    const colName = columns[colIndex]?.name || `Col ${colIndex + 1}`;
    pushHistory(`Fill down ${colName}`, columns, updated);
    setShowFillDownModal(false);
    toast.success(`Applied fill down on "${colName}"`);
  };

  const applyRemoveHeaders = () => {
    const { cleanedRows, removedCount } = removeRepeatedHeaders(rows, 0);
    pushHistory(`Removed ${removedCount} repeated headers`, columns, cleanedRows);
    if (removedCount > 0) {
      toast.success(`Removed ${removedCount} repeated table headers`);
    } else {
      toast.info("No repeated headers found across pages");
    }
  };

  const applyAddPageHeadings = () => {
    const { columns: nextCols, rows: nextRows } = repeatPageHeadingsAsColumn(
      columns,
      rows,
      "Reporting Period / Page Context",
    );
    pushHistory("Added page context column", nextCols, nextRows);
    toast.success("Added page context column to spreadsheet");
  };

  const applyRemoveBlankRows = () => {
    const cleaned = removeBlankRows(rows);
    const removedCount = rows.length - cleaned.length;
    pushHistory(`Removed ${removedCount} blank rows`, columns, cleaned);
    if (removedCount > 0) {
      toast.success(`Removed ${removedCount} blank rows`);
    } else {
      toast.info("No empty rows detected");
    }
  };

  const handleDeleteColumn = (colIndex: number) => {
    const colName = columns[colIndex]?.name || `Col ${colIndex + 1}`;
    const { columns: nextCols, rows: nextRows } = deleteColumn(columns, rows, colIndex);
    pushHistory(`Deleted column ${colName}`, nextCols, nextRows);
    toast.success(`Deleted column "${colName}"`);
  };

  const handleDeleteRow = (rowId: string) => {
    const updated = deleteRow(rows, rowId);
    pushHistory("Deleted row", columns, updated);
    toast.success("Row deleted");
  };

  const handleCellChange = (rowId: string, colIndex: number, val: string) => {
    const updated = updateCellValue(rows, rowId, colIndex, val);
    setRows(updated);
  };

  const handleSaveColumnRename = (colIndex: number) => {
    if (!editingColName.trim()) return;
    const newName = editingColName.trim();
    const updatedCols = updateColumnConfig(columns, colIndex, { name: newName });
    setColumns(updatedCols);
    setEditingColId(null);
    setEditingColName("");
    toast.success(`Column renamed to "${newName}"`);
  };

  const handleToggleColumnType = (colIndex: number) => {
    const curr = columns[colIndex];
    const nextType: "text" | "number" = curr.type === "text" ? "number" : "text";
    const updated = updateColumnConfig(columns, colIndex, {
      type: nextType,
      preserveAsText: nextType === "text",
    });
    setColumns(updated);
    toast.success(`Column format set to ${nextType.toUpperCase()}`);
  };

  // Filtered rows based on search
  const filteredRows = useMemo(() => {
    if (!activeSearch.trim()) return rows;
    const query = activeSearch.toLowerCase();
    return rows.filter((r) =>
      r.cells.some((cell) => cell.toLowerCase().includes(query)),
    );
  }, [rows, activeSearch]);

  // Paginated slice
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const totalPagesCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));

  // Export handlers
  const handleExportExcel = async () => {
    if (!file || rows.length === 0) return;
    try {
      const blob = await generateExcelBlob(columns, rows, {
        fileName: file.name.replace(/\.pdf$/i, "") + "_converted.xlsx",
        sheetName: "Data",
        includeSummarySheet,
        metadata: {
          originalFileName: file.name,
          totalPages: extractionResult?.totalPages,
          processedPages: extractionResult?.processedPages,
          scannedPages: extractionResult?.scannedPages,
          warnings: extractionResult?.warnings,
        },
      });
      triggerFileDownload(
        blob,
        file.name.replace(/\.pdf$/i, "") + "_converted.xlsx",
      );
      toast.success("Excel spreadsheet (.xlsx) downloaded successfully!");
    } catch (e) {
      toast.error("Failed to export Excel file. " + (e instanceof Error ? e.message : ""));
    }
  };

  const handleExportCSV = () => {
    if (!file || rows.length === 0) return;
    const csvContent = generateCSVString(columns, rows);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    triggerFileDownload(
      blob,
      file.name.replace(/\.pdf$/i, "") + "_converted.csv",
    );
    toast.success("CSV spreadsheet downloaded successfully!");
  };

  return (
    <div className="pdf-to-excel-container" style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
      {/* 1. UPLOAD & SETTINGS CARD */}
      {!extractionResult && !isProcessing && (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: "32px 28px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          }}
        >
          {/* Privacy Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--green)",
              border: "1px solid #c7e3d2",
              padding: "10px 14px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              color: "var(--accent)",
              marginBottom: 24,
            }}
          >
            <ShieldCheck size={18} />
            <span>
              100% Client-Side Privacy: Your confidential PDF tables, payroll records, and financial numbers are parsed entirely inside your browser. No files are uploaded to any server.
            </span>
          </div>

          {/* Upload Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: isDragging ? "2px dashed var(--accent)" : "2px dashed var(--line)",
              borderRadius: 10,
              padding: "44px 24px",
              textAlign: "center",
              cursor: "pointer",
              background: isDragging ? "#f4faf6" : "var(--soft)",
              transition: "all 0.2s ease",
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,application/pdf"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleSelectFile(e.target.files[0]);
                }
              }}
            />
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#fff",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
                border: "1px solid var(--line)",
                color: "var(--accent)",
              }}
            >
              <UploadCloud size={28} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: "var(--ink)" }}>
              {file ? file.name : "Select or drag & drop your PDF document"}
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB · ${
                    detectedTotalPages ? `${detectedTotalPages} pages detected` : "PDF document"
                  }`
                : "Ideal for payroll reports, financial statements, rosters, and tabular PDFs (up to 50 MB)"}
            </p>
          </div>

          {errorMessage && (
            <div
              style={{
                marginTop: 18,
                padding: "12px 16px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                color: "var(--red)",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TriangleAlert size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Advanced Extraction Options */}
          {file && (
            <div
              style={{
                marginTop: 24,
                padding: "20px",
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 14 }}>
                  <Sliders size={16} />
                  <span>Extraction & Layout Parameters</span>
                </div>
                <span className="badge gray">Browser Engine</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 18,
                }}
              >
                {/* Page Range */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                    Page Selection
                  </label>
                  <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="pageRange"
                        checked={pageRangeMode === "all"}
                        onChange={() => setPageRangeMode("all")}
                      />
                      All Pages {detectedTotalPages ? `(1–${detectedTotalPages})` : ""}
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="pageRange"
                        checked={pageRangeMode === "custom"}
                        onChange={() => setPageRangeMode("custom")}
                      />
                      Custom Range
                    </label>
                  </div>
                  {pageRangeMode === "custom" && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="number"
                        min={1}
                        max={detectedTotalPages || 9999}
                        value={startPageInput}
                        onChange={(e) => setStartPageInput(parseInt(e.target.value) || 1)}
                        style={{
                          width: 80,
                          padding: "6px 8px",
                          borderRadius: 6,
                          border: "1px solid var(--line)",
                          fontSize: 13,
                        }}
                      />
                      <span style={{ color: "var(--muted)" }}>to</span>
                      <input
                        type="number"
                        min={startPageInput}
                        max={detectedTotalPages || 9999}
                        value={endPageInput}
                        onChange={(e) => setEndPageInput(parseInt(e.target.value) || startPageInput)}
                        style={{
                          width: 80,
                          padding: "6px 8px",
                          borderRadius: 6,
                          border: "1px solid var(--line)",
                          fontSize: 13,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Heuristics Checkboxes */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                    Intelligent Heuristics
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={detectHeadings}
                        onChange={(e) => setDetectHeadings(e.target.checked)}
                      />
                      Detect page headers (e.g., Pay Period, Department)
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={autoRemoveHeaders}
                        onChange={(e) => setAutoRemoveHeaders(e.target.checked)}
                      />
                      Auto-remove repeated table column headers
                    </label>
                  </div>
                </div>

                {/* Row Y-tolerance */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                    Row Alignment Tolerance ({rowTolerance} pt)
                  </label>
                  <input
                    type="range"
                    min={2.0}
                    max={8.0}
                    step={0.5}
                    value={rowTolerance}
                    onChange={(e) => setRowTolerance(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--accent)" }}
                  />
                  <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--muted)" }}>
                    Increase for loose line spacing; decrease for compact tables.
                  </p>
                </div>
              </div>

              {/* Start Button */}
              <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setFile(null);
                    setDetectedTotalPages(null);
                  }}
                >
                  Clear File
                </button>
                <button
                  type="button"
                  className="button dark"
                  onClick={handleStartExtraction}
                  style={{ gap: 10 }}
                >
                  <FileSpreadsheet size={16} />
                  <span>Extract PDF Tables to Spreadsheet</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. LIVE PROCESSING PROGRESS BAR */}
      {isProcessing && (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: "48px 32px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "var(--soft)",
              color: "var(--accent)",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 16px",
            }}
          >
            <Loader2 size={28} className="animate-spin" />
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px", color: "var(--ink)" }}>
            Processing PDF Tables Locally
          </h3>
          <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--muted)" }}>
            {progress?.stage || "Parsing coordinates and reconstructing tabular grid…"}
          </p>

          {/* Progress track */}
          <div
            style={{
              maxWidth: 480,
              margin: "0 auto 16px",
              height: 10,
              background: "var(--line)",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress?.percentage || 5}%`,
                height: "100%",
                background: "var(--accent)",
                transition: "width 0.2s ease",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              fontSize: 12,
              color: "var(--muted)",
              marginBottom: 24,
            }}
          >
            <span>
              Page {progress?.currentPage || 1} of {progress?.totalPages || 1} (
              {progress?.percentage || 0}%)
            </span>
            {progress?.estimatedSecondsRemaining !== undefined && (
              <span>~{progress.estimatedSecondsRemaining}s remaining</span>
            )}
          </div>

          <button
            type="button"
            className="button small"
            onClick={handleCancel}
            style={{ color: "var(--red)", borderColor: "#fecaca" }}
          >
            Cancel Extraction
          </button>
        </div>
      )}

      {/* 3. SPREADSHEET WORKSPACE */}
      {extractionResult && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Top Banner / Warnings */}
          {extractionResult.warnings.length > 0 && (
            <div
              style={{
                padding: "12px 18px",
                background: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: 8,
                fontSize: 13,
                color: "#92400e",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <TriangleAlert size={18} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>Notice:</strong> {extractionResult.warnings.join(" ")}
              </div>
            </div>
          )}

          {/* Action Toolbar */}
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: "16px 20px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {/* Left Tools: Extract Another PDF & Cleanup actions */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
              {/* Prominent Extract Another PDF Button */}
              <button
                type="button"
                className="button small dark"
                onClick={handleExtractAnother}
                title="Convert / Extract another PDF document"
                style={{ gap: 6, fontWeight: 700 }}
              >
                <Plus size={14} />
                <span>Extract Another PDF</span>
              </button>

              <button
                type="button"
                className="button small"
                onClick={() => setShowFillDownModal(true)}
                title="Fill down empty cells in selected column"
                style={{ gap: 6 }}
              >
                <ArrowDown size={14} />
                <span>Fill Down</span>
              </button>

              <button
                type="button"
                className="button small"
                onClick={applyRemoveHeaders}
                title="Remove repeated page headers"
                style={{ gap: 6 }}
              >
                <Layers size={14} />
                <span>Remove Repeated Headers</span>
              </button>

              <button
                type="button"
                className="button small"
                onClick={applyAddPageHeadings}
                title="Insert detected page header as a column"
                style={{ gap: 6 }}
              >
                <FileText size={14} />
                <span>Add Page Context Col</span>
              </button>

              <button
                type="button"
                className="button small"
                onClick={applyRemoveBlankRows}
                title="Remove empty rows"
                style={{ gap: 6 }}
              >
                <Trash2 size={14} />
                <span>Clean Blank Rows</span>
              </button>

              {history.length > 0 && (
                <button
                  type="button"
                  className="button small"
                  onClick={handleUndo}
                  title={`Undo: ${history[history.length - 1].actionLabel}`}
                  style={{ gap: 6, color: "var(--accent)" }}
                >
                  <RotateCcw size={14} />
                  <span>Undo ({history.length})</span>
                </button>
              )}

              <button
                type="button"
                className="button small"
                onClick={handleReset}
                title="Reset table to original extracted state"
                style={{ gap: 6 }}
              >
                <span>Reset</span>
              </button>
            </div>

            {/* Right Tools: Export options */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "var(--muted)",
                  marginRight: 6,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={includeSummarySheet}
                  onChange={(e) => setIncludeSummarySheet(e.target.checked)}
                />
                Audit Tab
              </label>

              <button
                type="button"
                className="button small"
                onClick={handleExportCSV}
                style={{ gap: 6 }}
              >
                <Download size={14} />
                <span>CSV</span>
              </button>

              <button
                type="button"
                className="button small dark"
                onClick={handleExportExcel}
                style={{ gap: 6 }}
              >
                <FileSpreadsheet size={14} />
                <span>Export Excel (.xlsx)</span>
              </button>
            </div>
          </div>

          {/* Fill Down Modal */}
          {showFillDownModal && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 9999,
                display: "grid",
                placeItems: "center",
                padding: 16,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  maxWidth: 420,
                  width: "100%",
                  padding: "24px 20px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Fill Down Column</h4>
                  <button
                    type="button"
                    onClick={() => setShowFillDownModal(false)}
                    style={{ border: "none", background: "none", cursor: "pointer", padding: 4 }}
                  >
                    <X size={18} />
                  </button>
                </div>
                <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)" }}>
                  Choose which column to fill downwards. Empty cells will inherit the most recent non-empty value above them (standard in payroll & ledger exports).
                </p>
                <select
                  value={fillDownColIdx}
                  onChange={(e) => setFillDownColIdx(parseInt(e.target.value) || 0)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 6,
                    border: "1px solid var(--line)",
                    fontSize: 13,
                    marginBottom: 20,
                  }}
                >
                  {columns.map((c, idx) => (
                    <option key={c.id} value={idx}>
                      Col {idx + 1}: {c.name}
                    </option>
                  ))}
                </select>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button
                    type="button"
                    className="button small"
                    onClick={() => setShowFillDownModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="button small dark"
                    onClick={() => applyFillDown(fillDownColIdx)}
                  >
                    Apply Fill Down
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search & Metadata Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "0 4px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, fontSize: 13, color: "var(--muted)" }}>
              <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                {rows.length} rows
              </span>
              <span>·</span>
              <span>{columns.length} columns</span>
              <span>·</span>
              <span>{extractionResult.processedPages} pages extracted</span>
              <span>·</span>
              <button
                type="button"
                onClick={handleExtractAnother}
                style={{
                  border: "none",
                  background: "none",
                  color: "var(--accent)",
                  cursor: "pointer",
                  fontWeight: 700,
                  padding: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Plus size={13} /> Extract another PDF
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Search
                  size={15}
                  style={{
                    position: "absolute",
                    left: 10,
                    color: "var(--muted)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search in table…"
                  value={activeSearch}
                  onChange={(e) => {
                    setActiveSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: "7px 12px 7px 32px",
                    borderRadius: 6,
                    border: "1px solid var(--line)",
                    fontSize: 13,
                    width: 220,
                    background: "#fff",
                  }}
                />
                {activeSearch && (
                  <button
                    type="button"
                    onClick={() => setActiveSearch("")}
                    style={{
                      position: "absolute",
                      right: 8,
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      padding: 2,
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Rows Per Page */}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value) || 25);
                  setCurrentPage(1);
                }}
                style={{
                  padding: "7px 10px",
                  borderRadius: 6,
                  border: "1px solid var(--line)",
                  fontSize: 13,
                  background: "#fff",
                }}
              >
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
              </select>
            </div>
          </div>

          {/* Spreadsheet Table Preview Container */}
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 10,
              overflowX: "auto",
              boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: 12,
                fontFamily: "var(--font-sans)",
              }}
            >
              {/* Header */}
              <thead>
                <tr style={{ background: "var(--soft)", borderBottom: "1px solid var(--line)" }}>
                  <th
                    style={{
                      width: 48,
                      padding: "10px 12px",
                      color: "var(--muted)",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    #
                  </th>
                  {columns.map((col, colIdx) => (
                    <th
                      key={col.id}
                      style={{
                        padding: "10px 12px",
                        fontWeight: 700,
                        color: "var(--ink)",
                        borderRight: "1px solid var(--line)",
                        minWidth: 140,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                        {editingColId === col.id ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <input
                              type="text"
                              value={editingColName}
                              onChange={(e) => setEditingColName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveColumnRename(colIdx);
                                if (e.key === "Escape") setEditingColId(null);
                              }}
                              autoFocus
                              style={{
                                padding: "3px 6px",
                                fontSize: 12,
                                borderRadius: 4,
                                border: "1px solid var(--accent)",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveColumnRename(colIdx)}
                              style={{ border: "none", background: "none", cursor: "pointer", color: "var(--accent)" }}
                            >
                              <Check size={14} />
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() => {
                              setEditingColId(col.id);
                              setEditingColName(col.name);
                            }}
                            title="Click to rename column"
                            style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
                          >
                            {col.name}
                            <Edit2 size={11} style={{ opacity: 0.4 }} />
                          </span>
                        )}

                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <button
                            type="button"
                            onClick={() => handleToggleColumnType(colIdx)}
                            title={`Current format: ${col.type}. Click to toggle Text/Number.`}
                            style={{
                              border: "1px solid var(--line)",
                              background: "#fff",
                              borderRadius: 4,
                              padding: "2px 5px",
                              fontSize: 10,
                              fontWeight: 600,
                              cursor: "pointer",
                              color: col.type === "number" ? "var(--accent)" : "var(--muted)",
                            }}
                          >
                            {col.type.toUpperCase()}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteColumn(colIdx)}
                            title="Delete this column"
                            style={{
                              border: "none",
                              background: "none",
                              color: "var(--muted)",
                              cursor: "pointer",
                              padding: 2,
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                  <th style={{ width: 40, padding: "10px 12px" }}></th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {paginatedRows.map((row, rIdx) => {
                  const absoluteRowNum = (currentPage - 1) * pageSize + rIdx + 1;
                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: "1px solid var(--line)",
                        background: rIdx % 2 === 0 ? "#fff" : "var(--paper)",
                      }}
                    >
                      <td
                        style={{
                          padding: "8px 12px",
                          textAlign: "center",
                          color: "var(--muted)",
                          fontSize: 11,
                          userSelect: "none",
                        }}
                      >
                        {absoluteRowNum}
                      </td>

                      {columns.map((col, colIdx) => {
                        const cellVal = row.cells[colIdx] ?? "";
                        return (
                          <td
                            key={col.id}
                            style={{
                              padding: "6px 8px",
                              borderRight: "1px solid var(--line)",
                              verticalAlign: "middle",
                            }}
                          >
                            <input
                              type="text"
                              value={cellVal}
                              onChange={(e) => handleCellChange(row.id, colIdx, e.target.value)}
                              style={{
                                width: "100%",
                                border: "none",
                                background: "transparent",
                                fontSize: 12,
                                color: "var(--ink)",
                                padding: "2px 4px",
                                borderRadius: 4,
                              }}
                            />
                          </td>
                        );
                      })}

                      <td style={{ padding: "6px 8px", textAlign: "center" }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(row.id)}
                          title="Delete row"
                          style={{
                            border: "none",
                            background: "none",
                            color: "var(--muted)",
                            cursor: "pointer",
                            padding: 2,
                          }}
                        >
                          <X size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {paginatedRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={columns.length + 2}
                      style={{
                        padding: 32,
                        textAlign: "center",
                        color: "var(--muted)",
                      }}
                    >
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 4px",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            <div>
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, filteredRows.length)} of{" "}
              {filteredRows.length} rows
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button
                type="button"
                className="button small"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                style={{ padding: "6px 10px" }}
              >
                <ChevronLeft size={14} />
              </button>
              <span>
                Page {currentPage} of {totalPagesCount}
              </span>
              <button
                type="button"
                className="button small"
                disabled={currentPage >= totalPagesCount}
                onClick={() => setCurrentPage((p) => Math.min(totalPagesCount, p + 1))}
                style={{ padding: "6px 10px" }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Bottom Action Footer for Extract Another PDF and Quick Export */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
              padding: "16px 20px",
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 10,
              gap: 12,
            }}
          >
            <button
              type="button"
              className="button"
              onClick={handleExtractAnother}
              style={{ gap: 8, fontWeight: 600 }}
            >
              <Plus size={16} />
              <span>Convert / Extract Another PDF</span>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                type="button"
                className="button"
                onClick={handleExportCSV}
                style={{ gap: 6 }}
              >
                <Download size={14} />
                <span>Download CSV</span>
              </button>
              <button
                type="button"
                className="button dark"
                onClick={handleExportExcel}
                style={{ gap: 6 }}
              >
                <FileSpreadsheet size={16} />
                <span>Download Excel (.xlsx)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
