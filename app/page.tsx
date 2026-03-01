import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { ServiceSection } from "@/components/ServiceSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function RootPage() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="services">
        <ProductSection />
        <ServiceSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </>
  );
}
