'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Clock,
  Megaphone,
  Save,
  Check,
  AlertCircle,
  Smartphone,
  Image as ImageIcon,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { R2_MEDIA } from '@/lib/constants';

interface AcademySettings {
  maxAdmins: number;
  academyName: string;
  tagline: string;
  phone: string;
  phone1: string; // Mobile 1 / Hotline 1
  phone2: string; // Mobile 2 / Hotline 2
  whatsapp: string;
  email: string;
  address: string;
  officeHours: string;
  announcement: string;
  logoUrl?: string;
  watermarkUrl?: string;
  heroClassroomUrl?: string;
  campusImageUrl?: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AcademySettings>({
    maxAdmins: 5,
    academyName: 'RK International Language Academy',
    tagline: 'The Way of Success - IELTS & English Academy',
    phone: '074 0224 355 / 076 744 5019',
    phone1: '074 0224 355',
    phone2: '076 744 5019',
    whatsapp: '94740224355',
    email: 'rkacademykili@gmail.com',
    address: 'A-9 Road, Near Theresamma Kovil, Kilinochchi',
    officeHours: 'Monday – Saturday: 8:30 AM – 6:00 PM',
    announcement: 'Admissions open for next weekend & weekday IELTS batches! Register online for special fee discount.',
    logoUrl: R2_MEDIA.brand.logo,
    watermarkUrl: R2_MEDIA.brand.watermark,
    heroClassroomUrl: R2_MEDIA.brand.heroClassroom,
    campusImageUrl: R2_MEDIA.brand.campusWorkshop,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (res.ok && data.success && data.settings) {
          setSettings({
            ...data.settings,
            phone1: data.settings.phone1 || '074 0224 355',
            phone2: data.settings.phone2 || '076 744 5019',
            logoUrl: data.settings.logoUrl || R2_MEDIA.brand.logo,
            watermarkUrl: data.settings.watermarkUrl || R2_MEDIA.brand.watermark,
            heroClassroomUrl: data.settings.heroClassroomUrl || R2_MEDIA.brand.heroClassroom,
            campusImageUrl: data.settings.campusImageUrl || R2_MEDIA.brand.campusWorkshop,
          });
        } else {
          setError(data.error || 'Failed to load settings.');
        }
      } catch (err) {
        console.error(err);
        setError('Error loading settings.');
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    const payload = {
      ...settings,
      phone: `${settings.phone1} / ${settings.phone2}`,
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to update settings.');
        return;
      }

      setSuccessMsg('Academy settings, media URLs, and contact numbers updated successfully.');
    } catch (err) {
      console.error(err);
      setError('Network connection error.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-8 h-8 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-xs">Loading academy settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#062343] tracking-tight flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-[#0098DA]" />
            <span>Academy Site & Contact Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update official hotline numbers (Mobile 1 &amp; Mobile 2), WhatsApp link, campus address, R2 brand images, and announcements displayed across the website.
          </p>
        </div>
      </div>

      {/* FEEDBACK ALERTS */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5">
          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* SETTINGS FORM */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* SECTION 1: IDENTITY */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#062343] border-b border-slate-100 pb-2">
            Academy Identity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Academy Name
              </label>
              <input
                type="text"
                required
                value={settings.academyName}
                onChange={(e) => setSettings({ ...settings, academyName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Motto / Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: 2 MOBILE / HOTLINE NUMBERS & COMMUNICATION */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#062343] border-b border-slate-100 pb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#0098DA]" />
            <span>2 Official Mobile Numbers &amp; Communication Lines</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mobile 1 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0098DA]" />
                <span>Hotline 1 / Mobile 1</span>
              </label>
              <input
                type="text"
                required
                value={settings.phone1}
                onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                placeholder="074 0224 355"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Primary campus hotline</span>
            </div>

            {/* Mobile 2 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0098DA]" />
                <span>Hotline 2 / Mobile 2</span>
              </label>
              <input
                type="text"
                required
                value={settings.phone2}
                onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                placeholder="076 744 5019"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Secondary admissions counselor mobile</span>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Number (with country code 94...)</span>
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="94740224355"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none font-mono font-bold"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0098DA]" />
                <span>Official Email Address</span>
              </label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="rkacademykili@gmail.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
              />
            </div>

            {/* Office Hours */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0098DA]" />
                <span>Office Hours</span>
              </label>
              <input
                type="text"
                value={settings.officeHours}
                onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
                placeholder="Monday – Saturday: 8:30 AM – 6:00 PM"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
              />
            </div>

            {/* Campus Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0098DA]" />
                <span>Campus Physical Address</span>
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="A-9 Road, Near Theresamma Kovil, Kilinochchi"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: TOP ANNOUNCEMENT BANNER */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#062343] border-b border-slate-100 pb-2 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-amber-500" />
            <span>Top Announcement Banner</span>
          </h2>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Banner Message (Shown to all visitors at top of site)
            </label>
            <textarea
              rows={2}
              value={settings.announcement}
              onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
            />
          </div>
        </div>

        {/* SECTION 4: BRAND & CAMPUS MEDIA ASSETS (R2 + MONGODB) */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#062343] border-b border-slate-100 pb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#0098DA]" />
            <span>Brand &amp; Campus Images (Cloudflare R2 &amp; MongoDB)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ImageUploadField
              label="Academy Primary Logo"
              value={settings.logoUrl || R2_MEDIA.brand.logo}
              onChange={(url) => setSettings({ ...settings, logoUrl: url || R2_MEDIA.brand.logo })}
              helperText="Official RK Academy logo stored on Cloudflare R2."
            />
            <ImageUploadField
              label="Hero Background Watermark"
              value={settings.watermarkUrl || R2_MEDIA.brand.watermark}
              onChange={(url) => setSettings({ ...settings, watermarkUrl: url || R2_MEDIA.brand.watermark })}
              helperText="Subtle watermark emblem displayed behind the homepage headline."
            />
            <ImageUploadField
              label="Homepage Hero Classroom Image"
              value={settings.heroClassroomUrl || R2_MEDIA.brand.heroClassroom}
              onChange={(url) => setSettings({ ...settings, heroClassroomUrl: url || R2_MEDIA.brand.heroClassroom })}
              helperText="Featured classroom visual on the homepage hero card."
            />
            <ImageUploadField
              label="About Page Campus Photo"
              value={settings.campusImageUrl || R2_MEDIA.brand.campusWorkshop}
              onChange={(url) => setSettings({ ...settings, campusImageUrl: url || R2_MEDIA.brand.campusWorkshop })}
              helperText="Campus workshop photo displayed on the About Us page."
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#0098DA] hover:bg-[#0082ba] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving changes...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
