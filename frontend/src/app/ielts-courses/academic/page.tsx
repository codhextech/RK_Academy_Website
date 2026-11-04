import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Clock,
  Laptop,
  ShieldCheck,
  Headphones,
  Mic,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import CourseCurriculumSection from '@/components/common/CourseCurriculumSection';
import { getCourseBySlug } from '@/lib/coursesData';
import { ACADEMY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'IELTS & UKVI (Academic & General Training) Coaching | RK International Kilinochchi',
  description:
    'Complete IELTS & UKVI coaching in Kilinochchi and online. Modules for Academic, General Training, and Life Skills A1/B1 with British Council registration support.',
};

export default function AcademicCoursePage() {
  const courseData = getCourseBySlug('ielts-ukvi');
  const coreModules = [
    {
      num: '01',
      title: 'Introduction to IELTS & UKVI',
      desc: 'Understand test formats, scoring criteria (Band 0–9), test registration, test center regulations, and distinction between standard IELTS and UKVI.',
      points: [
        'UKVI biometric and identity authentication protocols',
        'Scoring criteria: Fluency, Coherence, Lexical Resource, Grammar & Pronunciation',
        'Tailoring preparation to student visa vs. skilled worker vs. immigration targets',
      ],
    },
    {
      num: '02',
      title: 'Listening Module (Same for Academic & General)',
      desc: '30-minute exam (+10 minutes transfer time) across 4 sections featuring British, Australian, American, and Canadian native audio speakers.',
      points: [
        'Section 1: Everyday social dialogues (form completion, numbers, names)',
        'Section 2: Monologues on public community context (maps, plans, multiple choice)',
        'Section 3: Academic discussions with multiple speakers (matching, short answers)',
        'Section 4: University academic lecture (note completion, summarization)',
      ],
    },
    {
      num: '03',
      title: 'Reading Module (Academic & General Training)',
      desc: '60-minute intensive reading comprehension with specialized strategies for both test tracks.',
      points: [
        'Academic IELTS/UKVI: 3 long scientific, historical, and analytical texts with diagrams, technical vocab, and complex discourse',
        'General Training IELTS/UKVI: Workplace manuals, employment contracts, advertisements, transit guides, and social articles',
        'Techniques for True/False/Not Given, Yes/No/Not Given, Heading Matching, and Sentence Completion under strict 20-min per passage limits',
      ],
    },
    {
      num: '04',
      title: 'Writing Module (Task 1 & Task 2)',
      desc: '60 minutes total. Strategic templates, cohesive structures, and grammar formulas for Band 7.5+ scores.',
      points: [
        'Academic Task 1: 150-word report on line graphs, bar charts, pie charts, tables, maps, and industrial process diagrams',
        'General Training Task 1: 150-word formal, semi-formal, or informal letter with accurate tone, salutations, and bullet responses',
        'Task 2 (Both Tracks): 250-word formal discursive essay (Agree/Disagree, Discuss Both Views, Problem-Solution, Causes & Effects)',
      ],
    },
    {
      num: '05',
      title: 'Speaking Module (Same for Academic & General)',
      desc: '11–14 minute one-on-one face-to-face interview with an examiner simulating official test conditions.',
      points: [
        'Part 1: Introduction and warm-up on familiar personal topics (4–5 minutes)',
        'Part 2: Long turn Cue Card speaking with 1-minute prep and 2-minute sustained speech',
        'Part 3: In-depth two-way analytical discussion linked to Part 2 theme (4–5 minutes)',
      ],
    },
    {
      num: '06',
      title: 'Grammar & Vocabulary for IELTS',
      desc: 'Targeted lexical resource expansion and grammatical range required to breach Band 7.0 and 8.0+ boundaries.',
      points: [
        'Academic Word List (AWL) and precision synonyms to eliminate repetition',
        'Complex sentence structures: Relative clauses, conditional tenses, and passive voice',
        'Cohesive devices, transitional phrases, and academic signposting',
      ],
    },
    {
      num: '07',
      title: 'Exam Techniques & Time Management',
      desc: 'Proven test-hall tactics to prevent common pitfalls, manage time, and maximize accuracy.',
      points: [
        'Eliminating distractor choices in listening and reading',
        'Strict time-boxing: Allocating 20 mins for Task 1 and 40 mins for Task 2',
        'Proofreading strategies for spelling, plurals, and subject-verb agreement',
      ],
    },
    {
      num: '08',
      title: 'Mock Tests & Personalized Feedback',
      desc: 'Full-length timed exam simulations under realistic pressure followed by diagnostic score reports.',
      points: [
        'Weekly full-length test simulations under strict test-hall conditions',
        'Detailed line-by-line essay corrections with Band Descriptors rubric',
        'Recorded audio speaking interviews with one-on-one trainer feedback',
      ],
    },
  ];

  const ukviModules = [
    'Extra emphasis on UK visa requirements (Student Visa, Skilled Worker, Health & Care Visa)',
    'Test-day conduct, ID protocols, and biometric rules specific to UKVI test centers',
    'Application support: Personal statements, Statement of Purpose (SOP), and embassy visa interviews',
    'Life Skills A1 & B1 coaching with dedicated spoken and listening test format simulations',
  ];

  const whatsappInquiryUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hi RK International Language Academy, I would like to inquire about IELTS & UKVI (Academic & General Training) batch timings, fee structure, and British Council test booking.'
  )}`;

  return (
    <div className="bg-white">
      {/* Course Hero - Compact & Streamlined with Side Enroll Card */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-6 sm:py-8 md:py-10 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-sky-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
              <li>
                <Link href="/ielts-courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
              <li className="text-white font-bold truncate max-w-[200px] sm:max-w-none">
                IELTS & UKVI
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 sm:space-y-3.5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                IELTS &amp; UKVI
              </h1>

              <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
                Complete, rigorous preparation for students and professionals targeting Band 7.5+ for universities, UKVI visas, and PR immigration across the UK, Canada, Australia, and New Zealand.
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock className="w-4 h-4 text-[#0098DA]" />
                  <span><strong>Duration:</strong> 8 Weeks (60+ Hours)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Laptop className="w-4 h-4 text-[#0098DA]" />
                  <span><strong>Delivery:</strong> In-Person & Live Online</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#0098DA]" />
                  <span><strong>Includes:</strong> UKVI & Life Skills A1/B1</span>
                </div>
              </div>
            </div>

            {/* Visual Side Enroll Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-3 shadow-2xl border border-sky-100 overflow-hidden">
                <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                    alt="IELTS & UKVI Academic & General Training at RK Academy"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3663]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-bold bg-[#0A3663] text-white px-3 py-1 rounded-md shadow-xs">
                    Exam Prep
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Admissions:</span>
                    <span className="font-bold text-[#0A3663] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                      Now Enrolling
                    </span>
                  </div>

                  <Link
                    href="/register?course=ielts-ukvi"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md"
                  >
                    <GraduationCap className="w-4 h-4 text-[#0098DA]" />
                    <span>Enroll in This Course</span>
                  </Link>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#25D366] text-[#0A3663] hover:text-white border-2 border-[#25D366] py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 group"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                    <span>WhatsApp Admissions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Course Content */}
      <section className="py-10 md:py-14">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3663] mb-4">
                  Course Curriculum
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our IELTS and UKVI curriculum covers all 4 macro language skills, with specialized tracks for Academic applicants (university degree entry) and General Training applicants (Express Entry, PR, and skilled work permits).
                </p>
              </div>

              {/* Collapsible Curriculum Highlights & Course Modules Dropdowns */}
              <CourseCurriculumSection
                highlights={courseData?.curriculumHighlights || []}
                modules={coreModules}
                defaultHighlightsOpen={false}
                defaultModulesOpen={false}
              />

              {/* Optional UKVI Preparation Modules */}
              <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/70 border border-blue-200/80 space-y-4">
                <div className="flex items-center gap-2.5 text-[#0A3663]">
                  <ShieldCheck className="w-6 h-6 text-[#0098DA]" />
                  <h3 className="text-xl font-bold">
                    Optional Modules (Included in UKVI Prep Classes)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For students and professionals applying specifically for UK visas, our courses include tailored modules addressing UK Visas and Immigration (UKVI) compliance:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {ukviModules.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-white rounded-xl border border-blue-100 flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <span className="text-[#0098DA] font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation for Life Skills A1/B1 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
                    UK Visa Categories
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0A3663] mt-2 mb-2">
                    Preparation for Life Skills A1 / B1
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    IELTS Life Skills is an official government-approved test meeting UKVI requirements for family, partner, and settlement visas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <span className="text-xs font-extrabold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-300">
                      Life Skills A1
                    </span>
                    <h4 className="font-bold text-[#0A3663] text-sm sm:text-base">For Initial Family Visa</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Required for applying to join a partner, spouse, or family member settled in the United Kingdom.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <span className="text-xs font-extrabold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-300">
                      Life Skills B1
                    </span>
                    <h4 className="font-bold text-[#0A3663] text-sm sm:text-base">For Visa Extensions & Settlement</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Required for applying for Indefinite Leave to Remain (ILR), permanent residency, and British citizenship.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-[#0A3663] uppercase tracking-wider mb-2">
                    Test Format (Life Skills A1 & B1):
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                      <Headphones className="w-4 h-4 text-[#0098DA]" />
                      <span><strong>1. Listening Skills:</strong> Audio tasks & Q&A</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                      <Mic className="w-4 h-4 text-[#0098DA]" />
                      <span><strong>2. Speaking Skills:</strong> Spoken dialogue with examiner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Enrollment Card */}
            <div className="lg:col-span-4">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-[#0098DA] uppercase tracking-wider">
                    Next Batch Enrolling
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0A3663] mt-1">
                    IELTS & UKVI Program
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Weekday and weekend batches available in Kilinochchi and live online.
                  </p>
                </div>

                <div className="space-y-3 py-4 border-y border-slate-200 text-xs sm:text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-bold">8 Weeks (60+ Hours)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tracks:</span>
                    <span className="font-bold">Academic / General / UKVI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Life Skills A1/B1:</span>
                    <span className="font-bold text-[#0098DA]">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Campus:</span>
                    <span className="font-bold">Kilinochchi (A-9) + Zoom</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mock Tests:</span>
                    <span className="font-bold text-emerald-600">Weekly Included</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/register?course=ielts-ukvi"
                    className="w-full text-center bg-[#0A3663] hover:bg-[#124C85] text-white py-3.5 px-4 rounded-xl font-bold text-sm block shadow-md transition-colors"
                  >
                    Enroll in IELTS / UKVI Batch
                  </Link>
                  <a
                    href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent('Hi RK Academy, I would like to inquire about IELTS & UKVI course fees, schedule, and British Council test booking.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-bold text-sm block transition-colors shadow-xs"
                  >
                    Inquire via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
