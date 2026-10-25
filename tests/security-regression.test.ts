import test from "node:test";
import assert from "node:assert/strict";
import { templates } from "../lib/model.ts";
import { checklistSchema, documentMetaSchema } from "../lib/schemas.ts";
import {
  buildReport,
  safeName,
  archiveNames,
} from "../lib/validation/engine.ts";
import { createCSV } from "../lib/reports.ts";
const item = templates[2].items[0];
test("all three application templates accept distinct valid fixtures and fail a missing required document", () => {
  for (const t of templates) {
    assert.ok(
      checklistSchema.safeParse({ title: t.title, items: t.items }).success,
      t.slug,
    );
    const docs = t.items
      .filter((r) => r.required)
      .map((r, i) => ({
        id: `file-${i}`,
        ruleId: r.id,
        name: `${r.id}.pdf`,
        size: 100,
        type: "application/pdf",
        detected: "pdf",
        hash: i.toString(16).padStart(64, "0"),
        pages: 1,
        textPages: 1,
      }));
    assert.equal(
      buildReport(t.title, t.items, docs).status,
      "All configured checks passed",
      t.slug,
    );
    assert.equal(
      buildReport(t.title, t.items, docs.slice(1)).status,
      "Not ready",
      t.slug,
    );
  }
});
test("imports reject active URL schemes, empty extension entries and whitespace names", () => {
  for (const change of [
    { reference: "javascript:alert(1)" },
    { reference: "data:text/html,test" },
    { reference: "file:///etc/passwd" },
    { extensions: ",,," },
    { extensions: "pdf,,jpg" },
    { name: "   " },
  ])
    assert.equal(
      checklistSchema.safeParse({
        title: "Safe",
        items: [{ ...item, ...change }],
      }).success,
      false,
    );
  assert.ok(
    checklistSchema.safeParse({
      title: "Safe",
      items: [{ ...item, reference: "https://example.edu/apply" }],
    }).success,
  );
});
test("metadata rejects inconsistent pages, incomplete dimensions and fractional bytes", () => {
  const d = {
    id: "one",
    name: "test.pdf",
    size: 10,
    type: "application/pdf",
    detected: "pdf",
    hash: "a".repeat(64),
    pages: 1,
    textPages: 1,
  };
  for (const change of [
    { textPages: 2 },
    { pages: undefined },
    { width: 200 },
    { size: 1.5 },
    { id: "" },
    { detected: "executable" },
  ])
    assert.equal(
      documentMetaSchema.safeParse({ ...d, ...change }).success,
      false,
    );
});
test("uncheckable configured page and pixel limits never silently pass", () => {
  const d = {
    id: "one",
    name: "test.pdf",
    size: 10,
    type: "application/pdf",
    detected: "pdf",
    hash: "a".repeat(64),
    pages: 1,
    textPages: 1,
    ruleId: item.id,
  };
  assert.equal(
    buildReport("Test", [{ ...item, minWidth: 300 }], [d]).status,
    "Needs review",
  );
  assert.equal(
    buildReport(
      "Test",
      [{ ...item, extensions: "png", mimes: "image/png" }],
      [
        {
          ...d,
          name: "photo.png",
          type: "image/png",
          detected: "png",
          pages: undefined,
          textPages: undefined,
          width: 400,
          height: 400,
        },
      ],
    ).status,
    "Needs review",
  );
});
test("archive names neutralize Windows devices, trailing dots, bidi controls and path collisions", () => {
  const names = archiveNames([
    "CON.pdf",
    "nul",
    "com1.txt",
    "LPT9.jpg",
    "a.pdf.",
    "a.pdf",
    "..\\a.pdf",
    "ab\u202epdf.exe",
  ]);
  assert.equal(new Set(names.map((n) => n.toLowerCase())).size, names.length);
  for (const n of names) {
    assert.ok(!/[\\/\u202a-\u202e\u2066-\u2069]/.test(n));
    assert.ok(!/[. ]$/.test(n));
    assert.ok(!/^(con|nul|com1|lpt9)(\.|$)/i.test(n));
  }
  assert.equal(safeName("..."), "document");
});
test("CSV neutralizes formulas behind whitespace and line breaks", async () => {
  for (const title of ["=1+1", " +1+1", "\n@SUM(1)", "\t=1", "\r=1", " -1+1"]) {
    const report = buildReport(title, [item], []);
    const text = await createCSV(report).text();
    assert.ok(text.includes("\"'" + title + '"'), JSON.stringify(title));
  }
});
