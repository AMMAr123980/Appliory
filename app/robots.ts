import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.appliory.tech"
  ).replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api/", "/login", "/signup", "/auth/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Google-Extended",
          "ClaudeBot",
          "cohere-ai",
          "Omgilibot",
        ],
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
    ],
    sitemap: origin + "/sitemap.xml",
  };
}
