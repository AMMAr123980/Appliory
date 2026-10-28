/* eslint-disable @next/next/no-img-element -- Local blob preview must stay on-device and cannot use a server image optimizer. */
"use client";
import { useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  Download,
  X,
  ShieldCheck,
  RotateCcw,
  Check,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
import { tools, type ToolSlug } from "@/lib/tool-catalog";
import type { LocalDocument } from "@/lib/model";
import { inspectFile, transformImage } from "@/lib/process";
import { download } from "@/lib/reports";
import { filePackError } from "@/lib/file-limits";
import Link from "next/link";
import PDFContentSummary from "./pdf-content-summary";
const human = (n: number) =>
  n < 1024 * 1024
    ? (n / 1024).toFixed(1) + " KB"
    : (n / 1024 / 1024).toFixed(2) + " MB";
export default function QuickTool({ slug }: { slug: ToolSlug }) {
  const config = tools.find((t) => t.slug === slug)!;
  const isImage = slug === "image-resizer" || slug === "image-compressor";
  const [docs, setDocs] = useState<LocalDocument[]>([]);
  const [busy, setBusy] = useState(false),
    [drag, setDrag] = useState(false),
    [error, setError] = useState("");
  const [limit, setLimit] = useState(5),
    [width, setWidth] = useState(600),
    [height, setHeight] = useState(600),
    [locked, setLocked] = useState(true),
    [target, setTarget] = useState(200),
    [format, setFormat] = useState("image/jpeg");
  const [output, setOutput] = useState<LocalDocument | null>(null),
    [preview, setPreview] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const source = docs[0];
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  async function add(files: FileList | File[] | null) {
    if (!files?.length || busy) return;
    const batch = Array.from(files);
    setError("");
    setOutput(null);
    if (isImage && batch.length > 1) {
      setError("Choose one image at a time.");
      return;
    }
    const keep = isImage ? [] : docs;
    const limitError = filePackError(keep, batch);
    if (limitError) {
      setError(limitError);
      if (input.current) input.current.value = "";
      return;
    }
    if (
      slug === "pdf-page-counter" &&
      batch.some((f) => !f.name.toLowerCase().endsWith(".pdf"))
    ) {
      setError("Choose PDF files for the page counter.");
      return;
    }
    setBusy(true);
    try {
      const next: LocalDocument[] = [];
      for (const f of batch) {
        const d = await inspectFile(f, "", {
          content: !["file-size-checker", "duplicate-file-finder"].includes(
            slug,
          ),
        });
        if (isImage && (!d.width || d.error))
          throw new Error("Choose a readable JPG, PNG or WebP image.");
        if (slug === "pdf-page-counter" && d.detected !== "pdf")
          throw new Error(
            "This file does not contain a recognizable PDF signature.",
          );
        next.push(d);
      }
      setDocs([...keep, ...next]);
      if (isImage) {
        setWidth(next[0].width!);
        setHeight(next[0].height!);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read this file.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }
  function resize(axis: "width" | "height", n: number) {
    setOutput(null);
    if (axis === "width") {
      setWidth(n);
      if (locked && source?.width && source.height)
        setHeight(Math.max(1, Math.round((n * source.height) / source.width)));
    } else {
      setHeight(n);
      if (locked && source?.height && source.width)
        setWidth(Math.max(1, Math.round((n * source.width) / source.height)));
    }
  }
  async function create() {
    if (!source) return;
    setError("");
    setOutput(null);
    if (
      !Number.isInteger(width) ||
      !Number.isInteger(height) ||
      width < 1 ||
      height < 1 ||
      width * height > 25000000 ||
      width > 16384 ||
      height > 16384
    ) {
      setError(
        "Use positive whole-pixel dimensions, up to 16,384 per side and 25 megapixels total.",
      );
      return;
    }
    if (
      slug === "image-compressor" &&
      (!Number.isFinite(target) || target < 1 || target > 25000)
    ) {
      setError("Enter a target from 1 to 25,000 KB.");
      return;
    }
    setBusy(true);
    try {
      const f = await transformImage(
        source.file,
        width,
        height,
        format,
        slug === "image-compressor" ? target : 0,
      );
      const result = await inspectFile(f);
      setPreview(URL.createObjectURL(f));
      setOutput(result);
      toast.success("Your image is ready to review.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create image.");
    } finally {
      setBusy(false);
    }
  }
  const duplicateGroups = Object.values(
    docs.reduce<Record<string, LocalDocument[]>>((groups, d) => {
      (groups[d.hash] ??= []).push(d);
      return groups;
    }, {}),
  ).filter((g): g is LocalDocument[] => !!g && g.length > 1);
  const validLimit = Number.isFinite(limit) && limit > 0 && limit <= 25;
  function summary() {
    const data = {
      tool: config.name,
      createdAt: new Date().toISOString(),
      ...(slug === "file-size-checker"
        ? { maximumMB: limit, bytesPerMB: 1048576 }
        : {}),
      files: docs.map((d) => ({
        id: d.id,
        name: d.name,
        size: d.size,
        type: d.type,
        detected: d.detected,
        hash: d.hash,
        pages: d.pages,
        textPages: d.textPages,
        width: d.width,
        height: d.height,
        error: d.error,
        ...(slug === "file-size-checker"
          ? { withinLimit: d.size <= limit * 1024 * 1024 }
          : {}),
      })),
      ...(slug === "duplicate-file-finder"
        ? { duplicateGroups: duplicateGroups.map((g) => g.map((d) => d.name)) }
        : {}),
    };
    download(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
      "appliory-" + slug + ".json",
    );
  }
  return (
    <section
      className="quick-workspace"
      aria-label={config.name + " workspace"}
    >
      <div className="quick-workspace-top">
        <span>
          <ShieldCheck size={16} /> Local processing. No document uploads.
        </span>
        <button
          className="tiny-button"
          disabled={busy || !docs.length}
          onClick={() => {
            setDocs([]);
            setOutput(null);
            setPreview("");
            setError("");
          }}
        >
          <RotateCcw size={15} /> Clear files
        </button>
      </div>
      {slug === "file-size-checker" && (
        <label className="quick-limit">
          Maximum size per file (MB)
          <input
            type="number"
            min="0.01"
            max="25"
            step="0.01"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
          <small>
            Use the exact requirement from your application. 1 MB = 1,048,576
            bytes.
          </small>
        </label>
      )}
      <div
        className={"dropzone quick-dropzone " + (drag ? "dragging" : "")}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          void add(e.dataTransfer.files);
        }}
      >
        <span className="upload-symbol">
          <UploadCloud size={28} />
        </span>
        <h2>
          {isImage
            ? "Choose an image to get started"
            : "Add your files to get started"}
        </h2>
        <p>Drag and drop here, or select from your device.</p>
        <button
          className="button dark"
          disabled={busy}
          onClick={() => input.current?.click()}
        >
          <UploadCloud size={18} />
          {busy
            ? "Reading your files…"
            : isImage
              ? "Choose image"
              : "Choose files"}
        </button>
        <input
          ref={input}
          type="file"
          hidden
          multiple={!isImage}
          accept={config.accepts || undefined}
          aria-label="Select tool files"
          onChange={(e) => void add(e.target.files)}
        />
        <small>
          25 MB per file · {isImage ? "JPG, PNG and WebP" : "40 files maximum"}{" "}
          · No registration
        </small>
      </div>
      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
      {busy && (
        <p role="status" className="busy">
          Processing on your device. Please keep this tab open.
        </p>
      )}
      {docs.length > 0 && (
        <div className="quick-results">
          <div className="quick-result-title">
            <h2>{isImage ? "Your original image" : "Your results"}</h2>
            {!isImage && (
              <button
                className="button"
                disabled={busy || (slug === "file-size-checker" && !validLimit)}
                onClick={summary}
              >
                <Download size={16} /> Download file details (JSON)
              </button>
            )}
          </div>
          {slug === "file-size-checker" && !validLimit && (
            <p role="alert" className="error-message">
              Enter a maximum size above 0 and up to 25 MB.
            </p>
          )}
          {docs.map((d) => (
            <div key={d.id} className="quick-file-row">
              <div>
                <strong>{d.name}</strong>
                <small>
                  {human(d.size)} · {d.size.toLocaleString()} bytes
                  {d.width ? ` · ${d.width} × ${d.height} px` : ""}
                </small>
                {slug === "pdf-page-counter" && (
                  <p>
                    {d.error ? (
                      <span className="error-message">{d.error}</span>
                    ) : (
                      <>
                        <b>{d.pages} pages</b> · {d.textPages} with selectable
                        text
                        {d.textPages !== d.pages && (
                          <span className="review-tag">
                            Manual review needed for pages without text
                          </span>
                        )}
                      </>
                    )}
                  </p>
                )}
                {slug === "file-size-checker" && validLimit && (
                  <span
                    className={
                      "badge " +
                      (d.size <= limit * 1024 * 1024 ? "green" : "red")
                    }
                  >
                    {d.size <= limit * 1024 * 1024
                      ? "Within your limit"
                      : "Exceeds your limit"}
                  </span>
                )}
              </div>
              <button
                className="icon-button"
                aria-label={"Remove " + d.name}
                disabled={busy}
                onClick={() => {
                  setDocs(docs.filter((x) => x.id !== d.id));
                  setOutput(null);
                }}
              >
                <X size={18} />
              </button>
            </div>
          ))}
          {slug === "pdf-page-counter" && (
            <p className="technical-report-note">
              File details (JSON) contain technical information only. For a
              readable summary of the document’s content, generate it below.
            </p>
          )}
          {slug === "pdf-page-counter" &&
            docs
              .filter((d) => d.detected === "pdf")
              .map((d) => <PDFContentSummary key={d.id} file={d.file} />)}
          {slug === "duplicate-file-finder" && (
            <div className="duplicate-results">
              <h3>
                {docs.length < 2
                  ? "Add at least two files to compare"
                  : duplicateGroups.length
                    ? duplicateGroups.length + " duplicate group(s) found"
                    : "No exact duplicates in these files"}
              </h3>
              {duplicateGroups.map((g, i) => (
                <div key={g[0].hash}>
                  <b>Group {i + 1} — identical file bytes</b>
                  <ul>
                    {g.map((d) => (
                      <li key={d.id}>{d.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <p>
                Files are compared by SHA-256. Nothing is automatically deleted.
              </p>
            </div>
          )}
          {isImage && (
            <>
              <fieldset
                className="image-controls"
                disabled={busy}
                aria-label="Image settings"
              >
                <label>
                  Width (px)
                  <input
                    type="number"
                    min="1"
                    max="16384"
                    value={width}
                    onChange={(e) => resize("width", Number(e.target.value))}
                  />
                </label>
                <label>
                  Height (px)
                  <input
                    type="number"
                    min="1"
                    max="16384"
                    value={height}
                    onChange={(e) => resize("height", Number(e.target.value))}
                  />
                </label>
                <label>
                  Output format
                  <select
                    value={format}
                    onChange={(e) => {
                      setFormat(e.target.value);
                      setOutput(null);
                    }}
                  >
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/webp">WebP</option>
                    {slug !== "image-compressor" && (
                      <option value="image/png">PNG</option>
                    )}
                  </select>
                </label>
                {slug === "image-compressor" && (
                  <label>
                    Target size (KB)
                    <input
                      type="number"
                      min="1"
                      max="25000"
                      value={target}
                      onChange={(e) => {
                        setTarget(Number(e.target.value));
                        setOutput(null);
                      }}
                    />
                  </label>
                )}
              </fieldset>
              {slug === "image-compressor" && (
                <div className="preset-block">
                  <span className="preset-title">Quick Target Presets:</span>
                  <div className="preset-chips">
                    {[
                      { kb: 20, tag: "20 KB", note: "Govt jobs" },
                      { kb: 50, tag: "50 KB", note: "Portals" },
                      { kb: 100, tag: "100 KB", note: "Admissions" },
                      { kb: 200, tag: "200 KB", note: "Standard" },
                      { kb: 500, tag: "500 KB", note: "Email" },
                    ].map((item) => (
                      <button
                        key={item.kb}
                        type="button"
                        className={`chip-button ${target === item.kb ? "active" : ""}`}
                        onClick={() => {
                          setTarget(item.kb);
                          setOutput(null);
                        }}
                      >
                        <b>{item.tag}</b>
                        <small>{item.note}</small>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {slug === "image-resizer" && (
                <div className="preset-block">
                  <span className="preset-title">Standard Size Presets:</span>
                  <div className="preset-chips">
                    {[
                      { label: "Passport (600×600)", w: 600, h: 600 },
                      { label: "ID Photo (413×531)", w: 413, h: 531 },
                      { label: "Square (800×800)", w: 800, h: 800 },
                      { label: "Full HD (1920×1080)", w: 1920, h: 1080 },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        className={`chip-button ${width === item.w && height === item.h ? "active" : ""}`}
                        onClick={() => {
                          setLocked(false);
                          setWidth(item.w);
                          setHeight(item.h);
                          setOutput(null);
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <label className="ratio-lock">
                <input
                  type="checkbox"
                  disabled={busy}
                  checked={locked}
                  onChange={(e) => setLocked(e.target.checked)}
                />{" "}
                Keep original aspect ratio
              </label>
              <button
                className="button dark"
                disabled={busy}
                onClick={() => void create()}
              >
                {busy
                  ? "Creating…"
                  : "Create " +
                    (slug === "image-resizer" ? "resized" : "compressed") +
                    " image"}
              </button>
              {output && (
                <div className="image-output">
                  <div>
                    <h3>Your new image</h3>
                    <p>
                      {output.width} × {output.height} px · {human(output.size)}{" "}
                      · {output.type}
                    </p>
                    {slug === "image-compressor" && (
                      <p
                        className={
                          output.size <= target * 1024
                            ? "success-message"
                            : "error-message"
                        }
                      >
                        {output.size <= target * 1024 ? (
                          <Check size={16} />
                        ) : (
                          <TriangleAlert size={16} />
                        )}{" "}
                        {output.size <= target * 1024
                          ? "Target reached."
                          : "Target not reached. Try smaller dimensions."}{" "}
                        Original: {human(source.size)}.
                      </p>
                    )}
                    {slug === "image-compressor" && (
                      <p
                        className={
                          output.size > source.size
                            ? "summary-warning"
                            : "success-message"
                        }
                      >
                        {output.size > source.size
                          ? "The output is larger than your original. Keep the original or reduce dimensions."
                          : `${Math.round((1 - output.size / Math.max(1, source.size)) * 100)}% smaller than your original.`}
                      </p>
                    )}
                    <button
                      className="button dark"
                      onClick={() => download(output.file, output.name)}
                    >
                      <Download size={17} />
                      Download image
                    </button>
                    <div className="next-action-card">
                      <span>Preparing other application documents?</span>
                      <div className="next-action-links">
                        <Link href="/tools/pdf-page-counter" className="button small">
                          Count PDF pages
                        </Link>
                        <Link href="/tools/file-size-checker" className="button small">
                          Check file size limits
                        </Link>
                        <Link href="/tool" className="button small dark">
                          Document checklist
                        </Link>
                      </div>
                    </div>
                  </div>
                  {preview && (
                    <img src={preview} alt="Preview of your processed image" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
