import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0F172A] selection:bg-[#6C63FF]/30 pt-20">
      <div className="flex-1">
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}
