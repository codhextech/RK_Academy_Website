import { R2_MEDIA } from './constants';

export interface ExamResultItem {
  id: string;
  studentName: string;
  examType: 'IELTS Academic' | 'IELTS General' | 'PTE Academic' | 'IELTS Life Skills' | 'Skills for English' | 'Diploma in English' | string;
  overallScore: string;       // e.g. 'Band 8.0', 'Band 7.5', 'PTE 79+'
  scores: string;             // e.g. 'L: 8.5 | R: 8.0 | W: 7.5 | S: 7.5'
  destination: string;        // e.g. 'MSc in UK (Univ. of Manchester)', 'Canada PR'
  avatar: string;             // Student photo or placeholder
  scorecardImage: string;     // Official TRF / result certificate image
  date: string;
  verified: boolean;
  quote?: string;
}

export interface AcademyEventItem {
  id: string;
  title: string;
  category: 'Workshop' | 'Seminar' | 'Ceremony' | 'Mock Exam' | 'Academy Life';
  date: string;
  location: string;
  image: string;              // Event photo
  description: string;
  badgeText?: string;
  featured?: boolean;
}

export interface StudentStoryItem {
  id: string;
  name: string;
  course: string;
  destination: string;
  overallScore: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  verified: boolean;
  handwrittenImage?: string; // High-res authentic handwritten note image
  originalTamil?: string;    // Original Tamil text if written in Tamil
}

// Initial Exam Results — 100% Authentic Official Exam Scorecards (Names Masked for Privacy)
export const INITIAL_EXAM_RESULTS: ExamResultItem[] = [
  {
    id: 'res-01',
    studentName: 'D****n T.',
    examType: 'IELTS General',
    overallScore: 'Band 5.5',
    scores: 'L: 5.5 | R: 5.5 | W: 5.5 | S: 6.0',
    destination: 'Canada Work Permit & Express Entry Pathway',
    avatar: R2_MEDIA.students.dilakshanAvatar,
    scorecardImage: '/images/results/scorecard-01.jpg',
    date: 'April 2025',
    verified: true,
    quote: 'Achieved Band 5.5 with balanced scores across all 4 modules. The daily speaking mock test drills in Kilinochchi gave me the exact foundation I needed.',
  },
  {
    id: 'res-02',
    studentName: 'R****i K.',
    examType: 'PTE Academic',
    overallScore: 'PTE 64 (Band 7.0+ Eqv)',
    scores: 'Writing: 74 | Speaking: 63 | Listening: 62 | Reading: 59',
    destination: 'Australia Skilled Migration Visa',
    avatar: R2_MEDIA.students.tharaniAvatar,
    scorecardImage: '/images/results/scorecard-02.jpg',
    date: 'December 2025',
    verified: true,
    quote: 'Scored 74 in Writing and 64 overall in PTE Academic! RK Academy\'s computerized mock test lab and prompt essay corrections made this high score possible.',
  },
  {
    id: 'res-03',
    studentName: 'K****n M.',
    examType: 'PTE Academic',
    overallScore: 'PTE 57 (Band 6.0+ Eqv)',
    scores: 'Writing: 67 | Reading: 63 | Listening: 54 | Speaking: 51',
    destination: 'UK & New Zealand Study / Work Visa',
    avatar: R2_MEDIA.students.nimalanAvatar,
    scorecardImage: '/images/results/scorecard-03.jpg',
    date: 'March 2026',
    verified: true,
    quote: 'PTE score 57 achieved on first try! The targeted writing templates and reading techniques at RK Academy helped me exceed my visa requirement.',
  },
  {
    id: 'res-04',
    studentName: 'S****a P.',
    examType: 'IELTS Life Skills',
    overallScore: 'A1 PASS (CEFR A1)',
    scores: 'Speaking & Listening: PASS (First Attempt)',
    destination: 'UK Spouse / Settlement Visa',
    avatar: R2_MEDIA.students.vaishnaviAvatar,
    scorecardImage: '/images/results/scorecard-04.jpg',
    date: 'October 2026',
    verified: true,
    quote: 'Passed IELTS Life Skills A1 with flying colors! British Council exam room confidence coaching in Kilinochchi eliminated all exam anxiety.',
  },
  {
    id: 'res-05',
    studentName: 'T****i S.',
    examType: 'PTE Academic',
    overallScore: 'PTE 53 (Band 6.0 Eqv)',
    scores: 'Speaking: 60 | Writing: 57 | Reading: 53 | Listening: 50',
    destination: 'Global Career & Skilled Migration',
    avatar: R2_MEDIA.students.pratheepanAvatar,
    scorecardImage: '/images/results/scorecard-05.jpg',
    date: 'January 2026',
    verified: true,
    quote: 'Cleared PTE Academic with Score 60 in Speaking and 53 overall. The continuous support and feedback from trainers at RK Academy made the journey smooth.',
  },
  {
    id: 'res-06',
    studentName: 'P****n S.',
    examType: 'IELTS General',
    overallScore: 'Band 4.5 (Writing 5.5)',
    scores: 'Writing: 5.5 | Speaking: 4.5 | Reading: 4.0 | Listening: 3.5',
    destination: 'Vocational Training & Skilled Employment',
    avatar: R2_MEDIA.students.ketheeswaranAvatar,
    scorecardImage: '/images/results/scorecard-06.jpg',
    date: 'June 2025',
    verified: true,
    quote: 'Secured Band 5.5 in Writing and cleared the IELTS requirements for my overseas vocational pathway with RK Academy\'s structured guidance.',
  },
  {
    id: 'res-07',
    studentName: 'A****o K.',
    examType: 'Skills for English',
    overallScore: 'A1 PASS (SELT UKVI)',
    scores: 'A1 Listening: PASS | A1 Speaking: PASS',
    destination: 'UKVI Approved Visa Requirement',
    avatar: R2_MEDIA.students.defaultAvatar,
    scorecardImage: '/images/results/scorecard-07.jpg',
    date: 'September 2026',
    verified: true,
    quote: 'Passed the official PSI Skills for English SELT exam in Colombo with A1 Speaking and Listening pass marks. Truly grateful to the RK Academy team.',
  },
];

