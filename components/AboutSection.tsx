"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';

export const AboutSection = () => {
  const { lang } = useApp();
  const t = translations[lang];
  const aboutImages = ["/01image.webp", "/02image.webp", "/03image.webp", "/04image.webp", "/05image.webp", "/ganesh.png"];
  const [randomImage, setRandomImage] = useState(aboutImages[0]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/dokan.wav');
      audioRef.current.loop = true;
    }
    
    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const random = aboutImages[Math.floor(Math.random() * aboutImages.length)];
    setRandomImage(random);
  }, []);

  return (
    <section id="about" className="py-10 bg-gray-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Static content for SEO - server rendered image */}
          <div className="md:w-1/2 flex flex-col gap-10">
            <div className="relative group">
              <div 
                className="relative z-10 overflow-hidden shadow-2xl aspect-[4/3]"
                style={{ clipPath: "inset(0% 0% 0% 0% round 40px 120px 30px 120px)" }}
              >
                <Image 
                  src={randomImage} 
                  alt="Binayak Suppliers Store - Hardware and Construction Materials Shop in Kamal-2 Jhapa Nepal"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-14 -right-14 w-72 h-72 bg-brand-blue/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
              
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl border border-gray-100/50 dark:border-slate-800/50 hidden md:block z-20">
                <div className="text-5xl font-black text-brand-blue dark:text-blue-400 leading-none mb-1">10</div>
                <div className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.2em]">{t.yearsTrust}</div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">{lang === 'ne' ? 'हाम्रो कथा' : 'OUR STORY'}</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-slate-100 mb-8 leading-[1.15]">
              {t.aboutTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-slate-400 mb-4 leading-relaxed">
              {t.aboutDesc}
            </p>
            
            {/* Audio Play Button - accessibility improved */}
            <button
              onClick={toggleAudio}
              className="flex flex-col items-center gap-1 px-4 py-2 mb-6 rounded-full bg-gray-900/80 dark:bg-white/80 text-white dark:text-gray-900 font-semibold text-sm hover:bg-gray-800 dark:hover:bg-white transition-colors backdrop-blur-sm border border-gray-700 dark:border-gray-200"
              aria-label={playing ? "Pause our story audio" : "Listen to our story audio"}
              aria-pressed={playing}
            >
              {playing ? <VolumeX size={20} /> : <Volume2 size={20} />}
              <span className="text-xs whitespace-nowrap">{lang === 'ne' ? 'हाम्रो कथा' : 'Our Story'}</span>
            </button>
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.aboutPoints.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-2 rounded-xl transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-bold text-gray-800 dark:text-slate-200 text-sm leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
