"use client";

import { useMemo, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCurrency } from "@/components/currency-provider";
import { NumberField } from "@/components/number-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateEligibility } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";
import { cn, firstSliderValue } from "@/lib/utils";

export function LoanEligibilityCalculator() {
  const { currency } = useCurrency();
  const [income, setIncome] = useState(5000);
  const [existingEmi, setExistingEmi] = useState(500);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(20);

  const result = useMemo(
    () => calculateEligibility(income, existingEmi, rate, years),
    [existingEmi, income, rate, years],
  );

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
          <NumberField
            id="income"
            label="Monthly Gross Income"
            value={income}
            onChange={(event) => setIncome(Number(event.currentTarget.value) || 0)}
            className="h-12"
          />

          <div>
            <NumberField
              id="existingEMI"
              label="Current Monthly EMIs"
              value={existingEmi}
              onChange={(event) => setExistingEmi(Number(event.currentTarget.value) || 0)}
              className="h-12"
            />
            <p className="mt-2 text-xs text-slate-400">
              Include car loans, personal loans, or credit card bills.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Interest Rate</Label>
                <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  {rate}%
                </span>
              </div>
              <Slider
                aria-label="Interest rate"
                min={1}
                max={20}
                step={0.1}
                value={[rate]}
                onValueChange={(value) => setRate(firstSliderValue(value))}
              />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="years" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Loan Tenure
              </Label>
              <div className="relative">
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(event) => setYears(Number(event.currentTarget.value) || 0)}
                  className="h-12 pr-16 font-semibold"
                />
                <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-slate-400">
                  Years
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="lg:sticky lg:top-24 lg:col-span-5">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-1 text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-indigo-500 opacity-40 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-blue-500 opacity-40 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between rounded-[20px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
            <div>
              <p className="mb-1 text-sm font-medium tracking-wider text-indigo-200 uppercase">
                Max Loan Eligibility
              </p>
              <h2 className="mb-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent lg:text-6xl">
                {formatMoney(result.principal, currency)}
              </h2>

              <div className="mb-6 rounded-xl border border-white/5 bg-black/20 p-5">
                <div className="mb-2 flex justify-between text-xs text-slate-300">
                  <span>Monthly Income Capacity</span>
                  <span className={cn(result.overLimit && "font-bold text-red-500")}>
                    {result.overLimit ? "Critical: Debt exceeds limit!" : "Safe limit (50%)"}
                  </span>
                </div>
                <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-red-400 transition-all duration-500"
                    style={{ width: `${result.existingPercent}%` }}
                  />
                  <div
                    className="h-full bg-emerald-400 transition-all duration-500"
                    style={{ width: `${result.capacityPercent}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-400" />
                    Existing Debts
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    Available for Loan
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-sm text-slate-300">Max Affordable EMI</span>
                <span className="text-lg font-bold">{formatMoney(result.maxEmi, currency)}</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-sm text-slate-300">Est. Total Interest</span>
                <span className="text-lg font-bold text-emerald-300">
                  {formatMoney(result.totalInterest, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
