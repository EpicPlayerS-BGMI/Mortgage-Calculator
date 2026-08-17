import { StaticPage } from "@/components/static-page";
import { getPageMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getPageMeta("disclaimer"));

export default function DisclaimerPage() {
  return <StaticPage slug="disclaimer" className="mx-auto w-full max-w-4xl px-4 py-16" />;
}
