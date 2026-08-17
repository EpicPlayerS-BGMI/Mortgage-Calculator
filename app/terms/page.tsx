import { StaticPage } from "@/components/static-page";
import { getPageMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getPageMeta("terms"));

export default function TermsPage() {
  return <StaticPage slug="terms" className="mx-auto w-full max-w-4xl px-4 py-16" />;
}
