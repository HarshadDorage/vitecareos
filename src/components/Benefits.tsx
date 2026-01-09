
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, MapPin, BarChart3, Clock } from 'lucide-react';

export const Benefits: React.FC = () => {
  const items = [
    {
      title: "24/7 Smart Booking",
      desc: "Appointments scheduled even while you sleep. Our system works around the clock to fill your calendar with zero manual input.",
      icon: <Clock className="w-6 h-6 text-white" />,
      size: "md:col-span-2 md:row-span-2",
      bg: "bg-primary dark:bg-blue-600",
      textColor: "text-white",
      descColor: "text-blue-100",
      iconBg: "bg-white/20",
      featured: true
    },
    {
      title: "Bank-Grade Security",
      desc: "Your patient data is secure and protected with HIPAA-compliant AES-256 encryption.",
      icon: <ShieldCheck className="w-6 h-6 text-primary dark:text-blue-400" />,
      size: "md:col-span-1 md:row-span-1",
      bg: "bg-white dark:bg-slate-800",
      iconBg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Local SEO Dominance",
      desc: "Be the first choice in your neighborhood for key medical searches.",
      icon: <MapPin className="w-6 h-6 text-secondary dark:text-green-400" />,
      size: "md:col-span-1 md:row-span-1",
      bg: "bg-white dark:bg-slate-800",
      iconBg: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "US-Based Support",
      desc: "Get help when you need it from our dedicated success team in the USA.",
      icon: <HeartHandshake className="w-6 h-6 text-primary dark:text-blue-400" />,
      size: "md:col-span-1 md:row-span-1",
      bg: "bg-white dark:bg-slate-800",
      iconBg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Real-time Analytics",
      desc: "Full transparency into your ROI, patient growth, and booking trends.",
      icon: <BarChart3 className="w-6 h-6 text-orange-500" />,
      size: "md:col-span-2 md:row-span-1",
      bg: "bg-white dark:bg-slate-800",
      iconBg: "bg-orange-50 dark:bg-orange-900/20",
      wide: true
    },
    {
      title: "Lightning Fast Setup",
      desc: "Go live in under 14 days with zero technical stress on your team.",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      size: "md:col-span-1 md:row-span-1",
      bg: "bg-white dark:bg-slate-800",
      iconBg: "bg-amber-50 dark:bg-amber-900/20"
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-softGray dark:bg-slate-900 relative overflow-hidden scroll-mt-20 transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-100/50 dark:bg-green-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Zap className="w-3 h-3" /> Practice Scaling
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              Everything Your Practice Needs <span className="text-primary dark:text-blue-500">to Scale.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              One unified platform built specifically for medical professionals who want to grow without adding more administrative work.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${item.size} ${item.bg} p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-primary/20 dark:hover:border-blue-500/30 transition-all flex flex-col relative group`}
            >
              {item.featured && (
                <div className="absolute top-6 right-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-primary dark:border-blue-500 bg-blue-400 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=user${i + idx}`} alt="user" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-primary dark:border-blue-500 bg-primary-dark dark:bg-blue-700 flex items-center justify-center text-[10px] font-bold text-white">
                      +12
                    </div>
                  </div>
                </div>
              )}

              <div className={`w-12 h-12 rounded-2xl ${item.iconBg || 'bg-white'} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              <div className="flex-grow">
                <h3 className={`text-2xl font-display font-bold mb-3 ${item.textColor || 'text-slate-900 dark:text-white'}`}>
                  {item.title}
                </h3>
                <p className={`text-base leading-relaxed ${item.descColor || 'text-slate-500 dark:text-slate-400'}`}>
                  {item.desc}
                </p>
              </div>

              {item.wide && (
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="text-center">
                         <div className="text-xl font-bold text-slate-900 dark:text-slate-100">48%</div>
                         <div className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-tighter">Growth</div>
                      </div>
                      <div className="w-px h-8 bg-slate-100 dark:bg-slate-700" />
                      <div className="text-center">
                         <div className="text-xl font-bold text-slate-900 dark:text-slate-100">12k</div>
                         <div className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-tighter">Reach</div>
                      </div>
                   </div>
                   <div className="h-2 w-24 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '70%' }}
                        className="h-full bg-primary" 
                      />
                   </div>
                </div>
              )}

              {item.featured && (
                <div className="mt-8 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 dark:bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Live: 4 New Bookings Today</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200/60 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
               <ShieldCheck className="w-8 h-8 text-primary dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Enterprise-Ready Infrastructure</h4>
              <p className="text-slate-500 dark:text-slate-400">Scale from a single chair to 50+ locations without changing your workflow.</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-bold text-slate-400 border border-slate-100 dark:border-slate-700 uppercase tracking-widest">API ACCESS</div>
             <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-bold text-slate-400 border border-slate-100 dark:border-slate-700 uppercase tracking-widest">SSO ENABLED</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
