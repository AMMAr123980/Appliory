import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header, Footer } from "@/components/appliory/shell";
import { Toaster } from "sonner";
import { absolute, pageMetadata, siteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/appliory/structured-data";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#153a3d",
};
export const metadata: Metadata = {
  ...pageMetadata(
    "Free Document Checker, PDF & Image Tools Online",
    "Appliory provides free, private document & image tools: compress images to 20KB/50KB, resize photos, verify file sizes, and convert PDFs with zero server uploads.",
    "/",
    [
      "image compressor",
      "compress image",
      "compress image to kb",
      "image resizer",
      "pdf page counter",
      "file size checker",
      "duplicate file finder",
      "appliory",
      "appliory.tech",
      "free online tools",
      "document checker",
    ],
  ),
  metadataBase: new URL(siteUrl),
  title: {
    default: "Appliory — Free Document, PDF & Image Tools Online",
    template: "%s | Appliory",
  },
  applicationName: "Appliory",
  keywords: [
    "image compressor",
    "compress image",
    "compress image to kb",
    "image resizer",
    "pdf page counter",
    "file size checker",
    "duplicate file finder",
    "appliory",
    "appliory.tech",
    "free online tools",
    "document checker",
  ],
  authors: [{ name: "Appliory", url: siteUrl }],
  creator: "Appliory",
  publisher: "Appliory",
  robots: {
    index: true,
    follow: true,
    maxImagePreview: "large",
    maxSnippet: -1,
    maxVideoPreview: -1,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ||
      "zkHd17eUmhcVhaV0hvoHS7RW7EgqIaFqAVdL_5auXHE",
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JF7MCP0VK5"
        />
        <Script
          id="google-tag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
              });
              gtag('js', new Date());
              gtag('config', 'G-JF7MCP0VK5');
            `,
          }}
        />
        {/* Ahrefs Web Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="+esYWE0KYUZz/T2uUK8aDg"
        />
        {/* Google AdSense */}
        <Script
          id="google-adsense"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4368605380975029"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": absolute("/#organization"),
                name: "Appliory",
                url: siteUrl,
                logo: absolute("/brand-mark.png"),
                description:
                  "Appliory is a privacy-first web platform developed by Ammar Hassan Malik offering free online tools for image compression, image resizing, PDF page counting, file size verification, and duplicate file finding with zero document uploads.",
                sameAs: [
                  "https://www.appliory.tech",
                  "https://appliory.tech",
                  "https://vireleo.me",
                ],
                founder: {
                  "@type": "Person",
                  name: "Ammar Hassan Malik",
                  jobTitle: "Founder & Lead Engineer",
                  nationality: "Pakistani",
                  sameAs: ["https://vireleo.me"],
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "fitduo07@gmail.com",
                  telephone: "+92 321 5772078",
                  contactType: "customer support",
                  availableLanguage: ["English", "Urdu"],
                },
                knowsAbout: [
                  "Image Compression (JPG, PNG, WebP)",
                  "PDF Page Counting and Extractive Summary",
                  "Application File Size Verification",
                  "Exact Duplicate File Detection via SHA-256",
                  "Document Application Readiness",
                ],
              },
              {
                "@type": "WebSite",
                "@id": absolute("/#website"),
                name: "Appliory",
                alternateName: ["Appliory.tech", "Appliory Tools"],
                url: siteUrl + "/",
                inLanguage: "en",
                description:
                  "Free document tools, 20KB/50KB image compressors, PDF to Excel converter, and passport photo resizer with zero file uploads.",
                publisher: { "@id": absolute("/#organization") },
              },
            ],
          }}
        />
        <Header />
        <div id="content">{children}</div>
        <Footer />
        <Toaster richColors position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
