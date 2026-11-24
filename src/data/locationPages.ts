// Location pages. Address, phone, fax and the "about" facts follow https://zionpt.com/ues/.
// Hours and about text follow the client's email of 18 Nov 2026 (Mon-Thu 7am-8pm, Fri 7am-5pm).
export type Day = { day: string; open?: string; close?: string }; // 24h "HH:MM"; no open/close = closed
export type LocationPage = {
  slug: string; locIndex: number; name: string; headline: string; metaTitle: string; metaDescription: string;
  teamId: string; phone: string; fax: string; hss: boolean; timezone: string;
  intro: string[]; highlights: { title: string; text: string }[]; photos: { src: string; alt: string }[];
  cityPage: string; hours: Day[];
};

const clinicHours: Day[] = [
  { day: 'Monday', open: '07:00', close: '20:00' }, { day: 'Tuesday', open: '07:00', close: '20:00' }, { day: 'Wednesday', open: '07:00', close: '20:00' }, { day: 'Thursday', open: '07:00', close: '20:00' },
  { day: 'Friday', open: '07:00', close: '17:00' }, { day: 'Saturday' }, { day: 'Sunday' },
];

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
      "Zion Physical Therapy is conveniently located in the heart of Manhattan’s Upper East Side (UES), with easy access to public transportation and parking. Our modern, welcoming clinic features private treatment rooms and a bright, spacious gym with a boutique feel, where we provide 100% one-on-one physical therapy sessions tailored to your individual needs and goals.",
      "Our highly skilled physical therapists specialize in sports physical therapy, orthopedic rehabilitation, Ehlers-Danlos syndromes (EDS), hypermobility, vestibular rehabilitation, and pelvic floor physical therapy for women and men, delivering personalized, hands-on, evidence-based care to the Upper East Side community and beyond.",
      "At Zion Physical Therapy, our mission is to improve your health, restore your mobility, and empower you to take an active role in your recovery. We want every patient to leave feeling stronger, more confident, and ready to return to the activities they love.",
      "Experience the difference of personalized physical therapy on Manhattan’s Upper East Side!",
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
    hours: clinicHours,
  },
  {
    slug: 'upper-west-side', locIndex: 1, name: 'Upper West Side', teamId: 'uws', timezone: 'America/New_York', hss: true,
    headline: 'Physical therapy on the Upper West Side',
    metaTitle: 'Physical Therapy on the Upper West Side, NYC | Zion Physical Therapy',
    metaDescription: 'One-on-one physical therapy at 310 West 72nd Street, Suite 1G, New York. Orthopedic, Ehlers-Danlos and pelvic health care with a Doctor of Physical Therapy. See hours, the map, our team and services.',
    phone: '(212) 353-8693', fax: '347-507-5510', cityPage: '/services/orthopedic-physical-therapy/upper-west-side',
    intro: [
      "Zion Physical Therapy is conveniently located in the heart of Manhattan’s Upper West Side (UWS), with easy access to public transportation and parking. Our modern, welcoming clinic features private treatment rooms and a bright, spacious gym, where we provide 100% one-on-one physical therapy sessions tailored to your individual needs and goals.",
      "Our highly skilled physical therapists specialize in sports physical therapy, orthopedic rehabilitation, Ehlers-Danlos syndromes (EDS), hypermobility, vestibular rehabilitation, and pelvic floor physical therapy for women and men, delivering personalized, hands-on, evidence-based care to the Upper West Side community and beyond.",
      "At Zion Physical Therapy, our mission is to improve your health, restore your mobility, and empower you to take an active role in your recovery. We want every patient to leave feeling stronger, more confident, and ready to return to the activities they love.",
      "Experience the difference of personalized physical therapy on Manhattan’s Upper West Side!",
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
    hours: clinicHours,
  },
  {
    slug: 'jersey-city', locIndex: 2, name: 'Jersey City', teamId: 'jersey-city', timezone: 'America/New_York', hss: false,
    headline: 'Physical therapy in Jersey City',
    metaTitle: 'Physical Therapy in Jersey City, NJ | Zion Physical Therapy',
    metaDescription: 'One-on-one physical therapy at 525 Washington Blvd (inside Fitness Factory), Jersey City. Orthopedic and pelvic health care with a Doctor of Physical Therapy. See hours, the map, our team and services.',
    phone: '(212) 353-8693', fax: '347-507-5510', cityPage: '/services/orthopedic-physical-therapy/jersey-city',
    intro: [
      "Zion Physical Therapy is conveniently located in the heart of Jersey City, New Jersey, inside Fitness Factory gym and directly across from the Newport PATH station, offering easy access for patients throughout Jersey City, Hudson County, and Manhattan. Our modern, welcoming clinic features a dedicated private treatment room and access to a spacious, fully equipped gym for rehabilitation, strength training, golf simulation, and functional movement. We provide 100% one-on-one physical therapy sessions tailored to your individual needs and goals, combining personalized care with the benefits of a full fitness facility.",
      "Our highly skilled physical therapists specialize in sports physical therapy, orthopedic rehabilitation, Ehlers-Danlos syndromes (EDS), hypermobility, vestibular rehabilitation, and pelvic floor physical therapy for women and men, delivering personalized, hands-on, evidence-based care to the Jersey City community and beyond.",
      "At Zion Physical Therapy, our mission is to improve your health, restore your mobility, and empower you to take an active role in your recovery. We want every patient to leave feeling stronger, more confident, and ready to return to the activities they love.",
      "Experience the difference of personalized physical therapy in Jersey City, New Jersey!",
    ],
    highlights: [
      { title: 'Expert-led care', text: 'Guided by Dr. Staci Levine, a leader in pelvic health.' },
      { title: '100% one-on-one', text: 'Your therapist stays with you the whole visit.' },
      { title: 'Across from PATH', text: 'Directly across from the Newport PATH station.' },
    ],
    photos: [
      { src: '/images/real/loc-jersey.webp', alt: 'Treatment space at the Jersey City clinic' },
      { src: '/images/real/gal-3.webp', alt: 'Hands-on treatment at a Zion clinic' },
    ],
    hours: clinicHours,
  },
  {
    slug: 'westport', locIndex: 3, name: 'Westport', teamId: 'westport', timezone: 'America/New_York', hss: false,
    headline: 'Physical therapy in Westport, CT',
    metaTitle: 'Physical Therapy in Westport, CT | Zion Physical Therapy',
    metaDescription: 'One-on-one physical therapy at 1555 Post Road East, Suite 102, Westport, CT. Orthopedic and pelvic health care led by Dr. Saul Zion. See hours, the map, our team and services.',
    phone: '(212) 353-8693', fax: '347-507-5510', cityPage: '/services/orthopedic-physical-therapy/westport',
    intro: [
      "Zion Physical Therapy is conveniently located in the heart of Westport, Connecticut, providing personalized, high-quality physical therapy to patients throughout Westport and the surrounding Fairfield County communities. Our modern, welcoming clinic shares space with Sherpa, giving our patients access to a fully equipped gym for rehabilitation, strength training, and functional movement as needed throughout their treatment. We also maintain our own dedicated private treatment space, allowing us to provide 100% one-on-one physical therapy sessions tailored to your individual needs and goals.",
      "Our highly skilled physical therapists specialize in sports physical therapy, orthopedic rehabilitation, Ehlers-Danlos syndromes (EDS), hypermobility, vestibular rehabilitation, and pelvic floor physical therapy for men, delivering personalized, hands-on, evidence-based care to the Westport community and beyond.",
      "At Zion Physical Therapy, our mission is to improve your health, restore your mobility, and empower you to take an active role in your recovery. We want every patient to leave feeling stronger, more confident, and ready to return to the activities they love.",
      "Experience the difference of personalized physical therapy in Westport, Connecticut!",
    ],
    highlights: [
      { title: 'Led by our founder', text: 'Dr. Saul Zion treats patients in Westport.' },
      { title: '100% one-on-one', text: 'Your therapist stays with you the whole visit.' },
      { title: 'Shared gym access', text: 'A fully equipped gym next door, as needed.' },
    ],
    photos: [
      { src: '/images/real/loc-westport.webp', alt: 'Treatment space at the Westport clinic' },
      { src: '/images/real/gal-5.webp', alt: 'Physical therapy session at a Zion clinic' },
    ],
    hours: clinicHours,
  },
];
