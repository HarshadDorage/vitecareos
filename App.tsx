
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { SmsDemo } from './components/SmsDemo';
import { LoomRequest } from './components/LoomRequest';
import { Benefits } from './components/Benefits';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Book Your Practice Audit");

  const openModal = (title?: string) => {
    if (title) setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCtaClick={() => openModal("Schedule a Demo")} />
      <main>
        <Hero onAuditClick={() => openModal("Get My Free Audit")} />
        <Problem />
        <Solution />
        <SmsDemo />
        <LoomRequest onRequestClick={() => openModal("Request Your Video Audit")} />
        <Benefits />
      </main>
      <Footer onCtaClick={() => openModal("Start Your Growth Journey")} />

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
      />
    </div>
  );
}

export default App;
