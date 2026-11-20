import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(
    "How Appliory Works – Private, Browser-Based File Tools",
    "Appliory processes all files locally in your browser using JavaScript. No document contents are uploaded. Learn how image compression, PDF tools, and file checking work.",
    "/how-it-works",
  ),
  alternates: { canonical: "https://www.appliory.tech/how-it-works" },
};

const steps = [
  {
    number: "01",
    title: "You select your files",
    description:
      "You choose files from your device using the tool's file picker or by dragging and dropping. Files are loaded into your browser's memory — they never leave your device at this stage.",
  },
  {
    number: "02",
    title: "Your browser processes them",
    description:
      "Appliory's JavaScript code runs the tool operation entirely within your browser — compressing an image, counting PDF pages, checking file sizes, or detecting duplicates. No data is sent to our servers.",
  },
  {
    number: "03",
    title: "You download the result",
    description:
      "The processed output (compressed image, converted file, or report) is generated in your browser and offered for download directly to your device. We receive nothing.",
  },
  {
    number: "04",
    title: "Session ends, files cleared",
    description:
      "When you close or refresh the tab, your browser clears the files from memory. Appliory has no record of the files you processed. Download everything you need before leaving.",
  },
];

const tools = [
  {
    name: "Image Compressor",
    how: "Reduces JPEG, PNG, and WebP file size by adjusting compression quality in your browser using the Canvas API. Output size depends on the original image, its dimensions, and the compression level you select.",
    limit: "25 MB per file, up to 40 files",
  },
  {
    name: "Image Resizer",
    how: "Redraws your image at a new pixel size using the Canvas API in your browser. No quality loss beyond standard JPEG or PNG re-encoding.",
    limit: "25 MB per file",
  },
  {
    name: "Passport Photo Maker",
    how: "Crops and resizes your photo to common passport dimensions. Output must still meet the official biometric requirements of the destination country — always verify before printing.",
    limit: "25 MB per file",
  },
  {
    name: "File Size Checker",
    how: "Reads the file metadata (not the content) in your browser and displays the exact size in KB and MB. Instant — no processing required.",
    limit: "Any size file",
  },
  {
    name: "PDF Page Counter",
    how: "Parses the PDF structure in your browser using PDF.js to count pages and extract a brief text summary from selectable text layers.",
    limit: "25 MB per file",
  },
  {
    name: "Duplicate File Finder",
    how: "Hashes each file with SHA-256 in your browser. Files with identical hashes are exact byte-for-byte duplicates, regardless of their file name.",
    limit: "40 files, 200 MB total",
  },
  {
    name: "PDF to Excel Converter",
    how: "Extracts tabular data from text-based PDFs in your browser. Scanned PDFs (images of documents) do not contain selectable text and cannot be converted without OCR software.",
    limit: "25 MB per file",
  },
  {
    name: "Application Document Checker",
    how: "Compares your selected documents against a configurable checklist of requirements: file type, size limit, page count, and duplicate status. Reports pass/fail per item.",
    limit: "40 files, 25 MB per file, 200 MB total",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-3">How Appliory Works</h1>
      <p className="text-slate-600 mb-10 text-base leading-relaxed">
        Every Appliory tool runs entirely in your browser. Your document and
        image contents are never transmitted to our servers. This page explains
        exactly what happens when you use a tool.
      </p>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">The Four-Step Process</h2>
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy note */}
      <section className="mb-12 bg-teal-50 border border-teal-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-teal-800 mb-2">
          Why we built it this way
        </h2>
        <p className="text-teal-900 text-sm leading-relaxed">
          Many applicants need to compress or resize sensitive documents:
          identity cards, degree certificates, bank statements. We built
          Appliory as a fully browser-based platform so you never have to trust
          us with those files. Your privacy is structural, not just a policy.
        </p>
        <p className="text-teal-900 text-sm leading-relaxed mt-3">
          Standard analytics (page views, session counts) and ads still run on
          the site — these do not involve your files. See our{" "}
          <Link href="/privacy" className="underline font-medium">
            Privacy Policy
          </Link>{" "}
          for the full picture.
        </p>
      </section>

      {/* Per-tool explanations */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">How Each Tool Works</h2>
        <div className="space-y-5">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="border border-slate-200 rounded-lg p-5 bg-white"
            >
              <h3 className="font-semibold text-slate-800 mb-1">{tool.name}</h3>
              <p className="text-slate-600 text-sm mb-2 leading-relaxed">
                {tool.how}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                Limit: {tool.limit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 pt-8">
        <div className="flex flex-wrap gap-4">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors"
          >
            Browse All Tools
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:border-slate-400 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:border-slate-400 transition-colors"
          >
            About Appliory
          </Link>
        </div>
      </section>
    </main>
  );
}
