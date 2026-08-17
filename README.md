# CalcBase

Financial calculator website for India, USA, and UK users. Built with Next.js App Router, Tailwind CSS v4 (`@import`), and shadcn/ui. Pages are statically generated so the original URLs, SEO, and calculator formulas stay the same.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Layout

- `app/` — routes that match public URLs (`/mortgage-calculator/`, `/blogs/[slug]/`)
- `components/calculators/` — interactive widgets
- `lib/calculations.ts` — EMI, SIP, FD, inflation, eligibility, SIP vs FD formulas
- `content/` — original page copy, rendered on the server
- `public/assets/` — fonts, blog images, favicon, ads.txt
