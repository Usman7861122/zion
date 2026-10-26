// Orthopedic page. The conditions list follows https://zionpt.com/services/orthopedic-physical-therapy/ (two spelling typos fixed).
// Everything else is written for this site. TODO: clinic to review the FAQ, safety text and recovery steps.
export type ServiceContent = {
  slug: string; title: string; city: string; metaTitle: string; metaDescription: string; lede: string;
  photos: { src: string; alt: string }[];
  whatIs: { title: string; text: string[] };
  candidates: { title: string; text: string; conditions: string[]; symptoms: string[] };
  local: { title: string; text: string; areas: string[] };
  benefits: { title: string; text: string; items: { title: string; text: string }[] };
  recovery: { title: string; text: string; steps: { label: string; title: string; text: string }[] };
  safety: { title: string; text: string };
  faqs: { q: string; a: string }[];
};

import { moreServices } from './servicesMore';
const base: ServiceContent[] = [
  {
    slug: 'orthopedic-physical-therapy',
    title: 'Orthopedic Physical Therapy',
    city: 'Manhattan, Jersey City and Westport',
    metaTitle: 'Orthopedic Physical Therapy in Manhattan, Jersey City & Westport | Zion Physical Therapy',
    metaDescription: 'One-on-one orthopedic physical therapy with a Doctor of Physical Therapy for joint, muscle, tendon and bone pain, sports injuries and recovery after surgery. Upper East Side, Upper West Side, Jersey City and Westport.',
    lede: 'Hands-on care for joints, muscles, tendons and bones, from a Doctor of Physical Therapy who stays with you for the whole visit.',
    photos: [
      { src: '/images/services/orthopedic.webp', alt: 'Physical therapist treating a patient’s back during an orthopedic session' },
      { src: '/images/gallery/hands-on.webp', alt: 'Therapist using hands-on treatment on a patient’s shoulder and neck' },
      { src: '/images/gallery/movement.webp', alt: 'Therapist guiding an older patient through a supported leg exercise' },
    ],
    whatIs: {
      title: 'What is orthopedic physical therapy?',
      text: [
        'Orthopedics is the branch of medicine that focuses on the musculoskeletal system: the muscles, bones, ligaments and tendons that let you move.',
        'Orthopedic physical therapy helps relieve pain from overuse injuries, sprains, strains and traumatic injuries, and supports you after orthopedic surgery. The goal is simple: improve how you move so you can return to your usual level of activity with confidence.',
      ],
    },
    candidates: {
      title: 'Is orthopedic physical therapy right for you?',
      text: 'If pain or stiffness is getting in the way of work, sport or daily life, an orthopedic evaluation is a good place to start. Our team treats common orthopedic conditions and injuries, including these:',
      conditions: [
        'Herniated disc', 'Plantar fasciitis and heel spurs', 'Lower back pain', 'Tendinitis', 'Tennis elbow and golfer’s elbow',
        'Sciatica and pinched nerve', 'ACL tear', 'Rotator cuff injury', 'Bursitis', 'Osteoarthritis', 'Spondylosis',
        'Spinal stenosis', 'TMJ and jaw pain', 'Ehlers-Danlos syndrome', 'Rheumatoid arthritis', 'Osteoporosis',
        'Knee injuries', 'Hip pain, impingement and labral tears', 'Neck pain and stiff neck', 'Ankle sprains',
        'Shoulder pain, frozen shoulder and dislocation', 'Wrist, hand and finger sprains', 'Leg pain and muscle tears',
      ],
      symptoms: ['Pain when you move', 'Stiffness or a limited range of motion', 'Swelling or tenderness', 'Weakness or giving way', 'Pain that lingers after an injury', 'Trouble recovering after surgery'],
    },
    local: {
      title: 'Orthopedic physical therapy near you',
      text: 'We treat patients at four clinics, so quality orthopedic care is never far away. Every visit is one-on-one with a Doctor of Physical Therapy.',
      areas: ['Upper East Side', 'Upper West Side', 'Manhattan', 'Jersey City', 'Westport', 'Fairfield County'],
    },
    benefits: {
      title: 'What you can expect',
      text: 'Treatment is built around you, not a standard routine.',
      items: [
        { title: 'Less pain', text: 'Hands-on techniques and guided movement ease pain and tension at the source.' },
        { title: 'Better movement', text: 'We restore range of motion and teach your body to move well again.' },
        { title: 'Stronger and steadier', text: 'Targeted exercises build strength and support around the injured area.' },
        { title: 'A confident return', text: 'You get a clear plan to go back to sport, work and the things you love.' },
      ],
    },
    recovery: {
      title: 'How your care unfolds',
      text: 'Every plan is personal, but most follow the same simple path.',
      steps: [
        { label: 'Step 1', title: 'Evaluation', text: 'We listen to your story, check how you move and find what is driving the pain.' },
        { label: 'Step 2', title: 'Your plan', text: 'Together we set goals and agree on a plan that fits your life.' },
        { label: 'Step 3', title: 'Hands-on treatment', text: 'Manual therapy and guided exercise calm symptoms and restore movement.' },
        { label: 'Step 4', title: 'Build strength', text: 'We progress your exercises so the gains last and the injury does not return.' },
      ],
    },
    safety: {
      title: 'Safe, gentle and guided',
      text: 'Your therapist adjusts every technique to your comfort and your condition. If something needs a doctor’s attention, such as an injury that does not fit a physical therapy plan, we will tell you and help you with the next step.',
    },
    faqs: [
      { q: 'What happens at my first visit?', a: 'You meet one-on-one with a Doctor of Physical Therapy. They review your history, assess how you move and talk through a plan. Treatment often begins the same day.' },
      { q: 'Do I need to have surgery to come?', a: 'No. Many of our patients come for pain or an injury and never need surgery. We also support patients before and after orthopedic surgery.' },
      { q: 'Will treatment hurt?', a: 'Some exercises can feel challenging, but treatment should not be painful. Tell your therapist how you feel and they will adjust.' },
      { q: 'How many visits will I need?', a: 'It depends on your condition and your goals. Your therapist will give you an honest estimate after your evaluation and update it as you improve.' },
      { q: 'Which clinic can I visit?', a: 'We have clinics on the Upper East Side, Upper West Side, in Jersey City and in Westport. Call us and we will help you choose.' },
    ],
  },
];

