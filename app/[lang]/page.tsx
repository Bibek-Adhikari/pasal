import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { CommitmentSection } from "@/components/CommitmentSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { ScrollHandler } from "@/components/ScrollHandler";

export default async function RootPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <>
      <ScrollHandler />
      <Hero />
      <ProductSection />
      <CommitmentSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
