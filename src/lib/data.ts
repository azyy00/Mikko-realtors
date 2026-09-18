// Frontend-only mock data.
// Listing photos use picsum seeds as reliable placeholders, these get replaced
// by real photos once live listings are connected.

export const agent = {
  name: "Mikko Lucernas",
  title: "Las Vegas REALTOR®",
  focus: "New Construction & Relocation Specialist",
  email: "mikko.realtor@gmail.com",
  // Real number from Mikko's Google Business Profile
  phone: "(702) 488-1206",
  phoneHref: "tel:+17024881206",
  license: "REALTOR®",
  brokerage: "Real Broker",
};

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: "Home Buyers",
    children: [
      { label: "Search Homes", href: "/buy" },
      { label: "New Construction", href: "/new-construction" },
      { label: "First-Time Buyers", href: "/guides/first-time-buyers" },
      { label: "VA Buyers", href: "/guides/va-loan" },
      { label: "Relocation to Las Vegas", href: "/guides/relocation" },
      { label: "Home Buyer Guide", href: "/guides" },
    ],
  },
  {
    label: "Sellers",
    children: [
      { label: "What's My Home Worth?", href: "/home-valuation" },
      { label: "Home Selling Guide", href: "/guides/sellers" },
      { label: "Just Sold", href: "/#sold" },
    ],
  },
  {
    label: "Las Vegas",
    children: [
      { label: "Summerlin", href: "/communities/summerlin" },
      { label: "Henderson", href: "/communities/henderson" },
      { label: "Southwest Las Vegas", href: "/communities/southwest" },
      { label: "Northwest", href: "/communities/northwest" },
      { label: "North Las Vegas", href: "/communities/north-las-vegas" },
      { label: "Tule Springs", href: "/communities/tule-springs" },
      { label: "New Construction Communities", href: "/new-construction" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Mortgage Calculator", href: "/resources/mortgage-calculator" },
      { label: "VA Loan Calculator", href: "/resources/va-loan-calculator" },
      { label: "New Construction Updates", href: "/new-construction" },
      { label: "California vs Las Vegas", href: "/california-vs-las-vegas" },
      { label: "Cost of Living", href: "/cost-of-living" },
    ],
  },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/#reviews" },
];

export type Listing = {
  price: string;
  priceNum: number;
  beds: number;
  baths: number;
  sqft: string;
  address: string;
  area: string;
  tag: string;
  seed: string;
  lat: number;
  lng: number;
  type: "Single Family" | "Townhome" | "Condo";
  garage: number;
  singleStory: boolean;
  pool: boolean;
  newBuild: boolean;
};

export const listings: Listing[] = [
  {
    price: "$519,990",
    beds: 3,
    baths: 2.5,
    sqft: "2,102",
    address: "8946 Sanibel Shore Ave",
    area: "Summerlin, Las Vegas",
    tag: "New Construction",
    seed: "vegas-home-01",
    lat: 36.1912,
    lng: -115.331,
    priceNum: 519990,
    type: "Single Family",
    garage: 2,
    singleStory: false,
    pool: false,
    newBuild: true,
  },
  {
    price: "$649,000",
    beds: 4,
    baths: 3,
    sqft: "2,850",
    address: "2731 Crimson Ridge St",
    area: "Henderson, NV",
    tag: "Mountain View",
    seed: "vegas-home-02",
    lat: 36.0102,
    lng: -115.0455,
    priceNum: 649000,
    type: "Single Family",
    garage: 3,
    singleStory: false,
    pool: true,
    newBuild: false,
  },
  {
    price: "$475,000",
    beds: 3,
    baths: 2,
    sqft: "1,980",
    address: "6410 Desert Bloom Ct",
    area: "North Las Vegas, NV",
    tag: "Move-In Ready",
    seed: "vegas-home-03",
    lat: 36.2835,
    lng: -115.1352,
    priceNum: 475000,
    type: "Townhome",
    garage: 2,
    singleStory: true,
    pool: false,
    newBuild: false,
  },
  {
    price: "$899,000",
    beds: 5,
    baths: 4,
    sqft: "3,450",
    address: "1188 Amber Canyon Way",
    area: "Southwest Las Vegas",
    tag: "Luxury",
    seed: "vegas-home-04",
    lat: 36.0181,
    lng: -115.2853,
    priceNum: 899000,
    type: "Single Family",
    garage: 3,
    singleStory: false,
    pool: true,
    newBuild: false,
  },
  {
    price: "$564,500",
    beds: 4,
    baths: 3,
    sqft: "2,410",
    address: "7532 Heartland Bay Dr",
    area: "Tule Springs, N. Las Vegas",
    tag: "Gated Community",
    seed: "vegas-home-05",
    lat: 36.3205,
    lng: -115.2902,
    priceNum: 564500,
    type: "Single Family",
    garage: 2,
    singleStory: false,
    pool: false,
    newBuild: true,
  },
];

