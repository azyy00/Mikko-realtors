# MLS search design

The Taste redesign applies to the website-owned search area in
`src/components/PropertySearch.tsx` and `PropertySearch.module.css`.
The same Matrix iframe and IDX identifier continue to serve real listings.

## Applied to the website

- Wider search area, capped at 1440px.
- Serif heading, quiet sage accents, and a compact search toolbar.
- Direct contact with Mikko using his existing professional portrait.
- Expanded search using the browser Fullscreen API. The iframe stays mounted,
  preserving the visitor's search results when entering and leaving this view.
- Keyboard focus restoration on exit, reduced-motion support, and a separate-tab
  fallback when fullscreen or embedding is unavailable.
- Horizontal scrolling confined to the provider's fixed-width form on mobile.
- Homepage defers the iframe until the search section becomes visible.

## Provider-controlled results

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
