export const R2_PUBLIC_BASE = 'https://pub-ff33384a505c4c0ab3bda1c1e0b82151.r2.dev';

export const R2_MEDIA = {
  brand: {
    logo: `${R2_PUBLIC_BASE}/uploads/rk-logo.png`,
    watermark: `${R2_PUBLIC_BASE}/uploads/rk-logo.png`,
    heroClassroom: `${R2_PUBLIC_BASE}/uploads/campus-hero-classroom.jpg`,
    campusWorkshop: `${R2_PUBLIC_BASE}/uploads/campus-kilinochchi-workshop.jpg`,
  },
  trainers: {
    nepethika: `${R2_PUBLIC_BASE}/uploads/nepethika-nesakumaran.jpg`,
    seniorLecturer: `${R2_PUBLIC_BASE}/uploads/ielts-senior-lecturer.jpg`,
    kamshaliny: `${R2_PUBLIC_BASE}/uploads/kamshaliny-raju-peradeniya.jpg`,
    kamshalinyAlt: `${R2_PUBLIC_BASE}/uploads/kamshaliny-raju.jpg`,
    paskaran: `${R2_PUBLIC_BASE}/uploads/paskaran-ezhilsanth.jpg`,
  },
  courses: {
    ieltsUkvi: `${R2_PUBLIC_BASE}/uploads/course-ielts-ukvi.jpg`,
    pteAcademic: `${R2_PUBLIC_BASE}/uploads/course-pte-academic.jpg`,
    diplomaEnglish: `${R2_PUBLIC_BASE}/uploads/course-diploma-english.jpg`,
    diplomaIt: `${R2_PUBLIC_BASE}/uploads/course-diploma-it.jpg`,
    diplomaSinhala: `${R2_PUBLIC_BASE}/uploads/course-diploma-sinhala.jpg`,
    frenchDelf: `${R2_PUBLIC_BASE}/uploads/course-french-delf.jpg`,
    dutchDeutsch: `${R2_PUBLIC_BASE}/uploads/course-dutch-deutsch.jpg`,
  },
  blogs: {
    pteVsIelts: `${R2_PUBLIC_BASE}/uploads/course-ielts-ukvi.jpg`,
    academicVsGeneral: `${R2_PUBLIC_BASE}/uploads/blog-ielts-academic-vs-general.jpg`,
    britishCouncilVsIdp: `${R2_PUBLIC_BASE}/uploads/campus-hero-classroom.jpg`,
    ukStudentVisa: `${R2_PUBLIC_BASE}/uploads/blog-uk-student-visa.jpg`,
    canadaClb9: `${R2_PUBLIC_BASE}/uploads/student-tharani-canada.jpg`,
    australiaMigration: `${R2_PUBLIC_BASE}/uploads/student-pratheepan-australia.jpg`,
    jaffnaKilinochchi: `${R2_PUBLIC_BASE}/uploads/course-diploma-english.jpg`,
    writingTask2: `${R2_PUBLIC_BASE}/uploads/blog-writing-task2-template.jpg`,
    pteDictation: `${R2_PUBLIC_BASE}/uploads/course-pte-academic.jpg`,
    spokenConfidence: `${R2_PUBLIC_BASE}/uploads/blog-spoken-english-confidence.jpg`,
  },
  students: {
    nimalanAvatar: `${R2_PUBLIC_BASE}/uploads/student-nimalan-avatar.jpg`,
    tharaniAvatar: `${R2_PUBLIC_BASE}/uploads/student-tharani-canada.jpg`,
    ketheeswaranAvatar: `${R2_PUBLIC_BASE}/uploads/student-ketheeswaran-avatar.jpg`,
    dilakshanAvatar: `${R2_PUBLIC_BASE}/uploads/student-dilakshan-avatar.jpg`,
    vaishnaviAvatar: `${R2_PUBLIC_BASE}/uploads/student-vaishnavi-avatar.jpg`,
    pratheepanAvatar: `${R2_PUBLIC_BASE}/uploads/student-pratheepan-australia.jpg`,
    defaultAvatar: `${R2_PUBLIC_BASE}/uploads/student-default-avatar.jpg`,
    scorecardTrf1: `${R2_PUBLIC_BASE}/uploads/scorecard-sample-trf-1.jpg`,
    scorecardTrf2: `${R2_PUBLIC_BASE}/uploads/scorecard-sample-trf-2.jpg`,
    scorecardTrf3: `${R2_PUBLIC_BASE}/uploads/course-ielts-ukvi.jpg`,
    scorecardTrf4: `${R2_PUBLIC_BASE}/uploads/scorecard-sample-trf-4.jpg`,
    eventWorkshop: `${R2_PUBLIC_BASE}/uploads/campus-kilinochchi-workshop.jpg`,
    eventCeremony: `${R2_PUBLIC_BASE}/uploads/campus-hero-classroom.jpg`,
    eventMockExam: `${R2_PUBLIC_BASE}/uploads/course-pte-academic.jpg`,
    eventShowcase: `${R2_PUBLIC_BASE}/uploads/event-public-speaking-showcase.jpg`,
  },
} as const;

