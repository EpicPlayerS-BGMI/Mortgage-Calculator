# CalcBase

Financial calculator website for India, USA, and UK users. Built with Next.js App Router, Tailwind CSS v4 (`@import`), and shadcn/ui. Pages are statically generated so the original URLs, SEO, and calculator formulas stay the same.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
npm run preview   # local Workers runtime
npm run deploy    # build + deploy to Cloudflare
```

## Cloudflare

This app deploys to Cloudflare Workers with OpenNext. Pushes to `main` rebuild the live site after you connect the GitHub repo in the Cloudflare dashboard.

1. Open your Worker → **Settings → Builds**.
2. Set these commands (required — default `wrangler deploy` alone will fail):
   - **Build command:** `npm run build:cf`
   - **Deploy command:** `npx opennextjs-cloudflare deploy`
   - **Non-production branch deploy command:** `npx opennextjs-cloudflare upload`
3. Production branch: `main`.
4. After the first successful deploy, add `calcbase.tech` (and `www` if you use it) under **Settings → Domains & Routes**.

`npm run build` only runs Next.js. Cloudflare needs `npm run build:cf` so `.open-next` exists before deploy.

If the domain is currently on Cloudflare Pages, remove that custom domain from the Pages project first so the Worker can take over.

## Layout

- `app/` — routes that match public URLs (`/mortgage-calculator/`, `/blogs/[slug]/`)
- `components/calculators/` — interactive widgets
- `lib/calculations.ts` — EMI, SIP, FD, inflation, eligibility, SIP vs FD formulas
- `content/` — original page copy, rendered on the server
- `public/assets/` — fonts, blog images, favicon, ads.txt