export type Community = {
  name: string;
  slug: string;
  blurb: string;
  seed: string;
  span: "wide" | "tall" | "std";
  priceNote: string;
  intro: string;
  highlights: string[];
};

export const communities: Community[] = [
  {
    name: "Summerlin",
    slug: "summerlin",
    blurb: "Master-planned luxury living",
    seed: "summerlin-lv",
    span: "wide",
    priceNote: "Homes from the $500s to $2M+",
    intro:
      "Summerlin is Las Vegas' flagship master-planned community, tucked against the Red Rock foothills on the west side. Trails, parks, top-rated schools, and Downtown Summerlin's shopping and dining make it one of the most sought-after places to live in the valley.",
    highlights: [
      "150+ miles of trails and dozens of parks",
      "Top-rated schools and golf",
      "New construction and luxury resale",
    ],
  },
  {
    name: "Henderson",
    slug: "henderson",
    blurb: "Family-friendly & top schools",
    seed: "henderson-nv",
    span: "std",
    priceNote: "Homes from the $400s to $1M+",
    intro:
      "Consistently ranked one of the safest cities in the country, Henderson pairs strong schools and family neighborhoods with easy access to the Strip and the airport. From Green Valley to Inspirada and Cadence, there's a fit for every budget.",
    highlights: [
      "Among the safest cities in the U.S.",
      "Great schools and parks",
      "Masterplans like Cadence and Inspirada",
    ],
  },
  {
    name: "Southwest Las Vegas",
    slug: "southwest",
    blurb: "Modern homes near the 215",
    seed: "southwest-lv",
    span: "std",
    priceNote: "Homes from the $450s to $1.5M",
    intro:
      "The Southwest is one of the fastest-growing parts of the valley, with newer neighborhoods, quick 215 beltway access, and an easy commute to the airport and the Strip. A favorite for buyers who want modern homes close to everything.",
    highlights: [
      "Newer construction and modern layouts",
      "Quick 215 and airport access",
      "Close to Mountain's Edge and Rhodes Ranch",
    ],
  },
  {
    name: "North Las Vegas",
    slug: "north-las-vegas",
    blurb: "Fast-growing new communities",
    seed: "north-lv",
    span: "tall",
    priceNote: "Homes from the $380s to $700s",
    intro:
      "North Las Vegas is where much of the valley's new construction is happening, and it's one of the best values for buyers. Brand-new masterplans, VA-friendly builders, and strong incentives make it a top pick for first-time and military buyers.",
    highlights: [
      "Most active new construction in the valley",
      "Best value for first-time and VA buyers",
      "Gated masterplans like Aliante and Villages at Tule Springs",
    ],
  },
  {
    name: "Tule Springs",
    slug: "tule-springs",
    blurb: "Brand-new masterplan north",
    seed: "tule-springs",
    span: "std",
    priceNote: "Homes from the $400s to $600s",
    intro:
      "Tule Springs, in the far north valley, is one of the newest masterplans in Las Vegas, next to the Tule Springs Fossil Beds National Monument. Gated communities, fresh amenities, and 0%-down-friendly new builds make it a standout for value buyers.",
    highlights: [
      "Brand-new gated masterplans",
      "Next to a national monument and open space",
      "VA and FHA-friendly new construction",
    ],
  },
  {
    name: "Northwest",
    slug: "northwest",
    blurb: "Established & centrally close",
    seed: "northwest-lv",
    span: "std",
    priceNote: "Homes from the $400s to $900s",
    intro:
      "The Northwest blends established neighborhoods with newer pockets, offering central access to Summerlin, the 95, and Downtown. A solid choice for buyers who want a settled feel without giving up convenience.",
    highlights: [
      "Established, centrally located neighborhoods",
      "Easy access to the 95 and Summerlin",
      "Mix of resale and newer homes",
    ],
  },
];

export function getCommunity(slug: string) {
  return communities.find((c) => c.slug === slug);
}

