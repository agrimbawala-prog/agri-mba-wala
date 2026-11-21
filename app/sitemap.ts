import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  const locales = ["en", "mr"] as const;
  const paths = [
    "",
    "/crop-doctor",
    "/machinery",
    "/labor",
    "/mandi",
    "/weather",
    "/training",
    "/organic",
    "/partner-mou",
    "/solutions/farmers",
    "/solutions/providers",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const p of paths) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${p}`,
        lastModified,
        changeFrequency: p === "" || p === "/mandi" || p === "/weather" ? "daily" : "weekly",
        priority: p === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${siteUrl}/en${p}`,
            mr: `${siteUrl}/mr${p}`,
          },
        },
      });
    }
  }

  return entries;
}
