import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#062343] text-slate-300 pt-8 sm:pt-10 pb-16 md:pb-6 border-t-4 border-[#0098DA]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl inline-block shadow-md">
              <Image
                src="/images/logo/rk-logo.png"
                alt="RK International Language Academy"
                width={300}
                height={60}
                style={{ width: 'auto', height: 'auto', maxHeight: '55px', maxWidth: '280px' }}
                className="object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              <strong>RK International Language Academy</strong> (The Way of Success) is Northern Sri Lanka&apos;s premier institute for IELTS Academic, General Training, PTE, and Spoken English preparation.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-sky-300 bg-[#0A3663] px-3 py-1.5 rounded-lg border border-sky-800">
              <ShieldCheck className="w-4 h-4 text-[#0098DA] shrink-0" />
              <span>British Council & IDP Exam Registration Guidance</span>
            </div>
          </div>

          {/* Col 2: Our Courses (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-sm sm:text-base font-bold mb-3 tracking-wide border-b border-sky-800 pb-2">
              Our Courses
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              <li>
                <Link href="/ielts-courses/academic" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                  <span>IELTS & UKVI (Academic & General)</span>
                </Link>
              </li>
              <li>
                <Link href="/ielts-courses/pte-academic" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                  <span>PTE Academic Coaching</span>
                </Link>
              </li>
              <li>
                <Link href="/ielts-courses/basic-diploma-english" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                  <span>Basic Diploma in English</span>
                </Link>
              </li>
              <li>
                <Link href="/ielts-courses/diploma-in-it" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                  <span>Diploma in IT & Software</span>
                </Link>
              </li>
              <li>
                <Link href="/ielts-courses/diploma-in-sinhala" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                  <span>Diploma in Sinhala Language</span>
                </Link>
              </li>
              <li>
                <Link href="/ielts-courses/french-delf" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                  <span>French DELF Exam (A1 & A2)</span>
                </Link>
              </li>
              <li>
                <Link href="/ielts-courses/dutch-deutsch" className="hover:text-[#0098DA] flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                  <span>Dutch & Deutsch (German) Prep</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kilinochchi Campus & Map (5 cols) */}
          <div className="lg:col-span-5">
            <h3 className="text-white text-sm sm:text-base font-bold mb-3 tracking-wide border-b border-sky-800 pb-2">
              Kilinochchi Campus & Map
            </h3>
            {/* 2-Column Side-by-Side Grid across all devices */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 items-start">
              {/* NAP Details (Left Column) */}
              <div className="space-y-2 text-[11px] sm:text-xs md:text-sm">
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0098DA] shrink-0 mt-0.5" />
                  <address className="not-italic text-slate-300 leading-snug">
                    <strong className="text-white">RK International Academy</strong><br />
                    A-9 Road, Near Theresamma Kovil,<br />
                    Kilinochchi, Sri Lanka
                  </address>
                </div>

                <div className="space-y-1 pt-0.5">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0098DA] shrink-0" />
                    <a href={`tel:${ACADEMY_INFO.phone}`} className="hover:text-white font-semibold">
                      {ACADEMY_INFO.phoneFormatted}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 pl-5 sm:pl-6">
                    <a
                      href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-semibold"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0098DA] shrink-0" />
                  <a href={`mailto:${ACADEMY_INFO.email}`} className="hover:text-white break-all text-[10px] sm:text-xs">
                    {ACADEMY_INFO.email}
                  </a>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0098DA] shrink-0" />
                  <span>Mon – Sat: 8:30 AM – 6 PM</span>
                </div>
              </div>

              {/* Google Maps Responsive Embed (Right Column, placed in the top right box) */}
              <div className="space-y-1.5 flex flex-col justify-start">
                <div className="rounded-xl overflow-hidden border border-sky-800 shadow-md h-32 sm:h-36 md:h-40 w-full relative bg-slate-900">
                  <iframe
                    title="RK International Language Academy Kilinochchi Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.528345758504!2d80.39868727589578!3d9.390509690686414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe96ad74170e77%3A0x6b8bc8ea40f6e165!2sTheresamma%20Church!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=Theresamma+Church+Kilinochchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-[#0098DA] hover:text-sky-300 font-semibold transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Compact Copyright & Privacy / Terms without giant gaps */}
        <div className="mt-5 pt-3.5 border-t border-sky-950/80 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] sm:text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © 2026 RK International Language Academy. Developed by <span className="text-slate-200 font-semibold">Codhex Technologies (Pvt) Ltd</span>.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-600">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
