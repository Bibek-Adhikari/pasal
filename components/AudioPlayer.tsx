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
    <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 flex items-center gap-4 max-w-sm mx-auto md:mx-0">
      <button 
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause Story" : "Play Story"}
        className="w-14 h-14 bg-brand-blue dark:bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-800 dark:hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
      >
        {isPlaying ? (
          <Pause fill="currentColor" size={24} />
        ) : (
          <Play fill="currentColor" size={24} className="ml-1" />
        )}
      </button>
      <div className="flex-1">
        <h4 className="font-bold text-gray-800 dark:text-slate-200">{t.listenStory}</h4>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
          {lang === 'ne' ? 'Listen to our Story' : 'हाम्रो बारेमा सुन्नुहोस्'}
        </p>
        <div className="flex gap-1 mt-2 items-end h-4">
          {[...Array(12)].map((_, i) => (
            <motion.div 
              key={i} 
              animate={isPlaying ? { height: [4, 16, 8, 12, 4] } : { height: 4 }}
              transition={isPlaying ? { repeat: Infinity, duration: 0.8, delay: i * 0.05 } : {}}
              className={`w-1 rounded-full transition-colors ${isPlaying ? 'bg-brand-orange' : 'bg-gray-200 dark:bg-slate-700'}`}
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
