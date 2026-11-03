import { Student } from '../models/Student.js';
import { Enquiry } from '../models/Enquiry.js';
import { registrationValidationSchema } from '../validations/registrationSchema.js';
import { sendRegistrationConfirmationEmails } from '../services/resendService.js';

export async function processStudentRegistration(rawData: unknown) {
  const validated = registrationValidationSchema.parse(rawData);

  // 1. Record an enquiry record with "register" type
  const enquiry = await Enquiry.create({
    type: 'register',
    fullName: validated.fullName,
    phone: validated.phone,
    whatsapp: validated.whatsapp,
    email: validated.email,
    coursePreference: validated.courseSlug,
    preferredMode: validated.preferredMode,
    message: validated.notes || 'Online Registration Submitted',
    status: 'new',
  });

  // 2. Dispatch automated confirmation emails (Resend)
  const emailResult = await sendRegistrationConfirmationEmails(validated);

  return {
    success: true,
    enquiryId: enquiry._id,
    emailsDispatched: emailResult.success,
  };
}
