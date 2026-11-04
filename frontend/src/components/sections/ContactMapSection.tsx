'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO } from '@/lib/constants';

export default function ContactMapSection() {
  return (
    <section className="py-8 md:py-14 bg-white border-t border-slate-100" id="contact">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        {/* 4 Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Address Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-[#0098DA] shadow-xs hover:shadow-md transition-all flex flex-col h-full">
            <div className="flex-1 flex items-start gap-3.5 mb-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-[#0098DA] border border-sky-100 shadow-2xs shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A3663] text-sm mb-1">Academy Address</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A-9 Road, Near Theresamma Kovil,<br />
                  Kilinochchi, Sri Lanka
                </p>
              </div>
            </div>
            <div className="mt-auto pt-3 border-t border-slate-100">
              <a
                href="https://maps.google.com/?q=Theresamma+Church+Kilinochchi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#0098DA] hover:underline font-bold"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-[#0098DA] shadow-xs hover:shadow-md transition-all flex flex-col h-full">
            <div className="flex-1 flex items-start gap-3.5 mb-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-[#0098DA] border border-sky-100 shadow-2xs shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A3663] text-sm mb-1">Call / WhatsApp</h3>
                <a
                  href={`tel:${ACADEMY_INFO.phone}`}
                  className="text-xs text-slate-800 font-bold hover:text-[#0098DA] block mb-1"
                >
                  Hotline: {ACADEMY_INFO.phoneFormatted}
                </a>
                <a
                  href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#25D366] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="mt-auto pt-3 border-t border-slate-100">
              <a
                href={`tel:${ACADEMY_INFO.phone}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#0098DA] hover:underline font-bold"
              >
                <span>Call Admissions Desk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-[#0098DA] shadow-xs hover:shadow-md transition-all flex flex-col h-full">
            <div className="flex-1 flex items-start gap-3.5 mb-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-[#0098DA] border border-sky-100 shadow-2xs shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A3663] text-sm mb-1">Official Email</h3>
                <a
                  href={`mailto:${ACADEMY_INFO.email}`}
                  className="text-xs text-slate-600 hover:text-[#0098DA] break-all leading-relaxed"
                >
                  {ACADEMY_INFO.email}
                </a>
              </div>
            </div>
            <div className="mt-auto pt-3 border-t border-slate-100">
              <a
                href={`mailto:${ACADEMY_INFO.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#0098DA] hover:underline font-bold"
              >
                <span>Send Email</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Opening Hours Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-[#0098DA] shadow-xs hover:shadow-md transition-all flex flex-col h-full">
            <div className="flex-1 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-sky-50 text-[#0098DA] border border-sky-100 shadow-2xs shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A3663] text-sm mb-1">Opening Hours</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Monday – Saturday:<br />
                  8:30 AM – 6:00 PM<br />
                  <span className="text-slate-400">Sunday: Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Google Map */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-80 sm:h-96 w-full relative bg-slate-100">
          <iframe
            title="RK International Language Academy Location Kilinochchi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.528345758504!2d80.39868727589578!3d9.390509690686414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe96ad74170e77%3A0x6b8bc8ea40f6e165!2sTheresamma%20Church!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
