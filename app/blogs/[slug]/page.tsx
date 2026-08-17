import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HtmlContent } from "@/components/html-content";
import { JsonLd } from "@/components/json-ld";
import { getBlogMeta, getBlogSlugs, readHtml, sanitizeHtml } from "@/lib/content";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    return buildMetadata(getBlogMeta(slug));
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const slugs = getBlogSlugs();
  if (!slugs.includes(slug)) notFound();

  const meta = getBlogMeta(slug);

  return (
    <>
      <JsonLd data={articleJsonLd(meta, slug)} />
      <main className="mx-auto w-full max-w-4xl px-4 py-12">
        <HtmlContent html={sanitizeHtml(readHtml(`blogs/${slug}.html`))} />
      </main>
    </>
  );
}
