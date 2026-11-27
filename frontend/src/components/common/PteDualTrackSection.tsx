'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  ArrowLeftRight,
  Clock,
  FileText,
  Mail,
  Mic,
  Sparkles,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';

interface PteDualTrackSectionProps {
  whatsappNumber?: string;
}

export default function PteDualTrackSection({
  whatsappNumber = ACADEMY_INFO.whatsappNumber,
}: PteDualTrackSectionProps) {
  const [activeTab, setActiveTab] = useState<'academic' | 'general' | 'core' | 'compare'>('academic');

  const whatsappInquiryUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi RK Academy, I would like guidance on whether I should prepare for PTE Academic, PTE General, or PTE Core.'
  )}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-sm space-y-6">
      {/* 1. Header with Pathway Badge */}
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0098DA] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Pathway Selector</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0A3663]">
          Which PTE Test Do You Need?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Pearson offers <strong>3 official PTE tracks</strong> — choose between <strong>PTE Academic</strong> (university study &amp; skilled migration), <strong>PTE General</strong> (everyday &amp; workplace CEFR A1–C2 certification), and <strong>PTE Core</strong> (Canadian Permanent Residency).
        </p>
      </div>

      {/* 2. Four Interactive Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 p-1.5 bg-slate-100 rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveTab('academic')}
          className={`flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'academic'
              ? 'bg-[#0A3663] text-white shadow-md'
              : 'text-slate-600 hover:text-[#0A3663] hover:bg-white/60'
          }`}
        >
          <GraduationCap className={`w-4 h-4 shrink-0 ${activeTab === 'academic' ? 'text-[#0098DA]' : 'text-slate-400'}`} />
          <div className="text-left leading-tight">
            <span>Track 1: PTE Academic</span>
            <span className={`block text-[10px] font-normal truncate mt-0.5 ${activeTab === 'academic' ? 'text-sky-200' : 'text-slate-500'}`}>
              Study &amp; AU / UK / NZ Visas
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'general'
              ? 'bg-[#0A3663] text-white shadow-md'
              : 'text-slate-600 hover:text-[#0A3663] hover:bg-white/60'
          }`}
        >
          <BookOpen className={`w-4 h-4 shrink-0 ${activeTab === 'general' ? 'text-[#0098DA]' : 'text-slate-400'}`} />
          <div className="text-left leading-tight">
            <span>Track 2: PTE General</span>
            <span className={`block text-[10px] font-normal truncate mt-0.5 ${activeTab === 'general' ? 'text-sky-200' : 'text-slate-500'}`}>
              Everyday &amp; Career (A1–C2)
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('core')}
          className={`flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'core'
              ? 'bg-[#0A3663] text-white shadow-md'
              : 'text-slate-600 hover:text-[#0A3663] hover:bg-white/60'
          }`}
        >
          <Briefcase className={`w-4 h-4 shrink-0 ${activeTab === 'core' ? 'text-[#0098DA]' : 'text-slate-400'}`} />
          <div className="text-left leading-tight">
            <span>Track 3: PTE Core</span>
            <span className={`block text-[10px] font-normal truncate mt-0.5 ${activeTab === 'core' ? 'text-sky-200' : 'text-slate-500'}`}>
              🍁 Canada PR &amp; Express Entry
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('compare')}
          className={`flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'compare'
              ? 'bg-[#0A3663] text-white shadow-md'
              : 'text-slate-600 hover:text-[#0A3663] hover:bg-white/60'
          }`}
        >
          <ArrowLeftRight className={`w-4 h-4 shrink-0 ${activeTab === 'compare' ? 'text-[#0098DA]' : 'text-slate-400'}`} />
          <div className="text-left leading-tight">
            <span>Compare Side-by-Side</span>
            <span className={`block text-[10px] font-normal truncate mt-0.5 ${activeTab === 'compare' ? 'text-sky-200' : 'text-slate-500'}`}>
              All 3 Tracks Table
            </span>
          </div>
        </button>
      </div>

      {/* 3. TAB CONTENT */}
      {/* ============================================================== */}
      {/* TAB 1: PTE ACADEMIC */}
      {/* ============================================================== */}
      {activeTab === 'academic' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-sky-50/70 border border-sky-100 rounded-2xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0098DA]">Track 1 Focus</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-semibold">100% Computer-Delivered</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A3663] mt-0.5">
                PTE Academic (Study Abroad &amp; Skilled Migration)
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-sky-100 shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#0098DA]" />
              <span>Exam Time: ~2 Hours</span>
            </div>
          </div>

          {/* Key Differences / Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A3663]">
                <Mic className="w-4 h-4 text-[#0098DA]" />
                <span>Speaking: Re-tell Lecture</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                You listen to a university lecture by a professor (60–90 seconds) and summarize the core academic arguments using structured fluency templates.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A3663]">
                <FileText className="w-4 h-4 text-[#0098DA]" />
                <span>Writing: 200–300 Word Academic Essay</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A formal argumentative essay on global or educational topics in 20 minutes. Scored on structure, vocabulary diversity, and grammatical accuracy.
              </p>
            </div>
          </div>

          {/* Where It is Accepted */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recognized Countries &amp; Authorities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-[#0A3663]">🇦🇺 Australia</p>
                <p className="text-[11px] text-slate-500 mt-0.5">100% of visas &amp; all universities</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-[#0A3663]">🇳🇿 New Zealand</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Visas &amp; skilled migration points</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-[#0A3663]">🇬🇧 United Kingdom</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Top universities &amp; student visas</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-[#0A3663]">🇨🇦 Canada (Study)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Student Direct Stream (SDS)</p>
              </div>
            </div>
          </div>

          {/* Target Score Guidelines */}
          <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A3663] mb-2.5">
              Target Score Equivalents for Migration &amp; Admissions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                <span className="font-bold text-[#0A3663] block">PTE 58 (Band 6.5)</span>
                <span className="text-[11px] text-slate-500">Undergraduate &amp; Diploma entry</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                <span className="font-bold text-[#0A3663] block">PTE 65 (Band 7.0)</span>
                <span className="text-[11px] text-slate-500">Postgraduate &amp; Prof. registration</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                <span className="font-bold text-emerald-600 block">PTE 79+ (Band 8.0)</span>
                <span className="text-[11px] text-slate-500">20 Migration Points (Australia PR)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: PTE GENERAL */}
      {/* ============================================================== */}
      {activeTab === 'general' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Track 2 Focus</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-semibold">Pearson English International Certificate</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A3663] mt-0.5">
                PTE General (Everyday &amp; Workplace English • CEFR A1–C2)
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-indigo-100 shrink-0">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Lifetime Certificate</span>
            </div>
          </div>

          {/* Two Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Part 1: Written Paper (Listening, Reading &amp; Writing)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Theme-linked real-world tasks testing everyday comprehension, practical workplace emails, letters, and structured writing without tricky academic jargon.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                <Mic className="w-4 h-4 text-indigo-600" />
                <span>Part 2: Spoken Interview (Real-Life Communication)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A communicative speaking session covering sustained monologue, picture discussion, and interactive role-play with an examiner — ideal for building real fluency.
              </p>
            </div>
          </div>

          {/* 6 CEFR Levels Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              6 Official Levels Mapped to CEFR (A1 to C2)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-[#0A3663]">Foundation (CEFR A1)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Beginner everyday communication</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-[#0A3663]">Level 1 (CEFR A2)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Elementary daily &amp; travel usage</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-[#0A3663]">Level 2 (CEFR B1)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Intermediate study &amp; work readiness</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-[#0A3663]">Level 3 (CEFR B2)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Upper-intermediate career &amp; university prep</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-indigo-700">Level 4 (CEFR C1)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Advanced professional &amp; academic fluency</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="font-bold text-indigo-700">Level 5 (CEFR C2)</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Proficient mastery for global leadership</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-xs text-slate-700 leading-relaxed">
            <strong>Who should take PTE General?</strong> Ideal for school students, job seekers, corporate professionals, and learners who want an internationally recognized Pearson certificate that <strong>never expires</strong> (note: for Australia/UK/Canada visa immigration points, choose <strong>PTE Academic</strong> or <strong>PTE Core</strong>).
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: PTE CORE */}
      {/* ============================================================== */}
      {activeTab === 'core' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Track 3 Focus</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-semibold">Approved by IRCC Canada</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A3663] mt-0.5">
                🍁 PTE Core (Canada Permanent Residency &amp; Work Permits)
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-emerald-100 shrink-0">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Exam Time: ~2 Hours</span>
            </div>
          </div>

          {/* Key Differences / Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <Mic className="w-4 h-4 text-emerald-600" />
                <span>Speaking: Respond to a Situation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>No Re-tell Lecture!</strong> Instead, you hear a real-life situation (e.g. rescheduling an appointment or talking to a coworker) and speak your response naturally for 40 seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Writing: 100-Word Workplace Email</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>NO 300-word academic essay!</strong> You write a short ~100-word professional email in 9 minutes based on a realistic workplace or community scenario.
              </p>
            </div>
          </div>

          {/* Where It is Accepted */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Official Canadian Immigration Recognition
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Approved by <strong>Immigration, Refugees and Citizenship Canada (IRCC)</strong> for all economic immigration programs:
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold text-[#0A3663]">
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Express Entry (FSWP)</span>
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Canadian Experience Class (CEC)</span>
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Provincial Nominee Programs (PNP)</span>
              <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">Canadian Citizenship</span>
            </div>
          </div>

          {/* Canadian CLB Score Mapping Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Canadian Language Benchmark (CLB) Score Table
              </h4>
              <span className="text-[11px] text-emerald-600 font-bold">10–90 Scale</span>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold">
                    <th className="p-2.5 border-b border-slate-200">CLB Level</th>
                    <th className="p-2.5 border-b border-slate-200">Listening</th>
                    <th className="p-2.5 border-b border-slate-200">Reading</th>
                    <th className="p-2.5 border-b border-slate-200">Writing</th>
                    <th className="p-2.5 border-b border-slate-200">Speaking</th>
                    <th className="p-2.5 border-b border-slate-200">Visa Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-[#0A3663]">CLB 7</td>
                    <td className="p-2.5">60 – 70</td>
                    <td className="p-2.5">60 – 68</td>
                    <td className="p-2.5">69 – 78</td>
                    <td className="p-2.5">68 – 75</td>
                    <td className="p-2.5 text-slate-500">Minimum for Express Entry</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-[#0A3663]">CLB 8</td>
                    <td className="p-2.5">71 – 81</td>
                    <td className="p-2.5">69 – 77</td>
                    <td className="p-2.5">79 – 87</td>
                    <td className="p-2.5">76 – 83</td>
                    <td className="p-2.5 text-slate-500">Competitive CRS points</td>
                  </tr>
                  <tr className="bg-emerald-50/60 font-semibold text-emerald-900">
                    <td className="p-2.5 font-bold text-emerald-700">CLB 9+</td>
                    <td className="p-2.5">82 – 88</td>
                    <td className="p-2.5">78 – 87</td>
                    <td className="p-2.5">88 – 89</td>
                    <td className="p-2.5">84 – 88</td>
                    <td className="p-2.5 font-bold text-emerald-700">Maximum CRS PR Points</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: SIDE-BY-SIDE COMPARISON TABLE */}
      {/* ============================================================== */}
      {activeTab === 'compare' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base sm:text-lg font-bold text-[#0A3663]">
              Side-by-Side Comparison: Academic vs. General vs. Core
            </h3>
            <span className="text-xs text-[#0098DA] font-semibold">Taught at RK Academy</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[#0A3663] text-white">
                  <th className="p-3 w-[18%]">Feature</th>
                  <th className="p-3 w-[27%] bg-[#0C4177]">🎓 PTE Academic</th>
                  <th className="p-3 w-[27%] bg-[#164A82]">📘 PTE General</th>
                  <th className="p-3 w-[28%] bg-[#092B4F]">🍁 PTE Core</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800 bg-slate-50/60">Primary Purpose</td>
                  <td className="p-3 text-slate-700">University Studies &amp; Australia / UK / NZ Visas</td>
                  <td className="p-3 text-slate-700">Everyday &amp; Workplace English Certification (CEFR A1–C2)</td>
                  <td className="p-3 text-emerald-700 font-semibold">Canada Permanent Residency (Express Entry &amp; PNP)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800 bg-slate-50/60">Exam Format</td>
                  <td className="p-3 text-slate-700 font-semibold">~2 Hours (100% Computer-Based)</td>
                  <td className="p-3 text-slate-700 font-semibold">Written Paper + Spoken Interview</td>
                  <td className="p-3 text-slate-700 font-semibold">~2 Hours (100% Computer-Based)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800 bg-slate-50/60">Speaking Focus</td>
                  <td className="p-3 text-slate-700">
                    <strong>Re-tell Lecture:</strong> University academic talks
                  </td>
                  <td className="p-3 text-slate-700">
                    <strong>Spoken Interview:</strong> Real-life dialogue &amp; role-play
                  </td>
                  <td className="p-3 text-slate-700">
                    <strong>Respond to a Situation:</strong> Everyday &amp; workplace scenarios
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800 bg-slate-50/60">Writing Focus</td>
                  <td className="p-3 text-slate-700">
                    <strong>Write Essay:</strong> 200–300 word academic essay
                  </td>
                  <td className="p-3 text-slate-700">
                    <strong>Communicative Writing:</strong> Practical letters, articles &amp; essays
                  </td>
                  <td className="p-3 text-emerald-800 font-bold bg-emerald-50/40">
                    <strong>Write Email:</strong> ~100-word workplace email
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800 bg-slate-50/60">Score / Validity</td>
                  <td className="p-3 text-slate-700">10–90 Scale (2 years) • IELTS Band Eqv.</td>
                  <td className="p-3 text-slate-700">CEFR A1–C2 (Lifetime certificate validity)</td>
                  <td className="p-3 text-slate-700">10–90 Scale (2 years) • Canadian CLB 7–9</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800 bg-slate-50/60">Accepted By</td>
                  <td className="p-3 text-slate-700">Australia, UK, New Zealand, USA, Canada (Study SDS)</td>
                  <td className="p-3 text-slate-700">Global employers, schools &amp; Ministries of Education</td>
                  <td className="p-3 text-slate-700 font-semibold">IRCC Canada (Express Entry &amp; Citizenship)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Bottom WhatsApp Counselor Help Card */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-50 to-blue-50/80 rounded-2xl border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white text-[#0098DA] border border-sky-100 shadow-2xs shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0A3663]">
              Not sure which PTE test your visa requires?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Our certified trainers in Kilinochchi review your university offer or visa subclass and recommend the right test track.
            </p>
          </div>
        </div>

        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors shrink-0"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
          <span>Ask Counselor on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
