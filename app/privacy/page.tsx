import { StaticPage } from "@/components/static-page";
import { getPageMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getPageMeta("privacy"));

export default function PrivacyPage() {
  return <StaticPage slug="privacy" className="mx-auto w-full max-w-4xl px-4 py-16" />;
}
