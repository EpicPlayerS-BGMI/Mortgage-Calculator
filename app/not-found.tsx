"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main className="mx-auto max-w-5xl grow px-4 py-16">
      <section className="mx-auto mb-10 max-w-3xl text-center">
        <div className="badge-pro mb-4 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Missing Page
        </div>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl dark:text-white">
          404
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">
          The page you requested does not exist or may have moved.
        </p>
      </section>
      <section className="pro-card mx-auto max-w-4xl p-8 md:p-10">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
              Return to a working CalcBase page
            </h2>
            <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
              You can head back to the homepage, open one of the main calculators, or browse our finance guides.
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
              Requested path:{" "}
              <span className="font-mono text-slate-700 dark:text-slate-200">{pathname}</span>
            </div>
          </div>
          <div className="space-y-4">
            <Link href="/" className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 transition hover:border-indigo-500 dark:border-slate-700">
              <span>
                <span className="block font-bold text-slate-900 dark:text-white">Mortgage Calculator</span>
                <span className="block text-sm text-slate-500">Homepage and core mortgage tool</span>
              </span>
              <span className="font-bold text-indigo-600">Open</span>
            </Link>
            <Link href="/personal-loan-calculator/" className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 transition hover:border-indigo-500 dark:border-slate-700">
              <span>
                <span className="block font-bold text-slate-900 dark:text-white">Personal Loan Calculator</span>
                <span className="block text-sm text-slate-500">Monthly EMI and interest estimate</span>
              </span>
              <span className="font-bold text-indigo-600">Open</span>
            </Link>
            <Link href="/sip-calculator/" className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 transition hover:border-indigo-500 dark:border-slate-700">
              <span>
                <span className="block font-bold text-slate-900 dark:text-white">SIP Calculator</span>
                <span className="block text-sm text-slate-500">Investment growth projection</span>
              </span>
              <span className="font-bold text-indigo-600">Open</span>
            </Link>
            <Link href="/blogs/" className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 transition hover:border-indigo-500 dark:border-slate-700">
              <span>
                <span className="block font-bold text-slate-900 dark:text-white">Finance Guides</span>
                <span className="block text-sm text-slate-500">Articles and explainers</span>
              </span>
              <span className="font-bold text-indigo-600">Open</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
