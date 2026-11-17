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
  "Document & Image Preparation Tools Online",
  "Free online tools to check file sizes, compress images, resize photos, count PDF pages and prepare application documents. No login, private in-browser processing.",
  "/",
  [
    "private document tools for applications",
    "check file size online",
    "compress photo to 20kb",
    "compress photo to 50kb",
    "image compressor to kb",
    "image resizer to pixels",
    "passport photo maker",
    "pdf to excel converter",
    "pdf page counter",
    "scholarship document checklist",
    "ppsc photo compressor",
    "fpsc document resize",
    "free online tools",
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
            Free Tools to Check, Resize
            <br />
            <span>&amp; Prepare Application Documents</span>
          </h1>
          <p>
            Appliory provides free, private online tools to check file sizes, compress images, resize photos, count PDF pages and prepare application documents. No login required — all processing executes directly inside your browser.
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.95rem", color: "var(--muted)" }}>
            File-size and photo requirements vary by institution, country and portal. Choose a compression target or checklist based on your latest official instructions.
          </p>
          <div className="hero-actions">
            <Link className="button dark" href="#free-tools">
              Start Using Free Tools <ArrowRight size={18} />
            </Link>
            <Link className="button" href="/tool">
              Check Documents <ArrowUpRight size={18} />
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
          <div style={{ marginTop: "1.5rem" }}>
            <a href="https://launchkiwi.com/p/appliory" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://launchkiwi.com/badge-light.svg" alt="Featured on LaunchKiwi" width="198" height="62" />
            </a>
          </div>
        </div>

        {/* Task Picker: 3 Primary Actions */}
        <div className="hero-task-panel">
          <div className="task-panel-title">
            <span className="tool-icon">
              <ListChecks size={25} />
            </span>
            <div>
              <small>QUICK START</small>
              <h2>Select an action:</h2>
            </div>
          </div>
          <Link href="/tools/file-size-checker">
            <span>
              <b>1. Check File Size</b>
              <small>Measure exact bytes, KB &amp; MB against your portal upload limit</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/tools/image-compressor">
            <span>
              <b>2. Compress Image</b>
              <small>Compress JPG/PNG to 20KB, 50KB or custom target with live preview</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/tool">
            <span>
              <b>3. Check Documents</b>
              <small>Verify an entire application pack (transcripts, photos, PDFs) together</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/tools/passport-photo-maker">
            <span>
              <b>4. Passport &amp; Visa Photo</b>
              <small>Format 2×2" (600×600) or 35×45mm dimensions for US, UK &amp; Schengen</small>
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <div className="task-panel-note">
            <ShieldCheck size={17} /> 100% On-device processing. No files sent to external servers.
          </div>
        </div>
      </section>

      {/* Tools Grouped into 4 Clear Categories */}
      <section className="home-tools wrap" id="free-tools">
        <div className="section-heading">
          <div>
            <span className="eyebrow">COMPLETE TOOL SUITE</span>
            <h2>Private Online Document &amp; Image Tools</h2>
            <p>
              Prepare, check, resize and convert your files with free online tools. No account required. Your documents stay on your device.
            </p>
          </div>
          <Link className="text-link" href="/tools">
            View all tools <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="goal-group-container">
          {/* Category 1: Image Tools */}
          <div className="goal-group">
            <div className="goal-group-header">
              <div>
                <span className="goal-group-badge">
                  <ImageIcon size={13} /> Image Tools
                </span>
                <h3>Compress, Resize &amp; Format Application Photos</h3>
                <p>Resize to exact pixel dimensions, format passport photos, or compress images to 20KB, 50KB, or custom sizes.</p>
              </div>
              <Link className="text-link" href="/blog/how-to-check-image-size-and-dimensions-online">
                Dimensions Guide <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="goal-tools-grid">
              <Link href={"/tools/" + generalCompressor.slug} className="quick-tool-card featured">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>COMPRESSION</small>
                <h3>{generalCompressor.name}</h3>
                <p>Compress JPG, PNG &amp; WebP to custom KB targets with before-and-after preview.</p>
                <span className="text-link">{generalCompressor.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + resizerTool.slug} className="quick-tool-card">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>DIMENSIONS</small>
                <h3>{resizerTool.name}</h3>
                <p>Resize images to exact pixel width and height while locking aspect ratio.</p>
                <span className="text-link">{resizerTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + passportTool.slug} className="quick-tool-card">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>PASSPORT &amp; VISA</small>
                <h3>{passportTool.name}</h3>
                <p>Format 2×2" (600×600), 35×45mm, and regional passport and visa photos.</p>
                <span className="text-link">{passportTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + ppscTool.slug} className="quick-tool-card">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>PRESET</small>
                <h3>{ppscTool.name}</h3>
                <p>Dedicated 20KB and 25KB compression presets for recruitment portals.</p>
                <span className="text-link">{ppscTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + uniTool.slug} className="quick-tool-card">
                <span className="tool-icon images"><ImageIcon /></span>
                <small>PRESET</small>
                <h3>{uniTool.name}</h3>
                <p>Compress application photos and document scans under 50KB for admissions.</p>
                <span className="text-link">{uniTool.action} <ArrowUpRight size={17} /></span>
              </Link>
            </div>
          </div>

          {/* Category 2: PDF Tools */}
          <div className="goal-group">
            <div className="goal-group-header">
              <div>
                <span className="goal-group-badge">
                  <FileText size={13} /> PDF Tools
                </span>
                <h3>Extract Tables &amp; Audit PDF Page Limits</h3>
                <p>Convert text-based PDF tables to clean Excel (.xlsx) spreadsheets or count pages across multi-file submissions.</p>
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
                <p>Extract payroll reports, statements, and tables to Excel with leading zero preservation.</p>
                <span className="text-link">{pdfExcelTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + pdfCounterTool.slug} className="quick-tool-card">
                <span className="tool-icon pdf"><FileText /></span>
                <small>PAGE AUDIT</small>
                <h3>{pdfCounterTool.name}</h3>
                <p>Count PDF pages instantly and check compliance against application page ceilings.</p>
                <span className="text-link">{pdfCounterTool.action} <ArrowUpRight size={17} /></span>
              </Link>
            </div>
          </div>

          {/* Category 3: Document Preparation & Auditing */}
          <div className="goal-group">
            <div className="goal-group-header">
              <div>
                <span className="goal-group-badge">
                  <Files size={13} /> Document Preparation
                </span>
                <h3>Validate File Sizes, Duplicates &amp; Checklists</h3>
                <p>Verify files before upload: check exact byte sizes, identify duplicate documents, and audit submission packs.</p>
              </div>
              <Link className="text-link" href="/guides/scholarship-document-checklist">
                Scholarship Checklist <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="goal-tools-grid">
              <Link href={"/tools/" + sizeCheckerTool.slug} className="quick-tool-card featured">
                <span className="tool-icon files"><Files /></span>
                <small>FILE SIZE</small>
                <h3>{sizeCheckerTool.name}</h3>
                <p>Inspect exact file size in bytes, KB, and MB against custom upload limits.</p>
                <span className="text-link">{sizeCheckerTool.action} <ArrowUpRight size={17} /></span>
              </Link>
              <Link href="/tool" className="quick-tool-card">
                <span className="tool-icon"><ListChecks /></span>
                <small>CHECKLIST</small>
                <h3>Document Checker</h3>
                <p>Verify multiple degrees, transcripts, and ID scans together against portal requirements.</p>
                <span className="text-link">Start Pack Audit <ArrowUpRight size={17} /></span>
              </Link>
              <Link href={"/tools/" + duplicateTool.slug} className="quick-tool-card">
                <span className="tool-icon files"><Files /></span>
                <small>DEDUPLICATION</small>
                <h3>{duplicateTool.name}</h3>
                <p>Detect exact duplicate files using SHA-256 byte hashing with 100% privacy.</p>
                <span className="text-link">{duplicateTool.action} <ArrowUpRight size={17} /></span>
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
              <CheckCircle2 size={20} /> Categorized Technical Validations
            </span>
            <ul className="scope-list">
              <li>
                <Check size={16} />
                <span><strong>Image Checks (JPG, PNG, WebP):</strong> Verifies pixel width and height (e.g., 600×600 px or 35×45mm), inspects aspect ratio, and applies targeted compression in KB. <em>(Applies exclusively to images, not PDFs)</em>.</span>
              </li>
              <li>
                <Check size={16} />
                <span><strong>PDF Checks (PDF only):</strong> Parses document structure, counts pages against limits, and detects selectable text vs scanned pages. <em>(Note: Selectable text detection does not perform OCR on scanned image-only PDFs)</em>.</span>
              </li>
              <li>
                <Check size={16} />
                <span><strong>File Checks (All Formats):</strong> Inspects true binary magic numbers to catch corrupted or falsely renamed extensions (e.g. an image renamed to .pdf), measures exact file size in binary KB/MB, and detects duplicates via SHA-256 byte hashing.</span>
              </li>
              <li>
                <Check size={16} />
                <span><strong>Checklist Checks (Application Pack):</strong> Audits overall required document lists, verifies individual submission limits, and exports a readiness summary report before you submit.</span>
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

      {/* Editorial Content Section — AdSense substantial value */}
      <section className="wrap content-section" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <span className="eyebrow">WHY APPLIORY EXISTS</span>
          <h2 style={{ fontSize: "1.75rem", margin: "8px 0 20px" }}>
            Free document tools built for real application problems
          </h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ink)" }}>
            Application requirements vary across recruitment bodies and academic institutions. Published guidelines such as PPSC specify photographs and CNIC images under 25KB, while FPSC specifies JPEG photographs under 30KB. University admission and scholarship portals enforce varying targets where some forms specify a 50KB ceiling. International visa systems specify varying parameters — from square 600×600 to 1200×1200 px (up to 240KB) for US DS-160, to at least 600×750 px for UK digital portals, or 35×45mm physical prints. Always check your active advertisement or upload screen for current official instructions.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ink)" }}>
            Most tools that solve these problems upload your files to unknown servers — which is a serious privacy risk when you are dealing with identity cards, bank receipts, salary slips, and personal photos. Appliory was built to fix this: your document contents are processed locally in your browser and are not uploaded to our document-processing servers. Standard website hosting, security, analytics and advertising requests may still occur.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", margin: "28px 0" }}>
            {([
              ["20KB / 25KB", "Recruitment photo & CNIC compression options"],
              ["Under 30KB", "FPSC photograph guideline preset"],
              ["50KB", "Target option for university & scholarship forms"],
              ["600×600 – 1200px", "US visa & passport dimension presets"],
            ] as [string, string][]).map(([stat, label]) => (
              <div key={stat} style={{ background: "var(--surface, #f8fafc)", border: "1px solid var(--line)", borderRadius: 12, padding: "16px 20px" }}>
                <b style={{ fontSize: "1.5rem", color: "var(--accent)", display: "block" }}>{stat}</b>
                <p style={{ margin: "4px 0 0", fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.5 }}>{label}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--ink)" }}>
            Appliory provides flexible image compression presets and document checklists for job applications, scholarships and visas. Select your desired file-size target and verify the applicable requirements against your current official application instructions. You can format 600–1200 px (US DS-160), 600×600 px (Diversity Visa), 600×750 px (UK Digital), 350×467 px (Pak-Identity), or 35×45mm prints, and use the File Size Checker to audit your files before final submission.
          </p>
        </div>
      </section>

      {/* Connected 3-Step Workflow (original) */}
      <section className="workflow-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">END-TO-END APPLICATION WORKFLOW</span>
              <h2>Your application, step by step</h2>
              <p>
                Follow our 3-step preparation workflow to verify, format, and audit your files before submitting.
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
                "Start with a preset for recruitment, scholarships, or foreign visas. Adjust requirements to match your official instructions.",
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
                <small>Compression Demonstration Output</small>
                <b>Candidate_Photo_20kb.jpg (18.6 KB · 300×300 px)</b>
              </div>
            </div>
            <div className="sample-status">
              <CheckCircle2 size={16} /> Compression Demonstration · Note: Dimensions and final image quality must be verified against your portal&apos;s official rules. If a tight target cannot be reached without excessive visual degradation, Appliory displays the closest achievable result with a quality alert. Appliory does not guarantee portal acceptance, which is determined solely by the receiving authority.
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
                Notice that <strong>no file packets or document data are transmitted to any remote server</strong>. All file operations execute strictly inside your device's memory using client-side JavaScript. Standard website analytics and hosting logs collect only anonymous technical request data — never your file contents.
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
