'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Laptop,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

interface CourseItem {
  id: string;
  title: string;
  tag: string;
  slug: string;
  image: string;
  description: string;
  highlights: string[];
  duration: string;
  modes: string;
  accentColor: string;
  badgeBg: string;
  popular?: boolean;
}

const COURSES: CourseItem[] = [
  {
    id: 'c-academic',
    title: 'IELTS Academic',
    tag: 'Study Abroad (Higher Education)',
    slug: 'academic',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    description:
      'Designed for students aiming to study at undergraduate or postgraduate levels in the UK, Canada, Australia, New Zealand, USA, and Europe.',
    highlights: [
      'Academic Reading & Complex Data Analysis',
      'Task 1 Graph/Chart Report Writing & Task 2 Essays',
      'Intensive Listening with British & Aussie Accents',
      'One-on-One Speaking Mock Interviews',
    ],
    duration: '8 Weeks (60+ Hours)',
    modes: 'In-Person (Kilinochchi) & Online',
    accentColor: 'border-blue-500',
    badgeBg: 'bg-blue-50 text-blue-700',
  },
  {
    id: 'c-general',
    title: 'IELTS General Training',
    tag: 'Migration & Work Visas',
    slug: 'general-training',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
    description:
      'Tailored for individuals applying for permanent residency (PR), work permits, and immigration to Canada (Express Entry), Australia, and the UK.',
    highlights: [
      'Real-world Workplace Reading Contexts',
      'Task 1 Formal/Informal Letter Writing Mastery',
      'Band 8.0+ Task 2 Essay Writing Formats',
      'Speaking Confidence & Fluency Drills',
    ],
    duration: '8 Weeks (60+ Hours)',
    modes: 'In-Person (Kilinochchi) & Online',
    accentColor: 'border-[#0098DA]',
    badgeBg: 'bg-sky-50 text-[#0098DA]',
    popular: true,
  },
  {
    id: 'c-pte',
    title: 'PTE Academic Coaching',
    tag: 'Computer-Based Exam (Fast Results)',
    slug: 'preparation#pte',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    description:
      'Fast-track Pearson Test of English training with AI scoring insights. 100% accepted for Australia, New Zealand, and UK study & work visas.',
    highlights: [
      'Repeat Sentence & Describe Image AI Scoring Secrets',
      'Read Aloud & Retell Lecture Pronunciation Drills',
      'Summarize Written Text & Write Essay Templates',
      'Full Computer-Based Practice Lab Simulations',
    ],
    duration: '6 – 8 Weeks',
    modes: 'Kilinochchi Computer Lab & Online',
    accentColor: 'border-amber-500',
    badgeBg: 'bg-amber-50 text-amber-700',
  },
  {
    id: 'c-diploma',
    title: 'Diploma in English',
    tag: 'Comprehensive Qualification',
    slug: 'preparation#diploma',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    description:
      'Recognized academy diploma equipping students with advanced grammar, professional corporate writing, and formal presentation skills.',
    highlights: [
      'Advanced English Grammar & Sentence Structuring',
      'Professional Email, Report & Business Writing',
      'Public Speaking, Debates & Formal Presentations',
      'Official RK Academy Certificate Awarded',
    ],
    duration: '12 Weeks (3 Months)',
    modes: 'In-Person (Kilinochchi) & Online',
    accentColor: 'border-purple-500',
    badgeBg: 'bg-purple-50 text-purple-700',
  },
  {
    id: 'c-spoken',
    title: 'Spoken English & Fluency',
    tag: 'Daily Fluency & Confidence',
    slug: 'preparation#spoken-english',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
    description:
      'Overcome hesitation and fear of speaking English. Interactive conversation classes designed for students, job seekers, and working professionals.',
    highlights: [
      'Daily Speaking Circles & Real-Life Role Plays',
      'Accent Clarification & Clear Pronunciation Drills',
      'Job Interview Preparation & Impromptu Speeches',
      'Vocabulary Building for Social & Workplace Settings',
    ],
    duration: '8 Weeks',
    modes: 'In-Person (Kilinochchi) & Online',
    accentColor: 'border-emerald-500',
    badgeBg: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 'c-foundation',
    title: 'Foundation English (Pre-IELTS)',
    tag: 'Grammar, Fluency & IELTS Prep',
    slug: 'preparation',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    description:
      'The essential stepping stone program for students needing to build vocabulary and grammar foundations before starting intense IELTS test modules.',
    highlights: [
      'Basic to Intermediate English Grammar Tenses',
      'Vocabulary Expansion for International Exams',
      'Sentence Construction & Short Essay Writing',
      'Smooth Transition Pathway Directly to IELTS Band 7+',
    ],
    duration: '6 – 10 Weeks',
    modes: 'In-Person (Kilinochchi) & Online',
    accentColor: 'border-cyan-600',
    badgeBg: 'bg-cyan-50 text-cyan-800',
  },
];

