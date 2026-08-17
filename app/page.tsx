import { StaticPage } from "@/components/static-page";
import { getPageMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getPageMeta("home"));

export default function HomePage() {
  return <StaticPage slug="home" className="mx-auto w-full max-w-7xl px-4 py-12" />;
}
