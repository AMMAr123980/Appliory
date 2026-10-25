import test from "node:test";
import assert from "node:assert/strict";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { createPDF, createZIP, createCSV } from "../lib/reports.ts";
import { buildReport } from "../lib/validation/engine.ts";
import type { LocalDocument, Rule } from "../lib/model.ts";
const rule: Rule = {
  id: "cv",
  name: "Resume",
  description: "",
  required: true,
  extensions: "pdf",
  mimes: "application/pdf",
  maxMB: 2,
};
const file = new File(["original fixture bytes"], "resume.pdf", {
  type: "application/pdf",
});
const doc: LocalDocument = {
  id: "one",
  file,
  original: file,
  ruleId: "cv",
  name: "resume.pdf",
  type: file.type,
  size: file.size,
  detected: "pdf",
  hash: "a".repeat(64),
  pages: 1,
  textPages: 1,
};
const report = buildReport("=Example", [rule], [doc]);
test("PDF export generates a readable PDF with pages and text", async () => {
  const blob = await createPDF(report);
  const bytes = new Uint8Array(await blob.arrayBuffer());
  assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), "%PDF-");
  const parsed = await PDFDocument.load(bytes);
  assert.ok(parsed.getPageCount() >= 1);
});
test("ZIP contains exact file bytes, a report and unique names", async () => {
  const zip = await createZIP([doc, { ...doc, id: "two" }], report);
  const parsed = await JSZip.loadAsync(await zip.arrayBuffer());
  assert.equal(
    await parsed.file("documents/resume.pdf")!.async("string"),
    "original fixture bytes",
  );
  assert.equal(
    await parsed.file("documents/resume_2.pdf")!.async("string"),
    "original fixture bytes",
  );
  const result = JSON.parse(
    await parsed.file("appliory-report.json")!.async("string"),
  );
  assert.equal(result.rows[0].files[0].hash, doc.hash);
  assert.equal(
    JSON.stringify(result).includes("original fixture bytes"),
    false,
  );
});
test("CSV preserves findings and neutralizes spreadsheet formulas", async () => {
  const csv = await createCSV(report).text();
  assert.ok(csv.includes('"\'=Example"'));
  assert.ok(csv.includes("File size"));
  assert.ok(csv.includes(report.timestamp));
});

test("multiple files mapped to one requirement retain individual findings and CSV bytes", async () => {
  const other = {
    ...doc,
    id: "oversize",
    name: "oversize.pdf",
    size: 6 * 1024 * 1024,
    hash: "b".repeat(64),
  };
  const r = buildReport("Two mapped files", [rule], [doc, other]);
  const sizeFindings = r.rows[0].findings.filter(
    (f) => f.check === "File size",
  );
  assert.equal(sizeFindings.length, 2);
  assert.equal(
    sizeFindings.find((f) => f.fileId === doc.id)?.fileName,
    doc.name,
  );
  assert.equal(
    sizeFindings.find((f) => f.fileId === "oversize")?.status,
    "failed",
  );
  const csv = await createCSV(r).text();
  const rows = csv.split("\r\n").filter((line) => line.includes('"File size"'));
  assert.ok(
    rows.some((line) =>
      line.includes('"resume.pdf","' + doc.size + '","pass"'),
    ),
  );
  assert.ok(
    rows.some((line) => line.includes('"oversize.pdf","6291456","failed"')),
  );
  assert.ok(rows.every((line) => !line.includes("resume.pdf; oversize.pdf")));
});
