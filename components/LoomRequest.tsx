
import React from 'react';
import { motion } from 'framer-motion';
import { Video, Play, MousePointerClick, Zap } from 'lucide-react';

interface LoomRequestProps {
  onRequestClick: () => void;
}

export const LoomRequest: React.FC<LoomRequestProps> = ({ onRequestClick }) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/10 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4" />

          <div className="flex flex-col lg:flex-row items-center relative z-10">
            {/* Left Content */}
            <div className="lg:w-1/2 p-12 md:p-16 lg:p-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-blue-500/30">
                  <Video className="w-4 h-4" />
                  PERSONALIZED VIDEO AUDIT
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                  Can't find time for a call? <span className="text-blue-400">Request a Video.</span>
                </h2>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  We'll record a 5-minute teardown of your current website and booking process. We show you exactly where you're losing patients—delivered straight to your inbox.
                </p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <Zap className="w-3 h-3 text-blue-400" />
                    </div>
                    <span>Sent within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <Zap className="w-3 h-3 text-blue-400" />
                    </div>
                    <span>Zero pressure, just pure value</span>
                  </div>
                </div>

                <button 
                  onClick={onRequestClick}
                  className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all shadow-xl shadow-white/5 flex items-center gap-2"
                >
                  Request My Video Teardown
                  <MousePointerClick className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

            {/* Right Visual (Loom Mockup) */}
            <div className="lg:w-1/2 w-full p-8 lg:p-0 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative max-w-lg lg:mr-[-50px] group"
              >
                {/* Video Interface Mockup */}
                <div className="bg-slate-800 rounded-2xl p-4 shadow-2xl border border-white/10 overflow-hidden">
                  <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden mb-4 border border-white/5">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=800" 
                      className="w-full h-full object-cover opacity-50 grayscale"
                      alt="Website audit screenshot"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>
                    {/* Speaker Bubble */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-slate-900/80 backdrop-blur px-3 py-2 rounded-full border border-white/10">
                      <img src="https://i.pravatar.cc/100?u=consultant" className="w-8 h-8 rounded-full border-2 border-primary" alt="Strategist" />
                      <div className="text-[10px] text-white font-bold uppercase tracking-wider">Analyzing Mobile UX...</div>
                    </div>
                  </div>
                  {/* Controls */}
                  <div className="flex items-center justify-between px-2">
                    <div className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <div className="w-24 h-1.5 bg-white/10 rounded-full relative">
                      <div className="absolute top-0 left-0 w-1/3 h-full bg-blue-400 rounded-full" />
                    </div>
                  </div>
                </div>
                {/* Floating Tags */}
                <div className="absolute -top-6 -left-6 bg-secondary text-white px-4 py-2 rounded-xl font-bold shadow-lg text-sm border-2 border-white/10">
                  +32% Conversion Hack Found
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
