"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  CURRENCIES,
  detectCurrency,
  isCurrencyCode,
  type CurrencyCode,
} from "@/lib/currency";
import { CURRENCY_STORAGE_KEY } from "@/lib/site";

type CurrencyContextValue = {
  currency: CurrencyCode;
  symbol: string;
  locale: string;
  setCurrency: (code: CurrencyCode) => void;
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === CURRENCY_STORAGE_KEY) emit();
  };

  const onCurrencyChange = () => emit();

  window.addEventListener("storage", onStorage);
  document.addEventListener("calcbase:currencychange", onCurrencyChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
    document.removeEventListener("calcbase:currencychange", onCurrencyChange);
  };
}

function getSnapshot(): CurrencyCode {
  return detectCurrency();
}

function getServerSnapshot(): CurrencyCode {
  return "USD";
}

function setCurrencyCode(code: CurrencyCode) {
  if (!isCurrencyCode(code)) return;

  try {
    const previous = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, code);
    if (previous !== code) {
      document.dispatchEvent(
        new CustomEvent("calcbase:currencychange", {
          detail: { currency: code },
        }),
      );
    }
  } catch {
    // Ignore blocked storage.
  }

  emit();
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { symbol, locale } = CURRENCIES[currency];

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      symbol,
      locale,
      setCurrency: setCurrencyCode,
    }),
    [currency, locale, symbol],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