export default function CoursesOverviewSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);

  // Check scroll position to update active indicator
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth < 640 ? clientWidth * 0.85 : clientWidth / 3;
    const currentIndex = Math.round(scrollLeft / cardWidth);
    setActiveCourseIndex(Math.min(currentIndex, COURSES.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState);
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  // Responsive step scroll amount
  const getStep = useCallback(() => {
    if (!scrollContainerRef.current) return 360;
    const { clientWidth } = scrollContainerRef.current;
    if (clientWidth < 640) return clientWidth * 0.85 + 24;
    if (clientWidth < 1024) return (clientWidth - 24) / 2 + 24;
    return (clientWidth - 48) / 3 + 24;
  }, []);

  // Smooth scroll left / right with seamless wrap-around
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const { clientWidth, scrollLeft, scrollWidth } = scrollContainerRef.current;
    const step = getStep();

    if (direction === 'right') {
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: step, behavior: 'smooth' });
      }
    } else {
      if (scrollLeft <= 25) {
        scrollContainerRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: -step, behavior: 'smooth' });
      }
    }
  };

  // Scroll to a specific card index
  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const step = getStep();
    scrollContainerRef.current.scrollTo({
      left: index * step,
      behavior: 'smooth',
    });
  };

  // Default auto-scroll loop (every 4 seconds) — pauses only when hovered or touched
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const step =
          clientWidth < 640
            ? clientWidth * 0.85 + 24
            : clientWidth < 1024
            ? (clientWidth - 24) / 2 + 24
            : (clientWidth - 48) / 3 + 24;
        scrollContainerRef.current.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section
      className="py-16 md:py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden"
      id="courses"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0098DA] bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
              Targeted Exam & Language Preparation
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663] mt-3 mb-2">
              Our IELTS & Language Programs
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Structured curriculum tailored to your specific goals—whether university abroad, PR migration, PTE, Diploma in English, or personal fluency.
            </p>
          </div>

          <Link
            href="/ielts-courses"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0098DA] hover:text-[#0A3663] transition-colors shrink-0 group self-start md:self-end"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel / Slider Container with Side Navigation Arrows */}
        <div
          className="relative group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Left Arrow Button (Marked Position) */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous courses"
            className="absolute left-1 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0A3663] text-white shadow-xl flex items-center justify-center hover:bg-[#124C85] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
          {COURSES.map((course) => (
            <div
              key={course.id}
              className={`min-w-[85%] sm:min-w-[360px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start bg-white rounded-2xl shadow-sm hover:shadow-xl border-t-4 ${course.accentColor} border-x border-b border-slate-200/80 overflow-hidden flex flex-col justify-between transition-all duration-300 relative group`}
            >
              {course.popular && (
                <div className="absolute top-3 right-3 z-10 bg-[#0098DA] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}

              {/* Course Image Thumbnail */}
              <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs bg-white text-[#0A3663]">
                  {course.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0A3663] mb-2 leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Duration & Mode Specs */}
                  <div className="space-y-2 py-3 border-y border-slate-100 mb-6 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0098DA] shrink-0" />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-[#0098DA] shrink-0" />
                      <span><strong>Mode:</strong> {course.modes}</span>
                    </div>
                  </div>

                  {/* Curriculum Bullet Points */}
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    What You Will Learn:
                  </h4>
                  <ul className="space-y-2.5 mb-8">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href={`/ielts-courses/${course.slug.split('#')[0]}`}
                    className="w-full text-center py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm border border-[#0A3663] text-[#0A3663] hover:bg-slate-50 transition-colors"
                  >
                    View Full Syllabus & Fees
                  </Link>
                  <Link
                    href="/register"
                    className="w-full text-center py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#0A3663] hover:bg-[#124C85] text-white flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <GraduationCap className="w-4 h-4 text-[#0098DA]" />
                    <span>Enroll in Course</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button (Marked Position) */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          aria-label="Next courses"
          className="absolute right-1 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0A3663] text-white shadow-xl flex items-center justify-center hover:bg-[#124C85] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

        {/* Carousel Slide Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {COURSES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to course slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeCourseIndex === idx
                  ? 'w-8 bg-[#0098DA]'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
