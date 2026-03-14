'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#0F172A] py-32 px-6">
            <div className="container max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-8 text-white/70 hover:text-white hover:bg-white/10 -ml-4">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t("legal.faq.back")}
                    </Link>
                </Button>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("legal.contact.title")}</h1>
                <div className="prose prose-invert max-w-none text-gray-300 space-y-8">
                    <p className="text-lg">{t("legal.contact.subtitle")}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#ec4899]/20 rounded-full flex items-center justify-center mb-4">
                                <Mail className="text-[#ec4899] w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t("legal.contact.emailTitle")}</h3>
                            <p className="text-gray-400 font-medium">support@facevia.com</p>
                        </div>

                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#00E5FF]/20 rounded-full flex items-center justify-center mb-4">
                                <MapPin className="text-[#00E5FF] w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{t("legal.contact.locationTitle")}</h3>
                            <p className="text-gray-400 font-medium">UMUT KAYDIM ENTERPRISE LTD.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
