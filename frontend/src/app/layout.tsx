import type { Metadata } from 'next';
import './globals.css';
import SiteLayoutWrapper from '@/components/layout/SiteLayoutWrapper';
import { R2_MEDIA } from '@/lib/constants';

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
        url: R2_MEDIA.brand.logo,
        width: 1200,
        height: 630,
        alt: 'RK International Language Academy Logo',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-[#0098DA] selection:text-white"
        suppressHydrationWarning
      >
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  );
}
