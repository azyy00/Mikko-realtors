# Homepage introduction

The homepage starts with `HeroVideo`. Below 1024px, the video uses its natural 16:9 frame height, with no tall navy filler; the headline section follows immediately with 32px top padding (48px from 640px). Desktop retains the stable full-screen (`100svh`) introduction and 96px headline-section padding. No website headline, navigation, logo, search controls, scroll cue, navy wash, or tour button overlays the video at the top of the page. There is no sound icon, Enable sound button, or Mute sound button.

The original h1, descriptive text, search actions and trust items now sit in a white section immediately below the video, rendered in the initial HTML rather than conditionally injected after scrolling. Existing copy and links are preserved.

On the mobile homepage (below 1024px), navigation is visible immediately with a solid navy background. It occupies its natural height above the video and stays sticky during scrolling, so no hard-coded video offset is needed. On desktop, navigation becomes visible after 40px of scroll and hides again when returning to the top. The floating tour button retains that scroll reveal on all screen sizes. Hidden controls use CSS visibility so they cannot be tabbed into. Other routes retain their normal navigation and tour controls. Both components share one passive scroll listener via `usePageScrolled`.

- There is no popup, session gate, or About replay button.
- Playback is inline and looping. It attempts audible playback at 100% media volume at the top; operating-system/device volume is not changed.
- Desktop volume follows remaining hero height: 100% at the top, 50% halfway scrolled, and zero when the video leaves the viewport. Scrolling back restores the corresponding volume. Below 1024px there is no scroll fade: activated sound stays at full media volume while visible, and playback pauses when offscreen. Device volume remains under the visitor's control.
- If automatic audio is blocked, video playback falls back to muted until the visitor taps/clicks anywhere on the video. No visible sound icon or button is added. The video surface is keyboard accessible with Enter/Space and an accessible label. Scrolling alone does not activate sound. Reduced-motion visitors see the poster until they explicitly activate the video.
- A tap requests playback and resumes Web Audio within the user gesture. Web Audio gain supports the desktop scroll fade; native volume remains the fallback. Mobile sound stays steady while visible and playback pauses offscreen. Repeated taps enable sound rather than toggling mute. No hardware-volume guarantee is possible.
- The source-frame poster appears while loading or when reduced-motion preferences prevent playback.
- Playback pauses while offscreen or when the browser tab is hidden. Autoplay rejection is handled without an unhandled promise error.
- This is homepage-only intro behavior; other background videos remain muted and unchanged.
- Text burned into the supplied video itself remains unchanged; only website overlays have been removed.

## Media provenance and quality

User-supplied source: `Asssets/Mikko Lucernas WVO.mp4`.
Retained local backup: `public/videos/mikko-intro.mp4` (ignored by Git).
Homepage playback source: `public/videos/mikko-intro-720.mp4` (720p H.264, ~17 MB, made from `mikko-intro.mp4`). The earlier Vercel Blob copy was blocked by Vercel on 2026-10-16.
Local source, backup, and verified Vercel upload SHA-256: `2e235efbcf42d1e18307c76729a544e06234156d21e1c402b7d92fbfa6507bf9`.

The MP4 is byte-for-byte identical: H.264 video, 1920 × 1080, 30 fps, AAC audio, 76.93 seconds, 113,693,447 bytes. No re-encoding, compression or resolution change. Below 1024px, the 16:9 container and `object-fit: contain` show the complete frame without letterboxing. Desktop viewports at or below a 4:3 aspect ratio retain contained framing; wide desktop screens retain `object-fit: cover`. Display sharpness still depends on screen size/density and the original footage.

Autoplay/audio policies and toolbar behavior still need verification on physical iOS Safari and Android Chrome devices; desktop mobile emulation is not a substitute.

`public/videos/mikko-intro-poster.jpg` is a frame extracted at 3 seconds from that same user-supplied video with ffmpeg. The poster is only a preview; it does not affect video playback quality. No captions were supplied; an approved WebVTT file can be added later.

## Deployment note

The user uploaded the original to the public `mikko-videos` Vercel Blob store. The homepage now reads that public URL directly; no Blob token or SDK is required for playback. The video retains `crossOrigin="anonymous"` with the public Blob's CORS response. The local 108.4 MiB backup remains untouched and is ignored by Git; no local video is needed by the homepage at runtime. If the backup was already tracked in another checkout, an ignore entry alone will not remove it from that checkout's history.

The full-quality file is bandwidth-heavy. The homepage hero uses eager loading like the previous background, so browsers can request the video immediately. Do not recompress silently to meet hosting limits.
