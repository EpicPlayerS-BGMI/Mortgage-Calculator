import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DEFAULT_OG_IMAGE } from "@/lib/blog-media";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
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
  applicationName: SITE_NAME,
  authors: [{ name: "Shivam", url: `${SITE_URL}/about/` }],
  creator: "Shivam",
  publisher: SITE_NAME,
  category: "finance",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Free Financial Calculators (EMI, SIP, Loan)`,
    description:
      "Free EMI, mortgage, SIP, and FD calculators with original guides for India, USA, and UK readers.",
    images: [{ url: `${SITE_URL}${DEFAULT_OG_IMAGE}`, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Free Financial Calculators`,
    description:
      "Free EMI, mortgage, SIP, and FD calculators with original guides for India, USA, and UK readers.",
    images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`],
  },
  icons: {
    icon: "/assets/favicon.ico",
    apple: "/assets/favicon.ico",
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
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
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="flex min-h-full flex-col bg-slate-50 text-slate-800 antialiased dark:bg-slate-900 dark:text-slate-200"
        suppressHydrationWarning
      >
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Providers>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
