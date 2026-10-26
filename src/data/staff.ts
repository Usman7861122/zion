// Content follows https://zionpt.com/staff/ (names, credentials, roles and bio excerpts are word for word).
// TODO: point `href` at the new individual profile pages when they are built (now the live site's pages).
export type Person = { name: string; creds: string[]; role: string; excerpt: string; photo?: string; href: string;
  /** Only people with a full profile have these. The page /team/<slug> is built for them. */
  slug?: string; lead?: string; education?: { label: string; school: string; detail: string }[]; focus?: string[]; clinics?: string[]; bio?: string[]; };
export type Category = { id: string; tab: string; title: string; kicker: string; address?: string; people: Person[]; intro: string; photo: string; alt: string; points: string[] };

const staci: Person = {
  name: 'Dr. Staci Levine', creds: ['DPT', 'OCS', 'PRPC', 'Advanced Hip Clinician'], role: 'COO & Pelvic Health Program Director',
  excerpt: 'Staci is a graduate of the University of Maryland, where she received her Bachelor of Science degree in Kinesiology. In 2008, Staci earned her Doctor of Physical Therapy…',
  photo: '/images/team/staci.webp', href: '/team/staci-levine',
  slug: 'staci-levine',
  lead: 'Staci has a passion for treating athletes, runners and triathletes, and for caring for patients before and after pregnancy and with pelvic floor problems.',
  education: [
    { label: 'Undergraduate', school: 'University of Maryland', detail: 'Bachelor of Science in Kinesiology' },
    { label: 'Doctorate · 2008', school: 'Columbia University', detail: 'Doctor of Physical Therapy, with honors (2008)' },
    { label: 'Board certification', school: 'American Physical Therapy Association', detail: 'Board certified as an Orthopedic Certified Specialist (OCS)' },
    { label: 'Membership', school: 'APTA sections', detail: 'Member of the Orthopedic and Women’s Health Sections' },
  ],
  focus: ['Athletes, runners and triathletes', 'Orthopedic and sports injuries', 'Before and after surgery', 'Prenatal and post-partum care', 'Pelvic floor dysfunction'],
  clinics: ['ues', 'jersey-city'],
};

