import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/auth';
import {
  getExamResults,
  addExamResult,
  updateExamResult,
  deleteExamResult,
  getAcademyEvents,
  addAcademyEvent,
  updateAcademyEvent,
  deleteAcademyEvent,
  getStudentStories,
  addStudentStory,
  updateStudentStory,
  deleteStudentStory,
  syncFromMongoDBIfNeeded,
} from '@/lib/server/store';
import { isR2Configured } from '@/lib/server/storage';

async function checkAuth(request: NextRequest) {
  const user = await getRequestSession(request);
  if (!user) {
    return { ok: false, status: 401, error: 'Unauthorized. Please login.' };
  }
  return { ok: true, user };
}

// GET /api/admin/success - List all results, events, and stories + R2 status
export async function GET() {
  try {
    await syncFromMongoDBIfNeeded();
    const examResults = getExamResults();
    const events = getAcademyEvents();
    const stories = getStudentStories();
    const r2Active = isR2Configured();

    return NextResponse.json({
      success: true,
      examResults,
      events,
      stories,
      r2Active,
    });
  } catch (err) {
    console.error('[API Success GET Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch success data.' }, { status: 500 });
  }
}

// POST /api/admin/success - Add new item (exam-result, event, or story)
export async function POST(request: NextRequest) {
  const auth = await checkAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === 'exam-result') {
      if (!data.studentName || !data.overallScore) {
        return NextResponse.json({ success: false, error: 'Student name and overall score are required.' }, { status: 400 });
      }
      const item = addExamResult(data);
      return NextResponse.json({ success: true, item, message: 'Exam result added successfully.' });
    }

    if (type === 'event') {
      if (!data.title || !data.date) {
        return NextResponse.json({ success: false, error: 'Event title and date are required.' }, { status: 400 });
      }
      const item = addAcademyEvent(data);
      return NextResponse.json({ success: true, item, message: 'Academy event added successfully.' });
    }

    if (type === 'story') {
      if (!data.name || !data.comment) {
        return NextResponse.json({ success: false, error: 'Student name and comment are required.' }, { status: 400 });
      }
      const item = addStudentStory(data);
      return NextResponse.json({ success: true, item, message: 'Student story added successfully.' });
    }

    return NextResponse.json({ success: false, error: 'Invalid item type specified.' }, { status: 400 });
  } catch (err) {
    console.error('[API Success POST Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to save item.' }, { status: 500 });
  }
}

// PUT /api/admin/success - Update an item
export async function PUT(request: NextRequest) {
  const auth = await checkAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { type, id, updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Item ID is required.' }, { status: 400 });
    }

    if (type === 'exam-result') {
      const updated = updateExamResult(id, updates);
      if (!updated) return NextResponse.json({ success: false, error: 'Exam result not found.' }, { status: 404 });
      return NextResponse.json({ success: true, item: updated, message: 'Exam result updated successfully.' });
    }

    if (type === 'event') {
      const updated = updateAcademyEvent(id, updates);
      if (!updated) return NextResponse.json({ success: false, error: 'Event not found.' }, { status: 404 });
      return NextResponse.json({ success: true, item: updated, message: 'Event updated successfully.' });
    }

    return NextResponse.json({ success: false, error: 'Invalid item type.' }, { status: 400 });
  } catch (err) {
    console.error('[API Success PUT Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to update item.' }, { status: 500 });
  }
}

// DELETE /api/admin/success?type=...&id=...
export async function DELETE(request: NextRequest) {
  const auth = await checkAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ success: false, error: 'Type and ID are required.' }, { status: 400 });
    }

    if (type === 'exam-result') {
      const deleted = deleteExamResult(id);
      return NextResponse.json({ success: deleted, message: deleted ? 'Exam result deleted.' : 'Item not found.' });
    }

    if (type === 'event') {
      const deleted = deleteAcademyEvent(id);
      return NextResponse.json({ success: deleted, message: deleted ? 'Event deleted.' : 'Item not found.' });
    }

    if (type === 'story') {
      const deleted = deleteStudentStory(id);
      return NextResponse.json({ success: deleted, message: deleted ? 'Story deleted.' : 'Item not found.' });
    }

    return NextResponse.json({ success: false, error: 'Invalid type specified.' }, { status: 400 });
  } catch (err) {
    console.error('[API Success DELETE Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete item.' }, { status: 500 });
  }
}
