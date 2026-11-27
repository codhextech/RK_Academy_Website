'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Star,
  Laptop,
  Sparkles,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO, R2_PUBLIC_BASE } from '@/lib/constants';

interface HeroSectionProps {
  watermarkUrl?: string;
  heroClassroomUrl?: string;
  whatsappNumber?: string;
}

const ROTATING_TRACKS = [
  'IELTS Academic & UKVI',
  'PTE Academic, General & Core',
  'Fluent Spoken English',
  'Cambridge & IT Diplomas',
];

const HERO_SLIDES = [
  {
    src: `${R2_PUBLIC_BASE}/uploads/event-interactive-lecture-workshop.jpg`,
    alt: 'Interactive IELTS & English Strategy Seminar at RK International Language Academy',
    caption: 'Interactive IELTS & Strategy Seminar',
    tag: 'Kilinochchi Campus',
  },
  {
    src: `${R2_PUBLIC_BASE}/uploads/event-ielts-academy-uniform-batch.jpg`,
    alt: 'RK International Language Academy IELTS Batch in Official Uniforms',
    caption: 'Official RK Academy IELTS Batch',
    tag: 'British Council Referral Agent',
  },
  {
    src: `${R2_PUBLIC_BASE}/uploads/event-mock-exam-practice-session.jpg`,
    alt: 'Supervised IELTS & PTE Mock Exam Practice Hall at RK Academy',
    caption: 'Supervised Mock Exam & Writing Hall',
    tag: 'Real Exam Simulation',
  },
  {
    src: `${R2_PUBLIC_BASE}/uploads/event-teachers-day-2026.jpg`,
    alt: 'RK Academy Students and Lecturers Community Celebration',
    caption: 'Supportive Academy Community',
    tag: 'Kilinochchi & Live Online',
  },
  {
    src: `${R2_PUBLIC_BASE}/uploads/event-group-study-classroom-session.jpg`,
    alt: 'Small-Group English Study Session at RK International Language Academy',
    caption: 'Small-Group Speaking & Writing Lab',
    tag: 'Personalized Coaching',
  },
];

const COURSE_TAGS = [
  { name: 'IELTS Academic', href: '/ielts-courses/academic' },
  { name: 'IELTS General', href: '/ielts-courses/general-training' },
  { name: 'PTE Academic, General & Core', href: '/ielts-courses/pte-academic' },
  { name: 'IELTS Life Skills (A1/B1)', href: '/student-success#section-results' },
  { name: 'Spoken English', href: '/ielts-courses' },
];

