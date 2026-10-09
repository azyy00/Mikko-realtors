# Homepage hero video correction

The user's screenshot and clarification supersede the popup direction. This is a narrow media replacement, not a new surface or visual-system change.

The latest direction is video-only on the first viewport. Use the original Mikko Lucernas WVO.mp4 in a clean 100dvh hero without website text, navigation, navy washes or floating controls at page top. Place the existing h1, copy, actions and trust row in normal document flow on a white section below the video. Preserve the incumbent typography and use ink/navy/dark-gold colors for the white surface.

Homepage navigation and the floating tour control appear after 40px of scrolling and hide on return to the top; other routes remain unchanged. Hidden controls must not be keyboard-focusable. Preserve server-rendered copy and meaningful reading order. No popup or session gate.

Keep the served MP4 byte-for-byte identical to the supplied 1080p file. Retain the extracted poster. The latest sound request supersedes muted-only playback: attempt full audio at page top and proportionally fade to zero as the video scrolls away. Respect browser autoplay policy with a minimal Enable sound control that disappears once audio is active. The user requested removal of the Mute sound button. Other background videos stay muted. Playback remains looping, offscreen-aware and reduced-motion-aware, with explicit start available for reduced motion. Document cover cropping separately from source quality; do not claim that every viewport shows the entire video frame.

Validate desktop and mobile hero playback, absence of dialog and replay controls, source identity, and build/type/lint checks. Preserve the existing design system; no global design artifacts are required.

The user uploaded the unchanged source to Vercel Blob. Playback now uses `https://q0zmlpn3f0hgmxht.public.blob.vercel-storage.com/Mikko%20Lucernas%20WVO.mp4` with anonymous cross-origin access for Web Audio. Keep the poster local; do not require a token for public video playback. Retain the ignored local video backup without using it as the runtime source.
