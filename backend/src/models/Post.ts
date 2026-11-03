import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown / HTML
  coverImage: string;
  tags: string[];
  author: string;
  readingTimeMinutes: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  published: boolean;
  publishedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: '/images/blog/blog-placeholder.webp' },
    tags: [{ type: String }],
    author: { type: String, default: 'RK Academy Academic Team' },
    readingTimeMinutes: { type: Number, default: 5 },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
