import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Veterinarian, Paws & Claws Clinic",
    company: "Paws & Claws Clinic",
    content:
      "Rumsan AI has transformed how we manage patient records. The AI-powered search saves us hours every week, and our clients love the automated appointment reminders. It's like having an extra team member who never sleeps.",
    initials: "SJ",
  },
  {
    name: "Dr. Michael Roberts",
    role: "Practice Owner, City Pet Hospital",
    company: "City Pet Hospital",
    content:
      "The diagnostic support feature is incredible. It helps our team catch potential issues earlier and provides valuable second opinions. Our accuracy has improved, and pet owners appreciate the thoroughness of our care.",
    initials: "MR",
  },
  {
    name: "Dr. Emily Chen",
    role: "Director of Operations, VetCare Plus",
    company: "VetCare Plus",
    content:
      "Implementation was seamless, and the ROI was immediate. We've reduced administrative overhead by 40% and can now focus more time on patient care. The compliance features give us peace of mind.",
    initials: "EC",
  },
  {
    name: "Dr. James Martinez",
    role: "Lead Veterinarian, Animal Wellness Center",
    company: "Animal Wellness Center",
    content:
      "The client portal has been a game-changer for engagement. Pet owners can access records anytime, and the AI assistant answers common questions 24/7. Our client satisfaction scores have never been higher.",
    initials: "JM",
  },
];

const trustedClinics = [
  "Paws & Claws Clinic",
  "City Pet Hospital",
  "VetCare Plus",
  "Animal Wellness Center",
  "Happy Tails Veterinary",
];

export function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
          Trusted by Leading Veterinary Clinics
        </h2>
        <p className="text-lg text-muted-foreground text-pretty">
          Join hundreds of veterinary practices improving pet care with AI
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {testimonials.map((testimonial, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {testimonial.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed italic">
              &quot;{testimonial.content}&quot;
            </p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
        {trustedClinics.map((clinic, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {clinic}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
