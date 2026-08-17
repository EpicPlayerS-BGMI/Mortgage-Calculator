import { CalculatorPage } from "@/components/calculator-page";
import { LoanEligibilityCalculator } from "@/components/calculators/loan-eligibility-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("loan-eligibility-calculator"));

export default function Page() {
  return <CalculatorPage slug="loan-eligibility-calculator" calculator={<LoanEligibilityCalculator />} />;
}
