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

test("isNarrativePayrollDocument correctly identifies case note narratives", async () => {
  const { isNarrativePayrollDocument } = await import("../lib/pdf-to-excel/narrative-parser.ts");

  const narrativeSample = `
Payroll Reconciliation Narrative
Reporting period: January 2026
Payroll case narratives
Case note 1: employee identifier E-1042 - Warehouse Operations
For the January 2026 payroll period, the ordinary timecard records 160 regular hours at a base rate of $18.50 per hour.
`;
  assert.ok(isNarrativePayrollDocument(narrativeSample));

  const standardTableSample = `
Employee ID | Code | Description | Hours | Amount
EMP000001 | OT | Overtime | 11 | 273.25
`;
  assert.ok(!isNarrativePayrollDocument(standardTableSample));
});

test("parseNarrativePayrollText extracts structured employee fields from narrative paragraphs", async () => {
  const { parseNarrativePayrollText } = await import("../lib/pdf-to-excel/narrative-parser.ts");

  const page1Text = `
Payroll Reconciliation Narrative
Reporting period: January 2026
Payroll case narratives
Case note 1: employee identifier E-1042 - Warehouse Operations
For the January 2026 payroll period, the ordinary timecard records 160 regular hours at a base rate of $18.50 per hour.
Those hours produced regular earnings of $2,960.00. The overtime portion was recorded separately: 4 hours at $27.75 per
hour, yielding $111.00 in overtime earnings.
The payroll clerk noted an additional allowance or adjustment of $35.00. After including that amount, gross earnings were
listed as $3,106.00. A benefits and payroll withholding of $125.00 was then applied, leaving net pay of $2,981.00.
Case note 2: employee identifier E-2087 - Customer Support
The pay narrative lists $3,344.00 in ordinary earnings for 152 hours worked at $22.00 hourly. The same time record shows
0 hours of overtime, compensated at $33.00; the overtime contribution was $0.00. This entry belongs to the January 2026
cycle and is assigned to Customer Support.
A separate adjustment entry of $0.00 was approved for this employee. The report's gross-pay figure, after ordinary pay,
overtime, and the adjustment are combined, is $3,344.00. With $180.00 withheld for benefits and payroll deductions, the
resulting take-home amount is $3,164.00.
Case note 3: employee identifier E-3116 - Inventory Control
In the January 2026 cycle, this worker's time record shows overtime first: 2 additional hours were paid at $25.20, a total of
$50.40. The normal schedule accounts for 164 hours, valued at $16.80 per hour, or $2,755.20 in ordinary pay.
The adjustment field contains $25.00. It is included in the reported gross total of $2,830.60; it is not a page number or case
reference. The payroll statement also records a withholding of $110.00, so the final net amount is $2,720.60.
Administrative context: the supervisor referenced batch file REF-01-13 and a departmental stationery budget of $1,240.00. Neither figure
is an employee earning or deduction for this case.
`;

  const parsed = parseNarrativePayrollText([{ page: 1, text: page1Text }]);

  assert.equal(parsed.employees.length, 3, "Parsed all 3 employee case notes");

  // Check Case 1: E-1042
  const emp1 = parsed.employees[0];
  assert.equal(emp1.employeeId, "E-1042");
  assert.equal(emp1.department, "Warehouse Operations");
  assert.equal(emp1.period, "January 2026");
  assert.equal(emp1.regularHours, "160");
  assert.equal(emp1.baseRate, "18.50");
  assert.equal(emp1.regularEarnings, "2,960.00");
  assert.equal(emp1.overtimeHours, "4");
  assert.equal(emp1.overtimeRate, "27.75");
  assert.equal(emp1.overtimeEarnings, "111.00");
  assert.equal(emp1.adjustment, "35.00");
  assert.equal(emp1.grossEarnings, "3,106.00");
  assert.equal(emp1.withholding, "125.00");
  assert.equal(emp1.netPay, "2,981.00");

  // Check Case 2: E-2087
  const emp2 = parsed.employees[1];
  assert.equal(emp2.employeeId, "E-2087");
  assert.equal(emp2.department, "Customer Support");
  assert.equal(emp2.regularHours, "152");
  assert.equal(emp2.regularEarnings, "3,344.00");
  assert.equal(emp2.netPay, "3,164.00");

  // Check Case 3: E-3116
  const emp3 = parsed.employees[2];
  assert.equal(emp3.employeeId, "E-3116");
  assert.equal(emp3.department, "Inventory Control");
  assert.equal(emp3.overtimeHours, "2");
  assert.equal(emp3.overtimeEarnings, "50.40");
  assert.equal(emp3.grossEarnings, "2,830.60");
  assert.equal(emp3.netPay, "2,720.60");

  // Check summary rows and itemized rows
  assert.equal(parsed.summaryRows.length, 3);
  assert.ok(parsed.itemizedRows.length >= 10, "Itemized rows created matching second PDF format");
  assert.ok(parsed.itemizedRows.some((r) => r.cells[3] === "REG" && r.cells[4] === "Regular Pay"));
  assert.ok(parsed.itemizedRows.some((r) => r.cells[3] === "OT" && r.cells[4] === "Overtime"));
});
