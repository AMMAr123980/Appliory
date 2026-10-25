import type {
  Rule,
  DocumentMeta,
  Finding,
  Report,
  AuditRow,
} from "../model.ts";
export function safeName(name: string) {
  let cleaned =
    name
      .normalize("NFKC")
      .replace(/[\\/\x00-\x1f<>:"|?*]/g, "_")
      .replace(/[\u202a-\u202e\u2066-\u2069]/g, "_")
      .replace(/^\.+/, "")
      .trim()
      .slice(0, 150)
      .replace(/[. ]+$/, "") || "document";
  if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(cleaned))
    cleaned = "_" + cleaned;
  return cleaned;
}
export function archiveNames(names: string[]) {
  const used = new Set<string>();
  return names.map((n) => {
    const base = safeName(n);
    let out = base;
    let i = 2;
    while (used.has(out.toLowerCase())) {
      const at = base.lastIndexOf(".");
      out =
        at > 0
          ? `${base.slice(0, at)}_${i++}${base.slice(at)}`
          : `${base}_${i++}`;
    }
    used.add(out.toLowerCase());
    return out;
  });
}
export function detectFormat(bytes: Uint8Array): string {
  const s = String.fromCharCode(...bytes.slice(0, 12));
  if (s.startsWith("%PDF-")) return "pdf";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes[0] === 137 && s.slice(1, 4) === "PNG") return "png";
  if (s.startsWith("RIFF") && s.slice(8, 12) === "WEBP") return "webp";
  return "unknown";
}
export function validateFile(
  file: DocumentMeta,
  rule: Rule,
  duplicates: Set<string>,
): Finding[] {
  const results: Finding[] = [];
  const add = (
    status: Finding["status"],
    check: string,
    message: string,
    action = "No action needed.",
  ) => results.push({ status, check, message, action });
  if (!file.name.trim())
    add("failed", "File name", "The file name is empty.", "Rename this file.");
  else add("pass", "File name", "The file has a name.");
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const actual = file.detected === "jpg" ? "jpeg" : file.detected;
  const normalized = ext === "jpg" ? "jpeg" : ext;
  if (
    !rule.extensions
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .includes(ext)
  )
    add(
      "failed",
      "Accepted extension",
      `.${ext} is outside the configured formats (${rule.extensions}).`,
      "Convert or replace the file.",
    );
  else add("pass", "Accepted extension", `.${ext} is accepted.`);
  if (actual === "unknown")
    add(
      "review",
      "Detected format",
      "This format cannot be verified by the browser checker.",
      "Open the file and verify its type manually.",
    );
  else if (actual !== normalized)
    add(
      "failed",
      "Detected format",
      `The contents appear to be ${file.detected}, but the extension is .${ext}.`,
      "Use the correct format and extension.",
    );
  else
    add("pass", "Detected format", "Signature and extension are consistent.");
  if (
    rule.mimes &&
    file.type &&
    !rule.mimes
      .split(",")
      .map((s) => s.trim())
      .includes(file.type)
  )
    add(
      "failed",
      "MIME type",
      `${file.type} is not an accepted MIME type.`,
      "Convert or replace the file.",
    );
  if (file.size === 0)
    add(
      "failed",
      "File size",
      "The file is empty.",
      "Replace it with a readable document.",
    );
  else if (file.size > rule.maxMB * 1024 * 1024)
    add(
      "failed",
      "File size",
      `The file exceeds the ${rule.maxMB} MB limit.`,
      "Compress a supported image or replace this file.",
    );
  else
    add("pass", "File size", `The file is within the ${rule.maxMB} MB limit.`);
  if (file.error)
    add(
      "failed",
      "Readability",
      file.error,
      "Open the original and export a fresh copy.",
    );
  if (duplicates.has(file.hash))
    add(
      "warning",
      "Duplicate content",
      "Another selected file has exactly the same SHA-256 hash.",
      "Remove the duplicate or confirm it is intentional.",
    );
  else add("pass", "Duplicate content", "No exact duplicate was found.");
  if (file.detected === "pdf" && !file.error) {
    if (file.pages !== undefined) {
      const ok =
        (!rule.minPages || file.pages >= rule.minPages) &&
        (!rule.maxPages || file.pages <= rule.maxPages);
      add(
        ok ? "pass" : "failed",
        "PDF page count",
        `${file.pages} pages; configured range: ${rule.minPages || 1}–${rule.maxPages || "no maximum"}.`,
        ok
          ? undefined
          : "Adjust the PDF page count outside Appliory and replace the file.",
      );
    } else
      add(
        "unchecked",
        "PDF page count",
        "Page count could not be determined.",
        "Check the PDF manually.",
      );
    if (file.textPages !== undefined && file.textPages === file.pages)
      add(
        "pass",
        "Selectable text",
        "Selectable text was found on every page.",
      );
    else
      add(
        "review",
        "Selectable text",
        `${(file.pages || 0) - (file.textPages || 0)} pages have no extractable text. They may contain scanned images.`,
        "Inspect those pages visually; use OCR outside Appliory if needed.",
      );
  }
  if (file.width && file.height) {
    const ok =
      (!rule.minWidth || file.width >= rule.minWidth) &&
      (!rule.maxWidth || file.width <= rule.maxWidth) &&
      (!rule.minHeight || file.height >= rule.minHeight) &&
      (!rule.maxHeight || file.height <= rule.maxHeight);
    add(
      ok ? "pass" : "failed",
      "Image dimensions",
      `${file.width} × ${file.height} pixels.`,
      ok ? undefined : "Use the image resize tool, then validate again.",
    );
  }
  if (
    (rule.minWidth || rule.maxWidth || rule.minHeight || rule.maxHeight) &&
    (!file.width || !file.height)
  )
    add(
      "unchecked",
      "Image dimensions",
      "The configured pixel dimensions could not be checked for this file.",
      "Use a readable JPG, PNG or WebP image, or remove pixel limits if they do not apply.",
    );
  if ((rule.minPages || rule.maxPages) && file.detected !== "pdf")
    add(
      "unchecked",
      "PDF page count",
      "The configured PDF page limit could not be checked for this file.",
      "Use a readable PDF, or remove PDF page limits if they do not apply.",
    );
  if (rule.filename) {
    const ok = file.name.toLowerCase().includes(rule.filename.toLowerCase());
    add(
      ok ? "pass" : "warning",
      "Naming convention",
      ok
        ? "Name contains the configured text."
        : `Name should contain “${rule.filename}”.`,
      ok ? undefined : "Rename the file to include the requested text.",
    );
  }
  return results;
}
export function buildReport(
  title: string,
  rules: Rule[],
  docs: (DocumentMeta & { ruleId: string })[],
): Report {
  const counts = new Map<string, number>();
  docs.forEach((d) => counts.set(d.hash, (counts.get(d.hash) || 0) + 1));
  const duplicates = new Set(
    [...counts].filter(([, n]) => n > 1).map(([h]) => h),
  );
  const rows: AuditRow[] = rules.map((rule) => {
    const files = docs.filter((d) => d.ruleId === rule.id);
    return {
      rule,
      files: files.map(
        ({
          id,
          name,
          size,
          type,
          detected,
          hash,
          pages,
          textPages,
          width,
          height,
          error,
        }) => ({
          id,
          name,
          size,
          type,
          detected,
          hash,
          pages,
          textPages,
          width,
          height,
          error,
        }),
      ),
      findings: files.length
        ? files.flatMap((f) =>
            validateFile(f, rule, duplicates).map((finding) => ({
              ...finding,
              fileId: f.id,
              fileName: f.name,
            })),
          )
        : [
            {
              status: rule.required ? "missing" : "unchecked",
              check: "Document mapping",
              message: rule.required
                ? "Required document has no mapped file."
                : "Optional document has no mapped file.",
              action: rule.required
                ? "Add and map this document."
                : "Confirm whether this item applies to your application.",
            },
          ],
    };
  });
  const findings = rows.flatMap((r) => r.findings);
  const missing = rows.filter((r) => r.rule.required && !r.files.length).length;
  const failed = findings.filter((f) => f.status === "failed").length;
  const warnings = findings.filter((f) => f.status === "warning").length;
  const review = findings.filter(
    (f) =>
      f.status === "review" ||
      (f.status === "unchecked" && f.check !== "Document mapping"),
  ).length;
  const unmapped = docs
    .filter((d) => !rules.some((r) => r.id === d.ruleId))
    .map(
      ({
        id,
        name,
        size,
        type,
        detected,
        hash,
        pages,
        textPages,
        width,
        height,
        error,
      }) => ({
        id,
        name,
        size,
        type,
        detected,
        hash,
        pages,
        textPages,
        width,
        height,
        error,
      }),
    );
  const complete = rows.filter(
    (r) =>
      r.files.length &&
      !r.findings.some((f) =>
        ["failed", "review", "warning", "unchecked"].includes(f.status),
      ),
  ).length;
  return {
    title,
    timestamp: new Date().toISOString(),
    rows,
    unmapped,
    status:
      missing ||
      rows.some(
        (r) => r.rule.required && r.findings.some((f) => f.status === "failed"),
      )
        ? "Not ready"
        : failed || warnings || review || unmapped.length
          ? "Needs review"
          : "All configured checks passed",
    completed: complete,
    missing,
    failed,
    warnings,
    review,
  };
}
