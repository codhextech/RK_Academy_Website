'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/floating/FloatingWhatsApp';
import MobileStickyBar from '@/components/floating/MobileStickyBar';
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd';

interface SiteLayoutWrapperProps {
  children: React.ReactNode;
}

export default function SiteLayoutWrapper({ children }: SiteLayoutWrapperProps) {
  const pathname = usePathname();

  // If navigating admin route or dedicated registration page, customize layout
  const isAdminRoute = pathname?.startsWith('/admin');
  const isRegisterRoute = pathname === '/register';

  if (isAdminRoute) {
    return <main className="min-h-screen w-full bg-slate-50">{children}</main>;
  }

  if (isRegisterRoute) {
    return (
      <>
        <LocalBusinessJsonLd />
        <main className="min-h-screen w-full bg-slate-100">{children}</main>
        <FloatingWhatsApp />
      </>
    );
  }

  const isHomeRoute = pathname === '/';

  return (
    <>
      <LocalBusinessJsonLd />
      <Header />
      <main className={`flex-1 ${isHomeRoute ? '' : 'pt-20 sm:pt-24'}`}>{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </>
  );
}
