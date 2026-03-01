import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { ServiceSection } from "@/components/ServiceSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function RootPage() {
  return (
    <>
      <Hero />
      <ProductSection />
      <ServiceSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
