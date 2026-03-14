'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FAQPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#0F172A] py-32 px-6">
            <div className="container max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 text-white/70 hover:text-white hover:bg-white/10 -ml-4">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t("legal.faq.back")}
                    </Link>
                </Button>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("legal.faq.title")}</h1>
                <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8 mb-2">{t("legal.faq.q1")}</h2>
                        <p className="text-gray-400">{t("legal.faq.a1")}</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8 mb-2">{t("legal.faq.q2")}</h2>
                        <p className="text-gray-400">{t("legal.faq.a2")}</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8 mb-2">{t("legal.faq.q3")}</h2>
                        <p className="text-gray-400">{t("legal.faq.a3")}</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8 mb-2">{t("legal.faq.q4")}</h2>
                        <p className="text-gray-400">{t("legal.faq.a4")}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
