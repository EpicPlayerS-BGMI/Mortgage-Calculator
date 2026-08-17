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

1. Open **Workers & Pages** → **Create** → **Workers** → **Import a repository**.
2. Select this repo and set the production branch to `main`.
3. Use these build settings:
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx wrangler deploy`
   - **Non-production / preview deploy:** `npx wrangler versions upload`
4. After the first successful deploy, add `calcbase.tech` (and `www` if you use it) under **Settings → Domains & Routes**.

If the domain is currently on Cloudflare Pages, remove that custom domain from the Pages project first so the Worker can take over.

## Layout

- `app/` — routes that match public URLs (`/mortgage-calculator/`, `/blogs/[slug]/`)
- `components/calculators/` — interactive widgets
- `lib/calculations.ts` — EMI, SIP, FD, inflation, eligibility, SIP vs FD formulas
- `content/` — original page copy, rendered on the server
- `public/assets/` — fonts, blog images, favicon, ads.txt
