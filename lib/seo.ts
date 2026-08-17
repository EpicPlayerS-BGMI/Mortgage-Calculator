import type { Metadata } from "next";
import { BLOG_MEDIA, CALCULATOR_OG, DEFAULT_OG_IMAGE } from "@/lib/blog-media";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { PageMeta } from "@/lib/content";

function flattenJsonLd(data: unknown): object[] {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.flatMap((item) => flattenJsonLd(item));
  }
  return typeof data === "object" ? [data as object] : [];
}

function resolveOgImage(meta: PageMeta) {
  const current = meta.ogImage || meta.twitterImage || "";
  if (current && !current.includes("/assets/og/")) return current;

  const url = meta.canonical || "";
  const blogSlug = url.match(/\/blogs\/([^/]+)/)?.[1];
  if (blogSlug && BLOG_MEDIA[blogSlug]) return `${SITE_URL}${BLOG_MEDIA[blogSlug].image}`;

  const calcSlug = url.match(/https:\/\/calcbase\.tech\/([^/]+)\/?$/)?.[1];
  if (calcSlug && CALCULATOR_OG[calcSlug]) return `${SITE_URL}${CALCULATOR_OG[calcSlug]}`;

  return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
}

export function buildMetadata(meta: PageMeta): Metadata {
  const title = meta.title || SITE_NAME;
  const description = meta.description || "";
  const canonical = meta.canonical || SITE_URL;
  const ogTitle = meta.ogTitle || title;
  const ogDescription = meta.ogDescription || description;
  const ogImage = resolveOgImage(meta);
  const robots = meta.robots || "index, follow";

  return {
    title,
    description,
    keywords: meta.keywords || undefined,
    authors: [{ name: "Shivam" }, { name: SITE_NAME }],
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
      images: [meta.twitterImage && !meta.twitterImage.includes("/assets/og/") ? meta.twitterImage : ogImage],
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
    image: meta.ogImage && !meta.ogImage.includes("/assets/og/")
      ? meta.ogImage
      : `${SITE_URL}${BLOG_MEDIA[slug]?.image || DEFAULT_OG_IMAGE}`,
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
