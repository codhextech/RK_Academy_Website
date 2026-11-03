import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'IELTS Preparation Tips & Guides | RK International Academy',
  description:
    'Free IELTS preparation tips, speaking topics, exam fee updates, and academic guides written by certified trainers in Sri Lanka.',
};

export default function BlogHubPage() {
  const articles = [
    {
      slug: 'ielts-exam-fee-sri-lanka-2026',
      title: 'IELTS Exam Fee in Sri Lanka (2026 Updated) & Registration Guide',
      excerpt:
        'Complete breakdown of the British Council and IDP test fees in Sri Lanka for IELTS Academic, General Training, and UKVI.',
      date: 'March 2026',
      readTime: '6 min read',
      tag: 'Exam Fees',
    },
    {
      slug: 'ielts-academic-vs-general-training',
      title: 'IELTS Academic vs General Training: Which Test Do You Really Need?',
      excerpt:
        'Detailed comparison between Academic and General Training modules, difficulty levels, and which countries require which version.',
      date: 'February 2026',
      readTime: '8 min read',
      tag: 'Guide',
    },
    {
      slug: 'how-to-score-band-7-speaking',
      title: 'How to Score Band 7.5+ in IELTS Speaking: Tips from Kilinochchi Trainers',
      excerpt:
        'Master the Part 2 cue card, reduce hesitations, and use high-band idiomatic vocabulary naturally during your speaking test.',
      date: 'January 2026',
      readTime: '7 min read',
      tag: 'Speaking Tips',
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#062343] to-[#0A3663] text-white py-14 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[#0098DA] bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            IELTS Tips & Academic Guides
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Practical strategies, recent exam questions, and band score improvement tactics directly from our certified instructors.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((post, idx) => (
              <article
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <span className="text-xs font-bold text-[#0098DA] bg-sky-100/70 px-2.5 py-1 rounded-md">
                    {post.tag}
                  </span>

                  <h2 className="text-xl font-bold text-[#0A3663] mt-4 mb-2 hover:text-[#0098DA] transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-[#0098DA] hover:underline flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
