import { CalculatorPage } from "@/components/calculator-page";
import { PersonalLoanCalculator } from "@/components/calculators/personal-loan-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("personal-loan-calculator"));

export default function Page() {
  return <CalculatorPage slug="personal-loan-calculator" calculator={<PersonalLoanCalculator />} />;
}
