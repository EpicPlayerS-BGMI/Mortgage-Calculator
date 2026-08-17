"use client";

import { useMemo, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCurrency } from "@/components/currency-provider";
import { NumberField } from "@/components/number-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateEmi } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";
import { cn, firstSliderValue } from "@/lib/utils";

type TenureMode = "years" | "months";

export function PersonalLoanCalculator() {
  const { currency } = useCurrency();
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(11);
  const [tenure, setTenure] = useState(3);
  const [tenureMode, setTenureMode] = useState<TenureMode>("years");
  const [processingFee, setProcessingFee] = useState(0);

  const valid = amount > 0 && tenure > 0 && rate >= 0 && rate <= 50;
  const months = tenureMode === "years" ? tenure * 12 : tenure;
  const result = useMemo(() => calculateEmi(amount, rate, months), [amount, months, rate]);
  const totalPayable = result.totalPayment + processingFee;
  const share = result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 0;

  function switchTenureMode(next: TenureMode) {
    if (next === tenureMode) return;

    if (next === "years") {
      setTenure(Number((tenure / 12).toFixed(1).replace(/\.0$/, "")));
    } else {
      setTenure(Math.round(tenure * 12));
    }

    setTenureMode(next);
  }

  return (
    <section className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
      <article className="pro-card overflow-hidden rounded-2xl p-6 shadow-xl md:p-8 lg:col-span-7">
        <div className="mb-6">
          <CurrencyToggle />
        </div>

        <div className="space-y-6">
          <NumberField
            id="loanAmount"
            label="Loan Amount"
            value={amount}
            onChange={(event) => setAmount(Number(event.currentTarget.value) || 0)}
            className="h-12"
          />

          <div>
            <div className="mb-2 flex justify-between">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Interest Rate (% P.A)
              </Label>
              <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {rate}%
              </span>
            </div>
            <Slider
              aria-label="Interest rate"
              className="mb-4"
              min={0}
              max={50}
              step={0.1}
              value={[rate]}
              onValueChange={(value) => setRate(firstSliderValue(value))}
            />
            <Input
              id="rate-number"
              type="number"
              step={0.1}
              value={rate}
              onChange={(event) => setRate(Number(event.currentTarget.value) || 0)}
              className="h-12 font-mono text-lg"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label htmlFor="tenure" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Loan Tenure
              </Label>
              <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-700">
                <button
                  type="button"
                  onClick={() => switchTenureMode("years")}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs transition-all",
                    tenureMode === "years"
                      ? "bg-white font-bold text-indigo-600 shadow-sm"
                      : "font-medium text-slate-500 hover:text-indigo-600",
                  )}
                >
                  Yr
                </button>
                <button
                  type="button"
                  onClick={() => switchTenureMode("months")}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs transition-all",
                    tenureMode === "months"
                      ? "bg-white font-bold text-indigo-600 shadow-sm"
                      : "font-medium text-slate-500 hover:text-indigo-600",
                  )}
                >
                  Mo
                </button>
              </div>
            </div>
            <div className="relative">
              <Input
                id="tenure"
                type="number"
                value={tenure}
                onChange={(event) => setTenure(Number(event.currentTarget.value) || 0)}
                className="h-12 pr-20 font-mono text-lg"
              />
              <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-bold tracking-wider text-slate-400 uppercase">
                {tenureMode === "years" ? "YEARS" : "MONTHS"}
              </span>
            </div>
          </div>

          <NumberField
            id="processingFee"
            label="Processing Fee (Optional)"
            value={processingFee}
            onChange={(event) => setProcessingFee(Number(event.currentTarget.value) || 0)}
            className="h-12"
          />

          {!valid ? (
            <p className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
              Enter valid values: loan amount &gt; 0, tenure &gt; 0, and rate between 0% and 50%.
            </p>
          ) : null}
        </div>
      </article>

      <aside className="space-y-6 lg:col-span-5">
        <div className="relative overflow-hidden rounded-2xl bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-200 transition-transform duration-500 hover:scale-[1.02] md:p-8 dark:shadow-none">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white opacity-10" />
          <div className="relative z-10 text-center">
            <p className="mb-2 text-xs font-bold tracking-widest text-indigo-100 uppercase">
              Your Monthly Payment
            </p>
            <h2 className="mb-6 text-5xl font-extrabold tracking-tight">
              {formatMoney(result.monthlyPayment, currency)}
            </h2>

            <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="relative mb-4 flex justify-center">
                <div
                  className="h-32 w-32 rounded-full"
                  style={{
                    background: `conic-gradient(#ffffff ${share}%, rgba(255,255,255,0.3) ${share}% 100%)`,
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600">
                  <span className="text-[10px] font-bold uppercase opacity-70">Breakdown</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-indigo-100">Principal Amount</span>
                  <span className="font-bold">{formatMoney(amount, currency)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-white" />
                    <span className="text-indigo-100">Total Interest</span>
                  </div>
                  <span className="font-bold">{formatMoney(result.totalInterest, currency)}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-indigo-200">Total Payable</span>
                  <span className="text-lg font-bold">{formatMoney(totalPayable, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
