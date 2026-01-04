
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
    <section id="how-it-works" className="py-24 bg-softGray scroll-mt-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
            Is Your Front Desk Overwhelmed?
          </h2>
          <p className="text-lg text-slate-600">
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
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors">
                {prob.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{prob.title}</h3>
              <p className="text-slate-600 leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
