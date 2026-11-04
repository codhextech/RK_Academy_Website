'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, User, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blogData';

export default function BlogHubPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Exam Comparisons',
    'Visa & Scores',
    'Tips & Strategy',
    'Local Guides',
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (activeCategory === 'All') return true;
    return post.category === activeCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO BANNER - Compact & Streamlined */}
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-8 md:py-12 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Guides &amp; Articles
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Expert exam breakdowns, country visa score requirements, band improvement strategies, and local Northern Province guidance from our certified faculty.
          </p>
        </div>
      </section>

      {/* 2. FILTER PILLS & ARTICLES GRID */}
      <section className="py-14 md:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0A3663] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-52 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs bg-white text-[#0A3663] border border-sky-100">
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0A3663] group-hover:text-[#0098DA] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0098DA]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0098DA]" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-[#0A3663] group-hover:text-[#0098DA] inline-flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA Box */}
          <div className="bg-gradient-to-br from-[#062343] to-[#0A3663] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5 shadow-xl border border-sky-900/30">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Begin Your IELTS or PTE Prep
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Book a free diagnostic mock test with our instructors on A-9 Road, Kilinochchi or schedule a one-on-one virtual level assessment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto bg-[#0098DA] hover:bg-[#0080B8] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
              >
                Register for Next Batch
              </Link>
              <Link
                href="/ielts-courses"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
              >
                Explore All 7 Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
