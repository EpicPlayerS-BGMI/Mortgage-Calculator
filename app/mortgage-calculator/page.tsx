import { CalculatorPage } from "@/components/calculator-page";
import { MortgageCalculator } from "@/components/calculators/mortgage-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("mortgage-calculator"));

export default function Page() {
  return <CalculatorPage slug="mortgage-calculator" calculator={<MortgageCalculator />} />;
}
