"use client";

import { useState } from "react";

const phrases = [
  "New Construction",
  "Relocation",
  "VA & Military Buyers",
  "Summerlin",
  "Henderson",
  "North Las Vegas",
  "First-Time Buyers",
  "Sellers",
  "Tule Springs",
];

export default function Marquee() {
  const [paused, setPaused] = useState(false);
  const strip = [...phrases, ...phrases];
  return (
    <div className="relative overflow-hidden border-y border-navy-900/10 bg-cream py-4">
      <div
        aria-hidden="true"
        style={{ animationPlayState: paused ? "paused" : "running" }}
        className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap"
      >
        {strip.map((p, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-display text-lg text-navy-800">{p}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          </div>
        ))}
      </div>
      <p className="sr-only">{phrases.join(", ")}</p>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        className="absolute right-2 top-1/2 min-h-11 -translate-y-1/2 rounded-full border border-navy-900/15 bg-cream px-3 text-xs font-medium text-navy-900 motion-reduce:hidden"
      >
        {paused ? "Resume" : "Pause"} topics
      </button>
    </div>
  );
}
