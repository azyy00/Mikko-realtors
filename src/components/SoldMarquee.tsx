"use client";

import { Marquee } from "@/components/ui/marquee-01-utils/marquee";
import { soldPhotos } from "@/lib/sold";

// One row of closing photos drifting right, same engine as the review marquee.
export default function SoldMarquee({ className }: { className?: string }) {
  return (
    <Marquee
      reverse
      pauseOnHover
      aria-label="Closing photos. Focus to browse with the arrow keys."
      className={`[--duration:70s] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${className ?? ""}`}
    >
      {soldPhotos.map((src, i) => (
        <div
          key={src}
          role="listitem"
          className="h-64 shrink-0 overflow-hidden rounded-xl2 border border-navy-900/10 bg-navy-950 sm:h-80"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Sold in Las Vegas with Mikko Lucernas, closing ${i + 1} of ${soldPhotos.length}`}
            decoding="async"
            className="h-full w-auto max-w-none"
          />
        </div>
      ))}
    </Marquee>
  );
}
