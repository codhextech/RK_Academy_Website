import { NextRequest, NextResponse } from 'next/server';
import { addEnquiry, syncFromMongoDBIfNeeded } from '@/lib/server/store';

export async function POST(request: NextRequest) {
  try {
    await syncFromMongoDBIfNeeded();
    const body = await request.json();
    console.log('[RK Academy API] New Student Registration Form Received:', body.fullName || body.firstName);

    // Official Registration Number (RK-2026-XXXX)
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const regNo = body.regNo?.trim() || `RK-${year}-${randomDigits}`;

    const firstName = (body.firstName || '').trim();
    const lastName = (body.lastName || '').trim();
    const fullName = body.fullName?.trim() || `${firstName} ${lastName}`.trim() || 'New Student';

    const saved = addEnquiry({
      type: 'register',
      regNo,
      firstName,
      lastName,
      fullName,
      dob: body.dob || '',
      streetAddress: body.streetAddress || '',
      city: body.city || 'Kilinochchi',
      stateProvince: body.stateProvince || 'Northern Province',
      zipCode: body.zipCode || '',
      email: body.email || '',
      phone: body.phone || body.mobile || '',
      whatsapp: body.whatsapp || body.phone || '',
      referral: body.referral || 'Social Media',
      courseCategory: body.courseCategory || 'English',
      coursePreference: body.coursePreference || body.courseTitle || body.courseSlug || 'IELTS Preparation',
      details: body.details || '',
      message: body.message || body.details || `Registered for ${body.coursePreference || 'Course'} (${body.preferredMode === 'online' ? 'Online' : 'Physical'})`,
      preferredMode: body.preferredMode === 'online' ? 'online' : 'offline',
      duration: body.duration || '8 Weeks (60+ Hours)',
      totalFee: body.totalFee || '',
      paymentMethod: body.paymentMethod || 'Cash',
      termsAccepted: Boolean(body.termsAccepted ?? true),
      signature: body.signature || fullName,
      signatureDate: body.signatureDate || new Date().toISOString().split('T')[0],
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Registration received successfully. Your seat has been reserved at RK International Language Academy.',
        data: saved,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process student registration form' },
      { status: 500 }
    );
  }
}
