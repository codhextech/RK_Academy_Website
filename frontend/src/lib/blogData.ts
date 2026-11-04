export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: 'Exam Comparisons' | 'Visa & Scores' | 'Tips & Strategy' | 'Local Guides' | 'Success Stories';
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  excerpt: string;
  content: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  // 1. PTE vs IELTS
  {
    slug: 'pte-vs-ielts-sri-lanka',
    title: 'PTE vs. IELTS: Which is Easier for Australia, Canada & UK Migration from Sri Lanka?',
    metaTitle: 'PTE vs IELTS: Which Exam is Easier in Sri Lanka? | RK Academy',
    metaDescription: 'Detailed comparison of PTE vs IELTS for Sri Lankan students: test format, computer AI scoring vs human examiner, fees, and which is easier for Australia and UK.',
    keywords: ['PTE vs IELTS Sri Lanka', 'is PTE easier than IELTS', 'PTE for Australia visa', 'IELTS vs PTE Kilinochchi', 'Pearson test of English Jaffna'],
    category: 'Exam Comparisons',
    date: 'April 2026',
    readTime: '7 min read',
    author: 'S. Ketheeswaran',
    authorRole: 'Senior IELTS & PTE Master Trainer',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Confused between taking IELTS or PTE? Discover how AI computer grading compares to human examiners, test duration differences, and which exam gives you the fastest score for Australia and the UK.',
    content: [
      {
        heading: 'The Big Dilemma: Should You Take IELTS or PTE?',
        paragraphs: [
          'For students and immigration applicants across Northern Sri Lanka, choosing between IELTS (International English Language Testing System) and PTE (Pearson Test of English Academic) is one of the most critical decisions. Both tests evaluate Listening, Reading, Writing, and Speaking, but the testing methods, scoring algorithms, and question formats differ significantly.',
          'At RK International Language Academy in Kilinochchi, our trainers frequently guide students through this exact decision based on their individual strengths in typing, speaking into a microphone, and handwriting.',
        ],
      },
      {
        heading: 'Key Differences at a Glance',
        paragraphs: [
          'Here is the breakdown of how PTE Academic and IELTS compare in real examination conditions:',
        ],
        bullets: [
          'Scoring Mechanism: PTE is 100% evaluated by Pearson AI algorithms with zero human subjectivity. IELTS speaking is face-to-face with a certified human examiner.',
          'Result Turnaround: PTE results are typically released within 48 hours (often under 24 hours). IELTS results take 3–5 days (computer) or 13 days (paper-based).',
          'Exam Duration: PTE takes approximately 2 hours in a single sitting. IELTS takes around 2 hours and 45 minutes, with speaking often scheduled separately.',
          'Typing Requirement: In PTE, all writing and listening tasks require typing on a keyboard at 35+ WPM. IELTS offers paper-based handwriting or computer options.',
        ],
      },
      {
        heading: 'Which Test is Better for Australia, UK, and Canada?',
        paragraphs: [
          'For Australian Study and Skilled Migration: PTE Academic is widely considered the superior choice. The Australian Department of Home Affairs awards full immigration points for PTE scores (65+ for 10 points, 79+ for 20 points), and many candidates find it easier to achieve 79+ using structured templates in PTE than getting Band 8.0 in IELTS Writing.',
          'For UK University Study: Both IELTS Academic (or UKVI) and PTE Academic are accepted by over 99% of UK universities. If you need a visa where UKVI security is mandatory, verify whether the institution requests standard IELTS or UKVI.',
          'For Canada Immigration (Express Entry): IELTS General Training (targeting CLB 9) remains the gold standard, although PTE Core is now also recognized for Canadian permanent residency.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is PTE easier than IELTS for Sri Lankan students?',
        a: 'PTE is often considered easier for students who are comfortable typing on a computer and who follow structured templates for speaking and writing. However, IELTS may be easier for students who prefer speaking face-to-face with a human rather than talking into a computer microphone.',
      },
      {
        q: 'How long are PTE and IELTS test scores valid?',
        a: 'Both IELTS and PTE Academic test score reports are valid for 2 years for university admissions and up to 3 years for Australian skilled migration.',
      },
      {
        q: 'Can I prepare for PTE in Kilinochchi?',
        a: 'Yes, RK International Language Academy operates a state-of-the-art computerized lab on A-9 Road near Theresamma Kovil, Kilinochchi, equipped with official Pearson practice software.',
      },
    ],
  },

  // 2. IELTS Academic vs General Training
  {
    slug: 'ielts-academic-vs-general-training',
    title: 'IELTS Academic vs. IELTS General Training: Complete Guide for Sri Lankan Students',
    metaTitle: 'IELTS Academic vs General Training: Key Differences | RK Academy',
    metaDescription: 'Understand the exact differences between IELTS Academic and General Training. Learn which exam you need for higher education, Canadian PR, or UK work visas.',
    keywords: ['IELTS Academic vs General', 'difference between IELTS tests', 'IELTS for Canada PR Sri Lanka', 'IELTS Academic Kilinochchi', 'General Training letter writing'],
    category: 'Exam Comparisons',
    date: 'April 2026',
    readTime: '6 min read',
    author: 'K. Nimalan',
    authorRole: 'IELTS Writing Specialist (Band 8.5)',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Do you need IELTS Academic or General Training? Discover the format differences in Reading and Writing Task 1, scoring variations, and country visa prerequisites.',
    content: [
      {
        heading: 'Why Choosing the Wrong IELTS Test Costs Time and Money',
        paragraphs: [
          'Every year, numerous test-takers register for the wrong IELTS module without realizing that immigration authorities and universities have strict, non-negotiable requirements.',
          'If you take IELTS General Training for university admission, your application will almost certainly be rejected. Conversely, if you sit for IELTS Academic when applying for Canadian Express Entry, you may face unnecessary difficulty with academic texts when workplace reading was all that was needed.',
        ],
      },
      {
        heading: 'Comparison of Reading and Writing Sections',
        paragraphs: [
          'While the Listening and Speaking sections are 100% identical in both tests, Reading and Writing are tailored to distinct environments:',
        ],
        bullets: [
          'Academic Writing Task 1: You must describe, summarize, or explain a graph, chart, table, map, or process diagram in at least 150 words.',
          'General Writing Task 1: You must write a formal, semi-formal, or informal letter responding to a real-life situation in at least 150 words.',
          'Academic Reading: 3 long scientific, historical, or analytical texts taken from books, journals, and newspapers.',
          'General Reading: Practical texts from employee handbooks, notices, timetables, advertisements, and workplace guidelines.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which test is required for Canadian Express Entry PR?',
        a: 'You must take IELTS General Training (or CELPIP / PTE Core). IELTS Academic is not accepted for Canadian Express Entry Federal Skilled Worker streams.',
      },
      {
        q: 'Which test do I need for nursing registration in the UK?',
        a: 'The Nursing and Midwifery Council (NMC) requires IELTS Academic (Band 7.0 overall with at least 7.0 in Reading, Listening, and Speaking, and 6.5 in Writing) or OET.',
      },
    ],
  },

  // 3. British Council vs IDP Sri Lanka
  {
    slug: 'british-council-vs-idp-sri-lanka',
    title: 'British Council vs. IDP IELTS in Sri Lanka: Fees, Venues & Test Dates (2026)',
    metaTitle: 'British Council vs IDP IELTS Sri Lanka: Which is Better? | RK Academy',
    metaDescription: 'Comparing British Council and IDP IELTS in Sri Lanka. Test center locations in Jaffna & Colombo, exam fees, examiner marking, and registration guidance.',
    keywords: ['British Council IELTS Sri Lanka', 'IDP IELTS Jaffna', 'IELTS fee Sri Lanka 2026', 'British Council registration Kilinochchi', 'IELTS test dates Sri Lanka'],
    category: 'Exam Comparisons',
    date: 'March 2026',
    readTime: '6 min read',
    author: 'Admissions Desk',
    authorRole: 'Official Registration Coordinator',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Is the British Council stricter than IDP? Learn the truth about examiner marking, official test venues in Northern Sri Lanka, fee structures, and registration assistance.',
    content: [
      {
        heading: 'Dispelling the Myth: Is IDP or British Council Easier?',
        paragraphs: [
          'One of the most persistent myths among students in Sri Lanka is that IDP examiners give higher speaking and writing marks than British Council examiners, or vice versa.',
          'The truth: Both British Council and IDP co-own IELTS alongside Cambridge Assessment English. Cambridge creates all test questions and strictly regulates examiner certification. Standardized marking criteria (rubrics) are applied globally, meaning your score will be identical regardless of whether you book through British Council or IDP.',
        ],
      },
      {
        heading: 'Test Dates and Venues in Northern Sri Lanka',
        paragraphs: [
          'Both providers conduct paper-based and computer-delivered tests in Sri Lanka. For students residing in Kilinochchi, Vavuniya, and Jaffna:',
        ],
        bullets: [
          'Computer-delivered IELTS sessions run almost daily at official test centers in Colombo and regular dates in Jaffna.',
          'Paper-based tests are typically held 2–4 times per month on Thursdays and Saturdays.',
          'RK International Language Academy provides hassle-free British Council and IDP test date booking right from our Kilinochchi campus.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can RK Academy assist with exam registration?',
        a: 'Yes! We guide all enrolled students step-by-step through passport verification, test date selection, and fee submission for both British Council and IDP.',
      },
      {
        q: 'Do universities care if I take British Council or IDP?',
        a: 'No. Both issue the official IELTS Test Report Form (TRF), which carries identical global validity and acceptance by 12,500+ universities worldwide.',
      },
    ],
  },

  // 4. UK Student Visa & UKVI
  {
    slug: 'uk-student-visa-ielts-requirements',
    title: 'UK Student Visa (Tier 4) & UKVI Requirements for Sri Lankan Students (2026)',
    metaTitle: 'UK Student Visa IELTS & UKVI Requirements (2026) | RK Academy',
    metaDescription: 'Complete guide to UK Student Visa IELTS requirements from Sri Lanka. CAS letter minimums, IELTS for UKVI vs standard IELTS, and Life Skills A1/B1.',
    keywords: ['UK student visa IELTS score Sri Lanka', 'IELTS for UKVI Kilinochchi', 'UK university admission requirements', 'CAS letter IELTS band', 'Tier 4 visa Sri Lanka'],
    category: 'Visa & Scores',
    date: 'March 2026',
    readTime: '8 min read',
    author: 'Faculty of Overseas Higher Education',
    authorRole: 'Visa Guidance & University Placement',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Planning to study in the United Kingdom? Review the exact minimum band scores required for undergraduate and master’s degrees, CAS issuance, and UKVI test rules.',
    content: [
      {
        heading: 'Understanding UK University Band Requirements',
        paragraphs: [
          'The United Kingdom remains one of the top destinations for Sri Lankan students pursuing undergraduate, Master’s, and PhD programs. However, UK Home Office visa rules and individual university admission criteria must be understood clearly.',
          'While the UK Visas and Immigration (UKVI) minimum for degree-level courses is CEFR Level B2 (equivalent to IELTS 5.5 in each component), top-ranking UK universities set their own higher benchmarks—typically requesting Band 6.0 to 6.5 for undergraduate degrees and Band 6.5 to 7.0 for postgraduate degrees.',
        ],
      },
      {
        heading: 'What is the Difference Between Standard IELTS and IELTS for UKVI?',
        paragraphs: [
          'The test content, questions, difficulty, and scoring of IELTS for UKVI are identical to standard IELTS. The only difference is the administrative protocol:',
        ],
        bullets: [
          'UKVI test sessions are recorded on CCTV, and test centers must meet specific UK Home Office security standards.',
          'Your Test Report Form will specify that you took an approved UKVI test, including a unique UKVI reference number required on your visa application.',
          'If you enroll in a pre-sessional English foundation course in the UK, IELTS for UKVI is strictly mandatory.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a UK university waive the IELTS requirement for Sri Lankans?',
        a: 'Some UK universities offer IELTS waivers if a student scored high grades (e.g. A or B) in GCE A/L General English, but visa rules often still require standardized English proficiency. Taking IELTS guarantees smooth visa processing.',
      },
      {
        q: 'What score is required for UK NHS Nurse Registration?',
        a: 'The Nursing and Midwifery Council (NMC) requires an overall IELTS Band 7.0 (with 7.0 in Reading, Listening, Speaking and 6.5 in Writing) or OET Grade B.',
      },
    ],
  },

  // 5. Canada Express Entry CLB 9 Guide
  {
    slug: 'canada-pr-express-entry-clb9-guide',
    title: 'How to Achieve CLB 9 in IELTS General for Canada Express Entry PR',
    metaTitle: 'How to Score CLB 9 in IELTS for Canada PR | RK Academy',
    metaDescription: 'Targeting Canadian Permanent Residency? Learn how achieving CLB 9 (Listening 8.0, Reading 7.0, Writing 7.0, Speaking 7.0) unlocks massive CRS bonus points.',
    keywords: ['CLB 9 IELTS score', 'Canada Express Entry IELTS', 'CRS score booster IELTS', 'IELTS General Kilinochchi', 'Canada immigration points Sri Lanka'],
    category: 'Visa & Scores',
    date: 'February 2026',
    readTime: '7 min read',
    author: 'S. Tharani',
    authorRole: 'Immigration & General Training Specialist',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover why CLB 9 is known as the "golden score" for Canadian Express Entry, adding up to 50+ extra CRS points, and the exact section scores required to achieve it.',
    content: [
      {
        heading: 'Why CLB 9 is the Golden Ticket for Canadian PR',
        paragraphs: [
          'In the Canadian Express Entry Comprehensive Ranking System (CRS), language proficiency is the single most controllable factor that can skyrocket your score.',
          'Under the Skill Transferability factors, jumping from CLB 8 to CLB 9 can award an astonishing 50 to 100 extra CRS points—often the difference between receiving an Invitation to Apply (ITA) or remaining stuck in the pool.',
        ],
      },
      {
        heading: 'The Exact Section Scores Needed for CLB 9',
        paragraphs: [
          'To achieve Canadian Language Benchmark (CLB) Level 9 in IELTS General Training, you must hit:',
        ],
        bullets: [
          'Listening: Band 8.0 (35 out of 40 questions correct)',
          'Reading: Band 7.0 (34 out of 40 questions correct)',
          'Writing: Band 7.0 (Strong task achievement, coherence, lexical resource, and grammatical accuracy)',
          'Speaking: Band 7.0 (Natural fluency, idiomatic vocabulary, and minimal hesitation)',
        ],
      },
    ],
    faqs: [
      {
        q: 'What happens if I get 8.0, 7.5, 7.5, but 6.5 in Writing?',
        a: 'Your overall CLB will drop to CLB 8 because every single section must meet or exceed the CLB 9 threshold. This is why targeted writing feedback at RK Academy is essential.',
      },
    ],
  },

  // 6. Australia Student & Migration Scores
  {
    slug: 'australia-migration-ielts-pte-scores',
    title: 'Australia Student & Skilled Migration: Required IELTS & PTE Scores (2026)',
    metaTitle: 'Australia Migration IELTS & PTE Scores | RK Academy Kilinochchi',
    metaDescription: 'Australian visa English language requirements: Competent, Proficient, and Superior English points breakdown for Subclass 189, 190, 491, and student visas.',
    keywords: ['Australia skilled migration English score', 'PTE 79 for Australia PR', 'Australia student visa IELTS band', 'PTE classes Kilinochchi', 'Australia PR points test'],
    category: 'Visa & Scores',
    date: 'February 2026',
    readTime: '6 min read',
    author: 'J. Pratheepan',
    authorRole: 'PTE 79+ Specialist',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Detailed breakdown of Competent, Proficient, and Superior English bands for Australian PR Subclass 189/190/491 visas, and why PTE Academic is popular for points.',
    content: [
      {
        heading: 'Australia Points Test for English Language Proficiency',
        paragraphs: [
          'Australia’s Department of Home Affairs awards points for general skilled migration based on verified English language test tiers:',
        ],
        bullets: [
          'Competent English (IELTS 6.0 in all bands / PTE 50 in all components): 0 Points (Mandatory visa baseline)',
          'Proficient English (IELTS 7.0 in all bands / PTE 65 in all components): 10 Points towards PR application',
          'Superior English (IELTS 8.0 in all bands / PTE 79 in all components): 20 Points towards PR application',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why do most Sri Lankan applicants prefer PTE for Australia?',
        a: 'Achieving PTE 79+ is generally more attainable than scoring Band 8.0 across all four IELTS sections—especially in Writing, where human examiners grade harshly.',
      },
    ],
  },

  // 7. Local Guide: Jaffna & Kilinochchi
  {
    slug: 'ielts-classes-in-jaffna-kilinochchi',
    title: 'Top IELTS & PTE Classes for Students in Jaffna, Kilinochchi & Northern Province',
    metaTitle: 'Best IELTS Classes in Kilinochchi & Jaffna | RK Academy',
    metaDescription: 'Looking for top IELTS and PTE coaching in Northern Sri Lanka? Learn why students from Jaffna, Kilinochchi, and Vavuniya choose RK International Language Academy.',
    keywords: ['IELTS classes in Kilinochchi', 'IELTS coaching Jaffna', 'PTE computer lab Northern Sri Lanka', 'best IELTS institute A-9 road', 'English classes Kilinochchi'],
    category: 'Local Guides',
    date: 'January 2026',
    readTime: '6 min read',
    author: 'Campus Director',
    authorRole: 'RK International Language Academy',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Why students across Jaffna and Northern Sri Lanka travel to our central A-9 campus or attend our interactive Zoom cohorts for Band 7.5+ and PTE 65+ results.',
    content: [
      {
        heading: 'Convenient A-9 Road Location in the Heart of Northern Province',
        paragraphs: [
          'Located directly on the central A-9 Road near Theresamma Kovil, Kilinochchi, RK International Language Academy provides accessible, high-standard IELTS, PTE, and English Diploma education.',
          'Students from Jaffna, Paranthan, Elephant Pass, Mankulam, and Vavuniya can easily reach our campus via daily public transport, while students further away join our interactive live online evening batches.',
        ],
      },
      {
        heading: 'World-Class Facilities at Kilinochchi Campus',
        paragraphs: [
          'Our academy features dedicated audio listening labs with noise-cancelling headphones, high-speed computerized PTE practice workstations, comfortable lecture rooms with easy A-9 Road access, and one-on-one speaking interview chambers.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Where is RK Academy located?',
        a: 'We are situated on the A-9 Road, Near Theresamma Kovil, Kilinochchi, Sri Lanka. Contact hotline: 074 0224 355.',
      },
    ],
  },

  // 8. Exam Strategy: Band 8 Writing Template
  {
    slug: 'ielts-writing-task-2-template-band-8',
    title: 'IELTS Writing Task 2: Band 8.0 Essay Template & Vocabulary Formula',
    metaTitle: 'IELTS Writing Task 2 Band 8.0 Essay Formula | RK Academy',
    metaDescription: 'Step-by-step Band 8.0 IELTS Writing Task 2 essay structure: introduction hook, thesis statement, topic sentences, cohesion markers, and academic vocabulary.',
    keywords: ['IELTS Writing Task 2 template', 'Band 8 essay structure', 'IELTS essay topics 2026', 'coherence and cohesion IELTS', 'writing task 2 Kilinochchi'],
    category: 'Tips & Strategy',
    date: 'January 2026',
    readTime: '8 min read',
    author: 'K. Nimalan',
    authorRole: 'IELTS Writing Specialist',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Learn the exact 4-paragraph essay formula our trainers use to help students score 7.5 to 8.5 in Academic and General Task 2 writing.',
    content: [
      {
        heading: 'The 4-Paragraph Formula for High-Band Essays',
        paragraphs: [
          'Writing Task 2 contributes two-thirds of your total IELTS Writing score. Examiners grade your essay across four distinct criteria, each worth 25%:',
        ],
        bullets: [
          'Task Achievement: Answering all parts of the question prompt with fully developed ideas.',
          'Coherence & Cohesion: Clear paragraphing, logical progression, and natural linking phrases.',
          'Lexical Resource: Precise vocabulary, collocations, and avoiding repetitive wording.',
          'Grammatical Range & Accuracy: Complex sentences, conditional clauses, and zero tense errors.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How many words should I write for Task 2?',
        a: 'The minimum is 250 words. We recommend writing between 260 and 285 words to develop ideas fully without running out of time to proofread.',
      },
    ],
  },

  // 9. PTE Write from Dictation Hacks
  {
    slug: 'pte-write-from-dictation-hacks',
    title: 'Top 10 PTE Write from Dictation & Repeat Sentence AI Hacks',
    metaTitle: 'PTE Write from Dictation & Repeat Sentence Hacks | RK Academy',
    metaDescription: 'Proven tips to score 79+ in PTE Listening and Speaking: Write from Dictation spelling tricks, Repeat Sentence chunking, and microphone placement.',
    keywords: ['PTE Write from Dictation hacks', 'PTE Repeat Sentence tips', 'PTE AI algorithm tricks', 'PTE computer lab Kilinochchi', 'PTE 79 strategy'],
    category: 'Tips & Strategy',
    date: 'January 2026',
    readTime: '6 min read',
    author: 'J. Pratheepan',
    authorRole: 'PTE 79+ Specialist',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Master the highest-weighted questions in PTE Academic. Learn how to capture 100% of Write from Dictation points and speak with flawless AI oral fluency.',
    content: [
      {
        heading: 'Why Write from Dictation is the Single Most Important PTE Task',
        paragraphs: [
          'In PTE Academic, Write from Dictation appears at the very end of the test but contributes nearly 30% of your total Listening score and 25% of your Writing score.',
          'Missing words or misspellings in this single section can drop your score from 79+ down to 60. At RK Academy, our students practice with our curated 2026 high-frequency prediction database.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I add extra words in Write from Dictation?',
        a: 'Yes, Pearson AI scoring currently does not penalize additional words if you are uncertain whether a word was singular or plural (e.g. typing both "project" and "projects").',
      },
    ],
  },

  // 10. Overcome Fear of Speaking English
  {
    slug: 'how-to-overcome-fear-of-speaking-english',
    title: 'How to Overcome Fear of Speaking English: 7 Practical Fluency Exercises',
    metaTitle: 'How to Overcome Fear of Speaking English | RK Academy',
    metaDescription: 'Eliminate hesitation, stage fear, and language anxiety. 7 proven daily spoken English exercises developed for students in Northern Sri Lanka.',
    keywords: ['how to speak English fluently', 'overcome fear of speaking English', 'spoken English classes Kilinochchi', 'English conversation practice', 'Diploma in English'],
    category: 'Tips & Strategy',
    date: 'January 2026',
    readTime: '5 min read',
    author: 'M. Dilakshan',
    authorRole: 'Spoken English & Fluency Coordinator',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Afraid of speaking English in public or interviews? Discover 7 practical techniques used in our Diploma in English classes to build instant conversational confidence.',
    content: [
      {
        heading: 'Language Anxiety is Natural—Here is How to Conquer It',
        paragraphs: [
          'Many students understand English when reading or listening, but freeze when asked to speak. This hesitation is not a lack of intelligence; it is a fear of making grammatical mistakes or mispronouncing words.',
          'At RK International Language Academy, our Spoken English courses create a motivating, judgment-free environment where students speak English from Day 1.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can an adult student learn fluent spoken English?',
        a: 'Absolutely. With structured daily role plays, vocabulary expansion, and guided conversational drills, students achieve conversational confidence in 8 to 12 weeks.',
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
