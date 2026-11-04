import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Thank You | RK International Language Academy',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A3663]">
          Registration Received!
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Thank you for registering with <strong>RK International Language Academy</strong>. Our academic counselor will review your application and reach out to you via WhatsApp or phone within 24 hours.
        </p>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left space-y-3">
          <h2 className="text-sm font-bold text-[#0A3663]">Next Immediate Steps:</h2>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• Our team will confirm your placement level and course batch timing.</li>
            <li>• You will receive course syllabus documents and orientation schedule.</li>
            <li>• For offline students, visit our campus on A-9 Road near Theresamma Kovil.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent('Hi RK Academy, I just submitted my registration form online. Please confirm my enrollment.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Confirm Now on WhatsApp</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3.5 rounded-xl font-bold text-sm transition-colors"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