export const ACADEMY_INFO = {
  name: 'RK International Language Academy',
  shortName: 'RK Academy',
  tagline: 'The Way of Success',
  phone: '074 0224 355',
  phoneFormatted: '+94 74 022 4355 / +94 76 744 5019',
  phone1: '074 0224 355',
  phone1Formatted: '+94 74 022 4355',
  phone1Raw: '0740224355',
  phone2: '076 744 5019',
  phone2Formatted: '+94 76 744 5019',
  phone2Raw: '0767445019',
  phoneDisplay: '074 0224 355 / 076 744 5019',
  phones: [
    { number: '074 0224 355', formatted: '+94 74 022 4355', raw: '0740224355', label: 'Hotline 1' },
    { number: '076 744 5019', formatted: '+94 76 744 5019', raw: '0767445019', label: 'Hotline 2' },
  ],
  whatsappNumber: '94740224355',
  whatsappDisplay: '074 0224 355',
  email: 'rkacademykili@gmail.com',
  address: 'A-9 Road, Near Theresamma Kovil, Kilinochchi',
  city: 'Kilinochchi',
  district: 'Northern Province',
  country: 'Sri Lanka',
  googleMapsUrl: 'https://maps.google.com/?q=A-9+Road+Near+Theresamma+Kovil+Kilinochchi',
  whatsappPreFilledMsg: encodeURIComponent('Hi RK International Language Academy, I would like to inquire about IELTS & English classes in Kilinochchi.'),
};

export const ACADEMY_VISION = {
  title: 'Our Vision',
  quote:
    'To empower a generation of confident, knowledgeable and globally competent individuals who can communicate without barriers, embrace opportunities and succeed anywhere in the world.',
};

export const ACADEMY_MISSION = {
  title: 'Our Mission',
  statement:
    'At RK International Language Academy, our mission is to transform learners into confident communicators and lifelong achievers by providing high-quality language education, internationally recognised learning opportunities and practical skills for a successful future.',
  commitmentsTitle: 'We are committed to:',
  commitments: [
    'Developing excellent English communication and language skills.',
    'Preparing students for international examinations such as IELTS and Cambridge.',
    'Providing opportunities to learn world languages, including German and French.',
    'Developing essential IT, academic and professional skills.',
    'Building confidence, creativity, leadership and critical thinking.',
    'Creating an inspiring, supportive and student-centred learning environment.',
    'Guiding learners towards higher education and global opportunities.',
  ],
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Courses',
    href: '/ielts-courses',
    dropdown: [
      { label: 'IELTS & UKVI (Academic & General)', href: '/ielts-courses/academic', desc: 'UKVI, University & PR Visas + Life Skills A1/B1' },
      { label: 'PTE Exam Prep (Academic & Core)', href: '/ielts-courses/pte-academic', desc: 'Australia/UK study & Canada PR (PTE Core)' },
      { label: 'Basic Diploma in English', href: '/ielts-courses/basic-diploma-english', desc: 'Grammar, vocabulary, speaking & study skills' },
      { label: 'Diploma in Information Technology', href: '/ielts-courses/diploma-in-it', desc: 'Programming, web design, DBMS & networking' },
      { label: 'Diploma in Sinhala Language', href: '/ielts-courses/diploma-in-sinhala', desc: 'National language proficiency & translation' },
      { label: 'French DELF Exam (A1 & A2)', href: '/ielts-courses/french-delf', desc: 'Official French Ministry certification' },
      { label: 'Dutch & Deutsch (German)', href: '/ielts-courses/dutch-deutsch', desc: '9 structured modules for Europe migration' },
    ],
  },
  { label: 'Online Classes', href: '/online-ielts-classes' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Success Stories', href: '/student-success' },
  { label: 'Contact', href: '/contact' },
];

export const WHY_CHOOSE_US_IELTS = [
  {
    title: 'Expert Trainers',
    description: 'Learn from certified, experienced instructors who understand the exam formats and scoring criteria inside out.',
    icon: 'GraduationCap',
  },
  {
    title: 'Personalized Coaching',
    description: 'Focused one-on-one attention addressing your unique strengths and weaknesses to push your band score higher.',
    icon: 'UserCheck',
  },
  {
    title: 'Comprehensive Curriculum',
    description: 'Covering all test sections with ample practice materials, mock exams, and real test simulations.',
    icon: 'BookOpen',
  },
  {
    title: 'Proven Success',
    description: 'High student success rates with many achieving their target bands and scores (Band 7.0 – 8.5).',
    icon: 'Trophy',
  },
  {
    title: 'Flexible Schedules',
    description: 'Classes designed to fit your busy lifestyle—offered both online and offline (weekday & weekend slots).',
    icon: 'Calendar',
  },
  {
    title: 'Exam Registration Assistance',
    description: 'We guide you through the British Council registration process to make it hassle-free.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Supportive Learning Environment',
    description: 'Friendly, motivating, and focused on your progress and confidence-building.',
    icon: 'HeartHandshake',
  },
];

export const WHY_DIPLOMA_SPOKEN_ENGLISH = [
  {
    title: 'Enhances Communication Skills',
    description: 'English is a global language. Strong speaking and writing skills open doors to better communication in academic, professional, and social settings.',
    icon: 'MessageSquare',
  },
  {
    title: 'Boosts Career Opportunities',
    description: 'Many employers worldwide seek candidates with good English proficiency. A diploma proves your language skills and increases your employability.',
    icon: 'Briefcase',
  },
  {
    title: 'Supports Academic Success',
    description: 'English proficiency is essential for students aiming to study abroad or excel in higher education where English is the medium of instruction.',
    icon: 'Award',
  },
  {
    title: 'Facilitates Exam Preparation',
    description: 'A solid foundation in English helps students perform better in exams like IELTS, PTE, TOEFL, and other language tests.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Improves Networking',
    description: 'Being fluent in English allows you to connect with people globally, expanding personal and professional networks.',
    icon: 'Globe',
  },
  {
    title: 'Builds Confidence',
    description: 'Spoken English training helps overcome language barriers and boosts confidence in everyday conversations, interviews, and presentations.',
    icon: 'Sparkles',
  },
];