export type Service = {
  title: string;
  tagline: string;
  copy: string;
  icon: "buyers" | "sellers" | "relocation" | "newbuild" | "military";
  href: string;
  imageSeed: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    title: "Home Buyers",
    tagline: "Find it first, buy it right",
    copy: "Search Las Vegas homes, tour on your schedule, and buy with a local who negotiates hard for you.",
    icon: "buyers",
    href: "/buy",
    imageSeed: "svc-buyers-lv",
    highlights: [
      "Every new listing, the moment it hits",
      "Private tours on your timeline",
      "A local who negotiates for you",
    ],
  },
  {
    title: "Sellers",
    tagline: "Priced right, marketed everywhere",
    copy: "A pricing and marketing plan that puts your home in front of the right buyers, and closes it.",
    icon: "sellers",
    href: "/guides/sellers",
    imageSeed: "svc-sellers-lv",
    highlights: [
      "Priced on real, current comps",
      "Pro photos, video, and drone",
      "Seen across the top listing sites, Google, and social",
    ],
  },
  {
    title: "VA & Military Buyers",
    tagline: "0% down, from a veteran who gets it",
    copy: "0% down VA loans, base-to-base relocation, and homes chosen around your PCS timeline. I help fellow veterans land the right deal.",
    icon: "military",
    href: "/guides/va-loan",
    imageSeed: "svc-va-lv",
    highlights: [
      "0% down and no monthly PMI",
      "Built around your PCS timeline",
      "New construction, VA-friendly",
    ],
  },
  {
    title: "Relocation to Las Vegas",
    tagline: "Move from anywhere, stress-free",
    copy: "Moving from California or out of state? I make the whole move simple, from first video tour to keys.",
    icon: "relocation",
    href: "/guides/relocation",
    imageSeed: "svc-relo-lv",
    highlights: [
      "Live video tours from anywhere",
      "Neighborhood matching",
      "Close before you even fly in",
    ],
  },
  {
    title: "New Construction",
    tagline: "Builder deals, on your side",
    copy: "Builder incentives, lot selection, and someone on your side of the table, at no cost to you.",
    icon: "newbuild",
    href: "/guides/new-construction",
    imageSeed: "svc-newbuild-lv",
    highlights: [
      "Incentives negotiated for you",
      "Lot and upgrade guidance",
      "Representation at no cost to you",
    ],
  },
];

export type SoldCard = {
  img: string;
  price: string;
  community: string;
  detail: string;
};

export const soldCards: SoldCard[] = [
  {
    img: "/sold/sold-1.png",
    price: "$473,000",
    community: "Sky Falls by D.R. Horton",
    detail: "North Las Vegas · 4 bd · 2.5 ba · 2,436 sqft · 3.99% VA loan, 0% down",
  },
  {
    img: "/sold/sold-2.png",
    price: "$447,000",
    community: "Heartland Bay by D.R. Horton",
    detail: "Aliante, Tule Springs · 4 bd · 2-car garage · 3.99% FHA · gated masterplan",
  },
];

// Mikko's real recent closings (from his own deal notes).
export type SoldDeal = {
  community: string;
  builder: string;
  area: string;
  price: string;
  meta: string;
  tag: string;
  story: string;
  seed: string;
};

export const recentlySold: SoldDeal[] = [
  {
    community: "Hinson Hills",
    builder: "Lennar",
    area: "Southwest Las Vegas",
    price: "$546K+",
    meta: "4 bd · 3 ba · 2,255 sqft · corner lot",
    tag: "New Construction",
    story:
      "California buyers who never had to fly in. Built from the ground up in about 5 months, with $32,000+ in builder incentives, handled remotely start to finish.",
    seed: "sold-hinson-hills",
  },
  {
    community: "Symmetry Bay at Cadence",
    builder: "Cadence Masterplan",
    area: "Henderson, NV",
    price: "$554K",
    meta: "4 bd + loft · 2.5 ba · 2-car garage",
    tag: "VA · $0 Down",
    story:
      "A $0-down VA loan with $0 out of pocket for my buyer. 3.75% rate, closing costs covered, all appliances included, and a $75/mo HOA with pool, park, and courts.",
    seed: "sold-symmetry-bay",
  },
  {
    community: "Paldona",
    builder: "Pulte Homes",
    area: "Spring Valley, Las Vegas",
    price: "$500K",
    meta: "3 bd · 2.5 ba · 2,034 sqft · was $614K",
    tag: "$114K Off",
    story:
      "$114,000 below the original price. $0-down VA loan with the builder covering $31,500 toward the rate buydown and closing costs. My buyer locked 4.5% for 30 years, minutes from Costco, IKEA, and the 215.",
    seed: "sold-paldona",
  },
];

// Mikko's real Google rating (google.com/maps profile).
export const googleRating = {
  score: "4.8",
  count: 26,
  // Link to view all reviews
  url: "https://www.google.com/maps/place//@38.5150409,-94.7130341,5z/data=!3m1!4b1!4m3!3m2!1s0x80c8e9335973d72d:0x9f02bbc8efd45bc4!12e1",
  // Client's direct "leave a review" link
  writeUrl: "https://g.page/r/CcRb1O_luwKfEAE/review",
};

