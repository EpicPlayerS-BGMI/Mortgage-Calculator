# CalcBase

Production-ready financial calculator website built with HTML, Tailwind CSS, and vanilla JavaScript.

## Core Features

- Sticky shared header and global footer on all pages
- Light and dark mode with `localStorage` persistence
- Multi-country currency support: INR, USD, GBP
- Reusable calculator UI patterns and shared calculator utilities
- SEO-first page structure with semantic HTML and JSON-LD schema
- Mobile-first responsive layout with consistent design tokens

## Project Structure

- `index.html` - Home page (mortgage calculator + content hub)
- `personal-loan-calculator/` - Personal loan EMI calculator page
- `car-loan-calculator/` - Car loan calculator page
- `sip-calculator/` - SIP calculator page
- `fd-calculator/` - Fixed deposit calculator page
- `inflation-calculator/` - Inflation impact calculator page
- `investment-calculator/` - Investment growth calculator page
- `loan-eligibility-calculator/` - Loan eligibility calculator page
- `sip-vs-fd-calculator/` - SIP vs FD comparison calculator page
- `about/`, `contact/`, `privacy/`, `disclaimer/`, `terms/` - Trust and policy pages
- `components/` - Reusable header/footer HTML components
- `assets/common.js` - Shared app logic (theme, component loading, consent)
- `assets/calculator-core.js` - Shared validation helpers for calculators
- `assets/output.css`, `assets/style.css` - Tailwind output and custom styles

## Calculator Standards

Each calculator should include:

- Currency switcher for INR/USD/GBP
- Input validation and graceful empty-state behavior
- Result area with clear breakdown
- Visual summary (chart or progress visualization)
- Content-rich supporting guide and FAQs

## Local Development

Use any static server to preview locally, for example:

```bash
npx serve .
```

Then open the served URL in your browser.
