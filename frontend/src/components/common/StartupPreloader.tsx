'use client';

import React, { useEffect, useState } from 'react';

// Persists across client-side App Router navigation so the startup loader
// only plays once when the website starts (never on other pages or back-navigation).
let hasPlayedStartupLoader = false;

interface StartupPreloaderProps {
  logoUrl?: string;
}

// Exact outer contour of /images/logo/rk-logo.png (1024x766):
// Left arch junction -> Dome arch -> Right shoulder -> Top-right corner ->
// Right edge -> Curved bottom-right -> Bottom edge -> Bottom-left corner ->
// Left edge -> Curved top-left shoulder -> Back to left arch junction.
const LOGO_CONTOUR_PATH =
  'M 161 506 A 367 367 0 1 1 859 506 L 996 506 A 16 16 0 0 1 1012 522 L 1012 638 A 92 92 0 0 1 920 730 L 24 730 A 14 14 0 0 1 10 716 L 10 608 A 102 102 0 0 1 112 506 Z';

export default function StartupPreloader({
  logoUrl = '/images/logo/rk-logo.png',
}: StartupPreloaderProps) {
  const [visible, setVisible] = useState<boolean>(() => !hasPlayedStartupLoader);
  const [exiting, setExiting] = useState<boolean>(false);

  useEffect(() => {
    if (hasPlayedStartupLoader) {
      setVisible(false);
      return;
    }

    hasPlayedStartupLoader = true;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startFadeTimer = window.setTimeout(() => {
      setExiting(true);
      document.body.style.overflow = prevOverflow;
    }, 1650);

    const unmountTimer = window.setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => {
      window.clearTimeout(startFadeTimer);
      window.clearTimeout(unmountTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading RK International Language Academy"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-all duration-500 ease-out ${
        exiting ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Pure Logo + Pixel-Locked Running Blue Light Tracing Its Exact Contour */}
      <div className="relative w-64 sm:w-80 md:w-[340px] animate-rk-logo-breathe select-none">
        <svg
          viewBox="-35 -25 1094 816"
          className="w-full h-auto block overflow-visible"
          role="img"
          aria-label="RK International Language Academy"
        >
          <defs>
            {/* Soft neon electric-blue outer glow filter */}
            <filter id="rk-blue-neon-glow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="14" result="blurOuter" />
              <feGaussianBlur stdDeviation="5" result="blurInner" />
              <feMerge>
                <feMergeNode in="blurOuter" />
                <feMergeNode in="blurInner" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense core spark glow */}
            <filter id="rk-blue-core-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blurCore" />
              <feMerge>
                <feMergeNode in="blurCore" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Ambient Wide Blue Glow Running Around the Logo Silhouette */}
          <path
            d={LOGO_CONTOUR_PATH}
            pathLength={1000}
            fill="none"
            stroke="#0098DA"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="220 780"
            filter="url(#rk-blue-neon-glow)"
            className="animate-rk-logo-light-run opacity-75"
          />

          {/* 2. Official RK International Language Academy Logo */}
          <image
            href={logoUrl}
            x="0"
            y="0"
            width="1024"
            height="766"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* 3. Crisp Electric-Blue Light Beam Tracing the Exact Logo Border */}
          <path
            d={LOGO_CONTOUR_PATH}
            pathLength={1000}
            fill="none"
            stroke="#00AEFF"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="220 780"
            filter="url(#rk-blue-core-glow)"
            className="animate-rk-logo-light-run"
          />

          {/* 4. Bright White-Cyan Leading Light Spark at the Head of the Beam */}
          <path
            d={LOGO_CONTOUR_PATH}
            pathLength={1000}
            fill="none"
            stroke="#E0F7FF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="65 935"
            filter="url(#rk-blue-core-glow)"
            className="animate-rk-logo-light-head"
          />
        </svg>
      </div>
    </div>
  );
}
