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
    "Free document checker, PDF & image tools",
    "Check application documents, count PDF pages, resize images and find duplicate files. Free tools, no login, and no document uploads.",
    "/",
  ),
  metadataBase: new URL(siteUrl),
  title: {
    default: "Appliory — Free document checker, PDF & image tools",
    template: "%s | Appliory",
  },
  applicationName: "Appliory",
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
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
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
              },
              {
                "@type": "WebSite",
                "@id": absolute("/#website"),
                name: "Appliory",
                url: siteUrl,
                inLanguage: "en",
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
