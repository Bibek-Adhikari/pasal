"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone } from 'lucide-react';
import { scrollTo } from '@/services/navigation';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';

export const Footer = () => {
  const { lang } = useApp();
  const t = translations[lang];

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white pt-20 pb-10 border-t border-white/5" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => scrollTo('home')} className="flex items-center gap-2" aria-label="Vinayak Suppliers - Go to homepage">
                <Image src="/ganesh.png" alt="Vinayak Suppliers Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                <h1 className="font-bold text-2xl">{t.brand}</h1>
              </button>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed mb-8">
              {t.footerDesc}
            </p>
          </div>

          <nav aria-label="Quick Links">
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><button onClick={() => scrollTo('home')} className="hover:text-brand-orange transition-colors">{t.nav.home}</button></li>
              <li><button onClick={() => scrollTo('services')} className="hover:text-brand-orange transition-colors">{t.nav.products}</button></li>
              <li><button onClick={() => scrollTo('about')} className="hover:text-brand-orange transition-colors">{t.nav.about}</button></li>
              <li><button onClick={() => scrollTo('contact')} className="hover:text-brand-orange transition-colors">{t.nav.contact}</button></li>
            </ul>
          </nav>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-brand-orange" aria-hidden="true" />
                <address className="not-italic">{t.addressValue}</address>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-orange" aria-hidden="true" />
                <a href="tel:+9779842692437" className="hover:text-brand-orange transition-colors">+977 9842692437</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {t.brand}. All rights reserved.
          </p>
          <nav className="flex gap-6 text-gray-500 text-sm" aria-label="Footer navigation">
            <div className="flex flex-col md:flex-row items-center gap-2 text-gray-500 text-sm">
              <span>कमल-२, झापाको भरपर्दो नाम</span>
              <span className="hidden md:inline">•</span>
              <span>नेपालकै गुणस्तरीय निर्माण सामग्री</span>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};
