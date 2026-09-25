# White light surfaces

Requested site-wide on 2026-09-25. Light page canvases, sections, cards, form panels, loading placeholders, search chrome and neutral scrollbar tracks use pure white (`#ffffff`).

Tailwind's `background`, `card.DEFAULT`, `cream` and `paper` surface tokens now resolve to white. Keeping the legacy aliases applies the request consistently to all existing routes, including community and guide detail pages, blogs, calculators, sold homes, valuation, reviews and the homepage. Review-edge gradients inherit white through `from-cream` as well.

The global `--bg` canvas is white; the MLS search module uses that token instead of independent off-white, cream or pale-green backgrounds. Borders, spacing and typography still separate adjacent light sections. Autocomplete selections retain bold/underlined feedback; search hover feedback uses underlines or borders instead of a tinted fill.

Dark navy sections, navigation, footer, image/video overlays, gold action buttons, status colors and source images are preserved. Matrix iframe contents and map-provider tiles are externally controlled and are not recolored by site CSS. No environment configuration is needed.
