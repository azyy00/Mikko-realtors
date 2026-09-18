"use client";

import { useEffect, useRef, useState } from "react";

/** Delay below-fold media; pause offscreen and honor reduced motion. */
export default function BackgroundVideo({
  src,
  eager = false,
}: {
  src: string;
  eager?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(eager);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(true);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(query.matches);
    sync();
    query.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    });
    if (root.current) observer.observe(root.current);
    return () => {
      query.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    function sync() {
      if (visible && !reduce && !document.hidden)
        void element!.play();
      else element!.pause();
    }
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [loaded, visible, reduce]);
  return (
    <div ref={root} className="absolute inset-0 bg-navy-950">
      {loaded && (
        <video
          ref={video}
          src={src}
          muted
          loop
          playsInline
          preload={eager ? "auto" : "metadata"}
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
