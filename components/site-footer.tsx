"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { openConsentPreferences } from "@/components/consent-banner";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

const QUICK_LINKS = [
  { href: "/personal-loan-calculator/", label: "Personal Loan Calculator" },
  { href: "/car-loan-calculator/", label: "Car Loan Calculator" },
  { href: "/sip-calculator/", label: "SIP Calculator" },
  { href: "/mortgage-calculator/", label: "Mortgage Calculator" },
  { href: "/blogs/", label: "Blogs" },
  { href: "/sip-vs-fd-calculator/", label: "SIP vs FD Calculator" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy/", label: "Privacy Policy" },
  { href: "/terms/", label: "Terms & Conditions" },
  { href: "/about/", label: "About Us" },
  { href: "/contact/", label: "Contact Us" },
  { href: "/disclaimer/", label: "Disclaimer" },
  { href: "/methodology/", label: "Methodology" },
  { href: "/editorial-policy/", label: "Editorial Policy" },
] as const;

const linkClass =
  "hover:text-indigo-600 dark:hover:text-indigo-400 transition";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm text-center md:text-left">
            <Link href="/" className="group">
              <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 opacity-10 blur-lg transition-opacity group-hover:opacity-30" />
                  <div className="relative rounded-lg bg-linear-to-br from-indigo-600 to-blue-700 p-1.5 text-white shadow-md">
                    <Users className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  {SITE_NAME}
                </span>
              </div>
            </Link>

            <p className="text-md leading-relaxed text-gray-600 dark:text-gray-400">
              Browser-based financial calculators for India, USA, and UK users.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
              Independent tool · Inputs stay in your browser · Results are estimates only
            </p>
            <p className="mt-2 text-[13px] text-gray-500">
              Support:{" "}
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {SITE_EMAIL}
              </a>
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-slate-900 dark:text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" onClick={openConsentPreferences} className={linkClass}>
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            CalcBase provides browser-based estimation tools only. Calculations are based on our
            own standard formulas, and actual lender terms, fees, and eligibility conditions may
            vary by country and institution.
          </p>
          <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">
            Results are not guaranteed to be 100% accurate and should not be treated as financial
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
