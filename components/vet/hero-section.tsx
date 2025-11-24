import { VetChatbot } from "./vet-chatbot";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Rumsan Veterinary Assistant
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Intelligent Veterinary Care, Simplified
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
            Deliver AI-powered document management, smart appointment
            scheduling, and personalized pet care recommendations for modern
            veterinary practices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Start Free Trial
            </button>
            <button className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="lg:pl-8">
          <VetChatbot />
        </div>
      </div>
    </section>
  );
}
