"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PHOTO_PRESETS } from "@/lib/constants/presets";
import Link from "next/link";

export function StylePresets() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-[#0F172A]">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {t('presets.title1')} <span className="text-gradient">{t('presets.title2')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            {t('presets.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {PHOTO_PRESETS.map((preset, index) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <img
                src={preset.image}
                alt={t(`presets.styles.${preset.id}.name`)}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/30 to-[#F72585]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{preset.icon}</span>
                  <span className="text-xs font-medium text-[#00E5FF] tracking-widest uppercase">{t(`presets.styles.${preset.id}.label`)}</span>
                </div>
                <p className="text-sm font-bold text-white">{t(`presets.styles.${preset.id}.name`)}</p>
              </div>

              <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {t('presets.tryStyle')}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            {t('nav.cta')} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
