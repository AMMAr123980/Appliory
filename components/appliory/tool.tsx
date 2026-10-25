"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  GraduationCap,
  School,
  BriefcaseBusiness,
  Plus,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  FileCheck2,
  GripVertical,
  Pencil,
  Copy,
  Trash2,
  ArrowUp,
  ArrowDown,
  Info,
  Check,
  CheckCheck,
  UploadCloud,
  FileText,
  X,
  RotateCcw,
  ScanLine,
  Download,
  FolderArchive,
  Braces,
  Table2,
  ImageIcon,
  Save,
  TriangleAlert,
  ExternalLink,
} from "lucide-react";
import {
  templates,
  newRule,
  uid,
  type Rule,
  type LocalDocument,
  type Report,
} from "@/lib/model";
import { buildReport, archiveNames, safeName } from "@/lib/validation/engine";
import { inspectFile, transformImage } from "@/lib/process";
import { createPDF, createCSV, createZIP, download } from "@/lib/reports";
import { filePackError } from "@/lib/file-limits";
import { checklistSchema, ruleSchema } from "@/lib/schemas";
import { Workspace, Badge } from "./shell";
const size = (n: number) =>
  n < 1024 * 1024
    ? `${(n / 1024).toFixed(0)} KB`
    : `${(n / 1024 / 1024).toFixed(2)} MB`;
const clone = (t: Rule[]) => t.map((r) => ({ ...r }));
const applicationTitle = (slug: string) =>
  "My " +
  (slug === "university"
    ? "university"
    : slug === "job"
      ? "job"
      : slug === "custom"
        ? "custom"
        : "scholarship") +
  " application";
