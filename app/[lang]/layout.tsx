import type { Metadata, Viewport } from "next";
import "../globals.css";
import { AppProvider, Language } from "@/components/AppProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactMenu } from "@/components/FloatingContactMenu";
import { translations } from "@/constants/translations";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang as Language];

  return {
    title: {
      default: `${t.brand} | ${t.brandEn} - Construction Materials in Jhapa`,
      template: `%s | ${t.brandEn}`
    },
    description: t.heroDesc + " " + t.aboutDesc.substring(0, 100) + "...",
    keywords: ["Binayak Suppliers", "विनायक सप्लायर्स", "Construction Materials Jhapa", "Hardware Store Jhapa", "Cement Steel Jhapa", "Paints Jhapa", "Plumbing Jhapa", "Electricals Jhapa", "Kamal-2 Jhapa", "Campa Chowk Jhapa", "निर्माण सामग्री झापा", "Construction Materials Nepal", "Building Materials Supplier"],
    authors: [{ name: "Binayak Suppliers" }],
    creator: "Binayak Suppliers",
    publisher: "Binayak Suppliers",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://binayaksuppliers.com/${lang}`,
      languages: {
        en: "https://binayaksuppliers.com/en",
        ne: "https://binayaksuppliers.com/ne",
      },
    },
    openGraph: {
      type: "website",
      url: `https://binayaksuppliers.com/${lang}`,
      siteName: "Binayak Suppliers",
      title: `${t.brand} | ${t.brandEn} - Construction Materials in Jhapa`,
      description: t.heroDesc,
      locale: lang === 'ne' ? "ne_NP" : "en_NP",
      alternateLocale: lang === 'ne' ? "en_NP" : "ne_NP",
      images: [
        {
          url: "/03image.webp",
          width: 1200,
          height: 630,
          alt: "Binayak Suppliers - Construction Materials in Jhapa",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.brand} | ${t.brandEn} - Construction Materials in Jhapa`,
      description: t.heroDesc,
      creator: "@binayak_suppliers",
      images: ["/03image.webp"],
    },
    verification: {
      google: "google-site-verification-code",
    },
    category: "business",
    classification: "Hardware Store - Construction Materials",
    icons: {
      icon: "/ganesh.png",
      apple: "/ganesh.png",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HardwareStore",
              "name": "Binayak Suppliers",
              "alternateName": "विनायक सप्लायर्स",
              "description": "Binayak Suppliers in Kamal-2, Campa Chowk, Jhapa. 10 years of trust in providing quality Cement, Steel, Paints, Plumbing, and Electrical materials.",
              "image": "/02image.webp",
              "@id": "https://binayaksuppliers.com",
              "url": `https://binayaksuppliers.com/${lang}`,
              "telephone": "+9779842692437",
              "priceRange": "$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Campa Chowk, Kamal-2",
                "addressLocality": "Jhapa",
                "addressRegion": "Koshi",
                "addressCountry": "NP",
                "postalCode": "57200"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.6070982,
                "longitude": 87.7633676
              },
              "openingHoursSpecification": [{
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:00",
                "closes": "19:00"
              }],
              "sameAs": [
                "https://www.facebook.com/urmila.neupane.12"
              ],
              "areaServed": {
                "@type": "State",
                "name": "Koshi Province"
              },
              "serviceType": ["Cement", "Steel", "Paints", "Plumbing Materials", "Electrical Materials"],
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "4.8",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Local Customer"
                }
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Binayak Suppliers",
              "alternateName": "विनायक सप्लायर्स",
              "url": "https://binayaksuppliers.com",
              "logo": "/ganesh.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+9779842692437",
                "contactType": "sales",
                "availableLanguage": ["English", "Nepali"]
              }
            }),
          }}
        />
      </head>
      <body>
        <AppProvider initialLang={lang as Language}>
          <div className="selection:bg-brand-orange/30 selection:text-brand-blue dark:selection:text-blue-400">
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingContactMenu />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
