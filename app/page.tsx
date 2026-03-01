"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Phone, 
  MapPin, 
  HardHat, 
  PaintBucket, 
  Droplets, 
  Zap, 
  Menu, 
  X, 
  Play, 
  Pause, 
  MessageCircle, 
  ChevronRight,
  ShieldCheck,
  Clock,
  Award,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { generateStoreAudio } from '../services/geminiService';
import { translations } from '../constants/translations';

type Language = 'ne' | 'en';
type Theme = 'light' | 'dark';

// --- Components ---

const Header = ({ lang, setLang, theme, toggleTheme }: { 
  lang: Language, 
  setLang: (l: Language) => void,
  theme: Theme,
  toggleTheme: () => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(lang === 'ne' ? 'en' : 'ne');

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-brand-orange p-1.5 rounded-lg shadow-lg shadow-orange-500/20">
            <HardHat className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className={`font-bold text-xl leading-none transition-colors ${isScrolled ? 'text-brand-blue dark:text-blue-400' : 'text-white'}`}>
              {t.brand}
            </h1>
            <p className={`text-[10px] uppercase tracking-widest font-bold mt-0.5 ${isScrolled ? 'text-gray-500 dark:text-slate-400' : 'text-white/80'}`}>
              {t.brandEn}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6 font-semibold">
            {[
              { id: 'home', label: t.nav.home },
              { id: 'products', label: t.nav.products },
              { id: 'about', label: t.nav.about },
              { id: 'contact', label: t.nav.contact }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className={`transition-all hover:scale-105 ${isScrolled ? 'text-gray-600 dark:text-slate-300 hover:text-brand-orange' : 'text-white hover:text-brand-orange'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLang}
              aria-label="Toggle Language"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all font-bold text-sm ${
                isScrolled 
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
                isScrolled 
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

        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full border transition-colors ${isScrolled ? 'border-gray-200 dark:border-slate-700 text-brand-blue dark:text-blue-400' : 'border-white/30 text-white'}`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button 
            onClick={toggleLang}
            aria-label="Toggle Language"
            className={`p-2 rounded-full border transition-colors ${isScrolled ? 'border-gray-200 dark:border-slate-700 text-brand-blue dark:text-blue-400' : 'border-white/30 text-white'}`}
          >
            <Globe size={18} />
          </button>
          <button 
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-brand-blue dark:text-blue-400' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-brand-blue dark:text-blue-400' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-xl border-t border-gray-100 dark:border-slate-800 p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'products', label: t.nav.products },
                { id: 'about', label: t.nav.about },
                { id: 'contact', label: t.nav.contact }
              ].map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  className="text-lg font-semibold text-gray-800 dark:text-slate-200 border-b border-gray-50 dark:border-slate-800 pb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="tel:+9779800000000" 
                className="bg-brand-blue dark:bg-blue-600 text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 mt-2"
              >
                <Phone size={20} />
                {t.callNow}: 98000-00000
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <section id="home" className="relative min-h-[100svh] flex items-start md:items-center pt-28 md:pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
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
              <a 
                href="#products" 
                className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-orange-500/30 active:scale-95"
              >
                {t.ourProducts} <ChevronRight size={20} />
              </a>
              <a 
                href="#contact" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {t.nav.contact}
              </a>
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

const AudioPlayer = ({ lang }: { lang: Language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = translations[lang];

  // Reset audio when language changes
  useEffect(() => {
    setAudioUrl(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [lang]);

  const togglePlay = async () => {
    if (!audioUrl && !isLoading) {
      setIsLoading(true);
      try {
        const url = await generateStoreAudio(t.audioScript);
        if (url) {
          setAudioUrl(url);
        }
      } catch (error) {
        console.error("Failed to generate audio:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current && !isPlaying) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      setIsPlaying(true);
    }
  }, [audioUrl]);

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 flex items-center gap-4 max-w-sm mx-auto md:mx-0">
      <button 
        onClick={togglePlay}
        disabled={isLoading}
        aria-label={isPlaying ? "Pause Story" : "Play Story"}
        className="w-14 h-14 bg-brand-blue dark:bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-800 dark:hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 active:scale-95"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : isPlaying ? (
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
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}
    </div>
  );
};

const ServiceSection = ({ lang }: { lang: Language }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "inset(15% 15% 15% 15% round 60px)", 
      "inset(0% 0% 0% 0% round 0px)", 
      "inset(0% 0% 0% 0% round 0px)", 
      "inset(15% 15% 15% 15% round 60px)"
    ]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7582/ingest/fb95cb2d-41e4-4f88-8004-a78d481248c5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'd02641',
      },
      body: JSON.stringify({
        sessionId: 'd02641',
        runId: 'run1',
        hypothesisId: 'H3',
        location: 'app/page.tsx:ServiceSection',
        message: 'ServiceSection mounted',
        data: {
          hasWindow: typeof window !== 'undefined',
          videoSrc: '/01videl.mp4',
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, []);

  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    // #region agent log
    fetch('http://127.0.0.1:7582/ingest/fb95cb2d-41e4-4f88-8004-a78d481248c5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'd02641',
      },
      body: JSON.stringify({
        sessionId: 'd02641',
        runId: 'run1',
        hypothesisId: 'H1',
        location: 'app/page.tsx:ServiceSection:onLoadedData',
        message: 'ServiceSection video loaded',
        data: {
          readyState: target.readyState,
          videoWidth: target.videoWidth,
          videoHeight: target.videoHeight,
          currentSrc: target.currentSrc,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    // #region agent log
    fetch('http://127.0.0.1:7582/ingest/fb95cb2d-41e4-4f88-8004-a78d481248c5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'd02641',
      },
      body: JSON.stringify({
        sessionId: 'd02641',
        runId: 'run1',
        hypothesisId: 'H2',
        location: 'app/page.tsx:ServiceSection:onError',
        message: 'ServiceSection video error',
        data: {
          networkState: target.networkState,
          errorCode: target.error ? target.error.code : null,
          currentSrc: target.currentSrc,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  };

  return (
    <section ref={containerRef} className="py-32 bg-slate-950 relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          style={{ opacity, y: textY }}
          className="max-w-3xl"
        >
          <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm mb-6 block">
            {lang === 'ne' ? 'हाम्रो प्रतिबद्धता' : 'OUR COMMITMENT'}
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1]">
            {lang === 'ne' ? 'गुणस्तरमा कहिल्यै सम्झौता छैन' : 'Never Compromise on Quality'}
          </h2>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-xl">
            {lang === 'ne' 
              ? 'दशकौंसम्म टिक्ने बलियो संरचनाको लागि हामी उत्कृष्ट निर्माण सामग्रीहरू मात्र छनोट गर्छौं।' 
              : 'We select only the finest construction materials for structures that last for decades.'}
          </p>
        </motion.div>
      </div>

      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div 
          initial={{ clipPath: "inset(15% 15% 15% 15% round 60px)" }}
          style={{ clipPath }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            className="w-full h-full object-cover"
          >
            <source src="/01videl.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/50 to-slate-950 pointer-events-none" />
          <div className="absolute inset-0 bg-brand-blue/30 mix-blend-overlay pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-brand-orange/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-brand-blue/20 rounded-full blur-[150px] animate-pulse delay-700"></div>
    </section>
  );
};

const ProductSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const icons = [HardHat, PaintBucket, Zap];
  const colors = ["bg-blue-50 dark:bg-blue-900/20 text-brand-blue dark:text-blue-400", "bg-orange-50 dark:bg-orange-900/20 text-brand-orange", "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"];
  const images = [
    "/05image.webp", 
    "/o6image.webp", 
    "/01image.webp"
  ];

  return (
    <section id="products" className="py-24 bg-white dark:bg-slate-950">
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

const AboutSection = ({ lang }: { lang: Language }) => {
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

            <AudioPlayer lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="bg-brand-blue dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-transparent dark:border-slate-800">
          <div className="md:w-1/2 p-12 md:p-20 text-white">
            <h2 className="text-4xl font-bold mb-8">{t.contactTitle}</h2>
            <p className="text-white/70 mb-12 text-lg">
              {t.contactDesc}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <MapPin className="text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{t.address}</h4>
                  <p className="text-white/70">{t.addressValue}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <Phone className="text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{t.phone}</h4>
                  <p className="text-white/70">+977 9842692437</p>
                  <p className="text-white/70">+977 9842690562</p>
                  <p className="text-white/70">+977 9817015744</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 bg-gray-100 dark:bg-slate-800 min-h-[400px] relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-full shadow-xl mb-6">
                <MapPin size={48} className="text-brand-blue dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">{t.ourLocation}</h3>
              <p className="text-gray-600 dark:text-slate-400 mb-6">{t.addressValue}</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-blue dark:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
              >
                {t.viewOnMaps}
              </a>
            </div>
            <Image 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
              alt="Map" 
              fill
              className="object-cover opacity-20 dark:opacity-10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-brand-orange p-1.5 rounded-lg">
                <HardHat className="text-white w-6 h-6" />
              </div>
              <h1 className="font-bold text-2xl">{t.brand}</h1>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed mb-8">
              {t.footerDesc}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-brand-orange transition-colors">{t.nav.home}</a></li>
              <li><a href="#products" className="hover:text-brand-orange transition-colors">{t.nav.products}</a></li>
              <li><a href="#about" className="hover:text-brand-orange transition-colors">{t.nav.about}</a></li>
              <li><a href="#contact" className="hover:text-brand-orange transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-brand-orange" />
                {t.addressValue}
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-orange" />
                +977 98000-00000
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {t.brand}. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <a 
      href="https://wa.me/9779800000000?text=Namaste%20Vinayak%20Suppliers%2C%20I%20have%20an%20inquiry..." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
    >
      <MessageCircle size={32} fill="currentColor" />
      <span className="absolute right-full mr-4 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 px-4 py-2 rounded-xl font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100 dark:border-slate-700">
        {t.chatWithUs}
      </span>
    </a>
  );
};

// --- Main App ---

export default function Home() {
  const [lang, setLang] = useState<Language>('ne');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Default to light unless explicitly saved as dark
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  return (
    <div className="min-h-screen selection:bg-brand-orange/30 selection:text-brand-blue dark:selection:text-blue-400">
      <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero lang={lang} />
        <ProductSection lang={lang} />
        <ServiceSection lang={lang} />
        <AboutSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
