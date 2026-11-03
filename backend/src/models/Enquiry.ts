import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  type: 'contact' | 'register' | 'quick-lead';
  fullName: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  coursePreference?: string; // e.g. "IELTS Academic", "IELTS General", "Foundation English"
  preferredMode?: 'offline' | 'online';
  message?: string;
  sourceUrl?: string;
  status: 'new' | 'contacted' | 'enrolled' | 'lost';
  notes: {
    text: string;
    author: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    type: { type: String, enum: ['contact', 'register', 'quick-lead'], default: 'contact' },
    fullName: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    whatsapp: { type: String },
    email: { type: String },
    coursePreference: { type: String },
    preferredMode: { type: String, enum: ['offline', 'online'], default: 'offline' },
    message: { type: String },
    sourceUrl: { type: String, default: '/' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'enrolled', 'lost'],
      default: 'new',
      index: true,
    },
    notes: [
      {
        text: String,
        author: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Enquiry = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
