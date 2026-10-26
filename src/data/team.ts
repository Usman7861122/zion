export type Member = { name: string; role: string; creds: string[]; bio: string; photo: string };
export type Group = { id: string; label: string; short: string; blurb: string; members: Member[] };

const saul: Member = {
  name: 'Dr. Saul Zion', role: 'Founder & CEO · Westport Physical Therapist', photo: '/images/team/saul.webp',
  creds: ['DPT', 'OCS', 'Cert. SMT', 'CMP', 'CSCS', 'Advanced Hip Clinician'],
  bio: 'A graduate of the University at Buffalo, where he earned his Doctor of Physical Therapy in 2005. He founded Zion Physical Therapy.',
};

export const team: Group[] = [
  {
    id: 'leadership', label: 'Leadership', short: 'Leaders', blurb: 'The people who built Zion and shape how every visit feels.',
    members: [
      saul,
      { name: 'Dr. Staci Levine', role: 'COO & Pelvic Health Program Director', photo: '/images/team/staci.webp', creds: ['DPT', 'OCS', 'PRPC', 'Advanced Hip Clinician'],
        bio: 'A University of Maryland graduate with a degree in Kinesiology. She earned her Doctor of Physical Therapy in 2008.' },
    ],
  },
  {
    id: 'ues', label: 'Upper East Side', short: 'UES', blurb: 'Our Manhattan clinic on the Upper East Side.',
    members: [
      { name: 'Dr. Elizabeth McAneny', role: 'Upper East Side Physical Therapist', photo: '/images/team/elizabeth.webp', creds: ['DPT', 'CSCS'],
        bio: 'A Columbia University graduate. She grew up dancing and first met physical therapy as a patient.' },
      { name: 'Dr. Madison Caloss', role: 'Upper East Side Physical Therapist', photo: '/images/team/madison.webp', creds: ['PT', 'DPT', 'CSCS'],
        bio: 'Earned her doctorate at New York University. An active Texas childhood playing many sports sparked her love of movement.' },
      { name: 'Mitchell Levine', role: 'Upper East Side Physical Therapist', photo: '/images/team/mitchell.webp', creds: ['DPT'],
        bio: 'Raised in Ponte Vedra, Florida. He studied athletic training at Florida State and gave on-field care across many sports.' },
    ],
  },
  {
    id: 'uws', label: 'Upper West Side', short: 'UWS', blurb: 'Our Manhattan clinic on the Upper West Side.',
    members: [
      { name: 'Dr. Emma Raccaro', role: 'Upper West Side Physical Therapist', photo: '/images/team/emma.webp', creds: ['PT', 'DPT'],
        bio: 'Studied Health Science and earned her doctorate at Springfield College, with a minor in Psychology.' },
      { name: 'Taden Gery', role: 'Upper West Side Physical Therapist', photo: '/images/team/taden.webp', creds: ['DPT'],
        bio: 'A Columbia University graduate. He first studied Exercise Science, with a minor in Strength & Conditioning, at the University of Delaware.' },
      { name: 'Erika Moran', role: 'Upper West Side Physical Therapist', photo: '/images/team/erika.webp', creds: ['DPT'],
        bio: 'Earned her doctorate at Northeastern University and worked in Greater Boston clinics before moving to New York City.' },
    ],
  },
  {
    id: 'westport', label: 'Westport, CT', short: 'Westport', blurb: 'Our Connecticut clinic, close to home.',
    members: [
      saul,
      { name: 'Jacob Krasznai', role: 'Westport Physical Therapist', photo: '/images/team/jacob.webp', creds: [],
        bio: 'Earned his bachelor’s in Exercise Science and his doctorate in physical therapy at Sacred Heart University.' },
    ],
  },
];
