import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ADSENSE_CLIENT, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../fonts/Inter_18pt-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Inter_18pt-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Inter_18pt-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const display = localFont({
  src: [
    { path: "../fonts/Baloo2-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Baloo2-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Baloo2-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Free Financial Calculators (EMI, SIP, Loan)`,
    template: `%s`,
  },
  description:
    "CalcBase is a content-rich financial planning website with free EMI, personal loan, and home loan calculators for INR, USD, and GBP users.",
  icons: {
    icon: "/assets/favicon.ico",
    apple: "/assets/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} h-full scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-slate-50 text-slate-800 antialiased dark:bg-slate-900 dark:text-slate-200"
        suppressHydrationWarning
      >
        <Script
          id="adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Providers>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
