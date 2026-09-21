# MLS search design

The Taste redesign applies to the website-owned search area in
`src/components/PropertySearch.tsx` and `PropertySearch.module.css`.
The same Matrix iframe and IDX identifier continue to serve real listings.

## Applied to the website

- Wider search area, capped at 1440px.
- Global Oswald display font and inherited Inter body font, quiet sage accents,
  and a compact search toolbar.
- Direct contact with Mikko using his existing professional portrait.
- Expanded search using the browser Fullscreen API. The iframe stays mounted,
  preserving the visitor's search results when entering and leaving this view.
- Keyboard focus restoration on exit, reduced-motion support, and a separate-tab
  fallback when fullscreen or embedding is unavailable.
- Horizontal scrolling confined to the provider's fixed-width form on mobile.
- Homepage defers the iframe until the search section becomes visible.

## Provider-controlled results

### Map-first browsing

The current embed opens the standard Matrix Search form. To open live listings
on a map, the agent or MLS administrator needs to configure an IDX **Map Search**
page in Matrix:

1. Open **Settings → IDX Configuration** and select or create the IDX page.
2. Under **Form Selection**, select **Map Search**, not **My Listings**.
3. Choose the appropriate residential search form and, where supported, active
   listings. Avoid filters limiting the search to the agent's own inventory.
4. Set Las Vegas as the initial map view while allowing searches outside that
   area, or choose no map-area restriction.
5. Enable IDX, save, preview, and provide the generated iframe code.

Update `src/lib/mls.ts` with the generated URL after verifying it. The provider
controls which IDX-eligible listings and how many map results are displayed; the
website cannot remove provider limits through the current iframe.

Reference: [Matrix IDX configuration guide](https://rpcra.org/content/docs/IDX_Configuration_in_Matrix.pdf).

### Styling

The supplied URL is a hosted IDX interface, not a listing API. Website CSS cannot
style its cross-origin document. Matrix's listing cards, fonts, blue links,
pagination, photos, filters, and disclosures are unchanged.

The official [Matrix quick-start guide, Settings / IDX Configuration](https://www.corelogic.com/wp-content/uploads/sites/4/2023/11/MatrixQuickStartGuide12.pdf)
describes color options under **Other Options → Style** for Search and My Listings
forms. Availability and field names depend on the MLS configuration. Someone with
access to the agent's Matrix settings must make those changes.

Suggested website-matching values for applicable color fields:

| Role | Color |
| --- | --- |
| Main text and navigation | `#243746` |
| Muted text | `#5F6B70` |
| Page background | `#F7F7F2` |
| Listing surface | `#FFFFFF` |
| Borders | `#DCE1DF` |
| Accent / links | `#43643F` |

These values are recommendations, not settings already applied to Matrix.
Fully custom listing cards and responsive filters require an authorized listing
API or provider-supported custom templates. Do not proxy or scrape the iframe
to imitate an API, or apply visual filters that alter listing photography.
