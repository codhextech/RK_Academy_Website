import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/auth';
import {
  saveUploadedFile,
  listUploadedFiles,
  deleteUploadedFile,
  isR2Configured,
} from '@/lib/server/storage';

// Verify admin session for upload operations
async function checkAuth(request: NextRequest) {
  const sessionUser = await getRequestSession(request);
  if (!sessionUser) {
    return { ok: false, status: 401, error: 'Unauthorized. Please login.' };
  }
  return { ok: true, user: sessionUser };
}

// GET /api/admin/upload - List all uploaded images
export async function GET(request: NextRequest) {
  const auth = await checkAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const images = await listUploadedFiles();
  return NextResponse.json({
    success: true,
    images,
    r2Active: isR2Configured(),
  });
}

// POST /api/admin/upload - Handle file upload
export async function POST(request: NextRequest) {
  const auth = await checkAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image file uploaded.' }, { status: 400 });
    }

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif', 'image/jpg'];
    if (!validTypes.includes(file.type) && !/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(file.name)) {
      return NextResponse.json(
        { success: false, error: 'Only image files (JPG, PNG, WebP, GIF, SVG) are allowed.' },
        { status: 400 }
      );
    }

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Image size exceeds maximum limit of 10MB.' },
        { status: 400 }
      );
    }

    const saved = await saveUploadedFile(file);

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully.',
      image: saved,
      url: saved.url,
    });
  } catch (err) {
    console.error('[Upload Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to process file upload.' }, { status: 500 });
  }
}

// DELETE /api/admin/upload?filename=...
export async function DELETE(request: NextRequest) {
  const auth = await checkAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ success: false, error: 'Filename is required.' }, { status: 400 });
    }

    const deleted = await deleteUploadedFile(filename);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'File not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Image deleted successfully.' });
  } catch (err) {
    console.error('[Upload Delete Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete file.' }, { status: 500 });
  }
}
