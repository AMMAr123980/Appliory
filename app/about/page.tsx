import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(
    "About Appliory – Private Document & Image Tools",
    "Appliory is a free, privacy-first platform for image compression, PDF conversion, file size checking, and application document preparation. Files are processed locally in your browser.",
    "/about",
  ),
  alternates: { canonical: "https://www.appliory.tech/about" },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-3xl font-bold mb-4">About Appliory</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What is Appliory?</h2>
        <p>
          Appliory is a free, privacy-first web platform that provides practical
          document and image tools for people preparing application files — job
          applications, university admissions, government portals, and official
          form submissions. Every tool runs entirely inside your browser: no
          document contents are uploaded to Appliory servers.
        </p>
        <p>
          The platform was built to solve a simple but common problem: applicants
          often need to compress, resize, or verify their files before submitting
          them to portals with strict size limits. Appliory gives you the tools
          to do that quickly, privately, and at no cost.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Our Tools</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Image Compressor</strong> — Reduce image file size in KB/MB.
            Supports JPEG, PNG, and WebP. Output size depends on the original
            image, dimensions, and compression settings.
          </li>
          <li>
            <strong>Image Resizer</strong> — Resize images to specific pixel
            dimensions without server uploads.
          </li>
          <li>
            <strong>Passport Photo Maker</strong> — Crop and size a photo to
            common passport dimensions. Always verify official biometric
            requirements before submitting.
          </li>
          <li>
            <strong>File Size Checker</strong> — Instantly see the exact size of
            any file in KB and MB before uploading it to a portal.
          </li>
          <li>
            <strong>PDF Page Counter</strong> — Count pages in a PDF and view a
            brief content summary.
          </li>
          <li>
            <strong>Duplicate File Finder</strong> — Detect exact duplicate
            files using SHA-256 checksums.
          </li>
          <li>
            <strong>PDF to Excel Converter</strong> — Extract tabular data from
            text-based PDFs. Scanned PDFs require OCR software.
          </li>
          <li>
            <strong>Application Document Checker</strong> — Verify that your
            document set meets common portal requirements before submission.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Technical Limits</h2>
        <p>
          Each tool processes files locally in your browser using JavaScript.
          Current limits per tool session:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Maximum file size: 25 MB per file</li>
          <li>Maximum batch size: 40 files</li>
          <li>Maximum total batch data: 200 MB</li>
        </ul>
        <p>
          These limits reflect practical browser memory constraints. Larger files
          may cause slower processing depending on your device.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Privacy Commitment</h2>
        <p>
          Appliory does not receive, store, or transmit your document or image
          contents. All file processing happens locally in your browser. We
          collect only standard analytics data (page views, session counts)
          through Google Analytics and Ahrefs Analytics to understand how the
          platform is used. For full details, see our{" "}
          <Link href="/privacy" className="underline text-teal-700">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">About the Developer</h2>
        <p>
          Appliory was founded and built by{" "}
          <strong>Ammar Hassan Malik</strong>, a software developer based in
          Pakistan. The platform launched in 2024 and has since expanded to
          cover document checking, PDF utilities, and guided preparation
          checklists for common application scenarios.
        </p>
        <p>
          The goal is to build tools that are genuinely useful, clearly
          documented about their limitations, and respectful of user privacy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
        <p>
          Questions, bug reports, or feature requests are welcome. See the{" "}
          <Link href="/contact" className="underline text-teal-700">
            Contact page
          </Link>{" "}
          for details.
        </p>
        <ul className="list-none space-y-1 not-prose">
          <li>
            Email:{" "}
            <a
              href="mailto:fitduo07@gmail.com"
              className="text-teal-700 underline"
            >
              fitduo07@gmail.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:+923215772078" className="text-teal-700 underline">
              +92 321 5772078
            </a>
          </li>
        </ul>
      </section>

      <section>
        <p className="text-sm text-slate-500">
          Last updated: November 2026 ·{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="underline">
            Terms of Use
          </Link>
        </p>
      </section>
    </main>
  );
}
