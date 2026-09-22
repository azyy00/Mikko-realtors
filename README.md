<p align="center">
  <img src="./public/logo.png" alt="Mikko Lucernas — Vegas Realtor" width="260" />
</p>

<h1 align="center">Las Vegas Real Estate, Reimagined</h1>

<p align="center">
  A premium real estate experience built for buyers, sellers, military families,<br />
  and clients relocating to the Las Vegas Valley.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-071525?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer_Motion-11-D8AC47?style=flat-square&logo=framer&logoColor=071525" />
  <img alt="MapLibre" src="https://img.shields.io/badge/MapLibre-Interactive_Maps-396955?style=flat-square" />
</p>

---

<table>
  <tr>
    <td width="58%" valign="middle">
      <h2>A digital home for a modern REALTOR®</h2>
      <p>
        This website pairs editorial storytelling with practical property-search
        tools. The experience is designed to establish trust quickly, guide visitors
        toward the right service, and turn interest into qualified conversations.
      </p>
      <p>
        <strong>Brand direction:</strong> refined navy, warm gold, natural neutrals,
        confident typography, cinematic media, and restrained motion.
      </p>
      <p>
        <strong>Specialties:</strong> new construction, relocation, VA and military
        buyers, residential sales, and Las Vegas communities.
      </p>
    </td>
    <td width="42%" align="center">
      <img src="./public/profile/mikko.png" alt="Mikko Lucernas, Las Vegas REALTOR" width="360" />
    </td>
  </tr>
</table>

## The experience

| Capability | What it delivers |
|---|---|
| Cinematic introduction | Video-led hero, clear positioning, and an immediate property-search entry point |
| Property discovery | Embedded Matrix MLS search with current listings and the provider's search filters |
| Local expertise | Dedicated community, relocation, cost-of-living, and new-construction content |
| Buyer resources | Mortgage and VA loan calculators plus downloadable homebuyer guides |
| Seller conversion | Home-valuation flow, sold-property proof, strong calls to action, and lead capture |
| Trust and authority | Agent story, real client reviews, credentials, social proof, and recent results |
| Thoughtful interaction | Accessible controls, purposeful motion, mobile layouts, loading states, and reduced-motion support |

## Featured pages

| Journey | Routes |
|---|---|
| Home search | `/`, `/buy`, `/communities/[slug]` |
| Seller services | `/home-valuation`, `/sold` |
| Relocation | `/california-vs-las-vegas`, `/cost-of-living` |
| New construction | `/new-construction` |
| Resources | `/guides`, `/guides/[slug]`, `/blog`, `/blog/[slug]` |
| Calculators | `/resources/mortgage-calculator`, `/resources/va-loan-calculator` |

## Technology

- **Framework:** Next.js 15 with the App Router and React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS with a custom navy, gold, and sage design system
- **Motion:** Framer Motion
- **MLS search:** Matrix IDX embed on the homepage and buyer page
- **Icons:** Phosphor Icons
- **Lead handling:** Server-side validation, rate limiting, and webhook forwarding

## Getting started

### 1. Install and configure

```bash
npm install
cp .env.example .env.local
```

Add the required values to `.env.local`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_MAP_KEY` | Optional key for the legacy MapLibre component; not needed by the MLS embed |
| `LEAD_WEBHOOK_URL` | Private server-side CRM or automation webhook for lead delivery |

Never prefix the lead webhook with `NEXT_PUBLIC_`; it must remain server-only.

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Verify production readiness

```bash
npm run lint
npm run build
npm start
```

The first production build requires internet access because the project loads its
web fonts during the build.

## Project structure

```text
src/
├── app/                 Routes, metadata, loading/error states, and lead API
├── components/          Navigation, hero, search, maps, reviews, forms, and media
└── lib/                 Listings, sold homes, guides, blog content, and lead helpers

public/
├── guides/              Downloadable buyer resources
├── icons/               Social media assets
├── profile/             Professional agent photography
├── sold/                Recent-sale imagery and proof
└── videos/              Hero and section background films
```

Core listing, review, community, and agent content lives in
[`src/lib/data.ts`](./src/lib/data.ts). Blog posts, guides, and sold-home records are
kept in their respective modules inside `src/lib/`.

## MLS search integration

The homepage search section and `/buy` embed Mikko's public Matrix IDX search.
The provider URL lives in [`src/lib/mls.ts`](./src/lib/mls.ts); no private MLS API
credential is required. The homepage mounts the embed when the section enters
view, while the buyer page loads it immediately.

Matrix supplies its own search form, results, and styling. This embed does not
provide a listing API or populate the previous custom MapLibre markers. Visitors
set their filters inside Matrix; old `/buy?q=…&price=…` links display a reminder
to enter those preferences, rather than claiming the embed has applied them.

The provider's fixed-width form can scroll horizontally on small screens.
An “Open full search” link is always available if embedding is blocked or the
visitor prefers a separate tab. Featured cards elsewhere still use explicitly
labeled sample data and are not synchronized with MLS results.

The search layout includes an expanded view that keeps the current MLS search
in place. See [MLS search design](./docs/mls-search-design.md) for the applied
website styling and the separate provider-controlled styling options.

## Production integrations

Facebook Page updates can now appear in the blog and homepage through a
server-only Graph API connector and verified webhook. **Activation still requires
the client's Page credentials and Meta app subscription.**
See [Facebook blog setup](./docs/facebook-blog.md) for permissions, environment
variables, callback configuration, refresh timing, and limitations.

The interface and lead endpoint are in place; these external services should be
connected and reviewed before a public launch:

- Replace the separate demonstration featured cards with authorized listing data if required; the main property search already uses Matrix IDX.
- Configure `LEAD_WEBHOOK_URL` for the production CRM or automation platform.
- Restrict the public map key by origin and enable provider-side usage limits.
- Connect approved Google Business Profile review data where live synchronization is required.
- Verify brokerage, fair-housing, privacy, and local real-estate disclosures.

## Brand assets

The repository includes the official Mikko Lucernas logo, professional portrait,
social icons, closing graphics, video backgrounds, and client-facing PDF guides.
These assets should retain their original proportions and should not be recolored
outside the established navy, gold, cream, and sage palette.

---

<p align="center">
  <strong>Mikko Lucernas</strong><br />
  Las Vegas REALTOR® · New Construction & Relocation Specialist
</p>
