import React from 'react';
import StudentSuccessClient from '@/components/success/StudentSuccessClient';
import { ACADEMY_INFO } from '@/lib/constants';
import {
  getAcademyEvents,
  getAcademySettings,
  getExamResults,
  getStudentStories,
  syncFromMongoDBIfNeeded,
} from '@/lib/server/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Student Success Stories, IELTS Scorecards & Events | RK International Academy',
  description:
    'Explore verified IELTS & PTE exam results, official scorecards, student testimonials, and campus milestone events at RK International Language Academy Kilinochchi.',
};

export default async function StudentSuccessPage() {
  await syncFromMongoDBIfNeeded();
  const examResults = getExamResults();
  const events = getAcademyEvents();
  const stories = getStudentStories();
  const settings = getAcademySettings();

  return (
    <StudentSuccessClient
      initialExamResults={examResults}
      initialEvents={events}
      initialStories={stories}
      whatsappNumber={settings.whatsapp || ACADEMY_INFO.whatsappNumber}
    />
  );
}
