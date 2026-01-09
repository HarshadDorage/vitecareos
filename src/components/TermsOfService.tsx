
import React from 'react';
import { Scale, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Terms of Service</h1>
          <p className="text-slate-500 font-medium tracking-wide uppercase text-sm">Effective Date: October 2023</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2rem] mb-12">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6" /> User Agreement
            </h2>
            <p className="text-slate-700 leading-relaxed m-0">
              By accessing or using the VitaCareOS platform, you agree to be bound by these Terms of Service. If you are using the service on behalf of a clinic or organization, you represent that you have the authority to bind that entity to these terms.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Scope of Service</h2>
            <p className="text-slate-600 leading-relaxed">
              VitaCareOS provides an automated growth operating system, including but not limited to SMS automation, appointment scheduling, website hosting, and reputation management. We reserve the right to update, modify, or discontinue any feature of the service at any time.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Fees and Payments</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span className="text-slate-600">Subscriptions are billed in advance on a monthly or annual basis.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span className="text-slate-600">Failure to pay fees may result in the immediate suspension or termination of your access to the platform.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span className="text-slate-600">All fees are non-refundable unless specified otherwise in a separate written agreement.</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. HIPAA Responsibilities</h2>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-4">
                As a user of VitaCareOS, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Obtaining appropriate consent from patients to contact them via SMS and email.</li>
                <li>Ensuring that staff members follow security best practices when using the mobile app and dashboard.</li>
                <li>Managing user permissions within your clinic's account.</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h2>
            <div className="flex gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
              <p className="text-sm text-amber-800 leading-relaxed italic m-0">
                To the maximum extent permitted by law, VitaCareOS shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service. Our total liability shall not exceed the amount paid by you for the service in the six months preceding the claim.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Termination</h2>
            <p className="text-slate-600 leading-relaxed">
              You may cancel your subscription at any time through your dashboard. VitaCareOS reserves the right to terminate accounts that violate these terms or engage in fraudulent or abusive activities.
            </p>
          </section>

          <section className="text-center pt-8 border-t border-slate-100">
            <HelpCircle className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-slate-500 text-sm">
              Have questions about our terms? Email us at <span className="text-slate-900 font-bold">legal@vitacareos.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
