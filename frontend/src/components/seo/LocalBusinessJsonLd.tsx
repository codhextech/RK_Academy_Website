import React from 'react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': 'https://rkacademy.lk/#organization',
    name: ACADEMY_INFO.name,
    alternateName: ['RK Academy', 'RK International Academy Kilinochchi'],
    description:
      'Premier IELTS Academic, IELTS General Training, and English Language Academy in Kilinochchi, Sri Lanka. British Council & IDP exam preparation.',
    url: 'https://rkacademy.lk',
    telephone: ACADEMY_INFO.phoneFormatted,
    email: ACADEMY_INFO.email,
    logo: 'https://rkacademy.lk/images/logo/rk-logo.png',
    image: 'https://rkacademy.lk/images/logo/rk-logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'A-9 Road, Near Theresamma Kovil',
      addressLocality: 'Kilinochchi',
      addressRegion: 'Northern Province',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.3900,
      longitude: 80.4000,
    },
    hasMap: ACADEMY_INFO.googleMapsUrl,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Kilinochchi' },
      { '@type': 'AdministrativeArea', name: 'Jaffna' },
      { '@type': 'AdministrativeArea', name: 'Northern Province' },
      { '@type': 'AdministrativeArea', name: 'Vavuniya' },
      { '@type': 'AdministrativeArea', name: 'Mullaitivu' },
      { '@type': 'AdministrativeArea', name: 'Mannar' },
      { '@type': 'Country', name: 'Sri Lanka' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://facebook.com',
      'https://instagram.com',
    ],
    priceRange: 'LKR',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
