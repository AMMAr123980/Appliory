import type { Metadata, Viewport } from "next";
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
    "Appliory offers free, private document and image tools: Image Compressor, Image Resizer, PDF Page Counter, File Size Checker, and Duplicate File Finder. 100% free, no login, processed locally on your device.",
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
    default: "Appliory — Free Document Checker, PDF & Image Tools Online",
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
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
                sameAs: ["https://www.appliory.tech", "https://appliory.tech"],
                founder: {
                  "@type": "Person",
                  name: "Ammar Hassan Malik",
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
                url: siteUrl,
                inLanguage: "en",
                description:
                  "Free document checker, PDF page counter, image compressor and file tools with zero file uploads.",
                publisher: { "@id": absolute("/#organization") },
              },
            ],
          }}
        />
        <Header />
        <div id="content">{children}</div>
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
