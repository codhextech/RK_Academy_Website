import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  Clock,
  Laptop,
  CheckCircle2,
  Calendar,
  FileCheck,
  ChevronRight,
  Sparkles,
  Phone,
  HelpCircle,
  Lightbulb,
  Award,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import CourseCurriculumSection from '@/components/common/CourseCurriculumSection';
import { getCourseBySlug, getAllCourseSlugs, ACADEMY_COURSES } from '@/lib/coursesData';
import { ACADEMY_INFO } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found | RK International Language Academy',
    };
  }

  const metaTitle = `${course.title} in Kilinochchi | RK International Academy`;
  const metaDescription = `${course.description} Comprehensive syllabus, certified trainers, and in-person & online batches at A-9 Road, Kilinochchi.`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      `${course.shortTitle} Kilinochchi`,
      `${course.title} Sri Lanka`,
      `${course.shortTitle} classes Northern Province`,
      'RK International Language Academy',
      'IELTS and language classes Kilinochchi',
    ],
    alternates: {
      canonical: `https://rkacademy.lk/ielts-courses/${course.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://rkacademy.lk/ielts-courses/${course.slug}`,
      siteName: 'RK International Language Academy',
      images: [
        {
          url: course.image,
          width: 800,
          height: 600,
          alt: `${course.title} - RK International Academy`,
        },
      ],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const whatsappInquiryUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hi RK International Language Academy, I would like to inquire about admission, fee details, and syllabus for ${course.title}.`
  )}`;

  // JSON-LD Course Structured Data for Google Rich Results
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: ACADEMY_INFO.name,
      sameAs: 'https://rkacademy.lk',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'A-9 Road, Near Theresamma Kovil',
        addressLocality: 'Kilinochchi',
        addressRegion: 'Northern Province',
        addressCountry: 'LK',
      },
      telephone: ACADEMY_INFO.phone,
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: ['In-Person', 'Online'],
        courseWorkload: course.duration,
        location: {
          '@type': 'Place',
          name: 'RK International Language Academy Kilinochchi Campus',
          address: 'A-9 Road, Near Theresamma Kovil, Kilinochchi',
        },
      },
    ],
  };

  const otherCourses = ACADEMY_COURSES.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* 1. HERO BANNER - Consistent Academy Navy Theme */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-6 sm:py-8 md:py-10 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-sky-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
              <li>
                <Link href="/ielts-courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
              <li className="text-white font-bold truncate max-w-[200px] sm:max-w-none">
                {course.shortTitle}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 sm:space-y-3.5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
                {course.longDescription || course.description}
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock className="w-4 h-4 text-[#0098DA]" />
                  <span><strong>Duration:</strong> {course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Laptop className="w-4 h-4 text-[#0098DA]" />
                  <span><strong>Delivery:</strong> {course.modes}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <GraduationCap className="w-4 h-4 text-[#0098DA]" />
                  <span><strong>Campus:</strong> A-9 Road, Kilinochchi</span>
                </div>
              </div>
            </div>

            {/* Visual Thumbnail Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-3 shadow-2xl border border-sky-100 overflow-hidden">
                <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3663]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-bold bg-[#0A3663] text-white px-3 py-1 rounded-md shadow-xs">
                    {course.category}
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Admissions:</span>
                    <span className="font-bold text-[#0A3663] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                      Now Enrolling
                    </span>
                  </div>

                  <Link
                    href={`/register?course=${course.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md"
                  >
                    <GraduationCap className="w-4 h-4 text-[#0098DA]" />
                    <span>Enroll in This Course</span>
                  </Link>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#25D366] text-[#0A3663] hover:text-white border-2 border-[#25D366] py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 group"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                    <span>WhatsApp Admissions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN COURSE BODY: SYLLABUS, MODULES & EXAM DETAILS */}
      <section className="py-10 md:py-14">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Curriculum Highlights & Detailed Modules */}
            <div className="lg:col-span-8 space-y-12">
              {/* Target Audience & Overview */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0A3663]">
                  Course Overview & Target Audience
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {course.description}
                </p>
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-[#0A3663] uppercase tracking-wide">
                      Who Is This Course For?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      {course.targetAudience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Collapsible Curriculum Highlights & Course Modules Dropdowns */}
              <CourseCurriculumSection
                highlights={course.curriculumHighlights}
                modules={course.modules}
                defaultHighlightsOpen={false}
                defaultModulesOpen={false}
              />

              {/* Exam Format & Global Recognition */}
              {course.examFormat && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0A3663]">
                      Exam Format &amp; Acceptance
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
                      <h3 className="text-xs font-bold text-[#0A3663] uppercase tracking-wide mb-2">
                        Official Certification
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {course.examFormat.certification}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
                      <h3 className="text-xs font-bold text-[#0A3663] uppercase tracking-wide mb-2">
                        Worldwide Acceptance
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {course.examFormat.acceptance}
                      </p>
                    </div>
                  </div>

                  {course.examFormat.components && (
                    <div>
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                        Test Components:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {course.examFormat.components.map((comp, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-semibold text-[#0A3663] bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tips for Success */}
              {course.tipsForSuccess && course.tipsForSuccess.length > 0 && (
                <div className="bg-sky-50/70 rounded-3xl p-6 sm:p-8 border border-sky-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <h2 className="text-xl font-bold text-[#0A3663]">
                      Expert Trainer Tips for Success
                    </h2>
                  </div>
                  <ul className="space-y-2.5">
                    {course.tipsForSuccess.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Sticky Sidebar containing both Admissions & Explore Other Programs */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-20 space-y-4">
                {/* Admissions Card */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-md space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A3663]">
                      Join Next Upcoming Batch
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Flexible weekday &amp; weekend batches in Kilinochchi and online.
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-700 border-y border-slate-100 py-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Program:</span>
                      <span className="font-bold text-[#0A3663]">{course.shortTitle}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Duration:</span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Format:</span>
                      <span className="font-semibold">{course.modes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Location:</span>
                      <span className="font-semibold">Kilinochchi &amp; Zoom</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Mock Tests:</span>
                      <span className="font-bold text-emerald-600">Included Free</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Link
                      href={`/register?course=${course.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                    >
                      <GraduationCap className="w-4 h-4 text-[#0098DA]" />
                      <span>Register Online Now</span>
                    </Link>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#25D366] text-[#0A3663] hover:text-white border-2 border-[#25D366] py-2.5 rounded-xl font-bold text-xs transition-all duration-200 group"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                      <span>WhatsApp for Fees &amp; Schedule</span>
                    </a>

                    <a
                      href={`tel:${ACADEMY_INFO.phone}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-[#0A3663] py-2 rounded-xl font-bold text-xs transition-colors border border-slate-200"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0098DA]" />
                      <span>Call Hotline: {ACADEMY_INFO.phone}</span>
                    </a>
                  </div>

                  {/* Academy Trust Guarantee */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-[#0A3663]">
                      <FileCheck className="w-4 h-4 text-[#0098DA] shrink-0" />
                      <span className="text-xs">British Council &amp; Pearson Assistance</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Test date booking, venue procedures, and exam day support included.
                    </p>
                  </div>
                </div>

                {/* Related Programs (Explore Other Programs) */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-3">
                  <h3 className="font-bold text-[#0A3663] text-xs uppercase tracking-wider">
                    Explore Other Programs
                  </h3>
                  <div className="space-y-2">
                    {otherCourses.map((other) => (
                      <Link
                        key={other.id}
                        href={`/ielts-courses/${other.slug}`}
                        className="block p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-200 transition-colors group"
                      >
                        <h4 className="font-bold text-xs text-[#0A3663] group-hover:text-[#0098DA] transition-colors leading-snug">
                          {other.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{other.duration}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
