import type { Metadata } from "next";
import { BLOG_MEDIA, CALCULATOR_OG, DEFAULT_OG_IMAGE } from "@/lib/blog-media";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";
import type { PageMeta } from "@/lib/content";

const PUBLISHER_LOGO = `${SITE_URL}${DEFAULT_OG_IMAGE}`;

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

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: PUBLISHER_LOGO,
    email: SITE_EMAIL,
    founder: { "@type": "Person", name: "Shivam" },
    areaServed: ["India", "United States", "United Kingdom"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE_EMAIL,
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: PUBLISHER_LOGO },
  };
}

export function buildMetadata(meta: PageMeta): Metadata {
  const title = meta.title || SITE_NAME;
  const description = meta.description || "";
  const canonical = meta.canonical || SITE_URL;
  const ogTitle = meta.ogTitle || title;
  const ogDescription = meta.ogDescription || description;
  const ogImage = resolveOgImage(meta);
  const isArticle = meta.ogType === "article";

  return {
    title,
    description,
    keywords: meta.keywords || undefined,
    authors: [{ name: "Shivam" }, { name: SITE_NAME }],
    robots: meta.robots || "index, follow, max-image-preview:large, max-snippet:-1",
    alternates: {
      canonical,
    },
    openGraph: {
      type: isArticle ? "article" : "website",
      locale: "en_IN",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: ogImage, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitterTitle || ogTitle,
      description: meta.twitterDescription || ogDescription,
      images: [
        meta.twitterImage && !meta.twitterImage.includes("/assets/og/")
          ? meta.twitterImage
          : ogImage,
      ],
    },
  };
}

export function jsonLdNodes(meta: PageMeta) {
  return flattenJsonLd(meta.jsonLd);
}

export function articleJsonLd(meta: PageMeta, slug: string) {
  const image =
    meta.ogImage && !meta.ogImage.includes("/assets/og/")
      ? meta.ogImage
      : `${SITE_URL}${BLOG_MEDIA[slug]?.image || DEFAULT_OG_IMAGE}`;
  const url = meta.canonical || `${SITE_URL}/blogs/${slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [image],
    datePublished: "2026-03-01",
    dateModified: "2026-08-17",
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Shivam",
      url: `${SITE_URL}/about/`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: PUBLISHER_LOGO },
    },
  };
}
