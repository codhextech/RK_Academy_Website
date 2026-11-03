import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, MapPin, Laptop, ShieldCheck } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'IELTS General Training Course in Kilinochchi | RK International',
  description:
    'Target Band 7.5+ for Canada Express Entry, Australia PR, and UK Work Visas with RK International Academy in Kilinochchi and Live Online.',
};

export default function GeneralTrainingCoursePage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#0098DA] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
              PR & Migration Pathway
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
              IELTS General Training in Kilinochchi & Online
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Target CLB 9 & 10 scores for Canada Express Entry and maximum immigration points for Australia and UK Skilled Worker visas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-[#0A3663] mb-4">
                  Why IELTS General Training?
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  The IELTS General Training test measures English language proficiency in a practical, everyday context. Our course trains you specifically in letter writing (formal, semi-formal, personal), workplace reading comprehension, and confident speaking fluency.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-sky-50 border border-sky-100">
                <h3 className="font-bold text-[#0A3663] text-lg mb-2">Key Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>Specialized training to reach the coveted <strong>8, 7, 7, 7</strong> Canadian immigration threshold.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>Step-by-step templates for complaint letters, inquiries, and job applications.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>Weekly mock exams with detailed band score diagnostic analysis.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
                <div>
                  <span className="text-xs font-bold text-[#0098DA] uppercase tracking-wider">
                    Enrollment Open
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0A3663] mt-1">
                    IELTS General Training
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Flexible evening & weekend batches for working professionals.
                  </p>
                </div>

                <div className="space-y-3 py-4 border-y border-slate-200 text-xs sm:text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-bold">8 Weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Campus:</span>
                    <span className="font-bold">Kilinochchi Campus</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Online Option:</span>
                    <span className="font-bold text-emerald-600">Zoom Live Available</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/register"
                    className="w-full text-center bg-[#0A3663] hover:bg-[#124C85] text-white py-3.5 px-4 rounded-xl font-bold text-sm block shadow-md transition-colors"
                  >
                    Enroll in General Batch
                  </Link>
                  <a
                    href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent('Hi RK Academy, I am inquiring about IELTS General Training for Canada/Australia PR.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-bold text-sm block transition-colors"
                  >
                    Inquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
