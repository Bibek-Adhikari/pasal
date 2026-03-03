"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Clock, Award, ShieldCheck } from 'lucide-react';
import { translations } from '../constants/translations';

export default function HeroStats({ lang }: { lang: 'en' | 'ne' }) {
  const t = translations[lang];
  
  const stats = [
    { label: t.yearsTrust, value: '10+', icon: Clock },
    { label: t.happyClients, value: '5000+', icon: Award },
    { label: t.qualityCheck, value: '100%', icon: ShieldCheck },
  ];
  
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4 mt-12 md:mt-16">
      {stats.map((stat, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + idx * 0.1 }}
          className="bg-white/10 backdrop-blur-sm border border-white/10 p-3 md:p-4 rounded-2xl text-white"
        >
          {React.createElement(stat.icon, { className: "text-brand-orange mb-2 w-5 h-5 md:w-6 md:h-6" })}
          <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
          <div className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold opacity-80">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
