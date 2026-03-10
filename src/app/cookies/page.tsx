import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] py-32 px-6">
      <div className="container max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="mb-8 text-white/70 hover:text-white hover:bg-white/10 -ml-4">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> back to home
          </Link>
        </Button>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Cookie Policy</h1>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
          <p className="text-lg">Last updated: March 10, 2026</p>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. What Are Cookies</h2>
            <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. The Cookies We Set</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.</li>
              <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact.</li>
              <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site, we provide the functionality to set your preferences, such as your selected language.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
