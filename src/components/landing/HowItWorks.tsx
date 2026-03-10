"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const getSteps = () => [
    {
      icon: <Upload className="w-8 h-8 text-[#00E5FF]" />,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc'),
      color: "from-[#00E5FF]/20 to-transparent",
    },
    {
      icon: <Cpu className="w-8 h-8 text-[#6C63FF]" />,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc'),
      color: "from-[#6C63FF]/20 to-transparent",
    },
    {
      icon: <ImageIcon className="w-8 h-8 text-[#F72585]" />,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc'),
      color: "from-[#F72585]/20 to-transparent",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#0F172A] relative overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{t('howItWorks.title')}</h2>
          <p className="text-gray-400 text-base md:text-lg px-4">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {getSteps().map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-10 rounded-3xl glass-card group overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 text-6xl font-black text-white/5 pointer-events-none group-hover:text-white/10 transition-colors">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
