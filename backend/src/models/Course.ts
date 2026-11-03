import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  slug: string;
  title: string;
  type: 'academic' | 'general' | 'preparation' | 'spoken-english';
  summary: string;
  content: string;
  syllabus: {
    week: number;
    title: string;
    topics: string[];
  }[];
  duration: string;
  feeLKR: number;
  modes: ('offline' | 'online')[];
  faqs: {
    question: string;
    answer: string;
  }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  image: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['academic', 'general', 'preparation', 'spoken-english'],
      required: true,
    },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    syllabus: [
      {
        week: Number,
        title: String,
        topics: [String],
      },
    ],
    duration: { type: String, required: true },
    feeLKR: { type: Number, required: true },
    modes: [{ type: String, enum: ['offline', 'online'] }],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
