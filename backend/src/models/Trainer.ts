import mongoose, { Schema, Document } from 'mongoose';

export interface ITrainer extends Document {
  name: string;
  designation: string; // e.g. "Senior IELTS Academic Specialist"
  bandScore: string; // e.g. "Overall Band 8.5"
  qualifications: string[]; // ["British Council Certified Trainer", "BA in English"]
  experienceYears: number;
  bio: string;
  photoUrl: string;
  specialties: string[]; // ["Writing Task 2", "Speaking Fluency"]
  displayOrder: number;
  isActive: boolean;
}

const TrainerSchema = new Schema<ITrainer>(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    bandScore: { type: String, required: true },
    qualifications: [{ type: String }],
    experienceYears: { type: Number, default: 5 },
    bio: { type: String, required: true },
    photoUrl: { type: String, default: '/images/trainers/trainer-placeholder.webp' },
    specialties: [{ type: String }],
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Trainer = mongoose.models.Trainer || mongoose.model<ITrainer>('Trainer', TrainerSchema);
