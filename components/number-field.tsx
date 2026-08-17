"use client";

import { useId, type ComponentProps } from "react";
import { useCurrency } from "@/components/currency-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NumberFieldProps = Omit<ComponentProps<typeof Input>, "type"> & {
  label?: string;
};

export function NumberField({
  label,
  className,
  id,
  ...props
}: NumberFieldProps) {
  const { symbol } = useCurrency();
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="space-y-2">
      {label ? (
        <Label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          {label}
        </Label>
      ) : null}
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 font-bold text-slate-400">
          {symbol}
        </span>
        <Input
          id={inputId}
          type="number"
          inputMode="decimal"
          className={cn("pl-8 font-mono", className)}
          {...props}
        />
      </div>
    </div>
  );
}
