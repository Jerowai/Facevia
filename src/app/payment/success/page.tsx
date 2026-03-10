import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#090b14] pt-32 pb-24 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ec4899]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-xl mx-auto px-6 relative z-10 text-center">
        <div className="w-20 h-20 bg-[#ec4899]/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#ec4899]/40">
          <CheckCircle2 className="w-10 h-10 text-[#ec4899]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Payment Successful!</h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Thank you for choosing Facevia. Your account has been upgraded. 
          While our AI training models are currently being prepared for standard rollout, your purchase has been securely recorded.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#ec4899] hover:bg-[#db2777] text-white font-bold transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 w-full sm:w-auto"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
