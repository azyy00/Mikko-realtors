"use client";

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
  const strip = [...phrases, ...phrases];
  return (
    <div className="relative flex h-[35px] items-center overflow-hidden border-y border-navy-900/10 bg-cream">
      <div
        aria-hidden="true"
        className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap"
      >
        {strip.map((p, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="font-display text-base text-navy-800">{p}</span>
            <span className="h-1 w-1 rounded-full bg-gold-400" />
          </div>
        ))}
      </div>
      <p className="sr-only">{phrases.join(", ")}</p>
    </div>
  );
}
