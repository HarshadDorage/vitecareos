
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Laptop, Star, CheckCircle2 } from 'lucide-react';

export const Solution: React.FC = () => {
  const solutions = [
    {
      title: "Missed Call Text-Back",
      headline: "Never Miss a Patient Again.",
      desc: "Our AI instantly sends a professional text to any caller who misses your front desk. It qualifies the patient and books the appointment automatically.",
      points: ["100% Automated Response", "Instant Patient Engagement", "Increased Conversion Rates"],
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      color: "bg-primary"
    },
    {
      title: "High-Performance Websites",
      headline: "Built to Convert Visitors into Patients.",
      desc: "We don't just build websites; we build growth machines. Mobile-first, blazing fast, and optimized for local SEO so you show up first on Google.",
      points: ["90+ Lighthouse Score", "Secure Digital Forms", "Mobile-Optimized Layouts"],
      icon: <Laptop className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
      color: "bg-primary",
      reverse: true
    },
    {
      title: "Reputation Engine",
      headline: "Get More 5-Star Reviews on Autopilot.",
      desc: "We automate the review collection process. Happy patients get a text after their visit, boosting your clinic's credibility and social proof.",
      points: ["Automated Review Requests", "Negative Feedback Filtration", "Direct Google Business Integration"],
      icon: <Star className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      color: "bg-primary"
    }
  ];

  return (
    <section id="solutions" className="py-24 overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">The Solution</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Three Pillars of Growth.</h3>
        </div>

        <div className="space-y-32">
          {solutions.map((sol, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row items-center gap-16 ${sol.reverse ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: sol.reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:w-1/2"
              >
                <div className={`inline-flex p-3 rounded-2xl ${sol.color} mb-6 shadow-lg shadow-primary/20`}>
                  {sol.icon}
                </div>
                <h4 className="text-slate-500 font-bold mb-2 uppercase tracking-wide text-sm">{sol.title}</h4>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
                  {sol.headline}
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {sol.desc}
                </p>
                <ul className="space-y-4">
                  {sol.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:w-1/2 relative"
              >
                <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] -rotate-2 -z-10"></div>
                <img 
                  src={sol.image} 
                  alt={sol.title} 
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video lg:aspect-square"
                />
                <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-slate-50 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${idx}${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="Avatar" />)}
                  </div>
                  <div className="text-xs font-bold text-slate-700">Joined 200+ clinics</div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
