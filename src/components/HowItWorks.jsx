import React from "react";
import { Card } from "@heroui/react";
import { Home, UserPlus, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <Home className="w-6 h-6 text-primary" />,
      title: "List Your Properties",
      description: "Add your apartments, houses, or commercial spaces into RentNest with full details in minutes.",
    },
    {
      step: "02",
      icon: <UserPlus className="w-6 h-6 text-success" />,
      title: "Invite Your Tenants",
      description: "Send a quick digital invitation link to your renters via email or SMS for automated screening.",
    },
    {
      step: "03",
      icon: <CreditCard className="w-6 h-6 text-warning" />,
      title: "Collect Rent Automatically",
      description: "Sit back while rent is securely transferred directly to your bank account every month.",
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
          Process
        </h4>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground">
          Getting Started is Simple
        </h2>
        <p className="text-default-500 max-w-xl text-base">
          Three easy steps to completely automate your entire rental workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item, index) => (
          <Card key={index} className="border border-default-200 bg-background/50 backdrop-blur-md p-2">
            <Card.Content className="p-6 space-y-4 relative">
              {/* Step Number in Background */}
              <span className="absolute top-4 right-6 text-6xl font-black text-default-100 select-none pointer-events-none">
                {item.step}
              </span>

              <div className="p-3 w-12 h-12 rounded-xl bg-default-100 flex items-center justify-center">
                {item.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-default-400 leading-relaxed">{item.description}</p>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </section>
  );
}