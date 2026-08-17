"use client";

import { Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_EMAIL, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const fieldClass =
  "block text-sm font-semibold text-slate-700 dark:text-slate-300";

export function ContactForm() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent") === "1";

  return (
    <div className="grid items-start gap-12 lg:grid-cols-5">
      <div className="space-y-8 lg:col-span-2">
        <div className="pro-card border-l-4 border-l-indigo-600 p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
            Direct Email Support
          </h2>
          <div className="mb-3 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
              <Mail className="h-5 w-5" />
            </div>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="font-bold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {SITE_EMAIL}
            </a>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Operated by CalcBase founder Shivam. Use email for support, corrections,
            partnerships, privacy requests, or feature suggestions.
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Website:{" "}
            <a
              href={`${SITE_URL}/`}
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {SITE_URL}
            </a>
          </p>
        </div>

        <div className="pro-card p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
            Typical Response Times
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>General support: within 2 business days</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span>Calculation bug reports: prioritized for review</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Partnership or content requests: reviewed manually</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-3">
        <section className="pro-card bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:shadow-none">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Contact Form
          </h2>
          <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
            Use this form to send support requests, correction notes, or business inquiries.
            The form opens your default email app with your details prefilled.
          </p>

          <form
            action={`https://formsubmit.co/${SITE_EMAIL}`}
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="_subject" value="CalcBase contact form message" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={`${SITE_URL}/contact/?sent=1`} />
            <input
              type="text"
              name="_honey"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="space-y-2">
              <Label htmlFor="name" className={fieldClass}>
                Full Name
              </Label>
              <Input id="name" name="name" type="text" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className={fieldClass}>
                Email Address
              </Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className={fieldClass}>
                Subject
              </Label>
              <Input id="subject" name="subject" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className={fieldClass}>
                Message
              </Label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className={cn(
                  "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30",
                )}
              />
            </div>

            <Button
              type="submit"
              className="h-auto rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700"
            >
              <Mail />
              Send Message
            </Button>
          </form>

          {sent ? (
            <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              Thanks — your message was submitted. We will reply as soon as possible.
            </p>
          ) : null}

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Prefer email? Write directly to{" "}
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {SITE_EMAIL}
            </a>
            . First FormSubmit delivery may ask you to confirm the inbox once.
          </p>
        </section>

        <section className="pro-card p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Best Reasons To Reach Out
          </h2>
          <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2 dark:text-slate-400">
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="mb-2 font-bold text-slate-900 dark:text-white">
                Calculator issue
              </h3>
              <p>Share the calculator name, your inputs, and the result you expected.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="mb-2 font-bold text-slate-900 dark:text-white">
                Content correction
              </h3>
              <p>Send the page URL and the sentence or figure you think should be updated.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="mb-2 font-bold text-slate-900 dark:text-white">
                New calculator request
              </h3>
              <p>Tell us which country and use case you want us to prioritize.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="mb-2 font-bold text-slate-900 dark:text-white">
                Business inquiry
              </h3>
              <p>Use the same support email for partnerships, media, or licensing questions.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
