"use client";

import { useEffect, useRef, useState } from "react";
import { SpeakerSlash } from "@phosphor-icons/react";

/** Full-volume introduction at the top; fade to silence as its section leaves. */
export default function HeroVideo() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const enableSound = useRef<() => void>(() => {});
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const player = video.current;
    const container = root.current;
    if (!player || !container) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let blocked = false;
    let manuallyStarted = false;
    let visible = false;
    let frame = 0;
    let playRequest = 0;
    let graph: { context: AudioContext; gain: GainNode } | null = null;

    // Some mobile browsers leave native media volume under hardware control.
    // On those browsers, the explicit sound gesture enables a Web Audio gain.
    player.volume = 0.5;
    const nativeVolumeSupported = Math.abs(player.volume - 0.5) < 0.01;
    player.volume = 1;

    function updateSoundState(enabled: boolean) {
      setSoundOn(enabled);
    }

    function updateVolume() {
      const bounds = container!.getBoundingClientRect();
      const remaining = bounds.height > 0
        ? Math.max(0, Math.min(1, bounds.bottom / bounds.height))
        : 0;
      const level = !blocked && !document.hidden ? remaining : 0;
      if (graph) {
        const now = graph.context.currentTime;
        graph.gain.gain.cancelScheduledValues(now);
        if (level === 0) graph.gain.gain.setValueAtTime(0, now);
        else graph.gain.gain.setTargetAtTime(level, now, 0.06);
        player!.volume = 1;
      } else {
        player!.volume = level;
      }
      return bounds.bottom > 0 && bounds.top < window.innerHeight;
    }

    function syncPlayback() {
      const request = ++playRequest;
      visible = updateVolume();
      if (!visible || document.hidden || (motion.matches && !manuallyStarted)) {
        player!.pause();
        return;
      }
      player!.muted = blocked || (!nativeVolumeSupported && !graph);
      void player!.play().then(() => {
        if (disposed || request !== playRequest) return;
        updateSoundState(!player!.muted && (!graph || graph.context.state === "running"));
      }).catch((error: DOMException) => {
        if (disposed || request !== playRequest || error.name === "AbortError") return;
        // Respect autoplay policy: keep the video moving silently until a tap.
        blocked = true;
        player!.muted = true;
        updateVolume();
        updateSoundState(false);
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
          // Native volume remains the fallback if Web Audio is unavailable.
        }
      }
      if (graph) {
        void graph.context.resume().then(() => {
          if (!disposed && !player.muted) updateSoundState(true);
        }).catch(() => {
          if (disposed) return;
          blocked = true;
          player.muted = true;
          updateVolume();
          updateSoundState(false);
        });
      }
      // Both resume() and play() are requested inside the user's click gesture.
      syncPlayback();
    };

    syncPlayback();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", syncPlayback);
    return () => {
      disposed = true;
      ++playRequest;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      player.pause();
      player.muted = true;
      if (graph) void graph.context.close().catch(() => {});
      enableSound.current = () => {};
    };
  }, []);

  return (
    <div ref={root} className="absolute inset-0 bg-navy-950">
      <video
        ref={video}
        crossOrigin="anonymous"
        src="https://q0zmlpn3f0hgmxht.public.blob.vercel-storage.com/Mikko%20Lucernas%20WVO.mp4"
        poster="/videos/mikko-intro-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
      {!soundOn ? <button
        type="button"
        onClick={() => enableSound.current()}
        className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-950/90 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-900 sm:left-8"
      >
        <SpeakerSlash size={18} aria-hidden="true" />
        Enable sound
      </button> : null}
    </div>
  );
}
