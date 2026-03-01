"use client";

import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { translations } from '../constants/translations';
import { useApp } from './AppProvider';

const MAP_CENTER = "26.607105,87.763373";
const MAP_ZOOM = 18;
const MAP_EMBED_SATELLITE = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || ""}&center=${MAP_CENTER}&zoom=${MAP_ZOOM}&maptype=satellite`;
const MAP_EMBED_FALLBACK = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.2!2d87.763373!3d26.607105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e59163c3ed73ed%3A0xd41955fa968114d!2sKyampa+Bazar!5e1!3m2!1sen!2snp!4v1700000000000";

export const ContactSection = () => {
  const { lang } = useApp();
  const t = translations[lang];
  const mapEmbedSrc = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY ? MAP_EMBED_SATELLITE : MAP_EMBED_FALLBACK;

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
            <iframe
              src={mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store location - Kyampa Bazar, Jhapa"
              className="absolute inset-0 w-full h-full"
            />
            <a
              href="https://www.google.com/maps/place/26%C2%B036'25.6%22N+87%C2%B045'48.1%22E/@26.6070438,87.7631557,40m/data=!3m1!1e3"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-lg text-sm font-semibold text-gray-800 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors z-10"
            >
              {t.viewOnMaps}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
