"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type Slide = {
  id: string | number;
  imageSrc: string;
  thumbnailSrc?: string;
  alt: string;
};

type TestimonialSliderProps = {
  slides: Slide[];
  /** Vertical label beside the counter (desktop). */
  label?: string;
  /** Right column copy; stays put while the image changes. */
  children?: ReactNode;
  /** Extra action shown beside the arrow buttons. */
  action?: ReactNode;
  className?: string;
};

const EASE = [0.23, 1, 0.32, 1] as const;

// Adapted from 21st.dev "testimonial-slider-1": three columns of counter +
// thumbnails, a large vertically sliding image, and copy with arrow controls.
export function TestimonialSlider({ slides, label, children, action, className }: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduce = useReducedMotion();
  const active = slides[index];

  const go = (next: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex((next + slides.length) % slides.length);
  };

  // The next three slides after the active one, wrapping around.
  const upcoming = Array.from({ length: Math.min(3, slides.length - 1) }, (_, i) => (index + i + 1) % slides.length);

  const image = {
    enter: (dir: 1 | -1) => (reduce ? { opacity: 0 } : { y: dir === 1 ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir: 1 | -1) => (reduce ? { opacity: 0 } : { y: dir === 1 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        {/* Counter + thumbnails */}
        <div className="order-2 flex flex-row items-end justify-between gap-6 md:order-1 md:col-span-3 md:flex-col md:items-start">
          <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-6">
            <span className="tnum font-display text-2xl text-ink" aria-live="polite">
              {String(index + 1).padStart(2, "0")}
              <span className="text-muted"> / {String(slides.length).padStart(2, "0")}</span>
            </span>
            {label && (
              <span className="hidden rotate-180 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600 [writing-mode:vertical-rl] md:block">
                {label}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {upcoming.map((i) => {
              const slide = slides[i];
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => go(i, 1)}
                  aria-label={`Show photo ${i + 1}`}
                  className="h-20 w-16 overflow-hidden rounded-lg opacity-70 outline-none ring-gold-400 ring-offset-2 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 active:scale-[0.97] md:h-24 md:w-20"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.thumbnailSrc ?? slide.imageSrc} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main image */}
        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-xl2 bg-navy-950 md:order-2 md:col-span-4 md:aspect-auto md:min-h-[520px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={active.id}
              src={active.imageSrc}
              alt={active.alt}
              custom={direction}
              variants={image}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Copy + controls */}
        <div className="order-3 flex flex-col justify-between gap-8 md:col-span-5 md:pl-4 lg:pl-8">
          <div className="md:pt-10">{children}</div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1, -1)}
              aria-label="Previous photo"
              className="grid h-12 w-12 place-items-center rounded-full border border-navy-900/25 text-navy-900 transition-[border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-navy-900 active:scale-[0.97]"
            >
              <ArrowLeft size={20} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1, 1)}
              aria-label="Next photo"
              className="grid h-12 w-12 place-items-center rounded-full bg-navy-950 text-white transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy-900 active:scale-[0.97]"
            >
              <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </button>
            {action && <div className="ml-auto sm:ml-3">{action}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
