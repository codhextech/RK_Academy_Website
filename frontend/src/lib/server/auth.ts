import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { AdminPermissions, AdminUser, findUserById, syncFromMongoDBIfNeeded } from './store';

export const COOKIE_NAME = 'rk_admin_token';

// Secret key for JWT signing
const JWT_SECRET_STRING = process.env.NEXTAUTH_SECRET || 'rk_international_language_academy_super_secure_jwt_token_key_2026';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

export interface JWTPayload {
  userId: string;
  username: string;
  name: string;
  role: 'superadmin' | 'staff';
  permissions: AdminPermissions;
}

// Password verification
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// Sign JWT Token
export async function signAdminToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7 days session
    .sign(JWT_SECRET);
}

// Verify JWT Token
export async function verifyAdminToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

// Get authenticated session from Server Components or Route Handlers
export async function getServerSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifyAdminToken(token);
    if (!payload?.userId) return null;

    await syncFromMongoDBIfNeeded();
    const user = findUserById(payload.userId);
    if (!user || !user.active) return null;

    return user;
  } catch {
    return null;
  }
}

// Get session directly from Request in Route Handlers
export async function getRequestSession(request: NextRequest): Promise<AdminUser | null> {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value ||
      request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) return null;

    const payload = await verifyAdminToken(token);
    if (!payload?.userId) return null;

    await syncFromMongoDBIfNeeded();
    const user = findUserById(payload.userId);
    if (!user || !user.active) return null;

    return user;
  } catch {
    return null;
  }
}
