import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { CommitmentSection } from "@/components/CommitmentSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

import { Language } from "@/components/AppProvider";

export default async function RootPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Hero />
      <ProductSection lang={lang} />
      <CommitmentSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
