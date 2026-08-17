import { HtmlContent } from "@/components/html-content";
import { JsonLd } from "@/components/json-ld";
import { getPageMeta, readHtml, sanitizeHtml } from "@/lib/content";
import { jsonLdNodes } from "@/lib/seo";

export function StaticPage({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const meta = getPageMeta(slug);
  const html = sanitizeHtml(readHtml(`pages/${slug}.html`));

  return (
    <>
      <JsonLd data={jsonLdNodes(meta)} />
      <main className={className}>
        <HtmlContent html={html} />
      </main>
    </>
  );
}
