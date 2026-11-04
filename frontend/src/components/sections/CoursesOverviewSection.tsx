'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Clock,
  Laptop,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { ACADEMY_COURSES } from '@/lib/coursesData';

const COURSES = ACADEMY_COURSES.map((c) => ({
  id: c.id,
  title: c.title,
  tag: c.tag,
  slug: c.slug,
  linkHref: c.slug === 'ielts-ukvi' ? '/ielts-courses/academic' : `/ielts-courses/${c.slug}`,
  image: c.image,
  description: c.description,
  highlights: c.curriculumHighlights.slice(0, 4),
  duration: c.duration,
  modes: c.modes,
  accentColor: c.accentColor,
  badgeBg: c.badgeBg,
  popular: c.popular,
  category: c.category,
}));

export default function CoursesOverviewSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);

  // Check scroll position to update active indicator
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth < 640 ? clientWidth + 24 : clientWidth / 3;
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
    if (clientWidth < 640) return clientWidth + 24;
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
            ? clientWidth + 24
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
      className="pt-4 pb-8 md:pt-5 md:pb-6 bg-slate-50 border-t border-slate-100 relative overflow-hidden"
      id="courses"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3 md:mb-4 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3663] tracking-tight">
              Our Courses &amp; Programs
            </h2>
          </div>

          <Link
            href="/ielts-courses"
            className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-bold text-[#0098DA] hover:text-[#0A3663] transition-colors group shrink-0 self-center sm:self-end pb-0.5"
          >
            <span>View All 7 Programs</span>
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
          {/* Left Arrow Button (Minimized on Mobile, Full-Size on Desktop) - Default Transparent to Not Hide Text */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous courses"
            className="flex absolute left-1 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-transparent text-[#0A3663] border border-[#0A3663]/40 items-center justify-center hover:bg-[#0A3663] hover:text-white hover:border-[#0A3663] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="w-full min-w-full sm:w-auto sm:min-w-[340px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center sm:snap-start bg-white rounded-2xl shadow-sm hover:shadow-xl border-t-4 border-[#0098DA] border-x border-b border-slate-200/80 overflow-hidden flex flex-col justify-between transition-all duration-300 relative group"
            >
              {course.popular && (
                <div className="absolute top-2.5 right-2.5 z-10 bg-[#0A3663] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm border border-sky-300/30">
                  Most Popular
                </div>
              )}

              {/* Course Image Thumbnail with Branded Fallback */}
              <div className="relative h-44 sm:h-48 md:h-40 lg:h-44 w-full bg-gradient-to-br from-[#0A3663] via-[#0D447D] to-[#0098DA] overflow-hidden flex items-center justify-center shrink-0">
                <GraduationCap className="w-12 h-12 text-white/20 absolute" />
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-3 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs bg-white text-[#0A3663] border border-sky-100 z-10">
                  {course.tag}
                </span>
              </div>

              {/* Clean Coursera-Style Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Provider Tag */}
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0098DA]">
                    <span className="w-2 h-2 rounded-full bg-[#0098DA]" />
                    <span>RK International Academy</span>
                  </div>

                  {/* Course Title */}
                  <h3
                    className="text-base sm:text-lg font-bold text-[#0A3663] leading-snug line-clamp-2 min-h-[2.75rem]"
                    title={course.title}
                  >
                    <Link href={course.linkHref} className="hover:text-[#0098DA] transition-colors">
                      {course.title}
                    </Link>
                  </h3>

                  {/* Duration & Mode Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2 px-3 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5 truncate">
                      <Clock className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                      <span className="truncate"><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Laptop className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                      <span className="truncate">{course.modes}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons: View Syllabus + Enroll Now */}
                <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={course.linkHref}
                    className="flex-1 text-center py-2.5 px-3 rounded-xl font-bold text-xs border-2 border-[#0A3663] text-[#0A3663] hover:bg-slate-50 transition-colors truncate"
                  >
                    View Syllabus
                  </Link>
                  <Link
                    href={`/register?course=${course.slug}`}
                    className="flex-1 text-center py-2.5 px-3 rounded-xl font-bold text-xs bg-[#0A3663] hover:bg-[#124C85] text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95 truncate"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                    <span className="truncate">Enroll Now</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button (Minimized on Mobile, Full-Size on Desktop) - Default Transparent to Not Hide Text */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          aria-label="Next courses"
          className="flex absolute right-1 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-transparent text-[#0A3663] border border-[#0A3663]/40 items-center justify-center hover:bg-[#0A3663] hover:text-white hover:border-[#0A3663] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Carousel Slide Indicators / Dots */}
      <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
        {COURSES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to course slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
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