export default function Tool() {
  const query = useSearchParams();
  const requested = query.get("template");
  const initial =
    templates.find((t) => t.slug === requested) ||
    (requested ? undefined : templates[0]);
  const [template, setTemplate] = useState(initial?.slug || "custom");
  const [title, setTitle] = useState(
    applicationTitle(initial?.slug || "custom"),
  );
  const [rules, setRules] = useState<Rule[]>(clone(initial?.items || []));
  const [docs, setDocs] = useState<LocalDocument[]>([]);
  const [step, setStep] = useState(0);
  const [report, setReport] = useState<Report | null>(null);
  const [prepared, setPrepared] = useState<{
    url: string;
    name: string;
    kind: string;
    report: Report;
  } | null>(null);
  useEffect(
    () => () => {
      if (prepared) URL.revokeObjectURL(prepared.url);
    },
    [prepared],
  );
  const [editing, setEditing] = useState<Rule | null>(null);
  const [image, setImage] = useState<LocalDocument | null>(null);
  const [busy, setBusy] = useState("");
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rename, setRename] = useState<LocalDocument | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const input = useRef<HTMLInputElement>(null);
  const stop = useRef(false);
  const fileCount = docs.length;
  const initialized = useRef(false);
  const choose = useCallback(
    (slug: string) => {
      const t = templates.find((x) => x.slug === slug);
      setTemplate(t?.slug || "custom");
      setTitle(applicationTitle(t?.slug || "custom"));
      setRules(t ? clone(t.items) : []);
      setDocs((d) => d.map((f) => ({ ...f, ruleId: "" })));
      setPrepared(null);
      setReport(null);
      setStep(0);
    },
    [setTemplate, setTitle],
  );
  // Initialize from URL and session storage, external state that is only available after mounting.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const t = query.get("template");
    if (t) choose(t);
    try {
      const saved = sessionStorage.getItem("appliory-open-checklist");
      if (saved) {
        sessionStorage.removeItem("appliory-open-checklist");
        if (saved.length > 1024 * 1024) throw new Error();
        const c = checklistSchema.parse(JSON.parse(saved));
        setTitle(c.title);
        setRules(c.items);
        setTemplate("custom");
      }
    } catch {
      /* Blocked storage or invalid saved data must not break the checker. */
    }
  }, [query, choose]);
  /* eslint-enable react-hooks/set-state-in-effect */
  function invalidate() {
    setPrepared(null);
    setReport(null);
  }
  async function addFiles(files: FileList | File[] | null) {
    if (!files || !files.length || busy) return;
    const batch = Array.from(files);
    if (batch.length + docs.length > 40) {
      toast.error("Use up to 40 files per document pack.");
      return;
    }
    if (
      batch.reduce((n, f) => n + f.size, 0) +
        docs.reduce((n, f) => n + f.size, 0) >
      200 * 1024 * 1024
    ) {
      toast.error("Keep your document pack below 200 MB.");
      return;
    }
    stop.current = false;
    setBusy("Reading documents on your device…");
    setProgress(0);
    let i = 0;
    try {
      for (const file of batch) {
        if (stop.current) break;
        if (file.size > 25 * 1024 * 1024) {
          toast.error(file.name + " exceeds the 25 MB processing limit.");
          continue;
        }
        const d = await inspectFile(file);
        setDocs((old) => [...old, d]);
        setProgress(Math.round((++i / batch.length) * 100));
      }
      invalidate();
    } catch {
      toast.error(
        "A file could not be processed. Try a smaller file or a different browser.",
      );
    } finally {
      setBusy("");
      if (input.current) input.current.value = "";
    }
  }
  function run() {
    if (!rules.length) {
      toast.error("Add at least one checklist item first.");
      return;
    }
    const result = buildReport(title, rules, docs);
    setPrepared(null);
    setReport(result);
    setStep(2);
    toast.success("Your configured document checks are complete.");
  }
  async function exportAction(kind: string) {
    if (!report) return;
    setBusy("Preparing your " + kind + "…");
    try {
      const blob =
        kind === "PDF"
          ? await createPDF(report)
          : kind === "CSV"
            ? createCSV(report)
            : kind === "JSON"
              ? new Blob([JSON.stringify(report, null, 2)], {
                  type: "application/json",
                })
              : await createZIP(docs, report);
      setPrepared({
        url: URL.createObjectURL(blob),
        name:
          kind === "ZIP"
            ? "appliory-document-pack.zip"
            : "appliory-report." + kind.toLowerCase(),
        kind,
        report,
      });
      toast.success(kind + " ready. Save your file below.");
    } catch {
      toast.error(
        "Could not create the download. Try again with a smaller document pack.",
      );
    } finally {
      setBusy("");
    }
  }
  function saveChecklist() {
    try {
      const data = checklistSchema.parse({
        title,
        category: template,
        items: rules,
      });
      download(
        new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
        safeName(title) + "-checklist.json",
      );
      toast.success("Checklist downloaded to your device.");
    } catch {
      toast.error("Check the title and requirements before downloading.");
    }
  }
  async function importChecklist(file?: File) {
    if (!file) return;
    try {
      if (file.size > 1024 * 1024) throw new Error();
      const c = checklistSchema.parse(JSON.parse(await file.text()));
      setTitle(c.title);
      setRules(c.items);
      setTemplate("custom");
      setDocs((d) => d.map((f) => ({ ...f, ruleId: "" })));
      setPrepared(null);
      setReport(null);
      setStep(0);
      toast.success("Your checklist is ready to edit.");
    } catch {
      toast.error("Choose a valid Appliory checklist JSON file under 1 MB.");
    }
  }
  const statusTone = (status: string) =>
    status === "pass"
      ? "green"
      : status === "failed" || status === "missing"
        ? "red"
        : "amber";
  return (
    <Workspace>
      <div className="breadcrumbs">
        Workspace <ChevronRight /> Document checker
      </div>
      <div className="workspace-heading">
        <div>
          <h2>Your document checker</h2>
          <p>Set your requirements, add your files, then check and download.</p>
        </div>
        <button
          className="button"
          disabled={!!busy}
          onClick={() => {
            if (
              docs.length &&
              !confirm(
                "Restart this audit? Selected files and results will be removed from this workspace.",
              )
            )
              return;
            setDocs([]);
            setPrepared(null);
            setReport(null);
            setStep(0);
          }}
        >
          <RotateCcw size={13} /> Start fresh
        </button>
      </div>
      <div className="steps" aria-label="Document preparation progress">
        {[
          "Your checklist",
          "Add documents",
          "Review results",
          "Export & finish",
        ].map((label, i) => (
          <div style={{ display: "contents" }} key={label}>
            {i > 0 && <span className="step-line" />}
            <button
              className={"step " + (step === i ? "active" : "")}
              aria-current={step === i ? "step" : undefined}
              disabled={
                !!busy ||
                (i > 1 && !report) ||
                (i === 1 && (!rules.length || !title.trim()))
              }
              onClick={() => setStep(i)}
            >
              <span className="step-circle">
                {i < step ? <Check size={11} /> : i + 1}
              </span>
              {label}
            </button>
          </div>
        ))}
      </div>
      <div className="tool-grid">
        <div>
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>
                  {
                    [
                      "Start with your checklist",
                      "Bring your documents together",
                      "Here’s what we found",
                      "Your next step, neatly packed",
                    ][step]
                  }
                </h2>
                <p>
                  {
                    [
                      "Choose a starting point, then make it yours.",
                      "Your files are read locally. Nothing is uploaded.",
                      "Real checks against the requirements you configured.",
                      "Download your report and organized files.",
                    ][step]
                  }
                </p>
              </div>
              <Badge tone="gray">STEP {step + 1} OF 4</Badge>
            </div>
            {step === 0 && (
              <>
                <div className="panel-body">
                  <div className="template-selector">
                    {[
                      ...templates.map((t, i) => ({
                        slug: t.slug,
                        name: ["Scholarship", "University", "Job application"][
                          i
                        ],
                        count: t.items.length,
                        Icon: [GraduationCap, School, BriefcaseBusiness][i],
                      })),
                      { slug: "custom", name: "Custom", count: 0, Icon: Plus },
                    ].map(({ slug, name, count, Icon }) => (
                      <button
                        key={slug}
                        className={
                          "template-option " +
                          (template === slug ? "selected" : "")
                        }
                        onClick={() => {
                          if (
                            rules.length &&
                            template !== slug &&
                            docs.length &&
                            !confirm(
                              "Change checklist? Your files will stay selected but need remapping.",
                            )
                          )
                            return;
                          choose(slug);
                        }}
                      >
                        <Icon size={22} />
                        <b>{name}</b>
                        <small>
                          {count
                            ? `${count} starter items`
                            : "Start from scratch"}
                        </small>
                      </button>
                    ))}
                  </div>
                  <div className="info-note">
                    <Info size={13} />
                    <span>
                      Starter templates are editable examples, not official
                      requirements. Check the latest instructions from your
                      institution or employer.
                    </span>
                  </div>
                  <div style={{ marginTop: 22 }}>
                    <label className="field">
                      Checklist name
                      <input
                        maxLength={120}
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          invalidate();
                        }}
                      />
                    </label>
                    <div className="page-title-row">
                      <b style={{ fontSize: 11 }}>
                        Your document requirements{" "}
                        <span style={{ color: "#9ba58f", fontWeight: 400 }}>
                          ({rules.length})
                        </span>
                      </b>
                      <button
                        className="tiny-button"
                        disabled={!rules.length}
                        onClick={saveChecklist}
                      >
                        <Save size={11} /> Download checklist
                      </button>
                    </div>
                    <label
                      className="button"
                      style={{ marginBottom: 16, cursor: "pointer" }}
                    >
                      <UploadCloud size={14} /> Import your checklist
                      <input
                        type="file"
                        accept=".json,application/json"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          void importChecklist(e.target.files?.[0]);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <div className="rule-list">
                      {rules.map((rule, i) => (
                        <div className="rule-row" key={rule.id}>
                          <span>
                            <GripVertical size={15} />
                          </span>
                          <span style={{ minWidth: 0, flex: 1 }}>
                            <strong>{rule.name}</strong>
                            <small>
                              {rule.extensions
                                .toUpperCase()
                                .replaceAll(",", ", ")}{" "}
                              · Up to {rule.maxMB} MB
                              {rule.maxPages
                                ? ` · ${rule.maxPages} pages max`
                                : ""}
                            </small>
                          </span>
                          <Badge tone={rule.required ? "green" : "gray"}>
                            {rule.required ? "Required" : "Optional"}
                          </Badge>
                          <div className="rule-actions">
                            <button
                              className="icon-button"
                              title="Edit requirement"
                              onClick={() => setEditing({ ...rule })}
                            >
                              <Pencil size={12} />
                            </button>
                            <button
                              className="icon-button"
                              title="Duplicate requirement"
                              disabled={rules.length >= 100}
                              onClick={() => {
                                setRules([
                                  ...rules,
                                  {
                                    ...rule,
                                    id: uid(),
                                    name: rule.name.slice(0, 93) + " (copy)",
                                  },
                                ]);
                                invalidate();
                              }}
                            >
                              <Copy size={12} />
                            </button>
                            <button
                              className="icon-button"
                              title="Move up"
                              disabled={i === 0}
                              onClick={() => {
                                const next = [...rules];
                                [next[i - 1], next[i]] = [next[i], next[i - 1]];
                                setRules(next);
                                invalidate();
                              }}
                            >
                              <ArrowUp size={12} />
                            </button>
                            <button
                              className="icon-button"
                              title="Move down"
                              disabled={i === rules.length - 1}
                              onClick={() => {
                                const next = [...rules];
                                [next[i], next[i + 1]] = [next[i + 1], next[i]];
                                setRules(next);
                                invalidate();
                              }}
                            >
                              <ArrowDown size={12} />
                            </button>
                            <button
                              className="icon-button"
                              title="Delete requirement"
                              onClick={() => {
                                setRules(rules.filter((x) => x.id !== rule.id));
                                setDocs((d) =>
                                  d.map((f) =>
                                    f.ruleId === rule.id
                                      ? { ...f, ruleId: "" }
                                      : f,
                                  ),
                                );
                                invalidate();
                              }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="add-rule"
                      disabled={rules.length >= 100}
                      onClick={() => setEditing(newRule())}
                    >
                      <Plus size={13} /> Add a document requirement
                    </button>
                  </div>
                </div>
                <div className="panel-footer">
                  <p>Your checklist, your requirements. Edit any item.</p>
                  <button
                    className="button dark"
                    disabled={!title.trim() || !rules.length}
                    onClick={() => setStep(1)}
                  >
                    Continue to documents <ArrowRight size={13} />
                  </button>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <div className="panel-body">
                  <div
                    className={"dropzone " + (dragging ? "dragging" : "")}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      if (!busy) addFiles(e.dataTransfer.files);
                    }}
                  >
                    <span className="upload-symbol">
                      <UploadCloud size={22} />
                    </span>
                    <h3>Drop your documents right here</h3>
                    <p>or choose files from your device</p>
                    <button
                      className="button dark"
                      disabled={!!busy}
                      onClick={() => input.current?.click()}
                    >
                      <Plus size={13} /> Choose documents
                    </button>
                    <small style={{ marginTop: 12 }}>
                      PDF, JPG, PNG, WEBP · Up to 25 MB each · 40 files maximum
                    </small>
                    <input
                      ref={input}
                      type="file"
                      multiple
                      hidden
                      onChange={(e) => addFiles(e.target.files)}
                      aria-label="Select documents"
                    />
                  </div>
                  {busy && (
                    <div role="status" className="busy">
                      {busy}
                      {(busy.startsWith("Reading documents") ||
                        busy.startsWith("Stopping after this file")) && (
                        <>
                          <progress
                            className="loading-bar"
                            value={progress}
                            max={100}
                          />
                          <button
                            className="tiny-button"
                            disabled={busy.startsWith(
                              "Stopping after this file",
                            )}
                            onClick={() => {
                              stop.current = true;
                              setBusy("Stopping after this file…");
                            }}
                          >
                            {busy.startsWith("Stopping after this file")
                              ? "Stop requested"
                              : "Stop after this file"}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  <div className="file-list">
                    {docs.map((d) => (
                      <div className="document-card" key={d.id}>
                        <div className="document-top">
                          <span className="file-symbol">
                            {d.width ? (
                              <ImageIcon size={18} />
                            ) : (
                              <FileText size={18} />
                            )}
                          </span>
                          <div>
                            <b>{d.name}</b>
                            <small>
                              {size(d.size)} · {d.detected.toUpperCase()}
                              {d.pages !== undefined
                                ? ` · ${d.pages} pages`
                                : ""}
                              {d.width ? ` · ${d.width} × ${d.height} px` : ""}
                            </small>
                          </div>
                          <button
                            className="icon-button"
                            aria-label={"Remove " + d.name}
                            disabled={!!busy}
                            onClick={() => {
                              setDocs(docs.filter((f) => f.id !== d.id));
                              invalidate();
                            }}
                          >
                            <X size={13} />
                          </button>
                        </div>
                        {d.error && <p className="error-message">{d.error}</p>}
                        <div className="document-bottom">
                          <select
                            disabled={!!busy}
                            aria-label={"Map " + d.name + " to requirement"}
                            value={d.ruleId}
                            onChange={(e) => {
                              setDocs(
                                docs.map((f) =>
                                  f.id === d.id
                                    ? { ...f, ruleId: e.target.value }
                                    : f,
                                ),
                              );
                              invalidate();
                            }}
                          >
                            <option value="">Match to a checklist item…</option>
                            {rules.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                          <button
                            className="tiny-button"
                            disabled={!!busy}
                            onClick={() => {
                              setRename(d);
                              setRenameValue(d.name);
                            }}
                          >
                            <Pencil size={11} />
                            Rename
                          </button>
                          {d.width && (
                            <button
                              className="tiny-button"
                              disabled={!!busy}
                              onClick={() => setImage(d)}
                            >
                              <ImageIcon size={11} />
                              Fix image
                            </button>
                          )}
                          <label
                            className="tiny-button"
                            style={{ cursor: "pointer" }}
                          >
                            Replace
                            <input
                              type="file"
                              disabled={!!busy}
                              hidden
                              onChange={async (e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                if (
                                  f.size > 25 * 1024 * 1024 ||
                                  docs.reduce((sum, x) => sum + x.size, 0) -
                                    d.size +
                                    f.size >
                                    200 * 1024 * 1024
                                ) {
                                  toast.error(
                                    "Maximum file size is 25 MB and pack size is 200 MB.",
                                  );
                                  return;
                                }
                                setBusy("Reading replacement…");
                                try {
                                  const v = await inspectFile(f, d.ruleId);
                                  setDocs((old) =>
                                    old.map((x) => (x.id === d.id ? v : x)),
                                  );
                                  invalidate();
                                } catch {
                                  toast.error("Could not read replacement.");
                                } finally {
                                  setBusy("");
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="info-note">
                    <Info size={13} />
                    <span>
                      <b>
                        {
                          rules.filter(
                            (r) =>
                              r.required &&
                              !docs.some((d) => d.ruleId === r.id),
                          ).length
                        }{" "}
                        required documents not yet mapped.
                      </b>{" "}
                      Select a checklist item for every file. More than one file
                      can belong to an item.
                    </span>
                  </div>
                </div>
                <div className="panel-footer">
                  <button
                    className="text-link"
                    onClick={() => setStep(0)}
                    disabled={!!busy}
                    style={{ border: 0, background: "none", fontSize: 10 }}
                  >
                    <ArrowLeft size={12} /> Your checklist
                  </button>
                  <button
                    className="button dark"
                    disabled={!!busy}
                    onClick={run}
                  >
                    <ScanLine size={14} /> Run document checks
                  </button>
                </div>
              </>
            )}
            {step === 2 && report && (
              <>
                <div className="panel-body">
                  <div
                    className={
                      "report-banner " +
                      (report.status === "All configured checks passed"
                        ? "success"
                        : "")
                    }
                  >
                    <span>
                      {report.status === "All configured checks passed" ? (
                        <CheckCheck size={27} />
                      ) : (
                        <TriangleAlert size={27} />
                      )}
                    </span>
                    <div>
                      <h3>{report.status}</h3>
                      <p>
                        {report.status === "Not ready"
                          ? "Required documents are missing or have failed checks."
                          : report.status === "Needs review"
                            ? "Some checks or unmatched files need your attention."
                            : "All configured technical checks passed. Verify the official requirements before submitting."}
                      </p>
                    </div>
                  </div>
                  {report.unmapped.length > 0 && (
                    <div className="notice">
                      {report.unmapped.length} file(s) are not matched to a
                      checklist item. Map or remove them before exporting.
                    </div>
                  )}
                  <div className="panel">
                    {report.rows.map((row) => {
                      const bad = row.findings.find(
                        (f) => f.status === "failed" || f.status === "missing",
                      );
                      const warn = row.findings.find(
                        (f) =>
                          f.status === "warning" ||
                          f.status === "review" ||
                          f.status === "unchecked",
                      );
                      const st =
                        bad?.status ||
                        warn?.status ||
                        (row.files.length ? "pass" : "unchecked");
                      return (
                        <div className="finding-row" key={row.rule.id}>
                          <div>
                            <h3>{row.rule.name}</h3>
                            <Badge tone={statusTone(st)}>
                              {st === "pass"
                                ? "Passed"
                                : st === "missing"
                                  ? "Missing document"
                                  : st === "failed"
                                    ? "Failed check"
                                    : st === "unchecked"
                                      ? row.files.length
                                        ? "Not checked"
                                        : "Optional / not checked"
                                      : "Needs review"}
                            </Badge>
                          </div>
                          <p>
                            {row.files.length
                              ? row.files.map((f) => f.name).join(", ")
                              : "No file mapped to this requirement."}
                          </p>
                          {(bad || warn) && (
                            <small>{(bad || warn)?.action}</small>
                          )}
                          <details>
                            <summary>
                              See {row.findings.length} individual check
                              {row.findings.length !== 1 ? "s" : ""}
                            </summary>
                            {row.findings.map((f, i) => (
                              <div
                                className={"check-result " + f.status}
                                key={i}
                              >
                                {f.status === "pass" ? <Check /> : <Info />}
                                <div>
                                  <b>
                                    {f.check} · {f.status}
                                  </b>
                                  {f.fileName && (
                                    <small>File: {f.fileName}</small>
                                  )}
                                  <p>{f.message}</p>
                                  {f.status !== "pass" && (
                                    <p>Next: {f.action}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </details>
                        </div>
                      );
                    })}
                  </div>
                  <div className="info-note">
                    <Info size={13} />
                    Checks cover your configured technical rules. Content
                    accuracy, authenticity, eligibility, signatures, and
                    official acceptance require your review. Pages without
                    selectable text may be scans, not blank pages.
                  </div>
                </div>
                <div className="panel-footer">
                  <button
                    className="text-link"
                    style={{ border: 0, background: "none", fontSize: 10 }}
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={12} /> Fix & recheck
                  </button>
                  <button className="button dark" onClick={() => setStep(3)}>
                    Export results <ArrowRight size={13} />
                  </button>
                </div>
              </>
            )}
            {step === 3 && report && (
              <>
                <div className="panel-body">
                  <label className="field">
                    Report name
                    <input
                      value={title}
                      disabled={!!busy}
                      maxLength={120}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setPrepared(null);
                        setReport({ ...report, title: e.target.value });
                      }}
                    />
                  </label>
                  <div className="export-grid">
                    {[
                      [FileText, "PDF", "A readable readiness report"],
                      [Braces, "JSON", "Complete machine-readable findings"],
                      [Table2, "CSV", "A spreadsheet-friendly summary"],
                      [FolderArchive, "ZIP", "Your files + JSON report"],
                    ].map(([Icon, label, copy]) => {
                      const I = Icon as typeof FileText;
                      return (
                        <button
                          key={String(label)}
                          className="export-option"
                          disabled={!!busy || (label === "ZIP" && !docs.length)}
                          onClick={() => exportAction(String(label))}
                        >
                          <I size={23} />
                          <span>
                            <b>Download {String(label)}</b>
                            <small>{String(copy)}</small>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {prepared && prepared.report === report && (
                    <div className="download-ready" role="status">
                      <div>
                        <b>{prepared.kind} is ready</b>
                        <p>Save this file to your device before leaving.</p>
                      </div>
                      <a
                        href={prepared.url}
                        download={prepared.name}
                        className="button dark"
                      >
                        <Download size={17} /> Save {prepared.kind} file
                      </a>
                    </div>
                  )}
                  {busy && (
                    <p className="busy" role="status">
                      {busy}
                    </p>
                  )}
                  <div className="zip-preview">
                    <b>Archive preview</b>
                    <p>
                      Names are normalized and made unique. Originals on your
                      device are preserved.
                    </p>
                    {archiveNames(docs.map((d) => d.name)).map((name, i) => (
                      <code key={i}>documents/{name}</code>
                    ))}
                    <code>appliory-report.json</code>
                  </div>
                  <div className="info-note">
                    <ShieldCheck size={15} />
                    Downloads are generated in your browser. Exporting does not
                    send your files to a server.
                  </div>
                </div>
                <div className="panel-footer">
                  <button
                    className="text-link"
                    style={{ border: 0, background: "none", fontSize: 10 }}
                    onClick={() => setStep(2)}
                    disabled={!!busy}
                  >
                    <ArrowLeft size={12} /> Back to results
                  </button>
                  <Link className="text-link" href="/guides">
                    Prepare your next step <ArrowRight size={13} />
                  </Link>
                </div>
              </>
            )}
          </section>
          <div className="local-banner">
            <ShieldCheck size={23} />
            <div>
              <b>Your documents never leave your device.</b>
              <p>
                All file processing happens in your browser. No uploads, no AI,
                no document storage.
              </p>
            </div>
            <LockKeyhole
              size={14}
              style={{ marginLeft: "auto", color: "#8fa07f" }}
            />
          </div>
          <div className="tool-bottom">
            <span>Prepared with care. Acceptance is never guaranteed.</span>
            <Link href="/faq">
              Need a hand? Visit our help center <ExternalLink size={10} />
            </Link>
          </div>
        </div>
        <aside className="panel right-panel">
          <div className="panel-heading">
            <h3>Your readiness overview</h3>
            <span className="live-dot" />
          </div>
          <div className="panel-body">
            <div className="readiness-illustration">
              <FileCheck2 size={32} strokeWidth={1.3} />
            </div>
            <h3 className="readiness-title">
              {report ? report.status : "One step closer to ready."}
            </h3>
            <p className="readiness-copy">
              {report
                ? "A summary of your configured checks. Official requirements still need your review."
                : "Build your checklist and add your files. We’ll take care of the technical checks."}
            </p>
            <div className="summary-counts">
              {[
                [rules.length, "Checklist items"],
                [fileCount, "Documents added"],
                [report?.completed ?? "—", "Items passed"],
                [report?.missing ?? "—", "Missing required"],
                [report?.failed ?? "—", "Failed checks"],
                [
                  report ? report.warnings + report.review : "—",
                  "Warnings / review",
                ],
              ].map(([count, label]) => (
                <div key={label}>
                  <b>{count}</b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="summary-status">
              <span className="live-dot" />
              {report
                ? "Checks complete · " +
                  new Date(report.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Your results will appear here"}
            </div>
            <div className="checks-list">
              <b style={{ fontSize: 9, fontWeight: 500, color: "#738466" }}>
                WHAT WE CHECK
              </b>
              {[
                "Missing required documents",
                "File format & signature",
                "File size & PDF page count",
                "Image dimensions",
                "Exact duplicate files",
                "PDF selectable text",
              ].map((s) => (
                <span key={s}>
                  <Check size={12} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
      {editing && (
        <RuleEditor
          rule={editing}
          onClose={() => setEditing(null)}
          onSave={(r) => {
            setRules((old) =>
              old.some((x) => x.id === r.id)
                ? old.map((x) => (x.id === r.id ? r : x))
                : [...old, r],
            );
            setEditing(null);
            invalidate();
          }}
        />
      )}
      {image && (
        <ImageEditor
          doc={image}
          onClose={() => setImage(null)}
          onApply={async (file, replace) => {
            const error = filePackError(
              replace ? docs.filter((d) => d.id !== image.id) : docs,
              [file],
            );
            if (error) {
              toast.error(error);
              return;
            }
            setBusy("Rechecking edited image…");
            try {
              const v = await inspectFile(file, image.ruleId);
              v.original = image.original;
              setDocs((old) =>
                replace
                  ? old.map((x) => (x.id === image.id ? v : x))
                  : [...old, v],
              );
              invalidate();
              setImage(null);
              toast.success(
                "Edited image checked. Run the document pack checks again.",
              );
            } catch {
              toast.error("Could not process the edited image.");
            } finally {
              setBusy("");
            }
          }}
        />
      )}
      {rename && (
        <Modal title="Rename document" onClose={() => setRename(null)}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const name = safeName(renameValue);
              const d = {
                ...rename,
                name,
                file: new File([rename.file], name, { type: rename.type }),
              };
              setDocs(docs.map((x) => (x.id === d.id ? d : x)));
              invalidate();
              setRename(null);
            }}
          >
            <label className="field">
              New file name
              <input
                required
                maxLength={150}
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
              />
            </label>
            <p style={{ fontSize: 10 }}>
              Keep the correct extension. Your original file on disk is
              unchanged.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="button"
                onClick={() => setRename(null)}
              >
                Cancel
              </button>
              <button className="button dark">Apply name</button>
            </div>
          </form>
        </Modal>
      )}
    </Workspace>
  );
}
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement;
    const el = dialog.current;
    const focusable = () =>
      Array.from(
        el?.querySelectorAll<HTMLElement>(
          "button,input,select,textarea,a[href]",
        ) || [],
      ).filter((x) => !x.hasAttribute("disabled"));
    focusable()[0]?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = focusable();
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={17} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
function RuleEditor({
  rule,
  onClose,
  onSave,
}: {
  rule: Rule;
  onClose: () => void;
  onSave: (r: Rule) => void;
}) {
  const [r, set] = useState(rule);
  const [error, setError] = useState("");
  const update = (
    key: keyof Rule,
    value: string | number | boolean | undefined,
  ) => set({ ...r, [key]: value });
  return (
    <Modal title="Document requirement" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            (r.minPages && r.maxPages && r.minPages > r.maxPages) ||
            (r.minWidth && r.maxWidth && r.minWidth > r.maxWidth) ||
            (r.minHeight && r.maxHeight && r.minHeight > r.maxHeight)
          ) {
            setError(
              "Minimum values must be less than or equal to maximum values.",
            );
            return;
          }
          const parsed = ruleSchema.safeParse(r);
          if (!parsed.success) {
            setError(
              parsed.error.issues[0]?.message ||
                "Check the requirement values.",
            );
            return;
          }
          onSave(parsed.data);
        }}
      >
        <div className="form-grid">
          <label className="field wide">
            Document name
            <input
              required
              maxLength={100}
              value={r.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </label>
          <label className="field wide">
            Description
            <textarea
              maxLength={1000}
              value={r.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </label>
          <label className="check-field wide">
            <input
              type="checkbox"
              className="checkbox"
              checked={r.required}
              onChange={(e) => update("required", e.target.checked)}
            />{" "}
            Required document
          </label>
          <label className="field">
            Accepted extensions (comma separated)
            <input
              required
              maxLength={300}
              pattern="[a-zA-Z0-9, ]+"
              value={r.extensions}
              onChange={(e) =>
                update("extensions", e.target.value.toLowerCase())
              }
            />
          </label>
          <label className="field">
            Maximum file size (MB)
            <input
              type="number"
              min="0.01"
              max="25"
              step="0.01"
              required
              value={r.maxMB}
              onChange={(e) => update("maxMB", Number(e.target.value))}
            />
          </label>
          <label className="field wide">
            Accepted MIME types (comma separated)
            <input
              maxLength={500}
              value={r.mimes}
              onChange={(e) => update("mimes", e.target.value)}
              placeholder="application/pdf,image/jpeg"
            />
          </label>
          {[
            ["minPages", "Minimum PDF pages"],
            ["maxPages", "Maximum PDF pages"],
            ["minWidth", "Minimum width (px)"],
            ["maxWidth", "Maximum width (px)"],
            ["minHeight", "Minimum height (px)"],
            ["maxHeight", "Maximum height (px)"],
          ].map(([key, label]) => (
            <label className="field" key={key}>
              {label}
              <input
                type="number"
                min="1"
                max="30000"
                value={(r[key as keyof Rule] as number) || ""}
                onChange={(e) =>
                  update(
                    key as keyof Rule,
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                placeholder="No limit"
              />
            </label>
          ))}
          <label className="field wide">
            File name should contain (optional)
            <input
              maxLength={100}
              value={r.filename || ""}
              onChange={(e) => update("filename", e.target.value)}
              placeholder="For example: Hassan_Transcript"
            />
          </label>
          <label className="field wide">
            Official reference URL (optional)
            <input
              type="url"
              maxLength={2000}
              value={r.reference || ""}
              onChange={(e) => update("reference", e.target.value)}
              placeholder="https://institution.example/requirements"
            />
          </label>
          <label className="field wide">
            Date you last verified this requirement
            <input
              type="date"
              value={r.verified || ""}
              onChange={(e) => update("verified", e.target.value)}
            />
          </label>
          <label className="field wide">
            Notes and special instructions
            <textarea
              maxLength={2000}
              value={r.notes || ""}
              onChange={(e) => update("notes", e.target.value)}
            />
          </label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="modal-actions">
          <button type="button" className="button" onClick={onClose}>
            Cancel
          </button>
          <button className="button dark">
            Save requirement <Check size={15} />
          </button>
        </div>
      </form>
    </Modal>
  );
}
function ImageEditor({
  doc,
  onClose,
  onApply,
}: {
  doc: LocalDocument;
  onClose: () => void;
  onApply: (f: File, replace: boolean) => Promise<void>;
}) {
  const [w, setW] = useState(doc.width || 300);
  const [h, setH] = useState(doc.height || 300);
  const [format, setFormat] = useState("image/jpeg");
  const [target, setTarget] = useState(500);
  const [result, setResult] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [replace, setReplace] = useState(true);
  const [url, setUrl] = useState(""); // The object URL is an external browser resource; recreate it only when the blob changes.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const u = URL.createObjectURL(result || doc.file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [result, doc.file]);
  /* eslint-enable react-hooks/set-state-in-effect */
  return (
    <Modal title="A better fit for your requirements" onClose={onClose}>
      <div className="modal-content">
        <div className="image-preview">
          {/* Local blob previews cannot use a remote image optimizer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Selected image preview" />
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
              setResult(await transformImage(doc.file, w, h, format, target));
            } catch (e) {
              toast.error((e as Error).message);
            } finally {
              setLoading(false);
            }
          }}
        >
          <fieldset
            className="form-grid"
            disabled={loading}
            aria-label="Image edit settings"
          >
            <label className="field">
              Width (px)
              <input
                required
                type="number"
                min="1"
                max="10000"
                value={w}
                onChange={(e) => {
                  setW(Number(e.target.value));
                  setResult(null);
                }}
              />
            </label>
            <label className="field">
              Height (px)
              <input
                required
                type="number"
                min="1"
                max="10000"
                value={h}
                onChange={(e) => {
                  setH(Number(e.target.value));
                  setResult(null);
                }}
              />
            </label>
            <label className="field">
              Output format
              <select
                value={format}
                onChange={(e) => {
                  setFormat(e.target.value);
                  setResult(null);
                }}
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG (lossless)</option>
                <option value="image/webp">WEBP</option>
              </select>
            </label>
            <label className="field">
              Target file size (KB)
              <input
                required
                type="number"
                min="1"
                max="25000"
                value={target}
                onChange={(e) => {
                  setTarget(Number(e.target.value));
                  setResult(null);
                }}
              />
            </label>
          </fieldset>
          <p style={{ fontSize: 10 }}>
            Set both dimensions carefully to avoid distortion. Compression is
            best effort; PNG may remain larger than your target. Your original
            file is preserved on disk.
          </p>
          <button className="button" disabled={loading}>
            {loading ? "Processing…" : "Preview changes"}
          </button>
        </form>
        {result && (
          <>
            <div className="image-compare" style={{ marginTop: 16 }}>
              <b>Before:</b> {size(doc.size)} · {doc.width} × {doc.height} px
              <br />
              <b>After:</b> {size(result.size)} · {w} × {h} px
              {result.size > target * 1024 && (
                <p
                  style={{ margin: "8px 0 0", color: "#967534", fontSize: 10 }}
                >
                  The target size was not reached. Try smaller dimensions or a
                  different format.
                </p>
              )}
            </div>
            <label className="check-field" style={{ marginTop: 16 }}>
              <input
                type="checkbox"
                checked={replace}
                onChange={(e) => setReplace(e.target.checked)}
              />{" "}
              Replace the workspace copy (original on disk is kept)
            </label>
            <div className="modal-actions">
              <button
                className="button"
                onClick={() => download(result, result.name)}
              >
                <Download size={14} /> Download copy
              </button>
              <button
                className="button dark"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  try {
                    await onApply(result, replace);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Apply & recheck
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
