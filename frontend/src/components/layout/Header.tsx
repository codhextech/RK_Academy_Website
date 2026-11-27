'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { ACADEMY_INFO, NAV_LINKS, R2_MEDIA } from '@/lib/constants';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [inHeroZone, setInHeroZone] = useState(true);
  const lastScrollY = useRef(0);

  const isHomeRoute = pathname === '/';
  const isDarkGlass = isHomeRoute && inHeroZone && !mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ignore iOS/browser bounce overscroll
      if (currentScrollY < 0) return;

      setIsScrolled(currentScrollY > 20);
      const heroThreshold = Math.max(window.innerHeight - 120, 460);
      setInHeroZone(currentScrollY < heroThreshold);

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

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 pointer-events-none px-3 sm:px-4 lg:px-6 pt-2.5 sm:pt-3.5 transition-transform duration-300 ease-in-out ${
        isVisible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-[120%]'
      }`}
    >
      {/* FLOATING IPHONE-STYLE LIQUID GLASS NAVBAR */}
      <div
        className={`site-container pointer-events-auto rounded-2xl transition-all duration-300 border backdrop-blur-2xl backdrop-saturate-150 ${
          isDarkGlass
            ? 'bg-white/[0.11] border-white/25 shadow-[0_12px_36px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.35)]'
            : isScrolled
            ? 'bg-white/90 border-slate-200/85 shadow-[0_12px_36px_rgba(6,26,51,0.14),inset_0_1px_0_rgba(255,255,255,0.8)]'
            : 'bg-white/88 border-slate-200/85 shadow-[0_12px_36px_rgba(6,26,51,0.14),inset_0_1px_0_rgba(255,255,255,0.8)]'
        }`}
      >
        <div className="flex justify-between items-center h-14 sm:h-16 px-3 sm:px-5 gap-3 sm:gap-4">
          {/* Official Logo */}
          <Link
            href="/"
            className={`flex items-center group min-w-0 shrink-0 transition-all duration-300 ${
              isDarkGlass ? 'bg-white/92 px-2.5 py-1 rounded-xl shadow-xs' : ''
            }`}
          >
            <Image
              src={R2_MEDIA.brand.logo}
              alt="RK International Language Academy Logo"
              width={240}
              height={180}
              priority
              className="h-8 sm:h-10 lg:h-11 w-auto max-w-[140px] sm:max-w-[180px] object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
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
                      className={`flex items-center gap-1 font-semibold text-sm transition-colors py-2 ${
                        isDarkGlass
                          ? 'text-white/95 hover:text-[#38BDF8]'
                          : 'text-slate-700 hover:text-[#0098DA]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDarkGlass
                            ? 'text-white/75 group-hover/navitem:text-[#38BDF8]'
                            : 'text-slate-400 group-hover/navitem:text-[#0098DA]'
                        } ${coursesDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </Link>

                    {coursesDropdownOpen && (
                      <div className="absolute top-full left-0 w-[560px] lg:w-[600px] bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
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
                  className={`font-semibold text-sm transition-colors ${
                    isDarkGlass
                      ? 'text-white/95 hover:text-[#38BDF8]'
                      : 'text-slate-700 hover:text-[#0098DA]'
                  }`}
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
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                isDarkGlass
                  ? 'bg-[#0098DA]/90 hover:bg-[#0098DA] text-white border border-sky-300/40 shadow-[0_4px_16px_rgba(0,152,218,0.4)]'
                  : 'bg-[#0A3663] hover:bg-[#124C85] text-white shadow-md hover:shadow-lg'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${isDarkGlass ? 'text-sky-100' : 'text-[#0098DA]'}`} />
              <span>Enroll Now</span>
            </Link>
          </div>

          {/* Mobile Action & Hamburger Button */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/register"
              className={`text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors shadow-xs ${
                isDarkGlass
                  ? 'bg-[#0098DA]/90 hover:bg-[#0098DA] border border-sky-300/40'
                  : 'bg-[#0A3663] hover:bg-[#124C85]'
              }`}
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
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                isDarkGlass
                  ? 'text-white hover:bg-white/15'
                  : 'text-slate-700 hover:text-[#0A3663] hover:bg-slate-100'
              }`}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* FLOATING MOBILE SLIDE-DOWN DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden site-container pointer-events-auto mt-2">
          <div className="bg-white/98 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-2xl px-4 pt-2 pb-5 space-y-3">
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
        </div>
      )}
    </header>
  );
}
