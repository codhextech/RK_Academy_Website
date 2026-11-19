import { NextRequest, NextResponse } from 'next/server';
import { findUserByUsername, syncFromMongoDBIfNeeded } from '@/lib/server/store';
import { verifyPassword, signAdminToken, COOKIE_NAME } from '@/lib/server/auth';

export async function POST(request: NextRequest) {
  try {
    await syncFromMongoDBIfNeeded();
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Please provide both username and password.' },
        { status: 400 }
      );
    }

    // Lookup user by username
    const user = findUserByUsername(username);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!user.active) {
      return NextResponse.json(
        { success: false, error: 'This account has been deactivated by Super Admin. Please contact administration.' },
        { status: 403 }
      );
    }

    // Verify password hash
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signAdminToken({
      userId: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
    });

    // Create response and set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully.',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[Admin Login Error]:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
