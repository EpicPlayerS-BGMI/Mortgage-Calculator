import { CalculatorPage } from "@/components/calculator-page";
import { SipCalculator } from "@/components/calculators/sip-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("sip-calculator"));

export default function Page() {
  return <CalculatorPage slug="sip-calculator" calculator={<SipCalculator />} />;
}
