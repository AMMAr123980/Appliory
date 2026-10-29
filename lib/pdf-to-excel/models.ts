export interface ExtractedCell {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
}

export interface ExtractedRow {
  id: string;
  page: number;
  cells: string[];
  isHeader?: boolean;
  isExcluded?: boolean;
  pageHeaderContext?: string;
}

export interface ColumnConfig {
  id: string;
  name: string;
  type: "text" | "number" | "currency" | "date";
  originalIndex: number;
  preserveAsText: boolean;
}

export interface TableExtractionResult {
  columns: ColumnConfig[];
  rows: ExtractedRow[];
  detectedPageHeadings: { page: number; heading: string }[];
  totalPages: number;
  processedPages: number;
  scannedPages: number[];
  warnings: string[];
  tablesDetected: number;
  isNarrative?: boolean;
  narrativeAlternative?: {
    summaryColumns: ColumnConfig[];
    summaryRows: ExtractedRow[];
    itemizedColumns: ColumnConfig[];
    itemizedRows: ExtractedRow[];
  };
}

export interface ExtractionOptions {
  startPage?: number;
  endPage?: number;
  batchSize?: number;
  rowTolerance?: number; // Y-clustering tolerance in points (default: 4.0)
  mode?: "auto" | "table" | "narrative";
  narrativeView?: "summary" | "itemized";
  removeRepeatedHeaders?: boolean;
  detectPageHeadings?: boolean;
  onProgress?: (progress: ExtractionProgress) => void;
  signal?: AbortSignal;
}

export interface ExtractionProgress {
  currentPage: number;
  totalPages: number;
  percentage: number;
  stage: string;
  estimatedSecondsRemaining?: number;
}
