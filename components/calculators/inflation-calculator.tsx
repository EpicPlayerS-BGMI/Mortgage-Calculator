"use client";

import { useMemo, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCurrency } from "@/components/currency-provider";
import { NumberField } from "@/components/number-field";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateInflation } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";
import { cn, firstSliderValue } from "@/lib/utils";

export function InflationCalculator() {
  const { currency, locale, symbol } = useCurrency();
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(10);

  const result = useMemo(() => calculateInflation(amount, rate, years), [amount, rate, years]);
  const barWidth = Math.max(5, result.retainedPercent);

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
          <div>
            <NumberField
              id="amount"
              label="Current Amount / Monthly Expense"
              value={amount}
              onChange={(event) => setAmount(Number(event.currentTarget.value) || 0)}
              className="h-12"
            />
            <p className="mt-2 text-xs text-slate-400">Enter your savings or monthly household expenses.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Inflation Rate (%)
                </Label>
                <span className="rounded bg-rose-100 px-2 py-1 text-xs font-bold text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                  {rate}%
                </span>
              </div>
              <Slider
                aria-label="Inflation rate"
                min={1}
                max={15}
                step={0.1}
                value={[rate]}
                onValueChange={(value) => setRate(firstSliderValue(value))}
              />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>Mild (1%)</span>
                <span>Hyper (15%)</span>
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
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-rose-600 opacity-30 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-orange-600 opacity-20 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between rounded-[20px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
            <div>
              <p className="mb-1 text-sm font-medium tracking-wider text-orange-200 uppercase">
                Projected Future Cost
              </p>
              <h2 className="mb-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
                {formatMoney(result.futureCost, currency)}
              </h2>

              <div className="mb-6 rounded-xl border border-white/5 bg-black/20 p-5">
                <p className="mb-3 text-xs text-slate-300">Purchasing Power Erosion</p>
                <div className="relative mb-2 flex h-8 w-full items-center overflow-hidden rounded-md border border-white/10 bg-white/5 px-3">
                  <span className="absolute right-3 text-[10px] text-slate-400">Today</span>
                  <span className="text-xs font-bold">100% Value</span>
                </div>
                <div className="relative h-8 overflow-hidden rounded-md border border-white/10 bg-white/5">
                  <div
                    className={cn(
                      "flex h-full items-center px-3 transition-all duration-700",
                      result.retainedPercent < 50
                        ? "bg-gradient-to-r from-red-500 to-red-700"
                        : "bg-gradient-to-r from-orange-400 to-rose-500",
                    )}
                    style={{ width: `${barWidth}%` }}
                  >
                    <span className="text-xs font-bold whitespace-nowrap text-white">
                      {result.retainedPercent.toFixed(0)}%
                    </span>
                  </div>
                  <span className="absolute top-2 right-3 text-[10px] text-slate-400">In Future</span>
                </div>
                <p className="mt-3 text-[10px] leading-tight text-slate-400">
                  Your money effectively loses{" "}
                  <span className="font-bold text-rose-300">{result.lossPercent.toFixed(0)}%</span> of its
                  value.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-slate-300">Future Value of Money</span>
                <span className="text-lg font-bold text-orange-200">
                  {formatMoney(result.purchasingPower, currency)}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic">
                *To buy the same things you buy today for {symbol}
                {amount.toLocaleString(locale)}, you will need{" "}
                <span className="font-bold text-white">{formatMoney(result.futureCost, currency)}</span>.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
