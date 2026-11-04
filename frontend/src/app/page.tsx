import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeTicker from '@/components/common/MarqueeTicker';
import CoursesOverviewSection from '@/components/sections/CoursesOverviewSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import VisionMissionSection from '@/components/sections/VisionMissionSection';
import StudentReviewsSection from '@/components/sections/StudentReviewsSection';
import OnlineClassesBanner from '@/components/sections/OnlineClassesBanner';
import FaqAccordionSection from '@/components/sections/FaqAccordionSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with local Kilinochchi targeting & CTA */}
      <HeroSection />

      {/* Moving Announcement Ticker (Animated Marquee) */}
      <MarqueeTicker />

      {/* 2. Core Certified Course Cards with Course Images */}
      <CoursesOverviewSection />

      {/* 3. Why Choose Us (IELTS/PTE + Diploma in English & Spoken English) */}
      <WhyChooseUsSection />

      {/* Strategic Vision, Mission & Commitments */}
      <VisionMissionSection />

      {/* 4. Student Reviews & Testimonials Showcase (With Interactive Submit Option) */}
      <StudentReviewsSection />

      {/* 5. Online IELTS Classes Banner */}
      <OnlineClassesBanner />

      {/* 6. Frequently Asked Questions (Interactive Accordion - Click to Reveal Answers) */}
      <FaqAccordionSection />
    </>
  );
}
