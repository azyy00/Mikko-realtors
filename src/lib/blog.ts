export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMinutes: number;
  coverSeed: string; // picsum placeholder cover
  youTubeId?: string; // optional embedded YouTube vlog (real posts)
  localVideo?: string; // optional self-hosted video (demo)
  body: string[]; // paragraphs
  cta: string;
};

// Sample posts. Once the social-to-blog automation is connected, new posts
// (and their videos) are appended here automatically.
export const blogPosts: BlogPost[] = [
  {
    slug: "va-family-new-home-north-las-vegas",
    title:
      "How a Military Family Bought a Brand-New North Las Vegas Home with $0 Down",
    excerpt:
      "Another veteran family just closed on a 4-bed new-construction home using a VA loan with zero down. Here's how it came together, and how you can do the same.",
    category: "VA Buyers",
    date: "2026-08-28",
    readMinutes: 4,
    coverSeed: "blog-va-home",
    body: [
      "There's nothing quite like handing the keys to a family that served our country. This month we closed on a beautiful 4-bedroom, 2.5-bath new-construction home in North Las Vegas, purchased with a VA loan and zero money down.",
      "For a lot of veterans, the VA benefit feels complicated the first time around. It doesn't have to be. Between the 0% down payment, no monthly PMI, and builder incentives on new construction, this family got into a brand-new home for a fraction of what they expected out of pocket.",
      "If you're a veteran or active military thinking about buying in Las Vegas, this is exactly the kind of win I love helping make happen. Let's talk about how your benefit can work for you.",
    ],
    cta: "Are you a veteran thinking about buying in Las Vegas? Let's talk about using your VA benefit.",
  },
  {
    slug: "3-things-summerlin-buyers-should-know",
    title: "3 Things Buyers Should Know About This Summerlin Home",
    excerpt:
      "A quick walkthrough of a new-construction Summerlin home, and the three details that make it worth a serious look for relocating buyers.",
    category: "New Construction",
    date: "2026-09-05",
    readMinutes: 3,
    coverSeed: "blog-summerlin",
    localVideo: "/videos/bg-1.mp4",
    body: [
      "Summerlin keeps proving why it's one of the most sought-after master-planned communities in Las Vegas. On a recent walkthrough, three things stood out that buyers relocating here should keep in mind.",
      "First, the new-construction inventory here moves, the best lots and quick move-in homes don't sit long. Second, builder incentives are still on the table if you know how to ask. Third, the lifestyle (trails, parks, and top schools) is a big part of what you're buying, not just the house.",
      "If a Summerlin home is on your list, reach out before you tour so we can line up the right communities and get ahead of the competition.",
    ],
    cta: "Thinking about Summerlin? Let's find the right community for you.",
  },
  {
    slug: "henderson-vs-summerlin-where-to-buy",
    title: "Henderson vs Summerlin: Where Should You Buy in 2026?",
    excerpt:
      "Two of the most popular places to land in the valley, with very different personalities. Here's how I help buyers decide between them.",
    category: "Buying Tips",
    date: "2026-09-12",
    readMinutes: 5,
    coverSeed: "blog-henderson",
    body: [
      "Henderson and Summerlin come up in almost every relocation conversation I have, and for good reason. Both are safe, well-run, and full of newer homes. But they are not the same, and the right pick depends on how you actually live.",
      "Summerlin leans master-planned and walkable, with trails, village centers, and a strong new-construction pipeline on the west side. Henderson feels a little more established and spread out, with great value in pockets like Cadence and Inspirada and quick access to the airport and the lake.",
      "When we tour, I have you weigh commute, schools, HOA style, and how new you want the home to be. That usually makes the choice obvious within a weekend.",
    ],
    cta: "Not sure which side of the valley fits you? Let's map it out together.",
  },
  {
    slug: "new-construction-incentives-2026",
    title: "Builder Incentives Are Still on the Table, If You Know How to Ask",
    excerpt:
      "Rate buydowns, closing-cost credits, and design-center dollars are quietly moving deals right now. Here's what I'm seeing on new construction.",
    category: "New Construction",
    date: "2026-09-15",
    readMinutes: 4,
    coverSeed: "blog-incentives",
    body: [
      "A lot of buyers assume new-construction pricing is fixed. On the sticker, maybe. But the real negotiation is happening around incentives, and right now builders are using them to keep homes moving.",
      "Depending on the community and the phase, I'm seeing rate buydowns, thousands in closing-cost credits, and design-center allowances. The catch is that these are easiest to capture when you have your own agent involved from the first visit, before you sign in at the model.",
      "That is the single biggest mistake I see: walking the model alone. The builder's sales rep is excellent, and they work for the builder. Bring me and it costs you nothing.",
    ],
    cta: "Touring a model home soon? Loop me in first so we protect your leverage.",
  },
  {
    slug: "first-time-buyer-mistakes-las-vegas",
    title: "5 Mistakes First-Time Buyers Make in Las Vegas",
    excerpt:
      "The stuff I wish every first-time buyer knew before they started, so the process feels calm instead of stressful.",
    category: "First-Time Buyers",
    date: "2026-08-20",
    readMinutes: 6,
    coverSeed: "blog-firsttime",
    body: [
      "Buying your first home is exciting and a little overwhelming. After helping a lot of first-time buyers close here, the same handful of mistakes come up again and again, and they are all avoidable.",
      "Shopping before you're pre-approved, tapping your savings to zero, skipping the inspection to win a bid, ignoring HOA rules, and falling for the first house you see. None of these are fatal, but each one can cost you money or peace of mind.",
      "The fix is simple: get pre-approved first, keep a reserve, lean on your agent, and give yourself a weekend to compare. That's most of the game.",
    ],
    cta: "First home on your mind? Let's get you a clear plan with no pressure.",
  },
  {
    slug: "las-vegas-market-check-fall-2026",
    title: "Las Vegas Market Check: What I'm Seeing This Fall",
    excerpt:
      "A quick, honest read on inventory, pricing, and what it means whether you're buying or selling right now.",
    category: "Market Update",
    date: "2026-07-30",
    readMinutes: 3,
    coverSeed: "blog-market",
    body: [
      "People ask me for a market take almost every day, so here's a plain one. Inventory has loosened up a bit from the tightest stretch, which means buyers finally have a little more room to negotiate on the right homes.",
      "Well-priced, move-in-ready homes still go fast, and new construction remains a strong option because of incentives. Sellers who price to today's comps, not last year's, are still getting strong results.",
      "The short version: it's a workable market on both sides if you have someone reading the specific neighborhood, not the national headlines.",
    ],
    cta: "Want a read on your specific neighborhood? I'll send you the real numbers.",
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
