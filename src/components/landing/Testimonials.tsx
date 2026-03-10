"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Alex Thompson",
    role: "Product Designer",
    image: "https://i.pravatar.cc/100?img=12",
    text: "I was skeptical about AI photos, but Facevia blew me away. My match rate on Hinge literally tripled in the first week. The photos look exactly like me on a very good day.",
  },
  {
    name: "Sarah Miller",
    role: "Marketing Manager",
    image: "https://i.pravatar.cc/100?img=47",
    text: "Used this to refresh my Bumble profile. The 'Coffee Shop Candid' preset is incredible. It looks like a high-end professional shoot without the awkwardness.",
  },
  {
    name: "James Wilson",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/100?img=33",
    text: "The best $49 I've spent. Simple process, fast results, and actually high-quality images. Finally have a profile I'm confident about.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-[#0F172A]">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Loved by <span className="text-gradient">thousands</span></h2>
          <p className="text-gray-400 text-lg">Join the people who have transformed their dating experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
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
