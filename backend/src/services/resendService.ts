import { Resend } from 'resend';
import { ENV } from '../config/env.js';
import { RegistrationInput } from '../validations/registrationSchema.js';

const resend = new Resend(ENV.RESEND_API_KEY || 're_mock_key');

export async function sendRegistrationConfirmationEmails(data: RegistrationInput) {
  if (!ENV.RESEND_API_KEY) {
    console.log('[Resend Mock] Email would be sent for:', data.fullName, data.email);
    return { success: true, mocked: true };
  }

  try {
    // 1. Email to Student
    const studentEmail = await resend.emails.send({
      from: 'RK International Academy <admissions@rkacademy.lk>',
      to: [data.email],
      subject: `Registration Received: ${data.courseSlug.toUpperCase()} at RK International Academy`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #003865; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E0F2FE; border-radius: 8px;">
          <h2 style="color: #003865; margin-bottom: 8px;">Welcome to RK International Language Academy</h2>
          <p style="color: #0098DA; font-weight: bold; margin-top: 0;">The Way of Success</p>
          <hr style="border: 0; border-top: 1px solid #E2E8F0;" />
          <p>Dear <strong>${data.fullName}</strong>,</p>
          <p>Thank you for registering for our <strong>${data.courseSlug.replace('-', ' ').toUpperCase()}</strong> course (${data.preferredMode === 'online' ? 'Online Live Classes' : 'In-person Kilinochchi Campus'}).</p>
          <div style="background-color: #F0F9FF; border-left: 4px solid #0098DA; padding: 12px 16px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Phone:</strong> ${data.phone}</p>
            <p style="margin: 4px 0;"><strong>WhatsApp:</strong> ${data.whatsapp}</p>
            <p style="margin: 4px 0;"><strong>Campus:</strong> A-9 Road, Near Theresamma Kovil, Kilinochchi</p>
          </div>
          <p>Our admissions officer will contact you within 24 hours to confirm your batch timing and placement test.</p>
          <p>For instant questions, chat with us directly on WhatsApp: <a href="https://wa.me/${ENV.ACADEMY_WHATSAPP}" style="color: #0098DA; font-weight: bold;">074 0224 355</a>.</p>
        </div>
      `,
    });

    // 2. Alert Email to Admin
    const adminAlert = await resend.emails.send({
      from: 'RK Academy Admissions <system@rkacademy.lk>',
      to: [ENV.ADMIN_EMAIL],
      subject: `🚨 New Student Registration: ${data.fullName} (${data.courseSlug})`,
      html: `
        <h2>New Course Registration Alert</h2>
        <ul>
          <li><strong>Student Name:</strong> ${data.fullName}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>WhatsApp:</strong> ${data.whatsapp}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Course:</strong> ${data.courseSlug}</li>
          <li><strong>Mode:</strong> ${data.preferredMode}</li>
        </ul>
      `,
    });

    return { success: true, studentEmail, adminAlert };
  } catch (error) {
    console.error('Failed to send Resend emails:', error);
    return { success: false, error };
  }
}
