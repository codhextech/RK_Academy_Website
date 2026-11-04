'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import Link from 'next/link';

interface MarqueeTickerProps {
  className?: string;
}

const TICKER_ITEMS = [
  'BRITISH COUNCIL & IDP OFFICIAL REGISTRATION DESK',
  'IELTS ACADEMIC & GENERAL TRAINING BAND 7.5+ COACHING',
  'COMPUTER-BASED PTE ACADEMIC LAB IN KILINOCHCHI',
  'UKVI & LIFE SKILLS A1 / B1 VISA PREPARATION',
  'BASIC DIPLOMA IN ENGLISH & SPOKEN FLUENCY MASTERY',
  'DIPLOMA IN INFORMATION TECHNOLOGY (IT) & SOFTWARE SKILLS',
  'DIPLOMA IN SINHALA LANGUAGE (සිංහල ඩිප්ලෝමාව)',
  'FRENCH DELF EXAM PREPARATION (A1 & A2)',
  'DUTCH & DEUTSCH (GERMAN) LANGUAGE PREPARATIONS',
  'IN-PERSON AT A-9 ROAD KILINOCHCHI & LIVE ONLINE VIA ZOOM',
  'NEW BATCHES COMMENCING EVERY WEEK – ADMISSIONS OPEN',
];

export default function MarqueeTicker({ className = '' }: MarqueeTickerProps) {
  const renderItemSet = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {TICKER_ITEMS.map((text, idx) => (
        <div key={`${keyPrefix}-${idx}`} className="flex items-center mx-4 sm:mx-6 shrink-0">
          <Zap
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 fill-amber-400 shrink-0 mr-3 sm:mr-4 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse"
            aria-hidden="true"
          />
          <span className="font-black text-xs sm:text-sm tracking-wider text-white uppercase whitespace-nowrap">
            {text}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`w-full bg-white py-1.5 sm:py-2.5 ${className}`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <aside
          aria-label="Academy Highlights and Announcements"
          className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#041a33] via-[#0A3663] to-[#041a33] border border-[#0098DA]/30 shadow-md py-2.5 sm:py-3.5 select-none"
        >
          {/* Subtle top & bottom accent borders */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-sky-300/25" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-sky-300/25" />

          {/* Left & Right Cinematic Fade-out Gradients */}
          <div className="absolute left-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-r from-[#041a33] via-[#041a33]/80 to-transparent z-10 pointer-events-none rounded-l-xl sm:rounded-l-2xl" />
          <div className="absolute right-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-l from-[#041a33] via-[#041a33]/80 to-transparent z-10 pointer-events-none rounded-r-xl sm:rounded-r-2xl" />

          {/* Infinite Scrolling Track */}
          <Link href="/ielts-courses" className="flex overflow-hidden group cursor-pointer" title="Explore all courses">
            <div className="animate-marquee flex items-center">
              {renderItemSet('set-1')}
              {renderItemSet('set-2')}
            </div>
          </Link>
        </aside>
      </div>
    </div>
  );
}
