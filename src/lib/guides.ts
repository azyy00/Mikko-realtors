export type GuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  audience: string;
  title: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
};

export const guides: Guide[] = [
  {
    slug: "sellers",
    audience: "For Sellers",
    title: "Selling Your Las Vegas Home",
    intro:
      "Selling in Las Vegas is about pricing it right, marketing it everywhere buyers are looking, and negotiating hard on your behalf. Here's how I get your home sold for the most the market will pay.",
    metaTitle: "Home Seller's Guide, Sell Your Las Vegas Home | Mikko Lucernas",
    metaDescription:
      "A Las Vegas home seller's guide: pricing, marketing, staging, and negotiation from REALTOR® Mikko Lucernas. Get your home sold for top dollar in Las Vegas, Henderson, or North Las Vegas.",
    sections: [
      {
        heading: "Price it on real Las Vegas data, not a guess",
        body: [
          "The right list price comes from what's actually selling right now in your neighborhood, not an online estimate. I pull recent comparable sales, active competition, and days-on-market for your exact area so we launch at a number that attracts offers instead of sitting.",
        ],
      },
      {
        heading: "Marketing that puts your home in front of buyers",
        body: [
          "Your listing gets professional photography, video, and drone shots, then goes out across the top listing sites, Google, and social media where today's buyers are searching. The goal is simple: maximum eyes in the first week, when a listing gets the most attention.",
        ],
        bullets: [
          "Professional photos, video walkthrough, and drone",
          "Listed on the top home-search sites plus Facebook, Instagram, TikTok, and YouTube",
          "Search-friendly listing page that ranks on Google",
        ],
      },
      {
        heading: "Negotiation and a smooth close",
        body: [
          "When offers come in, I break down each one, price, financing, contingencies, and timeline, so you can choose the strongest, not just the highest. From inspection to closing table, I handle the moving pieces so your sale stays on track.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to sell a home in Las Vegas?",
        a: "It depends on price point and area, but a well-priced, well-marketed home in Las Vegas often goes under contract within a few weeks. I'll give you a realistic timeline for your specific neighborhood.",
      },
      {
        q: "What does it cost to sell?",
        a: "Typical costs include agent commission, some closing costs, and any agreed repairs. I'll walk you through a net-proceeds estimate up front so there are no surprises.",
      },
    ],
  },
  {
    slug: "relocation",
    audience: "For Relocating Buyers",
    title: "Relocating to Las Vegas",
    intro:
      "Moving to Las Vegas from California or out of state? I make the whole move simple, from your first video tour to the day you get the keys, even if you can't be here in person until closing.",
    metaTitle: "Relocating to Las Vegas Guide, Moving from California | Mikko Lucernas",
    metaDescription:
      "Relocating to Las Vegas from California or out of state? A relocation guide covering neighborhoods, cost of living, remote home tours, and buying long-distance with REALTOR® Mikko Lucernas.",
    sections: [
      {
        heading: "Why so many people move to Las Vegas",
        body: [
          "No state income tax, a lower cost of living than California, new-construction communities, and year-round sunshine make Las Vegas one of the most popular relocation destinations in the country. Whether you're moving for work, family, or a fresh start, there's a community that fits.",
        ],
      },
      {
        heading: "Find your neighborhood before you land",
        body: [
          "Summerlin, Henderson, the Southwest, North Las Vegas, and Tule Springs each have a very different feel and price point. I'll help you match the right area to your commute, budget, and lifestyle so you're not guessing from hundreds of miles away.",
        ],
        bullets: [
          "Summerlin, master-planned luxury and top amenities",
          "Henderson, family-friendly with strong schools",
          "North Las Vegas & Tule Springs, newest construction, best value",
        ],
      },
      {
        heading: "Tour and buy from anywhere",
        body: [
          "I do live video walkthroughs so you can tour homes in real time from wherever you are. Many of my relocation clients go under contract before they ever fly in, and everything from inspections to signing can be handled remotely.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I buy a home in Las Vegas without visiting first?",
        a: "Yes. I do live video tours and handle the process remotely, many of my out-of-state clients close before their move without a single in-person visit.",
      },
      {
        q: "Is it cheaper to live in Las Vegas than California?",
        a: "For most buyers, yes, no state income tax and lower home prices are two of the biggest reasons people relocate here from California.",
      },
    ],
  },
  {
    slug: "new-construction",
    audience: "For New-Construction Buyers",
    title: "Buying New Construction in Las Vegas",
    intro:
      "New-construction homes are one of the best values in Las Vegas right now, but the builder's sales rep works for the builder, not for you. Here's why you want your own agent, at no cost to you.",
    metaTitle: "New Construction Homes Las Vegas, Buyer's Guide | Mikko Lucernas",
    metaDescription:
      "New construction in Las Vegas, Summerlin, Henderson, and North Las Vegas. Learn about builder incentives, lot selection, and why buyer representation is free, with REALTOR® Mikko Lucernas.",
    sections: [
      {
        heading: "The builder's rep isn't on your side",
        body: [
          "The friendly agent in the model home is paid by the builder to get the best deal for the builder. When you bring your own REALTOR®, you have someone negotiating incentives, upgrades, and lot pricing for you, and in almost every case the builder pays your agent, so it costs you nothing.",
        ],
      },
      {
        heading: "Get more from incentives and upgrades",
        body: [
          "Builders often have room to move on closing-cost credits, rate buy-downs, design-center upgrades, and lot premiums, especially on inventory and quick move-in homes. I know which builders are offering what, and how to structure the deal so more of that value lands in your pocket.",
        ],
        bullets: [
          "Closing-cost credits and rate buy-downs",
          "Design-center and structural upgrades",
          "Lot selection and quick move-in opportunities",
        ],
      },
      {
        heading: "Protect yourself through the build",
        body: [
          "From contract to final walkthrough, I make sure your interests are covered, reviewing the builder contract, keeping an eye on timelines, and being there at your walkthrough to catch issues before you close.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does it cost more to use my own agent on a new build?",
        a: "No. In almost all cases the builder pays your agent's commission, so having your own REALTOR® is free to you, and gets you better representation.",
      },
      {
        q: "Which Las Vegas areas have the most new construction?",
        a: "North Las Vegas, Tule Springs, the Southwest, and parts of Henderson and Summerlin have the most active new-construction communities right now.",
      },
    ],
  },
  {
    slug: "va-loan",
    audience: "For Veterans & Military",
    title: "VA Loan Home Buying in Las Vegas",
    intro:
      "As someone who's proud to serve fellow veterans and military families, I help buyers use their VA benefits to get into a home, often brand-new construction, with little to nothing down.",
    metaTitle: "VA Loan Homes Las Vegas, Veteran Buyer's Guide | Mikko Lucernas",
    metaDescription:
      "VA loan home buying in Las Vegas for veterans and military families. 0% down, no PMI, and new-construction options with REALTOR® Mikko Lucernas, a veteran-friendly Las Vegas agent.",
    sections: [
      {
        heading: "What the VA loan gets you",
        body: [
          "The VA loan is one of the strongest benefits available to those who served. Qualified buyers can purchase with zero down payment, no private mortgage insurance, and competitive rates, which means you keep more of your money and get into a home sooner.",
        ],
        bullets: [
          "0% down payment for eligible buyers",
          "No monthly PMI",
          "Competitive interest rates and flexible terms",
        ],
      },
      {
        heading: "VA buyers and new construction",
        body: [
          "VA financing works great on new-construction homes, and builders frequently add incentives on top, I've helped fellow veterans get into brand-new homes with 0% down and builder-paid closing costs. It's one of the best combinations in the Las Vegas market.",
        ],
      },
      {
        heading: "A smoother process with someone who gets it",
        body: [
          "The VA process can feel intimidating the first time. I'll connect you with VA-savvy lenders, keep the paperwork moving, and make sure appraisals and timelines line up so your benefit works for you instead of slowing you down.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I really buy with no money down?",
        a: "Eligible VA buyers can purchase with 0% down. Pair that with builder incentives on a new-construction home and your out-of-pocket cost can be very low.",
      },
      {
        q: "Can I use my VA loan on new construction?",
        a: "Yes, VA financing works on new builds, and it's one of my favorite strategies for veteran buyers in Las Vegas.",
      },
    ],
  },
  {
    slug: "first-time-buyers",
    audience: "For First-Time Buyers",
    title: "First-Time Home Buyer's Guide",
    intro:
      "Buying your first home should feel exciting, not overwhelming. I break the process into clear steps and stay a text away the whole time, so you always know exactly what's next.",
    metaTitle: "First-Time Home Buyer Guide, Las Vegas | Mikko Lucernas",
    metaDescription:
      "A first-time home buyer's guide for Las Vegas: getting pre-approved, budgeting, making an offer, and closing, explained simply by REALTOR® Mikko Lucernas.",
    sections: [
      {
        heading: "Start with a pre-approval",
        body: [
          "Before we tour homes, a quick pre-approval from a lender tells us your real budget and makes your offers competitive. It's usually faster and easier than first-time buyers expect, and I'll point you to lenders I trust.",
        ],
      },
      {
        heading: "Know your true monthly cost",
        body: [
          "Your payment is more than the price tag, it includes taxes, insurance, and sometimes HOA. I'll help you look at the full monthly number so you buy comfortably and avoid surprises down the road.",
        ],
        bullets: [
          "Down payment and loan options (including low- and no-down programs)",
          "Property taxes, insurance, and HOA",
          "Closing costs and what a seller or builder may cover",
        ],
      },
      {
        heading: "From offer to keys",
        body: [
          "Once we find the one, I handle the offer, negotiation, inspection, and closing, explaining each step in plain language. My job is to protect you and make your first purchase smooth and stress-free.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much do I need for a down payment?",
        a: "Less than most people think. There are low-down and even zero-down programs depending on your situation, we'll find the right fit before you shop.",
      },
      {
        q: "Do I pay my agent as a buyer?",
        a: "I'll walk you through exactly how representation works for your purchase up front, so there are no surprises. Reach out and I'll explain your options.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

// Mikko's real downloadable PDF guides (public/guides/*).
export type DownloadGuide = {
  title: string;
  blurb: string;
  file: string;
  tag: string;
  size: string;
  slug?: string; // matching read-online guide, if any
};

export const downloadGuides: DownloadGuide[] = [
  {
    title: "VA Loans in Las Vegas: 2026 Buyer's Guide",
    blurb:
      "0% down, funding fees, eligibility, and what $0-down actually costs. The full VA playbook for Las Vegas buyers.",
    file: "/guides/va-loans-las-vegas-2026-guide.pdf",
    tag: "VA Buyers",
    size: "1.5 MB",
    slug: "va-loan",
  },
  {
    title: "First-Time Homebuyer Guide",
    blurb:
      "Every step from pre-approval to keys, explained plainly for first-time buyers in Las Vegas.",
    file: "/guides/first-time-homebuyer-guide.pdf",
    tag: "First-Time Buyers",
    size: "1.5 MB",
    slug: "first-time-buyers",
  },
  {
    title: "How Much Money Do I Actually Need to Buy?",
    blurb:
      "Down payment, closing costs, and reserves. The real numbers behind buying a home in Las Vegas.",
    file: "/guides/how-much-money-to-buy.pdf",
    tag: "Buyers",
    size: "2.3 MB",
  },
  {
    title: "First-Time Homebuyer Checklist",
    blurb:
      "A printable, step-by-step checklist so nothing slips through the cracks on your first purchase.",
    file: "/guides/first-time-homebuyer-checklist.pdf",
    tag: "Checklist",
    size: "1.3 MB",
  },
  {
    title: "After-Closing Checklist",
    blurb:
      "What to handle the week you get the keys: utilities, warranties, and settling into your new home.",
    file: "/guides/after-closing-checklist.pdf",
    tag: "Checklist",
    size: "1.0 MB",
  },
];

export function getDownloadForSlug(slug: string) {
  return downloadGuides.find((g) => g.slug === slug);
}
