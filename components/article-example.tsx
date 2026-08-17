const EXAMPLES: Record<string, { title: string; body: string[]; table?: [string, string][] }> = {
  "good-debt-vs-bad-debt": {
    title: "A rupee-level test before you call debt ‘good’",
    body: [
      "Take a ₹6 lakh personal loan at 16% for 4 years versus paying a ₹6 lakh credit-card balance at 36% APR. The personal loan EMI is about ₹16,900. The card minimum often barely covers interest, so the same balance can still be there a year later.",
      "That personal loan is only ‘better’ if the cards stay at zero afterwards. If both run together, you have doubled the problem. Score debt by leftover cash after the new EMI, not by the marketing label.",
    ],
    table: [
      ["Credit card ₹6L at 36%", "Interest can exceed ₹18,000/month if revolving"],
      ["Personal loan ₹6L at 16% / 4 yrs", "Fixed EMI ~₹16,900, balance hits zero"],
      ["Fail condition", "New EMI plus fresh card spend"],
    ],
  },
  "benefits-of-buying-vs-renting": {
    title: "Five-year cash test, not a slogan",
    body: [
      "Suppose rent is ₹25,000 and a similar home needs ₹40 lakh with 20% down (₹8 lakh) plus a ₹32 lakh loan at 8.5% for 20 years. EMI is about ₹27,800. Buying also needs stamp duty, maintenance, and the ₹8 lakh that could have stayed in an FD or SIP.",
      "If you might move in three years, the round-trip cost of buying often beats the ‘rent is wasted’ line. If you will stay 8–10 years and can keep an emergency fund after the down payment, ownership starts to win on paper.",
    ],
  },
  "debt-snowball-vs-avalanche": {
    title: "Same three debts, two payoff orders",
    body: [
      "Debts: ₹40,000 card at 36%, ₹1.2 lakh personal loan at 15%, ₹3 lakh car loan at 10%. Extra ₹8,000 a month after minimums.",
      "Avalanche attacks the 36% card first and usually saves more interest. Snowball clears the ₹40,000 card first for a quick win. If you have abandoned plans before, snowball’s psychology can matter more than a few thousand rupees of interest.",
    ],
    table: [
      ["Avalanche first target", "36% card — highest rate"],
      ["Snowball first target", "₹40,000 card — smallest balance"],
      ["Use the EMI tool for", "The leftover loan after each clearance"],
    ],
  },
  "car-leasing-vs-buying-financial-breakdown": {
    title: "Mileage is the hidden price tag",
    body: [
      "A 3-year lease at ₹22,000/month is ₹7.92 lakh before excess-mileage fees. Buying the same car with ₹4 lakh down and ₹8 lakh financed at 10% for 5 years has a lower monthly EMI but you own a depreciating asset.",
      "If you drive 25,000 km a year and the lease caps 12,000, excess charges can wipe the ‘cheap monthly’ advantage. Buying wins when you keep the car past year five; leasing can win if you truly stay inside the contract.",
    ],
  },
  "how-to-pay-off-student-loans-faster": {
    title: "One extra EMI a year is a calendar trick that works",
    body: [
      "On a ₹10 lakh education loan at 10% for 10 years, EMI is about ₹13,200. Paying one extra full EMI each year (₹13,200) is roughly a 8% principal prepayment cadence without changing your monthly budget much.",
      "Confirm there is no prepayment penalty. Direct extra amounts to principal, not a longer EMI holiday. If the rate is floating, recast the remaining balance in the EMI calculator after every prepayment.",
    ],
  },
  "how-to-save-for-a-house-down-payment": {
    title: "Backsolve the monthly number",
    body: [
      "A ₹50 lakh home with 20% down needs ₹10 lakh. If you already have ₹2.5 lakh and want the rest in 36 months, you need about ₹20,800 a month into a separate account, ignoring interest.",
      "Park this in a liquid fund or short FD, not in equity, if the purchase is inside three years. Run the SIP calculator only for money you will not need for the down payment.",
    ],
  },
  "how-to-rebuild-credit-score-fast": {
    title: "Utilisation math beats waiting for time",
    body: [
      "A ₹1 lakh limit with ₹70,000 used is 70% utilisation — a common score drag. Paying it to ₹30,000 drops utilisation to 30% without opening a new account.",
      "One 30-day late on a mortgage can hurt more than a year of perfect card payments can repair. Pull your CIBIL/Experian file, dispute errors, and keep oldest accounts open unless the fee is painful.",
    ],
  },
  "how-to-negotiate-lower-mortgage-rate": {
    title: "What 0.25% is actually worth",
    body: [
      "On ₹40 lakh at 8.75% for 20 years, EMI is about ₹35,400. At 8.50% it falls to about ₹34,700. That ₹700 a month is ₹1.68 lakh over 20 years before tax effects.",
      "Walk into the bank with a competing sanction letter and your current CIBIL. Ask to match, not for a miracle. If they will not move the rate, ask them to drop processing fees instead.",
    ],
  },
  "pros-and-cons-of-refinancing-home": {
    title: "Break-even months, not ‘rates are lower’",
    body: [
      "If closing costs are ₹60,000 and the new EMI saves ₹2,500 a month, break-even is 24 months. Move or sell before that and you lost money refinancing.",
      "Cash-out refinance is a new loan, not free money. Run both EMIs in the mortgage calculator and refuse the deal if the new tenure resets you to 20 years when you had 8 left.",
    ],
  },
  "inflation-impact-on-long-term-mortgages": {
    title: "Fixed EMI, shrinking real burden",
    body: [
      "A ₹30,000 EMI feels heavy in year one. At 6% inflation, that same ₹30,000 has about the buying power of ₹16,700 after 10 years. That is why long fixed-rate mortgages get easier if income keeps up.",
      "The trap is a floating rate that rises with inflation. Then EMI and prices move together. Stress-test +2% rate in the calculator before you pick floating.",
    ],
  },
  "impact-of-interest-rates-on-finances": {
    title: "One repo move, three household lines",
    body: [
      "When policy rates rise 1%, a ₹50 lakh floating home loan can add roughly ₹3,000–₹4,000 to EMI depending on tenure. The same move can lift a 1-year FD from 6.5% to around 7.5% on new bookings.",
      "Do not wait for the newspaper to tell you which side you are on. List your floating loans versus your deposits. If loans dwarf deposits, rate hikes hurt you first.",
    ],
  },
  "mutual-funds-vs-etfs": {
    title: "Cost drag on ₹10,000 a month",
    body: [
      "₹10,000 a month for 15 years is ₹18 lakh invested. A 1.8% regular-plan expense ratio versus 0.3% direct/ETF is about 1.5% extra drag every year. On a 12% gross return that gap compounds into several lakhs.",
      "ETFs need a demat and can trade at a premium or discount. Regular mutual funds are simpler for SIP automation. Pick the cheaper vehicle you will actually keep funding.",
    ],
  },
  "understanding-the-stock-market-for-beginners": {
    title: "Index first, stock-picking later",
    body: [
      "A beginner who puts ₹5,000 a month into a broad index SIP and never sells during a 30% drawdown usually beats a beginner who trades five tips a month. The skill is staying invested, not finding a secret stock.",
      "Use the investment calculator to set a 10-year number. If a crash would force you to withdraw, the allocation is too high — not the index’s fault.",
    ],
  },
  "understanding-cryptocurrency-beginner-guide": {
    title: "Treat it as speculative, then size it that way",
    body: [
      "If emergency savings are not fully funded, crypto is in the wrong slot of the plan. A 50% drop on money needed for rent is not ‘volatility’, it is a missed payment.",
      "CalcBase does not recommend buying coins. This article exists so readers can recognise wallets, scams, and leverage — then walk away if the risk does not fit. Never share a seed phrase. Never borrow to buy.",
    ],
  },
  "the-ultimate-guide-to-fire-movement": {
    title: "Savings rate beats a viral withdrawal rule",
    body: [
      "FIRE math is mostly: spend less than you earn, invest the gap, wait. At a 50% savings rate you can fund a year of expenses with one year of work, before returns. At 10%, the timeline stretches for decades.",
      "A 4% withdrawal idea from US market history is not a law in India or the UK. Haircut it. Run the SIP and inflation calculators on your actual annual spend, not a blogger’s number.",
    ],
  },
  "basics-of-estate-planning": {
    title: "The cheapest document most families skip",
    body: [
      "A will does not require wealth. If you have a home, a PPF, a demat, or a child, intestacy rules will split assets in ways your family may not want. Nomination on a bank account is not the same as a will.",
      "List accounts, name a guardian, and tell one trusted person where the list lives. Review beneficiaries after marriage, divorce, or a new child. This is administration, not a luxury product.",
    ],
  },
  "understanding-auto-loan-amortization": {
    title: "Year-one interest is supposed to look unfair",
    body: [
      "On ₹8 lakh at 10% for 5 years, the first year is interest-heavy. Extra ₹5,000 toward principal in month 3 saves more total interest than the same ₹5,000 in month 48, because it stops compounding earlier.",
      "Ask the lender for an amortisation schedule. If they will not share it, rebuild it with the car loan calculator and refuse add-on insurance bundled into principal.",
    ],
  },
  "how-inflation-affects-your-savings": {
    title: "FD rate minus inflation is the real yield",
    body: [
      "A 7% FD with 6% inflation leaves about 1% real, before tax. In the 30% tax slab, post-tax FD yield can go negative in real terms. That is why cash is for emergencies, not for 15-year goals.",
      "Use the inflation calculator on a ₹1 lakh corpus over 15 years at 6%. Then decide how much of that corpus truly belongs in deposits.",
    ],
  },
  "how-to-calculate-mortgage-payment": {
    title: "Worked EMI you can check by hand",
    body: [
      "Principal ₹20 lakh, 9% annual, 15 years: monthly r = 0.09/12 = 0.0075, n = 180. Plug into the standard EMI formula and you should land near ₹20,300. If a salesperson’s number is far from that, ask which fees they hid.",
      "Escrow for tax and insurance is extra in some US quotes. Indian EMIs are usually principal plus interest only. Compare like with like.",
    ],
  },
  "how-personal-loan-emi-is-calculated": {
    title: "Flat rate versus reducing balance",
    body: [
      "₹3 lakh at a advertised ‘12% flat’ for 3 years is interest of ₹1.08 lakh (12% × 3 × principal) and EMI near ₹11,300. The same 12% on reducing balance costs less interest because principal falls each month.",
      "Always ask: is 12% flat or reducing? Then rebuild it here. If they will not say, assume the worse one.",
    ],
  },
  "how-loan-eligibility-is-calculated": {
    title: "FOIR 50% on a real payslip",
    body: [
      "Take-home ₹70,000, existing EMIs ₹10,000. Fifty percent FOIR allows ₹35,000 total EMIs, so ₹25,000 of room. At 10% for 5 years that room supports roughly ₹11–12 lakh, not the ₹20 lakh some ads imply.",
      "Lenders may use gross pay, variable income haircuts, or a stricter 40% FOIR. Treat our 50% cap as an upper bound.",
    ],
  },
  "how-credit-score-affects-mortgage-rate": {
    title: "Rate tier is a lifetime bill",
    body: [
      "On ₹35 lakh for 20 years, 8.5% versus 9.5% is roughly ₹2,000 extra EMI. Over the full term that is several lakhs of extra interest — more than many people spend ‘improving the kitchen’ after they move in.",
      "If your score is 20 points below the next pricing bucket, waiting three months to cut utilisation can be the highest-return project you do this year.",
    ],
  },
  "fico-vs-cibil-scores-explained": {
    title: "Different scales, same habits",
    body: [
      "CIBIL 300–900 is not FICO 300–850. A 750 CIBIL is not ‘the same’ as a 750 FICO. Lenders in each country have their own cut-offs. Copying a US YouTube threshold onto an Indian home loan is how people get surprised at the branch.",
      "What transfers: pay on time, keep utilisation modest, do not open five cards in a month. Check the bureau that your lender actually pulls.",
    ],
  },
  "emergency-fund-calculator-guide": {
    title: "Count essential months, not a viral ‘6 months’",
    body: [
      "List rent, food, utilities, insurance, minimum EMIs. If that is ₹45,000, a 3-month starter fund is ₹1.35 lakh; 6 months is ₹2.7 lakh. Skip gym and streaming in this list — those are not survival costs.",
      "Self-employed readers should bias toward 9–12 months. Salaried with stable income can start at 3 and keep funding.",
    ],
  },
  "build-emergency-fund-from-scratch": {
    title: "₹500 a day is a 90-day starter",
    body: [
      "₹500 daily for 90 days is ₹45,000. That will not cover a job loss, but it covers a bike repair or a medical deductible so you do not swipe a 36% card.",
      "Automate the sweep the morning after payday. Do not wait until the month-end leftover, because there will not be one.",
    ],
  },
  "sip-vs-fd-which-is-better": {
    title: "They answer different jobs",
    body: [
      "Money needed in 12 months does not belong in an equity SIP. Money meant for 15-year retirement usually does not belong only in FDs after tax and inflation.",
      "Split by date: near-term in FD/liquid, long-term in SIP. The SIP vs FD calculator shows the gap; your timeline decides the split.",
    ],
  },
  "understanding-fixed-vs-floating-rates": {
    title: "A +2% shock test",
    body: [
      "₹40 lakh, 20 years, 8.5% EMI ≈ ₹34,700. At 10.5% it jumps to about ₹39,900. If that extra ₹5,200 would break the budget, you cannot afford a fully floating loan without a buffer.",
      "Fixed periods (common in the UK) postpone the shock; they do not delete it. Diary the reset date the day you sign.",
    ],
  },
  "50-30-20-budgeting-rule": {
    title: "Take-home ₹60,000 mapped for real",
    body: [
      "Needs ₹30,000, wants ₹18,000, future ₹12,000. If rent alone is ₹28,000, the 50% needs bucket is already broken — raise income, cut rent, or admit the rule must flex in expensive cities.",
      "The 20% (₹12,000) should leave the salary account on payday. Use SIP or a named FD so it is not ‘available’.",
    ],
  },
};

export function ArticleExample({ slug }: { slug: string }) {
  const example = EXAMPLES[slug];
  const image = blogImage(slug);
  if (!example) return null;

  return (
    <section className="my-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        Worked example from CalcBase
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{example.title}</h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        {example.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
      {example.table ? (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <tbody>
              {example.table.map(([label, value]) => (
                <tr key={label} className="border-t border-slate-200 dark:border-slate-600">
                  <th className="py-2 pr-4 font-semibold text-slate-800 dark:text-slate-100">{label}</th>
                  <td className="py-2 text-slate-600 dark:text-slate-300">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <p className="mt-4 text-xs text-slate-500">
        Figures are illustrations using standard EMI and compounding maths. Lender quotes, taxes, and fees will differ.
      </p>
    </section>
  );
}
