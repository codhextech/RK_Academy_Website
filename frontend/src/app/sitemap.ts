import type { MetadataRoute } from 'next';
import { ACADEMY_COURSES } from '@/lib/coursesData';
import { BLOG_POSTS } from '@/lib/blogData';
import { getAllBlogs, getAllCourses, syncFromMongoDBIfNeeded } from '@/lib/server/store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await syncFromMongoDBIfNeeded();
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
  const liveCourses = getAllCourses().filter((c) => c.active !== false);
  const courseList = liveCourses.length > 0 ? liveCourses : ACADEMY_COURSES;
  const courseRoutes: MetadataRoute.Sitemap = courseList.map((course) => ({
    url: `${baseUrl}/ielts-courses/${course.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Educational SEO blog guides
  const liveBlogs = getAllBlogs().filter((b) => b.published !== false);
  const blogList = liveBlogs.length > 0 ? liveBlogs : BLOG_POSTS;
  const blogRoutes: MetadataRoute.Sitemap = blogList.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
