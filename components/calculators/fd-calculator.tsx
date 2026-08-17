"use client";

import { useMemo, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCurrency } from "@/components/currency-provider";
import { NumberField } from "@/components/number-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateFd } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";
import { firstSliderValue } from "@/lib/utils";

export function FdCalculator() {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(5);

  const result = useMemo(() => calculateFd(principal, rate, years), [principal, rate, years]);
  const growth =
    result.maturityValue > 0 ? Math.min((result.interest / result.maturityValue) * 100, 100) : 0;

  return (
    <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
      <section className="space-y-6 rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-8 lg:col-span-7 dark:border-slate-700/50 dark:bg-slate-800/60">
        <CurrencyToggle />

        <NumberField
          id="principal"
          label="Fixed Deposit Amount"
          value={principal}
          onChange={(event) => setPrincipal(Number(event.currentTarget.value) || 0)}
          className="h-12"
        />

        <div>
          <div className="mb-1 flex justify-between">
            <Label className="font-semibold">Annual Interest Rate (%)</Label>
            <span className="font-mono font-bold text-indigo-600">{rate}%</span>
          </div>
          <Slider
            aria-label="Annual interest rate"
            min={0}
            max={20}
            step={0.1}
            value={[rate]}
            onValueChange={(value) => setRate(firstSliderValue(value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="years" className="font-semibold">
            Deposit Duration (Years)
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

      <aside className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-600 p-8 text-white shadow-2xl lg:col-span-5">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10" />
        <p className="mb-2 text-xs tracking-widest uppercase">Maturity Amount</p>
        <h2 className="mb-6 text-4xl font-extrabold md:text-5xl">
          {formatMoney(result.maturityValue, currency)}
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Principal Amount</span>
            <span className="font-bold">{formatMoney(principal, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Interest Earned</span>
            <span className="font-bold">{formatMoney(result.interest, currency)}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-2 rounded bg-white/30">
            <div
              className="h-2 rounded bg-white transition-all duration-700"
              style={{ width: `${growth}%` }}
            />
          </div>
          <p className="mt-2 text-xs opacity-80">Interest Growth Indicator</p>
        </div>
      </aside>
    </div>
  );
}
