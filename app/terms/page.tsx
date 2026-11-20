import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(
    "Terms of Use – Appliory",
    "Appliory Terms of Use: rules and disclaimers for using our free document and image tools. Files are processed in your browser. No guarantees on output quality.",
    "/terms",
  ),
  alternates: { canonical: "https://www.appliory.tech/terms" },
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
      <p className="text-sm text-slate-500 mb-8">
        Last updated: 20 November 2026 · Applies to <strong>appliory.tech</strong>
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By using Appliory (&ldquo;the Site&rdquo;), you agree to these Terms
          of Use. If you do not agree, do not use the Site. These terms apply to
          all visitors and users of <strong>www.appliory.tech</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Description of Service</h2>
        <p>
          Appliory provides free, browser-based tools for image compression,
          image resizing, PDF operations, file size checking, duplicate file
          detection, and application document preparation. All tools process
          files locally in your browser. No document or image content is
          transmitted to Appliory servers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. No Guarantee of Output</h2>
        <p>
          Tool outputs — including compressed image sizes, converted PDF data,
          and resized photo dimensions — depend on the input file, its content,
          dimensions, format, and your browser environment. Appliory does not
          guarantee that any specific output file size, quality, or format will
          be achieved.
        </p>
        <p>
          Always review output files before submitting them to any official
          portal, employer, or institution. Verify the specific requirements of
          the destination portal directly with its official source.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use the Site for any unlawful purpose</li>
          <li>Attempt to reverse-engineer, scrape, or overload Site infrastructure</li>
          <li>Use the Site to process files containing illegal, harmful, or infringing content</li>
          <li>Circumvent any security or access restrictions on the Site</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
        <p>
          All content on the Site — including text, tool interfaces, branding,
          and blog articles — is owned by Appliory or its author (Ammar Hassan
          Malik) unless otherwise stated. You may not reproduce, redistribute, or
          republish Site content without written permission.
        </p>
        <p>
          Files you process through Appliory tools remain your property. We do
          not claim any rights over your files.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Disclaimers</h2>
        <p>
          The Site is provided &ldquo;as is&rdquo; without warranties of any
          kind. Appliory is not responsible for:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Rejection of files by any government, employer, or institution portal</li>
          <li>Data loss resulting from tool use or browser limitations</li>
          <li>Accuracy of third-party information referenced in blog articles or guides</li>
          <li>Service interruptions, bugs, or errors in tool output</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Appliory shall not
          be liable for any direct, indirect, incidental, or consequential
          damages arising from your use of the Site or its tools.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Third-Party Services</h2>
        <p>
          The Site uses Google Analytics, Google AdSense, Ahrefs Analytics, and
          Vercel hosting. These services have their own privacy policies and terms.
          Appliory is not responsible for the practices of these third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
        <p>
          We may revise these Terms at any time. The &ldquo;Last updated&rdquo;
          date at the top reflects the most recent revision. Continued use of
          the Site after a revision constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Pakistan. Any disputes will
          be resolved in the courts of Pakistan.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">11. Contact</h2>
        <p>
          Questions about these Terms? Email us at{" "}
          <a href="mailto:fitduo07@gmail.com" className="text-teal-700 underline">
            fitduo07@gmail.com
          </a>
          .
        </p>
      </section>

      <section>
        <p className="text-sm text-slate-500">
          <Link href="/about" className="underline">About Appliory</Link> ·{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link> ·{" "}
          <Link href="/contact" className="underline">Contact</Link>
        </p>
      </section>
    </main>
  );
}
