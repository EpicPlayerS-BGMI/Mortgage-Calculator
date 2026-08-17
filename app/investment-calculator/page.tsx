import { CalculatorPage } from "@/components/calculator-page";
import { InvestmentCalculator } from "@/components/calculators/investment-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("investment-calculator"));

export default function Page() {
  return <CalculatorPage slug="investment-calculator" calculator={<InvestmentCalculator />} />;
}
