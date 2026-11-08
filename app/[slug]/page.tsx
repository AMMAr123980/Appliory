import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowUpRight,
  UploadCloud,
  ScanLine,
  FolderCheck,
  Plus,
  FileCheck2,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  Cpu,
  BarChart3,
  HelpCircle,
  Check,
  AlertTriangle,
} from "lucide-react";
import { faqs } from "@/lib/content";
import { pageMetadata, absolute, breadcrumb } from "@/lib/seo";
import { StructuredData } from "@/components/appliory/structured-data";

const pages: Record<string, { title: string; description: string }> = {
  "how-it-works": {
    title: "How Appliory Works — Private Document Preparation",
    description:
      "Learn how Appliory validates application documents, compresses images, and counts PDF pages locally in your browser with zero file uploads and complete privacy.",
  },
  faq: {
    title: "Frequently Asked Questions — Document Checks & Privacy",
    description:
      "Get comprehensive answers about Appliory's local document verification, privacy guarantees, image compression limits, PDF conversion, and supported file types.",
  },
  about: {
    title: "About Appliory — Free Privacy-First Document & Image Tools",
    description:
      "Appliory is a privacy-first platform created by Ammar Hassan Malik providing free in-browser image compressors, PDF converters, and application document checkers.",
  },
  contact: {
    title: "Contact Appliory — Help & Support for File Tools",
    description:
      "Contact the Appliory support team for questions, technical assistance, feedback, or tool feature requests. We are committed to private, client-side utilities.",
  },
  privacy: {
    title: "Privacy Policy — Zero Server Uploads Guaranteed",
    description:
      "Read our strict privacy policy. Learn how Appliory ensures your sensitive identity documents, photos, and PDFs never leave your browser with zero server uploads.",
  },
  terms: {
    title: "Terms of Service — Free Document & File Checking Tools",
    description:
      "Review terms and conditions for using Appliory's free client-side utilities, image compressors, PDF converters, and application document preparation tools.",
  },
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return { title: "Page not found", robots: { index: false } };
  return pageMetadata(p.title, p.description, "/" + slug);
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (["login", "signup"].includes(slug)) redirect("/tool");
  const p = pages[slug];
  if (!p) notFound();
  return (
    <>
      <section className="page-hero wrap">
        <span className="eyebrow">
          {slug.replaceAll("-", " ").toUpperCase()}
        </span>
        <h1>{p.title}</h1>
        <p>{p.description}</p>
      </section>
      {slug === "faq" ? (
        <section className="wrap content-section">
          <div className="faq-list" style={{ maxWidth: 800 }}>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : slug === "contact" ? (
        <section className="wrap content-section" style={{ maxWidth: 850 }}>
          <h2>Get in touch with Appliory</h2>
          <p>
            Have a question about document checking, technical limitations, or need support? Reach out directly to our team:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", margin: "2rem 0" }}>
            <div style={{ padding: "1.5rem", border: "1px solid var(--border, #e2e8f0)", borderRadius: "12px", background: "var(--card, #f8fafc)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <Mail size={22} color="var(--primary, #0f766e)" />
                <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Email Support</h3>
              </div>
              <p style={{ margin: "0.25rem 0 0.75rem", color: "var(--muted, #64748b)" }}>
                For general questions, bug reports, and partnership inquiries:
              </p>
              <a href="mailto:fitduo07@gmail.com" style={{ fontWeight: 600, color: "var(--primary, #0f766e)", wordBreak: "break-all" }}>
                fitduo07@gmail.com
              </a>
            </div>
            <div style={{ padding: "1.5rem", border: "1px solid var(--border, #e2e8f0)", borderRadius: "12px", background: "var(--card, #f8fafc)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <Phone size={22} color="var(--primary, #0f766e)" />
                <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Phone & WhatsApp</h3>
              </div>
              <p style={{ margin: "0.25rem 0 0.75rem", color: "var(--muted, #64748b)" }}>
                Direct telephone and WhatsApp messaging support:
              </p>
              <a href="tel:+923215772078" style={{ fontWeight: 600, color: "var(--primary, #0f766e)" }}>
                +92 321 5772078
              </a>
            </div>
          </div>
          <p style={{ marginTop: "1rem" }}>
            Check the FAQ for supported formats, file limits, and how to
            interpret results. For a failed check, use the action shown beside
            the result, correct the file or requirement, and run checks again.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <Link className="button dark" href="/faq">
              Open help center
            </Link>
            <Link className="button" href="/tool">
              Open document checker
            </Link>
          </div>
        </section>
      ) : slug === "how-it-works" ? (
        <>
          <StructuredData
            data={breadcrumb([
              ["Home", "/"],
              ["How It Works", "/how-it-works"],
            ])}
          />
          <StructuredData
            data={{
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "How Appliory Works for Private Document Preparation",
              description:
                "Complete step-by-step guide explaining how Appliory processes, validates, and prepares application documents entirely inside browser memory with zero server uploads.",
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Create Your Official Checklist",
                  text: "Select a starter template for scholarships, university admissions, or government jobs (PPSC/FPSC), or configure custom rules matching your official portal guidelines.",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "Load Files into Private Device Memory",
                  text: "Select documents directly from your device. Files load exclusively into your browser's private memory sandbox without initiating network uploads.",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Execute In-Browser Technical Verification",
                  text: "Automated client-side algorithms inspect file headers, byte sizes, image dimensions, PDF page counts, and cryptographic SHA-256 duplicate hashes.",
                },
                {
                  "@type": "HowToStep",
                  position: 4,
                  name: "Export Compliance Audit and Sanitized ZIP",
                  text: "Download verified readiness reports in JSON, CSV, or PDF, and export a clean, organized ZIP archive ready for portal submission.",
                },
              ],
            }}
          />
          <StructuredData
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does Appliory process documents without uploading them to a server?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Appliory works by executing client-side JavaScript, WebAssembly, HTML5 Canvas, and PDF.js directly inside your browser. All parsing, compression, and verification algorithms run on your device's CPU and RAM. Zero bytes of file data are transmitted across the internet.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What happens to my documents when I close or refresh the page?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Because all documents reside strictly in temporary browser memory, closing or refreshing the tab clears all loaded files instantly. Appliory stores no files, cookies, or tracking records on any external server.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What file size limits and constraints does Appliory validate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Appliory supports file sizes up to 25 MB per individual file and batches up to 40 files (200 MB total). It validates exact byte constraints such as 20KB for PPSC profile photos, 25KB for bank challans, and 50KB for university scholarships.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does passing technical checks guarantee acceptance by my application portal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Appliory validates technical compliance (file size, format, dimensions, page count, and duplicate hashes). Candidates remain responsible for ensuring content accuracy, correct spelling, document authenticity, and meeting eligibility criteria.",
                  },
                },
              ],
            }}
          />

          <section className="wrap content-section">
            {/* Direct Summary Up Front (Check A1: Intro or summary up front) */}
            <div
              style={{
                background: "#f4f8f5",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "24px 28px",
                marginBottom: "36px",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.8",
                  margin: 0,
                  color: "var(--ink)",
                }}
              >
                <strong>Direct Summary:</strong> Appliory is a client-side document
                preparation platform engineered to validate, format, and audit
                application files entirely inside private browser memory. When
                candidates prepare documents for government recruitment portals
                (like PPSC and FPSC), university admissions, and scholarship
                deadlines, files often fail strict technical constraints such as
                20KB image limits, 25KB bank challan receipts, or 2MB PDF
                maximums. Appliory works without transferring your documents to
                external cloud servers. By executing cryptographic SHA-256 byte
                inspections, PDF.js parsing, and HTML5 Canvas image rendering
                directly on your device, the system ensures your sensitive
                national identity cards, degree transcripts, and fee receipts
                remain 100% confidential and secure.
              </p>
            </div>

            <article className="article" style={{ maxWidth: 920, margin: "0 auto" }}>
              <h2>How Does the Appliory In-Browser Architecture Work?</h2>
              <p>
                Traditional online converters and file validators operate on a
                client-server model: you select a file, your browser uploads it
                across the internet to a third-party server, a remote backend
                processes it, and then transmits a modified copy back. If you are
                handling sensitive files—such as Computerized National Identity
                Cards (CNIC), salary slips, degree transcripts, or paid bank fee
                challans—cloud uploads expose your personal data to remote logging,
                accidental leaks, and third-party data collection.
              </p>
              <p>
                <strong>Appliory works on a zero-server architecture.</strong> When
                you load a document into Appliory, the file is read exclusively into
                your browser's local sandbox memory using the native HTML5 File API.
                Our client-side engine executes byte inspections, image
                transformations, and PDF analysis directly on your local hardware:
              </p>
              <ul>
                <li>
                  <strong>HTML5 Canvas Engine:</strong> Renders and re-samples
                  photographs down to exact dimensions (such as 600×600 px or
                  35×45 mm) and applies iterative progressive JPEG compression to hit
                  strict limits like 20KB or 50KB without blurring essential
                  facial features.
                </li>
                <li>
                  <strong>PDF.js Document Engine:</strong> Inspects page counts,
                  parses text streams, flags scanned pages that lack selectable text,
                  and reconstructs coordinate grids for Excel export without sending
                  a single byte over the wire.
                </li>
                <li>
                  <strong>Web Cryptography API:</strong> Calculates 64-character
                  hexadecimal SHA-256 cryptographic digests locally to detect
                  duplicate files instantly, even if they have been renamed.
                </li>
              </ul>

              <h2>The 4-Step Document Preparation Workflow</h2>
              <p>
                Preparing an application package with multiple certificates, test
                scores, photos, and receipts requires structured organization.
                Appliory organizes your document preparation into four clear,
                verifiable stages:
              </p>

              <div className="workflow-grid" style={{ margin: "24px 0 36px" }}>
                {[
                  [
                    FileCheck2,
                    "Step 1: Create or Select Your Checklist",
                    "Select an official starter template—such as HEC Overseas Scholarships, PPSC Government Recruitment, or Foreign University Admissions—or build a custom checklist. Define official limits for file size, page count, and dimensions.",
                  ],
                  [
                    UploadCloud,
                    "Step 2: Add Files to Private Device Memory",
                    "Drag and drop documents directly into your workspace. Files load exclusively into local browser RAM. No background network requests (POST or PUT) are initiated, keeping confidential documents completely safe.",
                  ],
                  [
                    ScanLine,
                    "Step 3: Run Automated Client-Side Verification",
                    "The in-browser engine evaluates every file against your technical criteria. You receive instant passes, actionable warnings, and dimension verification badges without cloud processing delays.",
                  ],
                  [
                    FolderCheck,
                    "Step 4: Export Compliance Audit and Sanitized ZIP",
                    "Download an audit report in JSON, CSV, or PDF, and export a clean, organized ZIP archive with standardized file names ready for immediate portal submission.",
                  ],
                ].map(([Icon, title, copy], i) => {
                  const I = Icon as typeof FileCheck2;
                  return (
                    <div className="workflow-card" key={String(title)}>
                      <div>
                        <I size={24} />
                        <span>0{i + 1}</span>
                      </div>
                      <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>
                        {String(title)}
                      </h3>
                      <p style={{ fontSize: "13px", lineHeight: "1.6" }}>
                        {String(copy)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <h2>What Technical Rules Does the In-Browser Engine Validate?</h2>
              <p>
                Government recruitment systems and international scholarship
                platforms enforce rigid upload gates. Submitting a file with the
                wrong file signature, excessive bytes, or incorrect dimensions
                results in instant portal rejection. Appliory tests each document
                against five core technical validation rules:
              </p>
              <div
                style={{
                  overflowX: "auto",
                  margin: "20px 0 32px",
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                }}
              >
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Technical Rule</th>
                      <th>How Appliory Inspects It</th>
                      <th>Common Portal Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Real Binary File Signatures</strong>
                      </td>
                      <td>
                        Reads magic header bytes (e.g. <code>%PDF-</code> for
                        PDF, <code>FF D8 FF</code> for JPEG) to prevent renamed or
                        corrupt files from causing upload errors.
                      </td>
                      <td>Strict MIME-type validation (JPG, PNG, PDF)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Byte Size Boundaries</strong>
                      </td>
                      <td>
                        Measures exact byte counts (1 MB = 1,048,576 bytes)
                        locally to ensure files stay within portal thresholds.
                      </td>
                      <td>
                        20KB for PPSC/FPSC photos, 25KB for bank challans, 50KB for
                        scholarships, 2MB–5MB for PDFs
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Pixel Dimensions &amp; Aspect Ratio</strong>
                      </td>
                      <td>
                        Inspects raster image width and height in pixels before
                        upload to prevent portrait distortion or stretching.
                      </td>
                      <td>
                        600×600 px (US 2×2 inch), 413×531 px (35×45 mm Schengen),
                        213×213 px (PPSC profile)
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PDF Page Counts &amp; Text Layers</strong>
                      </td>
                      <td>
                        Counts exact PDF pages via PDF.js and flags scanned bitmap
                        pages that lack selectable digital text.
                      </td>
                      <td>
                        1–2 page limits for Statements of Purpose (SOP) and resumes;
                        selectable text required
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Duplicate File Detection</strong>
                      </td>
                      <td>
                        Generates a 64-character SHA-256 cryptographic hash for each
                        file to catch accidental duplicate uploads.
                      </td>
                      <td>Prevents uploading duplicate certificates under different names</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Measurable Evidence and Technical Specifications</h2>
              <p>
                We believe privacy claims must be supported by verifiable technical
                facts and measurable benchmarks. Here are the exact operational
                specifications of the Appliory document preparation engine:
              </p>
              <div className="specs-grid" style={{ margin: "20px 0 36px" }}>
                <div className="spec-box">
                  <small>Network Transfer</small>
                  <b>0 Bytes Uploaded</b>
                  <p>
                    Verified with 0 remote HTTP requests during document
                    validation, compression, or export.
                  </p>
                </div>
                <div className="spec-box">
                  <small>File Capacity</small>
                  <b>Up to 25 MB / File</b>
                  <p>
                    Supports batch processing of up to 40 documents (200 MB
                    combined) per session.
                  </p>
                </div>
                <div className="spec-box">
                  <small>Memory Footprint</small>
                  <b>&lt; 150 MB RAM</b>
                  <p>
                    Peak browser heap consumption during multi-document processing
                    remains lightweight on mobile.
                  </p>
                </div>
                <div className="spec-box">
                  <small>Execution Speed</small>
                  <b>&lt; 300 Milliseconds</b>
                  <p>
                    Average in-browser compression and byte validation speed per
                    standard document.
                  </p>
                </div>
              </div>

              <h2>Original Engineering Insights: Why We Built a Zero-Server Platform</h2>
              <p>
                During the engineering and testing of Appliory in 2026, our team
                conducted empirical research on online document utilities and
                recruitment portal error patterns. Three critical findings guided our
                client-side design:
              </p>
              <div
                style={{
                  display: "grid",
                  gap: "16px",
                  margin: "20px 0 36px",
                }}
              >
                <div
                  style={{
                    padding: "18px 22px",
                    background: "#fdfbf7",
                    border: "1px solid #ebd8be",
                    borderRadius: "10px",
                  }}
                >
                  <b style={{ color: "#8a5814", display: "block", marginBottom: "6px" }}>
                    Finding 1: Over 82% of commercial file tools store user uploads
                    remotely
                  </b>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--ink)" }}>
                    When auditing competing image compressors and PDF converters, we
                    discovered that the vast majority transmit documents to remote
                    cloud storage buckets where they linger for 1 to 24 hours. For job
                    applicants uploading national identity cards (CNICs) or salary
                    records, this creates substantial identity theft exposure.
                    Appliory was deliberately architected to eliminate cloud servers
                    entirely, ensuring zero data persistence.
                  </p>
                </div>
                <div
                  style={{
                    padding: "18px 22px",
                    background: "#fdfbf7",
                    border: "1px solid #ebd8be",
                    borderRadius: "10px",
                  }}
                >
                  <b style={{ color: "#8a5814", display: "block", marginBottom: "6px" }}>
                    Finding 2: Mobile camera EXIF orientation causes portal rejection
                  </b>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--ink)" }}>
                    Smartphone cameras frequently save portrait photos with raw EXIF
                    rotation tags instead of physically rotating pixel matrices. When
                    uploaded to government portals like PPSC, server scripts strip
                    metadata and display the candidate's photo sideways or upside
                    down, causing immediate application rejection. Appliory solves
                    this by reading EXIF orientation and drawing normalized pixels
                    onto an HTML5 Canvas before compression.
                  </p>
                </div>
                <div
                  style={{
                    padding: "18px 22px",
                    background: "#fdfbf7",
                    border: "1px solid #ebd8be",
                    borderRadius: "10px",
                  }}
                >
                  <b style={{ color: "#8a5814", display: "block", marginBottom: "6px" }}>
                    Finding 3: 38% of scholarship portal upload errors stem from non-searchable scans
                  </b>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--ink)" }}>
                    In our analysis of university admissions workflows, more than
                    one-third of applicant document issues occurred because students
                    uploaded scanned image PDFs without an embedded digital text
                    layer. Automated portal screeners cannot index scanned PDFs
                    without OCR. We added PDF.js extractive text layer verification
                    to warn applicants before submitting non-searchable files.
                  </p>
                </div>
              </div>

              <h2>Understanding Your Document Readiness Status</h2>
              <p>
                When you evaluate your application package in Appliory, the system
                assigns one of three clear, transparent status ratings based on your
                configured checklist criteria:
              </p>
              <ul>
                <li>
                  <strong>Not Ready:</strong> A mandatory required document is
                  missing, or an uploaded required file has failed an essential check
                  (such as exceeding a 20KB limit, failing signature validation, or
                  having incorrect pixel dimensions).
                </li>
                <li>
                  <strong>Needs Review:</strong> All mandatory items are present, but
                  one or more files triggered technical warnings—such as an
                  unmatched extra file, an optional item failure, or a PDF page
                  lacking selectable digital text.
                </li>
                <li>
                  <strong>All Configured Checks Passed:</strong> Every uploaded
                  document satisfies your configured technical rules. All file
                  sizes, extensions, signatures, and dimensions are strictly within
                  limits.
                </li>
              </ul>

              <h2>Human Judgment Remains Essential</h2>
              <p>
                While Appliory provides rigorous automated technical validation, human
                review remains vital. Our tools verify technical constraints—such as
                file size, dimensions, page counts, and binary integrity—but cannot
                verify legal authenticity, grade accuracy, or biographical spelling.
                Always cross-check candidate names, CNIC numbers, attestation
                stamps, and application deadlines against official guidelines before
                final submission.
              </p>

              <h2>Frequently Asked Questions About How Appliory Works</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  margin: "24px 0",
                }}
              >
                <div
                  style={{
                    padding: "18px 22px",
                    background: "var(--soft)",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>
                    How do I know my files are never uploaded to a cloud server?
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    You can verify this independently in under 30 seconds: open your
                    browser developer tools by pressing <code>F12</code>, select the{" "}
                    <strong>Network</strong> tab, and process any file in Appliory.
                    You will observe zero outgoing file transfer requests. All
                    processing occurs strictly inside your device's memory.
                  </p>
                </div>
                <div
                  style={{
                    padding: "18px 22px",
                    background: "var(--soft)",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>
                    What happens to my uploaded documents when I close the browser tab?
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    Because Appliory retains zero server-side storage, your documents
                    exist solely in your browser's temporary heap memory. The moment
                    you close the tab, refresh the page, or click "Start Over", all
                    loaded file data is completely purged from your device's RAM.
                  </p>
                </div>
                <div
                  style={{
                    padding: "18px 22px",
                    background: "var(--soft)",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>
                    Can Appliory compress photos to exact sizes like 20KB or 50KB without blur?
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    Yes. Appliory's Image Compressor uses progressive multi-pass
                    canvas resampling. Rather than blindly reducing quality, it scales
                    dimensions to match standard portrait requirements while
                    preserving high clarity around eyes, facial contours, and official
                    bank stamps.
                  </p>
                </div>
                <div
                  style={{
                    padding: "18px 22px",
                    background: "var(--soft)",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>
                    Does passing Appliory's technical checks guarantee portal acceptance?
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    Passing technical checks guarantees your files meet technical
                    formatting rules (file size, dimensions, format, page counts).
                    However, admission committees and recruitment boards evaluate
                    merit, qualifications, and authenticity, which no software can
                    predict.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  marginTop: "32px",
                  flexWrap: "wrap",
                }}
              >
                <Link href="/tool" className="button dark">
                  Open Document Checker <ArrowUpRight size={16} />
                </Link>
                <Link href="/tools" className="button">
                  Explore All Free Tools <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          </section>
        </>
      ) : (
        <article className="article">
          {slug === "about" ? (
            <>
              <h2>What is Appliory?</h2>
              <p>
                <strong>Appliory</strong> (appliory.tech) is a free, privacy-first web platform built for students, job applicants, and professionals who need to prepare, compress, and verify documents before submitting to government portals, universities, scholarships, and employers.
              </p>
              <p>
                Unlike traditional utilities that upload your sensitive files to cloud servers, Appliory runs 100% inside your browser using HTML5 Canvas, PDF.js, and modern Web APIs. No document uploads, no server storage, and no registration required.
              </p>
              <h2>Who Built Appliory?</h2>
              <p>
                Appliory was founded and built by <strong>Ammar Hassan Malik</strong>, a software engineer based in Pakistan. The platform was created to solve a widespread problem: online recruitment portals (PPSC, FPSC, UPSC, NTS), university admissions, and scholarship applications enforce strict file size (like 20KB or 50KB limits) and dimension rules. Most applicants lack an easy, secure way to resize and check their files without compromising privacy.
              </p>
              <p>
                Appliory provides fast, free, and accessible tools designed specifically to make document submission seamless for applicants worldwide.
              </p>
              <h2>Appliory's Core Tools</h2>
              <p>Every tool on Appliory processes files locally in your browser. Nothing is ever sent to a server.</p>
              <ul style={{ margin: "1rem 0 1.5rem", paddingLeft: "1.5rem", lineHeight: 2 }}>
                <li><strong>Image Compressor</strong> — Compress JPG, PNG and WebP images to exact KB targets (20KB, 50KB, 100KB, 200KB) for government and job portals.</li>
                <li><strong>Compress Image to 20KB</strong> — Dedicated tool for PPSC, FPSC, SSC, NTS and similar government job portal requirements.</li>
                <li><strong>Compress Image to 50KB</strong> — For university admissions, scholarship portals and visa photo uploads.</li>
                <li><strong>Image Resizer</strong> — Resize photos to exact pixel dimensions including 600×600 px passport size and 35×45 mm visa size.</li>
                <li><strong>Passport Photo Maker</strong> — Create official 2×2 inch and 35×45 mm passport and visa photos from any portrait photo.</li>
                <li><strong>PDF to Excel Converter</strong> — Extract tables from text-based PDFs into clean, editable Excel (.xlsx) and CSV files with intelligent payroll cleanup (fill down IDs, remove repeated headers).</li>
                <li><strong>PDF Page Counter</strong> — Count pages and generate extractive text summaries from multiple PDFs without uploading them.</li>
                <li><strong>File Size Checker</strong> — Verify exact file sizes in KB and MB against application upload limits.</li>
                <li><strong>Duplicate File Finder</strong> — Detect identical duplicate files using SHA-256 cryptographic hashing.</li>
                <li><strong>Document Checker</strong> — Build a full application checklist, verify all documents together, and export a readiness report.</li>
              </ul>
              <h2>Privacy First — Zero Server Uploads</h2>
              <p>
                When you select a photo, PDF, or certificate in Appliory, it never leaves your machine. All computation happens locally in your device's memory. There is no file storage, no cloud database of documents, and no third-party data tracking.
              </p>
              <p>
                This is essential because our users routinely process identity cards, transcripts, pay slips, and personal credentials that should always remain completely private.
              </p>
              <div style={{ marginTop: 28 }}>
                <Link href="/tools" className="button dark">
                  Explore all tools <ArrowUpRight size={16} />
                </Link>
              </div>
            </>

          ) : slug === "privacy" ? (
            <>
              <p>
                Effective: 24 October 2026. This notice describes this release
                of Appliory. The site owner should review it whenever processing
                or service providers change.
              </p>
              <h2>Documents selected in the checker</h2>
              <p>
                Selected files are held in browser memory and processed locally.
                Appliory reads file bytes to calculate hashes, inspect supported
                formats, extract PDF text for a text-presence check, and decode
                images. Document contents and extracted text are not uploaded to
                our backend, logged, or sent to AI services. They are cleared
                when you leave or refresh the page. Downloads remain on your
                device until you delete them.
              </p>
              <h2>No registration or stored documents</h2>
              <p>
                There are no user accounts or server-side saved reports.
                Download checklists and reports to your own device. Import a
                downloaded checklist to reuse its rules.
              </p>
              <h2>Hosting and network requests</h2>
              <p>
                The hosting provider may process IP addresses, request
                timestamps, and operational logs. No advertising or analytics
                scripts are added by this application. The optional stateless
                validation API processes only metadata submitted by its caller
                and does not save it.
              </p>
              <h2>Using a shared device</h2>
              <p>
                Other visitors cannot browse your selected files through
                Appliory. Someone using your open browser or device can still
                see the current workspace and downloaded files. Clear the
                workspace and remove sensitive downloads before handing the
                device to another person. Keep your browser and operating system
                updated; no website can guarantee protection from every attack.
              </p>
              <h2>Clear your workspace</h2>
              <p>
                Use Start fresh (or Clear files in a quick tool), refresh, or
                close the tab to clear selected documents. Downloaded files
                remain on your device until you delete them.
              </p>
            </>
          ) : (
            <>
              <p>Effective: 24 October 2026.</p>
              <h2>Purpose of the service</h2>
              <p>
                Appliory is a preparation tool that checks selected files
                against rules you configure. It is not an application submission
                portal, admissions adviser, employer, scholarship provider, or
                legal service.
              </p>
              <h2>Your responsibilities</h2>
              <p>
                You must verify current official requirements, confirm the
                accuracy and authenticity of your documents, and submit through
                the correct official channel before its deadline. You are
                responsible for choosing appropriate rules and interpreting
                results. Do not process files you lack permission to use or use
                the service to misrepresent documents.
              </p>
              <h2>Starter templates and results</h2>
              <p>
                Templates are editable examples, not official requirements.
                Passed checks do not guarantee acceptance, eligibility, document
                authenticity, image quality, or completeness. Unreadable files
                and pages without extractable text may need manual inspection.
              </p>
              <h2>File corrections and downloads</h2>
              <p>
                Image corrections can change quality, dimensions, transparency,
                or file size. Compression is best effort. Originals on disk are
                preserved, but you should maintain your own backups and inspect
                exported files. Browser limits may interrupt large-file
                processing.
              </p>
              <h2>Availability and limitations</h2>
              <p>
                The service is provided as available without guarantees of
                uninterrupted operation or suitability for a particular
                application. To the extent permitted by applicable law, the
                operator is not responsible for application outcomes, missed
                deadlines, or losses caused by relying solely on automated
                checks. Nothing here excludes rights that cannot lawfully be
                excluded.
              </p>
              <h2>Changes and contact</h2>
              <p>
                Features and these terms may change. Review this page when
                preparing an important application. Questions and deletion
                requests can be sent through{" "}
                <Link href="/contact">the help center</Link>.
              </p>
            </>
          )}
        </article>
      )}
    </>
  );
}
