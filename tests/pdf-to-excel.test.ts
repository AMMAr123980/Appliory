import test from "node:test";
import assert from "node:assert/strict";
import JSZip from "jszip";
import type { ExtractedRow, ColumnConfig } from "../lib/pdf-to-excel/models.ts";
import {
  fillDownColumn,
  removeRepeatedHeaders,
  repeatPageHeadingsAsColumn,
  removeBlankRows,
  deleteColumn,
  updateColumnConfig,
} from "../lib/pdf-to-excel/cleanup.ts";
import {
  sanitizeCellForFormulaInjection,
  generateCSVString,
  generateExcelBlob,
} from "../lib/pdf-to-excel/exporter.ts";

const sampleColumns: ColumnConfig[] = [
  { id: "col_0", name: "Employee ID", type: "text", originalIndex: 0, preserveAsText: true },
  { id: "col_1", name: "Full Name", type: "text", originalIndex: 1, preserveAsText: true },
  { id: "col_2", name: "Gross Pay", type: "number", originalIndex: 2, preserveAsText: false },
];

const sampleRows: ExtractedRow[] = [
  {
    id: "r_1",
    page: 1,
    cells: ["00142", "Jane Doe", "5,250.00"],
    pageHeaderContext: "Pay Period Ending 2026-03-31",
  },
  {
    id: "r_2",
    page: 1,
    cells: ["", "Jane Doe - Overtime", "450.00"],
    pageHeaderContext: "Pay Period Ending 2026-03-31",
  },
  {
    id: "r_3",
    page: 2,
    cells: ["Employee ID", "Full Name", "Gross Pay"], // repeated header row
    pageHeaderContext: "Pay Period Ending 2026-03-31",
  },
  {
    id: "r_4",
    page: 2,
    cells: ["00143", "John Smith", "4,800.00"],
    pageHeaderContext: "Pay Period Ending 2026-03-31",
  },
];

test("fillDownColumn correctly propagates parent ID into subsequent empty child rows", () => {
  const result = fillDownColumn(sampleRows, 0);

  assert.equal(result[0].cells[0], "00142");
  assert.equal(result[1].cells[0], "00142", "Child row inherited employee ID");
  assert.equal(result[3].cells[0], "00143", "New employee ID remains distinct");
});

test("removeRepeatedHeaders identifies and eliminates duplicate table headers across pages", () => {
  const rowsWithRepeatedHeader: ExtractedRow[] = [
    { id: "r_0", page: 1, cells: ["Employee ID", "Full Name", "Gross Pay"] },
    { id: "r_1", page: 1, cells: ["00142", "Jane Doe", "5,250.00"] },
    { id: "r_2", page: 2, cells: ["Employee ID", "Full Name", "Gross Pay"] },
    { id: "r_3", page: 2, cells: ["00143", "John Smith", "4,800.00"] },
  ];
  const { cleanedRows, removedCount } = removeRepeatedHeaders(rowsWithRepeatedHeader, 0);

  assert.equal(removedCount, 1);
  assert.equal(cleanedRows.length, 3);
  assert.equal(cleanedRows[0].id, "r_0");
  assert.equal(cleanedRows[1].id, "r_1");
  assert.equal(cleanedRows[2].id, "r_3");
});

test("repeatPageHeadingsAsColumn inserts detected page context as the first column", () => {
  const { columns, rows } = repeatPageHeadingsAsColumn(sampleColumns, sampleRows, "Payroll Period");

  assert.equal(columns.length, 4);
  assert.equal(columns[0].name, "Payroll Period");
  assert.equal(rows[0].cells[0], "Pay Period Ending 2026-03-31");
  assert.equal(rows[0].cells[1], "00142");
});

test("removeBlankRows removes completely empty rows", () => {
  const withBlank: ExtractedRow[] = [
    ...sampleRows,
    { id: "r_blank", page: 2, cells: ["", "  ", ""] },
  ];
  const cleaned = removeBlankRows(withBlank);

  assert.equal(cleaned.length, sampleRows.length);
  assert.ok(!cleaned.some((r) => r.id === "r_blank"));
});

test("deleteColumn removes column and realigns row cells", () => {
  const { columns, rows } = deleteColumn(sampleColumns, sampleRows, 1); // delete Full Name

  assert.equal(columns.length, 2);
  assert.equal(columns[0].name, "Employee ID");
  assert.equal(columns[1].name, "Gross Pay");

  assert.equal(rows[0].cells.length, 2);
  assert.equal(rows[0].cells[0], "00142");
  assert.equal(rows[0].cells[1], "5,250.00");
});

test("updateColumnConfig modifies column properties", () => {
  const updated = updateColumnConfig(sampleColumns, 0, { name: "Staff ID", type: "text" });

  assert.equal(updated[0].name, "Staff ID");
  assert.equal(updated[1].name, "Full Name");
});

test("sanitizeCellForFormulaInjection guards against spreadsheet formula attacks", () => {
  assert.equal(sanitizeCellForFormulaInjection("=SUM(A1:A10)"), "'=SUM(A1:A10)");
  assert.equal(sanitizeCellForFormulaInjection("+cmd|'/C calc'!A0"), "'+cmd|'/C calc'!A0");
  assert.equal(sanitizeCellForFormulaInjection("@HYPERLINK('bad.com')"), "'@HYPERLINK('bad.com')");
  assert.equal(sanitizeCellForFormulaInjection("-250.75"), "-250.75", "Valid negative number is safe");
  assert.equal(sanitizeCellForFormulaInjection("Jane Doe"), "Jane Doe");
});

test("generateCSVString exports RFC 4180 format with UTF-8 BOM", () => {
  const csv = generateCSVString(sampleColumns, [
    {
      id: "r_1",
      page: 1,
      cells: ["00142", 'Doe, "Jane"', "5250.00"],
    },
  ]);

  assert.ok(csv.startsWith("\uFEFF"), "Contains UTF-8 BOM for Excel compatibility");
  assert.ok(csv.includes('"Doe, ""Jane"""'), "Properly quotes and escapes internal commas and quotes");
  assert.ok(csv.includes("00142"));
});

test("generateExcelBlob produces a valid OpenXML .xlsx archive with summary sheet", async () => {
  const blob = await generateExcelBlob(sampleColumns, sampleRows, {
    fileName: "payroll_sample.xlsx",
    sheetName: "Payroll_Report",
    includeSummarySheet: true,
    metadata: {
      originalFileName: "payroll.pdf",
      totalPages: 2,
      processedPages: 2,
    },
  });

  assert.ok(blob.size > 1000, "Excel blob is non-empty");

  const buffer = await blob.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);

  assert.ok(zip.file("[Content_Types].xml") !== null);
  assert.ok(zip.file("xl/workbook.xml") !== null);
  assert.ok(zip.file("xl/styles.xml") !== null);
  assert.ok(zip.file("xl/worksheets/sheet1.xml") !== null);
  assert.ok(zip.file("xl/worksheets/sheet2.xml") !== null, "Summary audit sheet present");

  const sheet1Content = await zip.file("xl/worksheets/sheet1.xml")!.async("string");
  // Check that leading zero code '00142' is preserved as inlineStr text, not raw number
  assert.ok(
    sheet1Content.includes("<is><t>00142</t></is>"),
    "Leading zero employee ID preserved as inline string in OpenXML",
  );

  const sheet2Content = await zip.file("xl/worksheets/sheet2.xml")!.async("string");
  assert.ok(sheet2Content.includes("Appliory 100% In-Browser Privacy Pipeline"));
});
