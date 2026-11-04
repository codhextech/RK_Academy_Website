import React from 'react';
import Link from 'next/link';
import {
  Eye,
  Target,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { ACADEMY_VISION, ACADEMY_MISSION } from '@/lib/constants';

export default function VisionMissionSection() {
  return (
    <section className="py-12 md:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663]">
              Our Vision &amp; Mission
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
              Guiding students and professionals in Kilinochchi and across Northern Sri Lanka toward international success and barrier-free communication.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0098DA] hover:text-[#0A3663] transition-colors self-start md:self-end group"
          >
            <span>Learn More About Our Academy</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2-Column Vision & Mission High-Impact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Our Vision */}
          <div className="bg-gradient-to-br from-[#062343] to-[#0A3663] text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-shadow">
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#0098DA]/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#0098DA] shadow-inner">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0098DA] bg-sky-950/60 border border-sky-800/80 px-3 py-1 rounded-full">
                  Vision Statement
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
                {ACADEMY_VISION.title}
              </h3>

              <div className="relative pl-6 border-l-2 border-[#0098DA]/80 my-4">
                <Quote className="w-6 h-6 text-[#0098DA]/40 absolute -left-3 -top-3 bg-[#082a50] rounded-full p-0.5" />
                <p className="text-sm sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed italic">
                  &ldquo;{ACADEMY_VISION.quote}&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-2 text-xs text-sky-200">
              <span className="w-2 h-2 rounded-full bg-[#0098DA]"></span>
              <span>Empowering globally competent, barrier-free communicators</span>
            </div>
          </div>

          {/* Card 2: Our Mission */}
          <div className="bg-white border-2 border-sky-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-[#0098DA]/40 hover:shadow-xl transition-all">
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-sky-100/60 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0A3663] shadow-inner">
                  <Target className="w-6 h-6 text-[#0098DA]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0A3663] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                  Mission Statement
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A3663] mb-4">
                {ACADEMY_MISSION.title}
              </h3>

              <div className="relative pl-6 border-l-2 border-[#0A3663] my-4">
                <Quote className="w-6 h-6 text-[#0A3663]/30 absolute -left-3 -top-3 bg-white rounded-full p-0.5" />
                <p className="text-sm sm:text-base md:text-lg text-slate-700 font-medium leading-relaxed italic">
                  &ldquo;{ACADEMY_MISSION.statement}&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs text-[#0A3663] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0A3663]"></span>
              <span>High-quality education • Internationally recognised learning • Practical skills</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
