import { CTASection } from "@/components/vet/cta-section";
import { FeaturesSection } from "@/components/vet/feature-section";
import { Footer } from "@/components/vet/footer";
import { Header } from "@/components/vet/header";
import { HeroSection } from "@/components/vet/hero-section";
import { TestimonialsSection } from "@/components/vet/testimonials-section";

export default function VetHome() {
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
