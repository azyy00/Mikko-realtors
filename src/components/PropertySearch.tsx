"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MLS_SEARCH_URL } from "@/lib/mls";

type Props = {
  showFilters?: boolean;
  initialQuery?: string;
  initialPrice?: string;
};

const priceLabels: Record<string, string> = {
  "under-500k": "Under $500k",
  "500-750k": "$500k to $750k",
  "750k-plus": "$750k+",
};

export default function PropertySearch({
  showFilters = false,
  initialQuery = "",
  initialPrice = "any",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(showFilters);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (enabled || !containerRef.current || !("IntersectionObserver" in window))
      return;

    // Mount only once the search is visible: background MLS scripts must not
    // load or take focus while a visitor is still reading the homepage hero.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEnabled(true);
        observer.disconnect();
      }
    }, { threshold: 0.01 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [enabled]);

  const Heading = showFilters ? "h1" : "h2";
  const preference = [
    initialQuery.trim().slice(0, 120),
    priceLabels[initialPrice],
  ].filter(Boolean).join(" · ");

  return (
    <section
      id="search"
      aria-labelledby="property-search-heading"
      className={`bg-cream ${showFilters ? "pb-16 pt-28" : "py-24"}`}
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Heading id="property-search-heading" className="display text-4xl text-ink sm:text-5xl">
              Find your home in the valley
            </Heading>
            <p className="subhead mt-4 max-w-2xl">
              Search current listings by location, price, and the details that
              matter to you.
            </p>
          </div>
          {!showFilters && (
            <Link href="/buy" className="btn-gold shrink-0">
              Explore homes for sale
            </Link>
          )}
        </div>

        {preference && (
          <p className="mt-6 rounded-xl bg-white p-4 text-sm text-navy-800">
            Looking for {preference}? Enter your preferences in the MLS search
            below to see matching homes.
          </p>
        )}

        <div className="mt-8 overflow-hidden rounded-xl2 border border-navy-900/10 bg-white shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-900/10 px-4 py-4 sm:px-6">
            <div>
              <p className="text-sm font-semibold text-navy-900">MLS property search</p>
              <p role="status" className="mt-1 text-xs text-muted">
                {loaded ? "Powered by Matrix" : enabled ? "Loading MLS search…" : "Browse homes below"}
              </p>
            </div>
            <a
              href={MLS_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-navy-700 underline underline-offset-4 hover:text-gold-600"
            >
              Open full search <span className="sr-only">(opens in a new tab)</span>
              <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>
          <p id="mls-mobile-hint" className="px-4 py-3 text-sm text-muted md:hidden">
            Swipe sideways inside the search to see all filters, or open the full search.
          </p>
          <div
            ref={containerRef}
            role="region"
            aria-label="MLS search panel"
            aria-describedby="mls-mobile-hint"
            tabIndex={0}
            className="relative overflow-x-auto overscroll-x-contain"
          >
            {enabled ? (
                <iframe
                  src={MLS_SEARCH_URL}
                  title="Las Vegas MLS listings — search homes with Mikko Lucernas"
                  width="100%"
                  height="900"
                  className="block h-[85svh] max-h-[1100px] min-h-[780px] min-w-[720px] w-full border-0 bg-white"
                  onLoad={() => setLoaded(true)}
                />
            ) : (
              <div className="grid h-[85svh] max-h-[1100px] min-h-[780px] place-items-center px-6 text-center">
                <button type="button" className="btn-gold" onClick={() => setEnabled(true)}>
                  Load MLS search
                </button>
              </div>
            )}
          </div>
          <p className="border-t border-navy-900/10 px-4 py-4 text-sm text-muted sm:px-6">
            Search provided by Matrix MLS. If the search doesn&apos;t appear, use
            “Open full search” above to continue in a new tab.
          </p>
        </div>
      </div>
    </section>
  );
}
