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
      {/* Compact & Streamlined Header */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-8 md:py-12 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get directions, call our admissions desk, or chat with our counselors on WhatsApp.
          </p>
        </div>
      </section>

      <ContactMapSection />
    </div>
  );
}
