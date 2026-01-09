
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, User, Building2, Mail, Phone, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 dark:border-slate-800 my-auto"
          >
            {/* Decoration Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 text-center"
              >
                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 dark:border-green-800 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3">You're on the list!</h3>
                <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                  A growth strategist will reach out within <span className="text-slate-900 dark:text-white font-bold">24 hours</span> with your customized action plan.
                </p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 border border-blue-100 dark:border-blue-800">
                    Growth Diagnostic
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Enter your details to secure your 15-minute diagnostic call.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                        <User className="w-3 h-3 text-primary" /> Full Name
                      </label>
                      <input 
                        required 
                        type="text" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all text-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-400" 
                        placeholder="Dr. Jane Smith" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                        <Building2 className="w-3 h-3 text-primary" /> Clinic Name
                      </label>
                      <input 
                        required 
                        type="text" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all text-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-400" 
                        placeholder="Smile Design" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                        <Mail className="w-3 h-3 text-primary" /> Work Email
                      </label>
                      <input 
                        required 
                        type="email" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all text-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-400" 
                        placeholder="doctor@clinic.com" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                        <Phone className="w-3 h-3 text-primary" /> Phone
                      </label>
                      <input 
                        required 
                        type="tel" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all text-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-400" 
                        placeholder="(555) 000-0000" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      <MessageSquare className="w-3 h-3 text-primary" /> Primary Concern
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all text-sm text-slate-900 dark:text-white font-medium appearance-none cursor-pointer">
                      <option>Automating Appointment Booking</option>
                      <option>Increasing Google Reviews</option>
                      <option>High-Converting Website Design</option>
                      <option>All of the above</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:bg-[#004494] active:scale-[0.98] disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Secure My Audit Spot
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-3 mt-6">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">
                        <ShieldCheck className="w-3 h-3 text-secondary" />
                        SSL SECURED
                      </div>
                      <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                      <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">
                        HIPAA COMPLIANT
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
