import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0F172A] py-32 px-6">
            <div className="container max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 text-white/70 hover:text-white hover:bg-white/10 -ml-4">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" /> back to home
                    </Link>
                </Button>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
                    <p className="text-lg">Last updated: March 10, 2026</p>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Introduction</h2>
                        <p>Welcome to Facevia. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. The Data We Collect About You</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong>Image Data:</strong> includes the photos you upload to our service to generate AI avatars.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                        </ul>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Data Security & Image Retention</h2>
                        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. <strong>All uploaded photos and generated images are automatically deleted from our servers 24 hours after your generation is complete.</strong> We do not use your private photos to train external global AI models.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
