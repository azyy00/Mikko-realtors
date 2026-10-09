# Homepage introduction

The homepage starts with a full-viewport (`100dvh`) introduction through `HeroVideo`. No website headline, navigation, logo, search controls, scroll cue, navy wash, or tour button overlays the first screen at the top of the page. A small Enable sound control allows browser-required activation or explicit playback under reduced-motion preferences; it disappears once audio is active. There is no Mute sound button.

The original h1, descriptive text, search actions and trust items now sit in a white section immediately below the video, rendered in the initial HTML rather than conditionally injected after scrolling. Existing copy and links are preserved.

On the homepage, navigation and the floating tour button become visible after 40px of scroll and hide again when returning to the top. Hidden controls use CSS visibility so they cannot be tabbed into. Navigation uses its solid scrolled background. Other routes retain their normal navigation and tour controls. Both components share one passive scroll listener via `usePageScrolled`.

- There is no popup, session gate, or About replay button.
- Playback is inline and looping. It attempts audible playback at 100% media volume at the top; operating-system/device volume is not changed.
- Volume follows remaining hero height: 100% at the top, 50% halfway scrolled, and zero when the video leaves the viewport. Scrolling back restores the corresponding volume.
- If automatic audio is blocked, video playback falls back to muted with **Enable sound**. Clicking enables audio and hides the control. Browser autoplay restrictions are respected, not bypassed.
- After an explicit sound gesture, Web Audio gain provides smooth attenuation, including on mobile platforms where native media-volume adjustment is limited. Before a gesture, supported native media volume is used. No hardware-volume guarantee is possible.
- The source-frame poster appears while loading or when reduced-motion preferences prevent playback.
- Playback pauses while offscreen or when the browser tab is hidden. Autoplay rejection is handled without an unhandled promise error.
- This is homepage-only intro behavior; other background videos remain muted and unchanged.
- Text burned into the supplied video itself remains unchanged; only website overlays have been removed.

## Media provenance and quality

User-supplied source: `Asssets/Mikko Lucernas WVO.mp4`.
Retained local backup: `public/videos/mikko-intro.mp4` (ignored by Git).
Homepage playback source: `https://q0zmlpn3f0hgmxht.public.blob.vercel-storage.com/Mikko%20Lucernas%20WVO.mp4`.
Local source, backup, and verified Vercel upload SHA-256: `2e235efbcf42d1e18307c76729a544e06234156d21e1c402b7d92fbfa6507bf9`.

The MP4 is byte-for-byte identical: H.264 video, 1920 × 1080, 30 fps, AAC audio, 76.93 seconds, 113,693,447 bytes. No re-encoding, compression or resolution change. The existing `object-fit: cover` presentation fills the hero; viewport proportions can crop the visible edges, especially on portrait phones, without modifying the source file. Display sharpness still depends on screen size/density and the original footage.

`public/videos/mikko-intro-poster.jpg` is a frame extracted at 3 seconds from that same user-supplied video with ffmpeg. The poster is only a preview; it does not affect video playback quality. No captions were supplied; an approved WebVTT file can be added later.

## Deployment note

The user uploaded the original to the public `mikko-videos` Vercel Blob store. The homepage now reads that public URL directly; no Blob token or SDK is required for playback. The video sets `crossOrigin="anonymous"` so the Web Audio fade can use Vercel Blob's cross-origin response. The local 108.4 MiB backup remains untouched and is ignored by Git; no local video is needed by the homepage at runtime. If the backup was already tracked in another checkout, an ignore entry alone will not remove it from that checkout's history.

The full-quality file is bandwidth-heavy. The homepage hero uses eager loading like the previous background, so browsers can request the video immediately. Do not recompress silently to meet hosting limits.
