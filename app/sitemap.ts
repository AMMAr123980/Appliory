import type { MetadataRoute } from "next";
import { guides } from "@/lib/content";
import { tools } from "@/lib/tool-catalog";
import { templates } from "@/lib/model";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.appliory.tech"
  ).replace(/\/$/, "");

  const staticRoutes: { path: string; priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/tools", priority: 0.9, changeFrequency: "weekly" },
    { path: "/tool", priority: 0.9, changeFrequency: "weekly" },
    { path: "/compare", priority: 0.8, changeFrequency: "monthly" },
    { path: "/checklists", priority: 0.8, changeFrequency: "weekly" },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
    { path: "/guides", priority: 0.8, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.5, changeFrequency: "yearly" },
  ];

  const toolRoutes = tools.map((t) => ({
    path: "/tools/" + t.slug,
    priority: 0.9,
    changeFrequency: "weekly" as const,
  }));

  const templateRoutes = templates.map((t) => ({
    path: "/checklists/" + t.slug,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const guideRoutes = guides.map((g) => ({
    path: "/guides/" + g.slug,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const now = new Date();

  return [...staticRoutes, ...toolRoutes, ...templateRoutes, ...guideRoutes].map(
    (item) => ({
      url: origin + item.path,
      lastModified: now,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    }),
  );
}
