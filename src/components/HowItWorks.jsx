import React from "react";
import { Card } from "@heroui/react";
import { Home, UserPlus, CreditCard } from "lucide-react";
import * as motion from "framer-motion/client";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <Home className="w-6 h-6 text-violet-400" />,
      bgIcon: "bg-violet-500/10 border-violet-500/20",
      title: "List Your Properties",
      description: "Add your apartments, houses, or commercial spaces into RentNest with full details in minutes.",
    },
    {
      step: "02",
      icon: <UserPlus className="w-6 h-6 text-emerald-400" />,
      bgIcon: "bg-emerald-500/10 border-emerald-500/20",
      title: "Invite Your Tenants",
      description: "Send a quick digital invitation link to your renters via email or SMS for automated screening.",
    },
    {
      step: "03",
      icon: <CreditCard className="w-6 h-6 text-amber-400" />,
      bgIcon: "bg-amber-500/10 border-amber-500/20",
      title: "Collect Rent Automatically",
      description: "Sit back while rent is securely transferred directly to your bank account every month.",
    },
  ];

  return (
    /* সেকশনে bg-slate-950 এবং text-white নিশ্চিত করা হয়েছে যাতে সাদা ব্যাকগ্রাউন্ডেও ডার্ক মোড কাজ করে */
    <section className="bg-slate-950 text-white py-24 px-6 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-violet-500 font-extrabold"
          >
            Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Getting Started is Simple
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-violet-600 rounded-full"
          />
          <p className="text-slate-400 max-w-xl text-sm pt-2">
            Three easy steps to completely automate your entire rental workflow.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <Card className="border border-slate-600/80 bg-slate-900 shadow-xl rounded-2xl hover:border-slate-700/60 transition-all duration-300 p-6 flex flex-col gap-5 h-full w-full relative overflow-hidden group">
                
                {/* ব্যাকগ্রাউন্ড নম্বর */}
                <span className="absolute -top-2 -right-2 text-8xl font-black text-white/[0.03] group-hover:text-white/[0.06] select-none pointer-events-none transition-all duration-300">
                  {item.step}
                </span>

                {/* আইকন বক্স */}
                <div className={`p-3 w-12 h-12 rounded-xl border flex items-center justify-center shadow-inner ${item.bgIcon}`}>
                  {item.icon}
                </div>

                {/* টেক্সট কন্টেন্ট */}
                <div className="space-y-2 flex-grow">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-violet-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}