'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquareCheck,
  Users,
  BookOpen,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';

interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  enrolledCount: number;
  totalAdmins: number;
  maxAdminsLimit: number;
}

interface InquirySummary {
  id: string;
  fullName: string;
  phone: string;
  whatsapp?: string;
  coursePreference?: string;
  status: 'new' | 'contacted' | 'enrolled' | 'lost';
  createdAt: string;
}

interface CurrentUser {
  id: string;
  username: string;
  name: string;
  role: 'superadmin' | 'staff';
  permissions: {
    enquiries: boolean;
    courses: boolean;
    trainers?: boolean;
    blog: boolean;
    settings: boolean;
    testimonials: boolean;
  };
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0,
    newEnquiries: 0,
    enrolledCount: 0,
    totalAdmins: 0,
    maxAdminsLimit: 5,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<InquirySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [meRes, enqRes, usersRes] = await Promise.all([
          fetch('/api/admin/auth/me'),
          fetch('/api/admin/enquiries'),
          fetch('/api/admin/users'),
        ]);

        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData.success) setUser(meData.user);
        }

        let totalEnq = 0;
        let newEnq = 0;
        let enrolled = 0;

        if (enqRes.ok) {
          const enqData = await enqRes.json();
          if (enqData.success && enqData.enquiries) {
            totalEnq = enqData.enquiries.length;
            newEnq = enqData.enquiries.filter((e: InquirySummary) => e.status === 'new').length;
            enrolled = enqData.enquiries.filter((e: InquirySummary) => e.status === 'enrolled').length;
            setRecentEnquiries(enqData.enquiries.slice(0, 5));
          }
        }

        let adminCount = 2;
        let adminLimit = 5;

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          if (usersData.success) {
            adminCount = usersData.totalAdmins;
            adminLimit = usersData.maxAdminsLimit;
          }
        }

        setStats({
          totalEnquiries: totalEnq,
          newEnquiries: newEnq,
          enrolledCount: enrolled,
          totalAdmins: adminCount,
          maxAdminsLimit: adminLimit,
        });
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const getStatusBadge = (status: InquirySummary['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">New Lead</span>;
      case 'contacted':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-[#0098DA] border border-sky-200">Contacted</span>;
      case 'enrolled':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Enrolled</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Archived</span>;
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-3">
        <div className="w-8 h-8 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium">Fetching academy statistics...</p>
      </div>
    );
  }

  const isSuperAdmin = user?.role === 'superadmin';

  return (
    <div className="space-y-6">
      {/* WELCOME BANNER - Logo Navy Accent Card */}
      <div className="bg-gradient-to-r from-[#062343] to-[#0A3663] p-6 sm:p-8 rounded-3xl text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#0098DA]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">RK International Language Academy</span>
              <span className="text-sky-400">•</span>
              <span className="text-xs text-sky-100">Kilinochchi Campus</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome, {user?.name || user?.username}!
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl leading-relaxed">
              {isSuperAdmin
                ? 'You have complete Super Admin privileges to manage admissions, courses, site settings, and configure staff access & limits.'
                : 'You are signed in with Staff Admin credentials. You can view leads and update authorized sections.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isSuperAdmin && (
              <Link
                href="/admin/admins"
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Manage Staff & Limits</span>
              </Link>
            )}
            <Link
              href="/admin/enquiries"
              className="px-4 py-2.5 bg-[#0098DA] hover:bg-sky-400 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquareCheck className="w-4 h-4" />
              <span>Review Inquiries</span>
            </Link>
          </div>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS - Crisp White */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inquiries</span>
            <div className="p-2.5 bg-sky-50 text-[#0098DA] rounded-xl border border-sky-100">
              <MessageSquareCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#062343]">{stats.totalEnquiries}</span>
            <span className="text-xs text-slate-400">received</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">From website registration & contact forms</p>
        </div>

        {/* Card 2: New Leads */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">New Unread Leads</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">{stats.newEnquiries}</span>
            <span className="text-xs text-amber-700/80">pending follow-up</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Need counselor phone / WhatsApp response</p>
        </div>

        {/* Card 3: Enrolled */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Enrolled Students</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{stats.enrolledCount}</span>
            <span className="text-xs text-emerald-700/80">confirmed</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Successfully converted into batches</p>
        </div>

        {/* Card 4: Admin Quantity */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admin Quantity</span>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#062343]">{stats.totalAdmins}</span>
            <span className="text-xs text-slate-400">/ max {stats.maxAdminsLimit} slots</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-purple-600 h-1.5 rounded-full"
              style={{ width: `${Math.min(100, (stats.totalAdmins / stats.maxAdminsLimit) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* TWO COLUMNS: RECENT INQUIRIES & PERMISSIONS STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Inquiries (2 cols) - Pure White Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#062343] flex items-center gap-2">
                <MessageSquareCheck className="w-5 h-5 text-[#0098DA]" />
                <span>Recent Inquiries & Registrations</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time student leads received from the website</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-[#0098DA] hover:text-[#0082ba] flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              No inquiries received yet. They will appear here immediately when students submit forms.
            </div>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-sky-50/40 hover:border-sky-200 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-[#062343] font-bold">{enq.fullName}</strong>
                      {getStatusBadge(enq.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1 text-[#0098DA] font-semibold">
                        <BookOpen className="w-3.5 h-3.5" />
                        {enq.coursePreference || 'General IELTS Inquiry'}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-slate-500">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {enq.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {enq.whatsapp && (
                      <a
                        href={`https://wa.me/${enq.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Chat</span>
                      </a>
                    )}
                    <Link
                      href="/admin/enquiries"
                      className="px-2.5 py-1 text-xs font-semibold text-[#0098DA] bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: User Access & Quick Actions (1 col) */}
        <div className="space-y-6">
          {/* Your Access Permissions Card - Pure White */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#062343] flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Your Edit Access Profile</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Role Privilege:</span>
                <span className="font-bold text-[#0098DA] uppercase text-[11px]">{user?.role}</span>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold block mb-2">
                  Assigned Module Permissions:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-700">Manage Inquiries & Leads</span>
                    {user?.role === 'superadmin' || user?.permissions?.enquiries ? (
                      <span className="text-emerald-600 font-bold text-[11px]">✓ Full Access</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">✗ Locked</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-700">Manage Courses & Batches</span>
                    {user?.role === 'superadmin' || user?.permissions?.courses ? (
                      <span className="text-emerald-600 font-bold text-[11px]">✓ Full Access</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">✗ Locked</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-700">Manage Faculty & Trainers</span>
                    {user?.role === 'superadmin' || user?.permissions?.trainers || user?.permissions?.courses ? (
                      <span className="text-emerald-600 font-bold text-[11px]">✓ Full Access</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">✗ Locked</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-700">Manage Blog Articles</span>
                    {user?.role === 'superadmin' || user?.permissions?.blog ? (
                      <span className="text-emerald-600 font-bold text-[11px]">✓ Full Access</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">✗ Locked</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-700">Academy Site Settings</span>
                    {user?.role === 'superadmin' || user?.permissions?.settings ? (
                      <span className="text-emerald-600 font-bold text-[11px]">✓ Full Access</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">✗ Locked</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-700">Admin Accounts & Limits</span>
                    {user?.role === 'superadmin' ? (
                      <span className="text-amber-700 font-bold text-[11px]">★ Super Admin Only</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">✗ Restricted</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Support / Academy Hotlines */}
          <div className="bg-sky-50/70 rounded-2xl border border-sky-100 p-5 text-xs text-slate-700 space-y-2">
            <h4 className="font-bold text-[#062343] text-sm">Academy Hotline Support</h4>
            <div className="space-y-1 text-slate-600">
              <p>Hotline 1: <strong className="text-[#062343]">074 0224 355</strong></p>
              <p>Hotline 2: <strong className="text-[#062343]">076 744 5019</strong></p>
            </div>
            <p className="text-slate-600">
              Campus: A-9 Road, Near Theresamma Kovil, Kilinochchi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
