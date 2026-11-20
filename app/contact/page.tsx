import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(
    "Contact Appliory – Questions, Feedback & Support",
    "Contact Appliory for questions, bug reports, or feedback. Email fitduo07@gmail.com or call +92 321 5772078. We respond within 2 business days.",
    "/contact",
  ),
  alternates: { canonical: "https://www.appliory.tech/contact" },
};

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      <p>
        Have a question, found a bug, or want to suggest a new feature? We read
        every message and respond within 2 business days.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
        <div className="not-prose space-y-4 bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Email</p>
            <a
              href="mailto:fitduo07@gmail.com"
              className="text-teal-700 font-semibold text-lg hover:underline"
            >
              fitduo07@gmail.com
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Phone</p>
            <a
              href="tel:+923215772078"
              className="text-teal-700 font-semibold text-lg hover:underline"
            >
              +92 321 5772078
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Response Time</p>
            <p className="text-slate-700">Within 2 business days</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Languages</p>
            <p className="text-slate-700">English · Urdu</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What to Include</h2>
        <p>To help us respond quickly, please include:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>The tool you were using (e.g., Image Compressor, PDF to Excel)</li>
          <li>A brief description of the problem or question</li>
          <li>Your browser and operating system (if reporting a bug)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Privacy Inquiries</h2>
        <p>
          For questions about how Appliory handles data, please read our{" "}
          <Link href="/privacy" className="underline text-teal-700">
            Privacy Policy
          </Link>{" "}
          first. For specific privacy concerns, email{" "}
          <a href="mailto:fitduo07@gmail.com" className="underline text-teal-700">
            fitduo07@gmail.com
          </a>{" "}
          with the subject line <em>Privacy Inquiry</em>.
        </p>
      </section>

      <section>
        <p className="text-sm text-slate-500">
          <Link href="/about" className="underline">About Appliory</Link> ·{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link> ·{" "}
          <Link href="/terms" className="underline">Terms of Use</Link>
        </p>
      </section>
    </main>
  );
}