export type Review = {
  name: string;
  role: string;
  text: string;
};

// Real reviews pulled from Mikko's Google Business Profile (transcribed verbatim,
// trimmed to complete sentences).
export const reviews: Review[] = [
  {
    name: "Hannie Joy Panes",
    role: "New-construction buyer",
    text: "Mikko is the best realtor in Vegas! He was incredibly easy to work with and made the entire buying process seamless. His excellent communication, honesty, integrity, and willingness to listen allowed us to purchase our brand-new property.",
  },
  {
    name: "M A",
    role: "Out-of-state, first-time buyer",
    text: "We had an excellent experience working with Mikko. From start to finish, he is professional, knowledgeable, very responsive, and genuinely committed to helping us find the right home. He made the entire process smooth and stress-free.",
  },
  {
    name: "Reyes, E",
    role: "Army veteran · Las Vegas",
    text: "Mikko was great to work with. He was always responsive, knowledgeable, and easy to communicate with, even with my busy schedule. He helped me understand my options, stay within my budget, and find a home with great incentives.",
  },
  {
    name: "Mark Lucernas",
    role: "Relocated from Seattle",
    text: "Highly recommend Mikko if you're buying from out of state! I was coming from Seattle with no connections in Vegas and he made the whole thing so easy. He did video walkthroughs and was always reachable.",
  },
  {
    name: "Irrah Pedernal",
    role: "Under contract in days",
    text: "Mikko went above and beyond his duties to find us our perfect home. We only spent about 2-3 days before going under contract. He was there every step of the way. He's very friendly and accommodating.",
  },
  {
    name: "Aprile Zermeno",
    role: "Home seller",
    text: "Mikko is an expert in his craft. He sold my house without hesitation and the process became stress-free for me.",
  },
  {
    name: "Mary Grace Arbis",
    role: "First-time buyers",
    text: "I have nothing but good reviews and would even give Mikko a rating of 10/10! As first-time home buyers, me and my husband were nervous and didn't know how to start our home buying process. Mikko has been a huge help.",
  },
  {
    name: "Aljon Inton",
    role: "First-time buyer · veteran",
    text: "This realtor is an excellent choice, especially for first-time homebuyers, given his extensive knowledge, helpful nature, and dedication to finding the perfect home. Plus, he speaks Tagalog!",
  },
  {
    name: "Chester Esteller",
    role: "Veteran buyer",
    text: "Mikko Lucernas is an outstanding realtor! From start to finish, he was professional, responsive, and genuinely had our best interests at heart. He made the entire home buying process smooth and stress-free.",
  },
  {
    name: "Zhairralyn Manansala",
    role: "Home buyer · Las Vegas",
    text: "Mikko is a reliable realtor. From the beginning to end, he was there. When we have questions, he never hesitate to answer right away. Very supportive all throughout our home buying process. Mikko is one of the best!",
  },
  {
    name: "Drew Perez",
    role: "Relocation & retirement",
    text: "Thank you so much Mikko for your patience, guidance and for driving with us all over Las Vegas to find a perfect retirement place for my out-of-state friend. You're simply the best!",
  },
  {
    name: "Chris Finster",
    role: "Relocated to Las Vegas",
    text: "Best in Vegas! Super helpful and always available to answer our questions. Made everything easy. Highly recommend!",
  },
];

// Real brand logos supplied by the client (public/icons/*)
export const socials = [
  { label: "Facebook", icon: "/icons/facebook.svg", href: "#" },
  { label: "Instagram", icon: "/icons/instagram.svg", href: "#" },
  { label: "TikTok", icon: "/icons/tiktok.svg", href: "#" },
  { label: "YouTube", icon: "/icons/youtube.png", href: "#" },
];

export const marketingSteps = [
  {
    k: "01",
    icon: "camera",
    title: "Pro photos & video",
    copy: "Magazine-quality photos, drone shots, and a walkthrough video that make your home stand out.",
  },
  {
    k: "02",
    icon: "social",
    title: "Seen across social",
    copy: "Your listing goes out to thousands on Facebook, Instagram, TikTok, and YouTube, where buyers actually spend their time.",
  },
  {
    k: "03",
    icon: "search",
    title: "Found on Google",
    copy: "Search-friendly listing pages put your home in front of buyers Googling homes in your neighborhood.",
  },
  {
    k: "04",
    icon: "buyers",
    title: "Serious buyers",
    copy: "Qualified showings and strong offers come straight to you, not lost on a big-box portal.",
  },
];
