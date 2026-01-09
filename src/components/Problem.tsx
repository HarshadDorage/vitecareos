
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, Globe, CalendarX } from 'lucide-react';

export const Problem: React.FC = () => {
  const problems = [
    {
      icon: <PhoneOff className="w-8 h-8 text-orange-500" />,
      title: "Missed Calls = Lost Revenue",
      desc: "70% of potential patients who get voicemail will hang up and call your competitor. You're losing thousands every month."
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: "Outdated Patient Experience",
      desc: "Old, slow websites confuse patients. If they can't find information in 3 seconds, they leave. Your website is currently a leak."
    },
    {
      icon: <CalendarX className="w-8 h-8 text-orange-500" />,
      title: "Manual Scheduling Burden",
      desc: "Your front desk spends 40% of their day playing 'phone tag' to confirm bookings. It's inefficient, costly, and prone to error."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-softGray dark:bg-slate-900 scroll-mt-20 transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Is Your Front Desk Overwhelmed?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Running a clinic is hard. Managing patient growth shouldn't be. Most practices struggle with these three silent growth killers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/20 transition-colors">
                {prob.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{prob.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
