import type { Report, LocalDocument } from "./model";
import { archiveNames } from "./validation/engine.ts";
export function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
export function exportJSON(report: Report) {
  download(
    new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }),
    "appliory-report.json",
  );
}
export function createCSV(report: Report) {
  const q = (s: unknown) => {
    let v = String(s ?? "");
    if (/^[\s\x00-\x1f]*[=+\-@]/.test(v) || /^[\t\r\n]/.test(v)) v = "'" + v;
    return '"' + v.replaceAll('"', '""') + '"';
  };
  const rows = [
    [
      "Checklist",
      "Timestamp",
      "Document",
      "File",
      "Bytes",
      "Status",
      "Check",
      "Finding",
      "Next action",
    ],
    ...report.rows.flatMap((r) =>
      r.findings.map((f) => [
        report.title,
        report.timestamp,
        r.rule.name,
        r.files
          .filter((x) => !f.fileId || x.id === f.fileId)
          .map((x) => x.name)
          .join("; "),
        r.files
          .filter((x) => !f.fileId || x.id === f.fileId)
          .reduce((n, x) => n + x.size, 0),
        f.status,
        f.check,
        f.message,
        f.action,
      ]),
    ),
  ];
  return new Blob(
    ["\ufeff" + rows.map((r) => r.map(q).join(",")).join("\r\n")],
    { type: "text/csv;charset=utf-8" },
  );
}
export async function createPDF(report: Report) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  let page = pdf.addPage();
  let y = 790;
  const line = (s: string, size = 10) => {
    const clean = s.replace(/[^\x20-\x7E]/g, " ");
    let part = "";
    for (const character of clean) {
      if (font.widthOfTextAtSize(part + character, size) > 490) {
        draw(part);
        part = character;
      } else part += character;
    }
    draw(part);
    function draw(t: string) {
      if (y < 48) {
        page = pdf.addPage();
        y = 790;
      }
      page.drawText(t.trim(), {
        x: 48,
        y,
        size,
        font,
        color: rgb(0.1, 0.16, 0.2),
      });
      y -= size + 7;
    }
  };
  line("APPLIORY | Document readiness report", 20);
  line(report.title, 15);
  line(report.timestamp);
  line(report.status, 13);
  line(
    `Completed: ${report.completed} | Missing: ${report.missing} | Failed checks: ${report.failed} | Warnings: ${report.warnings} | Review: ${report.review}`,
  );
  line(
    "Technical checks only. Verify current official instructions. Acceptance is not guaranteed.",
  );
  for (const row of report.rows) {
    y -= 10;
    line(row.rule.name, 13);
    row.files.forEach((f) =>
      line(`${f.name} | ${f.size} bytes | ${f.detected} | SHA-256 ${f.hash}`),
    );
    row.findings.forEach((f) => {
      line(
        `[${f.status.toUpperCase()}] ${f.fileName ? f.fileName + " | " : ""}${f.check}: ${f.message}`,
      );
      if (f.status !== "pass") line("Next: " + f.action);
    });
  }
  if (report.unmapped.length) {
    line("Unmapped files", 13);
    report.unmapped.forEach((f) => line(f.name + " | " + f.size + " bytes"));
  }
  return new Blob([(await pdf.save()) as BlobPart], {
    type: "application/pdf",
  });
}
export async function createZIP(docs: LocalDocument[], report: Report) {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  const names = archiveNames(docs.map((d) => d.name));
  for (let i = 0; i < docs.length; i++)
    zip.file("documents/" + names[i], await docs[i].file.arrayBuffer());
  zip.file("appliory-report.json", JSON.stringify(report, null, 2));
  return await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
}

export function exportCSV(report: Report) {
  download(createCSV(report), "appliory-report.csv");
}
export async function exportPDF(report: Report) {
  download(await createPDF(report), "appliory-report.pdf");
}
export async function exportZIP(docs: LocalDocument[], report: Report) {
  download(await createZIP(docs, report), "appliory-document-pack.zip");
}
