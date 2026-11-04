'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  UserCheck,
  BookOpen,
  Trophy,
  Calendar,
  ShieldCheck,
  HeartHandshake,
  MessageSquare,
  Briefcase,
  Award,
  CheckCircle2,
  Globe,
  Sparkles,
  ArrowRight,
  Mic,
  BadgeCheck,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

export default function WhyChooseUsSection() {
  const [showAllIelts, setShowAllIelts] = useState(false);
  const [showAllDiploma, setShowAllDiploma] = useState(false);
  const ieltsBenefits = [
    {
      title: 'Expert Trainers',
      desc: 'Learn from certified, experienced instructors who understand the exam formats and scoring criteria inside out.',
      icon: GraduationCap,
    },
    {
      title: 'Personalized Coaching',
      desc: 'Covering all test sections with ample practice materials, mock exams, and real test simulations.',
      icon: UserCheck,
    },
    {
      title: 'Comprehensive Curriculum',
      desc: 'Systematic coverage of Listening, Reading, Writing (Task 1 & Task 2), and Speaking with high-band model answers.',
      icon: BookOpen,
    },
    {
      title: 'Proven Success',
      desc: 'High student success rates with many achieving their target bands and scores (Band 7.0 – 8.5).',
      icon: Trophy,
    },
    {
      title: 'Flexible Schedules',
      desc: 'Classes designed to fit your busy lifestyle—offered both online and offline (weekdays and weekends).',
      icon: Calendar,
    },
    {
      title: 'Exam Registration Assistance',
      desc: 'We guide you through the British Council registration process to make it hassle-free.',
      icon: ShieldCheck,
    },
    {
      title: 'Supportive Learning Environment',
      desc: 'Friendly, motivating, and focused on your progress and confidence-building.',
      icon: HeartHandshake,
    },
  ];

  const diplomaBenefits = [
    {
      title: 'Enhances Communication',
      desc: 'English is a global language. Strong speaking and writing skills open doors in academic, corporate, and social environments.',
      icon: MessageSquare,
    },
    {
      title: 'Boosts Career Growth',
      desc: 'Many employers worldwide seek candidates with good English proficiency. A diploma boosts your job profile and salary prospects.',
      icon: Briefcase,
    },
    {
      title: 'Supports Higher Studies',
      desc: 'English proficiency is essential for students aiming to study abroad or excel in university coursework.',
      icon: Award,
    },
    {
      title: 'Facilitates Exam Prep',
      desc: 'A solid foundation in English helps students perform better in exams like IELTS, PTE, TOEFL, and other language tests.',
      icon: CheckCircle2,
    },
    {
      title: 'Global Networking',
      desc: 'Being fluent in English allows you to connect with people globally, expanding personal and professional networks.',
      icon: Globe,
    },
    {
      title: 'Builds Speaking Confidence',
      desc: 'Spoken English training helps overcome hesitation and boosts confidence in everyday conversations and job interviews.',
      icon: Sparkles,
    },
    {
      title: 'Public Speaking & Debates',
      desc: 'Master speech delivery, impromptu talks, and group discussion techniques to speak persuasively without stage fear.',
      icon: Mic,
    },
    {
      title: 'Recognized Certification',
      desc: 'Receive an official accredited Diploma from RK International Academy that validates your qualification to employers.',
      icon: BadgeCheck,
    },
  ];

  return (
    <section className="py-10 md:py-16 bg-white" id="why-choose-us">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12 md:space-y-16">
        {/* PART 1: Why Choose RK Academy */}
        <div>
          <div className="max-w-3xl mb-6 md:mb-8 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663] mb-2">
              Why Choose RK Academy?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Join <strong>RK International Language Academy</strong> and take a confident step toward your academic and career goals!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {ieltsBenefits.map((item, idx) => {
              const Icon = item.icon;
              const isHiddenOnMobile = idx >= 3 && !showAllIelts;
              return (
                <div
                  key={idx}
                  className={`${
                    isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                  } p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border-2 border-slate-200 hover:border-[#0098DA] shadow-xs transition-all duration-200 group flex-row items-start gap-3 sm:gap-3.5 h-full`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-sky-100 flex items-center justify-center text-[#0098DA] group-hover:bg-[#0A3663] group-hover:text-white transition-colors shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-[#0A3663] mb-1 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}

            {/* CTA Box inside the grid - Same height and compact size as first row boxes */}
            <div
              className={`${
                !showAllIelts ? 'hidden sm:flex' : 'flex'
              } p-4 sm:p-5 rounded-2xl bg-[#0A3663] text-white border-2 border-[#0A3663] hover:border-[#0098DA] shadow-xs transition-all duration-200 flex-col justify-between h-full group`}
            >
              <div>
                <span className="text-[10px] font-bold text-[#0098DA] uppercase tracking-wider block">
                  Ready to Start?
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 leading-snug">
                  Book Your Seat in Next Batch
                </h3>
              </div>
              <Link
                href="/register"
                className="mt-2.5 inline-flex items-center justify-between w-full bg-[#0098DA] hover:bg-[#0080B8] text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-xs group-hover:bg-[#0089C4]"
              >
                <span>Register Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Mobile Only: "Show More" Collapsible Button */}
          <div className="sm:hidden mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowAllIelts(!showAllIelts)}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-sky-200 bg-sky-50/80 hover:bg-sky-100 text-xs font-bold text-[#0A3663] transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <span>{showAllIelts ? 'Show Less' : `Show ${ieltsBenefits.length - 3 + 1} More (Benefits & Registration)`}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#0098DA] transition-transform duration-200 ${
                  showAllIelts ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* PART 2: Why English & Spoken Fluency? */}
        <div className="pt-8 md:pt-10 border-t border-slate-100">
          <div className="w-full max-w-none mb-6 md:mb-8 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663] mb-2">
              Why English &amp; Spoken Fluency?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-none">
              At <strong>RK International Language Academy</strong>, our Diploma in English and Spoken English courses equip you with vital communication skills for global success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {diplomaBenefits.map((item, idx) => {
              const Icon = item.icon;
              const isHiddenOnMobile = idx >= 3 && !showAllDiploma;
              return (
                <div
                  key={idx}
                  className={`${
                    isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                  } p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#0098DA] shadow-xs hover:shadow-md transition-all duration-200 flex-row items-start gap-3 sm:gap-3.5 h-full`}
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0A3663] shrink-0">
                    <Icon className="w-5 h-5 text-[#0098DA]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-[#0A3663] mb-1 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Only: "Show More" Collapsible Button */}
          <div className="sm:hidden mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowAllDiploma(!showAllDiploma)}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-sky-200 bg-sky-50/80 hover:bg-sky-100 text-xs font-bold text-[#0A3663] transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <span>{showAllDiploma ? 'Show Less' : `Show ${diplomaBenefits.length - 3} More Benefits`}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#0098DA] transition-transform duration-200 ${
                  showAllDiploma ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
