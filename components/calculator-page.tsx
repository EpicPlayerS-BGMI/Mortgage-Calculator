import type { ReactNode } from "react";
import { CalculatorMethod } from "@/components/calculator-method";
import { AuthorBio } from "@/components/author-bio";
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
        <CalculatorMethod slug={slug} />
        <HtmlContent html={readGuide(slug)} />
        <div className="mx-auto mt-8 max-w-4xl">
          <AuthorBio />
        </div>
      </main>
    </>
  );
}
