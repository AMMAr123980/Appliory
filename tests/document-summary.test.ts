import test from "node:test";
import assert from "node:assert/strict";
import {
  summarizePages,
  summaryText,
  escapeSummaryHTML,
} from "../lib/document-summary.ts";
const input = [
  {
    number: 1,
    text: "The clinic client module manages patient registration and appointment scheduling. Staff can update patient profiles and review appointment history. Access permissions restrict clinical records to authorized staff.",
  },
  {
    number: 2,
    text: "Invoice creation is linked to completed appointments and recorded services. Billing staff can review payment status and outstanding balances. Reports display appointment counts and revenue totals.",
  },
  { number: 3, text: "" },
];
test("content overview uses actual source wording with correct page references", () => {
  const s = summarizePages(input);
  assert.ok(s.overview.length > 0);
  for (const p of s.overview)
    assert.ok(input.find((x) => x.number === p.page)!.text.includes(p.text));
  assert.ok(s.overview.some((p) => p.text.includes("patient")));
  assert.ok(s.overview.some((p) => p.page === 2));
  assert.deepEqual(s.missingTextPages, [3]);
});
test("scanned pages are explicitly missing text rather than given invented summaries", () => {
  const s = summarizePages([{ number: 1, text: "" }]);
  assert.equal(s.overview.length, 0);
  assert.deepEqual(s.missingTextPages, [1]);
  assert.ok(summaryText("scan.pdf", s).includes("OCR is not provided"));
});
test("detailed mode and TXT export include readable page details", () => {
  const s = summarizePages(input, "detailed");
  const text = summaryText("clinic.pdf", s);
  assert.ok(text.includes("DOCUMENT CONTENT SUMMARY"));
  assert.ok(text.includes("PAGE-BY-PAGE DETAILS"));
  assert.ok(text.includes("clinic.pdf"));
  assert.ok(
    s.pages[0].points.length >=
      summarizePages(input, "brief").pages[0].points.length,
  );
});
test("print output escapes document-supplied markup", () => {
  assert.equal(
    escapeSummaryHTML('<script>alert("x")</script>'),
    "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
  );
});

test("short fees, deadlines and negations remain exact source facts", () => {
  const text =
    "The full scholarship award covers the published academic tuition charges. Travel is not covered. Fee: PKR 2,500. Deadline: 10 November 2026.";
  const s = summarizePages([{ number: 1, text }], "detailed");
  const output = s.pages[0].points.join(" ");
  for (const fact of [
    "Travel is not covered.",
    "PKR 2,500",
    "10 November 2026",
  ])
    assert.ok(output.includes(fact), fact);
  for (const point of s.pages[0].points) assert.ok(text.includes(point));
});
test("near-identical opposite eligibility statements are not merged", () => {
  const text =
    "Applicants who hold the required certificate are eligible for the advertised scholarship award. Applicants who do not hold the required certificate are not eligible for the advertised scholarship award.";
  const s = summarizePages([{ number: 7, text }]);
  assert.equal(s.pages[0].points.length, 2);
  assert.ok(s.pages[0].points[1].includes("not eligible"));
  assert.ok(s.overview.every((p) => p.page === 7 && text.includes(p.text)));
});
test("separate documents never borrow facts from one another", () => {
  const first = summarizePages([
    {
      number: 1,
      text: "The research grant is PKR 12,345. The closing date is 17 December 2026.",
    },
  ]);
  const second = summarizePages([
    {
      number: 1,
      text: "The job interview is scheduled for 9 January 2027. No research grant is offered.",
    },
  ]);
  assert.ok(!summaryText("job.pdf", second).includes("12,345"));
  assert.ok(!summaryText("grant.pdf", first).includes("9 January"));
});
test("Urdu, lowercase text, decimals and mixed whitespace stay grounded", () => {
  const text =
    "درخواست کی آخری تاریخ 10 نومبر ہے۔ فیس 2500 روپے ہے۔\nminimum gpa is 2.75.\n  funding is not guaranteed.";
  const s = summarizePages([{ number: 2, text }]);
  const normalized = text.replace(/\s+/gu, " ").trim();
  assert.ok(s.pages[0].points.length > 0);
  for (const p of s.pages[0].points) assert.ok(normalized.includes(p), p);
  assert.equal(s.pages[0].sourceText, text);
  assert.ok(s.pages[0].points.join(" ").includes("2.75"));
});
test("long-document overview includes the final page and every page has source text", () => {
  const pages = Array.from({ length: 20 }, (_, i) => ({
    number: i + 1,
    text: `Section ${i + 1} contains the exact document requirements for this page.`,
  }));
  const s = summarizePages(pages);
  assert.ok(s.overview.some((p) => p.page === 20));
  for (const p of s.pages) assert.equal(p.sourceText, pages[p.number - 1].text);
});
test("punctuation alone produces no invented content and excerpts are never ellipsis-truncated", () => {
  assert.equal(
    summarizePages([{ number: 1, text: "... !!!" }]).overview.length,
    0,
  );
  const text = "Source text " + "very detailed wording ".repeat(80);
  const s = summarizePages([{ number: 1, text }]);
  assert.equal(s.pages[0].points[0], text.trim());
});
