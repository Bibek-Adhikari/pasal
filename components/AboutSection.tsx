"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';
import { AudioPlayer } from './AudioPlayer';

export const AboutSection = () => {
  const { lang } = useApp();
  const t = translations[lang];
  const aboutImages = ["/01image.webp", "/02image.webp", "/03image.webp", "/04image.webp", "/05image.webp", "/ganesh.png"];
  const [randomImage, setRandomImage] = useState(aboutImages[0]);

  useEffect(() => {
    const random = aboutImages[Math.floor(Math.random() * aboutImages.length)];
    setRandomImage(random);
  }, []);

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-video">
              <Image 
                src={randomImage} 
                alt="About Us" 
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-orange rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-blue rounded-full opacity-10 blur-3xl"></div>
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 hidden md:block">
              <div className="text-4xl font-black text-brand-blue dark:text-blue-400">10</div>
              <div className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest">{t.yearsTrust}</div>
            </div>
          </div>

          <div className="md:w-1/2">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">{lang === 'ne' ? 'हाम्रो कथा' : 'OUR STORY'}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8 leading-tight">
              {t.aboutTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-slate-400 mb-8 leading-relaxed">
              {t.aboutDesc}
            </p>
            
            <div className="space-y-6 mb-10">
              {t.aboutPoints.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-1 rounded-full">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <AudioPlayer />
          </div>
        </div>
      </div>
    </section>
  );
};
