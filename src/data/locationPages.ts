// Location pages. Address, phone, fax and the "about" facts follow https://zionpt.com/ues/.
// TODO: the live site shows NO opening hours. These hours are placeholders. Replace with the clinic's real hours before launch.
export type Day = { day: string; open?: string; close?: string }; // 24h "HH:MM"; no open/close = closed
export type LocationPage = {
  slug: string; locIndex: number; name: string; headline: string; metaTitle: string; metaDescription: string;
  teamId: string; phone: string; fax: string; hss: boolean; timezone: string;
  intro: string[]; highlights: { title: string; text: string }[]; photos: { src: string; alt: string }[];
  cityPage: string; hours: Day[];
};

const weekdays = (open: string, close: string): Day[] => [
  { day: 'Monday', open, close }, { day: 'Tuesday', open, close }, { day: 'Wednesday', open, close }, { day: 'Thursday', open, close }, { day: 'Friday', open, close },
  { day: 'Saturday' }, { day: 'Sunday' },
];

export const locationPages: LocationPage[] = [
  {
    slug: 'upper-east-side', locIndex: 0, name: 'Upper East Side', teamId: 'ues', timezone: 'America/New_York', hss: true,
    headline: 'Physical therapy on the Upper East Side',
    metaTitle: 'Physical Therapy on the Upper East Side, NYC | Zion Physical Therapy',
    metaDescription: 'One-on-one physical therapy at 241 E 86th St, Suite 2B, New York. Orthopedic, Ehlers-Danlos and pelvic health care with a Doctor of Physical Therapy. See hours, the map, our team and services.',
    phone: '(212) 353-8693', fax: '347-507-5510', cityPage: '/services/orthopedic-physical-therapy/upper-east-side',
    intro: [
      'Our Upper East Side clinic sits in the heart of Manhattan’s UES, with easy access to public transportation, shops and restaurants.',
      'You are treated in a private room inside a bright, airy gym space with a boutique feel. Every session is one-on-one with your physical therapist.',
      'Our therapists care for the Upper East Side orthopedic, Ehlers-Danlos and pelvic health community with hands-on, patient-centered, evidence-based treatment.',
    ],
    highlights: [
      { title: 'Private rooms', text: 'A calm, private space for every session.' },
      { title: '100% one-on-one', text: 'Your therapist stays with you the whole visit.' },
      { title: 'Easy to reach', text: 'Close to public transportation, shops and restaurants.' },
    ],
    photos: [
      { src: '/images/real/loc-east.webp', alt: 'Bright treatment room at the Upper East Side clinic' },
      { src: '/images/real/gal-4.webp', alt: 'Green and black hexagon wall in the Upper East Side gym space' },
    ],
    hours: weekdays('08:00', '18:00'),
  },
  {
    slug: 'upper-west-side', locIndex: 1, name: 'Upper West Side', teamId: 'uws', timezone: 'America/New_York', hss: true,
    headline: 'Physical therapy on the Upper West Side',
    metaTitle: 'Physical Therapy on the Upper West Side, NYC | Zion Physical Therapy',
    metaDescription: 'One-on-one physical therapy at 310 West 72nd Street, Suite 1G, New York. Orthopedic, Ehlers-Danlos and pelvic health care with a Doctor of Physical Therapy. See hours, the map, our team and services.',
    phone: '(212) 353-8693', fax: '347-507-5510', cityPage: '/services/orthopedic-physical-therapy/upper-west-side',
    intro: [
      'Our Upper West Side clinic is on West 72nd Street, a short walk from the subway and Central Park.',
      'Every session is private and one-on-one with a Doctor of Physical Therapy, so you get focused, hands-on attention from start to finish.',
      'We care for West Side neighbors with orthopedic, sports, Ehlers-Danlos and pelvic health needs, with a personal plan built around your goals.',
    ],
    highlights: [
      { title: 'A personal plan', text: 'Care built around your goals, from the first visit.' },
      { title: '100% one-on-one', text: 'Your therapist stays with you the whole visit.' },
      { title: 'Near the subway', text: 'A short walk from transit and Central Park.' },
    ],
    photos: [
      { src: '/images/real/loc-west.webp', alt: 'Treatment space at the Upper West Side clinic' },
      { src: '/images/real/gal-2.webp', alt: 'Therapist and patient working together at a Zion clinic' },
    ],
    hours: weekdays('08:00', '18:00'),
  },
  {
    slug: 'jersey-city', locIndex: 2, name: 'Jersey City', teamId: 'jersey-city', timezone: 'America/New_York', hss: false,
    headline: 'Physical therapy in Jersey City',
    metaTitle: 'Physical Therapy in Jersey City, NJ | Zion Physical Therapy',
    metaDescription: 'One-on-one physical therapy at 525 Washington Blvd, 2nd Floor, Jersey City. Orthopedic and pelvic health care with a Doctor of Physical Therapy. See hours, the map, our team and services.',
    phone: '(212) 353-8693', fax: '347-507-5510', cityPage: '/services/orthopedic-physical-therapy/jersey-city',
    intro: [
      'Our Jersey City clinic is on Washington Boulevard, close to the waterfront and the PATH train.',
      'It brings the same one-on-one care as our Manhattan clinics across the river, guided by Dr. Staci Levine.',
      'We help Hudson County patients with orthopedic injuries, sports recovery and pelvic health, with hands-on, evidence-based treatment.',
    ],
    highlights: [
      { title: 'Expert-led care', text: 'Guided by Dr. Staci Levine, a leader in pelvic health.' },
      { title: '100% one-on-one', text: 'Your therapist stays with you the whole visit.' },
      { title: 'By the waterfront', text: 'Close to transit, so a visit fits easily into your day.' },
    ],
    photos: [
      { src: '/images/real/loc-jersey.webp', alt: 'Treatment space at the Jersey City clinic' },
      { src: '/images/real/gal-3.webp', alt: 'Hands-on treatment at a Zion clinic' },
    ],
    hours: weekdays('08:00', '18:00'),
  },
  {
    slug: 'westport', locIndex: 3, name: 'Westport', teamId: 'westport', timezone: 'America/New_York', hss: false,
    headline: 'Physical therapy in Westport, CT',
    metaTitle: 'Physical Therapy in Westport, CT | Zion Physical Therapy',
    metaDescription: 'One-on-one physical therapy at 1555 Post Road East, Suite 102, Westport, CT. Orthopedic and pelvic health care led by Dr. Saul Zion. See hours, the map, our team and services.',
    phone: '(212) 353-8693', fax: '347-507-5510', cityPage: '/services/orthopedic-physical-therapy/westport',
    intro: [
      'Our Westport clinic on the Post Road brings Zion care to Fairfield County, led by our founder, Dr. Saul Zion.',
      'You get a private, one-on-one session with a Doctor of Physical Therapy, never a crowded gym floor.',
      'We treat orthopedic and sports injuries, and support pelvic health, with a plan that fits your life.',
    ],
    highlights: [
      { title: 'Led by our founder', text: 'Dr. Saul Zion treats patients in Westport.' },
      { title: '100% one-on-one', text: 'Your therapist stays with you the whole visit.' },
      { title: 'On the Post Road', text: 'Easy to reach by car, with simple access.' },
    ],
    photos: [
      { src: '/images/real/loc-westport.webp', alt: 'Treatment space at the Westport clinic' },
      { src: '/images/real/gal-5.webp', alt: 'Physical therapy session at a Zion clinic' },
    ],
    hours: weekdays('08:00', '18:00'),
  },
];
