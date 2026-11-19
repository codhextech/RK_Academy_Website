import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/auth';
import { getAcademySettings, updateAcademySettings, syncFromMongoDBIfNeeded } from '@/lib/server/store';

// Helper to check settings access
async function checkSettingsAccess(request: NextRequest) {
  const sessionUser = await getRequestSession(request);
  if (!sessionUser) {
    return { ok: false, status: 401, error: 'Unauthorized. Please login.' };
  }
  if (sessionUser.role !== 'superadmin' && !sessionUser.permissions?.settings) {
    return { ok: false, status: 403, error: 'Forbidden: You do not have permission to view or modify settings.' };
  }
  return { ok: true, user: sessionUser };
}

// GET /api/admin/settings
export async function GET(request: NextRequest) {
  const auth = await checkSettingsAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  await syncFromMongoDBIfNeeded();
  const settings = getAcademySettings();
  return NextResponse.json({ success: true, settings });
}

// PATCH /api/admin/settings
export async function PATCH(request: NextRequest) {
  const auth = await checkSettingsAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    await syncFromMongoDBIfNeeded();
    const body = await request.json();
    const updated = updateAcademySettings(body);

    return NextResponse.json({
      success: true,
      message: 'Academy settings updated successfully.',
      settings: updated,
    });
  } catch (error) {
    console.error('[Admin Settings Update Error]:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings.' }, { status: 500 });
  }
}
