import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  HelpCircle,
  GraduationCap,
  Phone,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { getBlogPostBySlug, getAllBlogSlugs, BLOG_POSTS } from '@/lib/blogData';
import { ACADEMY_INFO } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | RK International Language Academy',
    };
  }

  return {
    title: `${post.metaTitle}`,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `https://rkacademy.lk/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://rkacademy.lk/blog/${post.slug}`,
      siteName: 'RK International Language Academy',
      type: 'article',
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const whatsappInquiryUrl = `https://wa.me/${ACADEMY_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hi RK Academy, I read your guide "${post.title}" and would like to inquire about coaching classes.`
  )}`;

  // 1. Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: '2026-03-01T08:00:00+05:30',
    dateModified: '2026-04-01T08:00:00+05:30',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      worksFor: {
        '@type': 'Organization',
        name: ACADEMY_INFO.name,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: ACADEMY_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: 'https://rkacademy.lk/images/logo/rk-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rkacademy.lk/blog/${post.slug}`,
    },
  };

  // 2. FAQ Schema for "People Also Ask"
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 1. ARTICLE BANNER - Academic Navy Theme */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-sky-200">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Knowledge Hub
                </Link>
              </li>
              <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
              <li className="text-white font-bold truncate max-w-[200px] sm:max-w-none">
                {post.category}
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs sm:text-sm text-sky-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#0098DA]" />
                <span>By <strong>{post.author}</strong> ({post.authorRole})</span>
              </div>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0098DA]" />
                <span>{post.date}</span>
              </div>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#0098DA]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE BODY + SIDEBAR */}
      <section className="py-14 md:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 8 Cols: Main Article Content */}
            <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
              {/* Featured Image */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Structured Article Sections */}
              <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
                {post.content.map((sec, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0A3663] border-b border-slate-100 pb-2">
                      {sec.heading}
                    </h2>

                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="space-y-2.5 my-4 bg-sky-50/60 p-5 rounded-2xl border border-sky-100">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* FAQ Accordion / Section */}
              {post.faqs.length > 0 && (
                <div className="pt-8 border-t border-slate-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#0098DA]" />
                    <h3 className="text-xl font-bold text-[#0A3663]">
                      Frequently Asked Questions
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {post.faqs.map((faq, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                      >
                        <h4 className="font-bold text-sm text-[#0A3663]">
                          {faq.q}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0A3663] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[#0A3663] text-base">
                    Written by {post.author}
                  </h4>
                  <p className="text-xs text-[#0098DA] font-semibold">{post.authorRole}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Senior faculty member at RK International Language Academy Kilinochchi. Guiding students toward IELTS Band 7.5+ and PTE 65+ scores for university and migration abroad.
                  </p>
                </div>
              </div>
            </article>

            {/* Right 4 Cols: Sticky Sidebar containing both Admissions & Related Guides */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-20 space-y-4">
                {/* Action Card */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-md space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A3663]">
                      Personalized IELTS &amp; PTE Coaching
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Join small-group batches on A-9 Road, Kilinochchi or live interactive Zoom classes.
                    </p>
                  </div>

                  <div className="space-y-2.5 border-y border-slate-100 py-3 text-xs text-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">IELTS Academic / General:</span>
                      <span className="font-bold text-[#0A3663]">Band 7.5+ Target</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">PTE Computer Lab:</span>
                      <span className="font-bold text-[#0A3663]">Score 65+ / 79+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Class Timings:</span>
                      <span className="font-semibold">Morning / Evening / Weekend</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Mock Tests:</span>
                      <span className="font-bold text-emerald-600">Included Free</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Link
                      href="/register"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                    >
                      <GraduationCap className="w-4 h-4 text-[#0098DA]" />
                      <span>Register for Next Batch</span>
                    </Link>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#25D366] text-[#0A3663] hover:text-white border-2 border-[#25D366] py-2.5 rounded-xl font-bold text-xs transition-all duration-200 group shadow-xs"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                      <span>Inquire via WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${ACADEMY_INFO.phone}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-[#0A3663] py-2 rounded-xl font-bold text-xs transition-colors border border-slate-200"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0098DA]" />
                      <span>Hotline: {ACADEMY_INFO.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Related Articles Card */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-3">
                  <h3 className="font-bold text-[#0A3663] text-xs uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#0098DA]" />
                    <span>Related Guides</span>
                  </h3>

                  <div className="space-y-2">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}`}
                        className="block p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-200 transition-colors group"
                      >
                        <span className="text-[10px] font-bold text-[#0098DA] bg-white px-2 py-0.5 rounded-md border border-sky-100">
                          {rel.category}
                        </span>
                        <h4 className="font-bold text-xs text-[#0A3663] group-hover:text-[#0098DA] transition-colors mt-1 leading-snug">
                          {rel.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{rel.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
