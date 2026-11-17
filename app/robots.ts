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
      // OAI-SearchBot: ChatGPT Search discovery crawler (separate from GPTBot training crawler)
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
      // PerplexityBot: Perplexity search crawler
      {
        userAgent: "Perplexity-User",
        allow: "/",
        disallow: ["/dashboard", "/api/"],
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
