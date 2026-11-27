'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trophy,
  Calendar,
  Quote,
  Star,
  CheckCircle2,
  Maximize2,
  X,
  MapPin,
  ChevronRight,
  FileCheck,
  Languages,
  Sparkles,
  ArrowDown,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';
import {
  ExamResultItem,
  AcademyEventItem,
  StudentStoryItem,
  INITIAL_EXAM_RESULTS,
  INITIAL_ACADEMY_EVENTS,
  INITIAL_STUDENT_STORIES,
} from '@/lib/successData';

export default function StudentSuccessClient({
  initialExamResults = INITIAL_EXAM_RESULTS,
  initialEvents = INITIAL_ACADEMY_EVENTS,
  initialStories = INITIAL_STUDENT_STORIES,
  whatsappNumber = ACADEMY_INFO.whatsappNumber,
}: {
  initialExamResults?: ExamResultItem[];
  initialEvents?: AcademyEventItem[];
  initialStories?: StudentStoryItem[];
  whatsappNumber?: string;
}) {
  const [activeSection, setActiveSection] = useState<string>('section-results');
  const [resultsFilter, setResultsFilter] = useState<string>('All');
  const [eventsFilter, setEventsFilter] = useState<string>('All');
  const [storiesFilter, setStoriesFilter] = useState<string>('All');
  const [showTamil, setShowTamil] = useState<Record<string, boolean>>({});

  const toggleTamil = (id: string) => {
    setShowTamil((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [examResults, setExamResults] = useState<ExamResultItem[]>(initialExamResults);
  const [events, setEvents] = useState<AcademyEventItem[]>(initialEvents);
  const [stories, setStories] = useState<StudentStoryItem[]>(initialStories);

  // Lightbox Modal State
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    image: string;
    title: string;
    subtitle?: string;
  }>({
    open: false,
    image: '',
    title: '',
  });

  // Sync updated data from API if updated on background tab
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/success');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            if (data.examResults?.length) setExamResults(data.examResults);
            if (data.events?.length) setEvents(data.events);
            if (data.stories?.length) setStories(data.stories);
          }
        }
      } catch {
        // Keep server-hydrated initial state
      }
    }
    loadData();
  }, []);

  // Scroll-Spy: Track which section is active as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['section-results', 'section-events', 'section-stories'];
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to a section when clicking navigation
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Filtered Exam Results
  const filteredResults = examResults.filter((item) => {
    if (resultsFilter === 'All') return true;
    if (resultsFilter === 'IELTS Life Skills & SELT') {
      return (
        item.examType.toLowerCase().includes('life skills') ||
        item.examType.toLowerCase().includes('skills for english') ||
        item.examType.toLowerCase().includes('selt')
      );
    }
    return item.examType.toLowerCase().includes(resultsFilter.toLowerCase());
  });

  // Filtered Events
  const filteredEvents = events.filter((item) => {
    if (eventsFilter === 'All') return true;
    return item.category.toLowerCase().includes(eventsFilter.toLowerCase());
  });

  // Filtered Student Stories & Reviews
  const filteredStories = stories.filter((story) => {
    if (storiesFilter === 'All') return true;
    if (storiesFilter === 'Kamshalini') {
      return (
        story.comment.toLowerCase().includes('kamshalini') ||
        Boolean(story.originalTamil && story.originalTamil.includes('Kamshalini')) ||
        story.overallScore.toLowerCase().includes('kamshalini')
      );
    }
    if (storiesFilter === 'Diploma & Grammar') {
      return (
        story.course.toLowerCase().includes('diploma') ||
        story.course.toLowerCase().includes('grammar') ||
        story.overallScore.toLowerCase().includes('grammar')
      );
    }
    if (storiesFilter === 'Speaking & Presentations') {
      return (
        story.course.toLowerCase().includes('speaking') ||
        story.course.toLowerCase().includes('presentation') ||
        story.overallScore.toLowerCase().includes('presentation') ||
        story.overallScore.toLowerCase().includes('fluent')
      );
    }
    if (storiesFilter === 'Handwritten') {
      return Boolean(story.handwrittenImage);
    }
    return true;
  });

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi RK Academy, I saw your student exam results and would like to inquire about coaching.'
  )}`;

  // Navigation Items configuration
  const navSections = [
    {
      id: 'section-results',
      title: 'Exam Results & Scorecards',
      icon: Trophy,
    },
    {
      id: 'section-events',
      title: 'Academy Events & Workshops',
      icon: Calendar,
    },
    {
      id: 'section-stories',
      title: 'Student Feedback & Stories',
      icon: Quote,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Header Section - Clean & Compact (Sub-heading removed) */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-8 md:py-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="site-container relative z-10 max-w-3xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Success Stories &amp; Academy Events
          </h1>
        </div>
      </section>

      {/* 2. Mobile / Tablet Sticky Header Tracker (Hidden on Large Screens) */}
      <div className="lg:hidden sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-2.5 px-4 shadow-xs">
        <div className="site-container">
          <div className="flex items-center justify-between gap-1.5 overflow-x-auto scrollbar-none">
            {navSections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0A3663] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <sec.icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0098DA]' : 'text-slate-400'}`} />
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Split-Screen Motion Showcase */}
      <div className="site-container py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* LEFT COLUMN: Sticky Motion Navigation Panel (4 Cols on lg/xl) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 z-20 space-y-5">
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-[#0A3663]">
                Explore by Category
              </h2>

              {/* 3 Clean Animated Heading Tabs */}
              <nav className="space-y-3">
                {navSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 relative group cursor-pointer flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-[#0A3663] text-white shadow-lg shadow-[#0A3663]/25 ring-2 ring-[#0098DA] translate-x-1'
                          : 'bg-slate-50 text-slate-700 hover:bg-sky-50/70 hover:text-[#0A3663] border border-slate-200/80 hover:border-sky-300'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? 'bg-[#0098DA] text-white shadow-md'
                              : 'bg-white text-slate-500 border border-slate-200 group-hover:text-[#0098DA] group-hover:border-[#0098DA]/40'
                          }`}
                        >
                          <sec.icon className="w-5 h-5" />
                        </div>
                        <h3
                          className={`font-bold text-sm sm:text-base leading-snug transition-colors ${
                            isActive ? 'text-white' : 'text-[#0A3663] group-hover:text-[#0098DA]'
                          }`}
                        >
                          {sec.title}
                        </h3>
                      </div>

                      {/* Right Indicator Pill */}
                      <div
                        className={`w-1.5 h-7 rounded-full transition-all duration-300 shrink-0 ${
                          isActive
                            ? 'bg-[#0098DA] opacity-100 scale-y-100'
                            : 'bg-transparent opacity-0 scale-y-0'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Admissions Help Card */}
            <div className="bg-sky-50/70 rounded-3xl p-5 border border-sky-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A3663]">
                <Sparkles className="w-4 h-4 text-[#0098DA]" />
                <span>Ready to Achieve Your Band?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take our free 15-minute diagnostic level assessment in Kilinochchi or via Zoom.
              </p>
              <Link
                href="/register"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0A3663] hover:bg-[#124C85] text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                <span>Book Free Placement Test</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* RIGHT COLUMN: Content Stream (8 Cols on lg/xl) */}
          <main className="lg:col-span-8 space-y-16">
            {/* ============================================================== */}
            {/* SECTION 1: EXAM RESULTS & SCORECARDS */}
            {/* ============================================================== */}
            <section id="section-results" className="scroll-mt-24 space-y-6">
              {/* Section Header with Category Filters */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0098DA] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                      Section 01
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3663] mt-2">
                      Exam Results &amp; Scorecards
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Showing verified IELTS &amp; PTE official test scorecards from RK Academy students.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto">
                    {filteredResults.length} Verified Results
                  </span>
                </div>

                {/* Sub-Filters */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {['All', 'IELTS General', 'PTE Academic', 'IELTS Life Skills & SELT'].map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setResultsFilter(filter)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                          resultsFilter === filter
                            ? 'bg-[#0098DA] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Tap any scorecard image to zoom
                  </span>
                </div>
              </div>

              {/* Cards Grid: Results One By One */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredResults.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-[#0098DA] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {/* Scorecard Thumbnail / Preview with Zoom trigger */}
                      <div
                        onClick={() =>
                          setLightbox({
                            open: true,
                            image: item.scorecardImage,
                            title: `${item.studentName} — ${item.overallScore}`,
                            subtitle: `${item.examType} | ${item.destination}`,
                          })
                        }
                        className="relative h-48 w-full bg-slate-100 overflow-hidden cursor-pointer group/img"
                      >
                        <Image
                          src={item.scorecardImage}
                          alt={`${item.studentName} Scorecard`}
                          fill
                          className="object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-3.5">
                          <span className="bg-[#0A3663] text-white text-xs font-extrabold px-3 py-1 rounded-md shadow-xs">
                            {item.overallScore}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md group-hover/img:bg-[#0098DA] transition-colors">
                            <Maximize2 className="w-3 h-3" />
                            <span>View TRF</span>
                          </span>
                        </div>
                      </div>

                      {/* Student Details */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-sky-200 shrink-0">
                            <Image src={item.avatar} alt={item.studentName} fill className="object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-extrabold text-[#0A3663] text-base leading-tight">
                                {item.studentName}
                              </h3>
                              {item.verified && (
                                <span title="Verified Result">
                                  <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0" />
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-[#0098DA]">{item.examType}</p>
                            <p className="text-[11px] text-slate-500 truncate">{item.destination}</p>
                          </div>
                        </div>

                        {/* Sub-Scores Pill */}
                        <div className="bg-sky-50/80 border border-sky-100 rounded-xl p-3 text-[11px] font-medium text-slate-700">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                            Score Breakdown:
                          </span>
                          <p className="font-semibold text-[#0A3663]">{item.scores}</p>
                        </div>

                        {/* Quote / Short Testimonial */}
                        {item.quote && (
                          <p className="text-xs text-slate-600 italic line-clamp-2 leading-relaxed">
                            &ldquo;{item.quote}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Exam: {item.date}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            open: true,
                            image: item.scorecardImage,
                            title: `${item.studentName} — ${item.overallScore}`,
                            subtitle: `${item.examType} | ${item.destination}`,
                          })
                        }
                        className="font-bold text-[#0098DA] hover:text-[#0A3663] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Inspect Certificate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================== */}
            {/* SECTION 2: ACADEMY EVENTS & WORKSHOPS */}
            {/* ============================================================== */}
            <section id="section-events" className="scroll-mt-24 space-y-6 pt-6">
              {/* Section Header with Category Filters */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0098DA] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                      Section 02
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3663] mt-2">
                      Academy Events &amp; Workshops
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Academy workshops, awards ceremonies, student mock exams, and milestones.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto">
                    {filteredEvents.length} Events Documented
                  </span>
                </div>

                {/* Sub-Filters */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {['All', 'Workshop', 'Ceremony', 'Mock Exam', 'Academy Life'].map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setEventsFilter(filter)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                          eventsFilter === filter
                            ? 'bg-[#0098DA] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Tap photo to open full-screen gallery
                  </span>
                </div>
              </div>

              {/* Cards Grid: Events One By One */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-[#0098DA] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {/* Event Cover Photo with Lightbox trigger */}
                      <div
                        onClick={() =>
                          setLightbox({
                            open: true,
                            image: evt.image,
                            title: evt.title,
                            subtitle: `${evt.category} | ${evt.date} • ${evt.location}`,
                          })
                        }
                        className="relative h-56 w-full bg-slate-100 overflow-hidden cursor-pointer group/img"
                      >
                        <Image
                          src={evt.image}
                          alt={evt.title}
                          fill
                          className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-3.5">
                          <span className="bg-[#0098DA] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs">
                            {evt.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md group-hover/img:bg-[#0A3663] transition-colors">
                            <Maximize2 className="w-3 h-3" />
                            <span>Full Image</span>
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-[#0098DA]" />
                          <span>{evt.date}</span>
                          <span>•</span>
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{evt.location}</span>
                        </div>

                        <h3 className="font-extrabold text-[#0A3663] text-base sm:text-lg leading-snug line-clamp-2">
                          {evt.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {evt.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      {evt.badgeText && (
                        <span className="text-[11px] font-bold text-[#0A3663] bg-sky-100/70 px-2.5 py-0.5 rounded-full border border-sky-200">
                          {evt.badgeText}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            open: true,
                            image: evt.image,
                            title: evt.title,
                            subtitle: `${evt.category} | ${evt.date} • ${evt.location}`,
                          })
                        }
                        className="text-xs font-bold text-[#0098DA] hover:text-[#0A3663] inline-flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <span>View Photo</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================== */}
            {/* SECTION 3: STUDENT FEEDBACK & STORIES */}
            {/* ============================================================== */}
            <section id="section-stories" className="scroll-mt-24 space-y-6 pt-6">
              {/* Section Header with Category Filters */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0098DA] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                      Section 03
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3663] mt-2">
                      Verified Handwritten Student Reviews
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      100% genuine handwritten feedback notes from RK Academy students in Kilinochchi.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto">
                    {filteredStories.length} Verified Reviews
                  </span>
                </div>

                {/* Sub-Filters */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {[
                      { key: 'All', label: 'All Reviews' },
                      { key: 'Kamshalini', label: "Teacher Kamshalini's Classes" },
                      { key: 'Diploma & Grammar', label: 'Diploma & Grammar' },
                      { key: 'Speaking & Presentations', label: 'Speaking & Presentations' },
                      { key: 'Handwritten', label: 'Handwritten Notes (18)' },
                    ].map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setStoriesFilter(f.key)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                          storiesFilter === f.key
                            ? 'bg-[#0098DA] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Student names privacy-protected (e.g. R****i)
                  </span>
                </div>
              </div>

              {/* Cards Grid: Stories One By One */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredStories.map((story) => {
                  const initialLetter = story.name ? story.name.charAt(0).toUpperCase() : 'S';
                  const isTamilOpen = Boolean(showTamil[story.id]);

                  return (
                    <div
                      key={story.id}
                      className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-[#0098DA] p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="space-y-4">
                        {/* Student Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Avatar or Gradient Initial */}
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#0098DA] shrink-0 bg-gradient-to-br from-[#0A3663] to-[#0098DA] flex items-center justify-center text-white font-extrabold text-base shadow-xs">
                              <span>{initialLetter}</span>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-extrabold text-[#0A3663] text-base tracking-wide">
                                  {story.name}
                                </h3>
                                {story.verified && (
                                  <span title="Verified Student Review">
                                    <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0" />
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-semibold text-slate-500 truncate">
                                {story.course}
                              </p>
                            </div>
                          </div>

                          <span className="bg-sky-50 border border-sky-200 text-[#0A3663] text-[11px] font-extrabold px-2.5 py-1 rounded-md shrink-0 shadow-2xs">
                            {story.overallScore}
                          </span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 text-amber-400">
                            {[...Array(story.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-slate-400">5.0 / 5.0</span>
                        </div>

                        {/* English Feedback Quote */}
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          &ldquo;{story.comment}&rdquo;
                        </p>

                        {/* Tamil Translation Accordion (if originally written in Tamil) */}
                        {story.originalTamil && (
                          <div className="pt-2 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => toggleTamil(story.id)}
                              className="text-[11px] font-bold text-[#0098DA] hover:text-[#0A3663] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Languages className="w-3.5 h-3.5" />
                              <span>{isTamilOpen ? 'Hide Tamil' : 'View Original Tamil (தமிழ்)'}</span>
                            </button>

                            {isTamilOpen && (
                              <div className="mt-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed font-sans">
                                <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                                  Original Handwritten Text (Tamil):
                                </span>
                                <p className="italic">&ldquo;{story.originalTamil}&rdquo;</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Inspect Handwritten Note Lightbox Button */}
                        {story.handwrittenImage && (
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() =>
                                setLightbox({
                                  open: true,
                                  image: story.handwrittenImage!,
                                  title: `Handwritten Feedback — ${story.name}`,
                                  subtitle: `${story.course} • Verified Handwritten Student Note`,
                                })
                              }
                              className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2 bg-sky-50/80 hover:bg-sky-100/80 text-[#0A3663] hover:text-[#0098DA] text-xs font-bold rounded-xl border border-sky-100 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-2">
                                <FileCheck className="w-4 h-4 text-[#0098DA]" />
                                <span>Inspect Original Handwritten Note</span>
                              </div>
                              <Maximize2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0098DA] transition-colors" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>Target: {story.destination}</span>
                        <span>{story.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* 4. Bottom Admissions CTA */}
      <section className="site-container pb-14">
        <div className="bg-gradient-to-br from-[#062343] to-[#0A3663] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-sky-900/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Achieve Your Target Score With RK International
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join our upcoming weekday or weekend batch at our central Kilinochchi center (A-9 Road) or online via Zoom. Get free placement level testing today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp Inquiry</span>
            </a>
            <Link
              href="/ielts-courses"
              className="inline-flex items-center gap-2 bg-white text-[#0A3663] hover:bg-slate-100 font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-colors"
            >
              <span>Explore All Courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FULL-SCREEN LIGHTBOX MODAL */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setLightbox({ open: false, image: '', title: '' })}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-slate-950/80 border-b border-white/10 text-white">
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">{lightbox.title}</h4>
                {lightbox.subtitle && (
                  <p className="text-xs text-slate-400 mt-0.5">{lightbox.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightbox({ open: false, image: '', title: '' })}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative w-full h-[65vh] sm:h-[70vh] bg-black flex items-center justify-center">
              <Image
                src={lightbox.image}
                alt={lightbox.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950 text-center text-xs text-slate-400 border-t border-white/10">
              Official document on file with RK International Language Academy Kilinochchi.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
