"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function StylePresets() {
  const { t } = useLanguage();

  const PRESETS = [
    {
      name: t('presets.styles.tinderRooftop.name'),
      icon: '🌆',
      image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2570&auto=format&fit=crop',
      label: t('presets.styles.tinderRooftop.label')
    },
    {
      name: t('presets.styles.beachSunset.name'),
      icon: '🌅',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2573&auto=format&fit=crop',
      label: t('presets.styles.beachSunset.label')
    },
    {
      name: t('presets.styles.coffeeShopCandid.name'),
      icon: '☕',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2571&auto=format&fit=crop',
      label: t('presets.styles.coffeeShopCandid.label')
    },
    {
      name: t('presets.styles.gymLifestyle.name'),
      icon: '🏋️',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2570&auto=format&fit=crop',
      label: t('presets.styles.gymLifestyle.label')
    },
    {
      name: t('presets.styles.travelStreet.name'),
      icon: '✈️',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2570&auto=format&fit=crop',
      label: t('presets.styles.travelStreet.label')
    },
    {
      name: t('presets.styles.luxuryRestaurant.name'),
      icon: '🥂',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2570&auto=format&fit=crop',
      label: t('presets.styles.luxuryRestaurant.label')
    },
  ];

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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {PRESETS.map((preset, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              {/* Background image */}
              <img
                src={preset.image}
                alt={preset.name}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              {/* Hover color overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/30 to-[#F72585]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{preset.icon}</span>
                  <span className="text-xs font-medium text-[#00E5FF] tracking-widest uppercase">{preset.label}</span>
                </div>
                <p className="text-lg font-bold text-white">{preset.name}</p>
              </div>

              {/* Hover "Try This Style" badge */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {t('presets.tryStyle')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

