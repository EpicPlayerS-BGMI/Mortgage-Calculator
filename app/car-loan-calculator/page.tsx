import { CalculatorPage } from "@/components/calculator-page";
import { CarLoanCalculator } from "@/components/calculators/car-loan-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("car-loan-calculator"));

export default function Page() {
  return <CalculatorPage slug="car-loan-calculator" calculator={<CarLoanCalculator />} />;
}
