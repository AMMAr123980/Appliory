export type TextPage = { number: number; text: string };
export type SummaryPoint = { page: number; text: string };
export type DocumentSummary = {
  overview: SummaryPoint[];
  pages: {
    number: number;
    points: string[];
    wordCount: number;
    sourceText: string;
  }[];
  wordCount: number;
  missingTextPages: number[];
  mode: "brief" | "detailed";
};
const stopwords = new Set(
  "a an and are as at be been being by can could did do does for from had has have how i if in into is it its may more most no not of on or our should so such than that the their them then there these they this those through to under use used using was we were what when where which while who will with would you your".split(
    " ",
  ),
);
function words(text: string) {
  return (
    text
      .toLocaleLowerCase()
      .match(/[\p{L}\p{N}]{3,}/gu)
      ?.filter((w) => !stopwords.has(w)) || []
  );
}
function normalized(text: string) {
  return text.replace(/\s+/gu, " ").trim();
}
function sentences(text: string) {
  const plain = normalized(text);
  if (!plain) return [];
  // Sentence boundaries retain amounts, dates, punctuation and short statements.
  // Never remove near-duplicates: a single "not" or digit can reverse the meaning.
  const segments =
    typeof Intl.Segmenter === "function"
      ? Array.from(
          new Intl.Segmenter(undefined, { granularity: "sentence" }).segment(
            plain,
          ),
          (s) => s.segment.trim(),
        )
      : plain.split(/(?<=[.!?۔؟])\s+/u);
  return [...new Set(segments)].filter((s) => /[\p{L}\p{N}]/u.test(s));
}
function select(text: string, count: number): string[] {
  const candidates = sentences(text);
  if (candidates.length <= count) return candidates;
  const frequency = new Map<string, number>();
  for (const word of words(text))
    frequency.set(word, (frequency.get(word) || 0) + 1);
  const ranked = candidates
    .map((text, index) => {
      const tokens = words(text);
      const score =
        tokens.reduce((s, w) => s + Math.log(1 + (frequency.get(w) || 0)), 0) /
        Math.sqrt(Math.max(1, tokens.length));
      return { text, index, score };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index);
  // Keep adjacent context with a selected sentence; do not present isolated,
  // rewritten fragments. Excerpts are always contiguous source wording.
  const selected = new Set<number>();
  for (const c of ranked) {
    if (selected.size >= count) break;
    selected.add(c.index);
    if (selected.size < count && c.index + 1 < candidates.length)
      selected.add(c.index + 1);
  }
  const source = normalized(text);
  return [...selected]
    .sort((a, b) => a - b)
    .map((i) => candidates[i])
    .filter((point) => source.includes(point));
}
function countWords(text: string) {
  if (typeof Intl.Segmenter === "function")
    return Array.from(
      new Intl.Segmenter(undefined, { granularity: "word" }).segment(text),
    ).filter((s) => s.isWordLike).length;
  return text.match(/[\p{L}\p{N}]+/gu)?.length || 0;
}

export function summarizePages(
  input: TextPage[],
  mode: "brief" | "detailed" = "detailed",
): DocumentSummary {
  const pages = input.map((p) => ({
    number: p.number,
    points: select(p.text, mode === "detailed" ? 6 : 3),
    wordCount: countWords(p.text),
    sourceText: p.text,
  }));
  const nonempty = pages.filter((p) => p.points.length);
  const max = mode === "detailed" ? 10 : 5;
  const overviewPages =
    nonempty.length <= max
      ? nonempty
      : Array.from(
          { length: max },
          (_, i) =>
            nonempty[Math.round((i * (nonempty.length - 1)) / (max - 1))],
        );
  // Give every source page a chance before using more points from the same page.
  const overview: SummaryPoint[] = [];
  const seen = new Set<string>();
  for (let round = 0; round < 4 && overview.length < max; round++)
    for (const p of overviewPages) {
      const text = p.points[round];
      if (text && !seen.has(text) && overview.length < max) {
        seen.add(text);
        overview.push({ page: p.number, text });
      }
    }
  return {
    overview,
    pages,
    wordCount: pages.reduce((sum, p) => sum + p.wordCount, 0),
    missingTextPages: pages.filter((p) => !p.wordCount).map((p) => p.number),
    mode,
  };
}
export function summaryText(name: string, summary: DocumentSummary) {
  return [
    "APPLIORY — DOCUMENT CONTENT SUMMARY",
    name,
    "",
    "Extractive summary: selected excerpts from this file only. No added facts or AI rewrite. Whitespace may be normalized. Excerpts can omit important context; check the original, especially tables and conditions.",
    "",
    `Pages: ${summary.pages.length} | Extracted words: ${summary.wordCount}`,
    ...(summary.missingTextPages.length
      ? [
          `No readable text on pages: ${summary.missingTextPages.join(", ")}. OCR is not provided.`,
        ]
      : []),
    "",
    "OVERVIEW",
    ...summary.overview.map((p) => `• [Page ${p.page}] ${p.text}`),
    "",
    "PAGE-BY-PAGE DETAILS",
    ...summary.pages.flatMap((p) => [
      `Page ${p.number} — ${p.wordCount} extracted words`,
      ...(p.points.length
        ? p.points.map((t) => `• ${t}`)
        : ["No selectable text. Review the original page."]),
      "",
    ]),
  ].join("\n");
}
export function escapeSummaryHTML(text: string) {
  return text.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
