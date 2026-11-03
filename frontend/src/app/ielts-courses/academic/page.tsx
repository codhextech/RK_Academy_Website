import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, MapPin, Laptop, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'IELTS Academic Course in Kilinochchi | RK International',
  description:
    'Prepare for university abroad with our IELTS Academic course. Experienced trainers, full mock tests, flexible batches. View fees, syllabus & start dates.',
};

export default function AcademicCoursePage() {
  const syllabus = [
    {
      module: 'Module 1: Academic Writing Task 1 (Data Description)',
      desc: 'Line graphs, bar charts, pie charts, tables, process diagrams, and maps. Structure, vocabulary for trends, and high-band grammar.',
    },
    {
      module: 'Module 2: Academic Writing Task 2 (Formal Essay)',
      desc: 'Agree/Disagree, Discuss both views, Advantages/Disadvantages, Problem/Solution essays. Coherence, cohesion, and Band 8+ vocabulary.',
    },
    {
      module: 'Module 3: Academic Reading Techniques',
      desc: 'Skimming, scanning, True/False/Not Given, Yes/No/Not Given, heading matching, and time management strategies for 60-minute pressure.',
    },
    {
      module: 'Module 4: Intensive Listening',
      desc: 'Understanding British, Australian, and North American accents, multiple choice questions, map labeling, form completion, and sentence completion.',
    },
    {
      module: 'Module 5: Speaking Mastery & Fluency Drills',
      desc: 'Part 1 introduction, Part 2 cue card speaking without hesitation, and Part 3 abstract discussions. Individual mock interviews with feedback.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Course Hero */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#0098DA] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Study Abroad Pathway
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
              IELTS Academic Coaching in Kilinochchi & Online
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Achieve Band 7.0 to 8.5 required for undergraduate and postgraduate degree admissions in the UK, Canada, Australia, and New Zealand.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 text-xs font-semibold text-sky-200">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-4 h-4 text-[#0098DA]" />
                8 Weeks (60+ Hours)
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Laptop className="w-4 h-4 text-[#0098DA]" />
                In-Person & Live Online
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#0098DA]" />
                British Council Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Course Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-[#0A3663] mb-4">
                  Who is IELTS Academic For?
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  The IELTS Academic test evaluates whether your English language proficiency is suitable for an academic environment. It reflects aspects of academic language and evaluates whether you are ready to begin studying or training abroad.
                </p>
              </div>

              {/* Syllabus Breakdown */}
              <div>
                <h2 className="text-2xl font-bold text-[#0A3663] mb-6">
                  Curriculum & Syllabus Outline
                </h2>
                <div className="space-y-4">
                  {syllabus.map((s, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <h3 className="font-bold text-[#0A3663] text-sm sm:text-base mb-1.5">
                        {s.module}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Enrollment Card */}
            <div className="lg:col-span-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
                <div>
                  <span className="text-xs font-bold text-[#0098DA] uppercase tracking-wider">
                    Next Batch Enrolling
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0A3663] mt-1">
                    IELTS Academic
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Weekday and weekend options available.
                  </p>
                </div>

                <div className="space-y-3 py-4 border-y border-slate-200 text-xs sm:text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-bold">8 Weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Campus:</span>
                    <span className="font-bold">Kilinochchi (A-9)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Online Option:</span>
                    <span className="font-bold text-emerald-600">Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mock Tests:</span>
                    <span className="font-bold">Included</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/register"
                    className="w-full text-center bg-[#0A3663] hover:bg-[#124C85] text-white py-3.5 px-4 rounded-xl font-bold text-sm block shadow-md transition-colors"
                  >
                    Enroll in Academic Batch
                  </Link>
                  <a
                    href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent('Hi RK Academy, I want to inquire about the IELTS Academic course fee and batch dates.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-bold text-sm block transition-colors shadow-xs"
                  >
                    Ask Fee via WhatsApp
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
