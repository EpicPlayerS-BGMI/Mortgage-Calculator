import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { BLOG_MEDIA } from "@/lib/blog-media";
import { getBlogSlugs, getPageMeta, readJson } from "@/lib/content";
import { buildMetadata, jsonLdNodes } from "@/lib/seo";

export const metadata = buildMetadata(getPageMeta("blogs-index"));

type BlogIndexItem = {
  slug: string;
  title: string;
  description: string;
};

function displayTitle(title: string) {
  return title.replace(/\s*\|\s*CalcBase\s*$/i, "").replace(/\s*\(2026\)\s*/g, " ").trim();
}

export default function BlogsIndexPage() {
  const posts = readJson<BlogIndexItem[]>("blogs/index.json");
  const slugs = new Set(getBlogSlugs());
  const meta = getPageMeta("blogs-index");

  return (
    <>
      <JsonLd data={jsonLdNodes(meta)} />
      <main className="mx-auto w-full max-w-7xl px-4 py-12">
        <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="badge-pro mb-3">Finance guides</p>
            <h1 className="mb-4 text-4xl font-extrabold text-slate-900 md:text-5xl dark:text-white">
              Original CalcBase articles
            </h1>
            <p className="max-w-2xl text-xl text-slate-500 dark:text-slate-400">
              Worked examples, formulas, and planning notes for loans, EMIs, credit, SIP vs FD, and
              long-term saving — written for India, USA, and UK readers.
            </p>
          </div>
        </header>

        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          These guides explain how we calculate estimates on CalcBase. They are educational, not
          personal advice. See our{" "}
          <Link href="/methodology/" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
            methodology
          </Link>{" "}
          and{" "}
          <Link href="/editorial-policy/" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
            editorial policy
          </Link>
          .
        </div>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts
            .filter((post) => slugs.has(post.slug))
            .map((post) => {
              const media = BLOG_MEDIA[post.slug];
              return (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}/`}
                  className="pro-card pro-card-hover group block overflow-hidden text-inherit no-underline"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={media?.image || "/assets/blog-images/Mortgage-calculation-illustration.avif"}
                      alt={media?.alt || displayTitle(post.title)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {media?.category || "Guide"}
                      {media?.readMins ? ` · ${media.readMins} min read` : ""}
                    </p>
                    <h2 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white">
                      {displayTitle(post.title)}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-slate-600 dark:text-slate-400">{post.description}</p>
                    <span className="inline-flex items-center font-bold text-indigo-600">Read the guide</span>
                  </div>
                </Link>
              );
            })}
        </section>
      </main>
    </>
  );
}
