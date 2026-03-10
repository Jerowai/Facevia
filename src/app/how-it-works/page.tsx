import { HowItWorks } from "@/components/landing/HowItWorks";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#090b14] pt-24 pb-24">
      {/* We reuse the existing HowItWorks component but as a standalone page */}
      <div className="pt-10">
        <HowItWorks />
      </div>
    </div>
  );
}
