import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { CommitmentSection } from "@/components/CommitmentSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function RootPage() {
  return (
    <>
      <Hero />
      <ProductSection />
      <CommitmentSection />
      {/* <ServiceSection /> */}
      <AboutSection />
      <ContactSection />
    </>
  );
}
