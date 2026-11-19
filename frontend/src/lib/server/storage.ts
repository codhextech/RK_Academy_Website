import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

export interface StoredImage {
  filename: string;
  url: string;
  size: number;
  uploadedAt: string;
  provider?: 'r2' | 'local';
}

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'uploads');

// Check if Cloudflare R2 is configured via environment variables
export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME
  );
}

function getR2PublicBase(): string {
  const custom = process.env.R2_PUBLIC_DOMAIN || process.env.R2_PUBLIC_URL;
  if (custom) return custom.replace(/\/$/, '');
  return `https://${process.env.R2_ACCOUNT_ID}.r2.dev`;
}

// Get configured S3 client for Cloudflare R2
function getR2Client(): S3Client | null {
  if (!isR2Configured()) return null;

  return new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

// Ensure local upload directory exists as fallback
export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

// Save file: Uploads to Cloudflare R2 if configured; otherwise saves locally
export async function saveUploadedFile(file: File): Promise<StoredImage> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Clean filename
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const ext = path.extname(cleanName) || '.jpg';
  const baseName = path.basename(cleanName, ext);
  const uniqueFilename = `${baseName}_${Date.now()}${ext}`;

  // 1. Try Cloudflare R2 upload if configured
  if (isR2Configured()) {
    try {
      const r2 = getR2Client()!;
      const bucket = process.env.R2_BUCKET_NAME!;
      const key = `uploads/${uniqueFilename}`;

      await r2.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: buffer,
          ContentType: file.type || 'image/jpeg',
        })
      );

      // Determine public URL (supports R2_PUBLIC_DOMAIN or R2_PUBLIC_URL)
      const publicBase = getR2PublicBase();
      const publicUrl = `${publicBase}/${key}`;

      return {
        filename: uniqueFilename,
        url: publicUrl,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        provider: 'r2',
      };
    } catch (r2Error) {
      console.error('[Cloudflare R2 Upload Error, falling back to local storage]:', r2Error);
    }
  }

  // 2. Local fallback storage
  ensureUploadDir();
  const destination = path.join(UPLOAD_DIR, uniqueFilename);
  fs.writeFileSync(destination, buffer);

  const publicUrl = `/images/uploads/${uniqueFilename}`;

  return {
    filename: uniqueFilename,
    url: publicUrl,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    provider: 'local',
  };
}

// List all uploaded images (Cloudflare R2 + any non-duplicate local uploads)
export async function listUploadedFiles(): Promise<StoredImage[]> {
  const results = new Map<string, StoredImage>();

  // 1. Fetch from Cloudflare R2 if configured
  if (isR2Configured()) {
    try {
      const r2 = getR2Client()!;
      const bucket = process.env.R2_BUCKET_NAME!;
      const publicBase = getR2PublicBase();
      let continuationToken: string | undefined;

      do {
        const response = await r2.send(
          new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: 'uploads/',
            ContinuationToken: continuationToken,
          })
        );

        for (const obj of response.Contents || []) {
          if (!obj.Key || !/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(obj.Key)) {
            continue;
          }
          const filename = path.basename(obj.Key);
          results.set(filename, {
            filename,
            url: `${publicBase}/${obj.Key}`,
            size: obj.Size || 0,
            uploadedAt: (obj.LastModified || new Date()).toISOString(),
            provider: 'r2' as const,
          });
        }

        continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
      } while (continuationToken);
    } catch (r2Err) {
      console.warn('[Storage] R2 list warning, falling back to local directory:', r2Err);
    }
  }

  // 2. Also include local files (fallback or legacy local uploads not already in R2)
  try {
    ensureUploadDir();
    const files = fs.readdirSync(UPLOAD_DIR);
    for (const file of files) {
      if (!/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(file) || results.has(file)) {
        continue;
      }
      const filePath = path.join(UPLOAD_DIR, file);
      const stats = fs.statSync(filePath);
      results.set(file, {
        filename: file,
        url: `/images/uploads/${file}`,
        size: stats.size,
        uploadedAt: stats.mtime.toISOString(),
        provider: 'local' as const,
      });
    }
  } catch (err) {
    console.error('[Storage] Error reading upload directory:', err);
  }

  return Array.from(results.values()).sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
}

// Delete an uploaded image (both R2 and local)
export async function deleteUploadedFile(filename: string): Promise<boolean> {
  const safeFilename = path.basename(filename);
  let deleted = false;

  // Try R2 deletion if configured
  if (isR2Configured()) {
    try {
      const r2 = getR2Client()!;
      await r2.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: `uploads/${safeFilename}`,
        })
      );
      deleted = true;
    } catch (e) {
      console.warn('[Storage] R2 file delete warning:', e);
    }
  }

  // Local deletion
  try {
    ensureUploadDir();
    const targetPath = path.join(UPLOAD_DIR, safeFilename);
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      deleted = true;
    }
  } catch (e) {
    console.warn('[Storage] Local file delete warning:', e);
  }

  return deleted;
}