export default function HeroSection({
  whatsappNumber = ACADEMY_INFO.whatsappNumber,
}: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  // Smooth count-up stats
  const [passRate, setPassRate] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [ratingVal, setRatingVal] = useState(0);

  // Rotate headline keyword every 3.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_TRACKS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance full background hero photo smoothly every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Smooth ease-out count-up animation for stats on mount
  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      setPassRate(Math.round(eased * 98));
      setStudentsCount(Math.round(eased * 500));
      setRatingVal(Number((eased * 4.9).toFixed(1)));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi RK International Language Academy, I would like a free consultation on IELTS / PTE / English courses.'
  )}`;

  return (
    <section className="relative overflow-hidden bg-[#061A33] border-b border-slate-800/80 min-h-[100svh] lg:h-[100svh] lg:min-h-[600px] lg:max-h-[880px] flex items-center pt-22 sm:pt-24 lg:pt-22 pb-6 sm:pb-8">
      {/* ============================================================== */}
      {/* FULL-BLEED SMOOTH AUTO-CHANGING SINGLE BACKGROUND PHOTO        */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#061A33]">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === slideIndex;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover object-center lg:object-[65%_center] ${
                  isActive ? 'animate-rk-ken-burns' : ''
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* DIRECTIONAL BLUR + DARK GRADIENT + SUBTLE SQUARE GRID OVERLAY  */}
      {/* Left side blurred & dark for crisp text; right side clear      */}
      {/* ============================================================== */}

      {/* Mobile / Tablet readable backdrop */}
      <div
        aria-hidden="true"
        className="lg:hidden pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#061A33]/90 via-[#061A33]/80 to-[#061A33]/75 backdrop-blur-[3px]"
      />

      {/* Desktop Left-Side Directional Blur (fades smoothly to 0% blur on the right) */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute inset-0 z-10 backdrop-blur-[10px]"
        style={{
          maskImage:
            'linear-gradient(to right, black 0%, black 38%, rgba(0,0,0,0.55) 49%, transparent 60%)',
          WebkitMaskImage:
            'linear-gradient(to right, black 0%, black 38%, rgba(0,0,0,0.55) 49%, transparent 60%)',
        }}
      />

      {/* Desktop Left-to-Right Dark Scrim (rich dark left -> crystal clear right) */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to right, rgba(6, 26, 51, 0.94) 0%, rgba(6, 26, 51, 0.85) 35%, rgba(6, 26, 51, 0.42) 50%, rgba(6, 26, 51, 0.06) 66%, rgba(6, 26, 51, 0.0) 100%)',
        }}
      />

      {/* Subtle Top Gradient so floating navbar sits cleanly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#061A33]/55 to-transparent z-10"
      />

      {/* Subtle Translucent Square Grid Lines Overlay (Reference Style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* ============================================================== */}
      {/* FOREGROUND CONTENT (FITS CLEANLY IN FIRST VIEWPORT)            */}
      {/* ============================================================== */}
      <div className="site-container relative z-20 w-full">
        <div className="max-w-xl lg:max-w-[540px] space-y-4 sm:space-y-5">
          {/* Delivery Mode Pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-sky-200 text-xs font-bold">
            <Laptop className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span>In-Person &amp; Live Online • Kilinochchi Campus &amp; Zoom</span>
          </div>

          {/* Bold Headline with Animated Rotating Keyword */}
          <div className="space-y-2.5">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-xs">
              Achieve Band <span className="text-[#38BDF8]">7.5+</span> in
              <span className="block mt-1 min-h-[1.2em] overflow-hidden">
                <span
                  key={wordIndex}
                  className="inline-block animate-rk-word-enter bg-gradient-to-r from-[#38BDF8] via-[#7DD3FC] to-[#0098DA] bg-clip-text text-transparent"
                >
                  {ROTATING_TRACKS[wordIndex]}
                </span>
              </span>
            </h1>

            <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed max-w-lg">
              Structured exam coaching, computerized mock labs, and personal speaking feedback for{' '}
              <strong className="text-white">UK, Canada, Australia &amp; New Zealand</strong> study and migration pathways — In-Person in Kilinochchi &amp; Live Online.
            </p>
          </div>

          {/* 2 High-Contrast CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-0.5">
            <Link
              href="/register"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0098DA] to-[#38BDF8] hover:from-[#0284C7] hover:to-[#0098DA] text-white font-extrabold text-sm shadow-[0_10px_28px_rgba(0,152,218,0.4)] hover:shadow-[0_14px_34px_rgba(56,189,248,0.5)] transition-all duration-300 active:scale-[0.98]"
            >
              {/* Hover Shine Sweep */}
              <span
                aria-hidden="true"
                className="animate-rk-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              <Sparkles className="w-4 h-4 text-sky-100 shrink-0" />
              <span>Enroll / Register Now</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-white/12 hover:bg-[#25D366] text-white border border-white/25 hover:border-[#25D366] backdrop-blur-md font-extrabold text-sm shadow-xs hover:shadow-[0_10px_24px_rgba(37,211,102,0.35)] transition-all duration-300 group active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors shrink-0" />
              <span>WhatsApp Free Consultation</span>
            </a>
          </div>

          {/* Quick Course Navigation Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {COURSE_TAGS.map((tag) => (
              <Link
                key={tag.name}
                href={tag.href}
                className="text-[11px] sm:text-xs font-semibold text-slate-100 bg-white/10 hover:bg-[#0098DA] hover:text-white px-3 py-1 rounded-full border border-white/20 hover:border-[#0098DA] backdrop-blur-sm transition-all duration-200"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          {/* Floating White Count-Up Stats Bar */}
          <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.3)] px-3 sm:px-5 py-3 grid grid-cols-3 divide-x divide-slate-200 max-w-lg">
            <div className="pr-2 sm:pr-4">
              <p className="text-xl sm:text-2xl font-extrabold text-[#0A3663] tabular-nums leading-none">
                {passRate}%
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1 leading-tight">
                First-Attempt Pass Rate
              </p>
            </div>

            <div className="px-2 sm:px-4">
              <p className="text-xl sm:text-2xl font-extrabold text-[#0098DA] tabular-nums leading-none">
                {studentsCount}+
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1 leading-tight">
                Students Guided Abroad
              </p>
            </div>

            <div className="pl-2 sm:pl-4">
              <div className="flex items-center gap-1">
                <p className="text-xl sm:text-2xl font-extrabold text-[#0A3663] tabular-nums leading-none">
                  {ratingVal.toFixed(1)}
                </p>
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 shrink-0" />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1 leading-tight">
                Verified Student Rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
