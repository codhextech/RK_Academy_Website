import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Clock,
  Laptop,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { ACADEMY_COURSES } from '@/lib/coursesData';

export const metadata = {
  title: 'Certified Diplomas & Language Courses in Kilinochchi | RK International Academy',
  description:
    'Explore accredited diploma programs and language preparations at RK International Language Academy: IELTS & UKVI, PTE Academic, Diplomas in English & IT, Sinhala, French DELF, and Dutch & Deutsch.',
};

export default function CoursesHubPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header Banner - Compact & Streamlined */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-8 md:py-12 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Our Courses &amp; Diplomas
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose from Northern Sri Lanka&apos;s leading academy for international language tests, vocational IT training, and European language pathways.
          </p>
        </div>
      </section>

      {/* Course Cards Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACADEMY_COURSES.map((course) => {
              const linkHref =
                course.slug === 'ielts-ukvi'
                  ? '/ielts-courses/academic'
                  : `/ielts-courses/${course.slug}`;

              return (
                <div
                  key={course.id}
                  className={`bg-white rounded-3xl shadow-sm hover:shadow-xl border-t-4 ${course.accentColor} border-x border-b border-slate-200/90 overflow-hidden flex flex-col justify-between transition-all duration-300 group`}
                >
                  <div>
                    {/* Course Thumbnail Image */}
                    <div className="relative h-52 w-full bg-slate-200 overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs bg-white text-[#0A3663]">
                        {course.tag}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {course.category}
                      </span>
                      <h3 className="text-xl font-bold text-[#0A3663] mt-1 mb-2 leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                        {course.description}
                      </p>

                      {/* Specs */}
                      <div className="space-y-2 py-3 border-y border-slate-100 mb-6 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#0098DA] shrink-0" />
                          <span><strong>Duration:</strong> {course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Laptop className="w-4 h-4 text-[#0098DA] shrink-0" />
                          <span><strong>Mode:</strong> {course.modes}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                        Curriculum Highlights:
                      </h4>
                      <ul className="space-y-2.5 mb-6">
                        {course.curriculumHighlights.slice(0, 4).map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="p-6 sm:p-7 pt-0 flex flex-col gap-2">
                    <Link
                      href={linkHref}
                      className="w-full text-center py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm border border-[#0A3663] text-[#0A3663] hover:bg-slate-50 transition-colors"
                    >
                      View Full Modules & Syllabus
                    </Link>
                    <Link
                      href={`/register?course=${course.slug}`}
                      className="w-full text-center py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#0A3663] hover:bg-[#124C85] text-white flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <GraduationCap className="w-4 h-4 text-[#0098DA]" />
                      <span>Enroll in Program</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Master Comparison Table */}
          <div className="pt-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#0A3663]">
                Course At-A-Glance Comparison Matrix
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Find the ideal program matching your university, immigration, or professional goals.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0A3663] text-white">
                    <th className="p-4 sm:p-5 font-bold">Course / Program</th>
                    <th className="p-4 sm:p-5 font-bold">Target Focus</th>
                    <th className="p-4 sm:p-5 font-bold">Duration</th>
                    <th className="p-4 sm:p-5 font-bold">Key Modules</th>
                    <th className="p-4 sm:p-5 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {ACADEMY_COURSES.map((c) => (
                    <tr key={c.id} className="hover:bg-sky-50/40 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#0A3663]">
                        {c.title}
                        <span className="block text-[11px] font-normal text-slate-500">{c.tag}</span>
                      </td>
                      <td className="p-4 sm:p-5 max-w-xs">{c.targetAudience}</td>
                      <td className="p-4 sm:p-5 font-semibold text-slate-900">{c.duration}</td>
                      <td className="p-4 sm:p-5">
                        <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-semibold">
                          {c.modules.length} Modules Included
                        </span>
                      </td>
                      <td className="p-4 sm:p-5">
                        <Link
                          href={c.slug === 'ielts-ukvi' ? '/ielts-courses/academic' : `/ielts-courses/preparation#${c.slug}`}
                          className="inline-flex items-center gap-1 font-bold text-[#0098DA] hover:text-[#0A3663]"
                        >
                          <span>Syllabus</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
