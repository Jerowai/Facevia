'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PrivacyPolicyPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#0F172A] py-32 px-6">
            <div className="container max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 text-white/70 hover:text-white hover:bg-white/10 -ml-4">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t("legal.faq.back")}
                    </Link>
                </Button>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("legal.privacy.title")}</h1>
                <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
                    <p className="text-lg">{t("legal.privacy.lastUpdated")}</p>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("legal.privacy.s1.title")}</h2>
                        <p>{t("legal.privacy.s1.p")}</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("legal.privacy.s2.title")}</h2>
                        <p>{t("legal.privacy.s2.p")}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>{t("legal.privacy.s2.l1")}</li>
                            <li>{t("legal.privacy.s2.l2")}</li>
                            <li>{t("legal.privacy.s2.l3")}</li>
                            <li>{t("legal.privacy.s2.l4")}</li>
                        </ul>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t("legal.privacy.s3.title")}</h2>
                        <p>{t("legal.privacy.s3.p")}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
