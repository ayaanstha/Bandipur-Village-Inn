/**
 * All business information below is taken from the hotel's existing website
 * (bandipurvillageinn.com). Update here and it flows through the whole site.
 */

export const contact = {
  name: 'Bandipur Village Inn',
  tagline: 'Experience the peace and tranquillity of timelessness.',
  addressLines: ['Tudikhel Road, Bandipur', 'Tanahun, Nepal'],
  phoneDisplay: '+977-065-520142',
  phoneHref: 'tel:+97765520142',
  email: 'info@bandipurvillageinn.com',
  directionsUrl: 'https://goo.gl/maps/17aDCierLmQySPEv8',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Bandipur%20Village%20Inn%2C%20Tundikhel%20Road%2C%20Bandipur&t=m&z=14&output=embed&iwloc=near',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/Bandipurvillageinn/' },
    { label: 'Instagram', href: 'https://www.instagram.com/bandipurvillageinn/' },
    {
      label: 'Tripadvisor',
      href: 'https://www.tripadvisor.com/Hotel_Review-g1949120-d19262562-Reviews-Bandipur_Village_Inn-Bandipur_Gandaki_Zone_Western_Region.html',
    },
  ],
};

export const journeys = [
  { from: 'Kathmandu', distance: '143 km', time: 'About 4 hours', direction: 'drive west' },
  { from: 'Pokhara', distance: '80 km', time: 'About 2 hours', direction: 'drive east' },
];

export const navigation = [
  { id: 'about', label: 'The Inn' },
  { id: 'bandipur', label: 'Bandipur' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export const amenities = [
  { icon: 'wifi', label: 'Complimentary WiFi' },
  { icon: 'tv', label: 'HD television' },
  { icon: 'coffee', label: 'Water boiler with tea & coffee' },
  { icon: 'mountain', label: 'Charming balconies with stunning views' },
];

export const rooms = [
  {
    id: 'deluxe-double',
    name: 'Deluxe Double',
    summary:
      'Bright and spacious, ideally appointed for the business or leisure traveller. The modern yet traditional décor combines luxury with comfort.',
    beds: 'Double bed',
    images: [
      { slug: 'deluxe-double-bed', alt: 'Deluxe Double room with a king-size bed, red cushions and terracotta-tiled floor' },
      { slug: 'deluxe-double-bed-left', alt: 'Deluxe Double room seen through carved wooden doors' },
      { slug: 'deluxe-double-bed-right', alt: 'Deluxe Double room with writing desk, mirror and red rug' },
    ],
  },
  {
    id: 'deluxe-twin',
    name: 'Deluxe Twin',
    summary:
      'Bright and spacious, ideally appointed for the business or leisure traveller. The modern yet traditional décor combines luxury with comfort.',
    note: 'Triple bed variants are also available.',
    beds: 'Twin beds',
    images: [
      { slug: 'deluxe-twin-bed', alt: 'Deluxe Twin room with two single beds and carved wooden headboards' },
      { slug: 'deluxe-twin-bed-right', alt: 'Deluxe Twin room with exposed brick feature wall' },
      { slug: 'deluxe-twin-bed-left', alt: 'Deluxe Twin room viewed from its balcony' },
    ],
  },
  {
    id: 'deluxe-family',
    name: 'Deluxe Family',
    summary:
      'Bright and spacious, ideally appointed for the family leisure traveller. The modern yet traditional décor combines luxury with comfort.',
    beds: 'Family room',
    images: [
      { slug: 'deluxe-family-bed', alt: 'Deluxe Family room with two beds beneath Newari-patterned curtains' },
      { slug: 'deluxe-family-bed-left', alt: 'Deluxe Family room with exposed brick wall and lattice windows' },
      { slug: 'deluxe-family-right', alt: 'Deluxe Family room with a wall-mounted television' },
    ],
  },
];

export const experiences = [
  {
    title: 'Wander the Newari streets',
    text: 'Stroll the stone-paved Bandipur Bazaar, lined with merchant houses of pagoda roofs, wooden lattice windows and carved doorways built by Newar traders who settled here in the late 18th century.',
    slug: 'bandipur',
    alt: 'Bandipur Bazaar with its traditional Newari merchant houses and a forested hill behind',
  },
  {
    title: 'Live the culture & craftsmanship',
    text: 'Bandipur is a rare chance to see Newar cultural life outside the Kathmandu Valley — a town whose ethnic architecture is being carefully restored by its community.',
    slug: 'vintage-bandipur-03',
    alt: 'Archival photograph of a stone-paved square and traditional buildings in Bandipur',
  },
  {
    title: 'Wake to the Himalaya',
    text: 'From the hill crest, the whole Annapurna range unfolds alongside Dhaulagiri, Manaslu, Langtang and Ganesh Himal — gold at sunrise, silver by day.',
    slug: 'bandipur-mountains-01',
    alt: 'Snow peaks glowing orange at sunrise, seen from Bandipur',
  },
  {
    title: 'Slow down in the hills',
    text: 'Take a long lunch, a refreshing drink or simply gaze over the clouds that fill the Marshyangdi Valley below. Bandipur rewards those who linger.',
    slug: 'slide-1',
    alt: 'A sea of clouds in the valley below snow-capped Himalayan peaks',
  },
  {
    title: 'Village walks & day hikes',
    text: 'Pleasant day hikes lead to surrounding villages, and the historic trail down to Siddha Cave — the largest in Nepal. In late spring and summer, the hills burst into colour with orchids.',
    slug: 'vintage-bandipur-15',
    alt: 'Terraced fields and a distant hilltop village near Bandipur',
  },
];
