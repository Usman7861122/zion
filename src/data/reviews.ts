export type LocationId = 'ues' | 'uws' | 'jersey' | 'westport';
export type Review = {
  name: string;
  text: string;
  featured?: boolean;
  /** 'Google' = pulled from the Google reviews widget on zionpt.com/testimonials (5 stars). */
  source?: 'Google';
  /** Only set when the review names a staff member whose clinic is listed on zionpt.com/staff. */
  locations?: LocationId[];
};

export const locationFilters: { id: 'all' | LocationId; label: string }[] = [
  { id: 'all', label: 'All locations' },
  { id: 'ues', label: 'Upper East Side' },
  { id: 'uws', label: 'Upper West Side' },
  { id: 'jersey', label: 'Jersey City' },
  { id: 'westport', label: 'Westport' },
];

// Texts are copied word for word from zionpt.com (testimonials page and home page). Dates are left out so they never go stale.
// TODO: tag the untagged reviews once the client confirms which clinic each patient visited.
export const reviews: Review[] = [
  {
    name: 'Bruce Uydess', featured: true, source: 'Google', locations: ['ues'], // names Elizabeth McAneny (UES)
    text: 'I’m a 75 year old retiree, living alone. About 4 months ago, my dog knocked me down and I broke my right hip. Speaking with friends who had knee or hip replacements, they all said good Physical Therapy (PT) was the only guarantee for successful healing. I was given a list of local Physical Therapy Practices near me. I made an appointment with Elizabeth McAneney at Zion for a consult. I was impressed with Elizabeth and the Zion facility. The PT plan Elizabeth started me with took into consideration my age, physical condition and medical history. My progress was noticeable almost immediately and within a month my hip replacement was healing great and I was walking unassisted. Elizabeth adjusted my routine, sets and difficulty over the next few month. I’m going on vacation for a month and will do my routine on my own, but plan on continuing with Zion upon my return.',
  },
  { name: 'Michelle', source: 'Google', locations: ['ues'], text: 'So happy I was able to do my 5 months of PT at Zion. Elizabeth was wonderful and pushed me just enough to get me to the next level without scaring me off! I looked forward to each appointment. Thankful for Elizabeth\'s knowledge and training.' },
  { name: 'Melanie Grai', source: 'Google', locations: ['ues'], text: 'I had a great experience here, from start to finish, the receptionist is warm and helpful and Elizabeth is an incredible Physical Therapist.' },
  { name: 'Jenna Schulner', locations: ['ues'], text: 'Lauren was so helpful to me after my surgery. Within a few sessions of pelvic floor PT, I noticed improvement in my symptoms. I only wish I had met her sooner! Also, Krydia is so helpful at the front!' }, // names Krydia (UES care coordinator)
  { name: 'Kara Tullman', source: 'Google', text: 'Lauren Newman was a really amazing pelvic floor therapist! I was having some shooting pains, and she made me feel comfortable and calm from the start of our first session. It\'s super important to feel at ease with a pelvic PT, and she curated a safe environment for me to express my concerns while also making me feel good about my progress and long-term goals. Definitely recommend her!' },
  { name: 'Samantha Bryk', source: 'Google', text: 'Lauren Newman was an awesome Pelvic PT who I learned a lot from and felt very supported by. She was patient, kind, and caring! She took the time to explain things and address any concerns or questions.' },
  { name: 'Stacey Katzen', source: 'Google', text: 'I had a very good experience at Zion. I was having some pretty painful back pain, and the therapy helped made a huge difference.' },
  { name: 'Nathan Zapolsky', text: 'Amber, who worked with us to schedule and meet our situation’s needs, was absolutely the most helpful, accommodating, and amazingly bright part in the process of finding a physical therapist. Simply excellent.' },
  { name: 'Colonel Abrams', text: 'Dr. Cesare is expert, caring, generous, patient and incredibly focused. You couldn’t ask for a better physiotherapy experience.' },
  { name: 'Harris Cowan', source: 'Google', text: 'Great physical therapists and very good facilities.' },
];
