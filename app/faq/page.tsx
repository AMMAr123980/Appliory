import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/appliory/structured-data";
import { absolute } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(
    "Frequently Asked Questions – Appliory Tools",
    "Answers to common questions about Appliory's document and image tools: privacy, file limits, how compression works, what gets checked, and more.",
    "/faq",
  ),
  alternates: { canonical: "https://www.appliory.tech/faq" },
};

export default function FaqPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 mb-10">
          Common questions about Appliory&rsquo;s tools, privacy, file limits,
          and how everything works.
        </p>

        <div className="space-y-6">
          {faqs.map(([q, a], i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-lg p-5 bg-white"
            >
              <h2 className="text-base font-semibold text-slate-800 mb-2">
                {q}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">
            Didn&rsquo;t find your answer?
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:border-slate-400 transition-colors"
            >
              About Appliory
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:border-slate-400 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
