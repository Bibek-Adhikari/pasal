"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Globe, 
  Sun, 
  Moon, 
  Menu, 
  X, 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';

import { scrollTo } from '@/services/navigation';

export const Header = () => {
  const { lang, setLang, theme, toggleTheme, pathname } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = translations[lang];
  
  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver (no URL mutation)
  useEffect(() => {
    const sectionIds = ['home', 'services', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'ne' ? 'en' : 'ne';
    setLang(newLang);
  };

  const navItems = [
    { id: 'home',     label: t.nav.home },
    { id: 'services', label: t.nav.products },
    { id: 'about',    label: t.nav.about },
    { id: 'contact',  label: t.nav.contact },
  ];

  const navLinkClass = (id: string) =>
    `transition-all hover:scale-105 cursor-pointer select-none ${
      activeSection === id && isHomePage
        ? 'text-brand-orange'
        : theme === 'light'
          ? 'text-gray-800 hover:text-brand-orange'
          : (isScrolled || !isHomePage)
            ? 'text-gray-600 dark:text-slate-300 hover:text-brand-orange'
            : 'text-white hover:text-brand-orange'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        (isScrolled || !isHomePage)
          ? theme === 'light'
            ? 'bg-white/90 backdrop-blur-md shadow-md py-2'
            : 'bg-slate-900/90 backdrop-blur-md shadow-md py-2'
          : theme === 'light'
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-2'
            : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo — scrolls to top */}
        <Link
          href={`/${lang}`}
          onClick={(e: React.MouseEvent) => { 
            if (isHomePage) {
              e.preventDefault();
              scrollTo('home');
            }
          }}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="Go to top"
        >
          <Image src="/ganesh.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
          <div className="flex flex-col text-left">
            <h1 className={`font-bold text-xl leading-none transition-colors ${(isScrolled || !isHomePage) ? 'text-brand-blue dark:text-blue-400' : (theme === 'light' ? 'text-gray-800' : 'text-white')}`}>
              {t.brand}
            </h1>
            <p className={`text-[10px] uppercase tracking-widest font-bold mt-0.5 ${(isScrolled || !isHomePage) ? 'text-gray-500 dark:text-slate-400' : (theme === 'light' ? 'text-gray-600' : 'text-white/80')}`}>
              {t.brandEn}
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6 font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}${item.id === 'home' ? '' : `?section=${item.id}`}`}
                onClick={(e: React.MouseEvent) => {
                  if (isHomePage) {
                    e.preventDefault();
                    scrollTo(item.id);
                  }
                }}
                className={navLinkClass(item.id)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label="Toggle Language"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all font-bold text-sm ${
                theme === 'light'
                  ? 'border-gray-400 text-gray-800 bg-white/50 hover:bg-gray-100'
                  : (isScrolled || !isHomePage)
                    ? 'border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                    : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Globe size={16} />
              {lang === 'ne' ? 'English' : 'नेपाली'}
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-full border transition-all ${
                theme === 'light'
                  ? 'border-gray-400 text-gray-800 bg-white/50 hover:bg-gray-100'
                  : (isScrolled || !isHomePage)
                    ? 'border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                    : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          <a
            href="tel:+9779842692437"
            className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20 active:scale-95"
          >
            <Phone size={18} />
            9842692437
          </a>
        </div>

        {/* Mobile top-bar controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full border transition-colors ${
              theme === 'light'
                ? 'border-gray-400 text-gray-800 bg-white/50'
                : (isScrolled || !isHomePage)
                  ? 'border-gray-200 dark:border-slate-700 text-brand-blue dark:text-blue-400'
                  : 'border-white/30 text-white'
            }`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={toggleLang}
            aria-label="Toggle Language"
            className={`p-2 rounded-full border transition-colors ${
              theme === 'light'
                ? 'border-gray-400 text-gray-800 bg-white/50'
                : (isScrolled || !isHomePage)
                  ? 'border-gray-200 dark:border-slate-700 text-brand-blue dark:text-blue-400'
                  : 'border-white/30 text-white'
            }`}
          >
            <Globe size={18} />
          </button>
          <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className={theme === 'light' ? 'text-gray-800' : (isScrolled || !isHomePage) ? 'text-brand-blue dark:text-blue-400' : 'text-white'} />
            ) : (
              <Menu className={theme === 'light' ? 'text-gray-800' : (isScrolled || !isHomePage) ? 'text-brand-blue dark:text-blue-400' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-xl border-t border-gray-100 dark:border-slate-800 p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/${lang}${item.id === 'home' ? '' : `?section=${item.id}`}`}
                  onClick={(e: React.MouseEvent) => { 
                    if (isHomePage) {
                      e.preventDefault();
                      scrollTo(item.id); 
                    }
                    setIsMenuOpen(false); 
                  }}
                  className={`text-lg font-semibold border-b border-gray-50 dark:border-slate-800 pb-2 cursor-pointer ${
                    activeSection === item.id && isHomePage ? 'text-brand-orange' : 'text-gray-800 dark:text-slate-200'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+9779842692437"
                className="bg-brand-blue dark:bg-blue-600 text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 mt-2"
              >
                <Phone size={20} />
                {t.callNow}: 9842692437
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
