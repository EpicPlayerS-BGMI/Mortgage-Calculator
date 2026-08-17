"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { flushSync } from "react-dom";
import { ChevronDown, Menu, Moon, Sun, Users } from "lucide-react";
import { useCurrency } from "@/components/currency-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type CurrencyCode } from "@/lib/currency";
import { CALCULATOR_LINKS, NAV_LINKS, SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

const CALCULATOR_NAV = CALCULATOR_LINKS.slice(0, 6);

function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

function isActivePath(pathname: string, href: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

const navLinkClass =
  "rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400";

const navActiveClass =
  "bg-indigo-50 text-indigo-700 dark:bg-slate-800 dark:text-indigo-300";

const mobileLinkClass =
  "rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-indigo-300";

function CurrencySelect({
  className,
  size = "default",
}: {
  className?: string;
  size?: "sm" | "default";
}) {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select
      value={currency}
      onValueChange={(value) => setCurrency(value as CurrencyCode)}
    >
      <SelectTrigger size={size} className={className} aria-label="Select currency">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="GBP">GBP</SelectItem>
        <SelectItem value="INR">INR</SelectItem>
      </SelectContent>
    </Select>
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function applyTheme(next: "light" | "dark") {
    document.documentElement.classList.toggle("dark", next === "dark");
    setTheme(next);
  }

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const root = document as Document & {
      startViewTransition?: (update: () => void) => { ready: Promise<void> };
    };

    if (!root.startViewTransition || prefersReducedMotion()) {
      applyTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = root.startViewTransition(() => {
      flushSync(() => applyTheme(next));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 560,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-indigo-900/40"
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </Button>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const onCalculator = CALCULATOR_LINKS.some((link) => isActivePath(pathname, link.href));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="CalcBase Home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Users className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              {SITE_NAME}
            </p>
            <p className="hidden truncate text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:block dark:text-slate-400">
              Financial Calculators
            </p>
          </div>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.slice(0, 1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(navLinkClass, isActivePath(pathname, link.href) && navActiveClass)}
              aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "inline-flex items-center gap-1",
                navLinkClass,
                onCalculator && navActiveClass,
              )}
            >
              Calculators
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {CALCULATOR_NAV.map((link) => (
                <DropdownMenuItem key={link.href} render={<Link href={link.href} />}>
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(navLinkClass, isActivePath(pathname, link.href) && navActiveClass)}
              aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <CurrencySelect />
          </div>
          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              aria-label="Open mobile navigation"
              className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 max-w-[85vw] p-0">
              <SheetHeader className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>

              <nav aria-label="Mobile primary navigation" className="mt-4 flex flex-col gap-1 px-4">
                {NAV_LINKS.slice(0, 1).map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={cn(
                          mobileLinkClass,
                          isActivePath(pathname, link.href) && navActiveClass,
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}

                <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Calculators
                </p>
                {CALCULATOR_NAV.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-300",
                          isActivePath(pathname, link.href) && navActiveClass,
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}

                {NAV_LINKS.slice(1).map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={cn(
                          mobileLinkClass,
                          isActivePath(pathname, link.href) && navActiveClass,
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-5 border-t border-slate-200 px-4 pt-4 dark:border-slate-700">
                <p className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Currency
                </p>
                <CurrencySelect className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
