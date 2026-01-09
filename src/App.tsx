
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { SmsDemo } from './components/SmsDemo';
import { LoomRequest } from './components/LoomRequest';
import { Benefits } from './components/Benefits';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';

type View = 'landing' | 'privacy' | 'terms';

function App() {
  const [view, setView] = useState<View>('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Book Your Practice Audit");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const openModal = (title?: string) => {
    if (title) setModalTitle(title);
    setIsModalOpen(true);
  };

  const navigateTo = (newView: View) => {
    setView(newView);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left"
        style={{ scaleX }}
      />

      <Navbar 
        onCtaClick={() => openModal("Schedule a Demo")} 
        onHomeClick={() => navigateTo('landing')}
        isLanding={view === 'landing'}
      />
      
      <main className="flex-grow">
        {view === 'landing' ? (
          <>
            <section id="home">
              <Hero onAuditClick={() => openModal("Get My Free Audit")} />
            </section>
            
            <section id="how-it-works">
              <Problem />
              <SmsDemo />
            </section>

            <section id="services">
              <Solution />
              <Benefits />
            </section>

            <section id="pricing">
              <Pricing onCtaClick={(plan) => openModal(`Get Started with ${plan}`)} />
            </section>

            <section id="contact">
              <LoomRequest onRequestClick={() => openModal("Request Your Video Audit")} />
            </section>
          </>
        ) : view === 'privacy' ? (
          <PrivacyPolicy />
        ) : (
          <TermsOfService />
        )}
      </main>

      <Footer 
        onCtaClick={() => openModal("Start Your Growth Journey")} 
        onNavigate={navigateTo}
      />

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
      />
    </div>
  );
}

export default App;
