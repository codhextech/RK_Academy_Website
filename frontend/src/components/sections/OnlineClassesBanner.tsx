import React from 'react';
import Link from 'next/link';
import { Laptop, Video, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function OnlineClassesBanner() {
  return (
    <section className="py-8 md:py-12 bg-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#062343] via-[#0A3663] to-[#062343] text-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl border border-sky-900/30">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#0098DA]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Live Online <span className="text-[#0098DA]">IELTS &amp; PTE</span> Classes
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience the exact same high-standard coaching from the comfort of your home. Live Zoom sessions with certified trainers, interactive speaking rooms, recorded video archives for revision, and continuous essay evaluations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-sky-200 text-left">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#0098DA] shrink-0" />
                  <span>Live Interactive Audio & Video</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0098DA] shrink-0" />
                  <span>Flexible Evening/Weekend Batches</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0098DA] shrink-0" />
                  <span>One-on-One Speaking Feedback</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/online-ielts-classes"
                className="w-full text-center bg-[#0098DA] hover:bg-[#0080B8] text-white py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg shadow-sky-900/30 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Laptop className="w-4 h-4" />
                <span>Explore Online Timetable</span>
              </Link>

              <a
                href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent('Hi RK Academy, I am interested in your Live Online IELTS classes. Please send details.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Inquire via WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-sky-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
