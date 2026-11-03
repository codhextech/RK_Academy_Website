'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, GraduationCap } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function MobileStickyBar() {
  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`;

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 shadow-2xl flex items-center justify-between gap-2"
    >
      <a
        href={`tel:${ACADEMY_INFO.phone}`}
        className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-[#0A3663] py-2.5 rounded-lg text-xs font-bold transition-colors border border-slate-200"
      >
        <Phone className="w-3.5 h-3.5 text-[#0098DA]" />
        <span>Call</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2.5 rounded-lg text-xs font-bold transition-colors shadow-xs"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      <Link
        href="/register"
        className="flex-1 flex items-center justify-center gap-1.5 bg-[#0A3663] text-white py-2.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
      >
        <GraduationCap className="w-3.5 h-3.5 text-[#0098DA]" />
        <span>Enroll</span>
      </Link>
    </aside>
  );
}
