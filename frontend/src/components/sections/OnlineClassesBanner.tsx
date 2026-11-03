import React from 'react';
import Link from 'next/link';
import { Laptop, Video, Clock, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function OnlineClassesBanner() {
  return (
    <section className="py-14 bg-gradient-to-r from-[#062343] to-[#0A3663] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#0098DA]/20 border border-[#0098DA]/40 text-sky-200 px-3 py-1 rounded-full text-xs font-semibold">
              <Globe className="w-3.5 h-3.5 text-[#0098DA]" />
              <span>Available for Students Across Sri Lanka & Abroad</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Cannot attend in Kilinochchi? Join our <span className="text-[#0098DA]">Live Online IELTS</span> Classes!
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Experience the exact same high-standard coaching from the comfort of your home. Live Zoom sessions with certified trainers, interactive speaking rooms, recorded video archives for revision, and continuous essay evaluations.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-sky-200">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#0098DA]" />
                <span>Live Interactive Audio & Video</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0098DA]" />
                <span>Flexible Evening/Weekend Batches</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-[#0098DA]" />
                <span>One-on-One Speaking Feedback</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Link
              href="/online-ielts-classes"
              className="text-center bg-[#0098DA] hover:bg-[#0080B8] text-white py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg shadow-sky-900/30 flex items-center justify-center gap-2"
            >
              <Laptop className="w-4 h-4" />
              <span>Explore Online Timetable</span>
            </Link>

            <a
              href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent('Hi RK Academy, I am interested in your Live Online IELTS classes. Please send details.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Inquire via WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-sky-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
