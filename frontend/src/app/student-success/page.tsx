import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Star, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Student Success Stories & IELTS Results | RK International Kilinochchi',
  description:
    'Discover verified Band 7.0, 7.5, and 8.0 IELTS results achieved by students at RK International Language Academy Kilinochchi.',
};

export default function StudentSuccessPage() {
  const testimonials = [
    {
      name: 'K. Nimalan',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      band: 'Overall 8.0',
      scores: 'L: 8.5 | R: 8.0 | W: 7.5 | S: 7.5',
      course: 'IELTS Academic',
      destination: 'MSc in Cyber Security, UK',
      review:
        'The writing feedback at RK Academy transformed my essay structure. The trainers pointed out exactly where I was losing marks in coherence. Achieved 8.0 on my first attempt!',
    },
    {
      name: 'S. Tharani',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      band: 'Overall 7.5',
      scores: 'L: 8.0 | R: 7.5 | W: 7.0 | S: 7.5',
      course: 'IELTS General Training',
      destination: 'Canada Express Entry PR',
      review:
        'I needed CLB 9 for my Canadian immigration points. The weekend batch fit perfectly around my job, and the mock speaking sessions removed all my hesitation.',
    },
    {
      name: 'R. Ketheeswaran',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      band: 'Overall 7.5',
      scores: 'L: 8.0 | R: 8.0 | W: 7.0 | S: 7.0',
      course: 'IELTS Academic',
      destination: 'Australia University of Melbourne',
      review:
        'The listening lab facilities at Kilinochchi campus are top quality. Practicing with multiple accents helped me get an 8.0 in listening!',
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[#0098DA] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Proven Results
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Student Success & Band Scores
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Real stories from our students who achieved their dreams of university abroad and migration.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Student Portrait */}
                  <div className="relative h-56 w-full bg-slate-200">
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
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="font-bold text-[#0A3663] text-base">{t.name}</h3>
                        <p className="text-xs text-slate-500">{t.course} Alum</p>
                      </div>
                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <div className="bg-sky-50 rounded-lg px-3 py-1.5 mb-4 text-xs font-semibold text-[#0A3663]">
                      <p>{t.scores}</p>
                      <p className="text-slate-500 font-normal text-[11px] mt-0.5">{t.destination}</p>
                    </div>

                    <Quote className="w-5 h-5 text-[#0098DA]/40 mb-2" />
                    <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                      &ldquo;{t.review}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified IELTS Score</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-colors"
            >
              <span>Be Our Next Success Story — Enroll Today</span>
              <ArrowRight className="w-4 h-4 text-[#0098DA]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
