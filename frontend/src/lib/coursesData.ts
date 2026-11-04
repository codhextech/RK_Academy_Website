export interface CourseModule {
  number: string;
  title: string;
  description: string;
  topics?: string[];
  durationHours?: number;
}

export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tag: string;
  category: 'English & Exams' | 'Information Technology' | 'Foreign Languages';
  image: string;
  badgeBg: string;
  accentColor: string;
  popular?: boolean;
  featured?: boolean;
  duration: string;
  modes: string;
  targetAudience: string;
  description: string;
  longDescription: string;
  curriculumHighlights: string[];
  modules: CourseModule[];
  keyComponents?: string[];
  optionalModules?: string[];
  examFormat?: {
    components: string[];
    certification: string;
    acceptance: string;
  };
  tipsForSuccess?: string[];
}

export const ACADEMY_COURSES: CourseDetail[] = [
  // 1. IELTS & UKVI
  {
    id: 'c-ielts-ukvi',
    slug: 'ielts-ukvi',
    title: 'IELTS & UKVI (Academic & General Training)',
    shortTitle: 'IELTS / UKVI',
    tag: 'UKVI & Global University / PR Recognized',
    category: 'English & Exams',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    badgeBg: 'bg-sky-50 text-[#0A3663] border border-sky-200',
    accentColor: 'border-[#0098DA]',
    popular: true,
    featured: true,
    duration: '8 Weeks (60+ Hours)',
    modes: 'In-Person (Kilinochchi) & Live Online',
    targetAudience: 'Students pursuing university degrees abroad, professionals seeking PR/work visas in UK, Canada, Australia, and UKVI applicants.',
    description: 'Complete coaching for IELTS Academic, General Training, and UKVI test-takers with official British Council preparation materials, mock speaking interviews, and Life Skills A1/B1 support.',
    longDescription: 'Our IELTS & UKVI preparation program is Northern Sri Lanka’s highest-rated training track. We cover all four core sub-tests with personalized feedback, real examination simulations, and dedicated British Council registration assistance.',
    curriculumHighlights: [
      'Academic vs. General Training Distinction: Tailored tracks specifically designed for university admission (Academic) vs. immigration & PR work permits (General Training).',
      'Academic Writing Task 1: Synthesizing and describing visual data including bar charts, line graphs, pie charts, comparative tables, maps, and industrial process diagrams in 150+ words.',
      'General Training Writing Task 1: Real-world letter writing (formal, semi-formal, and informal/personal) with correct register, bullet point addressing, and authentic salutations in 150+ words.',
      'Writing Task 2 (Both Tracks): Band 8.0+ formal discursive essay architecture covering opinion essays, discussion of both views, problem-solution, and direct-question formats.',
      'Academic Reading Mastery: 3 authentic, long academic texts from scientific journals, research papers, and university textbooks with advanced critical analysis.',
      'General Training Reading Mastery: Everyday workplace survival texts, company handbooks, staff notices, employment contracts, and social articles with rapid skimming/scanning.',
      'Shared Listening Lab Training: 40 questions across 4 recorded sections (dialogues, community monologues, academic tutorials, university lectures) featuring native British, Australian, and Canadian accents.',
      'Face-to-Face Speaking Drills: One-on-one simulated interviews covering Part 1 warm-up, Part 2 Cue Card sustained speeches, and Part 3 analytical two-way discussions with recorded diagnostic feedback.',
      'UKVI Biometric Compliance: Comprehensive guidance on UK Visas and Immigration (UKVI) test center rules, passport authentication, and Secure English Language Test (SELT) standards.',
      'Life Skills A1 & B1 Coaching: Dedicated speaking and listening training for UK spouse/family visas (A1) and indefinite leave to remain/settlement (B1).',
      'Official British Council & IDP Test Support: Free exam date booking, candidate verification, and TRF result collection assistance directly at our A-9 Road Kilinochchi center.',
    ],
    modules: [
      {
        number: 'Module 1',
        title: 'Introduction to IELTS & UKVI',
        description: 'Comprehensive understanding of the exam format, scoring criteria (Band 0–9), test registration, and differences between standard IELTS and UKVI.',
        topics: ['Band descriptors for Band 7.0 – 9.0', 'UKVI security & biometric standards', 'Test room protocols and time management strategies'],
      },
      {
        number: 'Module 2',
        title: 'Listening Module (Academic & General Training)',
        description: 'Same format for both tracks: 4 recorded sections featuring native English accents (British, Australian, American, and Canadian).',
        topics: ['Section 1: Everyday social conversations', 'Section 2: Monologues on general community contexts', 'Section 3: Academic discussions among students/tutors', 'Section 4: University-level academic lecture'],
      },
      {
        number: 'Module 3',
        title: 'Reading Module (Track-Specific)',
        description: 'Targeted reading comprehension with rapid skimming, scanning, and detail-analysis techniques.',
        topics: [
          'Academic IELTS/UKVI: 3 long academic texts from scientific journals, books, and analytical papers',
          'General Training IELTS/UKVI: Workplace notices, contracts, travel brochures, and everyday social articles',
          'Question types: True/False/Not Given, Headings Matching, Summary Completion',
        ],
      },
      {
        number: 'Module 4',
        title: 'Writing Module (Task 1 & Task 2)',
        description: 'Mastery of time allocation, structure, and lexical resource for high-scoring responses.',
        topics: [
          'Academic Task 1: Describing graphs, bar charts, pie charts, tables, maps, and technical process diagrams (150 words)',
          'General Training Task 1: Writing formal, semi-formal, and informal letters (150 words)',
          'Task 2 (Both Tracks): Writing formal discursive and argumentative essays (250 words)',
        ],
      },
      {
        number: 'Module 5',
        title: 'Speaking Module (One-on-One Interview)',
        description: 'Face-to-face interactive interview training simulating official test center conditions.',
        topics: [
          'Part 1: Introduction and familiar everyday topics (4–5 minutes)',
          'Part 2: Individual long turn / Cue Card speaking with 1-minute prep (3–4 minutes)',
          'Part 3: Two-way abstract and analytical discussion (4–5 minutes)',
        ],
      },
      {
        number: 'Module 6',
        title: 'Grammar & Vocabulary for IELTS',
        description: 'Systematic expansion of lexical resource and grammatical range and accuracy.',
        topics: ['Academic Word List (AWL) mastery', 'Complex sentence constructions & conditional clauses', 'Collocations, idiomatic phrasing, and cohesive linkers'],
      },
      {
        number: 'Module 7',
        title: 'Exam Techniques & Time Management',
        description: 'Proven strategies to eliminate examiner traps, manage strict time limits, and maximize points.',
        topics: ['Pacing per section', 'Spelling rules and hyphenation in listening/reading', 'Proofreading strategies for writing tasks'],
      },
      {
        number: 'Module 8',
        title: 'Mock Tests & Personalized Feedback',
        description: 'Simulated full-length mock examinations under real test conditions followed by diagnostic report cards.',
        topics: ['Full exam simulations under test hall pressure', 'Individual speaking audio evaluation', 'Line-by-line essay corrections with target band action plans'],
      },
    ],
    optionalModules: [
      'Extra emphasis on UK visa requirements (Student, Skilled Worker, Health & Care visas)',
      'Test-day conduct, ID authentication, and biometric verification rules for UKVI',
      'Life Skills A1 Preparation: For initial UK family/spouse visa applications (Listening & Speaking only)',
      'Life Skills B1 Preparation: For UK visa extensions, settlement (ILR), and British citizenship (Listening & Speaking only)',
      'Application guidance: University personal statements and embassy visa interview readiness',
    ],
    examFormat: {
      components: ['Listening (30 mins + 10 mins transfer)', 'Reading (60 mins)', 'Writing (60 mins)', 'Speaking (11–14 mins)'],
      certification: 'Official IELTS / UKVI Test Report Form (TRF) scored from Band 1.0 to 9.0',
      acceptance: 'Accepted by over 12,500 universities, immigration authorities, and employers across the UK, Canada, Australia, New Zealand, USA, and Europe.',
    },
    tipsForSuccess: [
      'Practice active listening daily with BBC 6-Minute English and TED Talks.',
      'Always summarize main features before writing specific numbers in Academic Task 1.',
      'Speak smoothly without artificial pauses—fluency carries as much weight as vocabulary.',
      'Take at least 4 full timed mock exams prior to your official test date.',
    ],
  },

  // 2. PTE ACADEMIC
  {
    id: 'c-pte-academic',
    slug: 'pte-academic',
    title: 'PTE Academic Exam Preparation',
    shortTitle: 'PTE Academic',
    tag: 'Computer-Based Exam (Fast AI Scoring)',
    category: 'English & Exams',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    badgeBg: 'bg-sky-50 text-[#0A3663] border border-sky-200',
    accentColor: 'border-[#0098DA]',
    popular: true,
    duration: '6 – 8 Weeks',
    modes: 'Kilinochchi Computer Lab & Live Online',
    targetAudience: 'Candidates seeking fast results (within 48 hours) for study and work visas in Australia, New Zealand, the UK, and Canada.',
    description: 'Complete Pearson Test of English training in our computer lab. Learn the AI scoring algorithm secrets for Describe Image, Repeat Sentence, Retell Lecture, and Write from Dictation.',
    longDescription: 'PTE Academic is a 100% computer-delivered test scored by Pearson’s advanced AI algorithms. Our specialized curriculum and state-of-the-art computer lab in Kilinochchi teach you the exact scoring criteria, speaking templates, and time-management techniques needed to achieve 65+ (IELTS 7.0 equivalent) and 79+ (IELTS 8.0 equivalent).',
    curriculumHighlights: [
      'Comprehensive breakdown of Speaking & Writing (Part 1), Reading (Part 2), and Listening (Part 3)',
      'High-scoring templates for Describe Image, Retell Lecture, and 20-minute Essay',
      'AI algorithm scoring hacks for Oral Fluency, Pronunciation, and Content',
      'Write from Dictation and Repeat Sentence daily speed drills',
      'Full computer lab simulations matching official Pearson exam center software',
    ],
    modules: [
      {
        number: 'Part 1',
        title: 'Speaking & Writing Module (54 – 67 Minutes)',
        description: 'Integrated speaking and writing tasks assessed by automated voice and language processing.',
        topics: [
          'Read Aloud: Pronunciation, syllable stress, and natural rhythm',
          'Repeat Sentence: Memory retention and chunking techniques',
          'Describe Image: Proven structured templates for graphs, maps, charts, and life cycles',
          'Re-tell Lecture: Note-taking strategies and fluent spoken summaries',
          'Answer Short Questions: Quick vocabulary and common knowledge responses',
          'Summarize Written Text: Crafting one single grammatical sentence between 5 and 75 words',
          'Write Essay: Standard 200–300 word formal argumentative essay template',
        ],
      },
      {
        number: 'Part 2',
        title: 'Reading Module (29 – 30 Minutes)',
        description: 'Fast-paced academic reading comprehension and vocabulary in context.',
        topics: [
          'Reading & Writing: Fill in the Blanks (Highest weighted reading section)',
          'Multiple Choice, Multiple Answers',
          'Re-order Paragraphs: Identifying topic sentences, referencing pronouns, and logical sequence',
          'Reading: Fill in the Blanks (Drag and drop vocabulary collocation mastery)',
          'Multiple Choice, Single Answer',
        ],
      },
      {
        number: 'Part 3',
        title: 'Listening Module (30 – 43 Minutes)',
        description: 'Audio and video clips with international English accents tested via diverse response types.',
        topics: [
          'Summarize Spoken Text: 50–70 word written summary of an audio lecture (contributes to Writing & Listening)',
          'Multiple Choice, Multiple Answers & Single Answer',
          'Fill in the Blanks: Typing missing words while listening in real time',
          'Highlight Correct Summary & Select Missing Word',
          'Highlight Incorrect Words: Catching transcription discrepancies while audio plays',
          'Write from Dictation: The most critical high-scoring task in the entire PTE test',
        ],
      },
    ],
    keyComponents: [
      '1. Skill Building: Oral fluency, pronunciation accuracy, and typing speed at 40+ WPM',
      '2. Timed Practice: Real-time countdown timer simulations under exam software pressure',
      '3. Strategy Training: Algorithm scoring mechanics, keyword recognition, and memory hooks',
      '4. Feedback & Diagnostic Improvement: Section-by-section breakdown of enabling skills',
    ],
    examFormat: {
      components: ['Speaking & Writing (54–67 mins)', 'Reading (29–30 mins)', 'Listening (30–43 mins)'],
      certification: 'Pearson PTE Academic Score Report (Score scale: 10 – 90 points)',
      acceptance: '100% accepted for Australian and New Zealand visas, and accepted by top UK and Canadian universities.',
    },
    tipsForSuccess: [
      'Never pause longer than 3 seconds in speaking tasks—the microphone will automatically shut off!',
      'In Write from Dictation, double-check singular/plural forms and capital letters.',
      'Oral fluency is penalized more heavily by hesitations and self-corrections than slight pronunciation errors.',
    ],
  },

  // 3. BASIC DIPLOMA IN ENGLISH
  {
    id: 'c-basic-diploma-english',
    slug: 'basic-diploma-english',
    title: 'Basic Diploma in English',
    shortTitle: 'Diploma in English',
    tag: 'Comprehensive Foundation & Fluency',
    category: 'English & Exams',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    badgeBg: 'bg-sky-50 text-[#0A3663] border border-sky-200',
    accentColor: 'border-[#0098DA]',
    duration: '12 – 16 Weeks (3 – 4 Months)',
    modes: 'In-Person (Kilinochchi) & Live Online',
    targetAudience: 'School leavers, university entrants, job seekers, and working professionals who want to build complete English language fluency and formal certification.',
    description: 'An accredited diploma program covering grammar, vocabulary, reading, writing, active listening, public speaking, and study skills for workplace and academic success.',
    longDescription: 'The Basic Diploma in English at RK International Language Academy transforms hesitant speakers into confident, articulate communicators. Designed around practical everyday usage and corporate standards, students receive an official RK Academy Diploma upon completion.',
    curriculumHighlights: [
      'Comprehensive grammar overhaul: Master all 12 tenses, voice, and sentence mechanics',
      'Expansive vocabulary building for social, professional, and academic contexts',
      'Professional correspondence: Business emails, formal letters, and workplace reports',
      'Daily speech circles, impromptu speaking, debates, and slide presentations',
      'Official RK International Language Academy Diploma awarded upon graduation',
    ],
    modules: [
      {
        number: 'Module 1',
        title: 'Grammar and Sentence Structure',
        description: 'Solid foundational grammar essentials with zero ambiguity.',
        topics: ['Parts of speech in depth', 'Mastery of all 12 English tenses with real-world applications', 'Active vs. Passive voice', 'Complex and compound sentences, conditional clauses, and conjunctions'],
      },
      {
        number: 'Module 2',
        title: 'Vocabulary Building',
        description: 'Systematic expansion of active and passive word power.',
        topics: ['Root words, prefixes, and suffixes', 'Everyday collocations and phrasal verbs', 'Idioms, figures of speech, and workplace terminology', 'Synonyms, antonyms, and precision word choice'],
      },
      {
        number: 'Module 3',
        title: 'Reading Skills & Comprehension',
        description: 'Developing critical reading habits for articles, reports, and books.',
        topics: ['Skimming for the general gist and scanning for specific facts', 'Contextual inference and deducing unfamiliar word meanings', 'Reading news articles, short stories, and academic summaries'],
      },
      {
        number: 'Module 4',
        title: 'Writing Skills & Composition',
        description: 'From sentence structuring to complete essays and professional documents.',
        topics: ['Paragraph structuring (topic sentence, supporting ideas, conclusion)', 'Formal and informal letter writing', 'Professional workplace emails and office memos', 'Creative narrative writing and opinion essays'],
      },
      {
        number: 'Module 5',
        title: 'Listening Skills & Audio Comprehension',
        description: 'Sharpening listening accuracy across different speeds and accents.',
        topics: ['Active listening techniques and note-taking', 'Comprehending phone calls, announcements, and instructions', 'Following English news broadcasts and documentary podcasts'],
      },
      {
        number: 'Module 6',
        title: 'Speaking Skills & Conversational Fluency',
        description: 'Overcoming stage fear and eliminating hesitation in spoken dialogue.',
        topics: ['Clear English pronunciation and phonetics', 'Word and sentence stress, rhythm, and intonation', 'Social conversation, small talk, and telephone etiquette', 'Real-world role plays: Job interviews, meetings, and customer interactions'],
      },
      {
        number: 'Module 7',
        title: 'Presentation & Public Speaking',
        description: 'Mastering the stage and delivering persuasive formal presentations.',
        topics: ['Structuring a speech: Introduction, body points, and memorable closing', 'Body language, eye contact, and vocal modulation', 'Slide deck presentation delivery and Q&A handling', 'Classroom debates and panel discussions'],
      },
      {
        number: 'Module 8',
        title: 'Basic Study Skills & Exam Preparation',
        description: 'Equipping learners for academic excellence and future international test tracks.',
        topics: ['Effective note-taking methods (Cornell and Mind Mapping)', 'Time management and self-study revision routines', 'Exam answering techniques and foundation pathway directly to IELTS / PTE'],
      },
    ],
    examFormat: {
      components: ['Continuous assessments & assignments', 'Mid-term written examination', 'Final presentation & oral viva', 'Final written diploma exam'],
      certification: 'Recognized Diploma in English Certificate from RK International Language Academy',
      acceptance: 'Accepted by local employers, educational institutes, and serves as an ideal pre-requisite for IELTS.',
    },
    tipsForSuccess: [
      'Speak in English daily with classmates and trainers, regardless of making mistakes.',
      'Keep a vocabulary journal and write 3 original sentences with every new word.',
      'Record your voice during presentations to self-critique body language and pronunciation.',
    ],
  },

  // 4. DIPLOMA IN INFORMATION TECHNOLOGY (IT)
  {
    id: 'c-diploma-it',
    slug: 'diploma-in-it',
    title: 'Diploma in Information Technology (IT)',
    shortTitle: 'Diploma in IT',
    tag: 'Practical Computing & Software Skills',
    category: 'Information Technology',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    badgeBg: 'bg-sky-50 text-[#0A3663] border border-sky-200',
    accentColor: 'border-[#0098DA]',
    featured: true,
    duration: '16 Weeks (4 Months)',
    modes: 'In-Person (Kilinochchi Computer Lab) & Live Online',
    targetAudience: 'Students, job seekers, and professionals looking to launch careers in software development, web design, IT support, or office automation.',
    description: 'Comprehensive IT diploma covering Computer Fundamentals, Programming, Web Design, DBMS, Computer Networking, Software Applications, IT Troubleshooting, and a hands-on Capstone Project.',
    longDescription: 'The Diploma in Information Technology at RK International Academy provides practical, industry-aligned tech education in Kilinochchi. With individual computer workstations and project-based learning, students gain hands-on proficiency in programming, website development, networking, and system maintenance.',
    curriculumHighlights: [
      'Hands-on computer lab training with individual high-speed workstations',
      'From fundamentals to programming logic (Python / C++ basics)',
      'Modern web design: HTML5, CSS3, JavaScript, and responsive design',
      'Database systems: Relational design and practical SQL database queries',
      'Computer networking, hardware assembly, and OS troubleshooting',
      'End-of-course real-world Capstone Project portfolio for employers',
    ],
    modules: [
      {
        number: 'Module 1',
        title: 'Computer Fundamentals',
        description: 'Hardware architecture, system software, and digital device operations.',
        topics: ['Internal PC hardware: CPU, RAM, storage, motherboards, and power supplies', 'Operating systems: Windows 11 & Linux distributions', 'File management, system settings, and computer maintenance'],
      },
      {
        number: 'Module 2',
        title: 'Programming Fundamentals',
        description: 'Core logic, algorithmic thinking, and modern programming fundamentals.',
        topics: ['Algorithm design, pseudo-code, and flowcharts', 'Variables, data types, and arithmetic/logical operators', 'Control structures (if/else conditionals, loops)', 'Functions, arrays, and introduction to Python / C++'],
      },
      {
        number: 'Module 3',
        title: 'Web Design and Development',
        description: 'Building modern, responsive, and engaging websites.',
        topics: ['Semantic HTML5 structure and web page elements', 'Modern CSS3 styling, Flexbox, Grid, and mobile responsiveness', 'JavaScript fundamentals for interactive web elements', 'Deploying websites to live hosting servers'],
      },
      {
        number: 'Module 4',
        title: 'Database Management Systems (DBMS)',
        description: 'Organizing, querying, and managing structured enterprise data.',
        topics: ['Relational database concepts and entity relationship (ER) diagrams', 'Structured Query Language (SQL): SELECT, INSERT, UPDATE, DELETE', 'Table joins, primary/foreign keys, and data normalization', 'Practical management with MySQL and phpMyAdmin'],
      },
      {
        number: 'Module 5',
        title: 'Computer Networking',
        description: 'Understanding how computers and networks communicate securely.',
        topics: ['Network topologies: LAN, WAN, WLAN', 'OSI 7-Layer model and TCP/IP protocol suite', 'IP addressing (IPv4 & IPv6), Subnetting, and DNS/DHCP', 'Configuring routers, switches, Wi-Fi access points, and network security'],
      },
      {
        number: 'Module 6',
        title: 'Software Applications & Office Productivity',
        description: 'Advanced proficiency in workplace software suites.',
        topics: ['Advanced Microsoft Excel / Google Sheets (Formulas, VLOOKUP, Pivot Tables)', 'Professional document formatting with Microsoft Word', 'Executive presentation design with PowerPoint', 'Cloud collaboration tools and digital productivity workflows'],
      },
      {
        number: 'Module 7',
        title: 'IT Support and Troubleshooting',
        description: 'Diagnosing, repairing, and supporting computer systems.',
        topics: ['Hardware diagnostics and component replacement', 'Software conflict resolution, driver installations, and OS formatting', 'Antivirus management, malware cleanup, and data recovery techniques', 'Helpdesk ticketing and user support procedures'],
      },
      {
        number: 'Module 8',
        title: 'Information Systems & Ethics',
        description: 'Cyber security awareness, data privacy, and ethical computing.',
        topics: ['Cyber threats, phishing, and digital security best practices', 'Data protection regulations and privacy policies', 'Intellectual property, software licensing, and professional IT ethics'],
      },
      {
        number: 'Module 9',
        title: 'Project Management & Capstone Project',
        description: 'Synthesizing all acquired skills into a production-grade portfolio project.',
        topics: ['Project scoping, milestone planning, and requirements analysis', 'Building a functional web application, database system, or network setup', 'Project documentation, code walkthrough, and live demonstration'],
      },
    ],
    examFormat: {
      components: ['Lab practical exams', 'Written theory examination', 'Final Capstone Project evaluation and viva'],
      certification: 'Official Diploma in Information Technology from RK International Academy',
      acceptance: 'Prepares students for junior web developer, IT technician, database operator, and office administrator roles.',
    },
    tipsForSuccess: [
      'Build real projects alongside theory—code every day.',
      'Learn how to read error messages and troubleshoot independently.',
      'Showcase your capstone project on GitHub or a live web portfolio.',
    ],
  },

  // 5. DIPLOMA IN SINHALA LANGUAGE
  {
    id: 'c-diploma-sinhala',
    slug: 'diploma-in-sinhala',
    title: 'Diploma in Sinhala Language',
    shortTitle: 'Diploma in Sinhala',
    tag: 'National Language Proficiency (සිංහල ඩිප්ලෝමාව)',
    category: 'Foreign Languages',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    badgeBg: 'bg-sky-50 text-[#0A3663] border border-sky-200',
    accentColor: 'border-[#0098DA]',
    duration: '12 Weeks (3 Months)',
    modes: 'In-Person (Kilinochchi) & Live Online',
    targetAudience: 'Government employees, NGO workers, bank officers, students, and professionals needing official Sinhala language certification for careers in Sri Lanka.',
    description: 'Learn to read, write, and speak fluent Sinhala with proper grammar (ව්‍යාකරණ), official terminology, conversational fluency, and optional translation units.',
    longDescription: 'The Diploma in Sinhala Language at RK International Language Academy bridge language gaps and opens government, corporate, and civil service career opportunities across Sri Lanka. Taught by bilingual, certified Sinhala language instructors in a friendly, supportive learning atmosphere.',
    curriculumHighlights: [
      'Master the complete Sinhala alphabet (හෝඩිය) and writing script from ground up',
      'Systematic grammar rules (ව්‍යාකරණය): Nouns, verbs, tenses, and sentence building',
      'Practical spoken Sinhala for office, banking, medical, and public service settings',
      'Reading comprehension of newspapers, official letters, and circulars',
      'Optional advanced unit in Tamil-to-Sinhala and English-to-Sinhala translation',
    ],
    modules: [
      {
        number: 'Module 1',
        title: 'Introduction to Sinhala Language & Script',
        description: 'Fundamentals of the Sinhala writing system, letter formation, and sounds.',
        topics: ['Sinhala Alphabet (හෝඩිය): Vowels (ස්වර) and Consonants (ව්‍යඤ්ජන)', 'Vowel modifiers (පිල්ලම්) and character combination rules', 'Correct pronunciation, phonetics, and script calligraphy'],
      },
      {
        number: 'Module 2',
        title: 'Sinhala Grammar (ව්‍යාකරණය)',
        description: 'Comprehensive grammatical principles for accurate written and spoken expression.',
        topics: ['Nouns (නාම පද) and gender classifications', 'Verbs (ක්‍රියා පද) and conjugation across past, present, and future tenses', 'Sentence structures (වාක්‍ය රටා): Subject, object, and verb agreement', 'Pluralization, pronouns, and prepositions'],
      },
      {
        number: 'Module 3',
        title: 'Listening & Speaking Skills',
        description: 'Developing immediate conversational confidence in everyday and office situations.',
        topics: ['Day-to-day greetings, polite inquiries, and social conversation', 'Spoken dialogue for public services, hospitals, banks, and markets', 'Listening comprehension from spoken audio and native speech dialogues'],
      },
      {
        number: 'Module 4',
        title: 'Reading Skills & Document Comprehension',
        description: 'Building fluency in reading authentic Sinhala printed materials.',
        topics: ['Reading news headlines, articles, and public notices', 'Understanding government forms, announcements, and circulars', 'Reading simple Sinhala essays, stories, and instructional manuals'],
      },
      {
        number: 'Module 5',
        title: 'Writing Skills & Composition',
        description: 'Composing clear and grammatically sound written texts in Sinhala.',
        topics: ['Crafting coherent paragraphs and short essays', 'Official and informal letter drafting', 'Writing notices, announcements, and office reports in Sinhala'],
      },
      {
        number: 'Module 6',
        title: 'Sinhala Literature, Culture & Idioms',
        description: 'Exploring the rich cultural contexts and idiomatic nuances of the language.',
        topics: ['Common Sinhala idioms (ප්‍රස්ථාව පිරුළු) and polite honorifics', 'Cultural norms, traditions, and festival vocabulary', 'Appreciation of simple classical and modern Sinhala literary prose'],
      },
      {
        number: 'Module 7',
        title: 'Translation & Interpretation (Optional Advanced Unit)',
        description: 'Professional translation between Sinhala and Tamil / English.',
        topics: ['Techniques for translating official documents and correspondence', 'Interpreting conversations in bilingual workplaces and government desks', 'Avoiding common translation pitfalls and false cognates'],
      },
    ],
    examFormat: {
      components: ['Reading & writing written paper', 'Listening comprehension test', 'Oral viva & spoken conversation examination'],
      certification: 'Diploma in Sinhala Language awarded by RK International Language Academy',
      acceptance: 'Meets official second-language requirements for Sri Lankan public sector and corporate employment.',
    },
    tipsForSuccess: [
      'Practice writing the Sinhala script for 15 minutes each day to master the curves and modifiers.',
      'Listen to Sinhala news broadcasts on radio/TV to train your ear to native cadence.',
      'Engage in daily spoken exchanges with Sinhala-speaking peers.',
    ],
  },

  // 6. FRENCH DELF EXAM A1 & A2
  {
    id: 'c-french-delf',
    slug: 'french-delf',
    title: 'French DELF Exam Preparation (A1 & A2)',
    shortTitle: 'French DELF (A1/A2)',
    tag: 'Official French Ministry Certification (France & Canada)',
    category: 'Foreign Languages',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    badgeBg: 'bg-sky-50 text-[#0A3663] border border-sky-200',
    accentColor: 'border-[#0098DA]',
    duration: '10 – 12 Weeks',
    modes: 'Kilinochchi Campus & Live Online',
    targetAudience: 'Students and professionals planning to study in France/Europe, applicants seeking Canada Express Entry French CRS bonus points, and language enthusiasts.',
    description: 'Comprehensive preparation for DELF A1 and A2 examinations covering Listening (Compréhension orale), Speaking (Production orale), Reading (Compréhension écrite), and Writing (Production écrite).',
    longDescription: 'The DELF (Diplôme d’Études en Langue Française) is the official French language certification awarded by the French Ministry of National Education. Valid for life and recognized worldwide, our Kilinochchi French coaching program prepares candidates for both the A1 (Discovery) and A2 (Survival) certifications with authentic past paper drills and native audio simulations.',
    curriculumHighlights: [
      'Dual preparation for DELF A1 and A2 certification standards',
      'Systematic training across all 4 mandatory exam components',
      'Essential French grammar: Conjugations, gender agreement, articles, and tenses',
      'Audio listening lab practice with authentic Parisian and international French accents',
      'One-on-one simulated oral exam interviews with certified language trainers',
      'Full past paper timed simulations matching official Alliance Française standards',
    ],
    modules: [
      {
        number: 'DELF A1',
        title: 'DELF A1 Exam Content & Skills (Discovery Level)',
        description: 'Basic language capability to interact in simple everyday situations.',
        topics: [
          'Listening (Compréhension orale - 20 mins): Understanding basic daily instructions, phone numbers, and brief announcements',
          'Speaking (Production orale - 5–7 mins): Guided interview, basic information exchange, and simple role-play simulation',
          'Reading (Compréhension écrite - 30 mins): Comprehending short road signs, restaurant menus, timetables, and personal notes',
          'Writing (Production écrite - 30 mins): Filling out personal registration forms, writing simple postcards, and composing brief messages',
        ],
      },
      {
        number: 'DELF A2',
        title: 'DELF A2 Exam Content & Skills (Survival Level)',
        description: 'Ability to perform simple social exchanges, describe background, and communicate in routine tasks.',
        topics: [
          'Listening (Compréhension orale - 25 mins): Catching the main points in short radio announcements, messages, and everyday conversations',
          'Speaking (Production orale - 6–8 mins): Describing activities, background, hobbies, and engaging in collaborative role-play',
          'Reading (Compréhension écrite - 30 mins): Reading personal letters, brochures, advertisements, and practical informational texts',
          'Writing (Production écrite - 45 mins): Writing friendly letters, email invitations, short descriptions of past events, and personal opinions',
        ],
      },
      {
        number: 'Component 1',
        title: 'French Grammar & Core Vocabulary Mastery',
        description: 'Rigorous grammatical foundation across both A1 and A2 levels.',
        topics: ['Present tense (Le Présent) of regular and irregular verbs', 'Passé Composé (past events) and Futur Proche (near future)', 'Definite, indefinite, and partitive articles', 'Adjective agreement, pronouns, and prepositions of location'],
      },
      {
        number: 'Component 2',
        title: 'Exam Strategies & Practice Tests',
        description: 'Timed full past-paper testing under strict examination conditions.',
        topics: ['Official Alliance Française past exam papers', 'Marking criteria and scoring benchmarks (Minimum 50/100 to pass, minimum 5/25 in each skill)', 'Oral interview anxiety management and time distribution'],
      },
    ],
    keyComponents: [
      'Grammar & Vocabulary: Daily French vocabulary cards, verb conjugation wheels, and phrase drills',
      'Practice Tests: Regular authentic mock tests covering all 4 exam components',
      'Exam Strategies: Scoring rubrics, avoiding negative points, and active keyword detection',
    ],
    examFormat: {
      components: ['Compréhension de l’oral (Listening)', 'Compréhension des écrits (Reading)', 'Production écrite (Writing)', 'Production orale (Speaking)'],
      certification: 'Official DELF Diploma issued by the French Ministry of National Education (Valid for Life)',
      acceptance: 'Accepted worldwide for European university entry, French citizenship, and Canadian Express Entry PR bonus points.',
    },
    tipsForSuccess: [
      'Listen to RFI Français Facile podcasts daily to train ear comprehension.',
      'Always pronounce word endings correctly—French liaisons require regular spoken practice.',
      'In the writing section, verify gender agreement (masculine/feminine) on all nouns and adjectives.',
    ],
  },

  // 7. DUTCH & DEUTSCH (GERMAN)
  {
    id: 'c-dutch-deutsch',
    slug: 'dutch-deutsch',
    title: 'Dutch & Deutsch (German) Language Preparations',
    shortTitle: 'Dutch & Deutsch',
    tag: 'European Career & Migration Preparation',
    category: 'Foreign Languages',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    badgeBg: 'bg-sky-50 text-[#0A3663] border border-sky-200',
    accentColor: 'border-[#0098DA]',
    duration: '10 – 12 Weeks (Structured 40+ Hours)',
    modes: 'Kilinochchi Campus & Live Online',
    targetAudience: 'Healthcare professionals (nurses, caregivers), university students, and job seekers aiming for study, Ausbildung, or work migration in Germany, Austria, and the Netherlands.',
    description: 'Structured dual European language coaching covering Basic Dutch and Basic German (Deutsch) with side-by-side vocabulary comparisons, pronunciation, grammar, and 9 comprehensive modules.',
    longDescription: 'Both Dutch (Nederlands) and German (Deutsch) belong to the Germanic language family and share immense grammatical and lexical similarities. At RK International Language Academy, our specialized curriculum prepares students for European integration exams (Inburgering for the Netherlands, Goethe/Telc A1/A2 for Germany) through a clear 9-module framework.',
    curriculumHighlights: [
      'Preparation for Basic Dutch (Inburgering exam A1/A2 readiness)',
      'Preparation for Basic German (Goethe / Telc / ÖSD A1/A2 certification readiness)',
      'Leverage cognates and shared root structures between Dutch, German, and English',
      'Sample beginner phrases side-by-side to accelerate comprehension and retention',
      'Structured 9-module curriculum totaling 44 intensive instructional hours',
    ],
    modules: [
      {
        number: 'Module 1',
        title: 'Introduction & Basics',
        description: 'Alphabet, basic phonetics, greetings, and self-introduction.',
        durationHours: 4,
        topics: ['Dutch and German alphabets, diphthongs, and special characters (ä, ö, ü, ß)', 'Basic greetings, farewells, and polite introductions', 'Personal pronouns and country/nationality vocabulary'],
      },
      {
        number: 'Module 2',
        title: 'Pronunciation & Intonation',
        description: 'Mastering the distinctive sounds and vocal mechanics of both languages.',
        durationHours: 6,
        topics: ['Dutch guttural "g/ch" and long/short vowels', 'German consonant clusters and glottal stops', 'Sentence stress, pitch, and natural spoken rhythm'],
      },
      {
        number: 'Module 3',
        title: 'Building Vocabulary',
        description: 'Crucial everyday vocabulary and lexical acquisition techniques.',
        durationHours: 5,
        topics: ['Numbers, counting, dates, days of the week, and telling time', 'Family members, relationships, and home environments', 'Food, grocery shopping, market exchanges, and clothing'],
      },
      {
        number: 'Module 4',
        title: 'Grammar for Speaking',
        description: 'Functional grammar rules required for constructing accurate spoken sentences.',
        durationHours: 5,
        topics: ['Verb conjugations in the present tense (sein/haben in German, zijn/hebben in Dutch)', 'Word order: Subject-Verb-Object (SVO) and inversion rules in questions', 'Definite and indefinite articles (der/die/das in German, de/het in Dutch)', 'Basic case introductions (Nominative and Accusative)'],
      },
      {
        number: 'Module 5',
        title: 'Everyday Conversations',
        description: 'Navigating daily practical scenarios in Amsterdam, Berlin, or Vienna.',
        durationHours: 6,
        topics: ['Ordering at cafes and restaurants', 'Asking for and giving directions on public transit', 'Scheduling appointments, buying train tickets, and hotel check-in'],
      },
      {
        number: 'Module 6',
        title: 'Listening & Responding',
        description: 'Understanding spoken dialogues and forming immediate, natural responses.',
        durationHours: 4,
        topics: ['Comprehending train station announcements and phone messages', 'Following everyday conversations at native conversational speeds', 'Answering questions clearly without translation hesitation'],
      },
      {
        number: 'Module 7',
        title: 'Speaking Fluency & Confidence',
        description: 'Building sustained conversational stamina and eliminating stage anxiety.',
        durationHours: 5,
        topics: ['Role-plays: Visiting the doctor, pharmacy, and post office', 'Talking about hobbies, weekend plans, and personal background', 'Short impromptu speeches with trainer feedback'],
      },
      {
        number: 'Module 8',
        title: 'Professional & Academic Speaking',
        description: 'Language skills for European workplaces, hospitals, and universities.',
        durationHours: 5,
        topics: ['Workplace introductions and formal communication etiquette (Sie vs. du, U vs. je)', 'Medical and nursing vocabulary overview for healthcare candidates', 'Drafting basic formal emails and CV introductory notes'],
      },
      {
        number: 'Module 9',
        title: 'Revision & Final Practice',
        description: 'Comprehensive review, mock testing, and diagnostic evaluation.',
        durationHours: 4,
        topics: ['Goethe/Telc A1 & Dutch Inburgering mock test simulations', 'One-on-one oral assessment and personalized evaluation report', 'Guidance on official test registration and European visa documentation'],
      },
    ],
    keyComponents: [
      '1. Basic Dutch Language Preparation: Inburgering civic integration exam & MVV visa foundation',
      '2. Basic German (Deutsch) Preparation: Goethe/Telc A1/A2 for nurses, study, and family reunion',
      '3. Common Study Techniques: Leveraging Germanic cognates and dual comparative charts',
      '4. Sample Beginner Phrases Side-by-Side: Rapid pattern recognition between Dutch and German',
    ],
    examFormat: {
      components: ['Goethe-Zertifikat A1/A2 & Telc Deutsch format', 'Dutch Civic Integration (Basisexamen Inburgering Buitenland) format'],
      certification: 'Course Completion Diploma from RK International Language Academy & Exam Prep Certificate',
      acceptance: 'Accepted pathway preparation for visas, universities, and healthcare employers in Germany, the Netherlands, Austria, and Switzerland.',
    },
    tipsForSuccess: [
      'Learn German nouns with their definite article (der, die, or das) from day one—never learn a noun alone!',
      'Watch DW Deutsch Lernen (Nicos Weg) and Dutch language videos on YouTube for daily immersion.',
      'Practice speaking aloud to get comfortable with the guttural sounds and compound words.',
    ],
  },
];

export function getCourseBySlug(slug: string): CourseDetail | undefined {
  const normalized = slug.toLowerCase();
  if (normalized === 'diploma-in-english' || normalized === 'spoken-english') {
    return ACADEMY_COURSES.find((c) => c.slug === 'basic-diploma-english');
  }
  if (normalized === 'pte' || normalized === 'pte-academic-exam-preparation') {
    return ACADEMY_COURSES.find((c) => c.slug === 'pte-academic');
  }
  if (normalized === 'it' || normalized === 'diploma-it') {
    return ACADEMY_COURSES.find((c) => c.slug === 'diploma-in-it');
  }
  if (normalized === 'sinhala' || normalized === 'diploma-sinhala') {
    return ACADEMY_COURSES.find((c) => c.slug === 'diploma-in-sinhala');
  }
  return ACADEMY_COURSES.find((c) => c.slug.toLowerCase() === normalized);
}

export function getAllCourseSlugs(): string[] {
  return [
    'ielts-ukvi',
    'pte-academic',
    'basic-diploma-english',
    'diploma-in-english',
    'diploma-in-it',
    'diploma-in-sinhala',
    'french-delf',
    'dutch-deutsch',
  ];
}
