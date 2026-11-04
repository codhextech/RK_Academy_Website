'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO, NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ignore iOS/browser bounce overscroll
      if (currentScrollY < 0) return;

      setIsScrolled(currentScrollY > 20);

      // Always show at the top of the page
      if (currentScrollY <= 80) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Ignore micro-jitters (less than 8px movement)
      if (Math.abs(currentScrollY - lastScrollY.current) < 8) {
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
        setCoursesDropdownOpen(false);
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 bg-white transition-all duration-300 ease-in-out border-b ${
        isScrolled ? 'border-slate-300 shadow-md' : 'border-slate-200 shadow-xs'
      } ${isVisible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* 1. TOP URGENT ANNOUNCEMENT & CONTACT BAR */}
      <div className="bg-[#0A3663] text-white text-xs md:text-sm py-1.5 sm:py-2 px-3 sm:px-4 overflow-hidden select-none">
        {/* Desktop / Laptop: Centered Static Bar (Hidden on Mobile) */}
        <div className="hidden sm:flex max-w-screen-2xl mx-auto items-center justify-center flex-wrap gap-x-4 sm:gap-x-6 gap-y-1.5 text-center">
          {/* Campus location */}
          <span className="flex items-center gap-1.5 text-sky-200">
            <MapPin className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
            <span>A-9 Road, Near Theresamma Kovil, Kilinochchi</span>
          </span>

          <span className="text-sky-300/40">•</span>

          {/* Email */}
          <a
            href={`mailto:${ACADEMY_INFO.email}`}
            className="flex items-center gap-1.5 hover:text-sky-200 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
            <span>{ACADEMY_INFO.email}</span>
          </a>

          <span className="text-sky-300/40">•</span>

          {/* Hotline */}
          <a
            href={`tel:${ACADEMY_INFO.phone}`}
            className="flex items-center gap-1.5 font-semibold text-white hover:text-sky-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
            <span>Hotline: {ACADEMY_INFO.phone}</span>
          </a>

          <span className="text-sky-300/40">•</span>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all shadow-xs"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Only: Single Line Slow-Moving Marquee Animation (No 2nd Line) */}
        <div className="sm:hidden relative w-full overflow-hidden">
          <div className="animate-marquee-header flex items-center whitespace-nowrap">
            {[1, 2].map((set) => (
              <div key={set} className="flex items-center shrink-0">
                <span className="flex items-center gap-1 text-sky-200 mx-3 shrink-0">
                  <MapPin className="w-3 h-3 text-[#0098DA] shrink-0" />
                  <span>A-9 Road, Near Theresamma Kovil, Kilinochchi</span>
                </span>
                <span className="text-sky-300/40 shrink-0">•</span>
                <a
                  href={`tel:${ACADEMY_INFO.phone}`}
                  className="flex items-center gap-1 font-semibold text-white hover:text-sky-300 transition-colors mx-3 shrink-0"
                >
                  <Phone className="w-3 h-3 text-[#0098DA] shrink-0" />
                  <span>Hotline: {ACADEMY_INFO.phone}</span>
                </a>
                <span className="text-sky-300/40 shrink-0">•</span>
                <a
                  href={`https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${ACADEMY_INFO.whatsappPreFilledMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all shadow-xs mx-3 shrink-0"
                >
                  <WhatsAppIcon className="w-3 h-3 text-white shrink-0" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-sky-300/40 shrink-0 mx-1">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-18 sm:h-20 md:h-24 gap-3 sm:gap-4">
          {/* Official Logo (Bigger, bolder responsive sizing) */}
          <Link href="/" className="flex items-center group min-w-0">
            <div className="py-1">
              <Image
                src="/images/logo/rk-logo.png"
                alt="RK International Language Academy Logo"
                width={360}
                height={72}
                priority
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[210px] xs:max-w-[250px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px] object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
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
                    className="relative group/navitem"
                    onMouseEnter={() => setCoursesDropdownOpen(true)}
                    onMouseLeave={() => setCoursesDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setCoursesDropdownOpen(false)}
                      className="flex items-center gap-1 text-slate-700 hover:text-[#0098DA] font-semibold text-sm transition-colors py-2"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 group-hover/navitem:text-[#0098DA] transition-transform duration-200 ${
                          coursesDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </Link>

                    {coursesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {/* Explore All Courses Banner */}
                        <Link
                          href={link.href}
                          className="flex items-center justify-between p-2.5 mb-1.5 rounded-xl bg-sky-50 text-[#0A3663] hover:bg-sky-100 font-bold text-xs transition-colors border border-sky-100"
                          onClick={() => setCoursesDropdownOpen(false)}
                        >
                          <span>Explore All 7 Courses &amp; Diplomas</span>
                          <span className="text-[#0098DA]">→</span>
                        </Link>
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block p-2.5 rounded-lg hover:bg-sky-50/70 group transition-colors"
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

          {/* Mobile Action & Hamburger Button */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/register"
              className="bg-[#0A3663] hover:bg-[#124C85] text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors shadow-xs"
            >
              Enroll
            </Link>
            <button
              onClick={() => {
                const nextState = !mobileMenuOpen;
                setMobileMenuOpen(nextState);
                if (!nextState) setMobileCoursesOpen(false);
              }}
              type="button"
              className="p-1.5 sm:p-2 rounded-lg text-slate-700 hover:text-[#0A3663] hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
                  <div key={link.label} className="border-b border-slate-100 py-1">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        href={link.href}
                        onClick={() => {
                          setMobileCoursesOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="text-base font-semibold text-slate-700 hover:text-[#0098DA] transition-colors"
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileCoursesOpen((prev) => !prev)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0098DA] hover:bg-sky-50 transition-colors cursor-pointer"
                        aria-expanded={mobileCoursesOpen}
                        aria-label="Toggle courses submenu"
                      >
                        <ChevronDown
                          className={`w-5 h-5 text-[#0098DA] transition-transform duration-200 ${
                            mobileCoursesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {mobileCoursesOpen && (
                      <div className="pl-3 pr-2 py-2.5 space-y-2 bg-sky-50/60 rounded-xl my-1 border border-sky-100 animate-in fade-in duration-200">
                        {/* Explore all courses shortcut */}
                        <Link
                          href={link.href}
                          onClick={() => {
                            setMobileCoursesOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#0A3663] text-white text-xs font-bold shadow-xs hover:bg-[#124C85] transition-colors mb-2"
                        >
                          <span>Explore All 7 Courses &amp; Diplomas</span>
                          <span className="text-[#0098DA]">→</span>
                        </Link>

                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setMobileCoursesOpen(false);
                              setMobileMenuOpen(false);
                            }}
                            className="block py-1 text-sm font-medium text-[#0A3663] hover:text-[#0098DA] transition-colors"
                          >
                            {item.label}
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
                  onClick={() => {
                    setMobileCoursesOpen(false);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-2.5 text-base font-semibold text-slate-700 hover:text-[#0098DA] border-b border-slate-100 transition-colors"
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
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
