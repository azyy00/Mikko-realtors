"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react/dist/ssr";

/** Load Facebook only when the visitor asks to play; no tokens reach the browser. */
export default function FacebookVideo({ url, poster, title }: {
  url: string;
  poster?: string;
  title: string;
}) {
  const [active, setActive] = useState(false);
  const params = new URLSearchParams({
    href: url, show_text: "false", width: "360", height: "640", autoplay: "true",
  });

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-xl2 bg-navy-950">
      {active ? (
        <iframe
          src={`https://www.facebook.com/plugins/video.php?${params}`}
          title={`Facebook video: ${title}`}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full text-white focus-visible:outline-offset-[-4px]"
        >
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" className="h-full w-full object-contain" />
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-navy-950 shadow-soft transition-colors group-hover:bg-gold-300">
              <Play size={28} weight="fill" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute inset-x-4 bottom-4 rounded-lg bg-navy-950 px-4 py-3 text-sm font-semibold">
            Play video
            <span className="mt-1 block text-xs font-normal text-white/80">Loads the Facebook video player</span>
          </span>
        </button>
      )}
    </div>
  );
}
