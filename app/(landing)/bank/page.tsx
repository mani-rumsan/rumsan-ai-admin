import { CTASection } from "@/components/bank/cta-section";
import { FeaturesSection } from "@/components/bank/feature-section";
import { Footer } from "@/components/bank/footer";
import { Header } from "@/components/bank/header";
import { HeroSection } from "@/components/bank/hero-section";
import { TestimonialsSection } from "@/components/bank/testinimial-section";

export default function BankHome() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
