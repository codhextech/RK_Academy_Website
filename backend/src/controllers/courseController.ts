import { Course } from '../models/Course.js';

export async function getAllCourses() {
  return Course.find({ published: true }).sort({ featured: -1, createdAt: 1 });
}

export async function getCourseBySlug(slug: string) {
  return Course.findOne({ slug, published: true });
}

export async function upsertCourse(courseData: Record<string, unknown>) {
  const { slug } = courseData;
  return Course.findOneAndUpdate({ slug }, courseData, { upsert: true, new: true });
}
