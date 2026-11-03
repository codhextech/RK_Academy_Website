import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, GraduationCap, CheckCircle2, Star, MapPin } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-100">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subtext, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Local Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E0F2FE] border border-[#BAE6FD] text-[#0A3663] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#0098DA] animate-ping" />
              <MapPin className="w-3.5 h-3.5 text-[#0098DA]" />
              <span>A-9 Road, Kilinochchi & Live Online Classes</span>
            </div>

            {/* Main SEO H1 Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A3663] tracking-tight leading-[1.15]">
              Achieve Band <span className="text-[#0098DA]">7.5+</span> in IELTS, Score High in <span className="text-[#0098DA]">PTE</span> & Master Fluent English
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              <strong>The Way of Success.</strong> Learn from certified instructors with personalized coaching, real test simulations, and British Council & Pearson registration support. Join in-person at our Kilinochchi center or online from anywhere.
            </p>

            {/* Dual High-Conversion CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0A3663] hover:bg-[#124C85] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-blue-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <GraduationCap className="w-5 h-5 text-[#0098DA]" />
                <span>Enroll in Next Batch</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-7 py-4 rounded-xl font-bold text-base shadow-lg shadow-green-600/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp: {ACADEMY_INFO.phone}</span>
              </a>
            </div>

            {/* Trust Bullet Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left border-t border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">British Council & Pearson</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Certified Trainers</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Online & Offline Batches</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Classroom Image & Upcoming Batches */}
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

              {/* Batch Tracker Body */}
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1">Band 7.5+ & PTE 65+ Success</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Admissions Open
                  </span>
                </div>

                <div className="space-y-2.5 mb-5">
                  <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-[#0A3663]">IELTS Academic & General</p>
                      <p className="text-[11px] text-slate-500">In-Person (Kilinochchi A-9 Campus)</p>
                    </div>
                    <span className="text-xs font-bold text-[#0098DA] bg-white px-2.5 py-1 rounded-md border border-sky-200">
                      Weekday / Weekend
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-[#0A3663]">PTE Academic Coaching</p>
                      <p className="text-[11px] text-slate-500">Computerized Lab Practice & Fast Results</p>
                    </div>
                    <span className="text-xs font-bold text-amber-600 bg-white px-2.5 py-1 rounded-md border border-amber-200">
                      Computer Lab
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-[#0A3663]">Live Online Classes</p>
                      <p className="text-[11px] text-slate-500">Interactive Zoom Evening Batch</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-white px-2.5 py-1 rounded-md border border-emerald-200">
                      Live Virtual
                    </span>
                  </div>
                </div>

                <div className="bg-[#0A3663] text-white p-3.5 rounded-xl text-center flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[11px] text-sky-200">Questions about fees or schedules?</p>
                    <p className="text-xs font-bold">Call Our Admissions Desk</p>
                  </div>
                  <a
                    href={`tel:${ACADEMY_INFO.phone}`}
                    className="text-xs font-extrabold text-[#0098DA] bg-white px-3 py-1.5 rounded-lg hover:bg-sky-50 transition-colors"
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
