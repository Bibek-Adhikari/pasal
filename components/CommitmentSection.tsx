"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useApp } from './AppProvider';
import { translations } from '../constants/translations';

export const CommitmentSection = () => {
  const { lang } = useApp();
  const t = translations[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scale starts tiny, expands to fill screen
  const scale = useTransform(smoothProgress, [0, 0.7], [1, 50]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const textOpacity = useTransform(smoothProgress, [0, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.4], [100, 0]);
  const maskOpacity = useTransform(smoothProgress, [0, 0.1], [0.2, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-slate-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Layer (Dark) */}
        <div className="absolute inset-0 bg-slate-950 z-0" />

        {/* Mask Reveal Section - Contains the video being revealed */}
        <motion.div
          style={{
            scale,
            opacity: maskOpacity,
            WebkitMaskImage: "url('/home.webp')",
            maskImage: "url('/home.webp')",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
          className="absolute inset-0 z-10 w-full h-full flex items-center justify-center origin-center"
        >
          {/* Video Content - This is what gets revealed by the mask */}
          <motion.video
            style={{ opacity: videoOpacity }}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/home.webp"
          >
            <source src="/video.mp4" type="video/mp4" />
          </motion.video>

          {/* Border/Shadow follow the portal */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-orange/30 shadow-[0_0_100px_rgba(255,107,0,0.2)] pointer-events-none" />
        </motion.div>

        {/* Overlay to darken video when zoomed */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 0.5]) }}
          className="absolute inset-0 z-20 bg-slate-950 pointer-events-none"
        />

        {/* Content Overlay - Text appears over the revealed video */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <div className="max-w-4xl bg-black/40 backdrop-blur-sm p-12 rounded-[3rem] border border-white/10">
            <motion.span 
              initial={{ letterSpacing: "0.5em" }}
              whileInView={{ letterSpacing: "0.2em" }}
              className="text-brand-orange font-black uppercase text-sm md:text-base mb-6 block"
            >
              {t.commitmentTitle}
            </motion.span>
            <h2 className="text-4xl md:text-8xl font-black text-white mb-8 leading-[1.1]">
              {t.commitmentSubtitle.split(' ').map((word: string, i: number) => (
                <React.Fragment key={i}>
                  {word === 'सम्झौता' || word === 'Compromise' ? (
                    <span className="text-brand-orange drop-shadow-[0_0_30px_rgba(255,107,0,0.5)]">{word}</span>
                  ) : word}
                  {' '}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
              {t.commitmentDesc}
            </p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
        >
            <div className="text-white/50 text-[10px] tracking-[0.3em] font-black uppercase">Start Reveal</div>
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