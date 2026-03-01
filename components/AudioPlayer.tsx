"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';

export const AudioPlayer = () => {
  const { lang } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = translations[lang];
  const audioUrl = "/dokan.wav";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-5 rounded-[2rem] border border-white/20 dark:border-slate-800/50 flex items-center gap-5 shadow-2xl shadow-blue-500/5">
      <button 
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause Story" : "Play Story"}
        className="w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-2xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20 group"
      >
        {isPlaying ? (
          <Pause fill="currentColor" size={28} />
        ) : (
          <Play fill="currentColor" size={28} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
        )}
      </button>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 dark:text-slate-100 text-lg leading-tight mb-0.5">{t.listenStory}</h4>
        <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
          {lang === 'ne' ? 'Listen to our Story' : 'हाम्रो बारेमा सुन्नुहोस्'}
        </p>
        <div className="flex gap-1.5 mt-3 items-end h-5">
          {[...Array(16)].map((_, i) => (
            <motion.div 
              key={i} 
              animate={isPlaying ? { height: [4, 20, 8, 16, 4] } : { height: 4 }}
              transition={isPlaying ? { repeat: Infinity, duration: 1, delay: i * 0.05 } : {}}
              className={`w-1 rounded-full ${isPlaying ? 'bg-brand-orange' : 'bg-gray-300 dark:bg-slate-700'}`}
            ></motion.div>
          ))}
        </div>
      </div>
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
};
