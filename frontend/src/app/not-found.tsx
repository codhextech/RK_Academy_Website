import React from 'react';
import Link from 'next/link';
import { Home, Phone, ArrowLeft } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <span className="text-4xl font-extrabold text-[#0098DA]">404</span>
        <h1 className="text-2xl font-bold text-[#0A3663]">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has moved. Browse our IELTS courses or connect directly with our admissions desk.
        </p>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <Home className="w-4 h-4 text-[#0098DA]" />
            <span>Go to Homepage</span>
          </Link>

          <a
            href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
