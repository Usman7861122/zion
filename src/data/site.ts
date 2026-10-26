// All content lives here. Pages only render this data.
export const site = {
  name: 'Zion Physical Therapy',
  tagline: 'Personalized Care. Real Results.',
  description:
    'One-on-one physical therapy with a Doctor of Physical Therapy in Manhattan, Jersey City and Westport. Orthopedic and pelvic health care, in person and online.',
  phone: '(212) 353-8693',
  phoneHref: 'tel:+12123538693',
  fax: '347-507-5510',
  email: 'saul@zionpt.com',
  // TODO: replace with the real booking link or form. Used by every "Book" button.
  bookingUrl: '#contact',
  // TODO: connect a real form endpoint (Formspree, Resend, etc.).
  contactEndpoint: import.meta.env.PUBLIC_CONTACT_ENDPOINT ?? '',
  years: 17,
  social: [
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCzWRAtoBKVmct4kqvgIxr2w' },
    { label: 'Instagram', href: 'https://www.instagram.com/zionphysicaltherapy/' },
    { label: 'X (Twitter)', href: 'https://twitter.com/ZionPhysTherapy' },
    { label: 'Yelp', href: 'https://www.yelp.com/biz/zion-physical-therapy-new-york-2' },
  ],
  nav: [
    { label: 'Home', href: '/' },
    {
      label: 'About',
      href: '/about-us',
      children: [
        { label: 'About us', href: '/about-us', icon: 'info', description: 'Our story and one-on-one approach' },
        { label: 'Meet the team', href: '/team', icon: 'users', description: 'Our doctors of physical therapy' },
      ],
    },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'Orthopedic Physical Therapy', href: '/services/orthopedic-physical-therapy', icon: 'bone', description: 'Pain, injuries and recovery after surgery' },
        { label: 'Dry Needling', href: '/services/dry-needling', icon: 'syringe', description: 'Release tight muscles and ease pain' },
        { label: "Women's Health", href: '/services/womens-health', icon: 'baby', description: 'Pregnancy, postpartum and pelvic care' },
        { label: "Men's Health", href: '/services/mens-health', icon: 'heart', description: 'Private, expert pelvic health care for men' },
        { label: 'Ehlers-Danlos Syndrome', href: '/services/ehlers-danlos-syndrome', icon: 'activity', description: 'Steady programs for hypermobile joints' },
        { label: 'All services', href: '/services', icon: 'grid', description: 'See everything we offer' },
      ],
    },
    {
      label: 'Locations',
      href: '/locations',
      children: [
        { label: 'Upper East Side', href: '/locations/upper-east-side', icon: 'pin', description: '241 E 86th St, Suite 2B' },
        { label: 'Upper West Side', href: '/locations/upper-west-side', icon: 'pin', description: '310 West 72nd Street, Suite 1G' },
        { label: 'Jersey City', href: '/locations/jersey-city', icon: 'pin', description: '525 Washington Blvd, 2nd Floor' },
        { label: 'Westport', href: '/locations/westport', icon: 'pin', description: '1555 Post Road East, Suite 102' },
      ],
    },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const locations = [
  { name: 'Upper East Side', area: 'Manhattan, NY', lines: ['241 E 86th St, Suite 2B', 'New York, NY 10028'], hss: true },
  { name: 'Upper West Side', area: 'Manhattan, NY', lines: ['310 West 72nd Street, Suite 1G', 'New York, NY 10023'], hss: true },
  { name: 'Jersey City', area: 'New Jersey', lines: ['525 Washington Blvd, 2nd Floor', 'Jersey City, NJ 07310'], hss: false },
  { name: 'Westport', area: 'Connecticut', lines: ['1555 Post Road East, Suite 102', 'Westport, CT 06880'], hss: false },
];

export const mapsUrl = (l: { lines: string[] }) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(l.lines.join(', '));
