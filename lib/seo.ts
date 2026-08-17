import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { PageMeta } from "@/lib/content";

function flattenJsonLd(data: unknown): object[] {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.flatMap((item) => flattenJsonLd(item));
  }
  return typeof data === "object" ? [data as object] : [];
}

export function buildMetadata(meta: PageMeta): Metadata {
  const title = meta.title || SITE_NAME;
  const description = meta.description || "";
  const canonical = meta.canonical || SITE_URL;
  const ogTitle = meta.ogTitle || title;
  const ogDescription = meta.ogDescription || description;
  const ogImage = meta.ogImage || `${SITE_URL}/assets/og/mortgage.png`;
  const robots = meta.robots || "index, follow";

  return {
    title,
    description,
    keywords: meta.keywords || undefined,
    authors: [{ name: SITE_NAME }],
    robots,
    alternates: {
      canonical,
    },
    openGraph: {
      type: meta.ogType === "article" ? "article" : "website",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitterTitle || ogTitle,
      description: meta.twitterDescription || ogDescription,
      images: [meta.twitterImage || ogImage],
    },
  };
}

export function jsonLdNodes(meta: PageMeta) {
  return flattenJsonLd(meta.jsonLd);
}

export function articleJsonLd(meta: PageMeta, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url: meta.canonical || `${SITE_URL}/blogs/${slug}/`,
    image: meta.ogImage,
    author: {
      "@type": "Person",
      name: "Shivam",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
