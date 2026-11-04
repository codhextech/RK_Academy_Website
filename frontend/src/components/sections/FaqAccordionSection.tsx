'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Where is RK International Language Academy located in Kilinochchi?',
    a: 'We are situated directly on the main A-9 Road, near Theresamma Kovil, Kilinochchi. Our campus features modern lecture rooms with easy A-9 Road access, dedicated one-on-one speaking interview chambers, and an audio listening lab with individual headphones.',
  },
  {
    q: 'Can I join IELTS classes online if I live in Jaffna, Colombo, or abroad?',
    a: 'Yes! We conduct interactive live online IELTS classes via Zoom with certified trainers, mock tests, individual speaking assessments, and recorded video archives for revision. Students from Jaffna, Colombo, the Middle East, and the UK attend our evening cohorts.',
  },
  {
    q: 'Do you help with British Council exam registration in Sri Lanka?',
    a: 'Yes, we guide all enrolled students step-by-step through the official British Council and IDP registration process, date selection, passport verification, and test venue preparation to make the entire process hassle-free.',
  },
  {
    q: 'What is the difference between IELTS Academic and IELTS General Training?',
    a: 'IELTS Academic is required for university admissions (undergraduate & master degrees abroad) and professional medical registrations (e.g. UK NHS). IELTS General Training is required for permanent residency (PR), work permits, and immigration to Canada (Express Entry), Australia, and the UK.',
  },
  {
    q: 'What if my English grammar and vocabulary are weak?',
    a: 'We offer a dedicated Foundation English and Basic Diploma in English & Spoken English program to build your grammar tenses, sentence structure, and vocabulary before tackling intensive IELTS test modules.',
  },
  {
    q: 'Do you offer computer-based PTE Academic coaching in Kilinochchi?',
    a: 'Yes, RK International Language Academy operates a high-speed computerized laboratory on A-9 Road equipped with official Pearson test simulation software, AI scoring feedback, and microphone speaking practice.',
  },
];

export default function FaqAccordionSection() {
  // Option B: Single active index so clicked question expands from 2-column to full-width 1-column
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-12 md:py-20 bg-slate-50 border-t border-slate-200" id="faqs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663] mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto">
            Clear answers to help you plan your IELTS, PTE, and English learning journey with RK International.
          </p>
        </div>

        {/* FAQ Accordion Grid: 2 questions per line on PC, smoothly expands to full width on click */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen
                    ? 'col-span-1 md:col-span-2 shadow-lg border-[#0098DA] ring-2 ring-[#0098DA]/20'
                    : 'col-span-1 shadow-2xs border-slate-200/90 hover:border-sky-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 focus:outline-hidden cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3 pr-2">
                    <HelpCircle className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-bold text-[#0A3663] group-hover:text-[#0098DA] transition-colors leading-snug">
                      {faq.q}
                    </span>
                  </div>

                  {/* Dropdown Chevron Button */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#0A3663] text-white rotate-180 shadow-xs'
                        : 'bg-sky-50 text-[#0098DA] group-hover:bg-sky-100'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300" />
                  </div>
                </button>

                {/* Collapsible Answer */}
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="text-slate-700 bg-sky-50/70 p-4 rounded-xl border border-sky-100 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Counselor Assistance Bar */}
        <div className="mt-8 bg-white p-5 sm:p-6 rounded-2xl border border-sky-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-bold text-[#0A3663] text-xs sm:text-sm">Have a question not listed here?</p>
            <p className="text-[11px] sm:text-xs text-slate-500">Call our counselors directly or drop us a WhatsApp message.</p>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-center">
            <a
              href={`tel:${ACADEMY_INFO.phone}`}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#0A3663] px-3.5 py-2.5 rounded-xl transition-colors border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-[#0098DA]" />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
