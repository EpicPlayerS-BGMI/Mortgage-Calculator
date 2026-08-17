import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = [
    "mortgage-calculator",
    "emi-calculator",
    "car-loan-calculator",
    "personal-loan-calculator",
    "loan-eligibility-calculator",
    "investment-calculator",
    "sip-calculator",
    "fd-calculator",
    "sip-vs-fd-calculator",
    "inflation-calculator",
  ];

  const pages = ["about", "contact", "methodology", "editorial-policy", "privacy", "terms", "disclaimer"];

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-08-08",
      changeFrequency: "daily",
      priority: 1,
    },
    ...calculators.map((slug) => ({
      url: `${SITE_URL}/${slug}/`,
      lastModified: "2026-08-08",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/blogs/`,
      lastModified: "2026-08-08",
      changeFrequency: "weekly",
      priority: 0.82,
    },
    ...getBlogSlugs().map((slug) => ({
      url: `${SITE_URL}/blogs/${slug}/`,
      lastModified: "2026-08-08",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...pages.map((slug) => ({
      url: `${SITE_URL}/${slug}/`,
      lastModified: "2026-08-08",
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
