import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { blogPosts } from "@/lib/blog";
import { communities } from "@/lib/data";

// Update this to the real domain once it's live.
const BASE = "https://mikkolucernas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/buy",
    "/guides",
    "/blog",
    "/california-vs-las-vegas",
    "/cost-of-living",
    "/new-construction",
    "/home-valuation",
    "/resources/mortgage-calculator",
    "/resources/va-loan-calculator",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const communityRoutes = communities.map((c) => ({
    url: `${BASE}/communities/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guideRoutes = guides.map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...communityRoutes, ...guideRoutes, ...blogRoutes];
}
