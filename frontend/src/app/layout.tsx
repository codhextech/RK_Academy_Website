import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/floating/FloatingWhatsApp';
import MobileStickyBar from '@/components/floating/MobileStickyBar';
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd';
import { ACADEMY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'IELTS & PTE Classes in Kilinochchi, Sri Lanka | RK International Language Academy',
  description:
    'Expert IELTS Academic & General Training and PTE coaching in Kilinochchi (A-9 Road). In-person and interactive live online classes, proven band 7.5+ and PTE 65+ scores, British Council & Pearson support.',
  keywords: [
    'IELTS classes Kilinochchi',
    'PTE classes Kilinochchi',
    'PTE classes Sri Lanka',
    'IELTS classes Sri Lanka',
    'IELTS coaching Jaffna',
    'Online IELTS classes Sri Lanka',
    'IELTS Academic classes Kilinochchi',
    'IELTS General Training Sri Lanka',
    'RK International Language Academy',
    'Spoken English Kilinochchi',
    'Diploma in English Kilinochchi',
  ],
  authors: [{ name: 'RK International Language Academy' }],
  metadataBase: new URL('https://rkacademy.lk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RK International Language Academy | IELTS, PTE & English Classes Kilinochchi',
    description:
      'The Way of Success. Expert coaching for IELTS Academic, General Training, PTE, and Diploma in English. A-9 Road, Kilinochchi & Live Online.',
    url: 'https://rkacademy.lk',
    siteName: 'RK International Language Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/logo/rk-logo.png',
        width: 1200,
        height: 630,
        alt: 'RK International Language Academy Logo',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo/rk-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-[#0098DA] selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileStickyBar />
      </body>
    </html>
  );
}
