import type { MetadataRoute } from "next";

const BASE = "https://dothenumberswork.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/sample-report`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/methodology`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/disclosures`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
  return routes;
}