export const services: ServiceContent[] = [...base, ...moreServices];

// One landing page per clinic city: /services/<slug>/<city>. TODO: clinic to review the nearby-area wording.
export type City = { slug: string; name: string; label: string; locIndex: number; nearby: string; lede: string; region: string };
export const cities: City[] = [
  { slug: 'upper-east-side', name: 'Upper East Side', label: 'the Upper East Side, Manhattan', locIndex: 0, region: 'New York, NY',
    nearby: 'Patients are welcome from across the Upper East Side, Yorkville, Carnegie Hill, Lenox Hill, East Harlem and the greater Manhattan area.',
    lede: 'Our East 86th Street clinic offers one-on-one orthopedic care with a Doctor of Physical Therapy, close to home for Upper East Side patients.' },
  { slug: 'upper-west-side', name: 'Upper West Side', label: 'the Upper West Side, Manhattan', locIndex: 1, region: 'New York, NY',
    nearby: 'Patients are welcome from across the Upper West Side, Lincoln Square, Columbus Circle, Morningside Heights and the greater Manhattan area.',
    lede: 'Our West 72nd Street clinic brings one-on-one orthopedic care to the Upper West Side, always with a Doctor of Physical Therapy.' },
  { slug: 'jersey-city', name: 'Jersey City', label: 'Jersey City, New Jersey', locIndex: 2, region: 'Jersey City, NJ',
    nearby: 'Patients are welcome from across Jersey City, Newport, Exchange Place, Hoboken and the greater Hudson County area.',
    lede: 'Our Washington Boulevard clinic offers one-on-one orthopedic care in Jersey City, guided by a Doctor of Physical Therapy.' },
  { slug: 'westport', name: 'Westport', label: 'Westport, Connecticut', locIndex: 3, region: 'Westport, CT',
    nearby: 'Patients are welcome from across Westport, Fairfield, Norwalk, Southport, Weston and the greater Fairfield County area.',
    lede: 'Our Post Road East clinic brings one-on-one orthopedic care to Westport, with a Doctor of Physical Therapy at every visit.' },
];
