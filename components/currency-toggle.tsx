"use client";

import { useCurrency } from "@/components/currency-provider";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { cn } from "@/lib/utils";

const OPTIONS = Object.keys(CURRENCIES) as CurrencyCode[];

type CurrencyToggleProps = {
  compact?: boolean;
  className?: string;
};

export function CurrencyToggle({ compact = false, className }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      className={cn(
        "flex rounded-xl border border-slate-200 bg-slate-100 p-1.5 dark:border-slate-700 dark:bg-slate-800",
        compact && "rounded-lg p-1",
        className,
      )}
    >
      {OPTIONS.map((code) => {
        const active = currency === code;
        const label = compact ? code : `${code} (${CURRENCIES[code].symbol})`;

        return (
          <button
            key={code}
            type="button"
            onClick={() => setCurrency(code)}
            className={cn(
              "flex-1 rounded-lg text-center transition-all",
              compact
                ? "px-3 py-1 text-xs font-bold"
                : "py-2.5 text-sm",
              active
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white"
                : "font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
