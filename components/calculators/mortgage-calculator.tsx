"use client";

import { useMemo, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCurrency } from "@/components/currency-provider";
import { NumberField } from "@/components/number-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateEmi } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";
import { cn } from "@/lib/utils";

type MortgageTab = "property" | "loan";

export function MortgageCalculator() {
  const { currency } = useCurrency();
  const [tab, setTab] = useState<MortgageTab>("property");
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [loanAmount, setLoanAmount] = useState(280000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const principal = tab === "property" ? homePrice - downPayment : loanAmount;
  const downPaymentError = tab === "property" && downPayment >= homePrice;
  const showPlaceholder = downPaymentError || principal <= 0 || rate <= 0 || years <= 0;

  const result = useMemo(() => {
    if (showPlaceholder) return null;
    return calculateEmi(principal, rate, years * 12);
  }, [principal, rate, showPlaceholder, years]);

  return (
    <section className="mb-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
      <div className="pro-card relative h-full overflow-hidden p-6 shadow-2xl shadow-indigo-500/5 md:p-8">
        <div className="absolute top-0 left-0 h-1 w-full bg-indigo-600" />

        <div className="mb-10 flex rounded-2xl border border-slate-200/50 bg-slate-100/50 p-1.5 dark:border-slate-700/50 dark:bg-slate-800/50">
          <button
            type="button"
            onClick={() => setTab("property")}
            className={cn(
              "flex-1 rounded-xl py-3 text-xs font-bold transition-all",
              tab === "property"
                ? "bg-white text-indigo-600 shadow-md active:scale-[0.97] dark:bg-indigo-600 dark:text-white"
                : "text-slate-500 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400",
            )}
          >
            PROPERTY PRICE
          </button>
          <button
            type="button"
            onClick={() => setTab("loan")}
            className={cn(
              "flex-1 rounded-xl py-3 text-xs font-bold transition-all",
              tab === "loan"
                ? "bg-white text-indigo-600 shadow-md active:scale-[0.97] dark:bg-indigo-600 dark:text-white"
                : "text-slate-500 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400",
            )}
          >
            DIRECT LOAN
          </button>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">
            Select Currency
          </p>
          <CurrencyToggle compact className="w-auto" />
        </div>

        <div className="space-y-6">
          {tab === "property" ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <NumberField
                id="homePrice"
                label="Home Price"
                value={homePrice}
                onChange={(event) => setHomePrice(Number(event.currentTarget.value) || 0)}
                className="h-12"
              />
              <NumberField
                id="downPayment"
                label="Down Payment"
                value={downPayment}
                onChange={(event) => setDownPayment(Number(event.currentTarget.value) || 0)}
                className="h-12"
              />
            </div>
          ) : (
            <NumberField
              id="loanAmount"
              label="Net Loan Amount"
              value={loanAmount}
              onChange={(event) => setLoanAmount(Number(event.currentTarget.value) || 0)}
              className="h-12"
            />
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="rate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Interest Rate (%)
              </Label>
              <Input
                id="rate"
                type="number"
                step={0.1}
                value={rate}
                onChange={(event) => setRate(Number(event.currentTarget.value) || 0)}
                className="h-12 font-mono text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Term (Years)
              </Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(event) => setYears(Number(event.currentTarget.value) || 0)}
                className="h-12 font-mono text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-115 flex-col items-center justify-center">
        {showPlaceholder || !result ? (
          <div className="max-w-sm p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-800 dark:text-white">
              {downPaymentError ? "Check your down payment" : "Ready to Calculate?"}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {downPaymentError
                ? "Down payment should be less than home price."
                : "Enter valid loan amount, interest rate, and tenure."}
            </p>
          </div>
        ) : (
          <div className="relative mx-auto flex min-h-110 w-full max-w-2xl flex-col justify-between overflow-hidden rounded-4xl border border-indigo-500/20 bg-linear-to-br from-indigo-600 to-violet-700 p-8 text-center shadow-2xl shadow-indigo-500/20 md:p-10">
            <div className="relative z-10">
              <span className="mb-4 block text-xs font-black tracking-[0.2em] text-indigo-100 uppercase opacity-80">
                Estimated Monthly Payment
              </span>
              <div className="mb-8 text-5xl font-black tracking-tighter text-white md:text-7xl">
                {formatMoney(result.monthlyPayment, currency)}
              </div>
              <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-8 text-left sm:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="mb-2 text-[10px] font-black tracking-widest text-indigo-100 uppercase opacity-60">
                    Total Interest
                  </p>
                  <p className="text-xl font-bold text-white md:text-2xl">
                    {formatMoney(result.totalInterest, currency)}
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5 text-right">
                  <p className="mb-2 text-[10px] font-black tracking-widest text-indigo-100 uppercase opacity-60">
                    Total Payback
                  </p>
                  <p className="text-xl font-bold text-white md:text-2xl">
                    {formatMoney(result.totalPayment, currency)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
