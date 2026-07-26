/**
 * Expand all CalcBase thin blog posts with unique long-form educational content.
 * Usage: node scripts/expand-blogs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { batch1 } from "./blog-content/batch1.mjs";
import { batch2 } from "./blog-content/batch2.mjs";
import { batch3 } from "./blog-content/batch3.mjs";
import { batch4 } from "./blog-content/batch4.mjs";
import { PADS } from "./blog-content/pads.mjs";
import { PADS2 } from "./blog-content/pads2.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOGS_DIR = path.join(ROOT, "blogs");
const BYLINE_DATE = "July 26, 2026";

const ARTICLES = { ...batch1, ...batch2, ...batch3, ...batch4 };

function insertBeforeFaqs(sectionsHtml, pad) {
  if (!pad) return sectionsHtml;
  if (sectionsHtml.includes("Frequently Asked Questions")) {
    return sectionsHtml.replace(
      /(\n\s*<section class="mb-14">\s*<h2 class="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Frequently Asked Questions)/,
      `\n${pad}$1`
    );
  }
  return sectionsHtml + pad;
}

/** Insert unique pad sections before FAQs so every article clears 950+ words. */
for (const [slug, article] of Object.entries(ARTICLES)) {
  article.sectionsHtml = insertBeforeFaqs(article.sectionsHtml, PADS[slug]);
  article.sectionsHtml = insertBeforeFaqs(article.sectionsHtml, PADS2[slug]);
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function updateMetaDescriptions(html, description) {
  const esc = description.replace(/"/g, "&quot;");
  let out = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${esc}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${esc}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${esc}" />`
  );
  return out;
}

function updateByline(html, readMins) {
  return html.replace(
    /(<div class="mb-6 text-sm text-slate-500 dark:text-slate-400">\s*<span>By CalcBase Finance Team<\/span>\s*&middot;\s*<span>)([^<]*)(<\/span>\s*&middot;\s*<span>)([^<]*)(<\/span>)/,
    `$1${BYLINE_DATE}$3${readMins} min read$5`
  );
}

/**
 * Replace everything after the hero block and before the CTA section.
 * Keeps: head, header, breadcrumbs, byline, H1, hero, CTA, footer, common.js
 */
function spliceBody(html, sectionsHtml) {
  const heroEndRe =
    /(<div class="pro-card overflow-hidden rounded-2xl mb-10[\s\S]*?<\/div>\s*<\/div>)/;
  const heroMatch = html.match(heroEndRe);
  if (!heroMatch) {
    throw new Error("Could not locate hero block");
  }

  const ctaRe =
    /<section class="mt-20 p-12 rounded-\[2rem\] bg-indigo-50[\s\S]*?Plan Your Path to Wealth[\s\S]*?<\/section>/;
  const ctaMatch = html.match(ctaRe);
  if (!ctaMatch) {
    throw new Error("Could not locate CTA section");
  }

  const heroEndIndex = heroMatch.index + heroMatch[0].length;
  const ctaStartIndex = ctaMatch.index;

  const before = html.slice(0, heroEndIndex);
  const after = html.slice(ctaStartIndex);
  return `${before}\n\n${sectionsHtml.trim()}\n\n      ${after}`;
}

function extractArticleBodyWords(html) {
  const heroEndRe =
    /(<div class="pro-card overflow-hidden rounded-2xl mb-10[\s\S]*?<\/div>\s*<\/div>)/;
  const ctaRe =
    /<section class="mt-20 p-12 rounded-\[2rem\] bg-indigo-50[\s\S]*?Plan Your Path to Wealth[\s\S]*?<\/section>/;
  const heroMatch = html.match(heroEndRe);
  const ctaMatch = html.match(ctaRe);
  if (!heroMatch || !ctaMatch) return 0;
  const body = html.slice(heroMatch.index + heroMatch[0].length, ctaMatch.index);
  return countWords(stripHtml(body));
}

function processSlug(slug) {
  const article = ARTICLES[slug];
  if (!article) {
    throw new Error(`Missing article content for slug: ${slug}`);
  }

  const filePath = path.join(BLOGS_DIR, slug, "index.html");
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }

  let html = fs.readFileSync(filePath, "utf8");
  html = updateMetaDescriptions(html, article.description);
  html = updateByline(html, article.readMins);
  html = spliceBody(html, article.sectionsHtml);

  if (html.includes("calcbase seo add")) {
    throw new Error(`${slug}: filler section still present after splice`);
  }

  fs.writeFileSync(filePath, html, "utf8");
  const words = extractArticleBodyWords(html);
  return { slug, words, readMins: article.readMins, ok: words >= 900, strong: words >= 950 };
}

function main() {
  const slugs = fs
    .readdirSync(BLOGS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  if (slugs.length !== 28) {
    console.warn(`Expected 28 blog folders, found ${slugs.length}`);
  }

  const missingContent = slugs.filter((s) => !ARTICLES[s]);
  if (missingContent.length) {
    console.error("Missing content for:", missingContent.join(", "));
    process.exit(1);
  }

  const extra = Object.keys(ARTICLES).filter((s) => !slugs.includes(s));
  if (extra.length) {
    console.warn("Content defined for unknown slugs:", extra.join(", "));
  }

  const results = [];
  for (const slug of slugs) {
    const result = processSlug(slug);
    results.push(result);
    const flag = result.strong ? "OK" : result.ok ? "OK*" : "LOW";
    console.log(`${flag}\t${result.words}\t${slug}`);
  }

  console.log("\n=== Word-count table ===");
  console.log("slug\twords\treadMins\tstatus");
  for (const r of results) {
    const status = r.strong ? "pass(950+)" : r.ok ? "pass(900+)" : "FAIL";
    console.log(`${r.slug}\t${r.words}\t${r.readMins}\t${status}`);
  }

  const failed = results.filter((r) => !r.ok);
  const under950 = results.filter((r) => !r.strong);
  const min = Math.min(...results.map((r) => r.words));
  const max = Math.max(...results.map((r) => r.words));
  const avg = Math.round(results.reduce((a, r) => a + r.words, 0) / results.length);

  console.log(`\nProcessed: ${results.length}`);
  console.log(`Min/Avg/Max words: ${min} / ${avg} / ${max}`);
  if (under950.length) {
    console.warn(`Under 950 (still >=900 unless FAIL): ${under950.map((f) => `${f.slug}(${f.words})`).join(", ")}`);
  }
  if (failed.length) {
    console.error(`FAILED (<900 words): ${failed.map((f) => f.slug).join(", ")}`);
    process.exit(1);
  }
  console.log("All blogs meet the 900+ word threshold.");
}

main();
