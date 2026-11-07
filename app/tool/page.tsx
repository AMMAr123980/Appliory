import { Suspense } from "react";
import type { Metadata } from "next";
import Tool from "@/components/appliory/tool";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Free Document Checker Online — Private File & PDF Validator",
  "Check application requirements, missing files, PDF page counts, file sizes, and image dimensions locally in your browser with zero document uploads & privacy.",
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
          <h2>What is the Appliory Document Checker?</h2>
          <p>
            The <strong>Appliory Document Checker</strong> is a free, in-browser tool that helps job applicants, university candidates, and scholarship seekers verify that all their required documents meet official technical constraints before submitting them online.
          </p>

          <h2>How Does the Document Checker Work?</h2>
          <ol>
            <li><strong>Select or Create a Checklist:</strong> Choose from ready-made templates (Scholarships, University Admissions, Job Applications) or customize your own document rules.</li>
            <li><strong>Add Your Files:</strong> Drag and drop your PDFs, scanned certificates, identity photos, or resumes from your phone or PC.</li>
            <li><strong>Run Automated Local Checks:</strong> The tool analyzes your files for missing documents, allowed file extensions, real file signatures, byte size limits, PDF page counts, selectable text presence, and exact duplicate files.</li>
            <li><strong>Export Your Readiness Report:</strong> Download a verified readiness audit and export an organized, sanitized ZIP folder ready for upload.</li>
          </ol>

          <h2>What Checks Does Appliory Perform?</h2>
          <ul>
            <li><strong>File Format & Signature Validation:</strong> Inspects actual byte headers to ensure a file named .pdf is genuinely a valid PDF, not a renamed image or corrupted file.</li>
            <li><strong>Size & Upload Limits:</strong> Measures exact file sizes against portal rules (e.g., maximum 2MB or 5MB limits).</li>
            <li><strong>PDF Page Counts & Text Selectability:</strong> Checks whether a PDF exceeds page limitations and flags scanned documents that lack digital extractable text.</li>
            <li><strong>Duplicate File Detection:</strong> Calculates cryptographic SHA-256 hashes to catch duplicate files even if their filenames differ.</li>
            <li><strong>Photo Dimension Verification:</strong> Confirms image pixel width and height against application criteria.</li>
          </ul>

          <h2>Supported File Formats</h2>
          <p>
            Appliory supports all common application formats including <strong>PDF (.pdf)</strong>, <strong>JPEG (.jpg, .jpeg)</strong>, <strong>PNG (.png)</strong>, <strong>WebP (.webp)</strong>, and <strong>ZIP archives</strong> for export.
          </p>

          <h2>Who Should Use This Tool?</h2>
          <p>
            Candidates applying for <strong>PPSC, FPSC, NTS, CSS</strong>, university admissions (HEC, international colleges), Erasmus, Chevening, Fulbright scholarships, and corporate job applications where strict upload limits lead to rejected applications.
          </p>

          <h2>Complete Privacy Guarantee</h2>
          <p>
            Your documents never leave your computer or phone. All cryptographic checks, PDF parsing, and image measurements run 100% on your device using client-side JavaScript and WebAssembly. No files are uploaded to any server.
          </p>
        </article>
      </section>
    </div>
  );
}
