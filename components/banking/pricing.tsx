import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      workspaces: "1 Workspace",
      price: "Contact Us",
      features: [
        "Single department setup",
        "Web & mobile integration",
        "Basic analytics",
        "Email support",
        "1,000 queries/month",
      ],
    },
    {
      name: "Professional",
      workspaces: "Up to 5 Workspaces",
      price: "Contact Us",
      features: [
        "Multi-department setup",
        "WhatsApp integration",
        "Advanced analytics",
        "Priority support",
        "10,000 queries/month",
        "Custom branding",
      ],
    },
    {
      name: "Enterprise",
      workspaces: "Unlimited Workspaces",
      price: "Custom",
      features: [
        "Unlimited departments",
        "All integrations",
        "Custom AI training",
        "Dedicated support",
        "Unlimited queries",
        "Custom branding",
        "API access",
        "SLA guarantee",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Workspace-Based Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Pricing depends on the number of workspaces your bank creates. Scale
            as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-card rounded-2xl p-8 border-2 ${
                plan.popular
                  ? "border-primary shadow-xl scale-105"
                  : "border-border"
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  {plan.workspaces}
                </div>
                <div className="text-3xl font-bold">{plan.price}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center p-6 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Note:</span> Pricing
            automatically scales as your organization adds more workspaces.
            Contact our sales team for custom enterprise solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
