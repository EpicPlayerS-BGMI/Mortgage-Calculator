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
import { firstSliderValue } from "@/lib/utils";

export function CarLoanCalculator() {
  const { currency } = useCurrency();
  const [price, setPrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(5);

  const loan = price - downPayment;
  const result = useMemo(
    () => (loan > 0 && years > 0 ? calculateEmi(loan, rate, years * 12) : calculateEmi(0, rate, 0)),
    [loan, rate, years],
  );
  const share = result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 0;

  return (
    <div className="mb-20">
      <div className="mx-auto mb-6 flex max-w-7xl justify-end">
        <CurrencyToggle compact className="w-auto" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <section className="pro-card space-y-6 rounded-2xl border border-slate-200 p-6 shadow-lg md:p-8 lg:col-span-7 dark:border-slate-700">
          <NumberField
            id="carPrice"
            label="Car Price"
            value={price}
            onChange={(event) => setPrice(Number(event.currentTarget.value) || 0)}
            className="h-12"
          />
          <NumberField
            id="downPayment"
            label="Down Payment"
            value={downPayment}
            onChange={(event) => setDownPayment(Number(event.currentTarget.value) || 0)}
            className="h-12"
          />

          <div>
            <div className="mb-1 flex justify-between">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Interest Rate (%)
              </Label>
              <span className="font-mono text-indigo-600">{rate}%</span>
            </div>
            <Slider
              aria-label="Interest rate"
              min={0}
              max={30}
              step={0.1}
              value={[rate]}
              onValueChange={(value) => setRate(firstSliderValue(value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Loan Tenure (Years)
            </Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(event) => setYears(Number(event.currentTarget.value) || 0)}
              className="h-12 font-mono text-lg"
            />
          </div>
        </section>

        <aside className="relative overflow-hidden rounded-2xl bg-indigo-600 p-8 text-white shadow-xl lg:col-span-5">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
          <p className="mb-2 text-xs tracking-widest uppercase opacity-80">Monthly EMI</p>
          <h2 className="mb-6 text-5xl font-extrabold">{formatMoney(result.monthlyPayment, currency)}</h2>

          <div className="mb-6 flex justify-center">
            <div
              className="h-28 w-28 rounded-full"
              style={{
                background: `conic-gradient(#ffffff ${share}%, rgba(255,255,255,0.3) ${share}% 100%)`,
              }}
              aria-hidden
            />
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Total Loan Amount</span>
              <span className="font-bold">{formatMoney(Math.max(loan, 0), currency)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest</span>
              <span className="font-bold">{formatMoney(result.totalInterest, currency)}</span>
            </div>
            <div className="flex justify-between border-t pt-3 text-lg font-bold">
              <span>Total Cost</span>
              <span>{formatMoney(result.totalPayment, currency)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
