import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  academyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  district: string;
  country: string;
  mapEmbedUrl: string;
  socials: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  officeHours: string;
}

const SettingSchema = new Schema<ISetting>(
  {
    academyName: { type: String, default: 'RK International Language Academy' },
    tagline: { type: String, default: 'The Way of Success - IELTS & English Academy' },
    phone: { type: String, default: '074 0224 355' },
    whatsapp: { type: String, default: '94740224355' },
    email: { type: String, default: 'rkacademykili@gmail.com' },
    address: { type: String, default: 'A-9 Road, Near Theresamma Kovil' },
    city: { type: String, default: 'Kilinochchi' },
    district: { type: String, default: 'Northern Province' },
    country: { type: String, default: 'Sri Lanka' },
    mapEmbedUrl: { type: String, default: '' },
    socials: {
      facebook: { type: String, default: 'https://facebook.com' },
      instagram: { type: String, default: 'https://instagram.com' },
      youtube: { type: String, default: '' },
    },
    officeHours: { type: String, default: 'Monday – Saturday: 8:30 AM – 6:00 PM' },
  },
  { timestamps: true }
);

export const Setting = mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
