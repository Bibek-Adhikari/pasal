import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Binayak Suppliers | विनायक सप्लायर्स - Construction Materials in Jhapa",
  description: "Binayak Suppliers (विनायक सप्लायर्स) in Kamal-2, Campa Chowk, Jhapa. 10 years of trust in providing quality Cement, Steel, Paints, Plumbing, and Electrical materials.",
  keywords: "Binayak Suppliers, विनायक सप्लायर्स, Construction Materials Jhapa, Hardware Store Jhapa, Cement Steel Jhapa, Paints Jhapa, Plumbing Jhapa, Electricals Jhapa, Kamal-2 Jhapa, Campa Chowk Jhapa, निर्माण सामग्री झापा",
  authors: [{ name: "Binayak Suppliers" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://ais-dev-3jynubjbbirhjktb4m4t3x-525016269089.asia-southeast1.run.app",
  },
  openGraph: {
    type: "website",
    url: "https://ais-dev-3jynubjbbirhjktb4m4t3x-525016269089.asia-southeast1.run.app",
    title: "Binayak Suppliers | विनायक सप्लायर्स - Construction Materials in Jhapa",
    description: "A decade of trust in construction materials. Quality Cement, Steel, Paints, and more in Kamal-2, Jhapa.",
    images: [
      {
        url: "./public./02image.wabp",
        width: 1200,
        height: 630,
        alt: "Binayak Suppliers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binayak Suppliers | विनायक सप्लायर्स - Construction Materials in Jhapa",
    description: "A decade of trust in construction materials. Quality Cement, Steel, Paints, and more in Kamal-2, Jhapa.",
    images: ["./public/03image.wabp"],
  },
  icons: {
    icon: "/ganesh.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ne">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HardwareStore",
              "name": "Binayak Suppliers",
              "alternateName": "विनायक सप्लायर्स",
              "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
              "@id": "https://ais-dev-3jynubjbbirhjktb4m4t3x-525016269089.asia-southeast1.run.app",
              "url": "https://ais-dev-3jynubjbbirhjktb4m4t3x-525016269089.asia-southeast1.run.app",
              "telephone": "+9779800000000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Campa Chowk, Kamal-2",
                "addressLocality": "Jhapa",
                "addressRegion": "Koshi",
                "addressCountry": "NP"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.6667,
                "longitude": 87.8333
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Sunday"
                ],
                "opens": "08:00",
                "closes": "19:00"
              },
              "sameAs": [
                "https://www.facebook.com/binayaksuppliers"
              ]
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
