"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ConsentBanner } from "@/components/consent-banner";
import { CurrencyProvider } from "@/components/currency-provider";
import { THEME_STORAGE_KEY } from "@/lib/site";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange
    >
      <CurrencyProvider>
        {children}
        <ConsentBanner />
      </CurrencyProvider>
    </ThemeProvider>
  );
}
