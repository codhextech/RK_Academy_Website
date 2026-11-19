import dns from 'dns';
import mongoose from 'mongoose';

function ensurePublicDnsForSrv(uri: string) {
  if (!uri.startsWith('mongodb+srv://')) return;
  try {
    const servers = dns.getServers();
    const onlyLoopback =
      servers.length === 0 ||
      servers.every((s) => s === '127.0.0.1' || s === '::1' || s === 'localhost');
    if (onlyLoopback) {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    }
  } catch {
    // Ignore if DNS server inspection is unavailable
  }
}

function getSanitizedUri(): string | null {
  let uri = process.env.MONGODB_URI?.trim();
  if (!uri) return null;
  
  // If user pasted 'MONGODB_URI=mongodb+srv://...'
  if (uri.startsWith('MONGODB_URI=')) {
    uri = uri.slice('MONGODB_URI='.length).trim();
  }
  // Strip outer quotes if present
  if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
    uri = uri.slice(1, -1).trim();
  }
  // Check if scheme is valid
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    console.warn('[RK Academy] MongoDB URI is missing valid scheme (mongodb:// or mongodb+srv://)');
    return null;
  }
  // Check for placeholder passwords
  if (uri.includes('<YOUR_PASSWORD_HERE>') || uri.includes('<db_password>') || uri.includes('<YOUR_PASSWORD>')) {
    return null;
  }
  return uri;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseGlobal: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseGlobal || { conn: null, promise: null };

if (!global.mongooseGlobal) {
  global.mongooseGlobal = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = getSanitizedUri();
  if (!uri) {
    return null;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };

    ensurePublicDnsForSrv(uri);

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        console.log('[RK Academy] MongoDB Atlas connected successfully.');
        return mongooseInstance;
      })
      .catch(async (err) => {
        const msg = err instanceof Error ? err.message : String(err);
        if (uri.startsWith('mongodb+srv://') && /querySrv|ECONNREFUSED|ENOTFOUND/i.test(msg)) {
          try {
            dns.setServers(['8.8.8.8', '1.1.1.1']);
            const retried = await mongoose.connect(uri, opts);
            console.log('[RK Academy] MongoDB Atlas connected successfully (public DNS fallback).');
            return retried;
          } catch (retryErr) {
            const retryMsg = retryErr instanceof Error ? retryErr.message : String(retryErr);
            console.warn('[RK Academy] MongoDB Atlas connection warning:', retryMsg);
            cached.promise = null;
            return null;
          }
        }
        console.warn('[RK Academy] MongoDB Atlas connection warning:', msg);
        cached.promise = null;
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
