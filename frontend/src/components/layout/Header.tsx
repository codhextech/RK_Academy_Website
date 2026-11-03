'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, MapPin, Mail, Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import { ACADEMY_INFO, NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      {/* 1. TOP URGENT ANNOUNCEMENT & CONTACT BAR */}
      <div className="bg-[#0A3663] text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-sky-200">
              <MapPin className="w-3.5 h-3.5 text-[#0098DA]" />
              <span>A-9 Road, Near Theresamma Kovil, Kilinochchi</span>
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <a
              href={`mailto:${ACADEMY_INFO.email}`}
              className="hidden md:flex items-center gap-1.5 hover:text-sky-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#0098DA]" />
              <span>{ACADEMY_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${ACADEMY_INFO.phone}`}
              className="flex items-center gap-1.5 font-semibold text-white hover:text-sky-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#0098DA]" />
              <span>Hotline: {ACADEMY_INFO.phone}</span>
            </a>
            <span className="text-slate-400">|</span>
            <a
              href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all shadow-xs"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Official Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="py-2">
              <Image
                src="/images/logo/rk-logo.png"
                alt="RK International Language Academy Logo"
                width={260}
                height={52}
                priority
                style={{ width: 'auto', height: 'auto', maxHeight: '52px', maxWidth: '260px' }}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setCoursesDropdownOpen(true)}
                    onMouseLeave={() => setCoursesDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 text-slate-700 hover:text-[#0098DA] font-semibold text-sm transition-colors py-2"
                      onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>

                    {coursesDropdownOpen && (
                      <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block p-2.5 rounded-lg hover:bg-sky-50 group transition-colors"
                            onClick={() => setCoursesDropdownOpen(false)}
                          >
                            <p className="font-semibold text-sm text-[#0A3663] group-hover:text-[#0098DA]">
                              {item.label}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 hover:text-[#0098DA] font-semibold text-sm transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all hover:shadow-lg active:scale-95"
            >
              <GraduationCap className="w-4 h-4 text-[#0098DA]" />
              <span>Enroll Now</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/register"
              className="bg-[#0A3663] text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              Enroll
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-md text-slate-700 hover:text-[#0A3663] hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-DOWN DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.label} className="border-b border-slate-100 py-2">
                    <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                      {link.label}
                    </p>
                    <div className="pl-2 space-y-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-sm font-medium text-[#0A3663] hover:text-[#0098DA]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-semibold text-slate-700 hover:text-[#0098DA] border-b border-slate-100"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#0A3663] text-white py-3 rounded-lg font-bold shadow-md"
            >
              Enroll in a Course
            </Link>
            <a
              href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#25D366] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
