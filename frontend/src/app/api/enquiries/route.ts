import { NextRequest, NextResponse } from 'next/server';
import { addEnquiry, syncFromMongoDBIfNeeded } from '@/lib/server/store';

export async function POST(request: NextRequest) {
  try {
    await syncFromMongoDBIfNeeded();
    const body = await request.json();
    console.log('[RK Academy API] New Inquiry Received:', body);

    const saved = addEnquiry({
      type: body.type || 'contact',
      fullName: body.fullName || body.name || 'Anonymous Inquiry',
      phone: body.phone || 'Not provided',
      whatsapp: body.whatsapp || body.phone,
      email: body.email,
      coursePreference: body.coursePreference || body.course,
      preferredMode: body.preferredMode || 'offline',
      message: body.message,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry saved successfully.',
        data: saved,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Inquiry processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
