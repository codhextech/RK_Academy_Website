import React from 'react';
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
} from 'lucide-react';
import Link from 'next/link';

export default function WhyChooseUsSection() {
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
      title: 'Enhances Communication Skills',
      desc: 'English is a global language. Strong speaking and writing skills open doors to better communication in academic, professional, and social settings.',
      icon: MessageSquare,
    },
    {
      title: 'Boosts Career Opportunities',
      desc: 'Many employers worldwide seek candidates with good English proficiency. A diploma proves your language skills and increases your employability.',
      icon: Briefcase,
    },
    {
      title: 'Supports Academic Success',
      desc: 'English proficiency is essential for students aiming to study abroad or excel in higher education where English is the medium of instruction.',
      icon: Award,
    },
    {
      title: 'Facilitates Exam Preparation',
      desc: 'A solid foundation in English helps students perform better in exams like IELTS, PTE, TOEFL, and other language tests.',
      icon: CheckCircle2,
    },
    {
      title: 'Improves Networking',
      desc: 'Being fluent in English allows you to connect with people globally, expanding personal and professional networks.',
      icon: Globe,
    },
    {
      title: 'Builds Confidence',
      desc: 'Spoken English training helps overcome language barriers and boosts confidence in everyday conversations, interviews, and presentations.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* PART 1: Why Join Us for IELTS & PTE Classes? */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0098DA] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Why Choose Us?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663] mt-3 mb-4">
              Why Join Us for IELTS and PTE Classes?
            </h2>
            <p className="text-base text-slate-600">
              Join <strong>RK International Language Academy</strong> and take a confident step toward your academic and career goals!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ieltsBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-100 hover:border-sky-200 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-sky-100 flex items-center justify-center text-[#0098DA] group-hover:bg-[#0A3663] group-hover:text-white transition-colors mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A3663] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}

            {/* CTA Box inside the grid */}
            <div className="p-6 rounded-2xl bg-[#0A3663] text-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#0098DA] uppercase tracking-wide">
                  Ready to Start?
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">
                  Book Your Seat in the Upcoming Batch
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Get personalized assessment and mock materials included with your enrollment.
                </p>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-[#0098DA] hover:bg-[#0080B8] text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* PART 2: Why is a Diploma in English and Spoken English Important? */}
        <div className="pt-10 border-t border-slate-100">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0098DA] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Foundation & Fluency
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663] mt-3 mb-4">
              Why is a Diploma in English and Spoken English Important?
            </h2>
            <p className="text-base text-slate-600">
              At <strong>RK International Language Academy</strong>, our Diploma in English and Spoken English courses are designed to equip you with these vital skills, paving the way for success in a globalized world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diplomaBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0098DA] shadow-xs hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-[#0A3663] mb-4">
                    <Icon className="w-6 h-6 text-[#0098DA]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A3663] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
