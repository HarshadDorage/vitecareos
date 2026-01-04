
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, User, Building2, Mail, Phone, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, title = "Book Your Practice Audit" }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3500);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden border border-slate-100"
          >
            {/* Decoration Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 md:p-16 text-center"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100 shadow-sm">
                  <CheckCircle2 className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">You're on the list!</h3>
                <p className="text-lg text-slate-600 mb-8 max-w-sm mx-auto">
                  A growth strategist will reach out within <span className="text-slate-900 font-bold">24 hours</span> with your customized action plan.
                </p>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-slate-100 text-slate-700 rounded-full font-bold hover:bg-slate-200 transition-colors"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <div className="p-8 md:p-12">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
                    Growth Diagnostic
                  </div>
                  <h3 className="text-3xl font-display font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-600">Enter your details below to secure your 15-minute diagnostic call.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                        <User className="w-3 h-3 text-primary" /> Full Name
                      </label>
                      <input 
                        required 
                        type="text" 
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                        placeholder="Dr. Jane Smith" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                        <Building2 className="w-3 h-3 text-primary" /> Clinic Name
                      </label>
                      <input 
                        required 
                        type="text" 
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                        placeholder="Smile Design Studio" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                        <Mail className="w-3 h-3 text-primary" /> Work Email
                      </label>
                      <input 
                        required 
                        type="email" 
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                        placeholder="doctor@clinic.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                        <Phone className="w-3 h-3 text-primary" /> Mobile Phone
                      </label>
                      <input 
                        required 
                        type="tel" 
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                        placeholder="(555) 000-0000" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                      <MessageSquare className="w-3 h-3 text-primary" /> Primary Concern
                    </label>
                    <select className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white outline-none transition-all text-slate-900 font-medium appearance-none">
                      <option>Automating Appointment Booking</option>
                      <option>Increasing Google Reviews</option>
                      <option>High-Converting Website Design</option>
                      <option>All of the above</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-[#004494] active:scale-[0.98] disabled:opacity-70 transition-all flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Secure My Audit Spot
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-4 mt-8">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                        SSL SECURED
                      </div>
                      <div className="w-px h-3 bg-slate-200" />
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        PRIVATE & CONFIDENTIAL
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
