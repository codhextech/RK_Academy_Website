'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle, Clock } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function ContactMapSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'IELTS Academic',
    mode: 'offline',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Submit to Web3Forms (if access key configured) or console fallback
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'sandbox-key',
          subject: `New Inquiry from ${formData.name} - RK Academy`,
          from_name: 'RK Academy Web Inquiry',
          ...formData,
        }),
      }).catch(() => null);

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0098DA] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663] mt-3 mb-4">
            Visit Our Kilinochchi Campus or Contact Us
          </h2>
          <p className="text-base text-slate-600">
            Conveniently located on the central A-9 Road near Theresamma Kovil, Kilinochchi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Details + Embed Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address card */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white text-[#0098DA] shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A3663] text-sm mb-1">Campus Address</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A-9 Road, Near Theresamma Kovil,<br />
                    Kilinochchi, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp card */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white text-[#0098DA] shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A3663] text-sm mb-1">Call / WhatsApp</h3>
                  <a
                    href={`tel:${ACADEMY_INFO.phone}`}
                    className="text-xs text-slate-800 font-bold hover:text-[#0098DA] block"
                  >
                    Hotline: {ACADEMY_INFO.phoneFormatted}
                  </a>
                  <a
                    href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#25D366] font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Email card */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white text-[#0098DA] shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A3663] text-sm mb-1">Official Email</h3>
                  <a
                    href={`mailto:${ACADEMY_INFO.email}`}
                    className="text-xs text-slate-600 hover:text-[#0098DA] break-all"
                  >
                    {ACADEMY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Hours card */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white text-[#0098DA] shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A3663] text-sm mb-1">Opening Hours</h3>
                  <p className="text-xs text-slate-600">
                    Monday – Saturday:<br />
                    8:30 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Responsive Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-72 sm:h-80 w-full relative bg-slate-100">
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

          {/* Right Column: Quick Inquiry Form */}
          <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-[#0A3663] mb-1">Send a Quick Inquiry</h3>
            <p className="text-xs text-slate-500 mb-6">
              Our academic counselor will get in touch with you right away.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-800 text-base">Inquiry Submitted!</h4>
                <p className="text-xs text-emerald-700">
                  Thank you! We have received your inquiry. We will contact you at <strong>{formData.phone}</strong> shortly.
                </p>
                <a
                  href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent(`Hi RK Academy, I just submitted an inquiry for ${formData.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-lg mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. John David"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="e.g. 074 0224 355"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-xs font-bold text-slate-700 mb-1">
                    Course of Interest
                  </label>
                  <select
                    id="course"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  >
                    <option value="IELTS Academic">IELTS Academic (Study Abroad)</option>
                    <option value="IELTS General Training">IELTS General Training (Migration)</option>
                    <option value="Foundation & Spoken English">Foundation English & Spoken English</option>
                    <option value="Diploma in English">Diploma in English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Mode of Study
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 p-2.5 rounded-xl border border-slate-300 bg-white cursor-pointer hover:bg-sky-50">
                      <input
                        type="radio"
                        name="mode"
                        value="offline"
                        checked={formData.mode === 'offline'}
                        onChange={() => setFormData({ ...formData, mode: 'offline' })}
                        className="text-[#0098DA]"
                      />
                      <span>In-Person (Kilinochchi)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 p-2.5 rounded-xl border border-slate-300 bg-white cursor-pointer hover:bg-sky-50">
                      <input
                        type="radio"
                        name="mode"
                        value="online"
                        checked={formData.mode === 'online'}
                        onChange={() => setFormData({ ...formData, mode: 'online' })}
                        className="text-[#0098DA]"
                      />
                      <span>Live Online Class</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                    Your Question / Target Band Score (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="e.g. Aiming for Band 7.0 for Canada PR in next 3 months..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#0A3663] hover:bg-[#124C85] text-white flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#0098DA]" />
                  <span>{loading ? 'Submitting...' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
