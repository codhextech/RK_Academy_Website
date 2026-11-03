import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[RK Academy API] New Registration Received:', body);

    // In production, this persists to MongoDB and triggers Resend confirmation emails
    return NextResponse.json(
      {
        success: true,
        message: 'Registration received successfully. Our counselor will contact you shortly.',
        data: {
          fullName: body.fullName,
          course: body.courseSlug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
