"use client";

import { useEffect, useRef } from "react";

/** Inline intro video; desktop audio fades as the frame scrolls out of view. */
export default function HeroVideo() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const enableSound = useRef<() => void>(() => {});

  useEffect(() => {
    const player = video.current;
    const container = root.current;
    if (!player || !container) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    // Desktop (lg) fades audio with scroll; smaller screens keep full volume while visible.
    const desktop = matchMedia("(min-width: 1024px)");
    let disposed = false;
    let blocked = false;
    let manuallyStarted = false;
    let visible = false;
    let frame = 0;
    let playRequest = 0;
    let graph: { context: AudioContext; gain: GainNode } | null = null;

    // Some mobile browsers leave native media volume under hardware control.
    // Keep desktop playback muted there when a scroll fade cannot be applied.
    player.volume = 0.5;
    const nativeVolumeSupported = Math.abs(player.volume - 0.5) < 0.01;
    player.volume = 1;

    function updateVolume() {
      const bounds = container!.getBoundingClientRect();
      const remaining = bounds.height > 0
        ? Math.max(0, Math.min(1, bounds.bottom / bounds.height))
        : 0;
      const inView = bounds.bottom > 0 && bounds.top < window.innerHeight;
      const level = !blocked && !document.hidden && inView
        ? (desktop.matches ? remaining : 1)
        : 0;
      if (graph) {
        const now = graph.context.currentTime;
        graph.gain.gain.cancelScheduledValues(now);
        if (level === 0) graph.gain.gain.setValueAtTime(0, now);
        else graph.gain.gain.setTargetAtTime(level, now, 0.06);
        player!.volume = 1;
      } else {
        player!.volume = level;
      }
      return inView;
    }

    function syncPlayback() {
      const request = ++playRequest;
      visible = updateVolume();
      if (!visible || document.hidden || (motion.matches && !manuallyStarted)) {
        player!.pause();
        return;
      }
      player!.muted = blocked || (desktop.matches && !nativeVolumeSupported && !graph);
      void player!.play().catch((error: DOMException) => {
        if (disposed || request !== playRequest || error.name === "AbortError") return;
        // Respect autoplay policy until the visitor activates the video.
        blocked = true;
        player!.muted = true;
        updateVolume();
        void player!.play().catch(() => {});
      });
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const nextVisible = updateVolume();
        if (nextVisible !== visible) syncPlayback();
      });
    }

    enableSound.current = () => {
      blocked = false;
      manuallyStarted = true;
      if (!graph && typeof AudioContext !== "undefined") {
        try {
          const context = new AudioContext();
          const gain = context.createGain();
          const source = context.createMediaElementSource(player);
          gain.gain.value = 0;
          source.connect(gain);
          gain.connect(context.destination);
          graph = { context, gain };
        } catch {
          // Keep native volume as the fallback where Web Audio is unavailable.
        }
      }
      if (graph) {
        void graph.context.resume().catch(() => {
          if (disposed) return;
          blocked = true;
          player.muted = true;
          updateVolume();
        });
      }
      // Request both audio and playback within the trusted tap/click gesture.
      syncPlayback();
    };

    syncPlayback();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", syncPlayback);
    desktop.addEventListener("change", syncPlayback);
    return () => {
      disposed = true;
      ++playRequest;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      desktop.removeEventListener("change", syncPlayback);
      player.pause();
      player.muted = true;
      if (graph) void graph.context.close().catch(() => {});
      enableSound.current = () => {};
    };
  }, []);

  return (
    <div
      ref={root}
      role="button"
      tabIndex={0}
      aria-label="Play introduction with sound"
      onClick={() => enableSound.current()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!event.repeat) enableSound.current();
        }
      }}
      className="absolute inset-0 cursor-pointer touch-manipulation bg-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
    >
      <video
        ref={video}
        crossOrigin="anonymous"
        src="/videos/mikko-intro-720.mp4"
        poster="/videos/mikko-intro-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="h-full w-full object-contain"
      />
    </div>
  );
}
