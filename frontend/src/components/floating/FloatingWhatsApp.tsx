'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-center group"
    >
      <span className="hidden group-hover:inline-block bg-[#0A3663] text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg mr-2 transition-all duration-200">
        Chat with Admissions
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with RK Academy on WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 animate-pulse-subtle"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </aside>
  );
}
