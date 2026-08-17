import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { getPageMeta } from "@/lib/content";
import { buildMetadata, jsonLdNodes } from "@/lib/seo";

export const metadata = buildMetadata(getPageMeta("contact"));

export default function ContactPage() {
  const meta = getPageMeta("contact");

  return (
    <>
      <JsonLd data={jsonLdNodes(meta)} />
      <main className="mx-auto max-w-5xl grow px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            Have a calculator correction, bug report, content feedback, or partnership request? Reach us directly by email and we will review it as quickly as possible.
          </p>
        </div>
        <Suspense>
          <ContactForm />
        </Suspense>
      </main>
    </>
  );
}
