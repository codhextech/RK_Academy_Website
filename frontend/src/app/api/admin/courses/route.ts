import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/auth';
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  syncFromMongoDBIfNeeded,
} from '@/lib/server/store';

// Helper to check courses access
async function checkCourseAccess(request: NextRequest) {
  const sessionUser = await getRequestSession(request);
  if (!sessionUser) {
    return { ok: false, status: 401, error: 'Unauthorized. Please login.' };
  }
  if (sessionUser.role !== 'superadmin' && !sessionUser.permissions?.courses) {
    return { ok: false, status: 403, error: 'Forbidden: You do not have permission to manage courses.' };
  }
  return { ok: true, user: sessionUser };
}

// GET /api/admin/courses
export async function GET(request: NextRequest) {
  const auth = await checkCourseAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  await syncFromMongoDBIfNeeded();
  const courses = getAllCourses();
  return NextResponse.json({ success: true, courses });
}

// POST /api/admin/courses - Create course
export async function POST(request: NextRequest) {
  const auth = await checkCourseAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      shortTitle,
      category,
      tag,
      duration,
      modes,
      campus,
      admissionsStatus,
      description,
      longDescription,
      curriculumHighlights,
      modules,
      image,
      feeLKR,
      targetAudience,
      active,
    } = body;

    if (!title || !description) {
      return NextResponse.json({ success: false, error: 'Title and description are required.' }, { status: 400 });
    }

    const course = createCourse({
      title: title.trim(),
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortTitle: shortTitle?.trim() || undefined,
      category: category || 'English & Exams',
      tag: tag?.trim() || undefined,
      duration: duration || '8 Weeks',
      modes: modes || 'In-Person & Live Online',
      campus: campus || 'A-9 Road, Kilinochchi',
      admissionsStatus: admissionsStatus || 'Now Enrolling',
      image: image || undefined,
      feeLKR: feeLKR ? Number(feeLKR) : undefined,
      targetAudience: targetAudience || 'Beginners and IELTS candidates',
      description: description.trim(),
      longDescription: longDescription?.trim() || description.trim(),
      curriculumHighlights: Array.isArray(curriculumHighlights) ? curriculumHighlights : [],
      modules: Array.isArray(modules) ? modules : [],
      active: active !== undefined ? Boolean(active) : true,
    });

    return NextResponse.json({ success: true, message: 'Course created successfully.', course });
  } catch (err) {
    console.error('[Admin Course Create Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to create course.' }, { status: 500 });
  }
}

// PATCH /api/admin/courses - Update course
export async function PATCH(request: NextRequest) {
  const auth = await checkCourseAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Course ID or slug is required.' }, { status: 400 });
    }

    const updated = updateCourse(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Course not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Course updated successfully.', course: updated });
  } catch (err) {
    console.error('[Admin Course Update Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to update course.' }, { status: 500 });
  }
}

// DELETE /api/admin/courses
export async function DELETE(request: NextRequest) {
  const auth = await checkCourseAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Course ID is required.' }, { status: 400 });
    }

    const ok = deleteCourse(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Course not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Course deleted successfully.' });
  } catch (err) {
    console.error('[Admin Course Delete Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete course.' }, { status: 500 });
  }
}
