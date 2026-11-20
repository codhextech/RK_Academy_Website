import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { ACADEMY_COURSES, CourseDetail } from '../coursesData';
import { ACADEMY_FACULTY_AND_STAFF } from '../trainersData';
import { BLOG_POSTS } from '../blogData';
import {
  ExamResultItem,
  AcademyEventItem,
  StudentStoryItem,
  INITIAL_EXAM_RESULTS,
  INITIAL_ACADEMY_EVENTS,
  INITIAL_STUDENT_STORIES,
} from '../successData';
import { R2_MEDIA } from '../constants';
import { connectToDatabase } from './mongodb';

export interface AdminPermissions {
  enquiries: boolean;
  courses: boolean;
  trainers: boolean;
  blog: boolean;
  settings: boolean;
  testimonials: boolean;
}

export interface AdminUser {
  id: string;
  username: string; // Used for login (no email needed)
  name: string;     // Display name (e.g. "Director RK" or "Staff Sarah")
  passwordHash: string;
  role: 'superadmin' | 'staff';
  permissions: AdminPermissions;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AcademySettings {
  maxAdmins: number; // Super Admin controls total admin quantity limit
  academyName: string;
  tagline: string;
  phone: string;      // Combined display (e.g. 074 0224 355 / 076 744 5019)
  phone1: string;     // Mobile 1 / Hotline 1
  phone2: string;     // Mobile 2 / Hotline 2
  whatsapp: string;
  email: string;
  address: string;
  officeHours: string;
  announcement: string;
  logoUrl?: string;
  watermarkUrl?: string;
  heroClassroomUrl?: string;
  campusImageUrl?: string;
}

export interface InquiryItem {
  id: string;
  type: 'contact' | 'register' | 'quick-lead';
  // Official Registration Form fields (Matching RK Academy Paper Form)
  regNo?: string;                  // 01. Registration. No
  firstName?: string;              // 01. First Name
  lastName?: string;               // 01. Last Name
  fullName: string;                // Full Name
  dob?: string;                    // 01. Date of Birth
  streetAddress?: string;          // 02. Address - Street Address
  city?: string;                   // 02. Address - City
  stateProvince?: string;          // 02. Address - State / Province
  zipCode?: string;                // 02. Address - Zip Code
  email?: string;                  // 03. Contact - Email
  phone: string;                   // 03. Contact - Mobile
  whatsapp?: string;               // 03. Contact - WhatsApp
  referral?: string;               // 04. Referral Details (Friends / Social Media / Individual / Other)
  courseCategory?: string;         // 05. Course Details (English / Sinhala / Information Technology / French / Other)
  coursePreference?: string;       // Specific Course Title
  details?: string;                // 06. Details / Background / Goals
  message?: string;                // Additional notes or remarks
  preferredMode?: 'offline' | 'online'; // 07. Mode of Study (Physical / Online)
  duration?: string;               // 08. Duration
  totalFee?: string | number;      // 09. Course Fees Total
  paymentMethod?: 'cash' | 'check' | 'card' | 'other' | string; // 10. Method of Payment
  termsAccepted?: boolean;         // 11. Term and conditions
  signature?: string;              // 11. Signature of student/Guardian
  signatureDate?: string;          // 11. Date
  status: 'new' | 'contacted' | 'enrolled' | 'lost';
  notes: {
    id: string;
    text: string;
    author: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface CourseModuleItem {
  number: string;
  title: string;
  description: string;
  topics?: string[];
  durationHours?: number;
}

export interface AdminCourse {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  category: string;
  tag?: string;
  duration: string;
  modes: string;
  campus?: string;
  admissionsStatus?: string;
  feeLKR?: number;
  targetAudience?: string;
  description: string;
  longDescription?: string;
  curriculumHighlights?: string[];
  modules?: CourseModuleItem[];
  image?: string;
  active: boolean;
  updatedAt: string;
}

export interface AdminTrainer {
  id: string;
  name: string;
  role: string;
  badge: string;
  image: string;
  organizationOrUniversity?: string;
  qualifications: string[];
  specialties: string[];
  active: boolean;
  updatedAt: string;
}

export interface AdminBlog {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  excerpt: string;
  content?: string;
  published: boolean;
  updatedAt: string;
}

export interface StoreData {
  users: AdminUser[];
  settings: AcademySettings;
  enquiries: InquiryItem[];
  courses: AdminCourse[];
  trainers: AdminTrainer[];
  blogs: AdminBlog[];
  examResults?: ExamResultItem[];
  events?: AcademyEventItem[];
  stories?: StudentStoryItem[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Initial seed data
function getInitialStore(): StoreData {
  const initialPasswordHash = bcrypt.hashSync('admin123', 10);

  const initialCourses: AdminCourse[] = ACADEMY_COURSES.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    shortTitle: c.shortTitle,
    category: c.category,
    tag: c.tag,
    duration: c.duration,
    modes: c.modes,
    targetAudience: c.targetAudience,
    description: c.description,
    longDescription: c.longDescription || c.description,
    campus: c.campus || 'A-9 Road, Kilinochchi',
    admissionsStatus: c.admissionsStatus || 'Now Enrolling',
    image: c.image,
    curriculumHighlights: c.curriculumHighlights ? [...c.curriculumHighlights] : [],
    modules: c.modules
      ? c.modules.map((m) => ({
          number: m.number,
          title: m.title,
          description: m.description,
          topics: m.topics ? [...m.topics] : [],
          durationHours: m.durationHours,
        }))
      : [],
    active: true,
    updatedAt: new Date().toISOString(),
  }));

  const initialTrainers: AdminTrainer[] = ACADEMY_FACULTY_AND_STAFF.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.role,
    badge: t.badge,
    image: t.image,
    organizationOrUniversity: t.organizationOrUniversity || 'RK International Language Academy',
    qualifications: [...t.qualifications],
    specialties: [...t.specialties],
    active: true,
    updatedAt: new Date().toISOString(),
  }));

  const initialBlogs: AdminBlog[] = BLOG_POSTS.map((b) => ({
    slug: b.slug,
    title: b.title,
    category: b.category,
    date: b.date,
    readTime: b.readTime,
    author: b.author,
    authorRole: b.authorRole,
    image: b.image,
    excerpt: b.excerpt,
    content: b.excerpt,
    published: true,
    updatedAt: new Date().toISOString(),
  }));

  return {
    users: [
      {
        id: 'user_superadmin_01',
        username: 'superadmin',
        name: 'Academy Director (Super Admin)',
        passwordHash: initialPasswordHash,
        role: 'superadmin',
        permissions: {
          enquiries: true,
          courses: true,
          trainers: true,
          blog: true,
          settings: true,
          testimonials: true,
        },
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'user_staff_01',
        username: 'staff',
        name: 'Front Desk Counselor',
        passwordHash: bcrypt.hashSync('staff123', 10),
        role: 'staff',
        permissions: {
          enquiries: true,
          courses: false,
          trainers: false,
          blog: false,
          settings: false,
          testimonials: false,
        },
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    settings: {
      maxAdmins: 5,
      academyName: 'RK International Language Academy',
      tagline: 'The Way of Success - IELTS & English Academy',
      phone: '074 0224 355 / 076 744 5019',
      phone1: '074 0224 355',
      phone2: '076 744 5019',
      whatsapp: '94740224355',
      email: 'rkacademykili@gmail.com',
      address: 'A-9 Road, Near Theresamma Kovil, Kilinochchi',
      officeHours: 'Monday – Saturday: 8:30 AM – 6:00 PM',
      announcement: 'Admissions open for next weekend & weekday IELTS batches! Register online for special fee discount.',
      logoUrl: R2_MEDIA.brand.logo,
      watermarkUrl: R2_MEDIA.brand.watermark,
      heroClassroomUrl: R2_MEDIA.brand.heroClassroom,
      campusImageUrl: R2_MEDIA.brand.campusWorkshop,
    },
    enquiries: [
      {
        id: 'enq_01',
        type: 'register',
        fullName: 'Kabilan Selvarajah',
        phone: '077 1234567',
        whatsapp: '94771234567',
        email: 'kabilan.s@gmail.com',
        coursePreference: 'IELTS Academic Intensive (Target 7.5+)',
        preferredMode: 'offline',
        message: 'Looking for upcoming weekend batch starting next month.',
        status: 'new',
        notes: [],
        createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
      },
      {
        id: 'enq_02',
        type: 'contact',
        fullName: 'Tharshi Sivanathan',
        phone: '076 9876543',
        whatsapp: '94769876543',
        email: 'tharshi99@gmail.com',
        coursePreference: 'PTE Academic Fast-Track',
        preferredMode: 'online',
        message: 'Need urgent 1-on-1 coaching for Australia visa application.',
        status: 'contacted',
        notes: [
          {
            id: 'note_1',
            text: 'Called student. Explained online schedule. Sent syllabus on WhatsApp.',
            author: 'staff',
            createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
          },
        ],
        createdAt: new Date(Date.now() - 3600 * 1000 * 26).toISOString(),
      },
      {
        id: 'enq_03',
        type: 'quick-lead',
        fullName: 'Aravind Kumar',
        phone: '074 4455667',
        whatsapp: '94744455667',
        coursePreference: 'Basic Diploma in English',
        preferredMode: 'offline',
        message: 'Interested in physical classes in Kilinochchi.',
        status: 'enrolled',
        notes: [
          {
            id: 'note_2',
            text: 'Enrolled in Batch 14. Registration fee paid.',
            author: 'superadmin',
            createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
          },
        ],
        createdAt: new Date(Date.now() - 3600 * 1000 * 50).toISOString(),
      },
    ],
    courses: initialCourses,
    trainers: initialTrainers,
    blogs: initialBlogs,
    examResults: [...INITIAL_EXAM_RESULTS],
    events: [...INITIAL_ACADEMY_EVENTS],
    stories: [...INITIAL_STUDENT_STORIES],
  };
}

// In-memory cache to reduce disk I/O
let memoryStore: StoreData | null = null;

export function getStore(): StoreData {
  if (memoryStore) {
    return memoryStore;
  }

  ensureDataDir();

  if (!fs.existsSync(STORE_PATH)) {
    const initial = getInitialStore();
    fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
    memoryStore = initial;
    return initial;
  }

  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw);

    // Auto-migrate missing fields if existing store.json is from previous version
    let needsSave = false;

    if (!parsed.courses || parsed.courses.length === 0) {
      parsed.courses = ACADEMY_COURSES.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        shortTitle: c.shortTitle,
        category: c.category,
        tag: c.tag,
        duration: c.duration,
        modes: c.modes,
        targetAudience: c.targetAudience,
        description: c.description,
    longDescription: c.longDescription || c.description,
    campus: c.campus || 'A-9 Road, Kilinochchi',
    admissionsStatus: c.admissionsStatus || 'Now Enrolling',
    image: c.image,
    curriculumHighlights: c.curriculumHighlights ? [...c.curriculumHighlights] : [],
    modules: c.modules
      ? c.modules.map((m) => ({
          number: m.number,
          title: m.title,
          description: m.description,
          topics: m.topics ? [...m.topics] : [],
          durationHours: m.durationHours,
        }))
      : [],
        active: true,
        updatedAt: new Date().toISOString(),
      }));
      needsSave = true;
    }

    if (!parsed.trainers || parsed.trainers.length === 0) {
      parsed.trainers = ACADEMY_FACULTY_AND_STAFF.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        badge: t.badge,
        image: t.image,
        organizationOrUniversity: t.organizationOrUniversity || 'RK International Language Academy',
        qualifications: [...t.qualifications],
        specialties: [...t.specialties],
        active: true,
        updatedAt: new Date().toISOString(),
      }));
      needsSave = true;
    }

    if (!parsed.blogs || parsed.blogs.length === 0) {
      parsed.blogs = BLOG_POSTS.map((b) => ({
        slug: b.slug,
        title: b.title,
        category: b.category,
        date: b.date,
        readTime: b.readTime,
        author: b.author,
        authorRole: b.authorRole,
        image: b.image,
        excerpt: b.excerpt,
        content: b.excerpt,
        published: true,
        updatedAt: new Date().toISOString(),
      }));
      needsSave = true;
    }

    if (!parsed.settings.phone1) {
      parsed.settings.phone1 = '074 0224 355';
      needsSave = true;
    }
    if (!parsed.settings.phone2) {
      parsed.settings.phone2 = '076 744 5019';
      needsSave = true;
    }

    // Auto-enrich existing courses with full details, modules, highlights, and images
    if (parsed.courses) {
      for (const course of parsed.courses) {
        const base = ACADEMY_COURSES.find((c) => c.slug === course.slug || c.id === course.id);
        if (base) {
          if (!course.image) {
            course.image = base.image;
            needsSave = true;
          }
          if (!course.longDescription) {
            course.longDescription = base.longDescription || base.description;
            needsSave = true;
          }
          if (!course.admissionsStatus) {
            course.admissionsStatus = 'Now Enrolling';
            needsSave = true;
          }
          if (!course.campus) {
            course.campus = 'A-9 Road, Kilinochchi';
            needsSave = true;
          }
          if (!course.tag && base.tag) {
            course.tag = base.tag;
            needsSave = true;
          }
          if (!course.shortTitle && base.shortTitle) {
            course.shortTitle = base.shortTitle;
            needsSave = true;
          }
          if (!course.curriculumHighlights || course.curriculumHighlights.length === 0) {
            course.curriculumHighlights = base.curriculumHighlights ? [...base.curriculumHighlights] : [];
            needsSave = true;
          }
          if (!course.modules || course.modules.length === 0) {
            course.modules = base.modules
              ? base.modules.map((m, idx) => ({
                  number: m.number || `Module ${idx + 1}`,
                  title: m.title || '',
                  description: m.description || '',
                  topics: m.topics || [],
                  durationHours: m.durationHours,
                }))
              : [];
            needsSave = true;
          }
        }
      }
    }

    if (!parsed.settings.logoUrl) {
      parsed.settings.logoUrl = R2_MEDIA.brand.logo;
      needsSave = true;
    }
    if (!parsed.settings.watermarkUrl) {
      parsed.settings.watermarkUrl = R2_MEDIA.brand.watermark;
      needsSave = true;
    }
    if (!parsed.settings.heroClassroomUrl) {
      parsed.settings.heroClassroomUrl = R2_MEDIA.brand.heroClassroom;
      needsSave = true;
    }
    if (!parsed.settings.campusImageUrl) {
      parsed.settings.campusImageUrl = R2_MEDIA.brand.campusWorkshop;
      needsSave = true;
    }
    if (
      !Array.isArray(parsed.examResults) ||
      parsed.examResults.some(
        (r: any) =>
          r.id === 'res-1' ||
          (typeof r.scorecardImage === 'string' && r.scorecardImage.startsWith('/images/'))
      )
    ) {
      parsed.examResults = [...INITIAL_EXAM_RESULTS];
      needsSave = true;
    }
    if (
      !Array.isArray(parsed.events) ||
      parsed.events.some(
        (e: any) =>
          e.id === 'evt-1' ||
          (typeof e.image === 'string' && e.image.startsWith('/images/'))
      )
    ) {
      parsed.events = [...INITIAL_ACADEMY_EVENTS];
      needsSave = true;
    }
    if (
      !Array.isArray(parsed.stories) ||
      parsed.stories.some(
        (s: any) =>
          s.id === 'sty-1' ||
          (typeof s.handwrittenImage === 'string' && s.handwrittenImage.startsWith('/images/')) ||
          (typeof s.avatar === 'string' && s.avatar.startsWith('/images/'))
      )
    ) {
      parsed.stories = [...INITIAL_STUDENT_STORIES];
      needsSave = true;
    }

    if (needsSave) {
      fs.writeFileSync(STORE_PATH, JSON.stringify(parsed, null, 2), 'utf8');
    }

    memoryStore = parsed;
    return memoryStore!;
  } catch (err) {
    console.error('[Store] Failed to read store file, falling back to initial seed:', err);
    const initial = getInitialStore();
    memoryStore = initial;
    return initial;
  }
}

