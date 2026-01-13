
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Rocket, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onCtaClick: (plan: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onCtaClick }) => {
  const plans = [
    {
      name: "Essential Growth",
      price: "349",
      tagline: "Fix your reputation and never miss a call.",
      icon: <Zap className="w-6 h-6 text-slate-500" />,
      colorClass: "border-slate-200 dark:border-slate-700",
      headerBg: "bg-slate-50 dark:bg-slate-900",
      ctaText: "Start Basic",
      ctaClass: "bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white",
      features: [
        { text: "Auto-Missed Call Text Back", included: true },
        { text: "Google Profile Setup & Management", included: true },
        { text: "Auto-Google Review Requests", included: true },
        { text: "2-Way SMS & Emailing", included: true },
        { text: "Online Appointment Booking", included: false },
        { text: "Website Development & Maintenance", included: false },
        { text: "Weekly/Monthly Reports", included: false },
      ]
    },
    {
      name: "Professional Suite",
      price: "599",
      tagline: "Complete website & booking system makeover.",
      icon: <Crown className="w-6 h-6 text-primary" />,
      colorClass: "border-primary ring-4 ring-primary/5 scale-105 z-10",
      headerBg: "bg-blue-50 dark:bg-blue-900/20",
      featured: true,
      badge: "🔥 Most Popular",
      ctaText: "Start Growth Trial",
      ctaClass: "bg-primary shadow-xl shadow-primary/20 hover:bg-[#004494]",
      features: [
        { text: "Everything in Essential Growth", included: true },
        { text: "Custom Website Development", included: true }, // Big Value
        { text: "Website Maintenance & Hosting", included: true },
        { text: "Online Appointment Booking", included: true },
        { text: "Weekly Activity Reports", included: true },
        { text: "Monthly Performance Report", included: false },
        { text: "VIP Priority Support", included: false },
      ]
    },
    {
      name: "Elite Expansion",
      price: "799",
      tagline: "VIP management & detailed performance tracking.",
      icon: <Rocket className="w-6 h-6 text-amber-500" />,
      colorClass: "border-slate-900 dark:border-amber-500/50 bg-slate-900 dark:bg-slate-950 text-white",
      headerBg: "bg-white/5",
      ctaText: "Get Full Access",
      ctaClass: "bg-amber-500 text-slate-900 hover:bg-amber-400",
      isPremium: true,
      features: [
        { text: "Everything in Professional Suite", included: true },
        { text: "Monthly Deep-Dive Performance Report", included: true },
        { text: "Priority Website Updates (24h Turnaround)", included: true },
        { text: "Dedicated Account Manager", included: true },
        { text: "Advanced Reputation Strategy", included: true },
        { text: "Quarterly Business Review", included: true },
        { text: "VIP Priority Support", included: true },
      ]
    }
  ];

  return (
    <section className="py-24 bg-softGray dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">Pricing Plans</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">Simple, Predictable Pricing.</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">Choose the plan that fits your practice's current stage and scale as you grow. All plans include HIPAA-compliant data security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-[2.5rem] p-8 shadow-xl border flex flex-col h-full transition-transform duration-300 ${plan.colorClass} ${plan.isPremium ? '' : 'bg-white dark:bg-slate-800'}`}
            >
              {plan.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-lg">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <div className={`inline-flex p-3 rounded-2xl mb-6 ${plan.headerBg}`}>
                  {plan.icon}
                </div>
                <h4 className={`text-2xl font-display font-bold mb-2 ${plan.isPremium ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {plan.name}
                </h4>
                <p className={`text-sm font-medium mb-6 ${plan.isPremium ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  {plan.tagline}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-black ${plan.isPremium ? 'text-white' : 'text-slate-900 dark:text-white'}`}>${plan.price}</span>
                  <span className={`font-bold ${plan.isPremium ? 'text-slate-500' : 'text-slate-400'}`}>/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      feature.included 
                        ? (plan.isPremium ? 'bg-amber-500/20 text-amber-500' : 'bg-secondary/10 text-secondary')
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-600'
                    }`}>
                      {feature.included ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={`text-sm font-medium ${
                      feature.included 
                        ? (plan.isPremium ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300')
                        : (plan.isPremium ? 'text-slate-600 line-through' : 'text-slate-400 line-through dark:text-slate-600')
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onCtaClick(plan.name)}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] ${plan.ctaClass} ${plan.featured ? 'text-white' : (plan.isPremium ? 'text-slate-900' : 'text-white dark:text-slate-900')}`}
              >
                {plan.ctaText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-bold">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              HIPAA COMPLIANT
            </div>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              30-Day Money-Back Guarantee • Cancel Anytime
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};
