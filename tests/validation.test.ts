import test from "node:test";
import assert from "node:assert/strict";
import {
  buildReport,
  validateFile,
  detectFormat,
  archiveNames,
  safeName,
} from "../lib/validation/engine.ts";
import type { Rule, DocumentMeta } from "../lib/model.ts";
const rule: Rule = {
  id: "cv",
  name: "Resume",
  description: "",
  required: true,
  extensions: "pdf",
  mimes: "application/pdf",
  maxMB: 2,
  maxPages: 2,
};
const file: DocumentMeta & { ruleId: string } = {
  id: "file",
  name: "resume.pdf",
  size: 100,
  type: "application/pdf",
  detected: "pdf",
  hash: "a".repeat(64),
  pages: 2,
  textPages: 2,
  ruleId: "cv",
};
test("missing required document blocks readiness", () => {
  const r = buildReport("Test", [rule], []);
  assert.equal(r.status, "Not ready");
  assert.equal(r.missing, 1);
});
test("actual valid mapped metadata passes configured checks", () => {
  const r = buildReport("Test", [rule], [file]);
  assert.equal(r.status, "All configured checks passed");
  assert.equal(r.completed, 1);
});
test("oversize and excessive page count fail", () => {
  const r = buildReport(
    "Test",
    [rule],
    [{ ...file, size: 4 * 1024 * 1024, pages: 3 }],
  );
  assert.equal(r.status, "Not ready");
  assert.ok(r.failed >= 2);
});
test("scanned page is manual review, never declared blank", () => {
  const r = buildReport("Test", [rule], [{ ...file, textPages: 0 }]);
  assert.equal(r.status, "Needs review");
  assert.ok(
    r.rows[0].findings.some(
      (f) => f.status === "review" && f.message.includes("scanned images"),
    ),
  );
});
test("different names with the same bytes warn", () => {
  const r = buildReport(
    "Test",
    [rule],
    [file, { ...file, id: "copy", name: "copy.pdf" }],
  );
  assert.equal(r.warnings, 2);
  assert.equal(r.status, "Needs review");
});
test("signature mismatch is a failed check", () =>
  assert.ok(
    validateFile({ ...file, detected: "jpg" }, rule, new Set()).some(
      (f) => f.check === "Detected format" && f.status === "failed",
    ),
  ));
test("file signatures read magic bytes", () => {
  assert.equal(detectFormat(new TextEncoder().encode("%PDF-1.7")), "pdf");
  assert.equal(detectFormat(new Uint8Array([255, 216, 255])), "jpg");
  assert.equal(detectFormat(new TextEncoder().encode("not a pdf")), "unknown");
});
test("archive names normalize traversal and collisions", () => {
  const n = archiveNames(["../a.pdf", "a.pdf", "A.pdf", "a.pdf"]);
  assert.ok(n.every((x) => !x.includes("/") && !x.startsWith(".")));
  assert.equal(new Set(n.map((x) => x.toLowerCase())).size, 4);
  assert.equal(safeName(""), "document");
});
test("optional absence does not falsely block readiness", () =>
  assert.equal(
    buildReport("Test", [{ ...rule, required: false }], []).status,
    "All configured checks passed",
  ));
test("unmapped files need review", () =>
  assert.equal(
    buildReport("Test", [rule], [file, { ...file, id: "x", ruleId: "" }])
      .status,
    "Needs review",
  ));
test("unsupported formats require manual review", () =>
  assert.ok(
    validateFile({ ...file, detected: "unknown" }, rule, new Set()).some(
      (f) => f.status === "review",
    ),
  ));
test("unreadable required PDF blocks readiness", () =>
  assert.equal(
    buildReport("Test", [rule], [{ ...file, error: "Unreadable" }]).status,
    "Not ready",
  ));
test("image dimensions enforce both axes", () => {
  const checks = validateFile(
    {
      ...file,
      name: "photo.png",
      type: "image/png",
      detected: "png",
      width: 200,
      height: 300,
    },
    { ...rule, extensions: "png", mimes: "image/png", minWidth: 300 },
    new Set(),
  );
  assert.ok(
    checks.some((f) => f.check === "Image dimensions" && f.status === "failed"),
  );
});
