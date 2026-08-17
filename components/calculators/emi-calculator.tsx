"use client";

import { useMemo, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCurrency } from "@/components/currency-provider";
import { NumberField } from "@/components/number-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateEmi } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";

export function EmiCalculator() {
  const { currency } = useCurrency();
  const [amount, setAmount] = useState(250000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(240);

  const valid = amount > 0 && rate >= 0 && rate <= 40 && tenure >= 1 && tenure <= 600;
  const result = useMemo(() => calculateEmi(amount, rate, tenure), [amount, rate, tenure]);
  const share = result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 0;

  return (
    <section className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
      <article className="pro-card p-6 md:p-8 lg:col-span-7">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
            Currency
          </p>
          <CurrencyToggle compact className="w-auto" />
        </div>

        <div className="space-y-6">
          <NumberField
            id="calc-amount"
            label="Loan Amount"
            value={amount}
            onChange={(event) => setAmount(Number(event.currentTarget.value) || 0)}
            className="h-12"
          />

          <div className="space-y-2">
            <Label htmlFor="calc-rate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Interest Rate (% per annum)
            </Label>
            <Input
              id="calc-rate"
              type="number"
              step={0.1}
              value={rate}
              onChange={(event) => setRate(Number(event.currentTarget.value) || 0)}
              className="h-12 font-mono text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calc-tenure" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Tenure (Months)
            </Label>
            <Input
              id="calc-tenure"
              type="number"
              value={tenure}
              onChange={(event) => setTenure(Number(event.currentTarget.value) || 0)}
              className="h-12 font-mono text-lg"
            />
          </div>

          {!valid ? (
            <p className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
              Enter valid inputs: amount &gt; 0, rate between 0% and 40%, tenure between 1 and 600 months.
            </p>
          ) : null}
        </div>
      </article>

      <aside className="lg:col-span-5">
        <div className="flex min-h-140 flex-col justify-between rounded-3xl bg-linear-to-br from-indigo-600 to-violet-700 p-7 text-white shadow-2xl">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-indigo-100 uppercase">Monthly EMI</p>
            <p className="mt-3 text-5xl font-black tracking-tight">
              {formatMoney(result.monthlyPayment, currency)}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-500/40">
                <div
                  className="h-20 w-20 rounded-full"
                  style={{
                    background: `conic-gradient(#ffffff ${share}%, rgba(255,255,255,0.3) ${share}% 100%)`,
                  }}
                  aria-hidden
                />
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span>Total Interest</span>
                <strong>{formatMoney(result.totalInterest, currency)}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Payment</span>
                <strong className="text-base">{formatMoney(result.totalPayment, currency)}</strong>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
