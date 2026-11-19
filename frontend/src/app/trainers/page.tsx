import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Phone } from 'lucide-react';
import { ACADEMY_INFO, R2_MEDIA } from '@/lib/constants';
import { ACADEMY_FACULTY_AND_STAFF } from '@/lib/trainersData';
import { getAllTrainers, syncFromMongoDBIfNeeded } from '@/lib/server/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Faculty & Staff | RK International Language Academy Kilinochchi',
  description:
    'Meet our dedicated faculty lecturers and administrative team at RK International Language Academy: Nepethika Nesakumaran, Senior Lecturer, Kamshaliny Raju (BSc Peradeniya), and Paskaran Ezhilsanth.',
};

export default async function TrainersPage() {
  await syncFromMongoDBIfNeeded();
  const liveTrainers = getAllTrainers().filter((t) => t.active !== false);
  const trainers = liveTrainers.length > 0 ? liveTrainers : ACADEMY_FACULTY_AND_STAFF;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Compact & Authoritative Header */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-8 md:py-12 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Our Faculty &amp; Staff
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Meet our certified educators and dedicated administrative team committed to guiding your academic, language, and technology journey at RK International Language Academy.
          </p>
        </div>
      </section>

      {/* 2. Faculty & Staff Profiles Grid */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((member, idx) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-[#0098DA] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Member Portrait */}
                  <div className="relative h-64 sm:h-72 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src={member.image || R2_MEDIA.trainers.nepethika}
                      alt={member.name}
                      fill
                      priority={idx < 2}
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Role Pill Badge */}
                    <span className="absolute top-3.5 right-3.5 bg-[#0A3663]/90 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-md border border-white/20">
                      {member.badge}
                    </span>
                  </div>

                  {/* Content Details */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-[#0A3663] leading-tight">
                        {member.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-bold text-[#0098DA] mt-0.5">
                        {member.role}
                      </p>
                      {member.organizationOrUniversity && (
                        <p className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">
                          {member.organizationOrUniversity}
                        </p>
                      )}
                    </div>

                    {/* Qualifications & Highlights */}
                    <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-700">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Key Qualifications &amp; Background:
                      </span>
                      {(member.qualifications || []).map((q, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0098DA] shrink-0 mt-0.5" />
                          <span className="text-slate-600 leading-snug text-[11px] sm:text-xs">{q}</span>
                        </div>
                      ))}
                    </div>

                    {/* Specialties & Areas of Focus */}
                    <div className="space-y-1.5 text-xs pb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Areas of Focus:
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {(member.specialties || []).map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] sm:text-[11px] font-medium text-[#0A3663] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Campus Admissions Assurance Card */}
          <div className="mt-14 bg-gradient-to-br from-[#062343] to-[#0A3663] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-sky-900/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Visit Our Kilinochchi Campus Admissions Desk
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Meet our Administrative Officer and instructors in person on the central A-9 Road, near Theresamma Kovil, Kilinochchi. Get free diagnostic level guidance and placement advice.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={`tel:${ACADEMY_INFO.phone1Raw}`}
                className="inline-flex items-center gap-2 bg-white text-[#0A3663] hover:bg-slate-100 font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0098DA]" />
                <span>Call Hotline</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0098DA] hover:bg-[#0080B8] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-colors"
              >
                <span>View Campus Location</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
