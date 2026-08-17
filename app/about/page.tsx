import { StaticPage } from "@/components/static-page";
import { getPageMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getPageMeta("about"));

export default function AboutPage() {
  return <StaticPage slug="about" className="mx-auto w-full max-w-5xl px-4 py-16" />;
}
