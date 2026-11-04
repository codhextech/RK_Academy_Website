import type { MetadataRoute } from 'next';
import { ACADEMY_COURSES } from '@/lib/coursesData';
import { BLOG_POSTS } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rkacademy.lk';
  const now = new Date();

  // 1. Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/ielts-courses',
    '/ielts-courses/academic',
    '/ielts-courses/general-training',
    '/online-ielts-classes',
    '/trainers',
    '/student-success',
    '/contact',
    '/register',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dedicated course pages
  const courseRoutes: MetadataRoute.Sitemap = ACADEMY_COURSES.map((course) => ({
    url: `${baseUrl}/ielts-courses/${course.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Educational SEO blog guides
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
