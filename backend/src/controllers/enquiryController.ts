import { Enquiry } from '../models/Enquiry.js';
import { enquiryValidationSchema } from '../validations/enquirySchema.js';

export async function createEnquiry(rawData: unknown) {
  const validated = enquiryValidationSchema.parse(rawData);
  const enquiry = await Enquiry.create(validated);
  return enquiry;
}

export async function getEnquiries(filter = {}) {
  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
  return enquiries;
}

export async function updateEnquiryStatus(id: string, status: string, note?: string) {
  const updateQuery: Record<string, unknown> = { status };
  if (note) {
    updateQuery.$push = {
      notes: { text: note, author: 'Staff', createdAt: new Date() },
    };
  }
  const updated = await Enquiry.findByIdAndUpdate(id, updateQuery, { new: true });
  return updated;
}
