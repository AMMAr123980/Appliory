import type { MetadataRoute } from "next";
import { guides } from "@/lib/content";
import { tools } from "@/lib/tool-catalog";
import { templates } from "@/lib/model";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://appliory.docileluck512.chatgpt.site";
  return [
    "",
    "/tools",
    "/tool",
    "/compare",
    ...tools.map(t=>"/tools/"+t.slug),
    "/checklists",
    "/how-it-works",
    "/guides",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...templates.map((t) => "/checklists/" + t.slug),
    ...guides.map((g) => "/guides/" + g.slug),
  ].map((path) => ({ url: origin + path }));
}
