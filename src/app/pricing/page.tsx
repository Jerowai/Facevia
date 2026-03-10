import { Pricing } from "@/components/landing/Pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#090b14] pt-24 pb-24">
      {/* We reuse the existing Pricing component but as a standalone page */}
      <div className="pt-10">
        <Pricing />
      </div>
    </div>
  );
}
