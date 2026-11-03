import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import CoursesOverviewSection from '@/components/sections/CoursesOverviewSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import StudentReviewsSection from '@/components/sections/StudentReviewsSection';
import OnlineClassesBanner from '@/components/sections/OnlineClassesBanner';
import ContactMapSection from '@/components/sections/ContactMapSection';
import { HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function HomePage() {
  const faqs = [
    {
      q: 'Where is RK International Language Academy located in Kilinochchi?',
      a: 'We are situated on the main A-9 Road, near Theresamma Kovil, Kilinochchi. Our campus features modern air-conditioned lecture rooms and an audio listening lab.',
    },
    {
      q: 'Can I join IELTS classes online if I live in Jaffna, Colombo, or abroad?',
      a: 'Yes! We conduct interactive live online IELTS classes via Zoom with certified trainers, mock tests, and personalized speaking practice sessions.',
    },
    {
      q: 'Do you help with British Council exam registration in Sri Lanka?',
      a: 'Yes, we guide all enrolled students step-by-step through the British Council IELTS exam booking process, test date selection, and venue guidance.',
    },
    {
      q: 'What is the difference between IELTS Academic and IELTS General Training?',
      a: 'IELTS Academic is required for university admissions (undergraduate & master degrees abroad). IELTS General Training is required for migration, permanent residency (PR), and work permits in Canada, Australia, and the UK.',
    },
    {
      q: 'What if my English grammar and vocabulary are weak?',
      a: 'We offer a dedicated Foundation English and Diploma in English & Spoken English program to build your grammar, vocabulary, and speaking confidence before tackling intensive IELTS test modules.',
    },
  ];

  return (
    <>
      {/* 1. Hero with local Kilinochchi targeting & CTA */}
      <HeroSection />

      {/* 2. Core IELTS Course Cards with Course Images */}
      <CoursesOverviewSection />

      {/* 3. Why Choose Us (IELTS/PTE + Diploma in English & Spoken English) */}
      <WhyChooseUsSection />

      {/* 4. Student Reviews & Testimonials Showcase (With Interactive Submit Option) */}
      <StudentReviewsSection />

      {/* 5. Online IELTS Classes Banner */}
      <OnlineClassesBanner />

      {/* 6. Frequently Asked Questions (FAQ) */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0098DA] bg-sky-100/70 px-3 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A3663] mt-3 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Clear answers to help you plan your IELTS journey with RK International.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs"
              >
                <h3 className="text-base font-bold text-[#0A3663] flex items-start gap-2.5 mb-2">
                  <HelpCircle className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-white p-6 rounded-2xl border border-sky-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-bold text-[#0A3663] text-sm">Have a question not listed here?</p>
              <p className="text-xs text-slate-500">Call our counselors directly or drop us a WhatsApp message.</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${ACADEMY_INFO.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#0A3663] px-3.5 py-2 rounded-lg transition-colors border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-[#0098DA]" />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-2 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Campus Location, Contact Form & Google Map */}
      <ContactMapSection />
    </>
  );
}
