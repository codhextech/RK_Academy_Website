import React from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, Laptop, Clock, GraduationCap } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'IELTS Courses in Sri Lanka | Academic, General & Foundation | RK International',
  description:
    'Compare IELTS Academic, IELTS General Training, and Foundation English courses at RK International Academy in Kilinochchi and online. Fees, syllabus & duration.',
};

export default function CoursesHubPage() {
  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[#0098DA] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            Comprehensive Training
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            IELTS Courses & Pathways
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Choose the right course for your specific goal: Study abroad, Work/Migration visa, or foundational English mastery.
          </p>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3663]">
              Course Comparison Guide
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Find out which course matches your requirements
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <thead>
                <tr className="bg-[#0A3663] text-white text-left">
                  <th className="p-4 sm:p-5 text-sm font-bold">Feature / Module</th>
                  <th className="p-4 sm:p-5 text-sm font-bold bg-[#0098DA]">IELTS Academic</th>
                  <th className="p-4 sm:p-5 text-sm font-bold">IELTS General Training</th>
                  <th className="p-4 sm:p-5 text-sm font-bold">Foundation & Spoken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Primary Purpose</td>
                  <td className="p-4 sm:p-5 font-semibold text-[#0098DA]">University Study Abroad (BSc/MSc)</td>
                  <td className="p-4 sm:p-5 font-semibold">PR, Work Permits, Express Entry</td>
                  <td className="p-4 sm:p-5 font-semibold">Fluency, Grammar & Preparation</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Reading Module</td>
                  <td className="p-4 sm:p-5">Academic texts & scientific journals</td>
                  <td className="p-4 sm:p-5">Workplace & everyday social articles</td>
                  <td className="p-4 sm:p-5">Basic sentence & paragraph comprehension</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Writing Task 1</td>
                  <td className="p-4 sm:p-5">Graph, Chart, Table & Diagram analysis</td>
                  <td className="p-4 sm:p-5">Formal & Informal Letter Writing</td>
                  <td className="p-4 sm:p-5">Sentence structure & short paragraphs</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Writing Task 2</td>
                  <td className="p-4 sm:p-5">Formal discursive 250-word essay</td>
                  <td className="p-4 sm:p-5">Social issues & opinion essay</td>
                  <td className="p-4 sm:p-5">Introductory essays & opinion pieces</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Speaking & Listening</td>
                  <td className="p-4 sm:p-5">Exact same standard (Band 0-9)</td>
                  <td className="p-4 sm:p-5">Exact same standard (Band 0-9)</td>
                  <td className="p-4 sm:p-5">Pronunciation, confidence & vocabulary</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Duration</td>
                  <td className="p-4 sm:p-5">8 Weeks (60+ Hours)</td>
                  <td className="p-4 sm:p-5">8 Weeks (60+ Hours)</td>
                  <td className="p-4 sm:p-5">6 to 10 Weeks</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Study Mode</td>
                  <td className="p-4 sm:p-5">Kilinochchi Campus + Live Online</td>
                  <td className="p-4 sm:p-5">Kilinochchi Campus + Live Online</td>
                  <td className="p-4 sm:p-5">Kilinochchi Campus + Live Online</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Take Action</td>
                  <td className="p-4 sm:p-5">
                    <Link
                      href="/ielts-courses/academic"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0A3663] px-3.5 py-2 rounded-lg hover:bg-[#124C85]"
                    >
                      <span>Academic Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                  <td className="p-4 sm:p-5">
                    <Link
                      href="/ielts-courses/general-training"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0098DA] px-3.5 py-2 rounded-lg hover:bg-[#0080B8]"
                    >
                      <span>General Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                  <td className="p-4 sm:p-5">
                    <Link
                      href="/ielts-courses/preparation"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-200 px-3.5 py-2 rounded-lg hover:bg-slate-300"
                    >
                      <span>Foundation Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
