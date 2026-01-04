
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, MapPin, BarChart3, Clock } from 'lucide-react';

export const Benefits: React.FC = () => {
  const items = [
    {
      title: "Bank-Grade Security",
      desc: "Your patient data is secure and protected with elite encryption.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      size: "col-span-1 row-span-1",
      bg: "bg-blue-50"
    },
    {
      title: "24/7 Smart Booking",
      desc: "Appointments scheduled even while you sleep. Our system works around the clock to fill your calendar.",
      icon: <Clock className="w-6 h-6 text-primary" />,
      size: "md:col-span-2 row-span-1",
      bg: "bg-slate-50",
      featured: true
    },
    {
      title: "US-Based Support",
      desc: "Get help when you need it from our team in the USA.",
      icon: <HeartHandshake className="w-6 h-6 text-primary" />,
      size: "col-span-1 row-span-1",
      bg: "bg-blue-50"
    },
    {
      title: "Real-time Analytics",
      desc: "See exactly how many leads and patients your OS is generating.",
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      size: "col-span-1 row-span-1",
      bg: "bg-slate-50"
    },
    {
      title: "Lightning Fast Setup",
      desc: "Go live in under 14 days with zero technical stress.",
      icon: <Zap className="w-6 h-6 text-primary" />,
      size: "col-span-1 row-span-1",
      bg: "bg-blue-50"
    },
    {
      title: "Local SEO Dominance",
      desc: "We ensure you are the top choice in your neighborhood for key searches.",
      icon: <MapPin className="w-6 h-6 text-primary" />,
      size: "col-span-1 row-span-1",
      bg: "bg-slate-50"
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Everything Your Practice Needs to Scale.
            </h2>
            <p className="text-lg text-slate-600">
              One platform. Infinite growth. Built specifically for medical professionals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`${item.size} ${item.bg} p-8 rounded-3xl border border-slate-100 flex flex-col justify-between group hover:border-primary/20 transition-all`}
            >
              <div className="mb-6">
                <div className="bg-white p-3 rounded-2xl w-fit shadow-sm mb-4 group-hover:shadow-md transition-shadow">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
              {item.featured && (
                <div className="mt-4 flex items-center justify-between">
                   <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-300" />)}
                   </div>
                   <span className="text-xs font-bold text-primary">Live Activity</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
