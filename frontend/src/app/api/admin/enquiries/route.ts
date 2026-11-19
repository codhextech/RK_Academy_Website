import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/auth';
import {
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  syncFromMongoDBIfNeeded,
} from '@/lib/server/store';

// Helper to check enquiry access
async function checkEnquiryAccess(request: NextRequest) {
  const sessionUser = await getRequestSession(request);
  if (!sessionUser) {
    return { ok: false, status: 401, error: 'Unauthorized. Please login.' };
  }
  if (sessionUser.role !== 'superadmin' && !sessionUser.permissions?.enquiries) {
    return { ok: false, status: 403, error: 'Forbidden: You do not have permission to view or manage enquiries.' };
  }
  return { ok: true, user: sessionUser };
}

// GET /api/admin/enquiries
export async function GET(request: NextRequest) {
  const auth = await checkEnquiryAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  await syncFromMongoDBIfNeeded();
  const enquiries = getAllEnquiries();
  return NextResponse.json({
    success: true,
    enquiries,
    total: enquiries.length,
    newCount: enquiries.filter((e) => e.status === 'new').length,
  });
}

// PATCH /api/admin/enquiries - Update follow-up status or add internal notes (Student registration data is strictly immutable)
export async function PATCH(request: NextRequest) {
  const auth = await checkEnquiryAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { id, status, note } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Record ID and status are required.' }, { status: 400 });
    }

    const notePayload = note ? { text: note, author: auth.user!.name || auth.user!.username } : undefined;
    const result = updateEnquiryStatus(id, status, notePayload);

    if (!result.success) {
      return NextResponse.json({ success: false, error: 'Record not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully.',
      enquiry: result.enquiry,
    });
  } catch (error) {
    console.error('[Admin Enquiry Update Error]:', error);
    return NextResponse.json({ success: false, error: 'Failed to update status.' }, { status: 500 });
  }
}

// DELETE /api/admin/enquiries
export async function DELETE(request: NextRequest) {
  const auth = await checkEnquiryAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  // Only superadmin can permanently delete leads
  if (auth.user?.role !== 'superadmin') {
    return NextResponse.json(
      { success: false, error: 'Only Super Admin can permanently delete enquiries.' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Inquiry ID is required.' }, { status: 400 });
    }

    const ok = deleteEnquiry(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Inquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error) {
    console.error('[Admin Enquiry Delete Error]:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete inquiry.' }, { status: 500 });
  }
}
