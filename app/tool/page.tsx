import { Suspense } from "react";
import type { Metadata } from "next";
import Tool from "@/components/appliory/tool";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Application Document Checker – Free & Private",
  "Check application files for size limits, image dimensions, PDF pages, file signatures, missing checklist items and exact duplicates in your browser.",
  "/tool",
);
export default function Page() {
  return (
    <div>
      <section className="checker-intro wrap">
        <h1>Check your application documents online</h1>
        <p>
          Set your requirements, select your files, and check missing documents,
          PDF pages, file sizes, image dimensions and exact duplicates. 100% private,
          processed locally on your device with zero document uploads.
        </p>

        {/* Validation Scope: What it validates vs What it cannot */}
        <div className="checker-scope-grid" style={{ maxWidth: 960, margin: "24px auto 0" }}>
          <div className="scope-col">
            <span className="scope-title valid">
              ✓ What This Checker Validates
            </span>
            <ul className="scope-list">
              <li><strong>File Size (Bytes):</strong> Compares actual bytes against 20KB, 50KB, 2MB, or custom rules.</li>
              <li><strong>Real Binary Signatures:</strong> Detects corrupted or renamed files (e.g. .jpg renamed as .pdf).</li>
              <li><strong>Pixel Dimensions:</strong> Verifies exact image dimensions (e.g. 35×45mm, 600×600 px).</li>
              <li><strong>PDF Pages &amp; Text:</strong> Checks total page count and flags scanned pages lacking selectable text.</li>
              <li><strong>Duplicate Detection:</strong> Identifies duplicate uploads using SHA-256 hashes.</li>
            </ul>
          </div>
          <div className="scope-col">
            <span className="scope-title invalid">
              ✕ What This Checker Cannot Validate
            </span>
            <ul className="scope-list">
              <li><strong>Legal Authenticity:</strong> Cannot verify if a degree, CNIC, or challan is legally genuine.</li>
              <li><strong>Typographical Accuracy:</strong> Does not read or correct spelling of names or marks inside files.</li>
              <li><strong>Merit Decisions:</strong> Technical compliance does not guarantee acceptance by selection boards.</li>
              <li><strong>Unreadable Scans:</strong> Cannot extract text from low-quality photos without digital OCR.</li>
            </ul>
          </div>
        </div>
      </section>
      <Suspense
        fallback={
          <div className="empty-state">Preparing your private workspace…</div>
        }
      >
        <Tool />
      </Suspense>

      {/* Crawlable explanatory guide for Search Engines & Users */}
      <section className="wrap content-section" style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
        <article className="article" style={{ maxWidth: 880, margin: "0 auto" }}>
          <h2>What Does the Application Document Checker Do?</h2>
          <p>
            The <strong>Appliory Document Checker</strong> is a free, in-browser tool that helps job applicants, university candidates, and scholarship seekers verify that all their required documents meet official technical constraints before submitting them online. It runs entirely on your device — no files are sent to any server.
          </p>

          <h2>What Can You Verify?</h2>
          <ul>
            <li><strong>File Size and Upload Limits:</strong> Compares actual byte size against 20KB, 50KB, 2MB, 5MB, or any custom ceiling you specify.</li>
            <li><strong>Image Dimensions:</strong> Verifies pixel width and height against requirements such as 35×45mm, 600×600 px, or 350×467 px.</li>
            <li><strong>PDF Page Count:</strong> Checks total pages in each PDF and flags files that exceed your specified page limit.</li>
            <li><strong>Selectable Text Detection:</strong> Flags pages that contain only scanned bitmap images and lack selectable digital text — these pages cannot be summarized or searched without OCR.</li>
            <li><strong>File Format and Binary Signature:</strong> Inspects actual byte headers to confirm a file is genuinely the format its extension claims — catches renamed or corrupted files.</li>
            <li><strong>Exact Duplicate Detection:</strong> Uses SHA-256 hashing to identify files with identical contents, even when their filenames differ.</li>
            <li><strong>Missing Checklist Items:</strong> Tracks which required documents from your selected template have not yet been added.</li>
          </ul>

          <h2>What Cannot It Verify?</h2>
          <ul>
            <li><strong>Legal Authenticity:</strong> Cannot confirm whether a degree, CNIC, challan, or any identity document is genuine or government-issued.</li>
            <li><strong>Names, Marks, and Spelling:</strong> Does not read or proofread text written inside documents — names, grades, or CNIC numbers are not inspected.</li>
            <li><strong>Scholarship or Job Eligibility:</strong> Technical compliance does not determine merit-list inclusion, interview shortlisting, or eligibility.</li>
            <li><strong>Final Acceptance by an Institution:</strong> Cannot guarantee portal acceptance, which is determined solely by the receiving authority.</li>
            <li><strong>OCR on Scanned Documents:</strong> Cannot extract or read text from low-resolution scanned pages or handwritten documents.</li>
          </ul>

          <h2>How to Check Your Documents</h2>
          <ol>
            <li><strong>Select or Create a Checklist:</strong> Choose from ready-made templates (PPSC, Scholarships, University Admissions, Job Applications) or customize your own document rules and size limits.</li>
            <li><strong>Add Your Files:</strong> Drag and drop or select your PDFs, scanned certificates, identity photos, and resumes from your phone or PC. All files stay on your device.</li>
            <li><strong>Run Automated Local Checks:</strong> The tool checks file size, format signature, image dimensions, PDF page count, text selectability, and exact duplicates — all locally in your browser.</li>
            <li><strong>Export Your Readiness Report:</strong> Download a verified readiness audit and export a sanitized ZIP folder organized and ready for upload.</li>
          </ol>

          <h2>Example Application Readiness Report</h2>
          <p>
            Below is an illustrative example using dummy, non-personal data. It shows what the checker output looks like for a typical government job application.
          </p>
          <div style={{ background: "var(--surface, #f8fafc)", border: "1px solid var(--line)", borderRadius: 10, padding: "20px 24px", fontFamily: "monospace", fontSize: "0.85rem", lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Application Pack Readiness Report — Sample</div>
            <div>✓ <strong>Applicant_Photo.jpg</strong> — 22.4 KB · 300×400 px · JPEG · No duplicates</div>
            <div>✓ <strong>CNIC_Front.jpg</strong> — 24.1 KB · 640×405 px · JPEG · No duplicates</div>
            <div>✓ <strong>Domicile_Certificate.pdf</strong> — 1.2 MB · 2 pages · Text selectable · No duplicates</div>
            <div>✓ <strong>Degree_Certificate.pdf</strong> — 3.4 MB · 1 page · Text selectable · No duplicates</div>
            <div>⚠ <strong>Transcript.pdf</strong> — 5.8 MB · 4 pages · <em>Exceeds 5MB portal limit</em></div>
            <div>⚠ <strong>Bank_Challan_Scan.jpg</strong> — 28.7 KB · 827×1169 px · JPEG · <em>Exceeds 25KB limit</em></div>
            <div style={{ marginTop: 10, color: "var(--muted)", fontSize: "0.78rem" }}>Note: This is illustrative sample data only. No real personal documents are shown.</div>
          </div>

          <h2>Who Should Use It?</h2>
          <p>
            Candidates applying for <strong>PPSC, FPSC, NTS, CSS</strong>, university admissions (HEC, international colleges), Erasmus, Chevening, Fulbright scholarships, and corporate job applications where strict upload limits lead to rejected applications.
          </p>

          <h2>Supported File Formats</h2>
          <p>
            Appliory supports all common application formats including <strong>PDF (.pdf)</strong>, <strong>JPEG (.jpg, .jpeg)</strong>, <strong>PNG (.png)</strong>, <strong>WebP (.webp)</strong>, and <strong>ZIP archives</strong> for export.
          </p>

          <h2>Local File Processing &amp; Privacy</h2>
          <p>
            Your documents never leave your computer or phone. All cryptographic checks, PDF parsing, and image measurements run 100% on your device using client-side JavaScript. Document contents are not sent to any processing server. Standard website hosting, analytics, and security requests collect only anonymous access data — never your files.
          </p>
        </article>
      </section>
    </div>
  );
}
