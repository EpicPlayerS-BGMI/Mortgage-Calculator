import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PageMeta = {
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: unknown;
  slug?: string;
};

export function readHtml(relativePath: string) {
  return fs.readFileSync(path.join(CONTENT_DIR, relativePath), "utf8");
}

export function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, relativePath), "utf8")) as T;
}

export function sanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\s+on\w+="[^"]*"/g, "")
    .replace(/\s+on\w+='[^']*'/g, "");
}

export function readHero(slug: string) {
  const html = readHtml(`calculators/${slug}.hero.html`);
  const heading = html.search(/<(section|header)\b[\s\S]*?<h1\b/i);
  return sanitizeHtml(heading >= 0 ? html.slice(heading) : html);
}

export function readGuide(slug: string) {
  let html = readHtml(`calculators/${slug}.guide.html`);

  if (!html.trim()) {
    const full = readHtml(`calculators/${slug}.html`);
    const marker = full.search(/\sid="guide"|id="content-guide"|id="faq"/i);
    if (marker >= 0) {
      html = full.slice(full.lastIndexOf("<", marker));
    }
  }

  return sanitizeHtml(html);
}

export function getPageMeta(slug: string) {
  return readJson<PageMeta>(`pages/${slug}.json`);
}

export function getCalculatorMeta(slug: string) {
  return readJson<PageMeta>(`calculators/${slug}.json`);
}

export function getBlogMeta(slug: string) {
  return readJson<PageMeta>(`blogs/${slug}.json`);
}

export function getBlogSlugs() {
  return readJson<Array<{ slug: string }>>("blogs/index.json").map((item) => item.slug);
}
