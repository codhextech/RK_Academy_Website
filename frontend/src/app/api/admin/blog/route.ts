import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/auth';
import { R2_MEDIA } from '@/lib/constants';
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  syncFromMongoDBIfNeeded,
} from '@/lib/server/store';

// Helper to check blog access
async function checkBlogAccess(request: NextRequest) {
  const sessionUser = await getRequestSession(request);
  if (!sessionUser) {
    return { ok: false, status: 401, error: 'Unauthorized. Please login.' };
  }
  if (sessionUser.role !== 'superadmin' && !sessionUser.permissions?.blog) {
    return { ok: false, status: 403, error: 'Forbidden: You do not have permission to manage blog articles.' };
  }
  return { ok: true, user: sessionUser };
}

// GET /api/admin/blog
export async function GET(request: NextRequest) {
  const auth = await checkBlogAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  await syncFromMongoDBIfNeeded();
  const blogs = getAllBlogs();
  return NextResponse.json({ success: true, blogs });
}

// POST /api/admin/blog - Create article
export async function POST(request: NextRequest) {
  const auth = await checkBlogAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { title, slug, category, date, readTime, author, authorRole, image, excerpt, content, published } = body;

    if (!title || !excerpt) {
      return NextResponse.json({ success: false, error: 'Title and excerpt are required.' }, { status: 400 });
    }

    const blog = createBlog({
      title: title.trim(),
      slug: slug ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') : title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: category || 'Tips & Strategy',
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      readTime: readTime || '5 min read',
      author: author || auth.user?.name || 'RK Academy Master Trainer',
      authorRole: authorRole || 'Senior IELTS Specialist',
      image: image || R2_MEDIA.courses.ieltsUkvi,
      excerpt: excerpt.trim(),
      content: content ? content.trim() : excerpt.trim(),
      published: published !== undefined ? Boolean(published) : true,
    });

    return NextResponse.json({ success: true, message: 'Article created successfully.', blog });
  } catch (err) {
    console.error('[Admin Blog Create Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to create article.' }, { status: 500 });
  }
}

// PATCH /api/admin/blog - Update article
export async function PATCH(request: NextRequest) {
  const auth = await checkBlogAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { slug, ...updates } = body;

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Article slug is required.' }, { status: 400 });
    }

    const updated = updateBlog(slug, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Article not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Article updated successfully.', blog: updated });
  } catch (err) {
    console.error('[Admin Blog Update Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to update article.' }, { status: 500 });
  }
}

// DELETE /api/admin/blog
export async function DELETE(request: NextRequest) {
  const auth = await checkBlogAccess(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Article slug is required.' }, { status: 400 });
    }

    const ok = deleteBlog(slug);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Article not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Article deleted successfully.' });
  } catch (err) {
    console.error('[Admin Blog Delete Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete article.' }, { status: 500 });
  }
}
