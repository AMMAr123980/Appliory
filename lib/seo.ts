import type { Metadata } from "next";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://appliory.docileluck512.chatgpt.site"
).replace(/\/$/, "");
export const absolute = (path = "/") => siteUrl + path;
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title + " | Appliory",
      description,
      url: absolute(path),
      siteName: "Appliory",
      type: "website",
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
