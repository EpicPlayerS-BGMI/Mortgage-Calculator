"use client";

import { useMemo, useState } from "react";
import { CurrencyToggle } from "@/components/currency-toggle";
import { useCurrency } from "@/components/currency-provider";
import { NumberField } from "@/components/number-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateSip } from "@/lib/calculations";
import { formatMoney } from "@/lib/currency";
import { firstSliderValue } from "@/lib/utils";

export function SipCalculator() {
  const { currency } = useCurrency();
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => calculateSip(monthly, rate, years), [monthly, rate, years]);
  const growth =
    result.futureValue > 0 ? Math.min((result.returns / result.futureValue) * 100, 100) : 0;

  return (
    <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
      <section className="space-y-6 rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-8 lg:col-span-7 dark:border-slate-700/50 dark:bg-slate-800/60">
        <CurrencyToggle />

        <NumberField
          id="monthly"
          label="Monthly Investment"
          value={monthly}
          onChange={(event) => setMonthly(Number(event.currentTarget.value) || 0)}
          className="h-12"
        />

        <div>
          <div className="mb-1 flex justify-between">
            <Label className="font-semibold">Expected Annual Return (%)</Label>
            <span className="font-mono font-bold text-indigo-600">{rate}%</span>
          </div>
          <Slider
            aria-label="Expected annual return"
            min={0}
            max={50}
            step={0.1}
            value={[rate]}
            onValueChange={(value) => setRate(firstSliderValue(value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="years" className="font-semibold">
            Investment Duration (Years)
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
        <p className="mb-2 text-xs tracking-widest uppercase">Estimated Future Value</p>
        <h2 className="mb-6 text-4xl font-extrabold md:text-5xl">
          {formatMoney(Math.round(result.futureValue), currency)}
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Total Investment</span>
            <span className="font-bold">{formatMoney(Math.round(result.invested), currency)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Returns</span>
            <span className="font-bold">{formatMoney(Math.round(result.returns), currency)}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-2 rounded bg-white/30">
            <div
              className="h-2 rounded bg-white transition-all duration-700 ease-out"
              style={{ width: `${growth}%` }}
            />
          </div>
          <p className="mt-2 text-xs opacity-80">Return Growth Indicator</p>
        </div>
      </aside>
    </div>
  );
}