let lastMongoSyncTime = 0;
const SYNC_TTL_MS = 15000;
let pendingWritePromise: Promise<void> | null = null;
let pendingReadPromise: Promise<StoreData> | null = null;

function stripMongoDoc<T extends object>(doc: T): T {
  if (!doc || typeof doc !== 'object') return doc;
  const copy = { ...(doc as Record<string, unknown>) };
  delete copy._id;
  return copy as T;
}

function stripMongoIds<T extends object>(docs: T[]): T[] {
  return docs.map((d) => stripMongoDoc(d));
}

async function syncStoreToMongoDB(store: StoreData) {
  try {
    const mongooseInstance = await connectToDatabase();
    if (!mongooseInstance || !mongooseInstance.connection?.db) return;
    const db = mongooseInstance.connection.db;

    if (store.settings) {
      await db.collection('settings').replaceOne({}, { ...stripMongoDoc(store.settings), updatedAt: new Date().toISOString() }, { upsert: true });
    }
    if (store.courses && store.courses.length > 0) {
      const col = db.collection('courses');
      await col.deleteMany({});
      await col.insertMany(stripMongoIds(store.courses));
    }
    if (store.trainers && store.trainers.length > 0) {
      const col = db.collection('trainers');
      await col.deleteMany({});
      await col.insertMany(stripMongoIds(store.trainers));
    }
    if (store.blogs && store.blogs.length > 0) {
      const col = db.collection('blogs');
      await col.deleteMany({});
      await col.insertMany(stripMongoIds(store.blogs));
    }
    if (store.users && store.users.length > 0) {
      const col = db.collection('users');
      await col.deleteMany({});
      await col.insertMany(stripMongoIds(store.users));
    }
    if (store.enquiries && store.enquiries.length > 0) {
      const col = db.collection('enquiries');
      await col.deleteMany({});
      await col.insertMany(stripMongoIds(store.enquiries));
    }
    if (store.examResults) {
      const col = db.collection('examresults');
      await col.deleteMany({});
      if (store.examResults.length > 0) {
        await col.insertMany(stripMongoIds(store.examResults));
      }
    }
    if (store.events) {
      const col = db.collection('events');
      await col.deleteMany({});
      if (store.events.length > 0) {
        await col.insertMany(stripMongoIds(store.events));
      }
    }
    if (store.stories) {
      const col = db.collection('stories');
      await col.deleteMany({});
      if (store.stories.length > 0) {
        await col.insertMany(stripMongoIds(store.stories));
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[Store] MongoDB async sync notice:', msg);
  }
}

export function saveStore(store: StoreData) {
  memoryStore = store;
  ensureDataDir();
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.error('[Store] Failed to persist store to file:', err);
  }
  // Asynchronously sync to MongoDB Atlas without blocking responses
  lastMongoSyncTime = Date.now();
  const prevWrite = pendingWritePromise || Promise.resolve();
  const writeOp = prevWrite
    .catch(() => {})
    .then(() => syncStoreToMongoDB(store))
    .catch(() => {})
    .finally(() => {
      if (pendingWritePromise === writeOp) {
        pendingWritePromise = null;
      }
    });
  pendingWritePromise = writeOp;
}

export async function syncFromMongoDBIfNeeded(force = false): Promise<StoreData> {
  if (pendingWritePromise) {
    try {
      await pendingWritePromise;
    } catch {
      // Ignore write error so read can still proceed safely
    }
  }

  if (!force && memoryStore && Date.now() - lastMongoSyncTime < SYNC_TTL_MS) {
    return memoryStore;
  }

  if (pendingReadPromise) {
    return pendingReadPromise;
  }

  pendingReadPromise = (async () => {
    const localStore = getStore();
    try {
      const mongooseInstance = await connectToDatabase();
      if (!mongooseInstance || !mongooseInstance.connection?.db) {
        lastMongoSyncTime = Date.now();
        return localStore;
      }

      const db = mongooseInstance.connection.db;
      const [
        mongoSettings,
        mongoCourses,
        mongoTrainers,
        mongoBlogs,
        mongoUsers,
        mongoEnquiries,
        mongoExamResults,
        mongoEvents,
        mongoStories,
      ] = await Promise.all([
        db.collection('settings').findOne({}),
        db.collection('courses').find({}).toArray(),
        db.collection('trainers').find({}).toArray(),
        db.collection('blogs').find({}).toArray(),
        db.collection('users').find({}).toArray(),
        db.collection('enquiries').find({}).toArray(),
        db.collection('examresults').find({}).toArray(),
        db.collection('events').find({}).toArray(),
        db.collection('stories').find({}).toArray(),
      ]);

      const nextStore: StoreData = {
        ...localStore,
      };

      if (mongoSettings) {
        const cleanedSettings = stripMongoDoc(mongoSettings) as Partial<AcademySettings> & { updatedAt?: string };
        delete cleanedSettings.updatedAt;
        const phone1 = cleanedSettings.phone1 || localStore.settings.phone1 || '074 0224 355';
        const phone2 = cleanedSettings.phone2 || localStore.settings.phone2 || '076 744 5019';
        nextStore.settings = {
          ...localStore.settings,
          ...cleanedSettings,
          phone1,
          phone2,
          phone: cleanedSettings.phone || `${phone1} / ${phone2}`,
          logoUrl: cleanedSettings.logoUrl || localStore.settings.logoUrl || R2_MEDIA.brand.logo,
          watermarkUrl: cleanedSettings.watermarkUrl || localStore.settings.watermarkUrl || R2_MEDIA.brand.watermark,
          heroClassroomUrl:
            cleanedSettings.heroClassroomUrl || localStore.settings.heroClassroomUrl || R2_MEDIA.brand.heroClassroom,
          campusImageUrl:
            cleanedSettings.campusImageUrl || localStore.settings.campusImageUrl || R2_MEDIA.brand.campusWorkshop,
        };
      }

      if (mongoCourses.length > 0) {
        nextStore.courses = stripMongoIds(mongoCourses).map((doc) => {
          const c = doc as unknown as AdminCourse;
          const base = ACADEMY_COURSES.find((b) => b.slug === c.slug || b.id === c.id);
          return {
            ...c,
            image: c.image || base?.image || R2_MEDIA.courses.ieltsUkvi,
            longDescription: c.longDescription || base?.longDescription || c.description,
            admissionsStatus: c.admissionsStatus || base?.admissionsStatus || 'Now Enrolling',
            campus: c.campus || base?.campus || 'A-9 Road, Kilinochchi',
            curriculumHighlights:
              c.curriculumHighlights && c.curriculumHighlights.length > 0
                ? c.curriculumHighlights
                : base?.curriculumHighlights || [],
            modules:
              c.modules && c.modules.length > 0
                ? c.modules
                : base?.modules?.map((m, idx) => ({
                    number: m.number || `Module ${idx + 1}`,
                    title: m.title || '',
                    description: m.description || '',
                    topics: m.topics || [],
                    durationHours: m.durationHours,
                  })) || [],
          };
        });
      }

      if (mongoTrainers.length > 0) {
        nextStore.trainers = stripMongoIds(mongoTrainers).map((doc) => {
          const t = doc as unknown as AdminTrainer;
          return {
            ...t,
            image: t.image || R2_MEDIA.trainers.nepethika,
          };
        });
      }

      if (mongoBlogs.length > 0) {
        nextStore.blogs = stripMongoIds(mongoBlogs).map((doc) => {
          const b = doc as unknown as AdminBlog;
          return {
            ...b,
            image: b.image || R2_MEDIA.courses.ieltsUkvi,
          };
        });
      }

      if (mongoUsers.length > 0) {
        nextStore.users = stripMongoIds(mongoUsers) as unknown as AdminUser[];
      }

      if (mongoEnquiries.length > 0) {
        nextStore.enquiries = stripMongoIds(mongoEnquiries) as unknown as InquiryItem[];
      }

      if (mongoExamResults.length > 0) {
        if (
          mongoExamResults.some(
            (r: any) =>
              r.id === 'res-1' ||
              r.id === 'res-2' ||
              (typeof r.scorecardImage === 'string' && r.scorecardImage.startsWith('/images/'))
          )
        ) {
          nextStore.examResults = [...INITIAL_EXAM_RESULTS];
          try {
            const col = db.collection('examresults');
            await col.deleteMany({});
            await col.insertMany(stripMongoIds(INITIAL_EXAM_RESULTS));
            console.log('[Store] Auto-migrated 7 official exam scorecards (Cloudflare R2) to MongoDB Atlas');
          } catch (migrateErr) {
            console.warn('[Store] Mongo migration error for examresults:', migrateErr);
          }
        } else {
          nextStore.examResults = stripMongoIds(mongoExamResults) as unknown as ExamResultItem[];
        }
      } else {
        nextStore.examResults = [...INITIAL_EXAM_RESULTS];
        try {
          const col = db.collection('examresults');
          await col.insertMany(stripMongoIds(INITIAL_EXAM_RESULTS));
        } catch {
          // ignore
        }
      }

      if (mongoEvents.length > 0) {
        if (
          mongoEvents.some(
            (e: any) =>
              e.id === 'evt-1' ||
              (typeof e.image === 'string' && e.image.startsWith('/images/'))
          )
        ) {
          nextStore.events = [...INITIAL_ACADEMY_EVENTS];
          try {
            const col = db.collection('events');
            await col.deleteMany({});
            await col.insertMany(stripMongoIds(INITIAL_ACADEMY_EVENTS));
            console.log('[Store] Auto-migrated 10 authentic Academy Events & Workshops (Cloudflare R2) to MongoDB Atlas');
          } catch (migrateErr) {
            console.warn('[Store] Mongo migration error for events:', migrateErr);
          }
        } else {
          nextStore.events = stripMongoIds(mongoEvents) as unknown as AcademyEventItem[];
        }
      } else {
        nextStore.events = [...INITIAL_ACADEMY_EVENTS];
        try {
          const col = db.collection('events');
          await col.insertMany(stripMongoIds(INITIAL_ACADEMY_EVENTS));
        } catch {
          // ignore
        }
      }

      if (mongoStories.length > 0) {
        if (
          mongoStories.some(
            (s: any) =>
              s.id === 'sty-1' ||
              (typeof s.handwrittenImage === 'string' && s.handwrittenImage.startsWith('/images/')) ||
              (typeof s.avatar === 'string' && s.avatar.startsWith('/images/'))
          )
        ) {
          nextStore.stories = [...INITIAL_STUDENT_STORIES];
          try {
            const col = db.collection('stories');
            await col.deleteMany({});
            await col.insertMany(stripMongoIds(INITIAL_STUDENT_STORIES));
            console.log('[Store] Auto-migrated 18 handwritten reviews (Cloudflare R2) to MongoDB Atlas');
          } catch (migrateErr) {
            console.warn('[Store] Mongo migration error:', migrateErr);
          }
        } else {
          nextStore.stories = stripMongoIds(mongoStories) as unknown as StudentStoryItem[];
        }
      } else {
        nextStore.stories = [...INITIAL_STUDENT_STORIES];
        try {
          const col = db.collection('stories');
          await col.insertMany(stripMongoIds(INITIAL_STUDENT_STORIES));
        } catch {
          // ignore
        }
      }

      memoryStore = nextStore;
      lastMongoSyncTime = Date.now();

      try {
        ensureDataDir();
        fs.writeFileSync(STORE_PATH, JSON.stringify(nextStore, null, 2), 'utf8');
      } catch {
        // Ignore disk write failure on read-only environments
      }

      return nextStore;
    } catch (err) {
      console.warn('[Store] MongoDB async read notice:', err instanceof Error ? err.message : String(err));
      lastMongoSyncTime = Date.now();
      return localStore;
    } finally {
      pendingReadPromise = null;
    }
  })();

  return pendingReadPromise;
}

// --- USER OPERATIONS ---
export function findUserByUsername(username: string): AdminUser | undefined {
  const store = getStore();
  const clean = username.trim().toLowerCase();
  return store.users.find((u) => u.username.toLowerCase() === clean);
}

export function findUserById(id: string): AdminUser | undefined {
  const store = getStore();
  return store.users.find((u) => u.id === id);
}

export function getAllUsers(): Omit<AdminUser, 'passwordHash'>[] {
  const store = getStore();
  return store.users.map(({ passwordHash, ...rest }) => rest);
}

export function createAdminUser(userData: {
  username: string;
  name: string;
  password: string;
  role: 'superadmin' | 'staff';
  permissions: AdminPermissions;
}): { success: boolean; error?: string; user?: Omit<AdminUser, 'passwordHash'> } {
  const store = getStore();

  const maxLimit = store.settings.maxAdmins || 5;
  if (store.users.length >= maxLimit) {
    return {
      success: false,
      error: `Admin quantity limit reached (${store.users.length}/${maxLimit}). Super Admin must increase the Admin Limit in Settings to add more.`,
    };
  }

  const cleanUsername = userData.username.trim().toLowerCase();
  if (cleanUsername.length < 3) {
    return { success: false, error: 'Username must be at least 3 characters long.' };
  }

  const existing = findUserByUsername(cleanUsername);
  if (existing) {
    return { success: false, error: 'A user with this username already exists.' };
  }

  if (userData.password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const newUser: AdminUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    username: cleanUsername,
    name: userData.name.trim() || cleanUsername,
    passwordHash: bcrypt.hashSync(userData.password, 10),
    role: userData.role,
    permissions: userData.role === 'superadmin'
      ? { enquiries: true, courses: true, trainers: true, blog: true, settings: true, testimonials: true }
      : userData.permissions,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.users.push(newUser);
  saveStore(store);

  const { passwordHash, ...safeUser } = newUser;
  return { success: true, user: safeUser };
}

export function updateAdminUser(
  id: string,
  updates: {
    name?: string;
    role?: 'superadmin' | 'staff';
    permissions?: Partial<AdminPermissions>;
    active?: boolean;
    password?: string;
  }
): { success: boolean; error?: string; user?: Omit<AdminUser, 'passwordHash'> } {
  const store = getStore();
  const user = store.users.find((u) => u.id === id);

  if (!user) {
    return { success: false, error: 'User not found.' };
  }

  if (user.username === 'superadmin' && updates.active === false) {
    return { success: false, error: 'Cannot deactivate the primary superadmin account.' };
  }

  if (updates.name !== undefined) user.name = updates.name.trim();
  if (updates.role !== undefined) user.role = updates.role;
  if (updates.active !== undefined) user.active = updates.active;
  if (updates.password && updates.password.trim().length >= 6) {
    user.passwordHash = bcrypt.hashSync(updates.password.trim(), 10);
  }

  if (updates.permissions) {
    if (user.role === 'superadmin') {
      user.permissions = {
        enquiries: true,
        courses: true,
        trainers: true,
        blog: true,
        settings: true,
        testimonials: true,
      };
    } else {
      user.permissions = {
        ...user.permissions,
        ...updates.permissions,
      };
    }
  }

  user.updatedAt = new Date().toISOString();
  saveStore(store);

  const { passwordHash, ...safeUser } = user;
  return { success: true, user: safeUser };
}

export function deleteAdminUser(id: string): { success: boolean; error?: string } {
  const store = getStore();
  const userIndex = store.users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return { success: false, error: 'User not found.' };
  }

  const user = store.users[userIndex];
  if (user.username === 'superadmin') {
    return { success: false, error: 'The primary superadmin account cannot be deleted.' };
  }

  store.users.splice(userIndex, 1);
  saveStore(store);
  return { success: true };
}

// --- SETTINGS OPERATIONS ---
export function getAcademySettings(): AcademySettings {
  const settings = getStore().settings;
  if (!settings.phone1) settings.phone1 = '074 0224 355';
  if (!settings.phone2) settings.phone2 = '076 744 5019';
  if (!settings.phone) settings.phone = `${settings.phone1} / ${settings.phone2}`;
  if (!settings.logoUrl) settings.logoUrl = R2_MEDIA.brand.logo;
  if (!settings.watermarkUrl) settings.watermarkUrl = R2_MEDIA.brand.watermark;
  if (!settings.heroClassroomUrl) settings.heroClassroomUrl = R2_MEDIA.brand.heroClassroom;
  if (!settings.campusImageUrl) settings.campusImageUrl = R2_MEDIA.brand.campusWorkshop;
  return settings;
}

export function updateAcademySettings(updates: Partial<AcademySettings>): AcademySettings {
  const store = getStore();
  const p1 = updates.phone1 || store.settings.phone1 || '074 0224 355';
  const p2 = updates.phone2 || store.settings.phone2 || '076 744 5019';
  
  store.settings = {
    ...store.settings,
    ...updates,
    phone1: p1,
    phone2: p2,
    phone: updates.phone || `${p1} / ${p2}`,
  };
  saveStore(store);
  return store.settings;
}

// --- ENQUIRIES OPERATIONS ---
export function getAllEnquiries(): InquiryItem[] {
  const store = getStore();
  return [...store.enquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addEnquiry(item: Omit<InquiryItem, 'id' | 'createdAt' | 'notes' | 'status'>): InquiryItem {
  const store = getStore();
  const newEnquiry: InquiryItem = {
    ...item,
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    status: 'new',
    notes: [],
    createdAt: new Date().toISOString(),
  };

  store.enquiries.unshift(newEnquiry);
  saveStore(store);
  return newEnquiry;
}

export function updateEnquiryStatus(
  id: string,
  status: InquiryItem['status'],
  newNote?: { text: string; author: string }
): { success: boolean; enquiry?: InquiryItem } {
  const store = getStore();
  const enq = store.enquiries.find((e) => e.id === id);
  if (!enq) return { success: false };

  enq.status = status;
  if (newNote && newNote.text.trim()) {
    enq.notes.push({
      id: `note_${Date.now()}`,
      text: newNote.text.trim(),
      author: newNote.author,
      createdAt: new Date().toISOString(),
    });
  }

  saveStore(store);
  return { success: true, enquiry: enq };
}

export function updateEnquiryFull(
  id: string,
  updates: Partial<InquiryItem>,
  newNote?: { text: string; author: string }
): { success: boolean; enquiry?: InquiryItem } {
  const store = getStore();
  const enq = store.enquiries.find((e) => e.id === id);
  if (!enq) return { success: false };

  Object.assign(enq, updates);

  if (newNote && newNote.text.trim()) {
    enq.notes.push({
      id: `note_${Date.now()}`,
      text: newNote.text.trim(),
      author: newNote.author,
      createdAt: new Date().toISOString(),
    });
  }

  saveStore(store);
  return { success: true, enquiry: enq };
}

export function deleteEnquiry(id: string): boolean {
  const store = getStore();
  const index = store.enquiries.findIndex((e) => e.id === id);
  if (index === -1) return false;
  store.enquiries.splice(index, 1);
  saveStore(store);
  return true;
}

// --- COURSES OPERATIONS ---
export function getAllCourses(): AdminCourse[] {
  return getStore().courses || [];
}

export function getCourseById(id: string): AdminCourse | undefined {
  return (getStore().courses || []).find((c) => c.id === id || c.slug === id);
}

export function getLiveCourseBySlug(slug: string): CourseDetail | undefined {
  const store = getStore();
  const normalized = (slug || '').trim().toLowerCase();

  let matchedSlug = normalized;
  if (normalized === 'pte' || normalized === 'pte-academic-exam-preparation' || normalized === 'pte-core') {
    matchedSlug = 'pte-academic';
  } else if (normalized === 'it' || normalized === 'diploma-it') {
    matchedSlug = 'diploma-in-it';
  } else if (normalized === 'sinhala' || normalized === 'diploma-sinhala') {
    matchedSlug = 'diploma-in-sinhala';
  }

  const storedCourse = (store.courses || []).find(
    (c) => c.slug.toLowerCase() === matchedSlug || c.id === matchedSlug
  );
  const baseCourse = ACADEMY_COURSES.find(
    (c) => c.slug.toLowerCase() === matchedSlug || c.id === matchedSlug
  );

  if (!storedCourse && !baseCourse) return undefined;

  const base = baseCourse || ({} as Partial<CourseDetail>);
  const stored = storedCourse || ({} as Partial<AdminCourse>);

  return {
    ...base,
    id: stored.id || base.id || matchedSlug,
    slug: stored.slug || base.slug || matchedSlug,
    title: stored.title || base.title || '',
    shortTitle: stored.shortTitle || base.shortTitle || stored.title || base.title || '',
    tag: stored.tag ?? base.tag ?? '',
    category: (stored.category || base.category || 'English & Exams') as CourseDetail['category'],
    image: stored.image || base.image || R2_MEDIA.courses.ieltsUkvi,
    badgeBg: base.badgeBg || 'bg-sky-50 text-[#0A3663] border border-sky-200',
    accentColor: base.accentColor || 'border-[#0098DA]',
    popular: base.popular ?? false,
    featured: base.featured ?? false,
    duration: stored.duration || base.duration || '8 Weeks',
    modes: stored.modes || base.modes || 'In-Person & Live Online',
    campus: stored.campus || 'A-9 Road, Kilinochchi',
    admissionsStatus: stored.admissionsStatus || 'Now Enrolling',
    targetAudience: stored.targetAudience || base.targetAudience || '',
    description: stored.description || base.description || '',
    longDescription: stored.longDescription || base.longDescription || stored.description || base.description || '',
    curriculumHighlights: stored.curriculumHighlights && stored.curriculumHighlights.length > 0
      ? stored.curriculumHighlights
      : (base.curriculumHighlights || []),
    modules: ((stored.modules && stored.modules.length > 0 ? stored.modules : base.modules || []) as Array<Partial<CourseModuleItem> & { num?: string; desc?: string; points?: string[] }>).map((m, idx) => ({
      number: m.number || m.num || `Module ${idx + 1}`,
      title: m.title || '',
      description: m.description || m.desc || '',
      topics: m.topics || m.points || [],
      durationHours: m.durationHours,
    })),
    keyComponents: base.keyComponents,
    optionalModules: base.optionalModules,
    examFormat: base.examFormat,
    tipsForSuccess: base.tipsForSuccess,
    active: stored.active ?? true,
    feeLKR: stored.feeLKR,
  } as CourseDetail;
}

export function createCourse(data: Omit<AdminCourse, 'id' | 'updatedAt'>): AdminCourse {
  const store = getStore();
  if (!store.courses) store.courses = [];

  const slug = data.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newCourse: AdminCourse = {
    ...data,
    id: `course_${Date.now()}`,
    slug: slug || `course-${Date.now()}`,
    updatedAt: new Date().toISOString(),
  };

  store.courses.unshift(newCourse);
  saveStore(store);
  return newCourse;
}

export function updateCourse(id: string, updates: Partial<AdminCourse>): AdminCourse | null {
  const store = getStore();
  if (!store.courses) store.courses = [];

  const index = store.courses.findIndex((c) => c.id === id || c.slug === id);
  if (index === -1) return null;

  store.courses[index] = {
    ...store.courses[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveStore(store);
  return store.courses[index];
}

export function deleteCourse(id: string): boolean {
  const store = getStore();
  if (!store.courses) return false;

  const index = store.courses.findIndex((c) => c.id === id || c.slug === id);
  if (index === -1) return false;

  store.courses.splice(index, 1);
  saveStore(store);
  return true;
}

// --- TRAINERS OPERATIONS ---
export function getAllTrainers(): AdminTrainer[] {
  return getStore().trainers || [];
}

export function getTrainerById(id: string): AdminTrainer | undefined {
  return (getStore().trainers || []).find((t) => t.id === id);
}

export function createTrainer(data: Omit<AdminTrainer, 'id' | 'updatedAt'>): AdminTrainer {
  const store = getStore();
  if (!store.trainers) store.trainers = [];

  const newTrainer: AdminTrainer = {
    ...data,
    id: `trainer_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    updatedAt: new Date().toISOString(),
  };

  store.trainers.push(newTrainer);
  saveStore(store);
  return newTrainer;
}

export function updateTrainer(id: string, updates: Partial<AdminTrainer>): AdminTrainer | null {
  const store = getStore();
  if (!store.trainers) store.trainers = [];

  const index = store.trainers.findIndex((t) => t.id === id);
  if (index === -1) return null;

  store.trainers[index] = {
    ...store.trainers[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveStore(store);
  return store.trainers[index];
}

export function deleteTrainer(id: string): boolean {
  const store = getStore();
  if (!store.trainers) return false;

  const index = store.trainers.findIndex((t) => t.id === id);
  if (index === -1) return false;

  store.trainers.splice(index, 1);
  saveStore(store);
  return true;
}

// --- BLOGS OPERATIONS ---
export function getAllBlogs(): AdminBlog[] {
  return getStore().blogs || [];
}

export function getBlogBySlug(slug: string): AdminBlog | undefined {
  return (getStore().blogs || []).find((b) => b.slug === slug);
}

export function createBlog(data: Omit<AdminBlog, 'updatedAt'>): AdminBlog {
  const store = getStore();
  if (!store.blogs) store.blogs = [];

  const slug = data.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newBlog: AdminBlog = {
    ...data,
    slug: slug || `post-${Date.now()}`,
    updatedAt: new Date().toISOString(),
  };

  store.blogs.unshift(newBlog);
  saveStore(store);
  return newBlog;
}

export function updateBlog(slug: string, updates: Partial<AdminBlog>): AdminBlog | null {
  const store = getStore();
  if (!store.blogs) store.blogs = [];

  const index = store.blogs.findIndex((b) => b.slug === slug);
  if (index === -1) return null;

  store.blogs[index] = {
    ...store.blogs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveStore(store);
  return store.blogs[index];
}

export function deleteBlog(slug: string): boolean {
  const store = getStore();
  if (!store.blogs) return false;

  const index = store.blogs.findIndex((b) => b.slug === slug);
  if (index === -1) return false;

  store.blogs.splice(index, 1);
  saveStore(store);
  return true;
}


// -------------------------------------------------------------
// Exam Results & Scorecards CRUD
// -------------------------------------------------------------
export function getExamResults(): ExamResultItem[] {
  const store = getStore();
  return store.examResults || [];
}

export function addExamResult(data: Omit<ExamResultItem, 'id'>): ExamResultItem {
  const store = getStore();
  if (!store.examResults) store.examResults = [];

  const newItem: ExamResultItem = {
    ...data,
    id: `res-${Date.now()}`,
  };

  store.examResults.unshift(newItem);
  saveStore(store);
  return newItem;
}

export function updateExamResult(id: string, updates: Partial<ExamResultItem>): ExamResultItem | null {
  const store = getStore();
  if (!store.examResults) store.examResults = [];

  const index = store.examResults.findIndex((r) => r.id === id);
  if (index === -1) return null;

  store.examResults[index] = {
    ...store.examResults[index],
    ...updates,
  };

  saveStore(store);
  return store.examResults[index];
}

export function deleteExamResult(id: string): boolean {
  const store = getStore();
  if (!store.examResults) return false;

  const index = store.examResults.findIndex((r) => r.id === id);
  if (index === -1) return false;

  store.examResults.splice(index, 1);
  saveStore(store);
  return true;
}

// -------------------------------------------------------------
// Academy Events CRUD
// -------------------------------------------------------------
export function getAcademyEvents(): AcademyEventItem[] {
  const store = getStore();
  return store.events || [];
}

export function addAcademyEvent(data: Omit<AcademyEventItem, 'id'>): AcademyEventItem {
  const store = getStore();
  if (!store.events) store.events = [];

  const newItem: AcademyEventItem = {
    ...data,
    id: `evt-${Date.now()}`,
  };

  store.events.unshift(newItem);
  saveStore(store);
  return newItem;
}

export function updateAcademyEvent(id: string, updates: Partial<AcademyEventItem>): AcademyEventItem | null {
  const store = getStore();
  if (!store.events) store.events = [];

  const index = store.events.findIndex((e) => e.id === id);
  if (index === -1) return null;

  store.events[index] = {
    ...store.events[index],
    ...updates,
  };

  saveStore(store);
  return store.events[index];
}

export function deleteAcademyEvent(id: string): boolean {
  const store = getStore();
  if (!store.events) return false;

  const index = store.events.findIndex((e) => e.id === id);
  if (index === -1) return false;

  store.events.splice(index, 1);
  saveStore(store);
  return true;
}

// -------------------------------------------------------------
// Student Stories CRUD
// -------------------------------------------------------------
export function getStudentStories(): StudentStoryItem[] {
  const store = getStore();
  return store.stories || [];
}

export function addStudentStory(data: Omit<StudentStoryItem, 'id'>): StudentStoryItem {
  const store = getStore();
  if (!store.stories) store.stories = [];

  const newItem: StudentStoryItem = {
    ...data,
    id: `sty-${Date.now()}`,
  };

  store.stories.unshift(newItem);
  saveStore(store);
  return newItem;
}

export function updateStudentStory(id: string, updates: Partial<StudentStoryItem>): StudentStoryItem | null {
  const store = getStore();
  if (!store.stories) return null;

  const index = store.stories.findIndex((s) => s.id === id);
  if (index === -1) return null;

  store.stories[index] = {
    ...store.stories[index],
    ...updates,
  };

  saveStore(store);
  return store.stories[index];
}

export function deleteStudentStory(id: string): boolean {
  const store = getStore();
  if (!store.stories) return false;

  const index = store.stories.findIndex((s) => s.id === id);
  if (index === -1) return false;

  store.stories.splice(index, 1);
  saveStore(store);
  return true;
}