// Initial Academy Events
export const INITIAL_ACADEMY_EVENTS: AcademyEventItem[] = [
  {
    id: 'evt-1',
    title: 'British Council & Pearson Test Day Orientation Workshop',
    category: 'Workshop',
    date: 'November 2026',
    location: 'RK International Kilinochchi Center',
    image: R2_MEDIA.students.eventWorkshop,
    description:
      'Official exam orientation detailing test-day procedures, ID verification requirements, and mock speaking test simulation for upcoming test takers.',
    badgeText: 'Official Orientation',
    featured: true,
  },
  {
    id: 'evt-2',
    title: 'High Achievers Certificate Distribution Ceremony',
    category: 'Ceremony',
    date: 'October 2026',
    location: 'Main Auditorium, Kilinochchi',
    image: R2_MEDIA.students.eventCeremony,
    description:
      'Honoring our students who scored Band 7.5+ and PTE 70+ in recent exam sessions, joined by faculty lecturers and parents.',
    badgeText: 'Award Ceremony',
    featured: true,
  },
  {
    id: 'evt-3',
    title: 'Free Full-Length IELTS Mock Exam Simulation Hall',
    category: 'Mock Exam',
    date: 'September 2026',
    location: 'RK Computer & Audio Lab',
    image: R2_MEDIA.students.eventMockExam,
    description:
      'Simulated exam conditions with official timer, headphone-equipped audio listening, and immediate one-on-one examiner feedback.',
    badgeText: 'Exam Simulation',
    featured: false,
  },
  {
    id: 'evt-4',
    title: 'Spoken English & Public Speaking Presentation Day',
    category: 'Academy Life',
    date: 'August 2026',
    location: 'RK Kilinochchi Center',
    image: R2_MEDIA.students.eventShowcase,
    description:
      'Diploma and spoken English students delivering presentations on global topics to build public speaking confidence.',
    badgeText: 'Student Showcase',
    featured: false,
  },
];

