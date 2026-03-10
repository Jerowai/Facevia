"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Camera, Users, Sparkles, Smartphone } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-[#00E5FF]" />,
    title: "Instant Results",
    description: "Our high-speed GPU cluster processes your AI model in minutes, not hours.",
    area: "md:[grid-area:1/1/2/2]",
  },
  {
    icon: <Shield className="w-6 h-6 text-[#6C63FF]" />,
    title: "Privacy First",
    description: "Your data is encrypted. We never share your selfies or generated photos with third parties.",
    area: "md:[grid-area:1/2/2/3]",
  },
  {
    icon: <Camera className="w-6 h-6 text-[#F72585]" />,
    title: "Pro Photography",
    description: "Get the look of a $1,000 professional photoshoot for a fraction of the cost.",
    area: "md:[grid-area:1/3/2/4]",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#00E5FF]" />,
    title: "AI Perfection",
    description: "Advanced face-matching ensures you look like your best self in every shot.",
    area: "md:[grid-area:2/1/3/2]",
  },
  {
    icon: <Users className="w-6 h-6 text-[#6C63FF]" />,
    title: "Match Guarantee",
    description: "Join thousands of users who have tripled their matches on Tinder, Bumble, and Hinge.",
    area: "md:[grid-area:2/2/3/3]",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-[#F72585]" />,
    title: "App Optimized",
    description: "Images are generated in 4:5 aspect ratio, optimized for all major dating platforms.",
    area: "md:[grid-area:2/3/3/4]",
  },
];

export function Features() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0F172A]">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Why choose Facevia?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            The world's most advanced AI engine specifically trained for dating profile success.
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className={`relative rounded-3xl ${feature.area}`}
            >
              {/* The outer wrapper must be relative for GlowingEffect to position correctly */}
              <div className="relative h-full rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-8 group transition-all duration-300 hover:bg-white/[0.06]">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
