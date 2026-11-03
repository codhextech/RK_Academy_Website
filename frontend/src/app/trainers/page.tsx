import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, GraduationCap, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Our Certified IELTS Trainers | RK International Kilinochchi',
  description:
    'Meet the certified IELTS instructors and language trainers at RK International Language Academy Kilinochchi with verified Band 8.5 credentials.',
};

export default function TrainersPage() {
  const trainers = [
    {
      name: 'Lead IELTS Master Trainer',
      role: 'Head of IELTS Academic & British Council Certified',
      band: 'Overall Band 8.5',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
      experience: '8+ Years Teaching Experience',
      qualifications: ['British Council Certified IELTS Instructor', 'MA in English Literature', 'IDP IELTS Trained'],
      specialties: ['Academic Writing Task 2 Argumentation', 'Complex Sentence Structures', 'One-on-One Speaking Drills'],
    },
    {
      name: 'Senior General Training Specialist',
      role: 'IELTS General & Migration Coach',
      band: 'Overall Band 8.0',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
      experience: '6+ Years Teaching Experience',
      qualifications: ['Certified Language Educator', 'BA in English & Linguistics'],
      specialties: ['General Letter Writing Formulas', 'Reading Time Management', 'Pronunciation & Intonation'],
    },
    {
      name: 'Foundation & Spoken English Instructor',
      role: 'Coordinator for Diploma & Fluency',
      band: 'Overall Band 8.0',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=500&q=80',
      experience: '5+ Years Teaching Experience',
      qualifications: ['Diploma in TESL / TEFL', 'Bachelor of Education'],
      specialties: ['Grammar from Scratch', 'Fearless Conversation Drills', 'Public Speaking Confidence'],
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[#0098DA] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Expert Faculty
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Meet Our Expert Trainers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Learn from certified, experienced instructors who understand exam scoring criteria inside out.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainers.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Trainer Portrait */}
                  <div className="relative h-64 w-full bg-slate-200">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute top-3 right-3 bg-[#0098DA] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                      {t.band}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl font-bold text-[#0A3663] mb-1">
                      {t.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mb-4">{t.role}</p>

                    <div className="space-y-3 py-4 border-y border-slate-200 text-xs text-slate-700">
                      <p className="font-semibold text-slate-800">{t.experience}</p>
                      <ul className="space-y-1 text-slate-600">
                        {t.qualifications.map((q, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0098DA]" />
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/register"
                    className="w-full text-center bg-[#0A3663] hover:bg-[#124C85] text-white py-2.5 px-4 rounded-xl font-bold text-xs block transition-colors shadow-xs"
                  >
                    Learn with This Trainer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
