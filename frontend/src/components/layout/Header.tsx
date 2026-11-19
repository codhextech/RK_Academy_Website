'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO, NAV_LINKS, R2_MEDIA } from '@/lib/constants';

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
      className={`w-full sticky top-0 z-50 bg-white transition-all duration-300 ease-in-out border-b-2 ${
        isScrolled ? 'border-slate-300/90 shadow-md' : 'border-slate-200/90 shadow-xs'
      } ${isVisible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* 1. TOP URGENT ANNOUNCEMENT & CONTACT BAR */}
      <div className="bg-[#0A3663] text-white text-xs md:text-sm py-1.5 sm:py-2 px-3 sm:px-4 overflow-hidden select-none">
        {/* Desktop / Laptop: Dynamic Responsive Bar */}
        <div className="hidden sm:flex site-container items-center justify-between flex-wrap gap-y-1.5 text-center sm:text-left">
          <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
            {/* Campus location */}
            <span className="flex items-center gap-1.5 text-sky-200">
              <MapPin className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
              <span>A-9 Road, Near Theresamma Kovil, Kilinochchi</span>
            </span>

            <span className="text-sky-300/40 hidden md:inline">•</span>

            {/* Email */}
            <a
              href={`mailto:${ACADEMY_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-sky-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
              <span>{ACADEMY_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 lg:gap-5 flex-wrap">
            {/* Hotlines */}
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Phone className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
              <span>Hotlines:</span>
              <a
                href={`tel:${ACADEMY_INFO.phone1Raw}`}
                className="hover:text-sky-300 transition-colors underline decoration-sky-400/40 hover:decoration-sky-300"
              >
                {ACADEMY_INFO.phone1}
              </a>
              <span className="text-sky-300/40">/</span>
              <a
                href={`tel:${ACADEMY_INFO.phone2Raw}`}
                className="hover:text-sky-300 transition-colors underline decoration-sky-400/40 hover:decoration-sky-300"
              >
                {ACADEMY_INFO.phone2}
              </a>
            </div>

            <span className="text-sky-300/40 hidden sm:inline">•</span>

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
                <div className="flex items-center gap-1 font-semibold text-white mx-3 shrink-0">
                  <Phone className="w-3 h-3 text-[#0098DA] shrink-0" />
                  <span>Hotlines:</span>
                  <a
                    href={`tel:${ACADEMY_INFO.phone1Raw}`}
                    className="hover:text-sky-300 transition-colors ml-0.5"
                  >
                    {ACADEMY_INFO.phone1}
                  </a>
                  <span className="text-sky-300/40 mx-1">/</span>
                  <a
                    href={`tel:${ACADEMY_INFO.phone2Raw}`}
                    className="hover:text-sky-300 transition-colors"
                  >
                    {ACADEMY_INFO.phone2}
                  </a>
                </div>
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
      <div className="site-container">
        <div className="flex justify-between items-center h-18 sm:h-20 md:h-24 gap-3 sm:gap-4">
          {/* Official Logo (Bigger, bolder responsive sizing) */}
          <Link href="/" className="flex items-center group min-w-0">
            <div className="py-1">
              <Image
                src={R2_MEDIA.brand.logo}
                alt="RK International Language Academy Logo"
                width={280}
                height={210}
                priority
                className="h-11 sm:h-13 md:h-15 lg:h-16 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[260px] object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
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
                      <div className="absolute top-full left-0 w-[560px] lg:w-[600px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {/* Explore All Courses Banner */}
                        <Link
                          href={link.href}
                          className="flex items-center justify-between px-3.5 py-2 mb-2 rounded-xl bg-sky-50 text-[#0A3663] hover:bg-sky-100 font-bold text-xs transition-colors border border-sky-100 group"
                          onClick={() => setCoursesDropdownOpen(false)}
                        >
                          <span>Explore All 7 Courses &amp; Diplomas</span>
                          <span className="text-[#0098DA] font-bold group-hover:translate-x-0.5 transition-transform">
                            View All Programs →
                          </span>
                        </Link>

                        {/* 2 Courses Per Row (2 Columns Grid) */}
                        <div className="grid grid-cols-2 gap-1.5">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="p-2.5 rounded-xl hover:bg-sky-50/80 group transition-colors border border-transparent hover:border-sky-100 flex flex-col justify-start"
                              onClick={() => setCoursesDropdownOpen(false)}
                            >
                              <p className="font-semibold text-sm text-[#0A3663] group-hover:text-[#0098DA] transition-colors leading-snug">
                                {item.label}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1 group-hover:text-slate-600">
                                {item.desc}
                              </p>
                            </Link>
                          ))}

                          {/* 8th Slot: Online Classes / Live Batches to Balance the 2-Column Grid */}
                          <Link
                            href="/online-ielts-classes"
                            className="p-2.5 rounded-xl bg-sky-50/60 hover:bg-sky-100/80 border border-sky-100/90 group transition-colors flex flex-col justify-start"
                            onClick={() => setCoursesDropdownOpen(false)}
                          >
                            <p className="font-semibold text-sm text-[#0098DA] group-hover:text-[#0A3663] transition-colors leading-snug flex items-center justify-between">
                              <span>Online Live Batches</span>
                              <span className="text-[#0098DA] group-hover:translate-x-0.5 transition-transform text-xs">→</span>
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1">
                              Interactive live coaching worldwide
                            </p>
                          </Link>
                        </div>
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
