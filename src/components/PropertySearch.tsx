"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowSquareOut,
  ArrowsIn,
  ArrowsOut,
  CaretRight,
  Compass,
} from "@phosphor-icons/react";
import { MLS_SEARCH_URL } from "@/lib/mls";
import styles from "./PropertySearch.module.css";

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
  const workspaceRef = useRef<HTMLDivElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const [enabled, setEnabled] = useState(showFilters);
  const [loaded, setLoaded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandError, setExpandError] = useState("");

  useEffect(() => {
    if (enabled || !containerRef.current || !("IntersectionObserver" in window))
      return;

    // The homepage must stay at the hero until visitors reach the search.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    setCanExpand(Boolean(document.fullscreenEnabled));
    let wasExpanded = false;
    function onFullscreenChange() {
      const active = document.fullscreenElement === workspaceRef.current;
      setExpanded(active);
      if (wasExpanded && !active)
        expandButtonRef.current?.focus({ preventScroll: true });
      wasExpanded = active;
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  async function toggleExpanded() {
    setExpandError("");
    try {
      if (document.fullscreenElement === workspaceRef.current) {
        await document.exitFullscreen();
      } else {
        // Keep the same iframe mounted, preserving search criteria and results.
        await workspaceRef.current?.requestFullscreen();
      }
    } catch {
      setExpandError("Expanded view is unavailable. Use Open full search to browse in a new tab.");
    }
  }

  const Heading = showFilters ? "h1" : "h2";
  const preference = [initialQuery.trim().slice(0, 120), priceLabels[initialPrice]]
    .filter(Boolean)
    .join(" · ");

  return (
    <section
      id="search"
      aria-labelledby="property-search-heading"
      className={`${styles.section} ${showFilters ? styles.searchPage : ""}`}
    >
      <div className={styles.container}>
        {showFilters && (
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <CaretRight size={12} aria-hidden="true" />
            <span aria-current="page">Homes for sale</span>
          </nav>
        )}

        <div className={styles.introduction}>
          <div>
            <Heading id="property-search-heading" className={styles.heading}>
              Find your place <span>in Las Vegas.</span>
            </Heading>
            <p className={styles.description}>
              A neighborhood you love. Room for what&apos;s next.
              Explore homes across the valley, on your terms.
            </p>
          </div>
          {showFilters ? (
            <Link href="/#contact" className={styles.advisor}>
              <Image
                src="/profile/mikko.png"
                alt="Mikko Lucernas"
                width={56}
                height={64}
                className={styles.portrait}
              />
              <span>
                <span className={styles.advisorLabel}>Your local perspective</span>
                <span className={styles.advisorName}>Ask Mikko <ArrowRight size={16} aria-hidden="true" /></span>
              </span>
            </Link>
          ) : (
            <Link href="/buy" className={styles.browseLink}>
              Browse all homes <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
        </div>

        {preference && (
          <p className={styles.preference}>
            Looking for {preference}? Enter your preferences in the MLS search
            below to see matching homes.
          </p>
        )}

        <div ref={workspaceRef} className={styles.workspace}>
          <div className={styles.toolbar}>
            <div className={styles.searchIdentity}>
              <span className={styles.searchIcon}><Compass size={22} weight="regular" aria-hidden="true" /></span>
              <div>
                <h3 className={styles.searchTitle}>Explore the valley</h3>
                <p role="status" className={styles.status}>
                  {loaded ? "Listings provided by Matrix MLS" : enabled ? "Opening MLS search…" : "MLS homes, all in one place"}
                </p>
              </div>
            </div>
            <div className={styles.actions}>
              {canExpand && (
                <button
                  ref={expandButtonRef}
                  type="button"
                  onClick={toggleExpanded}
                  aria-pressed={expanded}
                  className={styles.expandButton}
                >
                  {expanded ? <ArrowsIn size={17} aria-hidden="true" /> : <ArrowsOut size={17} aria-hidden="true" />}
                  {expanded ? "Exit expanded view" : "Expand search"}
                </button>
              )}
              <a
                href={MLS_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
              >
                Open full search <ArrowSquareOut size={17} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          {expandError && <p role="status" className={styles.error}>{expandError}</p>}

          <p id="mls-mobile-hint" className={styles.mobileHint}>
            Scroll sideways for all filters, or open the full search in a new tab.
          </p>
          <div
            ref={containerRef}
            role="region"
            aria-label="MLS search panel"
            aria-describedby="mls-mobile-hint"
            tabIndex={0}
            className={styles.searchPanel}
          >
            {enabled ? (
              <iframe
                src={MLS_SEARCH_URL}
                title="Las Vegas MLS listings — search homes with Mikko Lucernas"
                width="100%"
                height="900"
                className={styles.frame}
                onLoad={() => setLoaded(true)}
              />
            ) : (
              <div className={styles.placeholder}>
                <Compass size={36} weight="light" aria-hidden="true" />
                <p>Your next home is worth a closer look.</p>
                <button type="button" className={styles.loadButton} onClick={() => setEnabled(true)}>
                  Start exploring <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
          <div className={styles.searchFooter}>
            <span>Las Vegas · Henderson · North Las Vegas</span>
            <span>Search not appearing? <a href={MLS_SEARCH_URL} target="_blank" rel="noopener noreferrer">Open in a new tab <span className="sr-only">(opens in a new tab)</span></a></span>
          </div>
        </div>

        <p className={styles.guidance}>
          Found a home you like? <Link href="/#contact">Let&apos;s take a closer look together <ArrowRight size={15} aria-hidden="true" /></Link>
        </p>
      </div>
    </section>
  );
}
