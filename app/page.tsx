import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Check,
  FileText,
  ImageIcon,
  Files,
  ListChecks,
  UploadCloud,
  Download,
  AlertCircle,
  HelpCircle,
  Briefcase,
  GraduationCap,
  Table,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { tools } from "@/lib/tool-catalog";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/appliory/structured-data";

export const metadata = pageMetadata(
  "Free Document & Image Tools for Job Applications | Appliory",
  "Compress photos to 20KB or 50KB, resize passport photos, check application documents, and convert PDFs to Excel. 100% free, private browser-based tools.",
  "/",
  [
    "free document tools for job applications",
    "compress photo to 20kb",
    "compress photo to 50kb",
    "image compressor",
    "passport photo maker",
    "pdf to excel converter",
    "ppsc photo compressor",
    "fpsc document resize",
    "appliory",
  ],
);

export default function Home() {
  const ppscTool = tools.find((t) => t.slug === "compress-image-to-20kb")!;
  const resizerTool = tools.find((t) => t.slug === "image-resizer")!;
  const sizeCheckerTool = tools.find((t) => t.slug === "file-size-checker")!;
  const uniTool = tools.find((t) => t.slug === "compress-image-to-50kb")!;
  const passportTool = tools.find((t) => t.slug === "passport-photo-maker")!;
  const pdfExcelTool = tools.find((t) => t.slug === "pdf-to-excel")!;
  const pdfCounterTool = tools.find((t) => t.slug === "pdf-page-counter")!;
  const duplicateTool = tools.find((t) => t.slug === "duplicate-file-finder")!;
  const generalCompressor = tools.find((t) => t.slug === "image-compressor")!;

  return (
    <main>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.slice(0, 4).map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: {
              "@type": "Answer",
              text: a,
            },
          })),
        }}
      />

      {/* Hero Section: Clear Decision & Task Selector */}
      <section className="home-hero wrap">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="live-dot" /> PRIVATE IN-BROWSER SUITE · ZERO CLOUD UPLOADS
          </span>
          <h1>
            Free Online Document &amp; Image Tools
            <br />
            <span>for Every Application</span>
          </h1>
          <p>
            Compress photos to 20KB or 50KB, resize passport pictures, verify
            document readiness, and convert PDFs to Excel. Prepare files for
            PPSC, FPSC, university admissions, and scholarship portals — 100%
            free, private, and with zero file uploads.
          </p>
          <div className="hero-actions">
            <Link className="button dark" href="/tool">
              Check my documents <ArrowUpRight size={18} />
            </Link>
            <Link className="button" href="#tools-by-goal">
              Choose tool by goal <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-assurances">
            <span>
              <Check size={15} />
              No login required
            </span>
            <span>
              <Check size={15} />
              100% Free forever
            </span>
            <span>
              <ShieldCheck size={15} />
              Files stay on your device
            </span>
          </div>
        </div>

        {/* Task Picker: 3 Primary Pathways */}
        <div className="hero-task-panel">
          <div className="task-panel-title">
            <span className="tool-icon">
              <ListChecks size={25} />
            </span>
            <div>
              <small>QUICK TASK SELECTOR</small>
              <h2>What are you applying for?</h2>
            </div>
          </div>
          <Link href="/tools/compress-image-to-20kb">
            <span>
              <b>Government Jobs (PPSC, FPSC, NTS)</b>
              <small>Compress profile photo to 20KB or fee challan to 25KB</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/tools/compress-image-to-50kb">
            <span>
              <b>University Admissions &amp; Scholarships</b>
              <small>Compress image to 50KB or format 2×2" passport photo</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/tools/pdf-to-excel">
            <span>
              <b>Confidential PDF &amp; Payroll Reports</b>
              <small>Extract and clean PDF tables to Excel (.xlsx) &amp; CSV</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/tool?template=scholarship">
            <span>
              <b>Multi-Document Application Checklist</b>
              <small>Verify an entire document pack before uploading</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <div className="task-panel-note">
            <ShieldCheck size={17} /> On-device processing. No files sent to external servers.
          </div>
        </div>
      </section>

      {/* Tools Grouped by User Goal */}
      <section className="home-tools wrap" id="tools-by-goal">
        <div className="section-heading">
          <div>
            <span className="eyebrow">GROUPED BY YOUR TASK</span>
            <h2>Tools organized by your application goal</h2>
            <p>
              Direct routes to portal acceptance. Pick your objective and get exact, compliant files in seconds.
            </p>
          </div>
          <Link className="text-link" href="/tools">
            All tools <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="goal-group-container">
          {/* Goal 1: Government Jobs & Recruitment */}
          <div className="goal-group">
            <div className="goal-group-header">
              <div>
                <span className="goal-group-badge">
                  <Briefcase size={13} /> Target: Government Portals
                </span>
                <h3>PPSC, FPSC, NTS &amp; Public Service Commission</h3>
                <p>Strict upload constraints: 20KB profile photos, 25KB bank challan receipts, and clear signatures.</p>
              </div>
              <Link className="text-link" href="/blog/how-to-compress-image-to-20kb-for-ppsc-fpsc">
                PPSC Photo Guide <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="goal-tools-grid">
              <Link href={"/tools/" + ppscTool.slug} className="quick-tool-card featured">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>RECRUITMENT</small>
                <h3>{ppscTool.name}</h3>
                <p>{ppscTool.description}</p>
                <span className="text-link">{ppscTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + resizerTool.slug} className="quick-tool-card">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>DIMENSIONS</small>
                <h3>{resizerTool.name}</h3>
                <p>{resizerTool.description}</p>
                <span className="text-link">{resizerTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + sizeCheckerTool.slug} className="quick-tool-card">
                <span className="tool-icon files"><Files /></span>
                <small>LIMIT AUDIT</small>
                <h3>{sizeCheckerTool.name}</h3>
                <p>{sizeCheckerTool.description}</p>
                <span className="text-link">{sizeCheckerTool.action} <ArrowUpRight size={17} /></span>
              </Link>
            </div>
          </div>

          {/* Goal 2: University Admissions & Scholarships */}
          <div className="goal-group">
            <div className="goal-group-header">
              <div>
                <span className="goal-group-badge">
                  <GraduationCap size={13} /> Target: Higher Education &amp; Visas
                </span>
                <h3>University Admissions, Scholarships &amp; Visa Portals</h3>
                <p>Standardized limits: 50KB image limits, 2×2 inch or 35×45mm passport prints, and degree checklists.</p>
              </div>
              <Link className="text-link" href="/guides/scholarship-document-checklist">
                Scholarship Checklist <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="goal-tools-grid">
              <Link href={"/tools/" + uniTool.slug} className="quick-tool-card featured">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>ADMISSIONS</small>
                <h3>{uniTool.name}</h3>
                <p>{uniTool.description}</p>
                <span className="text-link">{uniTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + passportTool.slug} className="quick-tool-card">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>PASSPORT &amp; VISA</small>
                <h3>{passportTool.name}</h3>
                <p>{passportTool.description}</p>
                <span className="text-link">{passportTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href="/tool?template=scholarship" className="quick-tool-card">
                <span className="tool-icon"><ListChecks /></span>
                <small>READINESS CHECK</small>
                <h3>Application Pack Checker</h3>
                <p>Verify multiple degrees, transcripts, and ID scans together against portal requirements.</p>
                <span className="text-link">Start Pack Audit <ArrowUpRight size={17} /></span>
              </Link>
            </div>
          </div>

          {/* Goal 3: Confidential PDF & Office Utilities */}
          <div className="goal-group">
            <div className="goal-group-header">
              <div>
                <span className="goal-group-badge">
                  <Table size={13} /> Target: Confidential Data &amp; PDF
                </span>
                <h3>PDF Table Extraction &amp; Document Verification</h3>
                <p>Local in-browser conversion: Extract payroll tables to Excel and count PDF pages with zero server upload.</p>
              </div>
              <Link className="text-link" href="/blog/how-to-convert-pdf-to-excel">
                PDF to Excel Guide <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="goal-tools-grid">
              <Link href={"/tools/" + pdfExcelTool.slug} className="quick-tool-card featured">
                <span className="tool-icon pdf"><FileText /></span>
                <small>SPREADSHEET</small>
                <h3>{pdfExcelTool.name}</h3>
                <p>{pdfExcelTool.description}</p>
                <span className="text-link">{pdfExcelTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + pdfCounterTool.slug} className="quick-tool-card">
                <span className="tool-icon pdf"><FileText /></span>
                <small>PAGE COUNT</small>
                <h3>{pdfCounterTool.name}</h3>
                <p>{pdfCounterTool.description}</p>
                <span className="text-link">{pdfCounterTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + generalCompressor.slug} className="quick-tool-card">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>OPTIMIZATION</small>
                <h3>{generalCompressor.name}</h3>
                <p>{generalCompressor.description}</p>
                <span className="text-link">{generalCompressor.action} <ArrowUpRight size={17} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Clarification: What the Checker Validates vs What it Cannot Validate */}
      <section className="wrap content-section" style={{ paddingTop: 16 }}>
        <div className="section-heading" style={{ marginBottom: 16 }}>
          <div>
            <span className="eyebrow">TRANSPARENT VERIFICATION CRITERIA</span>
            <h2>What Appliory validates — and what it cannot</h2>
            <p>
              Know exactly what technical constraints our automated checker inspects on your device.
            </p>
          </div>
          <Link href="/tool" className="button dark">
            Open Document Checker <ArrowRight size={17} />
          </Link>
        </div>

        <div className="checker-scope-grid">
          <div className="scope-col">
            <span className="scope-title valid">
              <CheckCircle2 size={20} /> What the Checker Inspects &amp; Fixes
            </span>
            <ul className="scope-list">
              <li>
                <Check size={16} />
                <span><strong>File Size Limits:</strong> Ensures images and PDFs are strictly under 20KB, 50KB, 2MB, or custom limits.</span>
              </li>
              <li>
                <Check size={16} />
                <span><strong>Real Binary Signatures:</strong> Detects corrupted files or renamed files (e.g. an image falsely named .pdf).</span>
              </li>
              <li>
                <Check size={16} />
                <span><strong>Pixel Dimensions:</strong> Verifies exact image width and height (e.g. 35×45mm, 600×600 px) for passport photos.</span>
              </li>
              <li>
                <Check size={16} />
                <span><strong>PDF Page Counts &amp; Selectable Text:</strong> Flags scanned pages without extractable text and verifies page limits.</span>
              </li>
              <li>
                <Check size={16} />
                <span><strong>Duplicate Detection:</strong> Identifies duplicate uploads using cryptographic SHA-256 hashes even with different names.</span>
              </li>
            </ul>
          </div>

          <div className="scope-col">
            <span className="scope-title invalid">
              <XCircle size={20} /> What the Checker Cannot Validate
            </span>
            <ul className="scope-list">
              <li>
                <AlertCircle size={16} />
                <span><strong>Legal Authenticity:</strong> Does not verify if degrees, CNICs, or bank challans are genuine government issues.</span>
              </li>
              <li>
                <AlertCircle size={16} />
                <span><strong>Text &amp; Spelling Accuracy:</strong> Does not proofread names, CNIC numbers, or marks written inside documents.</span>
              </li>
              <li>
                <AlertCircle size={16} />
                <span><strong>Portal Eligibility Decisions:</strong> Cannot guarantee merit list inclusion, interview calls, or visa approval.</span>
              </li>
              <li>
                <AlertCircle size={16} />
                <span><strong>OCR of Illegible Scans:</strong> Cannot extract text from low-resolution or handwritten scanned photos.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Connected 3-Step Workflow */}
      <section className="workflow-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">END-TO-END APPLICATION WORKFLOW</span>
              <h2>Your application, step by step</h2>
              <p>
                Follow our 3-step preparation workflow to ensure 100% portal acceptance.
              </p>
            </div>
            <Link className="button dark" href="/tool">
              Start Application Check <ArrowRight size={17} />
            </Link>
          </div>
          <div className="workflow-three">
            {[
              [
                ListChecks,
                "01",
                "Choose Portal Checklist",
                "Start with a preset for PPSC, FPSC, HEC scholarships, or foreign visas. Adjust requirements to match your official instructions.",
              ],
              [
                UploadCloud,
                "02",
                "Validate & Compress Locally",
                "Select your files on your device. Run technical checks and compress oversized photos to 20KB or 50KB with a single click.",
              ],
              [
                Download,
                "03",
                "Download Ready Pack & Audit",
                "Review the green readiness badges, download an audit report, and export a clean, organized ZIP folder ready for upload.",
              ],
            ].map(([Icon, n, title, copy]) => {
              const I = Icon as typeof ListChecks;
              return (
                <div key={String(n)}>
                  <span className="workflow-number">{String(n)}</span>
                  <I size={25} />
                  <h3>{String(title)}</h3>
                  <p>{String(copy)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verifiable Specifications & Sample Result Evidence */}
      <section className="wrap">
        <div className="specs-panel">
          <div className="section-heading" style={{ marginBottom: 0 }}>
            <div>
              <span className="eyebrow">VERIFIABLE TECHNICAL LIMITS</span>
              <h2 style={{ fontSize: "1.75rem" }}>Clear specifications users can verify</h2>
              <p>Transparent limits and verifiable client-side performance benchmarks.</p>
            </div>
            <Link href="/privacy" className="text-link">
              Privacy documentation <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="specs-grid">
            <div className="spec-box">
              <small>Supported Formats</small>
              <b>JPG, PNG, WebP, PDF</b>
              <p>Standard documents, scans, photos, and spreadsheets.</p>
            </div>
            <div className="spec-box">
              <small>File Size Capacity</small>
              <b>Up to 25 MB per file</b>
              <p>Batch capacity up to 40 files and 200 MB per session.</p>
            </div>
            <div className="spec-box">
              <small>Privacy Engine</small>
              <b>100% In-Browser APIs</b>
              <p>HTML5 Canvas &amp; PDF.js. Zero bytes sent to cloud servers.</p>
            </div>
            <div className="spec-box">
              <small>Pricing &amp; Quotas</small>
              <b>100% Free Forever</b>
              <p>No account required, no daily caps, no hidden watermarks.</p>
            </div>
          </div>

          {/* Sample Result Evidence Box */}
          <div className="sample-result-box">
            <div className="sample-meta">
              <div className="sample-step">
                <small>Original Input File</small>
                <b>Candidate_Photo.jpg (2.4 MB · 1200×1600 px)</b>
              </div>
              <div className="sample-arrow">
                <ArrowRight size={22} />
              </div>
              <div className="sample-step">
                <small>Appliory 20KB Output</small>
                <b>Candidate_Photo_20kb.jpg (18.6 KB · 300×300 px)</b>
              </div>
            </div>
            <div className="sample-status">
              <CheckCircle2 size={16} /> Ready for PPSC / FPSC Portal
            </div>
          </div>

          {/* How to Verify Our Privacy Claim in Browser */}
          <details className="privacy-verify-callout" style={{ marginTop: 24 }}>
            <summary>
              <ShieldCheck size={18} color="var(--accent)" />
              How to verify our 100% in-browser privacy claim yourself
            </summary>
            <div className="privacy-verify-content">
              <p>
                You don't need to take our word for it. You can inspect the network activity yourself in 3 simple steps:
              </p>
              <ol style={{ paddingLeft: 20, margin: "8px 0" }}>
                <li>Press <code>F12</code> (or right-click and select <strong>Inspect</strong>) in Chrome, Edge, or Firefox.</li>
                <li>Switch to the <strong>Network</strong> tab and click the red "Record" button to log requests.</li>
                <li>Upload and compress your photo or convert a PDF table.</li>
              </ol>
              <p>
                Notice that <strong>no file packets or document data are transmitted to any remote server</strong>. All operations execute strictly inside your device's memory using client-side JavaScript.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Trust & FAQ */}
      <section className="home-faq wrap" style={{ paddingTop: 48 }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Common questions &amp; answers</h2>
          </div>
          <Link href="/faq" className="text-link">
            All questions <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="faq-list">
          {faqs.slice(0, 4).map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Blog section on homepage */}
      <section className="wrap content-section" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">GUIDES &amp; TIPS</span>
            <h2>Free how-to guides for every applicant</h2>
          </div>
          <Link href="/blog" className="text-link">
            All guides <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="blog-grid" style={{ marginTop: 20 }}>
          <Link className="blog-card" href="/blog/how-to-compress-image-to-20kb-for-ppsc-fpsc">
            <div className="blog-card-header"><span className="blog-category">Image Tools</span></div>
            <h3>How to Compress Image to 20KB for PPSC, FPSC &amp; Government Portals</h3>
            <p>Step-by-step guide to reduce your photo to exactly 20KB — free, private, no upload.</p>
            <div className="blog-card-footer">
              <span className="blog-meta" style={{ fontSize: 11, color: "var(--muted)" }}>4 min read</span>
              <span className="text-link" style={{ fontSize: 13 }}>Read <ArrowUpRight size={12} /></span>
            </div>
          </Link>
          <Link className="blog-card" href="/blog/how-to-convert-pdf-to-excel">
            <div className="blog-card-header"><span className="blog-category">PDF Tools</span></div>
            <h3>How to Convert a PDF Table to Excel Without Uploading to Any Server</h3>
            <p>Convert payroll and financial PDFs to Excel privately — no cloud upload required.</p>
            <div className="blog-card-footer">
              <span className="blog-meta" style={{ fontSize: 11, color: "var(--muted)" }}>5 min read</span>
              <span className="text-link" style={{ fontSize: 13 }}>Read <ArrowUpRight size={12} /></span>
            </div>
          </Link>
          <Link className="blog-card" href="/blog/how-to-make-passport-photo-online-free">
            <div className="blog-card-header"><span className="blog-category">Image Tools</span></div>
            <h3>How to Make a Passport Photo Online Free — 2×2 Inch &amp; 35×45mm</h3>
            <p>Create official passport and visa photos in the correct size — instant, free, no account.</p>
            <div className="blog-card-footer">
              <span className="blog-meta" style={{ fontSize: 11, color: "var(--muted)" }}>4 min read</span>
              <span className="text-link" style={{ fontSize: 13 }}>Read <ArrowUpRight size={12} /></span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
