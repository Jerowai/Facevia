"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Testimonials() {
  const { t } = useLanguage();

  const getReviews = () => [
    {
      name: t('testimonials.t1.name'),
      role: t('testimonials.t1.role'),
      image: "https://i.pravatar.cc/100?img=12",
      text: t('testimonials.t1.text'),
    },
    {
      name: t('testimonials.t2.name'),
      role: t('testimonials.t2.role'),
      image: "https://i.pravatar.cc/100?img=47",
      text: t('testimonials.t2.text'),
    },
    {
      name: t('testimonials.t3.name'),
      role: t('testimonials.t3.role'),
      image: "https://i.pravatar.cc/100?img=33",
      text: t('testimonials.t3.text'),
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-[#0F172A]">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('testimonials.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {getReviews().map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#00E5FF] text-[#00E5FF]" />
                ))}
              </div>

              <p className="text-gray-300 text-lg italic mb-8 leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold">{review.name}</p>
                  <p className="text-gray-500 text-xs">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
