"use client";

import { useMemo, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCurrency } from "@/components/currency-provider";
import { NumberField } from "@/components/number-field";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateInvestment } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";
import { firstSliderValue } from "@/lib/utils";

export function InvestmentCalculator() {
  const { currency } = useCurrency();
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const result = useMemo(
    () => calculateInvestment(Math.abs(initial), Math.abs(monthly), rate, years),
    [initial, monthly, rate, years],
  );

  const percentPrincipal =
    result.totalValue > 0 ? Math.min((result.invested / result.totalValue) * 100, 100) : 0;
  const percentInterest = result.totalValue > 0 ? Math.max(100 - percentPrincipal, 0) : 0;

  return (
    <div className="mb-20 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <section className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 md:p-8 lg:col-span-7 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="mb-8">
          <label className="mb-2 block text-xs font-bold tracking-wider text-slate-400 uppercase">
            Currency
          </label>
          <CurrencyToggle compact className="inline-flex w-auto" />
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <NumberField
              id="initial"
              label="Initial Deposit (Lump Sum)"
              value={initial}
              onChange={(event) => setInitial(Number(event.currentTarget.value) || 0)}
              className="h-12"
            />
            <NumberField
              id="monthly"
              label="Monthly Contribution"
              value={monthly}
              onChange={(event) => setMonthly(Number(event.currentTarget.value) || 0)}
              className="h-12"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Exp. Return Rate (p.a)
                </Label>
                <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  {rate}%
                </span>
              </div>
              <Slider
                aria-label="Expected return rate"
                min={1}
                max={30}
                step={0.1}
                value={[rate]}
                onValueChange={(value) => setRate(firstSliderValue(value))}
              />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>Conservative (1%)</span>
                <span>Aggressive (30%)</span>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Time Period</Label>
                <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  {years} Years
                </span>
              </div>
              <Slider
                aria-label="Time period in years"
                min={1}
                max={50}
                step={1}
                value={[years]}
                onValueChange={(value) => setYears(firstSliderValue(value))}
              />
            </div>
          </div>
        </div>
      </section>

      <aside className="lg:sticky lg:top-24 lg:col-span-5">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-1 text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-emerald-600 opacity-30 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-indigo-600 opacity-30 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between rounded-[20px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
            <div>
              <p className="mb-1 text-sm font-medium tracking-wider text-emerald-200 uppercase">
                Total Future Value
              </p>
              <h2 className="mb-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
                {formatMoney(result.totalValue, currency)}
              </h2>

              <div className="mb-6 rounded-xl border border-white/5 bg-black/20 p-5">
                <div className="mb-2 flex justify-between text-xs text-slate-300">
                  <span>Invested</span>
                  <span>Growth</span>
                </div>
                <div className="flex h-4 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-indigo-400 transition-all duration-500"
                    style={{ width: `${percentPrincipal}%` }}
                  />
                  <div
                    className="h-full bg-emerald-400 transition-all duration-500"
                    style={{ width: `${percentInterest}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-indigo-400" />
                    Your Money
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    Wealth Gained
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-slate-300">Total Invested</span>
                <span className="text-lg font-bold text-indigo-100">
                  {formatMoney(result.invested, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-sm text-slate-300">Est. Returns</span>
                <span className="text-lg font-bold text-emerald-300">
                  {formatMoney(result.interest, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
