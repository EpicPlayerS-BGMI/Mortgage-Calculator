import { StaticPage } from "@/components/static-page";
import { getPageMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getPageMeta("methodology"));

export default function MethodologyPage() {
  return <StaticPage slug="methodology" className="mx-auto w-full max-w-4xl px-4 py-16" />;
}
