import React from 'react';
import { ACADEMY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Terms of Enrollment | RK International Language Academy',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <h1 className="text-3xl font-extrabold text-[#0A3663] mb-6">Terms & Conditions of Enrollment</h1>
      <div className="prose prose-slate max-w-none space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          Welcome to <strong>RK International Language Academy</strong>. By enrolling in our in-person or live online courses, you agree to comply with our academic guidelines.
        </p>
        <h2 className="text-xl font-bold text-[#0A3663] mt-6">Course Attendance & Code of Conduct</h2>
        <p>
          Students are expected to attend scheduled sessions promptly, whether in the Kilinochchi lecture rooms or virtual Zoom rooms. Active participation in speaking and writing assignments is required to achieve target band results.
        </p>
        <h2 className="text-xl font-bold text-[#0A3663] mt-6">Exam Registration Guidance</h2>
        <p>
          RK International provides professional assistance and guidance for British Council and IDP test bookings. Test dates and official results remain subject to the terms of the official testing agencies.
        </p>
      </div>
    </div>
  );
}
