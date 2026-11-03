import { Post } from '../models/Post.js';

export async function getPublishedPosts() {
  return Post.find({ published: true }).sort({ publishedAt: -1 });
}

export async function getPostBySlug(slug: string) {
  return Post.findOne({ slug, published: true });
}

export async function createOrUpdatePost(postData: Record<string, unknown>) {
  const { slug } = postData;
  return Post.findOneAndUpdate({ slug }, postData, { upsert: true, new: true });
}
