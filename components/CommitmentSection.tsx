"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';

// Static SEO content component - server rendered
const CommitmentStaticContent = ({ lang }: { lang: 'en' | 'ne' }) => {
  const t = translations[lang];
  
  return (
    <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
      <div className="max-w-4xl bg-white/80 dark:bg-black/40 backdrop-blur-sm p-12 rounded-[3rem] border border-gray-200 dark:border-white/10">
        <span className="text-brand-orange font-black uppercase text-sm md:text-base mb-6 block tracking-wider">
          {t.commitmentTitle}
        </span>
        
        <h2 className="text-4xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-[1.1]">
          {t.commitmentSubtitle.split(' ').map((word: string, i: number) => (
            <React.Fragment key={i}>
              {word === 'सम्झौता' || word === 'Compromise' ? (
                <span className="text-brand-orange drop-shadow-[0_0_30px_rgba(255,107,0,0.5)]">{word}</span>
              ) : word}
              {' '}
            </React.Fragment>
          ))}
        </h2>
        <p className="text-lg md:text-2xl text-gray-600 dark:text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
          {t.commitmentDesc}
        </p>
      </div>
    </div>
  );
};

export const CommitmentSection = () => {
  const { lang } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress with more fluid settings
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Scale kept moderate with smoother easing for fluid reveal effect
  const scale = useTransform(smoothProgress, [0, 0.7], [1, 1.8]);
  const maskOpacity = useTransform(smoothProgress, [0, 0.15], [0.1, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-gray-50 dark:bg-slate-950" aria-label="Our Commitment to Quality">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Layer (Dark) */}
        <div className="absolute inset-0 bg-gray-50 dark:bg-slate-950 z-0" />

        {/* Mask Reveal Section - Contains the masked image and content */}
        <motion.div
          style={{
            opacity: maskOpacity,
            transform: 'translateZ(0)'
          }}
          className="absolute inset-0 z-10 w-full h-full flex items-center justify-center origin-center will-change-transform"
        >
          {/* Masked image (GPU-accelerated transform) */}
          <motion.div
            style={{ scale }}
            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
          >
            <img
              src="/home.webp"
              alt="Our Commitment to Quality - Binayak Suppliers Jhapa - Building Trust Since 2014"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'translateZ(0)' }}
            />
          </motion.div>

          {/* Content Overlay - Static SEO content */}
          <CommitmentStaticContent lang={lang} />

          {/* Border/Shadow follow the portal */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent shadow-[0_0_100px_rgba(255,107,0,0.2)] pointer-events-none" />
        </motion.div>


        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
        >
            <div className="text-gray-400 dark:text-white/50 text-[10px] tracking-[0.3em] font-black uppercase">Scroll to Reveal</div>
            <div className="w-1 h-12 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                animate={{ y: [-48, 48] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-full bg-brand-orange"
              />
            </div>
        </motion.div>
      </div>
    </section>
  );
};