export const categories: Category[] = [
  {
    id: 'ues', tab: 'Upper East Side', title: 'The UES Team', kicker: 'Upper East Side, Manhattan', address: '241 E 86th St, Suite 2B, New York, NY 10028',
    intro: 'A bright, calm clinic on East 86th Street. Your Upper East Side team treats bones, joints, sports injuries and pelvic health, always one-on-one with a Doctor of Physical Therapy.', photo: '/images/real/loc-east.webp', alt: 'Treatment room at the Upper East Side clinic', points: ['Orthopedic care', 'Pelvic health', 'Sports recovery'],
    people: [
      staci,
      { name: 'Dr. Elizabeth McAneny', creds: ['DPT', 'CSCS'], role: 'UES Physical Therapist', photo: '/images/team/elizabeth.webp', href: 'https://zionpt.com/meet-elizabeth/',
        excerpt: 'Elizabeth is a graduate of Columbia University where she received her Doctorate of Physical Therapy. Elizabeth grew up dancing and was first introduced to physical therapy as a patient…' },
      { name: 'Dr. Madison Caloss', creds: ['PT', 'DPT', 'CSCS'], role: 'UES Physical Therapist', photo: '/images/team/madison.webp', href: 'https://zionpt.com/meet-madison/',
        excerpt: 'Madison Caloss graduated from New York University with her Doctorate of Physical Therapy. She grew up in Texas where an active childhood spent playing multiple sports sparked her passion for movement, fitness, and performance…' },
      { name: 'Mitchell Levine', creds: ['DPT'], role: 'UES Physical Therapist', photo: '/images/team/mitchell.webp', href: 'https://zionpt.com/mitchell-levine-dpt/',
        excerpt: 'Born and raised in Ponte Vedra Florida. I went to Florida State University for my undergraduate bachelors of science with a major in athletic training. I got to experience on-field care with many sports over my 4 years at FSU…' },
    ],
  },
  {
    id: 'uws', tab: 'Upper West Side', title: 'The UWS Team', kicker: 'Upper West Side, Manhattan', address: '310 West 72nd Street, Suite 1G, New York, NY 10023',
    intro: 'A welcoming space on West 72nd Street. Our Upper West Side clinicians build a personal plan around your goals, from first visit to full recovery.', photo: '/images/real/loc-west.webp', alt: 'Inside the Upper West Side clinic', points: ['Personal plans', 'Hands-on care', 'Step-by-step progress'],
    people: [
      { name: 'Dr. Emma Raccaro', creds: ['PT', 'DPT'], role: 'UWS Physical Therapist', photo: '/images/team/emma.webp', href: 'https://zionpt.com/meet-emma/',
        excerpt: 'Emma Raccaro earned her Bachelor’s degree in Health Science Pre-Physical Therapy and Doctoral degree in Physical Therapy from Springfield College in Massachusetts. She also completed a minor in Psychology…' },
      { name: 'Taden Gery', creds: ['DPT'], role: 'UWS Physical Therapist', photo: '/images/team/taden.webp', href: 'https://zionpt.com/meet-taden/',
        excerpt: 'Taden is a Columbia University graduate, where he earned his Doctorate of Physical Therapy. His previous education includes a bachelor’s degree in Exercise Science and a minor in Strength & Conditioning from the University of Delaware.' },
      { name: 'Erika Moran', creds: ['DPT'], role: 'UWS Physical Therapist', photo: '/images/team/erika.webp', href: 'https://zionpt.com/meet-erika/',
        excerpt: 'Erika earned her Doctorate in Physical Therapy and Bachelor of Science in Rehabilitation Science with a minor in Psychology from Northeastern University. Throughout her career, she has worked at various clinics in the Greater Boston area before recently relocating to New York City.' },
    ],
  },
  {
    id: 'westport', tab: 'Westport', title: 'The Westport Team', kicker: 'Westport, Connecticut', address: '1555 Post Road East, Suite 102, Westport, CT 06880',
    intro: 'Our Connecticut clinic on the Post Road brings the same Zion care to Fairfield County, led by our founder, Dr. Saul Zion.', photo: '/images/real/loc-westport.webp', alt: 'Inside the Westport clinic', points: ['Led by our founder', 'One-on-one visits', 'Orthopedic care'],
    people: [
      { name: 'Dr. Saul Zion', creds: ['DPT', 'OCS', 'Cert. SMT', 'CMP', 'CSCS', 'Advanced Hip Clinician', 'BFR Certified with Suji'], role: 'Founder and CEO · Westport, CT Physical Therapist', photo: '/images/team/saul.webp', href: 'https://zionpt.com/meet-saul/',
        excerpt: 'Saul is a graduate of the University at Buffalo where he received his Doctor of Physical Therapy degree in 2005.' },
      { name: 'Jacob Krasznai', creds: [], role: 'Westport Physical Therapist', photo: '/images/team/jacob.webp', href: 'https://zionpt.com/jacob-krasznai/',
        excerpt: 'Jacob Krasznai earned his Bachelor’s degree in Exercise Science and his Doctoral degree in Physical Therapy from Sacred Heart University.' },
    ],
  },
  {
    id: 'jersey-city', tab: 'Jersey City', title: 'Jersey City', kicker: 'Jersey City, New Jersey', address: '525 Washington Blvd, 2nd Floor, Jersey City, NJ 07310',
    intro: 'Right on Washington Boulevard, our Jersey City clinic offers the same one-on-one care across the river, guided by Dr. Staci Levine.', photo: '/images/real/loc-jersey.webp', alt: 'Inside the Jersey City clinic', points: ['Pelvic health', 'Orthopedic care', 'Personal plans'],
    people: [staci],
  },
  {
    id: 'admin', tab: 'Admin Team', title: 'Admin Team', kicker: 'Front desk and care coordination',
    intro: 'The people who answer your calls, help with scheduling and make every visit feel easy, so you can focus on getting better.', photo: '/images/about/about-2.webp', alt: 'Reception desk at Zion Physical Therapy', points: ['Scheduling', 'Care coordination', 'Friendly welcome'],
    people: [
      { name: 'Krydia Ddungu', creds: [], role: 'UES Care Coordinator', href: 'https://zionpt.com/meet-krydia/',
        excerpt: 'Krydia is a recent graduate of Saint Louis University with a Bachelor’s Degree in Health Sciences. She later plans to go back to school and pursue a M.P.H in Global Health or Epidemiology…' },
      { name: 'Laura Matthei', creds: [], role: 'Office Manager', photo: '/images/team/laura.webp', href: 'https://zionpt.com/meet-laura/', excerpt: 'Coming Soon!' },
    ],
  },
];

