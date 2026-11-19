import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, ShieldCheck, Laptop, Star } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO, R2_MEDIA } from '@/lib/constants';

interface HeroSectionProps {
  watermarkUrl?: string;
  heroClassroomUrl?: string;
}

export default function HeroSection({
  watermarkUrl = R2_MEDIA.brand.watermark,
  heroClassroomUrl = R2_MEDIA.brand.heroClassroom,
}: HeroSectionProps) {
  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50/60 pt-6 pb-8 md:pt-10 md:pb-14 border-b border-slate-100">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

      {/* Expanded Responsive Container for all displays from mobile to 24"+ widescreen */}
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 2xl:gap-16 items-center">
          {/* Left Column: Heading, Subtext, CTAs with Lightly Shaded 3D Logo Watermark */}
          <div className="lg:col-span-7 2xl:col-span-7 text-center lg:text-left relative">
            {/* Mobile & Tablet Watermark (Preserves exact mobile alignment) */}
            <div
              aria-hidden="true"
              className="lg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] md:w-[540px] aspect-[1024/766] opacity-[0.08] sm:opacity-[0.09] pointer-events-none select-none z-0"
            >
              <Image
                src={watermarkUrl}
                alt=""
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 480px, 540px"
              />
            </div>

            {/* Foreground Content Stack */}
            <div className="relative z-10 space-y-6 2xl:space-y-8">
              {/* Heading + Subheading Wrapper (Keeps Desktop Watermark neatly behind copy & above buttons) */}
              <div className="relative space-y-6 2xl:space-y-8">
                {/* Desktop Watermark */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute top-1/2 left-[46%] xl:left-[44%] -translate-x-1/2 -translate-y-1/2 w-[340px] xl:w-[375px] 2xl:w-[420px] aspect-[1024/766] opacity-[0.065] pointer-events-none select-none z-0"
                >
                  <Image
                    src={watermarkUrl}
                    alt=""
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 1280px) 375px, 420px"
                  />
                </div>

                {/* Main SEO H1 Heading */}
                <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] 2xl:text-[62px] 2xl:leading-[1.12] font-extrabold text-[#0A3663] tracking-tight leading-[1.15]">
                  Achieve Band <span className="text-[#0098DA]">7.5+</span> in IELTS, Score High in <span className="text-[#0098DA]">PTE</span> &amp; Master Fluent English
                </h1>

                {/* Subheading */}
                <p className="relative z-10 text-base sm:text-lg 2xl:text-xl text-slate-600 max-w-2xl lg:max-w-3xl 2xl:max-w-4xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  <strong>The Way of Success.</strong> Learn from certified instructors with personalized coaching, real test simulations, and British Council &amp; Pearson registration support. Join in-person at our Kilinochchi center or online from anywhere.
                </p>
              </div>

              {/* Dual High-Conversion CTAs: Single Row on Mobile & Centered */}
              <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-2 w-full max-w-lg lg:max-w-none mx-auto lg:mx-0">
                <Link
                  href="/register"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#0A3663] hover:bg-[#124C85] text-white px-3 sm:px-7 lg:px-8 py-3 sm:py-3.5 2xl:px-9 2xl:py-4 rounded-xl font-bold text-xs sm:text-base 2xl:text-lg shadow-md shadow-blue-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#0098DA] shrink-0" />
                  <span className="whitespace-nowrap">Enroll in Next Batch</span>
                </Link>

                {/* Crisp white fill with green border & authentic WhatsApp logo */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2.5 bg-white hover:bg-[#25D366] text-[#0A3663] hover:text-white border-2 border-[#25D366] px-3 sm:px-7 py-2.5 sm:py-3 2xl:px-8 2xl:py-3.5 rounded-xl font-bold text-xs sm:text-base 2xl:text-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group shadow-xs hover:shadow-green-500/20 text-center"
                >
                  <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] group-hover:text-white transition-colors shrink-0" />
                  <span className="whitespace-nowrap">Chat on WhatsApp</span>
                </a>
              </div>

              {/* Trust Bullet Badges (Centered grid on Mobile, Single clean aligned row on Desktop) */}
              <div className="pt-5 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:gap-x-5 xl:gap-x-7 lg:gap-y-2.5 gap-2.5 sm:gap-3 2xl:gap-x-8 text-center sm:text-left border-t border-slate-200/80 max-w-lg lg:max-w-2xl mx-auto lg:mx-0">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0098DA] shrink-0" />
                  <span className="text-[11px] sm:text-sm lg:text-[13px] xl:text-sm 2xl:text-base font-semibold text-slate-700 lg:whitespace-nowrap">British Council &amp; Pearson</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0098DA] shrink-0" />
                  <span className="text-[11px] sm:text-sm lg:text-[13px] xl:text-sm 2xl:text-base font-semibold text-slate-700 lg:whitespace-nowrap">Certified Trainers</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 col-span-2 sm:col-span-1 shrink-0">
                  <Laptop className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0098DA] shrink-0" />
                  <span className="text-[11px] sm:text-sm lg:text-[13px] xl:text-sm 2xl:text-base font-semibold text-slate-700 lg:whitespace-nowrap">Online &amp; Offline Batches</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Classroom Image & Unified Brand Color Badges */}
          <div className="lg:col-span-5 2xl:col-span-5 w-full">
            <div className="bg-white rounded-3xl shadow-xl border border-sky-100 overflow-hidden relative max-w-lg lg:max-w-none mx-auto w-full">
              {/* Classroom Photo Header */}
              <div className="relative h-48 sm:h-52 2xl:h-64 w-full">
                <Image
                  src={heroClassroomUrl}
                  alt="IELTS &amp; PTE Class Students at RK International Academy"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3663]/90 via-[#0A3663]/40 to-transparent flex items-end p-5 2xl:p-6">
                  <div className="text-white">
                    <span className="bg-[#0098DA] text-white text-[10px] 2xl:text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md">
                      Kilinochchi Campus
                    </span>
                    <p className="font-bold text-sm sm:text-base 2xl:text-lg mt-1">
                      Comprehensive IELTS, PTE &amp; Spoken English Training
                    </p>
                  </div>
                </div>
              </div>

              {/* Batch Tracker Body - All Uniform Professional Academy Brand Color */}
              <div className="p-4 sm:p-6 2xl:p-7">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                    <span className="text-xs 2xl:text-sm font-bold text-slate-700 ml-0.5">Band 7.5+ &amp; PTE 65+ Success</span>
                  </div>
                  {/* Unified professional badge */}
                  <span className="text-[11px] 2xl:text-xs font-bold text-[#0A3663] bg-sky-100/70 px-2.5 py-0.5 rounded-full border border-sky-200 shrink-0">
                    Admissions Open
                  </span>
                </div>

                {/* 3 Batches with UNIFIED consistent brand blue badges, aligned cleanly on mobile and desktop */}
                <div className="space-y-2.5 mb-4">
                  <div className="p-3 2xl:p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                    <div>
                      <p className="text-xs 2xl:text-sm font-bold text-[#0A3663]">IELTS Academic &amp; General</p>
                      <p className="text-[11px] 2xl:text-xs text-slate-500">In-Person (Kilinochchi A-9 Campus)</p>
                    </div>
                    <span className="self-start sm:self-auto text-[11px] sm:text-xs font-bold text-[#0A3663] bg-white px-2.5 py-0.5 sm:py-1 rounded-md border border-sky-200 shadow-2xs whitespace-nowrap">
                      Weekday / Weekend
                    </span>
                  </div>

                  <div className="p-3 2xl:p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                    <div>
                      <p className="text-xs 2xl:text-sm font-bold text-[#0A3663]">PTE Academic Coaching</p>
                      <p className="text-[11px] 2xl:text-xs text-slate-500">Computerized Lab Practice &amp; Fast Results</p>
                    </div>
                    <span className="self-start sm:self-auto text-[11px] sm:text-xs font-bold text-[#0A3663] bg-white px-2.5 py-0.5 sm:py-1 rounded-md border border-sky-200 shadow-2xs whitespace-nowrap">
                      Computer Lab
                    </span>
                  </div>

                  <div className="p-3 2xl:p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                    <div>
                      <p className="text-xs 2xl:text-sm font-bold text-[#0A3663]">Live Online Classes</p>
                      <p className="text-[11px] 2xl:text-xs text-slate-500">Interactive Zoom Evening Batch</p>
                    </div>
                    <span className="self-start sm:self-auto text-[11px] sm:text-xs font-bold text-[#0A3663] bg-white px-2.5 py-0.5 sm:py-1 rounded-md border border-sky-200 shadow-2xs whitespace-nowrap">
                      Live Virtual
                    </span>
                  </div>
                </div>

                <div className="bg-[#0A3663] text-white p-3 sm:p-3.5 2xl:p-4 rounded-xl text-center flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <div className="text-center sm:text-left">
                    <p className="text-[11px] 2xl:text-xs text-sky-200">Questions about fees or schedules?</p>
                    <p className="text-xs 2xl:text-sm font-bold">Call Our Admissions Desk</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 shrink-0">
                    <a
                      href={`tel:${ACADEMY_INFO.phone1Raw}`}
                      className="text-[11px] sm:text-xs 2xl:text-sm font-extrabold text-[#0098DA] bg-white px-2.5 py-1.5 rounded-lg hover:bg-sky-50 transition-colors whitespace-nowrap"
                    >
                      {ACADEMY_INFO.phone1}
                    </a>
                    <a
                      href={`tel:${ACADEMY_INFO.phone2Raw}`}
                      className="text-[11px] sm:text-xs 2xl:text-sm font-extrabold text-[#0098DA] bg-white px-2.5 py-1.5 rounded-lg hover:bg-sky-50 transition-colors whitespace-nowrap"
                    >
                      {ACADEMY_INFO.phone2}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
