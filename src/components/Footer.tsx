
import React from 'react';
import { Activity, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  onCtaClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCtaClick }) => {
  const handleScrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 mb-6 group"
            >
              <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                <Activity className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">VitaCareOS</span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The only Growth Operating System designed specifically for modern medical and dental clinics. Scale without the stress.
            </p>
            <div className="flex gap-4">
              <button onClick={onCtaClick} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Twitter className="w-4 h-4" /></button>
              <button onClick={onCtaClick} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Linkedin className="w-4 h-4" /></button>
              <button onClick={onCtaClick} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Facebook className="w-4 h-4" /></button>
              <button onClick={onCtaClick} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><Instagram className="w-4 h-4" /></button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Solution</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#solutions" onClick={(e) => handleScrollToSection(e, 'solutions')} className="hover:text-primary transition-colors">Missed Call Text-Back</a></li>
              <li><a href="#solutions" onClick={(e) => handleScrollToSection(e, 'solutions')} className="hover:text-primary transition-colors">Clinic Websites</a></li>
              <li><a href="#solutions" onClick={(e) => handleScrollToSection(e, 'solutions')} className="hover:text-primary transition-colors">Review Management</a></li>
              <li><button onClick={onCtaClick} className="hover:text-primary transition-colors">Patient Portal</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><button onClick={onCtaClick} className="hover:text-primary transition-colors text-left">About Us</button></li>
              <li><button onClick={onCtaClick} className="hover:text-primary transition-colors text-left">Blog</button></li>
              <li><button onClick={onCtaClick} className="hover:text-primary transition-colors text-left">Partners</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><button onClick={onCtaClick} className="hover:text-primary transition-colors text-left">Security Standards</button></li>
              <li><button onClick={onCtaClick} className="hover:text-primary transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={onCtaClick} className="hover:text-primary transition-colors text-left">Terms of Service</button></li>
              <li><button onClick={onCtaClick} className="hover:text-primary transition-colors text-left">Accessibility</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            Copyright © {new Date().getFullYear()} VitaCareOS. All rights reserved. 
            <br className="md:hidden" /> Developed for Excellence in Healthcare.
          </p>
          <div className="flex gap-6">
             <div className="h-6 flex items-center px-3 bg-white/5 rounded border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SOC2 COMPLIANT</div>
             <div className="h-6 flex items-center px-3 bg-white/5 rounded border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">GDPR READY</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
