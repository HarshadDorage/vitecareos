
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  onAuditClick: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onAuditClick }) => {
  const reviews = [
    {
      name: "Dr. Sarah Johnson",
      role: "Lead Dentist, Bright Smiles Dental",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200",
      quote: "VitaCareOS filled our schedule in just 30 days. The automated missed call text-back is a absolute game changer for our front desk efficiency."
    },
    {
      name: "Dr. Marcus Chen",
      role: "Owner, Elite Orthodontics",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200",
      quote: "Our online reputation skyrocketed. We went from a 4.1 to a 4.9 on Google in less than two months. I couldn't recommend them more highly."
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Medical Director, CarePlus Clinic",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200",
      quote: "The website they built for us actually converts. We are seeing a 3x increase in new patient leads from search traffic. Best investment this year."
    }
  ];

  return (
    <section id="results" className="py-24 bg-softGray relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
            Trusted by the Best in the Business.
          </h2>
          <p className="text-lg text-slate-600">
            Hear directly from the clinics that scaled their practices with VitaCareOS.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-slate-50 opacity-10" />
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-slate-700 italic leading-relaxed mb-8 flex-1">
                "{rev.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={rev.image} alt={rev.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/10" />
                <div>
                  <h4 className="font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <div className="bg-primary/5 rounded-3xl p-12 border border-primary/10">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-6">
                Ready to become our next success story?
              </h3>
              <button 
                onClick={onAuditClick}
                className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20"
              >
                 Claim Your Practice Audit
              </button>
              <p className="mt-6 text-sm text-slate-500">No commitment required. 15-minute diagnostic call.</p>
           </div>
        </div>
      </div>
    </section>
  );
};
