import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  enquiryId?: mongoose.Types.ObjectId;
  fullName: string;
  phone: string;
  whatsapp?: string;
  email: string;
  courseId?: mongoose.Types.ObjectId;
  batchId?: mongoose.Types.ObjectId;
  courseName: string;
  mode: 'offline' | 'online';
  payments: {
    amount: number;
    receiptNumber: string;
    date: Date;
    method: 'cash' | 'bank_transfer' | 'online';
  }[];
  targetBand: string;
  achievedBand?: {
    listening?: number;
    reading?: number;
    writing?: number;
    speaking?: number;
    overall?: number;
  };
  status: 'active' | 'graduated' | 'dropped';
}

const StudentSchema = new Schema<IStudent>(
  {
    enquiryId: { type: Schema.Types.ObjectId, ref: 'Enquiry' },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: String,
    email: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    batchId: { type: Schema.Types.ObjectId, ref: 'Batch' },
    courseName: { type: String, required: true },
    mode: { type: String, enum: ['offline', 'online'], default: 'offline' },
    payments: [
      {
        amount: Number,
        receiptNumber: String,
        date: { type: Date, default: Date.now },
        method: { type: String, enum: ['cash', 'bank_transfer', 'online'], default: 'cash' },
      },
    ],
    targetBand: { type: String, default: '7.5' },
    achievedBand: {
      listening: Number,
      reading: Number,
      writing: Number,
      speaking: Number,
      overall: Number,
    },
    status: { type: String, enum: ['active', 'graduated', 'dropped'], default: 'active' },
  },
  { timestamps: true }
);

export const Student = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
