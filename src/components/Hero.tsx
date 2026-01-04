
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Play, Star } from 'lucide-react';
import { DashboardMockup } from './DashboardMockup';

interface HeroProps {
  onAuditClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAuditClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const clinicLogos = [
    { name: 'Aspen Dental', id: 'aspen' },
    { name: 'Heartland', id: 'heartland' },
    { name: 'Pacific Dental', id: 'pacific' },
    { name: 'SmileBrands', id: 'smile' },
    { name: 'MB2 Dental', id: 'mb2' }
  ];

  const handleScrollToSolutions = () => {
    const el = document.getElementById('solutions');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-blue-50/50 rounded-bl-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Now Serving US Medical & Dental Clinics
              </span>
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-[1.15] mb-6">
                The Growth <span className="text-primary underline decoration-blue-100 decoration-8 underline-offset-4">Operating System</span> for Modern Clinics.
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Stop losing patients to voicemail. We automate your appointments, website, and reputation so you can focus on care.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button 
                onClick={onAuditClick}
                className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:bg-[#004494] transition-all flex items-center justify-center gap-2 group"
              >
                Get My Free Practice Audit
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleScrollToSolutions}
                className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-slate-700" />
                View Demo
              </button>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="pt-8 border-t border-slate-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="ml-2 text-sm font-bold text-slate-900">4.9/5</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Average Client Growth Rating
                  </p>
                </div>
                <div className="hidden sm:block w-px h-8 bg-slate-200" />
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 px-2 py-1 rounded text-[10px] font-bold text-primary border border-blue-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> SECURE & ENCRYPTED
                  </div>
                  <p className="text-xs font-medium text-slate-500">Trusted by 500+ US Clinics</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                {clinicLogos.map((logo) => (
                  <motion.div 
                    key={logo.id} 
                    variants={itemVariants}
                    className="group relative"
                  >
                    <img 
                      src={`https://logo.clearbit.com/${logo.id}dental.com?size=120&greyscale=true`} 
                      alt={logo.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${logo.id}/120/40?grayscale`;
                      }}
                      className="h-7 w-auto opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative w-full flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
};
