import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Eye,
  Target,
  CheckCircle2,
  Quote,
  MapPin,
  Headphones,
  BookOpen,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO, ACADEMY_VISION, ACADEMY_MISSION } from '@/lib/constants';

export const metadata = {
  title: 'About Us | Vision, Mission & Facilities | RK International Language Academy',
  description:
    'Discover the vision, mission, and strategic commitments of RK International Language Academy Kilinochchi. Empowering confident communicators and global achievers.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 1. Header Hero Banner - Compact & Authoritative */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            About Our Academy
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Northern Sri Lanka&apos;s premier institute for IELTS, Cambridge prep, world languages, and professional diploma studies.
          </p>
        </div>
      </section>

      {/* 2. Core Vision & Mission Showcase (Directly from Academy Charter) */}
      <section className="py-12 md:py-18 bg-white border-b border-slate-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663]">
              Our Vision &amp; Mission
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              The foundational ethos that shapes every course, trainer, and student journey at RK Academy.
            </p>
          </div>

          {/* 2-Column High-Impact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-[#062343] to-[#0A3663] text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:shadow-2xl transition-all">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#0098DA]/15 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#0098DA] shadow-inner">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0098DA] bg-sky-950/70 border border-sky-800/80 px-3 py-1 rounded-full">
                    Our Vision
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
                  {ACADEMY_VISION.title}
                </h3>

                <div className="relative pl-6 border-l-2 border-[#0098DA] my-4">
                  <Quote className="w-6 h-6 text-[#0098DA]/50 absolute -left-3 -top-3 bg-[#082a50] rounded-full p-0.5" />
                  <p className="text-base sm:text-lg md:text-xl text-slate-100 font-medium leading-relaxed italic">
                    &ldquo;{ACADEMY_VISION.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-2 text-xs text-sky-200">
                <span className="w-2 h-2 rounded-full bg-[#0098DA]"></span>
                <span>Empowering confident, globally competent individuals</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white border-2 border-sky-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:border-[#0098DA]/40 hover:shadow-2xl transition-all">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-100/70 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0A3663] shadow-inner">
                    <Target className="w-6 h-6 text-[#0098DA]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0A3663] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                    Our Mission
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
                <span>High-quality education • International opportunities • Practical skills</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Academy Background, Philosophy & Facilities */}
      <section className="py-14 md:py-22 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Story Column */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663]">
                Our Background &amp; Excellence
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Founded with a singular vision, <strong>RK International Language Academy</strong> provides world-class English language training, IELTS &amp; PTE preparation, Cambridge exams, and modern European language courses without students needing to leave Kilinochchi.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether your destination is university study in the UK or Canada, skilled migration to Australia, or career advancement through English and IT diplomas, our certified trainers provide personalized guidance, structured mock exams, and British Council &amp; Pearson registration support.
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-sky-50 border border-sky-100">
                  <BookOpen className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#0A3663]">Official Exam Materials</h4>
                    <p className="text-[11px] text-slate-600">Cambridge, British Council &amp; Pearson authenticated test resources.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-sky-50 border border-sky-100">
                  <Headphones className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#0A3663]">Audio Listening Lab</h4>
                    <p className="text-[11px] text-slate-600">Dedicated individual headsets for true test conditions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Academy Info Card */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-lg space-y-6">
              <div className="relative h-64 sm:h-72 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                  alt="RK Academy Classroom in Kilinochchi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3663] via-[#0A3663]/30 to-transparent flex items-end p-6">
                  <div className="bg-white/95 px-5 py-2.5 rounded-xl backdrop-blur-xs shadow-md">
                    <Image
                      src="/images/logo/rk-logo.png"
                      alt="RK Academy Logo"
                      width={260}
                      height={52}
                      style={{ width: 'auto', height: 'auto', maxHeight: '52px', maxWidth: '260px' }}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0098DA] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Central Kilinochchi Location</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A3663]">
                  RK International Language Academy Facilities
                </h3>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>Easy access A-9 Road lecture halls near Theresamma Kovil</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>State-of-the-art computer lab for PTE AI practice and IT diplomas</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>High-speed optical fiber internet and interactive Zoom smart rooms</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>Flexible morning, evening, and weekend batches for working adults</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto text-center bg-[#0A3663] hover:bg-[#124C85] text-white py-3 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  >
                    Join Next Batch
                  </Link>
                  <a
                    href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>WhatsApp Admissions</span>
                  </a>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto text-center border border-slate-300 hover:bg-white text-slate-700 py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
                  >
                    Visit Academy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
