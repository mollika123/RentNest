"use client"
import React from "react";
import { Card } from "@heroui/react";
import { ShieldCheck, Wallet, Zap, BarChart3 } from "lucide-react";
import * as motion from "framer-motion/client";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Wallet className="w-6 h-6 text-violet-400" />,
      title: "Effortless Rent Collection",
      description:
        "Automate your monthly invoices, accept secure digital payments, and completely eliminate the hassle of chasing paper checks.",
      glowColor: "group-hover:border-violet-500/30 group-hover:shadow-violet-500/5",
      iconBg: "bg-violet-500/10 border-violet-500/20",
      accentText: "group-hover:text-violet-400"
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: "Instant Tenant Screening",
      description:
        "Minimize risks with our integrated background, credit, and eviction checks to find reliable renters in just minutes.",
      glowColor: "group-hover:border-emerald-500/30 group-hover:shadow-emerald-500/5",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
      accentText: "group-hover:text-emerald-400"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-amber-400" />,
      title: "Real-Time Financial Insights",
      description:
        "Track cash flow, log expenses, and generate tax-ready financial reports seamlessly across your entire property portfolio.",
      glowColor: "group-hover:border-amber-500/30 group-hover:shadow-amber-500/5",
      iconBg: "bg-amber-500/10 border-amber-500/20",
      accentText: "group-hover:text-amber-400"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
      title: "Centralized Document Hub",
      description:
        "Keep lease agreements, tenant maintenance requests, and critical property data stored safely in one secure, accessible nest.",
      glowColor: "group-hover:border-rose-500/30 group-hover:shadow-rose-500/5",
      iconBg: "bg-rose-500/10 border-rose-500/20",
      accentText: "group-hover:text-rose-400"
    },
  ];

  return (
    /* পুরো সেকশন ডার্ক থিম নিশ্চিত করা হয়েছে */
    <section className="relative bg-slate-950 text-white py-24 px-6 overflow-hidden w-full">
      
      {/* গ্লোবাল ব্যাকগ্রাউন্ড সফট ব্লার গ্লো (ফিক্সড) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div className="absolute top-12 left-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900 text-xs font-semibold uppercase tracking-wider text-violet-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Why RentNest
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-tight"
          >
            Take the Chaos Out of{" "}
            <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Property Management
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl text-base sm:text-lg font-normal leading-relaxed pt-2"
          >
            Whether you manage a single unit or a growing real estate empire, 
            RentNest gives you the smart tools you need to streamline operations.
          </motion.p>
        </div>

        {/* Grid Features (items-stretch গ্রিডের সব কার্ডের হাইট সমান রাখবে) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              {/* Card component fixed with premium dark classes */}
              <Card 
                className={`group relative overflow-hidden border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-6 flex flex-col h-full justify-between gap-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${feature.glowColor} cursor-pointer w-full rounded-2xl`}
              >
                <div className="space-y-5 flex-grow">
                  {/* আইকন কন্টেইনার উইথ সফট ইনার গ্লো */}
                  <div className={`p-3 w-12 h-12 rounded-xl border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-inner ${feature.iconBg}`}>
                    {feature.icon}
                  </div>
                  
                  {/* টেক্সট কন্টেন্ট */}
                  <div className="space-y-2.5">
                    <h3 className={`text-lg font-bold tracking-tight text-slate-100 transition-colors duration-300 ${feature.accentText}`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* লার্ন মোর ইন্ডিকেটর (কার্ডের একদম নিচে এলাইনড থাকবে) */}
                <div className={`pt-4 border-t border-slate-800/60 flex items-center text-xs font-semibold text-slate-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${feature.accentText}`}>
                  Learn more <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}