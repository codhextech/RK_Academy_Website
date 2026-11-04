'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    courseSlug: 'ielts-ukvi',
    preferredMode: 'offline',
    city: 'Kilinochchi',
    targetBand: '7.5',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit registration data
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => null);

      // Redirect to thank you page
      router.push('/thank-you');
    } catch {
      router.push('/thank-you');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#0A3663] text-white p-6 sm:p-10 text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Course Registration
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Complete this form to reserve your seat in the upcoming IELTS or English batch at RK International Language Academy.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#0A3663] border-b border-slate-100 pb-2">
                1. Personal Details
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (As on Passport / NIC) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John David"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 074 0224 355"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number (For Batch Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 074 0224 355"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. student@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Town of Residence *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kilinochchi / Jaffna"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-base font-bold text-[#0A3663] border-b border-slate-100 pb-2">
                2. Course & Batch Preference
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Program *
                </label>
                <select
                  value={formData.courseSlug}
                  onChange={(e) => setFormData({ ...formData, courseSlug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                >
                  <option value="ielts-ukvi">IELTS & UKVI (Academic, General & Life Skills - 8 Weeks)</option>
                  <option value="pte-academic">PTE Academic Coaching (Fast AI Scoring - 6-8 Weeks)</option>
                  <option value="basic-diploma-english">Basic Diploma in English (Comprehensive - 12-16 Weeks)</option>
                  <option value="diploma-in-it">Diploma in Information Technology - IT (16 Weeks)</option>
                  <option value="diploma-in-sinhala">Diploma in Sinhala Language (12 Weeks)</option>
                  <option value="french-delf">French DELF Exam Prep - A1 & A2 (10-12 Weeks)</option>
                  <option value="dutch-deutsch">Dutch & Deutsch (German) Language Prep (44 Hours)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Mode of Attendance *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-sky-50">
                    <input
                      type="radio"
                      name="preferredMode"
                      value="offline"
                      checked={formData.preferredMode === 'offline'}
                      onChange={() => setFormData({ ...formData, preferredMode: 'offline' })}
                      className="text-[#0098DA]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#0A3663]">In-Person Campus</p>
                      <p className="text-[11px] text-slate-500">A-9 Road, Kilinochchi</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-sky-50">
                    <input
                      type="radio"
                      name="preferredMode"
                      value="online"
                      checked={formData.preferredMode === 'online'}
                      onChange={() => setFormData({ ...formData, preferredMode: 'online' })}
                      className="text-[#0098DA]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#0A3663]">Live Online Class</p>
                      <p className="text-[11px] text-slate-500">Interactive Zoom Video</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Any Specific Requirements / Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for weekend morning batch..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl font-bold text-base bg-[#0A3663] hover:bg-[#124C85] text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-950/20 disabled:opacity-50"
            >
              <GraduationCap className="w-5 h-5 text-[#0098DA]" />
              <span>{loading ? 'Submitting Registration...' : 'Complete Registration'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
