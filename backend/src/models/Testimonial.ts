import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  studentName: string;
  courseTaken: string; // e.g. "IELTS Academic"
  overallBand: string; // e.g. "Band 8.0"
  scores: {
    listening?: number;
    reading?: number;
    writing?: number;
    speaking?: number;
  };
  reviewText: string;
  photoUrl: string;
  destinationCountry?: string; // e.g. "UK (University of Manchester)"
  featured: boolean;
  published: boolean;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    studentName: { type: String, required: true },
    courseTaken: { type: String, required: true },
    overallBand: { type: String, required: true },
    scores: {
      listening: Number,
      reading: Number,
      writing: Number,
      speaking: Number,
    },
    reviewText: { type: String, required: true },
    photoUrl: { type: String, default: '/images/results/student-placeholder.webp' },
    destinationCountry: String,
    featured: { type: Boolean, default: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Testimonial =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
