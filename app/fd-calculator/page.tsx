import { CalculatorPage } from "@/components/calculator-page";
import { FdCalculator } from "@/components/calculators/fd-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("fd-calculator"));

export default function Page() {
  return <CalculatorPage slug="fd-calculator" calculator={<FdCalculator />} />;
}
