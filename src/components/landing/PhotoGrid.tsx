"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const EXAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2598&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
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

        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {EXAMPLE_IMAGES.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl overflow-hidden group border border-white/5 cursor-pointer shadow-xl"
            >
              <img
                src={src}
                alt={`AI Example ${index}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
                <span className="text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded bg-white/10 backdrop-blur-md">
                  {t('photoGrid.badge')}
                </span>
              </div>
              <div className="absolute inset-0 border-2 border-[#00E5FF]/0 group-hover:border-[#00E5FF]/30 transition-all duration-300 rounded-2xl pointer-events-none shadow-[inset_0_0_20px_rgba(0,229,255,0)] group-hover:shadow-[inset_0_0_20px_rgba(0,229,255,0.1)]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
