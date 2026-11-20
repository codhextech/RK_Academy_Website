'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Star,
  CheckCircle2,
  Laptop,
  Sparkles,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO, R2_MEDIA, R2_PUBLIC_BASE } from '@/lib/constants';

interface HeroSectionProps {
  watermarkUrl?: string;
  heroClassroomUrl?: string;
  whatsappNumber?: string;
}

const ROTATING_TRACKS = [
  'IELTS Academic & UKVI',
  'PTE Academic & Core',
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
  { name: 'PTE Academic & Core', href: '/ielts-courses/pte-academic' },
  { name: 'Life Skills (A1/B1)', href: '/student-success#section-results' },
  { name: 'Spoken English', href: '/ielts-courses' },
];

export default function HeroSection({
  watermarkUrl = R2_MEDIA.brand.watermark,
  whatsappNumber = ACADEMY_INFO.whatsappNumber,
}: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  // Auto-advance real RK Academy photo slideshow every 5s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

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

  const activeSlide = HERO_SLIDES[slideIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50/70 border-b border-slate-200/80 py-8 sm:py-10 lg:py-12">
      {/* Subtle Ambient Brand Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#0098DA]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 right-0 w-96 h-96 rounded-full bg-[#0A3663]/10 blur-3xl"
      />

      {/* Subtle Brand Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[460px] lg:w-[560px] aspect-[1024/766] opacity-[0.03] pointer-events-none select-none z-0"
      >
        <Image
          src={watermarkUrl}
          alt=""
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 460px, 560px"
        />
      </div>

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* ============================================================== */}
          {/* LEFT COLUMN: ACTION, AUTHORITY & ANIMATED HEADLINE             */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            {/* Bold Headline with Animated Rotating Keyword */}
            <div className="space-y-2.5">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-extrabold text-[#0A3663] tracking-tight leading-[1.12]">
                Achieve Band <span className="text-[#0098DA]">7.5+</span> in
                <span className="block mt-1 min-h-[1.2em] overflow-hidden">
                  <span
                    key={wordIndex}
                    className="inline-block animate-rk-word-enter bg-gradient-to-r from-[#0A3663] via-[#0098DA] to-[#0A3663] bg-clip-text text-transparent"
                  >
                    {ROTATING_TRACKS[wordIndex]}
                  </span>
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Structured exam coaching, computerized mock labs, and personal speaking feedback for{' '}
                <strong className="text-[#0A3663]">UK, Canada, Australia &amp; New Zealand</strong> study and migration pathways — In-Person in Kilinochchi &amp; Live Online.
              </p>
            </div>

            {/* 2 High-Contrast CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/register"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0A3663] to-[#0098DA] hover:from-[#062343] hover:to-[#007BB5] text-white font-extrabold text-sm sm:text-[15px] shadow-[0_10px_25px_rgba(10,54,99,0.28)] hover:shadow-[0_14px_30px_rgba(0,152,218,0.38)] transition-all duration-300 active:scale-[0.98]"
              >
                {/* Hover Shine Sweep */}
                <span
                  aria-hidden="true"
                  className="animate-rk-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                <Sparkles className="w-4 h-4 text-sky-200 shrink-0" />
                <span>Enroll / Register Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#25D366] text-[#0A3663] hover:text-white border-2 border-[#25D366] font-extrabold text-sm sm:text-[15px] shadow-xs hover:shadow-[0_10px_24px_rgba(37,211,102,0.3)] transition-all duration-300 group active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors shrink-0" />
                <span>WhatsApp Free Consultation</span>
              </a>
            </div>

            {/* Quick Course Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              {COURSE_TAGS.map((tag) => (
                <Link
                  key={tag.name}
                  href={tag.href}
                  className="text-[11px] sm:text-xs font-bold text-[#0A3663] bg-white/90 hover:bg-[#0A3663] hover:text-white px-3 py-1.5 rounded-full border border-slate-200 hover:border-[#0A3663] shadow-2xs transition-all duration-200"
                >
                  {tag.name}
                </Link>
              ))}
            </div>

            {/* Clean Animated Count-Up Stats Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-3 border-t border-slate-200/80 max-w-lg">
              <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs">
                <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-[#0A3663] tabular-nums leading-none">
                  {passRate}%
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-1 leading-tight">
                  First-Attempt Pass Rate
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs">
                <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-[#0098DA] tabular-nums leading-none">
                  {studentsCount}+
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-1 leading-tight">
                  Students Guided Abroad
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-1">
                  <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-[#0A3663] tabular-nums leading-none">
                    {ratingVal.toFixed(1)}
                  </p>
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 shrink-0" />
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-1 leading-tight">
                  Verified Student Rating
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: AUTO-SLIDING REAL RK ACADEMY PHOTO SHOWCASE      */}
          {/* ============================================================== */}
          <div
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main Rounded Showcase Frame */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] xl:aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(10,54,99,0.18)] border-4 border-white bg-[#062343]">
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
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`object-cover ${isActive ? 'animate-rk-ken-burns' : ''}`}
                    />
                  </div>
                );
              })}

              {/* Rich Bottom Gradient Overlay for Caption & Slide Controls */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#062343]/90 via-[#062343]/45 to-transparent z-20 pointer-events-none" />

              {/* Bottom Caption + Interactive Dots */}
              <div className="absolute inset-x-0 bottom-0 z-30 p-4 sm:p-5 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-200 bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                    <CheckCircle2 className="w-3 h-3 text-[#0098DA]" />
                    {activeSlide.tag}
                  </span>
                  <p className="text-white font-bold text-sm sm:text-base mt-1.5 truncate drop-shadow-xs">
                    {activeSlide.caption}
                  </p>
                </div>

                {/* Slide Indicator Dots */}
                <div className="flex items-center gap-1.5 shrink-0 pb-1">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.src}
                      type="button"
                      onClick={() => setSlideIndex(idx)}
                      aria-label={`View slide ${idx + 1}: ${s.caption}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === slideIndex
                          ? 'w-7 bg-[#0098DA]'
                          : 'w-2 bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Glass Badge 1: Top-Left Delivery Mode */}
            <div className="hidden sm:flex items-center gap-2.5 absolute -top-4 -left-4 lg:-left-6 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-[0_12px_32px_rgba(10,54,99,0.16)] border border-sky-100 animate-float">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                <Laptop className="w-4 h-4 text-[#0098DA]" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-extrabold text-[#0A3663]">In-Person &amp; Live Online</p>
                <p className="text-[11px] text-slate-500 font-medium">Kilinochchi Campus &amp; Zoom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
