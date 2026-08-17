import {
  calculateEmi,
  calculateEligibility,
  calculateFd,
  calculateInflation,
  calculateInvestment,
  calculateSip,
  calculateSipVsFd,
} from "@/lib/calculations";

function inr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

const NOTES: Record<
  string,
  { title: string; formula: string; example: () => { rows: [string, string][]; note: string } }
> = {
  "mortgage-calculator": {
    title: "How this mortgage estimate is built",
    formula: "Reducing-balance EMI = P × r × (1+r)^n / ((1+r)^n − 1), where r is the monthly rate.",
    example: () => {
      const result = calculateEmi(5_000_000, 8.5, 240);
      return {
        rows: [
          ["Example loan", `${inr(5_000_000)} at 8.5% for 20 years`],
          ["Monthly EMI", inr(result.monthlyPayment)],
          ["Total interest", inr(result.totalInterest)],
        ],
        note: "Taxes, insurance, and lender fees are not inside this EMI. Compare the quoted instalment against this baseline before you sign.",
      };
    },
  },
  "emi-calculator": {
    title: "How this EMI estimate is built",
    formula: "Same reducing-balance formula used for most Indian bank EMIs, not a flat-rate advertisement.",
    example: () => {
      const result = calculateEmi(300_000, 14, 36);
      return {
        rows: [
          ["Example loan", `${inr(300_000)} at 14% for 36 months`],
          ["Monthly EMI", inr(result.monthlyPayment)],
          ["Interest you actually pay", inr(result.totalInterest)],
        ],
        note: "If a lender shows a ‘flat’ 14%, the true reducing-balance cost is usually higher. Use this page to check the real instalment.",
      };
    },
  },
  "personal-loan-calculator": {
    title: "How this personal loan estimate is built",
    formula: "Unsecured EMI on reducing balance. Processing fees are not subtracted from principal here.",
    example: () => {
      const result = calculateEmi(400_000, 16, 48);
      return {
        rows: [
          ["Example loan", `${inr(400_000)} at 16% for 4 years`],
          ["Monthly EMI", inr(result.monthlyPayment)],
          ["Total payable", inr(result.totalPayment)],
        ],
        note: "A 2% processing fee on ₹4 lakh is ₹8,000 extra on day one. Add that fee to total cost before comparing two offers.",
      };
    },
  },
  "car-loan-calculator": {
    title: "How this car loan estimate is built",
    formula: "Reducing-balance EMI on the financed amount (on-road price minus down payment).",
    example: () => {
      const result = calculateEmi(900_000, 9.5, 60);
      return {
        rows: [
          ["Amount financed", `${inr(900_000)} at 9.5% for 5 years`],
          ["Monthly EMI", inr(result.monthlyPayment)],
          ["Interest over 5 years", inr(result.totalInterest)],
        ],
        note: "Insurance, extended warranty, and hypothecation charges sit outside EMI. Ask for the on-road quote, then finance only what you cannot pay in cash.",
      };
    },
  },
  "sip-calculator": {
    title: "How this SIP projection is built",
    formula: "FV = P × [((1+r)^n − 1) / r] × (1+r), with r as a monthly assumed return.",
    example: () => {
      const result = calculateSip(10_000, 12, 15);
      return {
        rows: [
          ["Example SIP", `${inr(10_000)} a month for 15 years at 12% assumed`],
          ["Amount you invest", inr(result.invested)],
          ["Projected value", inr(result.futureValue)],
        ],
        note: "12% is an illustration, not a promise. Equity SIPs can finish lower. Run 8% and 12% side by side before you commit.",
      };
    },
  },
  "fd-calculator": {
    title: "How this FD / term-deposit estimate is built",
    formula: "Quarterly compounding: FV = P × (1 + r/4)^(4 × years).",
    example: () => {
      const result = calculateFd(200_000, 7, 5);
      return {
        rows: [
          ["Example deposit", `${inr(200_000)} at 7% for 5 years`],
          ["Maturity value", inr(result.maturityValue)],
          ["Interest earned", inr(result.interest)],
        ],
        note: "Banks may use monthly or quarterly payout options. Premature withdrawal usually cuts the rate. This is a hold-to-maturity estimate.",
      };
    },
  },
  "inflation-calculator": {
    title: "How this inflation estimate is built",
    formula: "Future cost = today’s amount × (1 + inflation)^years. Purchasing power is the reverse.",
    example: () => {
      const result = calculateInflation(50_000, 6, 10);
      return {
        rows: [
          ["Today’s basket", `${inr(50_000)} rising at 6% for 10 years`],
          ["Same basket later", inr(result.futureCost)],
          ["₹50,000 will feel like", inr(result.purchasingPower)],
        ],
        note: "Household inflation can run hotter than the headline CPI if rent, school fees, or fuel dominate your spending.",
      };
    },
  },
  "investment-calculator": {
    title: "How this investment projection is built",
    formula: "Lump sum grows monthly, then a SIP is added using the same rate. It is a compounding model, not a market forecast.",
    example: () => {
      const result = calculateInvestment(100_000, 5_000, 10, 10);
      return {
        rows: [
          ["Example plan", `${inr(100_000)} start + ${inr(5_000)}/month, 10 years at 10%`],
          ["Money you put in", inr(result.invested)],
          ["Projected value", inr(result.totalValue)],
        ],
        note: "Taxes and expense ratios reduce real results. Treat this as a planning ceiling, then haircut it before you set a goal.",
      };
    },
  },
  "loan-eligibility-calculator": {
    title: "How this eligibility estimate is built",
    formula: "Max EMI = 50% of monthly income minus existing EMIs (FOIR cap). Principal is reverse-solved from that EMI.",
    example: () => {
      const result = calculateEligibility(80_000, 12_000, 9, 20);
      return {
        rows: [
          ["Example income", `${inr(80_000)} with ${inr(12_000)} already in EMIs`],
          ["EMI room at 50% FOIR", inr(result.maxEmi)],
          ["Illustrative loan size", inr(result.principal)],
        ],
        note: "Banks also score credit history, employment stability, and property value. A 50% FOIR cap is a planning rule, not a sanction letter.",
      };
    },
  },
  "sip-vs-fd-calculator": {
    title: "How this SIP vs FD comparison is built",
    formula: "SIP uses monthly compounding. FD here compounds the same total invested as an annual lump for a clean comparison.",
    example: () => {
      const result = calculateSipVsFd(10_000, 10, 12, 7);
      return {
        rows: [
          ["Same savings", `${inr(10_000)}/month for 10 years`],
          ["SIP at 12% assumed", inr(result.sipValue)],
          ["FD at 7%", inr(result.fdValue)],
        ],
        note: "The SIP line can underperform the FD if markets are weak. Use this to see the gap you must be willing to live with, not to pick a winner.",
      };
    },
  },
};

export function CalculatorMethod({ slug }: { slug: string }) {
  const note = NOTES[slug];
  if (!note) return null;

  const example = note.example();

  return (
    <section className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6 dark:border-slate-700 dark:bg-slate-800/70">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{note.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{note.formula}</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        {example.rows.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-white p-4 dark:bg-slate-900">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{example.note}</p>
    </section>
  );
}
