import { Hero } from "@/components/landing/Hero";
import { BeforeAfterSlider } from "@/components/landing/BeforeAfterSlider";
import { PhotoGrid } from "@/components/landing/PhotoGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { StylePresets } from "@/components/landing/StylePresets";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0F172A] selection:bg-[#6C63FF]/30">
      <Hero />
      <BeforeAfterSlider />
      <PhotoGrid />
      <HowItWorks />
      <StylePresets />
      <Features />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
