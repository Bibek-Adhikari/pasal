import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HardHat, PaintBucket, Zap, ChevronRight } from 'lucide-react';
import { translations } from '../constants/translations';

// Static server component for SEO
export const ProductSection = ({ lang = 'en' }: { lang?: 'en' | 'ne' }) => {
  const t = translations[lang];
  const icons = [HardHat, PaintBucket, Zap];
  const colors = ["bg-blue-50 dark:bg-blue-900/20 text-brand-blue dark:text-blue-400", "bg-orange-50 dark:bg-orange-900/20 text-brand-orange", "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"];
  const images = [
    "/05image.webp", 
    "/o6image.webp", 
    "/01image.webp"
  ];

  const categoryDescriptions = [
    "Cement, Steel, TMT Bars, Sand, Aggregates - Quality building materials for construction",
    "Asian Paints, Nerolac, Building Paints, Interior Exterior paints - Premium paint finishes",
    "Complete electrical solutions - wires, cables, switches, lights, fans"
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
            <article 
              key={i}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 transition-all"
            >
              <div className="h-56 overflow-hidden relative">
                <Image 
                  src={images[i]} 
                  alt={`${cat.title} - ${cat.subtitle} - Binayak Suppliers Jhapa`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
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
                <Link 
                  href={`/${lang}/more-info`}
                  className="flex items-center gap-2 font-bold text-brand-blue dark:text-blue-400 hover:text-brand-orange transition-colors" 
                  aria-label={`Learn more about ${cat.title}`}
                >
                  {t.moreInfo} <ChevronRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {/* Structured Data for Products */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Construction Materials",
              "description": "Quality construction materials including Cement, Steel, Paints, Plumbing and Electrical supplies",
              "itemListElement": t.categories.map((cat, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "Product",
                  "name": cat.title,
                  "description": cat.description,
                  "image": images[i]
                }
              }))
            }),
          }}
        />
      </div>
    </section>
  );
};
