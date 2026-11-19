import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/auth';
import {
  getAllUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getAcademySettings,
  updateAcademySettings,
  syncFromMongoDBIfNeeded,
} from '@/lib/server/store';

// Helper to ensure only Super Admin can access this route
async function verifySuperAdmin(request: NextRequest) {
  const sessionUser = await getRequestSession(request);
  if (!sessionUser) {
    return { ok: false, status: 401, error: 'Unauthorized. Please login.' };
  }
  if (sessionUser.role !== 'superadmin') {
    return { ok: false, status: 403, error: 'Forbidden: Super Admin privileges required.' };
  }
  return { ok: true, user: sessionUser };
}

// GET /api/admin/users - List all admin/staff accounts + admin quantity info
export async function GET(request: NextRequest) {
  const auth = await verifySuperAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  await syncFromMongoDBIfNeeded();
  const users = getAllUsers();
  const settings = getAcademySettings();

  return NextResponse.json({
    success: true,
    users,
    totalAdmins: users.length,
    maxAdminsLimit: settings.maxAdmins || 5,
  });
}

// POST /api/admin/users - Create new Admin/Staff (Super Admin only)
export async function POST(request: NextRequest) {
  const auth = await verifySuperAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { username, name, password, role, permissions } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const result = createAdminUser({
      username,
      name: name || username,
      password,
      role: role === 'superadmin' ? 'superadmin' : 'staff',
      permissions: permissions || {
        enquiries: true,
        courses: false,
        blog: false,
        settings: false,
        testimonials: false,
      },
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully.',
      user: result.user,
    });
  } catch (error) {
    console.error('[Admin Create Error]:', error);
    return NextResponse.json({ success: false, error: 'Failed to create admin.' }, { status: 500 });
  }
}

// PATCH /api/admin/users - Update user permissions, active status, password, or update max limit
export async function PATCH(request: NextRequest) {
  const auth = await verifySuperAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { id, maxAdminsLimit, ...updates } = body;

    // If updating the max admin limit (Quantity Control)
    if (typeof maxAdminsLimit === 'number' && maxAdminsLimit > 0) {
      updateAcademySettings({ maxAdmins: maxAdminsLimit });
      return NextResponse.json({
        success: true,
        message: `Admin quantity limit updated to ${maxAdminsLimit}.`,
        maxAdminsLimit,
      });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required.' }, { status: 400 });
    }

    const result = updateAdminUser(id, updates);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'User details & permissions updated.',
      user: result.user,
    });
  } catch (error) {
    console.error('[Admin Update Error]:', error);
    return NextResponse.json({ success: false, error: 'Failed to update user.' }, { status: 500 });
  }
}

// DELETE /api/admin/users - Delete a staff account
export async function DELETE(request: NextRequest) {
  const auth = await verifySuperAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required.' }, { status: 400 });
    }

    const result = deleteAdminUser(id);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully.',
    });
  } catch (error) {
    console.error('[Admin Delete Error]:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete user.' }, { status: 500 });
  }
}
