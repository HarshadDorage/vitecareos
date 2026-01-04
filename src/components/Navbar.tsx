
import React, { useState, useEffect } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onCtaClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCtaClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: 'solutions' },
    { name: 'How it Works', href: 'how-it-works' },
    { name: 'Benefits', href: 'benefits' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass border-b border-slate-100 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group"
        >
          <div className="bg-primary p-1.5 rounded-lg shadow-md group-hover:scale-110 transition-transform">
            <Activity className="text-white w-6 h-6 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
          <span className="text-2xl font-display font-bold text-primary tracking-tight">VitaCareOS</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-slate-600 hover:text-primary font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button 
            onClick={onCtaClick}
            className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Book a Demo
          </button>
        </div>

        <button 
          className="md:hidden text-slate-900 p-2 hover:bg-slate-100 rounded-lg transition-colors" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={`#${link.href}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lg text-slate-700 font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={onCtaClick}
                className="bg-primary text-white w-full py-3 rounded-xl font-semibold mt-2 shadow-lg shadow-primary/10"
              >
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
