"use client";

import { useMemo, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCurrency } from "@/components/currency-provider";
import { NumberField } from "@/components/number-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateSipVsFd } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";
import { cn } from "@/lib/utils";

export function SipVsFdCalculator() {
  const { currency } = useCurrency();
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [sipRate, setSipRate] = useState(12);
  const [fdRate, setFdRate] = useState(6.5);

  const result = useMemo(
    () => calculateSipVsFd(monthly, years, sipRate, fdRate),
    [fdRate, monthly, sipRate, years],
  );
  const hasResult = monthly > 0 && years > 0;

  return (
    <section className="pro-card relative mb-20 overflow-hidden p-6 md:p-10">
      <div className="absolute top-0 left-0 h-1 w-full bg-indigo-600" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <CurrencyToggle />

          <NumberField
            id="monthly"
            label="Monthly Investment"
            value={monthly}
            onChange={(event) => setMonthly(Number(event.currentTarget.value) || 0)}
            className="h-12"
          />

          <div className="space-y-2">
            <Label htmlFor="years" className="block font-medium">
              Investment Period (Years)
            </Label>
            <Input
              id="years"
              type="number"
              inputMode="decimal"
              value={years}
              onChange={(event) => setYears(Number(event.currentTarget.value) || 0)}
              className="h-12 font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sipRate" className="block font-medium">
              Expected SIP Return (%)
            </Label>
            <Input
              id="sipRate"
              type="number"
              inputMode="decimal"
              step={0.1}
              value={sipRate}
              onChange={(event) => setSipRate(Number(event.currentTarget.value) || 0)}
              className="h-12 font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fdRate" className="block font-medium">
              FD Interest Rate (%)
            </Label>
            <Input
              id="fdRate"
              type="number"
              inputMode="decimal"
              step={0.1}
              value={fdRate}
              onChange={(event) => setFdRate(Number(event.currentTarget.value) || 0)}
              className="h-12 font-mono"
            />
          </div>

          <p className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            Results update automatically as you edit the investment inputs.
          </p>
        </div>

        <div className="space-y-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-sky-50 p-6 shadow-inner dark:from-slate-800 dark:to-slate-900">
          <h2 className="flex items-center gap-2 text-xl font-semibold">Investment Results</h2>

          <div className="rounded-xl border border-slate-200 bg-white p-4 transition hover:scale-[1.02] hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Total Investment</p>
            <p className="text-2xl font-bold">{formatMoney(Math.round(result.invested), currency)}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 transition hover:scale-[1.03] dark:border-emerald-700 dark:bg-emerald-900/20">
              <p className="text-sm text-emerald-600 dark:text-emerald-400">SIP Maturity Value</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                {formatMoney(Math.round(result.sipValue), currency)}
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 transition hover:scale-[1.03] dark:border-sky-700 dark:bg-sky-900/20">
              <p className="text-sm text-sky-600 dark:text-sky-400">FD Maturity Value</p>
              <p className="text-2xl font-bold text-sky-700 dark:text-sky-400">
                {formatMoney(Math.round(result.fdValue), currency)}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "mt-2 text-center text-lg font-semibold text-indigo-600 transition-all duration-500 dark:text-indigo-400",
              hasResult ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            {hasResult
              ? result.sipWins
                ? "SIP gives higher projected returns over this period."
                : "FD gives higher projected returns over this period."
              : null}
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Assumption: FD return is calculated as a lump-sum investment equal to the total SIP amount.
      </p>
    </section>
  );
}
