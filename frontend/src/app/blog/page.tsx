import React from 'react';
import BlogHubClient, { BlogHubPost } from '@/components/blog/BlogHubClient';
import { BLOG_POSTS } from '@/lib/blogData';
import { R2_MEDIA, ACADEMY_INFO } from '@/lib/constants';
import {
  getAcademySettings,
  getAllBlogs,
  getAllCourses,
  syncFromMongoDBIfNeeded,
} from '@/lib/server/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'IELTS, PTE & Migration Guides | RK International Academy',
  description:
    'Read expert guides on IELTS Academic vs General Training, PTE Academic strategies, UKVI visa requirements, and English fluency from RK International Language Academy.',
};

export default async function BlogHubPage() {
  await syncFromMongoDBIfNeeded();
  const settings = getAcademySettings();
  const liveBlogs = getAllBlogs().filter((b) => b.published !== false);
  const activeCourseCount = getAllCourses().filter((c) => c.active !== false).length || 7;

  const posts: BlogHubPost[] =
    liveBlogs.length > 0
      ? liveBlogs.map((b) => {
          const base = BLOG_POSTS.find((p) => p.slug === b.slug);
          return {
            slug: b.slug,
            title: b.title || base?.title || '',
            category: b.category || base?.category || 'Tips & Strategy',
            date: b.date || base?.date || 'April 2026',
            readTime: b.readTime || base?.readTime || '5 min read',
            author: b.author || base?.author || 'RK Academy Faculty',
            authorRole: b.authorRole || base?.authorRole || 'Senior Instructor',
            image: b.image || base?.image || R2_MEDIA.courses.ieltsUkvi,
            excerpt: b.excerpt || base?.excerpt || '',
          };
        })
      : BLOG_POSTS.map((p) => ({
          slug: p.slug,
          title: p.title,
          category: p.category,
          date: p.date,
          readTime: p.readTime,
          author: p.author,
          authorRole: p.authorRole,
          image: p.image,
          excerpt: p.excerpt,
        }));

  return (
    <BlogHubClient
      posts={posts}
      courseCount={activeCourseCount}
      whatsappNumber={settings.whatsapp || ACADEMY_INFO.whatsappNumber}
    />
  );
}
