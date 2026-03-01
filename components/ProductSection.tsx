"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { HardHat, PaintBucket, Zap, ChevronRight } from 'lucide-react';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';

export const ProductSection = () => {
  const { lang } = useApp();
  const t = translations[lang];
  const icons = [HardHat, PaintBucket, Zap];
  const colors = ["bg-blue-50 dark:bg-blue-900/20 text-brand-blue dark:text-blue-400", "bg-orange-50 dark:bg-orange-900/20 text-brand-orange", "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"];
  const images = [
    "/05image.webp", 
    "/o6image.webp", 
    "/01image.webp"
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">{t.ourProducts}</h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {t.productDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.categories.map((cat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 transition-all"
            >
              <div className="h-56 overflow-hidden relative">
                <Image 
                  src={images[i]} 
                  alt={cat.title} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-4 left-4 p-3 rounded-2xl ${colors[i]} shadow-lg z-10`}>
                  {React.createElement(icons[i], { size: 24 })}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1">{cat.title}</h3>
                <p className="text-brand-orange font-semibold text-sm mb-4 uppercase tracking-wider">{cat.subtitle}</p>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">
                  {cat.description}
                </p>
                <button className="flex items-center gap-2 font-bold text-brand-blue dark:text-blue-400 hover:text-brand-orange transition-colors">
                  {t.moreInfo} <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
