import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, ShieldCheck, Laptop, Star } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50/60 pt-6 pb-8 md:pt-10 md:pb-14 border-b border-slate-100">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

      {/* Expanded Max-Width for Modern Desktops (Eliminates excessive side margins) */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          {/* Left Column: Heading, Subtext, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Main SEO H1 Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A3663] tracking-tight leading-[1.15]">
              Achieve Band <span className="text-[#0098DA]">7.5+</span> in IELTS, Score High in <span className="text-[#0098DA]">PTE</span> &amp; Master Fluent English
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              <strong>The Way of Success.</strong> Learn from certified instructors with personalized coaching, real test simulations, and British Council & Pearson registration support. Join in-person at our Kilinochchi center or online from anywhere.
            </p>

            {/* Dual High-Conversion CTAs: Navy Primary + Transparent WhatsApp with Green Border */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0A3663] hover:bg-[#124C85] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-md shadow-blue-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <GraduationCap className="w-5 h-5 text-[#0098DA]" />
                <span>Enroll in Next Batch</span>
              </Link>

              {/* Transparent background with green border & authentic WhatsApp logo */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-[#25D366] text-[#0A3663] hover:text-white border-2 border-[#25D366] px-7 py-3 rounded-xl font-bold text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group shadow-xs hover:shadow-green-500/20"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Trust Bullet Badges (Meaningful Icons with Unified Academy Blue) */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-[#0098DA] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">British Council & Pearson</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4.5 h-4.5 text-[#0098DA] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Certified Trainers</span>
              </div>
              <div className="flex items-center justify-start gap-2 col-span-2 sm:col-span-1">
                <Laptop className="w-4.5 h-4.5 text-[#0098DA] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Online & Offline Batches</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Classroom Image & Unified Brand Color Badges */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-xl border border-sky-100 overflow-hidden relative">
              {/* Classroom Photo Header */}
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="IELTS & PTE Class Students at RK International Academy"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3663]/90 via-[#0A3663]/40 to-transparent flex items-end p-5">
                  <div className="text-white">
                    <span className="bg-[#0098DA] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md">
                      Kilinochchi Campus
                    </span>
                    <p className="font-bold text-sm sm:text-base mt-1">
                      Comprehensive IELTS, PTE & Spoken English Training
                    </p>
                  </div>
                </div>
              </div>

              {/* Batch Tracker Body - All Uniform Professional Academy Brand Color */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-0.5">Band 7.5+ & PTE 65+ Success</span>
                  </div>
                  {/* Unified professional badge */}
                  <span className="text-[11px] font-bold text-[#0A3663] bg-sky-100/70 px-2.5 py-0.5 rounded-full border border-sky-200 shrink-0">
                    Admissions Open
                  </span>
                </div>

                {/* 3 Batches with UNIFIED consistent brand blue badges, aligned cleanly on mobile and desktop */}
                <div className="space-y-2.5 mb-4">
                  <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                    <div>
                      <p className="text-xs font-bold text-[#0A3663]">IELTS Academic & General</p>
                      <p className="text-[11px] text-slate-500">In-Person (Kilinochchi A-9 Campus)</p>
                    </div>
                    <span className="self-start sm:self-auto text-[11px] sm:text-xs font-bold text-[#0A3663] bg-white px-2.5 py-0.5 sm:py-1 rounded-md border border-sky-200 shadow-2xs whitespace-nowrap">
                      Weekday / Weekend
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                    <div>
                      <p className="text-xs font-bold text-[#0A3663]">PTE Academic Coaching</p>
                      <p className="text-[11px] text-slate-500">Computerized Lab Practice & Fast Results</p>
                    </div>
                    <span className="self-start sm:self-auto text-[11px] sm:text-xs font-bold text-[#0A3663] bg-white px-2.5 py-0.5 sm:py-1 rounded-md border border-sky-200 shadow-2xs whitespace-nowrap">
                      Computer Lab
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                    <div>
                      <p className="text-xs font-bold text-[#0A3663]">Live Online Classes</p>
                      <p className="text-[11px] text-slate-500">Interactive Zoom Evening Batch</p>
                    </div>
                    <span className="self-start sm:self-auto text-[11px] sm:text-xs font-bold text-[#0A3663] bg-white px-2.5 py-0.5 sm:py-1 rounded-md border border-sky-200 shadow-2xs whitespace-nowrap">
                      Live Virtual
                    </span>
                  </div>
                </div>

                <div className="bg-[#0A3663] text-white p-3 sm:p-3.5 rounded-xl text-center flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="text-center sm:text-left">
                    <p className="text-[11px] text-sky-200">Questions about fees or schedules?</p>
                    <p className="text-xs font-bold">Call Our Admissions Desk</p>
                  </div>
                  <a
                    href={`tel:${ACADEMY_INFO.phone}`}
                    className="text-xs font-extrabold text-[#0098DA] bg-white px-3 py-1.5 rounded-lg hover:bg-sky-50 transition-colors shrink-0"
                  >
                    {ACADEMY_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
