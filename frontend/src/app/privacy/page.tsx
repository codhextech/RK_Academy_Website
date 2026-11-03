import React from 'react';
import { ACADEMY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Privacy Policy | RK International Language Academy',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <h1 className="text-3xl font-extrabold text-[#0A3663] mb-6">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          At <strong>RK International Language Academy</strong>, we respect your privacy and are committed to protecting the personal information you share with us through our website and enrollment forms.
        </p>
        <h2 className="text-xl font-bold text-[#0A3663] mt-6">Information We Collect</h2>
        <p>
          When you submit an inquiry or register for a course, we collect your name, phone number, WhatsApp contact, email address, and course preferences. This information is used strictly to communicate course schedules, batch details, and educational support.
        </p>
        <h2 className="text-xl font-bold text-[#0A3663] mt-6">Data Confidentiality</h2>
        <p>
          We never sell, rent, or trade your contact information to third parties. For any inquiries regarding your data, reach us at {ACADEMY_INFO.email}.
        </p>
      </div>
    </div>
  );
}
