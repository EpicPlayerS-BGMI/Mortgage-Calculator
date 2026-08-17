export const CURRENCIES = {
  USD: { code: "USD", locale: "en-US", symbol: "$" },
  GBP: { code: "GBP", locale: "en-GB", symbol: "£" },
  INR: { code: "INR", locale: "en-IN", symbol: "₹" },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export function isCurrencyCode(value: string | null): value is CurrencyCode {
  return value === "USD" || value === "GBP" || value === "INR";
}

export function formatMoney(
  value: number,
  currency: CurrencyCode,
  maximumFractionDigits = 0,
) {
  return new Intl.NumberFormat(CURRENCIES[currency].locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

export function detectCurrency(): CurrencyCode {
  if (typeof window === "undefined") return "USD";

  try {
    const saved = window.localStorage.getItem("calcbase_currency");
    if (isCurrencyCode(saved)) return saved;
  } catch {
    // Ignore blocked storage.
  }

  const lang = (navigator.language || "").toLowerCase();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

  if (lang.includes("in") || timezone === "Asia/Kolkata" || timezone === "Asia/Calcutta") {
    return "INR";
  }

  if (lang.includes("gb") || timezone === "Europe/London") {
    return "GBP";
  }

  return "USD";
}
