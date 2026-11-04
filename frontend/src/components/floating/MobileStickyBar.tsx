'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, GraduationCap, X } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';

export default function MobileStickyBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`;

  // Close when tapping outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    // Close on scroll to avoid blocking view while scrolling
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <>
      {/* Semi-transparent Backdrop Overlay for Accidental Click Guard */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-2xs z-40 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Speed Dial Container on Mobile (Bottom-Right) */}
      <div
        ref={containerRef}
        className="md:hidden fixed bottom-5 right-4 z-50 flex flex-col items-end select-none"
      >
        {/* Expanded 3 Action Pills (Pop up vertically) */}
        {isOpen && (
          <div className="flex flex-col items-end gap-2.5 mb-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* 1. Enroll Button */}
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 bg-[#0A3663] hover:bg-[#124C85] text-white pl-4 pr-3 py-2.5 rounded-full shadow-2xl border border-sky-400/40 font-bold text-xs transition-all active:scale-95 group"
            >
              <span>Enroll in Course</span>
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[#0098DA]">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
            </Link>

            {/* 2. WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white pl-4 pr-3 py-2.5 rounded-full shadow-2xl font-bold text-xs transition-all active:scale-95 group"
            >
              <span>Chat on WhatsApp</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <WhatsAppIcon className="w-4 h-4 text-white" />
              </div>
            </a>

            {/* 3. Call Button */}
            <a
              href={`tel:${ACADEMY_INFO.phone}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 bg-white hover:bg-slate-50 text-[#0A3663] pl-4 pr-3 py-2.5 rounded-full shadow-2xl border border-slate-200/90 font-bold text-xs transition-all active:scale-95 group"
            >
              <span>Call: {ACADEMY_INFO.phone}</span>
              <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-[#0098DA]">
                <Phone className="w-4 h-4 text-[#0098DA]" />
              </div>
            </a>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close contact actions' : 'Open contact actions'}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer ${
            isOpen
              ? 'bg-[#0A3663] text-white rotate-90 ring-4 ring-sky-200 shadow-sky-900/40'
              : 'bg-[#25D366] hover:bg-[#1EBE5D] text-white ring-4 ring-green-100 shadow-green-500/40 hover:scale-105'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <div className="relative flex items-center justify-center">
              <WhatsAppIcon className="w-7 h-7 text-white" />
              {/* Pulse ping ring to attract attention subtly */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
