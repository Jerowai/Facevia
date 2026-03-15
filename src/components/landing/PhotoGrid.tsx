"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const EXAMPLE_IMAGES = [
  { id: "rooftop", src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2574&auto=format&fit=crop" },
  { id: "beach", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" },
  { id: "coffee", src: "https://images.unsplash.com/photo-1512152329560-c9e9b042f72a?q=80&w=2574&auto=format&fit=crop" },
  { id: "travel", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2574&auto=format&fit=crop" },
  { id: "gym", src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2574&auto=format&fit=crop" },
  { id: "night_city", src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop" },
  { id: "restaurant", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2574&auto=format&fit=crop" },
];

export function PhotoGrid() {
  const { t } = useLanguage();

  return (
    <section id="photos" className="py-24 px-6 bg-[#0F172A]">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {t('photoGrid.title1')} <span className="text-gradient">{t('photoGrid.title2')}</span>
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('photoGrid.subtitle')}
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {EXAMPLE_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl overflow-hidden group border border-white/5 cursor-pointer shadow-xl break-inside-avoid"
            >
              <img
                src={img.src}
                alt={t(`presets.styles.${img.id}.name`)}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 z-10 transition-opacity duration-300">
                <span className="text-white font-semibold text-lg drop-shadow-md">
                  {t(`presets.styles.${img.id}.name`)}
                </span>
                <span className="text-[#00E5FF] text-[11px] font-bold tracking-wider uppercase mt-1">
                  {t('photoGrid.badge')}
                </span>
              </div>
              <div className="absolute inset-0 border-2 border-[#00E5FF]/0 group-hover:border-[#00E5FF]/30 transition-all duration-300 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
