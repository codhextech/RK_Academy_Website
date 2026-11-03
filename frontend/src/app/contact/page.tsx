import React from 'react';
import ContactMapSection from '@/components/sections/ContactMapSection';

export const metadata = {
  title: 'Contact Us | RK International Language Academy Kilinochchi',
  description:
    'Contact RK International Language Academy on A-9 Road, Kilinochchi. Phone 074 0224 355, WhatsApp support, Google Map directions, and inquiry form.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[#0098DA] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Kilinochchi Campus & Helpline
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Contact RK International Academy
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Get directions, call our admissions desk, or chat with our counselors on WhatsApp.
          </p>
        </div>
      </section>

      <ContactMapSection />
    </div>
  );
}
