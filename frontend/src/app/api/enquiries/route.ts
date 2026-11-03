import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[RK Academy API] New Inquiry Received:', body);

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry saved successfully.',
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
