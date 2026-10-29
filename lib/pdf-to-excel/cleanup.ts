import type { ExtractedRow, ColumnConfig } from "./models";

export interface CleanupHistoryEntry {
  columns: ColumnConfig[];
  rows: ExtractedRow[];
  actionLabel: string;
}

/**
 * Fills down empty cells in a column using the most recent non-empty value above it.
 * Ideal for payroll reports where Employee ID or Department is printed only once
 * per multi-row block.
 */
export function fillDownColumn(
  rows: ExtractedRow[],
  columnIndex: number,
): ExtractedRow[] {
  let lastNonEmpty = "";
  return rows.map((row) => {
    const cells = [...row.cells];
    const currentVal = (cells[columnIndex] ?? "").trim();
    if (currentVal !== "") {
      lastNonEmpty = currentVal;
    } else if (lastNonEmpty !== "") {
      cells[columnIndex] = lastNonEmpty;
    }
    return { ...row, cells };
  });
}

/**
 * Detects repeated table headers across pages and filters them out.
 * For example, if line 1 on page 1 has "ID, Name, Dept, Hours" and that same row
 * appears again at the top of page 2, 3, etc., this removes the duplicates.
 */
export function removeRepeatedHeaders(
  rows: ExtractedRow[],
  headerRowIndex: number = 0,
): { cleanedRows: ExtractedRow[]; removedCount: number } {
  if (rows.length <= 1) return { cleanedRows: rows, removedCount: 0 };

  const headerSignature = rows[headerRowIndex].cells
    .map((c) => c.trim().toLowerCase())
    .join("||");

  let removedCount = 0;
  const cleanedRows: ExtractedRow[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (i === headerRowIndex) {
      cleanedRows.push(row);
      continue;
    }

    const sig = row.cells.map((c) => c.trim().toLowerCase()).join("||");
    if (sig === headerSignature && sig.replace(/\|/g, "").length > 0) {
      removedCount++;
    } else {
      cleanedRows.push(row);
    }
  }

  return { cleanedRows, removedCount };
}

/**
 * Inserts the detected page heading as a new first column for all rows on that page.
 * Useful for documents where "Pay Period Ending 2026-03-31" appears as a header on each page
 * rather than in a table cell.
 */
export function repeatPageHeadingsAsColumn(
  columns: ColumnConfig[],
  rows: ExtractedRow[],
  columnName: string = "Page Context",
): { columns: ColumnConfig[]; rows: ExtractedRow[] } {
  const newColumn: ColumnConfig = {
    id: `col_heading_${Date.now()}`,
    name: columnName,
    type: "text",
    originalIndex: -1,
    preserveAsText: true,
  };

  const updatedColumns = [newColumn, ...columns];
  const updatedRows = rows.map((row) => ({
    ...row,
    cells: [row.pageHeaderContext || `Page ${row.page}`, ...row.cells],
  }));

  return { columns: updatedColumns, rows: updatedRows };
}

/**
 * Removes completely blank rows from the extracted dataset.
 */
export function removeBlankRows(rows: ExtractedRow[]): ExtractedRow[] {
  return rows.filter((row) =>
    row.cells.some((cell) => cell !== undefined && cell.trim().length > 0),
  );
}

/**
 * Updates a specific cell value (inline editing).
 */
export function updateCellValue(
  rows: ExtractedRow[],
  rowId: string,
  colIndex: number,
  newValue: string,
): ExtractedRow[] {
  return rows.map((row) => {
    if (row.id !== rowId) return row;
    const cells = [...row.cells];
    cells[colIndex] = newValue;
    return { ...row, cells };
  });
}

/**
 * Deletes a row by ID.
 */
export function deleteRow(rows: ExtractedRow[], rowId: string): ExtractedRow[] {
  return rows.filter((r) => r.id !== rowId);
}

/**
 * Deletes a column and removes its corresponding index from all rows.
 */
export function deleteColumn(
  columns: ColumnConfig[],
  rows: ExtractedRow[],
  columnIndex: number,
): { columns: ColumnConfig[]; rows: ExtractedRow[] } {
  const updatedColumns = columns.filter((_, idx) => idx !== columnIndex);
  const updatedRows = rows.map((row) => ({
    ...row,
    cells: row.cells.filter((_, idx) => idx !== columnIndex),
  }));
  return { columns: updatedColumns, rows: updatedRows };
}

/**
 * Updates a column's metadata (name, type, preserveAsText).
 */
export function updateColumnConfig(
  columns: ColumnConfig[],
  columnIndex: number,
  patch: Partial<ColumnConfig>,
): ColumnConfig[] {
  return columns.map((col, idx) => {
    if (idx !== columnIndex) return col;
    return { ...col, ...patch };
  });
}
