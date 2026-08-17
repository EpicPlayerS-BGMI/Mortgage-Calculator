import { CalculatorPage } from "@/components/calculator-page";
import { EmiCalculator } from "@/components/calculators/emi-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("emi-calculator"));

export default function Page() {
  return <CalculatorPage slug="emi-calculator" calculator={<EmiCalculator />} />;
}
