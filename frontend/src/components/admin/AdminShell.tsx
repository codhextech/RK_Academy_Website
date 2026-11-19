'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { R2_MEDIA } from '@/lib/constants';
import {
  LayoutDashboard,
  Users,
  MessageSquareCheck,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  ShieldAlert,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
  Image as ImageIcon,
  Trophy,
} from 'lucide-react';

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

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, render children directly without admin shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function fetchMe() {
      try {
        const res = await fetch('/api/admin/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            router.push('/admin/login');
          }
        } else {
          router.push('/admin/login');
        }
      } catch (err) {
        console.error('Failed to fetch user session:', err);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-600">
          <div className="w-10 h-10 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium tracking-wide">Loading RK Academy Admin...</p>
        </div>
      </div>
    );
  }

  // Navigation Items with RBAC / Permissions filtering
  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      allowed: true,
    },
    {
      name: 'Admins & Staff',
      href: '/admin/admins',
      icon: Users,
      badge: user?.role === 'superadmin' ? 'Super Admin' : undefined,
      allowed: user?.role === 'superadmin',
    },
    {
      name: 'Inquiries & Leads',
      href: '/admin/enquiries',
      icon: MessageSquareCheck,
      allowed: user?.role === 'superadmin' || user?.permissions?.enquiries,
    },
    {
      name: 'Courses & Batches',
      href: '/admin/courses',
      icon: BookOpen,
      allowed: user?.role === 'superadmin' || user?.permissions?.courses,
    },
    {
      name: 'Faculty & Trainers',
      href: '/admin/trainers',
      icon: GraduationCap,
      allowed: user?.role === 'superadmin' || user?.permissions?.trainers || user?.permissions?.courses,
    },
    {
      name: 'Success & Events',
      href: '/admin/success',
      icon: Trophy,
      allowed: user?.role === 'superadmin' || user?.permissions?.testimonials || user?.permissions?.courses || true,
    },
    {
      name: 'Blog Articles',
      href: '/admin/blog',
      icon: FileText,
      allowed: user?.role === 'superadmin' || user?.permissions?.blog,
    },
    {
      name: 'Media & Images',
      href: '/admin/media',
      icon: ImageIcon,
      allowed: true,
    },
    {
      name: 'Academy Settings',
      href: '/admin/settings',
      icon: Settings,
      allowed: user?.role === 'superadmin' || user?.permissions?.settings,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row font-sans">
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Image
            src={R2_MEDIA.brand.logo}
            alt="RK Academy"
            width={100}
            height={75}
            className="h-9 w-auto object-contain"
          />
          <span className="text-[11px] font-bold text-[#0098DA] tracking-wider uppercase bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
            Portal
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-100 border border-slate-200"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR (Desktop + Mobile slideout) - Light White Theme with Logo Colors */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-72 bg-white border-r border-slate-200/90 shadow-sm flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header with RK Logo */}
          <div className="p-5 border-b border-slate-100 bg-white">
            <Link href="/" target="_blank" className="block group">
              <Image
                src={R2_MEDIA.brand.logo}
                alt="RK International Language Academy"
                width={160}
                height={120}
                className="h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#062343] tracking-wider uppercase">
                Admin Control Panel
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
            </div>
          </div>

          {/* User Profile Card - Soft Sky Tint */}
          <div className="p-3.5 mx-3.5 my-3 bg-gradient-to-br from-sky-50/80 to-slate-50 rounded-xl border border-sky-100/90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0098DA] to-[#062343] flex items-center justify-center font-bold text-white shadow-xs">
                {user?.name?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#062343] truncate">{user?.name || user?.username}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {user?.role === 'superadmin' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 rounded-md">
                      <Shield className="w-3 h-3 text-amber-600" />
                      Super Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-sky-100 text-[#0098DA] border border-sky-200 rounded-md">
                      <ShieldAlert className="w-3 h-3 text-[#0098DA]" />
                      Staff Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-sky-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>User ID:</span>
              <strong className="text-[#062343] font-mono">@{user?.username}</strong>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-2 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Management Menu
            </div>
            {navItems
              .filter((item) => item.allowed)
              .map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#0098DA] text-white shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-[#062343] hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0098DA]'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded border border-amber-200 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-3.5 border-t border-slate-100 bg-slate-50/70 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-3 py-2 text-xs text-slate-600 hover:text-[#0098DA] bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#0098DA]" />
                <span>View Public Website</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>{loggingOut ? 'Logging out...' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP BAR - Clean White with Subtle Border */}
        <header className="hidden md:flex h-16 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-8 items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">RK Academy Portal</span>
            <span>/</span>
            <span className="text-[#0098DA] font-bold capitalize">
              {pathname.replace('/admin/', '').replace('/', ' ') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Signed in: <strong className="text-[#062343]">@{user?.username}</strong></span>
              <span className="text-slate-300">|</span>
              <span className="text-[#0098DA] font-bold uppercase text-[10px]">
                {user?.role === 'superadmin' ? 'Super Admin' : 'Staff'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              title="Sign Out"
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8 2xl:p-10 max-w-[1780px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
