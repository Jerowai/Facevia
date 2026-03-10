"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { RippleButton } from "@/components/multi-type-ripple-buttons";
import React, { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// ── WebGL animated ring background (adapted to Facevia dark palette) ──────────
const FaceviaShaderBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vert = `attribute vec2 aPosition; void main(){ gl_Position=vec4(aPosition,0.,1.); }`;
    const frag = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      mat2 r2d(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
      float vary(vec2 v1,vec2 v2,float str,float spd){ return sin(dot(normalize(v1),normalize(v2))*str+iTime*spd)/100.; }
      vec3 ring(vec2 uv,vec2 ctr,float rad,float w){
        vec2 d=ctr-uv; float l=length(d);
        l+=vary(d,vec2(0.,1.),5.,2.); l-=vary(d,vec2(1.,0.),5.,2.);
        return vec3(smoothstep(rad-w,rad,l)-smoothstep(rad,rad+w,l));
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/iResolution.xy;
        uv.x*=1.5; uv.x-=0.25;
        float mask=0.;
        vec2 ctr=vec2(.5);
        mask+=ring(uv,ctr,.35,.035).r;
        mask+=ring(uv,ctr,.332,.01).r;
        mask+=ring(uv,ctr,.368,.005).r;
        vec2 v=r2d(iTime)*uv;
        // Facevia palette: purple → cyan instead of default white/green
        vec3 fg=vec3(mix(.42,.85,v.x), mix(.39,.85,v.y), mix(.85,1.,v.x*v.y+.3));
        vec3 bg=vec3(0.059,0.090,0.165); // #0F172A
        vec3 color=mix(bg,fg,mask);
        color=mix(color,vec3(1.),ring(uv,ctr,.35,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "aPosition");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(prog, "iTime");
    const resLoc = gl.getUniformLocation(prog, "iResolution");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;
    const draw = (t: number) => {
      gl.uniform1f(timeLoc, t * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
    />
  );
};

// ── Plan data is now generated dynamically inside Pricing component ──

type Plan = {
  name: string;
  tierId: string;
  price: string;
  label: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  accent: string;
  glow: string;
  popularText?: string;
};

// ── Single glassy card ────────────────────────────────────────────────────────
function PricingCard({
  plan,
  index,
}: {
  plan: Plan;
  index: number;
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: plan.tierId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.error === "Unauthorized. Please log in.") {
          window.location.href = "/login?tab=signup";
          return;
        }
        alert("Failed to start checkout: " + (errorData.error || res.statusText));
        return;
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex-1 max-w-sm mx-auto w-full ${plan.popular ? "md:-translate-y-4" : ""}`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 + 0.2 }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase text-white whitespace-nowrap"
          style={{ background: `linear-gradient(135deg, #6C63FF, #9D4EDD)` }}
        >
          ⭐ {plan.popularText || "Most Popular"}
        </motion.div>
      )}

      {/* Card */}
      <div
        className={`relative rounded-3xl p-8 flex flex-col h-full backdrop-blur-[18px] border transition-all duration-500 group
          ${plan.popular
            ? "bg-white/[0.10] border-[#9D4EDD]/40"
            : "bg-white/[0.04] border-white/10 hover:bg-white/[0.07]"
          }`}
        style={{
          boxShadow: plan.popular
            ? `0 0 60px ${plan.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`
            : `0 0 0px transparent`,
        }}
      >
        {/* inner glow on hover (non-popular cards) */}
        {!plan.popular && (
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: `0 0 50px ${plan.glow}` }}
          />
        )}

        {/* Horizontal divider gradient */}
        <div
          className="absolute top-0 left-8 right-8 h-px rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${plan.accent}88, transparent)` }}
        />

        {/* Plan header */}
        <div className="mb-6">
          {/* Accent dot */}
          <div
            className="w-2.5 h-2.5 rounded-full mb-4"
            style={{ background: plan.accent, boxShadow: `0 0 8px ${plan.accent}` }}
          />
          <h3
            className="text-[44px] font-extralight tracking-[-0.03em] leading-none mb-1"
            style={{ color: plan.popular ? plan.accent : "white" }}
          >
            {plan.name}
          </h3>
          <p className="text-white/50 text-sm">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
          <span className="text-white/40 text-sm">{plan.label}</span>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{
            background: `linear-gradient(90deg,transparent,${plan.accent}55 30%,${plan.accent}55 70%,transparent)`,
          }}
        />

        {/* Features */}
        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-white/80">
              <div
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: `${plan.accent}22`, border: `1px solid ${plan.accent}55` }}
              >
                <Check className="w-3 h-3" style={{ color: plan.accent }} />
              </div>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA Button with ripple */}
        <div className="mt-auto">
          <div
            onClick={handleCheckout}
            className={`relative rounded-xl overflow-hidden cursor-pointer ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
            style={plan.popular
              ? { background: `linear-gradient(135deg, ${plan.accent}, #6C63FF)`, boxShadow: `0 0 24px ${plan.glow}` }
              : { background: `${plan.accent}18`, border: `1px solid ${plan.accent}40` }
            }
          >
            <RippleButton
              className={`w-full py-3.5 font-bold text-sm tracking-wide bg-transparent border-0 ${plan.popular ? "text-white" : "text-white/90 hover:text-white"
                }`}
              rippleColor={`${plan.accent}66`}
            >
              {isLoading ? "Loading..." : plan.cta}
            </RippleButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
export function Pricing() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const PLANS = [
    {
      name: t('pricing.starter'),
      tierId: "starter",
      price: "$9",
      label: `/${t('pricing.oneTime')}`,
      description: t('pricing.starterDesc'),
      features: [
        t('pricing.features.p1_f1'),
        t('pricing.features.p1_f2'),
        t('pricing.features.p1_f3'),
        t('pricing.features.p1_f4'),
      ],
      cta: t('pricing.buy'),
      popular: false,
      accent: "#6C63FF",
      glow: "rgba(108,99,255,0.18)",
    },
    {
      name: t('pricing.pro'),
      tierId: "pro",
      price: "$19",
      label: `/${t('pricing.oneTime')}`,
      description: t('pricing.proDesc'),
      features: [
        t('pricing.features.p2_f1'),
        t('pricing.features.p2_f2'),
        t('pricing.features.p2_f3'),
        t('pricing.features.p2_f4'),
        t('pricing.features.p2_f5'),
      ],
      cta: t('pricing.buyPro'),
      popular: true,
      accent: "#9D4EDD",
      glow: "rgba(157,78,221,0.30)",
    },
    {
      name: t('pricing.elite'),
      tierId: "premium",
      price: "$29",
      label: `/${t('pricing.oneTime')}`,
      description: t('pricing.eliteDesc'),
      features: [
        t('pricing.features.p3_f1'),
        t('pricing.features.p3_f2'),
        t('pricing.features.p3_f3'),
        t('pricing.features.p3_f4'),
        t('pricing.features.p3_f5'),
        t('pricing.features.p3_f6'),
      ],
      cta: t('pricing.buyElite'),
      popular: false,
      accent: "#F72585",
      glow: "rgba(247,37,133,0.18)",
    },
  ];

  return (
    <section id="pricing" className="relative py-28 px-6 bg-[#0F172A] overflow-hidden">
      {/* WebGL animated ring */}
      {!isMobile && <FaceviaShaderBg />}

      {/* Radial purple glow behind cards */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[300px] md:w-[700px] md:h-[400px] rounded-full blur-[80px] md:blur-[120px] opacity-15 md:opacity-20"
          style={{ background: "radial-gradient(ellipse, #9D4EDD 0%, transparent 70%)" }}
        />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block mb-4 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#00E5FF]">
            {t('nav.pricing')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extralight tracking-tight text-white mb-4">
            {t('pricing.title1')} {" "}
            <span
              className="font-black"
              style={{
                background: "linear-gradient(135deg, #6C63FF, #9D4EDD, #F72585)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t('pricing.title2')}
            </span>{" "}
            {t('pricing.title3')}
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto px-4">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch md:items-end">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/30 text-[11px] sm:text-sm mt-14 px-4"
        >
          {t('pricing.trust')}
        </motion.p>
      </div>
    </section>
  );
}
