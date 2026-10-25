"use client";
import { useState } from "react";
import { FileText, Copy, Download, Printer } from "lucide-react";
import { extractPDFText } from "@/lib/extract-pdf-text";
import {
  summarizePages,
  summaryText,
  escapeSummaryHTML,
  type TextPage,
} from "@/lib/document-summary";
import { download } from "@/lib/reports";
import { safeName } from "@/lib/validation/engine";
export default function PDFContentSummary({ file }: { file: File }) {
  const [pages, setPages] = useState<TextPage[] | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [progress, setProgress] = useState(""),
    [mode, setMode] = useState<"brief" | "detailed">("detailed"),
    [notice, setNotice] = useState("");
  const summary = pages ? summarizePages(pages, mode) : null;
  async function generate() {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      const p = await extractPDFText(file, (n, t) =>
        setProgress(`Reading page ${n} of ${t}…`),
      );
      if (!p.some((p) => /[\p{L}\p{N}]/u.test(p.text)))
        throw new Error(
          "This PDF has no extractable text. It may contain scanned images. OCR is required before a content summary can be created.",
        );
      setPages(p);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read PDF text.");
    } finally {
      setBusy(false);
      setProgress("");
    }
  }
  function printSummary() {
    if (!summary) return;
    const text = summaryText(file.name, summary);
    const win = window.open("", "_blank");
    if (!win) {
      setError(
        "The print window was blocked. Allow this popup or download the TXT summary instead.",
      );
      return;
    }
    win.opener = null;
    win.document.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>Appliory document summary</title><style>body{font:15px/1.7 system-ui,sans-serif;color:#18363c;max-width:800px;margin:40px auto;padding:0 20px}pre{font:inherit;white-space:pre-wrap;overflow-wrap:anywhere}@media print{body{margin:0;max-width:none}@page{margin:18mm}}</style></head><body><pre>${escapeSummaryHTML(text)}</pre></body></html>`,
    );
    win.document.close();
    win.focus();
    win.print();
  }
  return (
    <section
      className="content-summary"
      aria-label={"Content summary for " + file.name}
    >
      <div className="content-summary-heading">
        <div>
          <h3>
            <FileText size={19} />
            Document content summary
          </h3>
          <strong className="summary-filename">{file.name}</strong>
          <p>
            Read an overview and page-by-page highlights from this PDF’s actual
            text.
          </p>
        </div>
        {!pages && (
          <button
            className="button dark"
            disabled={busy}
            onClick={() => void generate()}
          >
            {busy ? "Reading PDF…" : "Generate document summary"}
          </button>
        )}
      </div>
      <p className="summary-method">
        Selected excerpts from this file only: no added facts or AI rewrite.
        Whitespace may be normalized. Excerpts can omit context; verify
        conditions, dates, amounts and tables in the original. Expand the source
        text below to compare.
      </p>
      {busy && (
        <p className="busy" role="status">
          {progress || "Reading text on your device…"}
        </p>
      )}
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      {summary && (
        <>
          <div className="summary-toolbar">
            <label>
              Summary length
              <select
                value={mode}
                onChange={(e) =>
                  setMode(e.target.value as "brief" | "detailed")
                }
              >
                <option value="brief">Brief</option>
                <option value="detailed">Detailed</option>
              </select>
            </label>
            <span>
              {summary.pages.length} pages ·{" "}
              {summary.wordCount.toLocaleString()} extracted words
            </span>
          </div>
          {summary.missingTextPages.length > 0 && (
            <p className="summary-warning">
              No readable text on page(s) {summary.missingTextPages.join(", ")}.
              Those pages are not summarized. OCR is not included.
            </p>
          )}
          <h4>Selected excerpts — overview</h4>
          <ul className="summary-points">
            {summary.overview.map((p, i) => (
              <li key={i}>
                {p.text}
                <span className="source-page">Source: page {p.page}</span>
              </li>
            ))}
          </ul>
          <h4>Page-by-page details</h4>
          <div className="summary-pages">
            {summary.pages.map((p) => (
              <details key={p.number} open={summary.pages.length <= 8}>
                <summary>
                  Page {p.number} · {p.wordCount} words
                </summary>
                {p.points.length ? (
                  <ul className="summary-points">
                    {p.points.map((text, i) => (
                      <li key={i}>{text}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No selectable text. Review this page manually.</p>
                )}
                {p.sourceText && (
                  <details className="summary-source">
                    <summary>
                      View extracted source text — page {p.number}
                    </summary>
                    <pre>{p.sourceText}</pre>
                  </details>
                )}
              </details>
            ))}
          </div>
          <div className="summary-actions">
            <button
              className="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    summaryText(file.name, summary),
                  );
                  setNotice("Summary copied.");
                } catch {
                  setNotice(
                    "Copy is unavailable in this browser. Use Download TXT.",
                  );
                }
              }}
            >
              <Copy size={16} />
              Copy summary
            </button>
            <button
              className="button dark"
              onClick={() =>
                download(
                  new Blob([summaryText(file.name, summary)], {
                    type: "text/plain;charset=utf-8",
                  }),
                  safeName(file.name.replace(/\.pdf$/i, "")) + "-summary.txt",
                )
              }
            >
              <Download size={16} />
              Download TXT
            </button>
            <button className="button" onClick={printSummary}>
              <Printer size={16} />
              Print / Save PDF
            </button>
          </div>
          {notice && <p role="status">{notice}</p>}
          {notice.startsWith("Copy is unavailable") && (
            <label className="field">
              Select and copy this summary (Ctrl+C, or Cmd+C on Mac)
              <textarea
                readOnly
                value={summaryText(file.name, summary)}
                rows={10}
                onFocus={(e) => e.currentTarget.select()}
              />
            </label>
          )}
        </>
      )}
    </section>
  );
}
