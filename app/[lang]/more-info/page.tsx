import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Store, 
  ShieldCheck, 
  Target, 
  BadgePercent 
} from 'lucide-react';
import Link from 'next/link';
import { translations } from '@/constants/translations';
import { Language } from '@/components/AppProvider';

export default async function MoreInfoPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const t = translations[lang].moreInfoPage;
  const commonT = translations[lang];

  const featureIcons = [ShieldCheck, Target, BadgePercent];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link 
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-brand-blue dark:text-blue-400 font-bold hover:text-brand-orange transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          {lang === 'ne' ? 'फिर्ता जानुहोस्' : 'Back to Home'}
        </Link>

        {/* Header Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-slate-800 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
            <Store size={120} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            {t.title}
          </h1>
          <div className="w-20 h-2 bg-brand-orange rounded-full mb-8"></div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-brand-blue dark:text-blue-400 mb-4">
              {t.about_us.heading}
            </h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-lg">
              {t.about_us.description}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {t.features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <div 
                key={i}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 hover:border-brand-orange/30 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Visit Us Section */}
        <div className="bg-brand-blue dark:bg-blue-900/40 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-blue-800 opacity-50 dark:opacity-20 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <p className="text-blue-100 mb-4 text-lg italic">
                "{t.visit_us.note}"
              </p>
              <h2 className="text-2xl md:text-3xl font-black mb-0">
                {t.visit_us.call_to_action}
              </h2>
            </div>
            <div className="shrink-0">
              <Link 
                href={`/${lang}#contact`}
                className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-lg hover:scale-105 active:scale-95 block text-center"
              >
                {lang === 'ne' ? 'लोकेसन हेर्नुहोस्' : 'View Location'}
              </Link>
            </div>
          </div>
        </div>

        {/* Professional Footer Details */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 text-center">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-slate-500 font-bold mb-1">Registration</p>
            <p className="text-gray-900 dark:text-slate-200 font-bold text-sm">{t.footer_details.pan}</p>
          </div>
          <div className="bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 text-center">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-slate-500 font-bold mb-1">Experience</p>
            <p className="text-gray-900 dark:text-slate-200 font-bold text-sm">{t.footer_details.estd}</p>
          </div>
          <div className="bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 text-center col-span-2 md:col-span-1">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-slate-500 font-bold mb-1">Location</p>
            <p className="text-gray-900 dark:text-slate-200 font-bold text-sm truncate">{t.footer_details.location}</p>
          </div>
          <div className="bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 text-center col-span-2 md:col-span-1">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-slate-500 font-bold mb-1">Support</p>
            <p className="text-gray-900 dark:text-slate-200 font-bold text-sm">{t.footer_details.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
