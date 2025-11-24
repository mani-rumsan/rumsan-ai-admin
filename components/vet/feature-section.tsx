import { Card } from "@/components/ui/card";
import { FileText, Calendar, Brain, Shield, Zap, Users } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Document Management",
    description:
      "AI-powered organization and retrieval of medical records, lab results, and treatment histories. Instantly access patient information with intelligent search.",
  },
  {
    icon: Calendar,
    title: "Intelligent Scheduling",
    description:
      "Automated appointment booking with smart conflict resolution. Optimize your clinic schedule and reduce no-shows with AI-driven reminders.",
  },
  {
    icon: Brain,
    title: "Diagnostic Support",
    description:
      "Get AI-assisted diagnostic suggestions based on symptoms, breed-specific conditions, and medical history. Enhance accuracy and speed of care.",
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    description:
      "HIPAA-compliant data management with enterprise-grade encryption. Automated compliance reporting and secure client communication.",
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description:
      "Track clinic performance, patient outcomes, and operational metrics. Make data-driven decisions to improve care quality and efficiency.",
  },
  {
    icon: Users,
    title: "Client Portal",
    description:
      "Empower pet owners with 24/7 access to records, appointment scheduling, and AI-powered pet care recommendations and reminders.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="container mx-auto px-4 py-16 md:py-24 bg-muted/30"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
          Powerful Features for Modern Veterinary Practice
        </h2>
        <p className="text-lg text-muted-foreground text-pretty">
          Everything you need to streamline your clinic and deliver exceptional
          pet care
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
