import { R2_MEDIA } from './constants';

export interface TrainerOrStaff {
  id: string;
  name: string;
  role: string;
  badge: string;
  image: string;
  organizationOrUniversity?: string;
  qualifications: string[];
  specialties: string[];
}

export const ACADEMY_FACULTY_AND_STAFF: TrainerOrStaff[] = [
  {
    id: 'nepethika-nesakumaran',
    name: 'Nepethika Nesakumaran',
    role: 'Admin Officer',
    badge: 'Administration & Admissions',
    image: R2_MEDIA.trainers.nepethika,
    organizationOrUniversity: 'RK International Language Academy',
    qualifications: [
      'Administrative & Academy Operations Lead',
      'Student Admissions & Enrollment Coordinator',
      'Official Exam Registration Counseling (British Council & Pearson)',
    ],
    specialties: [
      'Student Inquiries & Course Guidance',
      'Batch Scheduling & Attendance Management',
      'Exam Booking & Verification Assistance',
    ],
  },
  {
    id: 'senior-lecturer-language',
    name: 'Senior Lecturer',
    role: 'Lecturer & Language Specialist',
    badge: 'English, IELTS, PTE & Diplomas',
    image: R2_MEDIA.trainers.seniorLecturer,
    organizationOrUniversity: 'RK International Language Academy',
    qualifications: [
      'Senior English Language & Examination Lecturer',
      'IELTS, PTE & Pearson English Preparation Coach',
      'Diploma in English & Spoken Fluency Curriculum Lead',
    ],
    specialties: [
      'IELTS, PTE & Pearson Exam Strategies',
      'Diploma in English & Spoken Fluency',
      'Grammar, Vocabulary & Writing Foundations',
    ],
  },
  {
    id: 'kamshaliny-raju',
    name: 'Kamshaliny Raju, BSc',
    role: 'English Lecturer',
    badge: 'BSc (Univ. of Peradeniya)',
    image: R2_MEDIA.trainers.kamshaliny,
    organizationOrUniversity: 'RK International Language Academy',
    qualifications: [
      'English Lecturer – RK International Language Academy',
      'Bachelor of Science (BSc) – University of Peradeniya',
      'English Language & Academic Communication Specialist',
    ],
    specialties: [
      'Structured English Grammar & Writing',
      'Comprehension & Academic Reading Analysis',
      'Interactive Student Mentorship & Fluency Drills',
    ],
  },
  {
    id: 'paskaran-ezhilsanth',
    name: 'Paskaran Ezhilsanth',
    role: 'IT Lecturer',
    badge: 'Information Technology (IT)',
    image: R2_MEDIA.trainers.paskaran,
    organizationOrUniversity: 'RK International Language Academy',
    qualifications: [
      'IT Lecturer – RK International Language Academy',
      'Child Development Coordinator – Child Action Lanka',
      'BSc in Software Engineering (2nd Year) | Diploma in Social Science',
    ],
    specialties: [
      'Diploma in Information Technology (IT)',
      'Computer Applications & Modern Productivity Tools',
      'Practical Software Basics & Digital Literacy',
    ],
  },
];
