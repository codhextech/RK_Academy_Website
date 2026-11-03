import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Clock, MapPin, Laptop, Sparkles, Award, ArrowRight, Laptop2, BookOpen } from 'lucide-react';
import { ACADEMY_INFO, WHY_DIPLOMA_SPOKEN_ENGLISH } from '@/lib/constants';

export const metadata = {
  title: 'PTE, Diploma in English & Spoken English | RK International Kilinochchi',
  description:
    'PTE Academic, Diploma in English, Spoken English, and Foundation English classes in Kilinochchi and Live Online at RK International Language Academy.',
};

export default function PreparationCoursePage() {
  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#0098DA] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
              PTE, Diploma & Language Mastery
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
              PTE Academic, Diploma in English & Spoken Fluency
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Expand your career and global opportunities. Choose between fast-track computerized PTE, professional Diploma qualifications, and everyday spoken confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-16">
              {/* 1. PTE ACADEMIC SECTION */}
              <div id="pte" className="scroll-mt-28 space-y-6">
                <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
                    alt="PTE Academic Computerized Exam Preparation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3663]/90 via-transparent to-transparent flex items-end p-6">
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-md uppercase">
                      Pearson Test of English (PTE Academic)
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0A3663] mb-2">
                    PTE Academic Coaching in Kilinochchi
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    PTE Academic is a fast, 100% computer-based English exam accepted by thousands of universities worldwide and immigration authorities in Australia, New Zealand, and the UK. With results typically issued within 48 hours, our Kilinochchi computer lab trains you on the exact AI algorithm mechanics.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 space-y-1">
                    <h3 className="font-bold text-[#0A3663] text-sm">Speaking & Writing Algorithms</h3>
                    <p className="text-xs text-slate-600">
                      Learn templates for Describe Image, Retell Lecture, and Summarize Written Text that score maximum marks.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 space-y-1">
                    <h3 className="font-bold text-[#0A3663] text-sm">Computer Lab Simulations</h3>
                    <p className="text-xs text-slate-600">
                      Practice in simulated test environments matching official Pearson testing centers.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. DIPLOMA IN ENGLISH SECTION */}
              <div id="diploma" className="scroll-mt-28 pt-8 border-t border-slate-200 space-y-6">
                <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80"
                    alt="Diploma in English Graduation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3663]/90 via-transparent to-transparent flex items-end p-6">
                    <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase">
                      Professional Qualification
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0A3663] mb-2">
                    Diploma in English
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    A comprehensive 3-month qualification designed to develop complete mastery in written and spoken English for higher education and career development.
                  </p>
                </div>

                {/* 6 Benefits Grid */}
                <h3 className="text-lg font-bold text-[#0A3663]">Why Earn a Diploma in English?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {WHY_DIPLOMA_SPOKEN_ENGLISH.map((b, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-[#0A3663] text-sm mb-1">{b.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. SPOKEN ENGLISH SECTION */}
              <div id="spoken-english" className="scroll-mt-28 pt-8 border-t border-slate-200 space-y-6">
                <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80"
                    alt="Spoken English and Fluency Classes"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3663]/90 via-transparent to-transparent flex items-end p-6">
                    <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase">
                      Conversational Mastery
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0A3663] mb-2">
                    Spoken English & Fluency Classes
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Designed specifically to overcome hesitation, build natural conversational flow, and master public speaking. Classes involve daily speaking drills, debates, and job interview simulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Enrollment Card */}
            <div className="lg:col-span-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-[#0098DA] uppercase tracking-wider">
                    Course Inquiries
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0A3663] mt-1">
                    Language Programs
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Weekday and weekend batches available in Kilinochchi and online.
                  </p>
                </div>

                <div className="space-y-3 py-4 border-y border-slate-200 text-xs sm:text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">PTE Academic:</span>
                    <span className="font-bold">6 – 8 Weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Diploma in English:</span>
                    <span className="font-bold">12 Weeks (Diploma)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Spoken English:</span>
                    <span className="font-bold">8 Weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Foundation Prep:</span>
                    <span className="font-bold">6 – 10 Weeks</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/register"
                    className="w-full text-center bg-[#0A3663] hover:bg-[#124C85] text-white py-3.5 px-4 rounded-xl font-bold text-sm block shadow-md transition-colors"
                  >
                    Enroll in a Program
                  </Link>
                  <a
                    href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent('Hi RK Academy, I would like to inquire about PTE Academic and Diploma in English course details.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-bold text-sm block transition-colors shadow-xs"
                  >
                    Inquire on WhatsApp
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
