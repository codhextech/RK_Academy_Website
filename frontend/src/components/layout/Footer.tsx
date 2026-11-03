import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#062343] text-slate-300 pt-16 pb-24 md:pb-12 border-t-4 border-[#0098DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-xl inline-block">
              <Image
                src="/images/logo/rk-logo.png"
                alt="RK International Language Academy"
                width={240}
                height={48}
                style={{ width: 'auto', height: 'auto', maxHeight: '48px', maxWidth: '240px' }}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>RK International Language Academy</strong> (The Way of Success) is Northern Sri Lanka&apos;s premier institute for IELTS Academic, General Training, and Spoken English preparation.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-300 bg-[#0A3663] px-3 py-2 rounded-lg border border-sky-800">
              <ShieldCheck className="w-4 h-4 text-[#0098DA]" />
              <span>British Council & IDP Exam Registration Guidance</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 tracking-wide border-b border-sky-800 pb-2">
              Our Courses
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ielts-courses/academic" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>IELTS Academic (Study Abroad)</span>
                </Link>
              </li>
              <li>
                <Link href="/ielts-courses/general-training" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>IELTS General Training (Migration/PR)</span>
                </Link>
              </li>
              <li>
                <Link href="/ielts-courses/preparation" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>Foundation English Preparation</span>
                </Link>
              </li>
              <li>
                <Link href="/ielts-courses/preparation#spoken-english" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>Diploma in English & Spoken English</span>
                </Link>
              </li>
              <li>
                <Link href="/online-ielts-classes" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>Live Online IELTS Classes</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 tracking-wide border-b border-sky-800 pb-2">
              Academy
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>About Our Academy</span>
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>Certified Trainers</span>
                </Link>
              </li>
              <li>
                <Link href="/student-success" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>Student Band Score Results</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>Location & Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>Student Registration</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Exact NAP (Name, Address, Phone) for Local SEO */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 tracking-wide border-b border-sky-800 pb-2">
              Kilinochchi Campus (NAP)
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0098DA] shrink-0 mt-1" />
                <address className="not-italic text-slate-300">
                  <strong>RK International Language Academy</strong><br />
                  A-9 Road, Near Theresamma Kovil,<br />
                  Kilinochchi, Northern Province, Sri Lanka
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0098DA] shrink-0" />
                <a href={`tel:${ACADEMY_INFO.phone}`} className="hover:text-white font-semibold">
                  {ACADEMY_INFO.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0098DA] shrink-0" />
                <a href={`mailto:${ACADEMY_INFO.email}`} className="hover:text-white">
                  {ACADEMY_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-[#0098DA] shrink-0" />
                <span>Mon – Sat: 8:30 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-sky-950 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} RK International Language Academy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white">Terms of Enrollment</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
