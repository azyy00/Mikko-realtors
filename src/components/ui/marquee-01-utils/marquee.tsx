"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  paused?: boolean;
};

/** CSS-driven motion; duplicate content is visual-only, never announced twice. */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  paused = false,
  ...props
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let inView = false;
    const sync = () => setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div
      ref={root}
      role="region"
      tabIndex={0}
      data-reverse={reverse}
      data-pause-on-hover={pauseOnHover}
      data-paused={paused || !active}
      className={cn(
        "review-marquee flex w-full gap-4 overflow-hidden py-2 [--duration:40s] [--gap:1rem]",
        className,
      )}
      {...props}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          role="list"
          aria-hidden={copy === 1 ? true : undefined}
          data-marquee-copy={copy === 1 ? "" : undefined}
          className="review-marquee-group flex min-w-full shrink-0 items-stretch justify-around gap-4"
        >
          {children}
        </div>
      ))}
    </div>
  );
}
