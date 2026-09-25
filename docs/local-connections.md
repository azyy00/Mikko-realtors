# Homepage local connections

## Implementation and content

`src/components/LocalConnections.tsx` adds a server-rendered “Community & local spots” section after the homepage marquee and before the MLS search. The Las Vegas navigation and footer columns link to `/#local-connections`. The sample featured-listings section has been removed from the homepage; the hero scroll cue now points to the live MLS search.

The three destinations retain the user-supplied URLs:

- Tambayan sa Las Vegas (Facebook community): `https://www.facebook.com/share/g/1EnLoPA1EL/?mibextid=wwXIfr`
- Tambayan sa Las Vegas Chat (Messenger): `https://m.me/cm/AbZm7_EaZJIdHh6O/?send_source=cm%3Acopy_invite_link`
- Tambayan BBQ: `https://tambayanbbqlv.com/`

The group name “Tambayan sa Las Vegas” comes from the logo supplied by the user. Its description uses Mikko’s supplied wording about meeting and socializing with Filipinos in Metro Las Vegas. The Messenger invitation is a separate entry; opening it does not automatically join the chat. The restaurant entry makes no menu, ownership, sponsorship, or endorsement claims. All links identify their destination and announce that they open a new tab, with `noopener noreferrer` protection.

This addition requires no environment variables, Meta developer signup, social feed, or external widget. Meta signup remains paused.

## Supplied logos

The user supplied `public/Tambayan sa Las Vegas.png` (1640 × 856), `public/Tambayan BBQ.png` (448 × 298), and the chat logo `public/tambayan-sa-las-vegas-chat.png` (1254 × 1254), copied unchanged from `Tambayan sa Las Vegas LOGO.png`. All original files are used unchanged through Next.js Image with intrinsic dimensions, lazy loading, responsive optimization and `object-contain`. Logos are centered above their text at every breakpoint. Their 192 × 128 frames retain the respective white and black backgrounds; artwork is not stretched or cropped. These are user-provided brand assets, not generated imagery.

## Inherited design evidence

The component preserves the incumbent design documented in source: Oswald display headings and Inter body text (`src/app/layout.tsx`), the shared display treatment and centered container (`src/app/globals.css`), and the existing Tailwind palette (`tailwind.config.ts`). Its white surface (`#ffffff`), navy headings (`#102238`), muted descriptions (`#59665e`), and champagne link underlines (`#ae864c`) follow the existing design and requested white backgrounds.

The heading and introduction are centered above the destinations. At the large breakpoint, three equal columns place the Facebook group on the left, Messenger chat in the center, and restaurant on the right. Below that breakpoint, entries stack with horizontal separators. Each column centers its logo and copy; flex layout aligns desktop links along the bottom despite different description lengths. Links have a minimum height of 44px. Keyboard focus uses the existing outline with a local darker gold color (`#8c6637`) for contrast on white. This is an ordinary homepage extension; no global design documents or design system were created or repaired.

## Verification

The implementation agent reports lint and production build success after the final focus-outline correction, plus successful assertions against the production HTML for section placement, content, and links. The scoped source review returned a ship verdict after that correction.

Browser tooling exposed no usable browser surface. Screenshots, interactive keyboard behavior, and an actual mobile visual pass were therefore not verified; responsive and accessibility observations above are based on source inspection.
