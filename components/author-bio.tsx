import Link from "next/link";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

export function AuthorBio() {
  return (
    <aside className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        About the publisher
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Shivam, founder of {SITE_NAME}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        CalcBase is an independent calculator site run from India. I write the guides, check the
        formulas against standard amortisation and compound-interest maths, and keep the tools
        free to use in the browser—no loan forms, no bank logins. Results are estimates, not
        advice. For corrections, email{" "}
        <a href={`mailto:${SITE_EMAIL}`} className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
          {SITE_EMAIL}
        </a>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
        <Link href="/methodology/" className="text-indigo-600 hover:underline dark:text-indigo-400">
          Methodology
        </Link>
        <Link href="/editorial-policy/" className="text-indigo-600 hover:underline dark:text-indigo-400">
          Editorial policy
        </Link>
        <Link href="/disclaimer/" className="text-indigo-600 hover:underline dark:text-indigo-400">
          Disclaimer
        </Link>
        <Link href="/contact/" className="text-indigo-600 hover:underline dark:text-indigo-400">
          Contact
        </Link>
      </div>
    </aside>
  );
}
