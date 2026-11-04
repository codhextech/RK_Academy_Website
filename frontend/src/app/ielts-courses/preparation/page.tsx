import { redirect } from 'next/navigation';

export default function PreparationRedirectPage() {
  // Redirect legacy multi-course preparation page to the courses hub with dedicated pages
  redirect('/ielts-courses');
}
