import mongoose, { Schema, Document } from 'mongoose';

export interface IBatch extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  startDate: Date;
  schedule: string; // e.g. "Mon, Wed, Fri 5:30 PM - 7:30 PM"
  mode: 'offline' | 'online' | 'hybrid';
  totalSeats: number;
  enrolledSeats: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  location: string;
  trainerName: string;
}

const BatchSchema = new Schema<IBatch>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    schedule: { type: String, required: true },
    mode: { type: String, enum: ['offline', 'online', 'hybrid'], default: 'offline' },
    totalSeats: { type: Number, default: 20 },
    enrolledSeats: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    location: { type: String, default: 'Kilinochchi Campus (A-9 Road)' },
    trainerName: { type: String, default: 'Senior IELTS Instructor' },
  },
  { timestamps: true }
);

export const Batch = mongoose.models.Batch || mongoose.model<IBatch>('Batch', BatchSchema);
