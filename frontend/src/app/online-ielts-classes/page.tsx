import React from 'react';
import Link from 'next/link';
import { Video, Clock, Laptop, CheckCircle2, Globe } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Online IELTS Classes Sri Lanka | Live Zoom Classes | RK International',
  description:
    'Live interactive online IELTS classes from anywhere in Sri Lanka or overseas. Small batches, recorded lessons, personal speaking assessments with certified trainers.',
};

export default function OnlineClassesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Navy Hero Banner - Compact & Streamlined */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-8 md:py-12 text-center relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#0098DA] blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-sky-400 blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Live Online Classes
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Interactive Zoom & Google Meet sessions designed for busy university students, professionals, and overseas candidates.
          </p>
        </div>
      </section>

      {/* Feature Cards & CTA Section with Soft Light Gray Background */}
      <section className="py-10 md:py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Card 1: Interactive Live Video */}
            <div className="group p-6 sm:p-8 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-[#0A3663]/10 hover:-translate-y-1.5 hover:border-[#0098DA] transition-all duration-300 text-center space-y-4 cursor-default">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl mx-auto flex items-center justify-center text-[#0098DA] group-hover:bg-[#0098DA] group-hover:text-white group-hover:scale-105 transition-all duration-300 border border-sky-100 shadow-xs">
                <Video className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-[#0A3663] group-hover:text-[#0098DA] text-lg sm:text-xl transition-colors duration-200">
                Interactive Live Video
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Direct live interaction with instructors, not pre-recorded generic videos. Ask questions and get answers in real time.
              </p>
            </div>

            {/* Card 2: Flexible Timings */}
            <div className="group p-6 sm:p-8 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-[#0A3663]/10 hover:-translate-y-1.5 hover:border-[#0098DA] transition-all duration-300 text-center space-y-4 cursor-default">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl mx-auto flex items-center justify-center text-[#0098DA] group-hover:bg-[#0098DA] group-hover:text-white group-hover:scale-105 transition-all duration-300 border border-sky-100 shadow-xs">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-[#0A3663] group-hover:text-[#0098DA] text-lg sm:text-xl transition-colors duration-200">
                Flexible Timings
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evening batches (6:30 PM - 8:30 PM) and Weekend Fast-Track batches designed to fit around work and school.
              </p>
            </div>

            {/* Card 3: Recorded Replays */}
            <div className="group p-6 sm:p-8 rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-[#0A3663]/10 hover:-translate-y-1.5 hover:border-[#0098DA] transition-all duration-300 text-center space-y-4 cursor-default">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl mx-auto flex items-center justify-center text-[#0098DA] group-hover:bg-[#0098DA] group-hover:text-white group-hover:scale-105 transition-all duration-300 border border-sky-100 shadow-xs">
                <Laptop className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-[#0A3663] group-hover:text-[#0098DA] text-lg sm:text-xl transition-colors duration-200">
                Recorded Replays
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Missed a live lecture? Access high-definition class recordings anytime through your student cloud drive.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-[#062343] to-[#0A3663] text-white rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-xl border border-sky-900/30">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Join the Online IELTS Cohort?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Get in touch with our online coordinator to receive trial class access and class timetable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto bg-[#0098DA] hover:bg-[#0080B8] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:shadow-lg hover:shadow-sky-400/20"
              >
                Register for Online Class
              </Link>
              <a
                href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent('Hi RK Academy, please send me details about the Live Online IELTS batch.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>WhatsApp Admissions</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
