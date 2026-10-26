import type { Metadata } from "next";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.appliory.tech"
).replace(/\/$/, "");
export const absolute = (path = "/") => siteUrl + (path.startsWith("/") ? path : `/${path}`);
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  keywords?: string[],
): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: absolute(path) },
    openGraph: {
      title: title + " | Appliory",
      description,
      url: absolute(path),
      siteName: "Appliory",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: absolute("/social-preview.png"),
          width: 1200,
          height: 630,
          alt: "Appliory — private document and image tools",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title + " | Appliory",
      description,
      images: [absolute("/social-preview.png")],
    },
  };
}
export function breadcrumb(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absolute(path),
    })),
  };
}
