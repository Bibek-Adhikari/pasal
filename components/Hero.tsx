"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight, Clock, Award, ShieldCheck } from 'lucide-react';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';

export const Hero = () => {
  const { lang } = useApp();
  const t = translations[lang];

  return (
    <section id="home" className="relative min-h-[100svh] flex items-start md:items-center pt-28 md:pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/01image.webp" 
          alt="Construction Site" 
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-blue/40 dark:from-slate-950/90 dark:to-slate-950/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block bg-brand-orange text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 tracking-wide shadow-lg shadow-orange-500/20">
              {t.estd}
            </span>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1]">
              {t.tagline.split(', ').map((part, i) => (
                <React.Fragment key={i}>
                  {i === 1 ? <span className="text-brand-orange">{part}</span> : part}
                  {i === 0 && <br className="hidden md:block" />}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-xl font-medium">
              {t.heroDesc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/services" 
                className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-orange-500/30 active:scale-95"
              >
                {t.ourProducts} <ChevronRight size={20} />
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {t.nav.contact}
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-12 md:mt-16">
            {[
              { label: t.yearsTrust, value: '10+', icon: Clock },
              { label: t.happyClients, value: '5000+', icon: Award },
              { label: t.qualityCheck, value: '100%', icon: ShieldCheck },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 p-3 md:p-4 rounded-2xl text-white"
              >
                <stat.icon className="text-brand-orange mb-2 w-5 h-5 md:w-6 md:h-6" />
                <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
