import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(
    "Privacy Policy – Appliory",
    "Appliory Privacy Policy: how we collect analytics data, use cookies, serve ads, and protect your privacy. Files are always processed locally in your browser.",
    "/privacy",
  ),
  alternates: { canonical: "https://www.appliory.tech/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">
        Last updated: 20 November 2026 · Effective for all users of{" "}
        <strong>appliory.tech</strong>
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Overview</h2>
        <p>
          Appliory (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a
          web platform operated by Ammar Hassan Malik. This Privacy Policy
          explains what data we collect when you visit{" "}
          <strong>www.appliory.tech</strong>, how we use it, and your rights.
        </p>
        <p>
          <strong>
            Your document and image files are never uploaded to our servers.
          </strong>{" "}
          All file processing (compression, resizing, PDF counting, file size
          checking) runs entirely in your browser using JavaScript. We have no
          technical access to the contents of files you open in our tools.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>

        <h3 className="text-lg font-medium mt-4 mb-1">
          2a. Analytics Data (Automatically Collected)
        </h3>
        <p>
          We use the following analytics services to understand how visitors use
          the site. These services may collect:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Pages visited and time spent on each page</li>
          <li>Browser type, operating system, and device type</li>
          <li>Country and approximate city (derived from IP address)</li>
          <li>Referrer URL (how you arrived at the site)</li>
          <li>Anonymized session identifiers</li>
        </ul>
        <p>We use:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Google Analytics 4 (GA4)</strong> — Measurement ID:{" "}
            <code>G-JF7MCP0VK5</code>. Google&rsquo;s data processing is
            governed by the{" "}
            <a
              href="https://www.google.com/policies/privacy/partners/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              Google Privacy & Terms
            </a>
            .
          </li>
          <li>
            <strong>Ahrefs Web Analytics</strong> — Privacy-conscious analytics
            to understand traffic sources and content performance.
          </li>
          <li>
            <strong>Vercel Analytics</strong> — Server-side performance
            monitoring provided by our hosting provider, Vercel Inc.
          </li>
        </ul>

        <h3 className="text-lg font-medium mt-4 mb-1">
          2b. Advertising Data
        </h3>
        <p>
          We use <strong>Google AdSense</strong> (Publisher ID:{" "}
          <code>ca-pub-4368605380975029</code>) to display advertisements.
          Google AdSense may:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Place and read cookies in your browser</li>
          <li>Use web beacons and your IP address</li>
          <li>Use your browsing activity to show relevant ads</li>
        </ul>
        <p>
          Third parties, including Google, may use cookies to serve ads based on
          your prior visits to this site and other sites. For more information
          and to opt out of interest-based advertising, visit{" "}
          <a
            href="https://www.google.com/policies/privacy/partners/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 underline"
          >
            www.google.com/policies/privacy/partners/
          </a>
          .
        </p>

        <h3 className="text-lg font-medium mt-4 mb-1">
          2c. Information You Provide Voluntarily
        </h3>
        <p>
          If you contact us by email, we receive the information you include in
          that message (name, email address, message content). We use this only
          to respond to your inquiry and do not add it to any marketing list.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Cookies</h2>
        <p>
          Appliory uses cookies through our third-party services. Cookies are
          small text files stored in your browser. We use:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Analytics cookies</strong> — Set by Google Analytics to
            track sessions and page interactions.
          </li>
          <li>
            <strong>Advertising cookies</strong> — Set by Google AdSense to
            deliver and measure ads.
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling
          cookies may affect site functionality and ad personalization. You can
          also opt out of Google interest-based advertising at{" "}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 underline"
          >
            adssettings.google.com
          </a>
          .
        </p>
        <p>
          Our Google Analytics implementation uses{" "}
          <strong>Consent Mode v2</strong>. By default, ad_storage and
          ad_personalization are set to &ldquo;denied&rdquo; until consent is
          given. analytics_storage is active to allow basic traffic
          measurement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. How We Use Your Data</h2>
        <p>We use collected data to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Understand which tools and pages are most useful to visitors</li>
          <li>Monitor site performance and identify technical issues</li>
          <li>Display advertisements that partially fund the free service</li>
          <li>Respond to support and feedback emails</li>
        </ul>
        <p>
          We do not sell personal data. We do not build individual user profiles.
          We do not share data with third parties other than the analytics and
          advertising services listed above.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
        <p>
          Google Analytics retains data for 14 months by default. Vercel retains
          server-side logs per their standard data retention policy. We retain
          support emails for up to 12 months.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          6. Your Rights (GDPR & CCPA)
        </h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Object to or restrict processing of your data</li>
          <li>Opt out of the sale or sharing of your data (we do not sell data)</li>
        </ul>
        <p>
          To exercise these rights, email{" "}
          <a
            href="mailto:fitduo07@gmail.com"
            className="text-teal-700 underline"
          >
            fitduo07@gmail.com
          </a>{" "}
          with the subject line <em>Privacy Request</em>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Children&rsquo;s Privacy</h2>
        <p>
          Appliory is not directed at children under 13. We do not knowingly
          collect personal information from children. If you believe a child has
          submitted personal information to us, please contact us at{" "}
          <a
            href="mailto:fitduo07@gmail.com"
            className="text-teal-700 underline"
          >
            fitduo07@gmail.com
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy as we add new services or as
          regulations change. The &ldquo;Last updated&rdquo; date at the top of
          this page reflects the most recent revision. Continued use of the site
          after updates constitutes acceptance of the revised policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
        <p>
          For privacy-related inquiries, please contact:
        </p>
        <address className="not-italic">
          <strong>Ammar Hassan Malik</strong>
          <br />
          Appliory — appliory.tech
          <br />
          Email:{" "}
          <a
            href="mailto:fitduo07@gmail.com"
            className="text-teal-700 underline"
          >
            fitduo07@gmail.com
          </a>
          <br />
          Phone:{" "}
          <a href="tel:+923215772078" className="text-teal-700 underline">
            +92 321 5772078
          </a>
        </address>
      </section>

      <section>
        <p className="text-sm text-slate-500">
          <Link href="/about" className="underline">About Appliory</Link> ·{" "}
          <Link href="/terms" className="underline">Terms of Use</Link> ·{" "}
          <Link href="/contact" className="underline">Contact</Link>
        </p>
      </section>
    </main>
  );
}