// 18 Authentic Handwritten Student Reviews with Privacy-Masked Names
export const INITIAL_STUDENT_STORIES: StudentStoryItem[] = [
  {
    id: 'fb-01',
    name: 'K****n M.',
    course: 'Comprehensive English Coaching',
    destination: 'Higher Studies & Career Growth',
    overallScore: 'Teacher Kamshalini Mentorship',
    rating: 5,
    avatar: '/images/trainers/kamshalini-raju.jpg',
    date: 'October 2026',
    comment:
      'I am truly blessed to study under Teacher Kamshalini. To someone like me who didn\'t even know what English was, she taught me what English really is — I am forever indebted to her. Having such a dedicated teacher is a true gift, and I thank God for this opportunity. I wish to continue studying under Teacher Kamshalini in all my future courses.',
    originalTamil:
      'Kamshalini teacher ஆசிரியரிடம் நான் படிப்பதற்கு உண்மையிலேயே கொடுத்து வைத்திருக்கணும். English என்றால் என்னவென்று தெரியாத எனக்கு இதுதான் English என்று சொல்லி தந்த எனது ஆசிரியருக்கு என்றும் நான் கடமைப்பட்டிருக்கிறேன். இவ்வாறான ஆசிரியர் கிடைப்பது மிக மிக அந்த வரத்தை எனக்கு கொடுத்த இறைவனுக்கு நன்றி. இனிவரும் நாட்களிலும் Kamshalini ஆசிரியரிடம் நான் கல்வி கற்க விரும்புகிறேன்.',
    handwrittenImage: '/images/feedback/feedback-01.jpg',
    verified: true,
  },
  {
    id: 'fb-02',
    name: 'D****h K.',
    course: 'Spoken & Written English Course',
    destination: 'Confidence in Speaking & Writing',
    overallScore: '4 Skills Mastery',
    rating: 5,
    avatar: R2_MEDIA.students.nimalanAvatar,
    date: 'October 2026',
    comment:
      'I am very happy to have attended this English course. The classes were very interesting, useful, and easy to understand. The teacher explained every lesson clearly and encouraged us to speak in English with confidence. This course helped me improve my speaking, listening, reading, and writing skills. Thank you to the teacher for your hard work and support.',
    handwrittenImage: '/images/feedback/feedback-02.jpg',
    verified: true,
  },
  {
    id: 'fb-03',
    name: 'N****n S.',
    course: 'Diploma in English',
    destination: 'Academic & Professional Presentations',
    overallScore: 'Presentation Mastered',
    rating: 5,
    avatar: R2_MEDIA.students.ketheeswaranAvatar,
    date: 'September 2026',
    comment:
      'I have learned a lot of new things in the English Diploma. I prefer to study at RK English Language Academy. Doing a presentation in English was my first time ever, but after completing it, I fully understood how to present with clarity and confidence. I am very happy to study in the class of RK International Language Academy.',
    handwrittenImage: '/images/feedback/feedback-03.jpg',
    verified: true,
  },
  {
    id: 'fb-04',
    name: 'A****i T.',
    course: 'English Language & Presentation Skills',
    destination: 'Public Speaking Confidence',
    overallScore: 'First Presentation Success',
    rating: 5,
    avatar: R2_MEDIA.students.tharaniAvatar,
    date: 'September 2026',
    comment:
      'I have learned many valuable things here. Doing a presentation in English was the first time in my life, and the guidance helped me overcome my fear. Thank you miss for encouraging me.',
    handwrittenImage: '/images/feedback/feedback-04.jpg',
    verified: true,
  },
  {
    id: 'fb-05',
    name: 'S****n B.',
    course: 'Practical English & Grammar',
    destination: 'Grammar & Fluency Building',
    overallScore: 'Core Skills Solidified',
    rating: 5,
    avatar: R2_MEDIA.students.pratheepanAvatar,
    date: 'June 2024',
    comment:
      'I am writing to provide feedback on my experience in the class. They have made complex topics so much easier to understand. Additionally, the practice exercises have been valuable in reinforcing what we\'ve learned in class. Overall, I am very satisfied with the progress I am making and look forward to continuing to build my English skills.',
    handwrittenImage: '/images/feedback/feedback-05.jpg',
    verified: true,
  },
  {
    id: 'fb-06',
    name: 'K****r R.',
    course: 'English & IT Dual Diploma',
    destination: 'Dual Diploma Career Path',
    overallScore: 'Vocabulary & Tech English',
    rating: 5,
    avatar: R2_MEDIA.students.nimalanAvatar,
    date: 'October 2026',
    comment:
      'In RK International Language Academy, the classes are very useful and I can understand every lesson through easy methods. Within a few days of joining the class, I learned more vocabulary and new concepts. Everything is comfortable to study. I prefer to study here for a long time. I am learning English and IT Diploma, and I trust I will be well educated after finishing my courses.',
    handwrittenImage: '/images/feedback/feedback-06.jpg',
    verified: true,
  },
  {
    id: 'fb-07',
    name: 'S****a M.',
    course: 'English Level - II (IELTS Foundation)',
    destination: 'Preparing for IELTS Examination',
    overallScore: 'Level II Completed',
    rating: 5,
    avatar: R2_MEDIA.students.tharaniAvatar,
    date: 'September 2026',
    comment:
      'When I first joined, my knowledge regarding English was minimal. Now I have successfully completed Level - II. The teacher instructed us in a wonderful manner, which gave me immense interest and enthusiasm for English. I am confident that continuing to study here will prepare me exceptionally well for my IELTS examination.',
    originalTamil:
      'நான் வரும் போது English சம்பந்தமான அறிவு குறைவாகவே இருந்தது. தற்போது Level - II வரை நிறைவு செய்துள்ளேன். எனக்கு கற்பித்த ஆசிரியர் மிகவும் நல்ல முறையில் கற்பித்தார். இவருடைய கற்பித்தலால் English பாடத்தில் எனக்கு ஆர்வமும் விருப்பமும் ஏற்பட்டது. தொடர்ந்து இவரிடம் கற்பதால் IELTSக்கு என்னை நல்ல முறையில் தயார்படுத்த முடியும் என நம்புகிறேன்.',
    handwrittenImage: '/images/feedback/feedback-07.jpg',
    verified: true,
  },
  {
    id: 'fb-08',
    name: 'V****a K.',
    course: 'Comprehensive English Coaching',
    destination: 'Personalized Language Growth',
    overallScore: 'Step-by-Step Guidance',
    rating: 5,
    avatar: R2_MEDIA.students.vaishnaviAvatar,
    date: 'August 2026',
    comment:
      'Before joining here, I had only basic knowledge of English. But after studying here, I can clearly feel my English proficiency growing. The main reason is our teacher Miss Kamshalini. She understands each student\'s starting level and tailors her guidance to help us progress step-by-step.',
    originalTamil:
      'நான் இங்கு வரும் போது முன்னைய ஆங்கிலத்தில் ஓரளவு அறிவுடன் கற்றிருந்தேன். ஆனால் இங்கு வந்த பின்னர் ஆங்கிலம் தொடர்பான அறிவு சற்று அதிகரித்துள்ளதை என்னால் உணர முடிகிறது. இதற்கு காரணம் எனது வகுப்பாசிரியர் கம்சாலினி Miss அவர்கள். அவர் நான் எந்த நிலையில் இங்கு வந்திருக்கின்றேன் என்று புரிந்து கொண்டும் எப்படி வழிநடத்தலாம் என்று தெரிந்து கொண்டும் அதற்கேற்றவாறு கற்பிப்பார்.',
    handwrittenImage: '/images/feedback/feedback-08.jpg',
    verified: true,
  },
  {
    id: 'fb-09',
    name: 'J****h T.',
    course: 'English & Assessment Track',
    destination: 'Rigorous Test Readiness',
    overallScore: 'Practice Exam Excellence',
    rating: 5,
    avatar: R2_MEDIA.students.ketheeswaranAvatar,
    date: 'September 2026',
    comment:
      'You conducted many practice exams for us — some were simple and others were challenging. Please continue holding regular exams as it pushes us to master new skills and concepts. All the faculty members taught us with outstanding dedication.',
    originalTamil:
      'நீங்கள் எங்களுக்கு பல பரீட்சைகள் நடாத்தினீர்கள். அவை இலகுவாகவும் சில கடினமாகவும் இருந்தது. நீங்கள் தொடர்ந்து பரீட்சை வையுங்கள் அது எங்களுக்கு புது விடயங்களை கற்றுக்கொள்வதற்கு உதவியாக இருக்கும். கற்பித்த அனைத்து ஆசிரியர்களும் சிறப்பாக கற்பித்தீர்கள்.',
    handwrittenImage: '/images/feedback/feedback-09.jpg',
    verified: true,
  },
  {
    id: 'fb-10',
    name: 'R****i S.',
    course: 'English Language Immersion',
    destination: 'Independent English Speaking',
    overallScore: 'Overcoming Language Fear',
    rating: 5,
    avatar: R2_MEDIA.students.tharaniAvatar,
    date: 'August 2026',
    comment:
      'Compared to studying elsewhere for 3 months, only after joining this class under Teacher Kamshalini did English become truly accessible to me. I once thought I would never be able to learn English. But her teaching gave me the confidence that I could do it, and now I am able to speak independently with much greater ease.',
    originalTamil:
      'நான் முதல் 03 மாதங்களும் வேறு class ல படிச்சதை விட இந்த class ல வந்து Kamshaliny ஆசிரியரிடம் படித்ததற்கு பிறகு தான் எனக்கு English பாடம் எல்லாம் இலகுவாக படிக்க முடிந்தது. என்னால் இந்த English பாடத்தை படிக்கவே முடியாது என்று நான் நினைத்துக் கொண்டிருந்தேன். ஆனால் இந்த class ல Kamshaliny ஆசிரியரிடம் படித்த பிறகுதான் என்னால் படிக்க முடியும் என நம்பினேன். முதல் இருந்ததை விட என்னால் சுயமாகவும் பேச முடிகிறது.',
    handwrittenImage: '/images/feedback/feedback-10.jpg',
    verified: true,
  },
  {
    id: 'fb-11',
    name: 'T****i N.',
    course: 'Spoken & Practical English',
    destination: 'Lifelong English Foundation',
    overallScore: 'Crystal Clear Teaching',
    rating: 5,
    avatar: R2_MEDIA.students.vaishnaviAvatar,
    date: 'August 2026',
    comment:
      'I prefer to study in RK English Language Academy. My English teacher explains things so clearly, which has been immensely useful for me. I can never forget what she taught me. I am very happy to study in the class of RK Academy. Thank you so much.',
    handwrittenImage: '/images/feedback/feedback-11.jpg',
    verified: true,
  },
  {
    id: 'fb-12',
    name: 'B****h 08 Student',
    course: 'Batch 08 English Immersion',
    destination: 'Affordable High-Quality Education',
    overallScore: 'Fluent Writing & Speaking',
    rating: 5,
    avatar: R2_MEDIA.students.nimalanAvatar,
    date: 'September 2026',
    comment:
      'I joined RK Academy in Kilinochchi while struggling with writing and speaking English. The fees here are very affordable compared to other institutions. The English lecturer teaches with great discipline and structure. Her lessons make English simple to grasp. Today, I can write and speak English with ease, and I am very grateful to the academy.',
    originalTamil:
      'RK International Language Academy என்ற கல்வி நிலையத்தில் கல்வி கற்கும் நான் என்னுடைய சுயநினைவுடன் எழுதிக் கொள்கின்றேன். நான் ஆங்கிலத்தில் மிகவும் ஆங்கிலம் எழுதவும், பேசவும் சிரமப்பட்டு கொண்டு இருந்த வேளையில் கிளிநொச்சியில் இயங்கி வரும் இவ் நிறுவனத்தில் வந்து சேர்ந்து கொண்டேன். ஏனைய நிறுவனங்களை விட மிகவும் குறைந்த கட்டணத்தில் நான் இங்கு கல்வி கற்கின்றேன். ஆங்கில ஆசிரியை மிகவும் ஒழுக்கமாக கற்பிக்கின்றார். இப்போது நான் ஆங்கிலத்தில் எழுத, கதைக்க பழகிவிட்டேன்.',
    handwrittenImage: '/images/feedback/feedback-12.jpg',
    verified: true,
  },
  {
    id: 'fb-13',
    name: 'T****n K.',
    course: 'Level 2 English Grammar',
    destination: 'Grammar Accuracy & Rules',
    overallScore: 'Level 2 Grammar Mastered',
    rating: 5,
    avatar: R2_MEDIA.students.pratheepanAvatar,
    date: 'July 2026',
    comment:
      'My grammar knowledge was quite low, so I enrolled in the Level 2 Grammar class. Despite scheduling difficulties, Madam Kamshalini\'s teaching made the grammar rules so simple to grasp and understand. I humbly request that she also be assigned as our teacher for Level III.',
    originalTamil:
      'எனக்கு Grammar சம்பந்தமான அறிவு குறைவாகவே இருந்தது. அதன் காரணமாகவே நான் Level 2 Grammar வகுப்பில் இணைந்தேன். தொடர்ச்சியாக வகுப்பு வருவதற்கு ஒரு சில சிக்கல்கள் இருந்தன. ஆனாலும் கம்சாலினி Madam கற்பித்ததன் காரணமாக உண்மை இலகுவாக விளங்கக் கூடியதாக இருந்தது. அதேபோல் Level III இவரை வகுப்பாசிரியராக தரும்படி தாழ்மையுடன் கேட்டுக் கொள்கிறேன்.',
    handwrittenImage: '/images/feedback/feedback-13.jpg',
    verified: true,
  },
  {
    id: 'fb-14',
    name: 'M****n P.',
    course: 'English Fundamentals & Dictation',
    destination: 'Fast-Track Vocabulary Building',
    overallScore: 'Daily Dictation Progress',
    rating: 5,
    avatar: R2_MEDIA.students.ketheeswaranAvatar,
    date: 'July 2026',
    comment:
      'Ever since joining RK Academy, the daily dictation sessions have significantly improved my vocabulary and spelling. The teacher explains everything clearly from the basics. I am learning a lot every week, and I am certain that over the next 2 months, my English proficiency will reach an even higher level.',
    originalTamil:
      'இந்த Academy க்கு வந்ததால Daily Dictation வைக்கிறதால கொஞ்சம் Improve ஆகி இருக்கிறேன். Miss கற்பிப்பது நன்றாக புரிகிறது. Basic ல இருந்து போறதால நான் நிறைய கற்றுக் கொள்கிறேன். இதையும் விட இன்னும் 02 மாதத்தில் நிறைய Improve கிடைக்கும் என்பதிலும் உறுதியாக உள்ளேன்.',
    handwrittenImage: '/images/feedback/feedback-14.jpg',
    verified: true,
  },
  {
    id: 'fb-15',
    name: 'Y****i S.',
    course: 'Spoken English Immersion',
    destination: 'Speaking Fluency Achieved',
    overallScore: 'Zero to Fluent in 2 Months',
    rating: 5,
    avatar: R2_MEDIA.students.tharaniAvatar,
    date: 'August 2026',
    comment:
      'When I first arrived here, I didn\'t even know basic English. But within just 2 months, I learned enough to speak confidently. Now 5 months are complete, and I have gained 100% benefit. Thank you to our teacher Kamshalini who taught us with so much patience and care from the basics. Really thank you so much teacher!',
    originalTamil:
      'நான் இங்கு முதல் முதலாக வரும் போது அடிப்படை ஆங்கிலம் மொழி தெரியாமல் தான் வந்தேன். ஆனால் 2 மாதங்களிலே நன்றாக பேசக்கூடிய அளவிற்கு அறிந்து கற்றுக்கொண்டேன். இப்போது 5 மாதங்கள் முடிவடைந்து விட்டது. எனவே 100% பிரயோசனம் அடைந்துள்ளேன். அடிப்படையாய் இருந்து ஒவ்வொருவருக்கும் விளங்கக் கூடியவாறும் அன்பாகவும் இந்த நிலையை அடைய வைத்த எமது கம்சாலினி ஆசிரியருக்கு நன்றி.',
    handwrittenImage: '/images/feedback/feedback-15.jpg',
    verified: true,
  },
  {
    id: 'fb-16',
    name: 'P****n R.',
    course: 'Comprehensive English & Grammar',
    destination: 'Complete Basic & Grammar Mastery',
    overallScore: 'Personalized Attention',
    rating: 5,
    avatar: R2_MEDIA.students.nimalanAvatar,
    date: 'August 2026',
    comment:
      'Before enrolling at RK Academy, I lacked clarity in English basics and grammar. Here, daily dictation helped us memorize unfamiliar words and write without spelling errors. After each topic, tests were conducted to track our progress. The teacher gives individual attention to every student, helping even hesitant students gain confidence.',
    originalTamil:
      'நான் RK International Language Academy க்கு வரும் போது English Basic ல் தெளிவு இல்லாமல் இருந்தேன். பின்னர் English Basic and Grammar சரியான தெளிவும் கல்வியறிவும் கிடைத்தது. Dictation மூலம் சொற்களை பிழையின்றி எழுதக் கற்றுக் கொண்டேன். ஆசிரியர் ஒவ்வொருவரையும் தனிப்பட்ட கவனம் எடுத்து கற்பிக்கின்றார்.',
    handwrittenImage: '/images/feedback/feedback-16.jpg',
    verified: true,
  },
  {
    id: 'fb-17',
    name: 'S****h V.',
    course: 'Diploma in English',
    destination: 'Foundational Knowledge',
    overallScore: 'Step-by-Step Pacing',
    rating: 5,
    avatar: R2_MEDIA.students.pratheepanAvatar,
    date: 'August 2026',
    comment:
      'The English Diploma is very useful. I have learned so much. The teacher teaches very steadily and clearly so that every student can understand everything easily.',
    handwrittenImage: '/images/feedback/feedback-17.jpg',
    verified: true,
  },
  {
    id: 'fb-18',
    name: 'S****a S.',
    course: 'Comprehensive English Course',
    destination: 'Listening, Speaking, Reading & Writing',
    overallScore: '4 Skills Excellence',
    rating: 5,
    avatar: R2_MEDIA.students.vaishnaviAvatar,
    date: 'July 2026',
    comment:
      'I am very happy to have attended this English course. The classes were very interesting, useful, and easy to understand. The teacher explained every lesson clearly and encouraged us to speak in English with confidence. Thank you to the teacher and Nivi Akka for your hard work and support. It has been a truly valuable learning experience for me.',
    handwrittenImage: '/images/feedback/feedback-18.jpg',
    verified: true,
  },
];
