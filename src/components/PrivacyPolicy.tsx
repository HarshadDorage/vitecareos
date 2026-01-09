
import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-slate-500 font-medium tracking-wide uppercase text-sm">Last Updated: October 2023</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <Lock className="text-primary" />, title: "Data Security", text: "Enterprise-grade encryption for all stored data." },
            { icon: <Shield className="text-secondary" />, title: "HIPAA Compliant", text: "Systems designed to exceed healthcare standards." },
            { icon: <Eye className="text-blue-400" />, title: "Transparent Use", text: "Clear protocols on how your information is used." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> 1. Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed">
              At VitaCareOS ("we", "us", or "our"), we take your privacy and the privacy of your patients extremely seriously. This Privacy Policy describes how we collect, use, and protect your personal information and patient health information (PHI) when you use our Growth Operating System.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-2">Clinic Information</h3>
                <p className="text-sm text-slate-600">Information about your practice, including name, address, phone number, and staff contact details.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-2">Patient Data</h3>
                <p className="text-sm text-slate-600">Name, phone number, and appointment details submitted through our automated booking and chat systems.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-2">Usage Metrics</h3>
                <p className="text-sm text-slate-600">Details on how you interact with our platform to help us improve system performance and automation accuracy.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. HIPAA and Data Protection</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              We are committed to maintaining the confidentiality and security of Protected Health Information (PHI) in accordance with the Health Insurance Portability and Accountability Act (HIPAA).
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>All PHI is encrypted at rest and in transit using AES-256 encryption.</li>
              <li>We enter into Business Associate Agreements (BAAs) with all our medical clinic clients.</li>
              <li>Strict access controls ensure that only authorized personnel can access sensitive data.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. How We Use Information</h2>
            <p className="text-slate-600 leading-relaxed">
              We use the collected information primarily to provide our automation services, including Missed Call Text-Back, Appointment Scheduling, and Reputation Management. We do NOT sell your data or your patients' data to third-party advertisers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at <span className="text-primary font-bold">privacy@vitacareos.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
