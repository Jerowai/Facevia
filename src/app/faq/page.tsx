import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-[#0F172A] py-32 px-6">
            <div className="container max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 text-white/70 hover:text-white hover:bg-white/10 -ml-4">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" /> back to home
                    </Link>
                </Button>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Frequently Asked Questions</h1>
                <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8 mb-2">How many photos do I need to upload?</h2>
                        <p className="text-gray-400">For the best results, we recommend uploading 4 to 10 photos of yourself. Regular selfies with clear lighting work perfectly.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8 mb-2">How long does it take to get my AI photos?</h2>
                        <p className="text-gray-400">Our advanced AI models typically generate your high-quality professional photos in under 15 minutes.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8 mb-2">Are my photos private?</h2>
                        <p className="text-gray-400">Yes, absolutely. We prioritize your privacy. All uploaded and generated photos are automatically deleted from our secure servers within 24 hours.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8 mb-2">Can I use these photos for LinkedIn?</h2>
                        <p className="text-gray-400">Yes! While our primary styles are optimized for dating profiles, we also offer corporate and casual styles that are perfect for LinkedIn and professional use.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
