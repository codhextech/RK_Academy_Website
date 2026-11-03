import { z } from 'zod';

export const registrationValidationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(9, 'Valid phone number is required'),
  whatsapp: z.string().min(9, 'WhatsApp number is required for batch updates'),
  email: z.string().email('Valid email is required'),
  courseSlug: z.enum(['academic', 'general-training', 'preparation', 'spoken-english']),
  preferredMode: z.enum(['offline', 'online']),
  batchPreference: z.string().optional(),
  city: z.string().optional(),
  currentEnglishLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  notes: z.string().optional(),
});

export type RegistrationInput = z.infer<typeof registrationValidationSchema>;
