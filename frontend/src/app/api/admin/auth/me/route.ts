import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/auth';

export async function GET(request: NextRequest) {
  const user = await getRequestSession(request);

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { passwordHash, ...safeUser } = user;
  return NextResponse.json({
    success: true,
    user: safeUser,
  });
}
