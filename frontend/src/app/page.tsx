import React from 'react';
import StartupPreloader from '@/components/common/StartupPreloader';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeTicker from '@/components/common/MarqueeTicker';
import CoursesOverviewSection, { CourseOverviewCard } from '@/components/sections/CoursesOverviewSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import VisionMissionSection from '@/components/sections/VisionMissionSection';
import StudentReviewsSection from '@/components/sections/StudentReviewsSection';
import OnlineClassesBanner from '@/components/sections/OnlineClassesBanner';
import FaqAccordionSection from '@/components/sections/FaqAccordionSection';
import { R2_MEDIA } from '@/lib/constants';
import { ACADEMY_COURSES } from '@/lib/coursesData';
import { getAcademySettings, getAllCourses, getStudentStories, syncFromMongoDBIfNeeded } from '@/lib/server/store';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  await syncFromMongoDBIfNeeded();
  const settings = getAcademySettings();
  const liveCourses = getAllCourses().filter((c) => c.active !== false);
  const stories = getStudentStories();

  const courses: CourseOverviewCard[] | undefined =
    liveCourses.length > 0
      ? liveCourses.map((c) => {
          const base = ACADEMY_COURSES.find((b) => b.slug === c.slug || b.id === c.id);
          return {
            id: c.id,
            title: c.title,
            tag: c.tag || base?.tag || c.category,
            slug: c.slug,
            linkHref: c.slug === 'ielts-ukvi' ? '/ielts-courses/academic' : `/ielts-courses/${c.slug}`,
            image: c.image || base?.image || R2_MEDIA.courses.ieltsUkvi,
            description: c.description || base?.description || '',
            highlights: (
              c.curriculumHighlights && c.curriculumHighlights.length > 0
                ? c.curriculumHighlights
                : base?.curriculumHighlights || []
            ).slice(0, 4),
            duration: c.duration || base?.duration || '8 Weeks',
            modes: c.modes || base?.modes || 'In-Person & Live Online',
            accentColor: base?.accentColor || 'border-[#0098DA]',
            badgeBg: base?.badgeBg || 'bg-sky-50 text-[#0A3663] border border-sky-200',
            popular: base?.popular ?? c.slug === 'ielts-ukvi',
            category: c.category || base?.category || 'English & Exams',
          };
        })
      : undefined;

  return (
    <>
      {/* Startup-Only Logo Preloader with Contour Blue Light */}
      <StartupPreloader />

      {/* 1. Hero with local Kilinochchi targeting & CTA */}
      <HeroSection
        watermarkUrl={settings.watermarkUrl || R2_MEDIA.brand.watermark}
        heroClassroomUrl={settings.heroClassroomUrl || R2_MEDIA.brand.heroClassroom}
        whatsappNumber={settings.whatsapp}
      />

      {/* 2. Core Certified Course Cards with Course Images */}
      <CoursesOverviewSection courses={courses} />

      {/* 3. Why Choose Us (IELTS/PTE + Diploma in English & Spoken English) */}
      <WhyChooseUsSection />

      {/* Strategic Vision, Mission & Commitments */}
      <VisionMissionSection />

      {/* 4. Student Reviews & Testimonials Showcase (With Interactive Submit Option) */}
      <StudentReviewsSection initialStories={stories} />

      {/* 5. Online IELTS Classes Banner */}
      <OnlineClassesBanner />

      {/* 6. Frequently Asked Questions (Interactive Accordion - Click to Reveal Answers) */}
      <FaqAccordionSection />
    </>
  );
}
