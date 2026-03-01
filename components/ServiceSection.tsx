"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';

export const ServiceSection = () => {
  const { lang } = useApp();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "inset(15% 15% 15% 15% round 60px)", 
      "inset(0% 0% 0% 0% round 0px)", 
      "inset(0% 0% 0% 0% round 0px)", 
      "inset(15% 15% 15% 15% round 60px)"
    ]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 bg-slate-950 relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          style={{ opacity, y: textY }}
          className="max-w-3xl"
        >
          <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm mb-6 block">
            {lang === 'ne' ? 'हाम्रो प्रतिबद्धता' : 'OUR COMMITMENT'}
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1]">
            {lang === 'ne' ? 'गुणस्तरमा कहिल्यै सम्झौता छैन' : 'Never Compromise on Quality'}
          </h2>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-xl">
            {lang === 'ne' 
              ? 'दशकौंसम्म टिक्ने बलियो संरचनाको लागि हामी उत्कृष्ट निर्माण सामग्रीहरू मात्र छनोट गर्छौं।' 
              : 'We select only the finest construction materials for structures that last for decades.'}
          </p>
        </motion.div>
      </div>

      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div 
          initial={{ clipPath: "inset(20% 20% 20% 20% round 80px)" }}
          style={{ clipPath }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {/* Video with improved contrast */}
          <div className="absolute inset-0 bg-slate-950/20 z-[1]" /> 
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/01videl.mp4" type="video/mp4" />
          </video>

          {/* Premium Masking Overlays */}
          {/* 1. Deep Radial Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_70%)] z-[2] opacity-80" />
          
          {/* 2. Side Gradients for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-[3]" />
          
          {/* 3. Global Darkening Overlay */}
          <div className="absolute inset-0 bg-slate-950/30 mix-blend-multiply z-[4]" />
          
          {/* 4. Subtle Noise/Texture Overlay (using a CSS pattern) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[5] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-brand-orange/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-brand-blue/20 rounded-full blur-[150px] animate-pulse delay-700"></div>
    </section>
  );
};