// Profile pages for everyone else. Facts follow each person's page on https://zionpt.com (bios rewritten in our own words).
// TODO: clinic to review. Live profile pages disagree with the staff page on a few details (Jacob and Krydia are labeled UWS on their own pages).
type Extra = Partial<Person> & { slug: string };
const extra: Record<string, Extra> = {
  'Dr. Elizabeth McAneny': { slug: 'elizabeth-mcaneny', clinics: ['ues'],
    lead: 'A Columbia-trained physical therapist who brings dance, strength training and research to patient-centered care.',
    bio: [
      'Elizabeth earned her Doctor of Physical Therapy at Columbia University. She first met physical therapy as a patient, after a dance injury in her first year of college.',
      'She studied biology and dance at Barnard College, worked as a clinical research coordinator, and took part in research at Columbia’s Neurorehabilitation Lab and Dance Research Team.',
      'Elizabeth also has experience as a personal trainer and group fitness coach, and brings her love of functional fitness and weightlifting to her work. Outside the clinic she runs in Central Park, tries new restaurants and walks her rescue dog.',
    ],
    education: [
      { label: 'Undergraduate', school: 'Barnard College, Columbia University', detail: 'Studied biology and dance' },
      { label: 'Doctorate', school: 'Columbia University', detail: 'Doctor of Physical Therapy' },
      { label: 'Electives', school: 'Physical therapy school', detail: 'Performing arts, foot and ankle, pelvic health and sports rehabilitation' },
      { label: 'Continuing education', school: 'Herman & Wallace Pelvic Rehabilitation Institute', detail: 'Pelvic health training' },
      { label: 'Certification · 2024', school: 'National Strength and Conditioning Association', detail: 'Certified Strength and Conditioning Specialist (CSCS)' },
    ],
    focus: ['Dancers and performing artists', 'Orthopedic and sports injuries', 'Strength and functional fitness', 'Pelvic health'] },
  'Dr. Madison Caloss': { slug: 'madison-caloss', clinics: ['ues'],
    lead: 'An NYU-trained therapist who blends rehabilitation with performance training for athletes and active people.',
    bio: [
      'Madison grew up in Texas, where an active childhood playing many sports sparked her interest in movement and performance. Like many therapists, she first met physical therapy as a patient.',
      'She earned a degree in Exercise and Sports Science with a focus on rehabilitation, then her Doctor of Physical Therapy at New York University, where she also became a Certified Strength and Conditioning Specialist.',
      'Her experience spans acute care, ICU, outpatient orthopedics, pelvic health and neurological rehabilitation. Outside the clinic she bikes the West Side Highway, paddle-boards and plays volleyball.',
    ],
    education: [
      { label: 'Undergraduate', school: 'Exercise and Sports Science', detail: 'Emphasis in rehabilitation' },
      { label: 'Doctorate', school: 'New York University', detail: 'Doctor of Physical Therapy' },
      { label: 'Certification', school: 'National Strength and Conditioning Association', detail: 'Certified Strength and Conditioning Specialist (CSCS)' },
      { label: 'Continuing education', school: 'Specialty courses', detail: 'Rock Steady Boxing for Parkinson’s, Complete Body Integration, pelvic health with Herman & Wallace' },
    ],
    focus: ['Athletes and high-level performance', 'Recovery after injury', 'Pelvic health', 'Neurological conditions'] },
  'Mitchell Levine': { slug: 'mitchell-levine', clinics: ['ues'],
    lead: 'A friendly, high-energy therapist focused on sports injuries, golf and getting you back to your activity.',
    bio: [
      'Mitchell grew up in Ponte Vedra, Florida. He studied athletic training at Florida State University, gaining on-field experience with many sports, then earned his DPT at the University of North Florida, graduating with the highest GPA in his class.',
      'He has worked in outpatient orthopedics since May 2025, mostly with sports injuries and after-surgery care. He has special knowledge of golf injury prevention and swing-related exercise, and has worked with runners and throwing athletes.',
      'Mitchell became a therapist after his own back fractures from football. His approach builds trust, balances hands-on care with functional exercise and sets goals together. He loves to surf, play golf and cheer for the Jacksonville Jaguars.',
    ],
    education: [
      { label: 'Undergraduate', school: 'Florida State University', detail: 'Bachelor of Science, athletic training' },
      { label: 'Doctorate', school: 'University of North Florida', detail: 'Doctor of Physical Therapy, highest GPA in class' },
      { label: 'Continuing education', school: 'Golf injury prevention', detail: 'Course on reducing injury risk across ages and skill levels' },
    ],
    focus: ['Sports injuries', 'Golfers', 'Throwing athletes and runners', 'Rehab after surgery'] },
  'Dr. Emma Raccaro': { slug: 'emma-raccaro', clinics: ['uws'],
    lead: 'Inclusive, heart-centered care for orthopedic and pelvic health concerns.',
    bio: [
      'Emma earned her bachelor’s degree in Health Science and her Doctor of Physical Therapy at Springfield College in Massachusetts, with a minor in psychology. She received several scholarships and awards for her academic work and her service.',
      'She led her college’s Physical Therapy Organization and went on to train in pelvic floor therapy through the Herman & Wallace Pelvic Rehabilitation Institute. Her focus includes pelvic pain, sexual dysfunction, postpartum rehabilitation, bowel and bladder problems and orthopedic conditions.',
      'Emma provides inclusive, trauma-informed care in a safe space where every person feels heard. She is a certified community instructor for balance and fall-prevention programs. Outside the clinic she runs, dances, hikes and hunts for the best latte in the city.',
    ],
    education: [
      { label: 'Undergraduate', school: 'Springfield College', detail: 'Bachelor’s in Health Science, Pre-Physical Therapy, minor in psychology' },
      { label: 'Doctorate', school: 'Springfield College', detail: 'Doctor of Physical Therapy' },
      { label: 'Post-graduate training', school: 'Herman & Wallace Pelvic Rehabilitation Institute', detail: 'Pelvic floor physical therapy' },
      { label: 'Community instructor', school: 'Balance and fall prevention', detail: 'Certified instructor' },
    ],
    focus: ['Pelvic pain', 'Postpartum rehabilitation', 'Bowel and bladder concerns', 'Orthopedic conditions'] },
  'Taden Gery': { slug: 'taden-gery', clinics: ['uws'],
    lead: 'A Columbia-trained therapist with clear goals, strong exercise knowledge and athletic roots.',
    bio: [
      'Taden earned his Doctor of Physical Therapy at Columbia University, after a bachelor’s degree in Exercise Science with a minor in Strength & Conditioning at the University of Delaware. He graduated summa cum laude.',
      'As a student he served as an assistant Division I strength coach, a DPT tutor and an anatomy teacher. His interest in therapy began as an athlete in baseball, snowboarding and Olympic weightlifting.',
      'He specializes in orthopedic care for all ages, from children to pro athletes, including after-surgery rehab and return to sport. His approach stresses clear communication, actionable goals and routines made for you. Outside the clinic he lifts, does calisthenics and works on video editing and 3D animation.',
    ],
    education: [
      { label: 'Undergraduate', school: 'University of Delaware', detail: 'Exercise Science, minor in Strength & Conditioning, summa cum laude' },
      { label: 'Doctorate', school: 'Columbia University', detail: 'Doctor of Physical Therapy' },
      { label: 'Experience', school: 'Teaching and coaching', detail: 'Assistant Division I strength coach, DPT tutor, anatomy teacher' },
    ],
    focus: ['Orthopedic care for all ages', 'Rehab after surgery', 'Return to sport', 'Strength training'] },
  'Erika Moran': { slug: 'erika-moran', clinics: ['uws'],
    lead: 'A welcoming, judgment-free therapist for runners, athletes and people of every fitness level.',
    bio: [
      'Erika earned her Doctor of Physical Therapy and a Bachelor of Science in Rehabilitation Science, with a minor in psychology, at Northeastern University. She worked in clinics around Boston before moving to New York City.',
      'Her experience spans orthopedics, sports rehabilitation, after-surgery care, return to running and sport, injury prevention and pelvic floor problems. She treats patients of all fitness levels in a welcoming, judgment-free space.',
      'Erika has taken courses in lumbar spine management, care for the fitness athlete and stress fractures, plus pelvic health training through Herman & Wallace. A former college track and field athlete, she loves strength training, yoga, hiking and softball.',
    ],
    education: [
      { label: 'Undergraduate', school: 'Northeastern University', detail: 'Bachelor of Science in Rehabilitation Science, minor in psychology' },
      { label: 'Doctorate', school: 'Northeastern University', detail: 'Doctor of Physical Therapy' },
      { label: 'Continuing education', school: 'Specialty courses', detail: 'Lumbar spine management, the fitness athlete, stress fracture school' },
      { label: 'Pelvic health', school: 'Herman & Wallace and Institute of Clinical Excellence', detail: 'Pelvic floor training' },
    ],
    focus: ['Runners and athletes', 'Rehab after surgery', 'Injury prevention', 'Pelvic floor concerns'] },
  'Dr. Saul Zion': { slug: 'saul-zion', clinics: ['westport'],
    lead: 'Our founder and CEO, a board-certified orthopedic specialist who loves treating runners, triathletes and golfers.',
    bio: [
      'Saul graduated from the University at Buffalo with his Doctor of Physical Therapy in 2005. He then became a board-certified Orthopedic Certified Specialist through the APTA, and is certified in spinal manipulation and the Mulligan Concept, and as a strength and conditioning specialist.',
      'He is an HSS Hip Rehabilitation Preservation Certified Clinician, treating hip labral tears, impingement, tendon problems and arthritis, and before and after hip surgery. He also treats shoulder, knee and ankle injuries.',
      'An athlete himself, Saul finished Ironman Lake Placid in 2010 and the NYC Marathon in 2014. He uses slow-motion video to find running inefficiencies. Since moving to Westport he has taken up golf and become a Titleist Performance Institute certified instructor.',
    ],
    education: [
      { label: 'Doctorate · 2005', school: 'University at Buffalo', detail: 'Doctor of Physical Therapy' },
      { label: 'Board certification', school: 'American Physical Therapy Association', detail: 'Orthopedic Certified Specialist (OCS)' },
      { label: 'Certifications', school: 'Manual therapy and strength', detail: 'Spinal Manipulation (Cert. SMT), Mulligan Practitioner (CMP), CSCS' },
      { label: 'Hip specialty', school: 'Hospital for Special Surgery', detail: 'HSS Hip Rehabilitation Preservation Certified Clinician' },
      { label: 'Golf', school: 'Titleist Performance Institute', detail: 'TPI Certified Level 1 and Medical Level 2' },
    ],
    focus: ['Runners and triathletes', 'Hip pain and labral tears', 'Golfers', 'Shoulder, knee and ankle injuries'] },
  'Jacob Krasznai': { slug: 'jacob-krasznai', clinics: ['westport'],
    lead: 'A therapist who combines hands-on care, dry needling and exercise with a focus on education.',
    bio: [
      'Jacob earned his bachelor’s degree in Exercise Science and his Doctor of Physical Therapy at Sacred Heart University. He gained experience in leadership and in many clinical settings, including complex cases.',
      'He trained further in orthopedic rehabilitation and manual therapy and is certified in dry needling. His interests include orthopedic injuries, chronic pain, Ehlers-Danlos syndrome, dysautonomia and POTS, and neurological conditions.',
      'Jacob values education, autonomy and long-term results, and builds each plan around your goals and lifestyle. Outside the clinic he lifts and plays basketball and soccer.',
    ],
    education: [
      { label: 'Undergraduate', school: 'Sacred Heart University', detail: 'Bachelor’s in Exercise Science' },
      { label: 'Doctorate', school: 'Sacred Heart University', detail: 'Doctor of Physical Therapy' },
      { label: 'Certification', school: 'Dry needling', detail: 'Certified in dry needling' },
    ],
    focus: ['Orthopedic injuries', 'Chronic pain', 'Ehlers-Danlos syndrome and POTS', 'Dry needling'] },
  'Krydia Ddungu': { slug: 'krydia-ddungu', clinics: ['ues'],
    lead: 'The friendly face who helps you with scheduling and care coordination.',
    bio: [
      'Krydia graduated from Saint Louis University with a Bachelor’s degree in Health Sciences. She plans to return to school for a Master of Public Health in Global Health or Epidemiology.',
      'During her studies she volunteered, including packing medical supplies for hurricane victims in Haiti. She loves to run, practice photography and thrift, and enjoys helping create a positive atmosphere at Zion Physical Therapy.',
    ],
    education: [
      { label: 'Undergraduate', school: 'Saint Louis University', detail: 'Bachelor’s degree in Health Sciences' },
    ],
    focus: ['Scheduling and appointments', 'Care coordination', 'Questions about your visit'] },
  'Laura Matthei': { slug: 'laura-matthei', clinics: ['ues'],
    lead: 'Our Office Manager, who helps keep the practice running smoothly.',
    bio: ['Laura is our Office Manager. A full profile is coming soon.'],
    focus: ['Practice operations', 'Questions about your visit'] },
};
for (const c of categories) for (const p of c.people) {
  const e = extra[p.name];
  if (e && !p.slug) { Object.assign(p, e, { href: `/team/${e.slug}` }); }
}
