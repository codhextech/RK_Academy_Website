import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Award, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About Us | RK International Language Academy Kilinochchi',
  description:
    'Learn about RK International Language Academy, our academic mission, teaching approach, and dedicated IELTS faculty in Kilinochchi, Sri Lanka.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-[#0098DA] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            The Way of Success
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            About RK International Language Academy
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Empowering students and professionals across Northern Sri Lanka to conquer international English exams and achieve their global aspirations.
          </p>
        </div>
      </section>

      {/* Main Story & Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0098DA]">
                Our Background & Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A3663]">
                Dedicated to Educational Excellence in Kilinochchi
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Founded with a singular vision, <strong>RK International Language Academy</strong> provides world-class English language training and IELTS test preparation without students needing to travel outside Kilinochchi.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether your destination is higher education in Canada or the UK, or migration to Australia, our expert faculty delivers individualized training and rigorous exam simulations to guarantee confidence on test day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
                  <Target className="w-6 h-6 text-[#0098DA] mb-2" />
                  <h3 className="font-bold text-[#0A3663] text-sm">Our Mission</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    To deliver accessible, high-standard IELTS and language coaching that opens doors to worldwide universities and careers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
                  <Award className="w-6 h-6 text-[#0098DA] mb-2" />
                  <h3 className="font-bold text-[#0A3663] text-sm">Our Methodology</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Structured modular practice, daily vocabulary building, real exam mock tests, and personal speaking feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Campus Info Box with Real Classroom Photo */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-lg space-y-6">
              <div className="relative h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                  alt="RK Academy Classroom in Kilinochchi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3663] via-transparent to-transparent flex items-end p-6">
                  <div className="bg-white/95 px-4 py-2 rounded-xl backdrop-blur-xs">
                    <Image
                      src="/images/logo/rk-logo.png"
                      alt="RK Academy Logo"
                      width={200}
                      height={40}
                      style={{ width: 'auto', height: 'auto', maxHeight: '40px', maxWidth: '200px' }}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 space-y-6">
                <h3 className="text-xl font-bold text-[#0A3663]">
                  Kilinochchi Campus Facilities (A-9 Road)
                </h3>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>State-of-the-art multimedia lecture rooms near Theresamma Kovil</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>Dedicated Audio Listening Lab with individual headphones</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>Official Cambridge & British Council test preparation materials</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                    <span>Air-conditioned study environment with high-speed internet</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto text-center bg-[#0A3663] hover:bg-[#124C85] text-white py-3 px-6 rounded-xl font-bold text-sm shadow-md"
                  >
                    Join Next Batch
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto text-center border border-slate-300 hover:bg-white text-slate-700 py-3 px-6 rounded-xl font-semibold text-sm"
                  >
                    Visit Campus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
