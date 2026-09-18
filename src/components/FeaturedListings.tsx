"use client";

import { Heart, Bed, Bathtub, Ruler, ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { listings } from "@/lib/data";

function img(seed: string) {
  return `https://picsum.photos/seed/${seed}/900/650`;
}

export default function FeaturedListings() {
  const [saved, setSaved] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("mikko-saved-homes") || "[]",
      );
      if (Array.isArray(stored))
        setSaved(stored.filter((item) => typeof item === "string"));
    } catch {
      /* Browsing remains available if storage is blocked. */
    }
  }, []);
  function toggleSaved(address: string) {
    const next = saved.includes(address)
      ? saved.filter((item) => item !== address)
      : [...saved, address];
    setSaved(next);
    try {
      localStorage.setItem("mikko-saved-homes", JSON.stringify(next));
      setNotice(
        next.includes(address)
          ? "Home saved on this device."
          : "Home removed from saved homes.",
      );
    } catch {
      setNotice("Saved for this visit. Your browser does not allow storage.");
    }
  }
  return (
    <section id="listings" className="bg-paper py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display text-4xl text-ink sm:text-5xl">
              Discover exceptional homes
            </h2>
          </div>
          <Link
            href="/buy"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600"
          >
            View all listings
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <p role="status" className="container-x mt-4 text-sm text-muted">
        {notice ||
          "Sample listings with illustrative photos. Contact Mikko for current availability."}
      </p>
      {/* Horizontal snap rail */}
      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(4vw,1rem)] pb-4 [scroll-padding-left:max(4vw,1rem)]">
        {listings.map((l) => (
          <article
            key={l.address}
            className="group relative w-[min(320px,85vw)] shrink-0 snap-start overflow-hidden rounded-xl2 border border-navy-900/10 bg-white shadow-soft sm:w-[360px]"
          >
            <div className="relative h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img(l.seed)}
                alt=""
                width={900}
                height={650}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-navy-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-200 backdrop-blur">
                {l.tag}
              </span>
              <button
                type="button"
                aria-label={`${saved.includes(l.address) ? "Unsave" : "Save"} ${l.address}`}
                aria-pressed={saved.includes(l.address)}
                onClick={() => toggleSaved(l.address)}
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-navy-800 transition-colors hover:text-gold-500"
              >
                <Heart
                  size={18}
                  weight={saved.includes(l.address) ? "fill" : "regular"}
                />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between">
                <span className="tnum font-display text-2xl font-semibold text-ink">
                  {l.price}
                </span>
                <span className="text-xs text-muted">{l.area}</span>
              </div>
              <Link
                href={`/buy?q=${encodeURIComponent(l.address)}`}
                className="mt-1 inline-block text-sm text-navy-800 underline decoration-navy-900/25 underline-offset-4 hover:decoration-navy-900"
              >
                {l.address}
              </Link>
              <div className="mt-4 flex items-center gap-4 border-t border-navy-900/10 pt-4 text-sm text-navy-800">
                <span className="flex items-center gap-1.5">
                  <Bed size={16} className="text-gold-500" /> {l.beds} bd
                </span>
                <span className="flex items-center gap-1.5">
                  <Bathtub size={16} className="text-gold-500" /> {l.baths} ba
                </span>
                <span className="flex items-center gap-1.5">
                  <Ruler size={16} className="text-gold-500" /> {l.sqft} sqft
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
