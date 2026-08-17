import type { ReactNode } from "react";
import { HtmlContent } from "@/components/html-content";
import { JsonLd } from "@/components/json-ld";
import { getCalculatorMeta, readGuide, readHero } from "@/lib/content";
import { jsonLdNodes } from "@/lib/seo";

export function CalculatorPage({
  slug,
  calculator,
}: {
  slug: string;
  calculator: ReactNode;
}) {
  const meta = getCalculatorMeta(slug);

  return (
    <>
      <JsonLd data={jsonLdNodes(meta)} />
      <main className="mx-auto w-full max-w-7xl px-4 py-12">
        <HtmlContent html={readHero(slug)} />
        {calculator}
        <HtmlContent html={readGuide(slug)} />
      </main>
    </>
  );
}
