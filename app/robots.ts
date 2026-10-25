import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://appliory.docileluck512.chatgpt.site";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/", "/login", "/signup", "/auth/"],
    },
    sitemap: origin + "/sitemap.xml",
  };
}
