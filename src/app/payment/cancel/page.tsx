import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#090b14] pt-32 pb-24 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-xl mx-auto px-6 relative z-10 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Checkout Canceled</h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Your payment was not completed. If you experienced any issues or simply changed your mind, you can safely return to the pricing page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/#pricing"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 text-white font-bold transition-all w-full sm:w-auto"
          >
            Review Pricing
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-gray-400 hover:text-white transition-all w-full sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
