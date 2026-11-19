import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/auth';
import { R2_MEDIA } from '@/lib/constants';
import {
  getAllTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  syncFromMongoDBIfNeeded,
} from '@/lib/server/store';

// Helper to check trainers access
async function checkTrainerAccess(request: NextRequest) {
  const sessionUser = await getRequestSession(request);
  if (!sessionUser) {
    return { ok: false, status: 401, error: 'Unauthorized. Please login.' };
  }
  if (sessionUser.role !== 'superadmin' && !sessionUser.permissions?.trainers && !sessionUser.permissions?.courses) {
    return { ok: false, status: 403, error: 'Forbidden: You do not have permission to manage faculty & trainers.' };
  }
  return { ok: true, user: sessionUser };
}

// GET /api/admin/trainers
export async function GET(request: NextRequest) {
  const auth = await checkTrainerAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  await syncFromMongoDBIfNeeded();
  const trainers = getAllTrainers();
  return NextResponse.json({ success: true, trainers });
}

// POST /api/admin/trainers - Create trainer
export async function POST(request: NextRequest) {
  const auth = await checkTrainerAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { name, role, badge, image, organizationOrUniversity, qualifications, specialties, active } = body;

    if (!name || !role) {
      return NextResponse.json({ success: false, error: 'Name and role are required.' }, { status: 400 });
    }

    const quals = Array.isArray(qualifications)
      ? qualifications
      : (typeof qualifications === 'string' ? qualifications.split('\n').filter(Boolean) : []);

    const specs = Array.isArray(specialties)
      ? specialties
      : (typeof specialties === 'string' ? specialties.split('\n').filter(Boolean) : []);

    const trainer = createTrainer({
      name: name.trim(),
      role: role.trim(),
      badge: badge ? badge.trim() : 'Faculty Member',
      image: image ? image.trim() : R2_MEDIA.trainers.nepethika,
      organizationOrUniversity: organizationOrUniversity || 'RK International Language Academy',
      qualifications: quals,
      specialties: specs,
      active: active !== undefined ? Boolean(active) : true,
    });

    return NextResponse.json({ success: true, message: 'Trainer added successfully.', trainer });
  } catch (err) {
    console.error('[Admin Trainer Create Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to add trainer.' }, { status: 500 });
  }
}

// PATCH /api/admin/trainers - Update trainer
export async function PATCH(request: NextRequest) {
  const auth = await checkTrainerAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { id, qualifications, specialties, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Trainer ID is required.' }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = { ...updates };
    if (qualifications !== undefined) {
      updatePayload.qualifications = Array.isArray(qualifications)
        ? qualifications
        : (typeof qualifications === 'string' ? qualifications.split('\n').filter(Boolean) : []);
    }
    if (specialties !== undefined) {
      updatePayload.specialties = Array.isArray(specialties)
        ? specialties
        : (typeof specialties === 'string' ? specialties.split('\n').filter(Boolean) : []);
    }

    const updated = updateTrainer(id, updatePayload);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Trainer not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Trainer updated successfully.', trainer: updated });
  } catch (err) {
    console.error('[Admin Trainer Update Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to update trainer.' }, { status: 500 });
  }
}

// DELETE /api/admin/trainers
export async function DELETE(request: NextRequest) {
  const auth = await checkTrainerAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Trainer ID is required.' }, { status: 400 });
    }

    const ok = deleteTrainer(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Trainer not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Trainer deleted successfully.' });
  } catch (err) {
    console.error('[Admin Trainer Delete Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete trainer.' }, { status: 500 });
  }
}
