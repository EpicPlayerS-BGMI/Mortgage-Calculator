import { CalculatorPage } from "@/components/calculator-page";
import { InflationCalculator } from "@/components/calculators/inflation-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("inflation-calculator"));

export default function Page() {
  return <CalculatorPage slug="inflation-calculator" calculator={<InflationCalculator />} />;
}
