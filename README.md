# Mikko Lucernas — Las Vegas Real Estate

Premium marketing + lead-generation frontend for Las Vegas REALTOR® Mikko Lucernas.
New construction & relocation specialist. **Frontend only — no backend yet.**

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, Framer Motion, and
Phosphor icons. Theme: **White · Navy blue · Gold.**

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # static checks
```

Copy `.env.example` to `.env.local`, retain your existing map key, and configure
`LEAD_WEBHOOK_URL` with your CRM or automation webhook before publishing. It is
server-only and must never use the `NEXT_PUBLIC_` prefix.

```bash
npm run build && npm start   # production
```

> Fonts (Oswald + Inter) are fetched from Google Fonts at build time, so the
> first build needs internet access.

## What's on the page

| Section | Notes |
|---|---|
| Hero | Background video (`/public/videos/hero.mp4`), MLS-style search bar |
| Marquee | Animated keyword band |
| Featured Listings | Horizontal scroll rail (mock data) |
| Property Search | Styled navy map + results rail — MLS/IDX preview |
| Just Sold | **Real closing flyers** + animated stat counters |
| Services | Bento grid: Buyers, Sellers, VA/Military, Relocation, New Construction |
| Communities | Bento grid: Summerlin, Henderson, Southwest, North LV, Tule Springs, NW |
| Marketing Engine | Social → AI → site → leads flow + Google reviews auto-sync callout |
| About | **Real portrait**, credentials, specialties |
| Reviews | Google 5.0 summary + testimonials |
| Contact | Lead form with validation + loading/success states (no submit backend) |

## Assets used

- `public/profile/mikko.png` — About portrait
- `public/sold/sold-1.png`, `sold-2.png` — real "Just Sold" cards
- `public/videos/hero.mp4`, `bg-1.mp4`, `bg-2.mp4` — section backgrounds

Listing/community photos use `picsum.photos` seeds as **placeholders** — they get
replaced by real photos when the MLS/IDX feed is connected.

## Where the backend plugs in later

Everything below is mocked in the frontend and ready to wire up:

- **MLS property search** — swap `src/lib/data.ts` listings + the search box in
  `Hero.tsx` / `PropertySearch.tsx` for an authorized IDX/MLS provider.
- **Lead form** — set the server-only `LEAD_WEBHOOK_URL` environment variable to an HTTPS
  CRM/webhook endpoint. `POST /api/leads` validates, rate-limits, and forwards contact and
  valuation requests; it returns an error rather than a false confirmation if unconfigured.
- **Map key** — `NEXT_PUBLIC_MAP_KEY` is intentionally sent to browsers. Restrict it to this
  site&apos;s production/staging origins and enable provider-side quotas before launch.
- **Google reviews** — `Reviews.tsx` reads static data; connect the Google Business
  Profile API.
- **Content automation** — the flow shown in `MarketingEngine.tsx` (social → AI article
  → blog) is where the OpenAI + social APIs would feed generated posts.

## Structure

```
src/
  app/            layout.tsx, page.tsx, globals.css
  components/     Nav, Hero, Marquee, FeaturedListings, PropertySearch,
                  JustSold, Services, Communities, MarketingEngine,
                  About, Reviews, Contact, Footer, Reveal, Counter, MagneticButton
  lib/data.ts     all mock content (agent info, listings, reviews, etc.)
```

Edit agent contact details, listings, and reviews in **`src/lib/data.ts`**.
