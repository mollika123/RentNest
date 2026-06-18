
"use client"
import React from "react";
import { Card } from "@heroui/react";
import { ShieldCheck, Wallet, Zap, BarChart3 } from "lucide-react";
import Logo from "./Logo";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Wallet className="w-6 h-6 text-primary animate-pulse" />,
      title: "Effortless Rent Collection",
      description:
        "Automate your monthly invoices, accept secure digital payments, and completely eliminate the hassle of chasing paper checks.",
      glowColor: "group-hover:shadow-primary/20",
      iconBg: "bg-primary/10",
    },
    {
      icon: <Zap className="w-6 h-6 text-success" />,
      title: "Instant Tenant Screening",
      description:
        "Minimize risks with our integrated background, credit, and eviction checks to find reliable renters in just minutes.",
      glowColor: "group-hover:shadow-success/20",
      iconBg: "bg-success/10",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-warning" />,
      title: "Real-Time Financial Insights",
      description:
        "Track cash flow, log expenses, and generate tax-ready financial reports seamlessly across your entire property portfolio.",
      glowColor: "group-hover:shadow-warning/20",
      iconBg: "bg-warning/10",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-danger" />,
      title: "Centralized Document Hub",
      description:
        "Keep lease agreements, tenant maintenance requests, and critical property data stored safely in one secure, accessible nest.",
      glowColor: "group-hover:shadow-danger/20",
      iconBg: "bg-danger/10",
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-background ">
      {/* Premium Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 select-none bg-primary">
        <div className="absolute top-12 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
            initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
          
          className="flex flex-col items-center text-center mb-20 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="w-1.5 h-1.5 rounded-full  animate-ping" />
            Why <span>Rent<span className="text-blue-600">Nest</span></span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground bg-clip-text max-w-3xl leading-tight">
            Take the Chaos Out of{" "}
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Property Management
            </span>
          </h2>
          
          <p className="text-default-500 max-w-2xl text-lg font-normal leading-relaxed">
            Whether you manage a single unit or a growing real estate empire, 
            RentNest gives you the smart tools you need to streamline operations.
          </p>
        </motion.div>

        {/* Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden border border-default-200/60 bg-background/50 dark:bg-default-50/50 backdrop-blur-xl p-1 transition-all duration-500 hover:-translate-y-2 hover:border-default-400 hover:shadow-2xl ${feature.glowColor} cursor-pointer`}
            >
              <Card.Content className="p-8 flex flex-col h-full justify-between space-y-6">
                <div className="space-y-5">
                  {/* Styled Icon Container with dynamic backdrop */}
                  <div className={`p-3.5 w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-inner`}>
                    {feature.icon}
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-default-500 dark:text-default-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Subtle Modern Bottom Indicator */}
                <div className="pt-4 flex items-center text-xs font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  Learn more <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Card.Content>

              {/* Decorative Card Border Light Effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/10 rounded-large pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}