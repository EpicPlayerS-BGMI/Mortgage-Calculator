import { CalculatorPage } from "@/components/calculator-page";
import { SipVsFdCalculator } from "@/components/calculators/sip-vs-fd-calculator";
import { getCalculatorMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(getCalculatorMeta("sip-vs-fd-calculator"));

export default function Page() {
  return <CalculatorPage slug="sip-vs-fd-calculator" calculator={<SipVsFdCalculator />} />;
}
