import { z } from 'zod';

export const enquiryValidationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(9, 'Please enter a valid phone number (e.g. 0740224355)'),
  whatsapp: z.string().optional(),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  coursePreference: z.string().optional(),
  preferredMode: z.enum(['offline', 'online']).default('offline'),
  message: z.string().optional(),
  sourceUrl: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquiryValidationSchema>;
