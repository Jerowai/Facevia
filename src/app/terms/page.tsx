import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] py-32 px-6">
      <div className="container max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="mb-8 text-white/70 hover:text-white hover:bg-white/10 -ml-4">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> back to home
          </Link>
        </Button>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
          <p className="text-lg">Last updated: March 10, 2026</p>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using Facevia, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Facevia's website for personal, non-commercial transitory viewing only.</p>
            <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on Facevia's website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Disclaimer</h2>
            <p>The materials on Facevia's website are provided on an 'as is' basis. Facevia makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
