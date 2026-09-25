# Homepage local connections

## Implementation and content

`src/components/LocalConnections.tsx` adds a server-rendered “Community & local spots” section after the homepage marquee and before featured listings. The Las Vegas navigation and footer columns link to `/#local-connections`.

The two destinations retain the user-supplied URLs:

- Tambayan sa Las Vegas (Facebook community): `https://www.facebook.com/share/g/1EnLoPA1EL/?mibextid=wwXIfr`
- Tambayan BBQ: `https://tambayanbbqlv.com/`

The group name “Tambayan sa Las Vegas” comes from the logo supplied by the user. The restaurant entry makes no menu, ownership, sponsorship, or endorsement claims. Both links identify their destination and announce that they open a new tab, with `noopener noreferrer` protection.

This addition requires no environment variables, Meta developer signup, social feed, or external widget. Meta signup remains paused.

## Supplied logos

The user supplied `public/Tambayan sa Las Vegas.png` (1640 × 856) and `public/Tambayan BBQ.png` (448 × 298). Both original files are used unchanged through Next.js Image with intrinsic dimensions, lazy loading, responsive optimization and `object-contain`. Logos sit above their text on narrow screens and beside it from the small breakpoint. Their 192 × 128 frames retain the respective white and black backgrounds; artwork is not stretched or cropped. These are user-provided brand assets, not generated imagery.

## Inherited design evidence

The component preserves the incumbent design documented in source: Oswald display headings and Inter body text (`src/app/layout.tsx`), the shared display treatment and centered container (`src/app/globals.css`), and the existing Tailwind palette (`tailwind.config.ts`). Its cream surface (`#f4efe5`), navy headings (`#102238`), muted descriptions (`#59665e`), and champagne link underlines (`#ae864c`) reuse those tokens.

The introduction and divided destination rows stack by default and form two columns at the large breakpoint. Links have a minimum height of 44px. Keyboard focus uses the existing outline with a local darker gold color (`#8c6637`) for contrast on cream. This is an ordinary homepage extension; no global design documents or design system were created or repaired.

## Verification

The implementation agent reports lint and production build success after the final focus-outline correction, plus successful assertions against the production HTML for section placement, content, and links. The scoped source review returned a ship verdict after that correction.

Browser tooling exposed no usable browser surface. Screenshots, interactive keyboard behavior, and an actual mobile visual pass were therefore not verified; responsive and accessibility observations above are based on source inspection.
