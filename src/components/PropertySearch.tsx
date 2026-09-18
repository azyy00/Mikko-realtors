"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SlidersHorizontal, MagnifyingGlass, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import LocationSearch, { type LocationSuggestion } from "./LocationSearch";
import { listings, type Listing } from "@/lib/data";
import type { Bounds } from "./LiveMap";

const LiveMap = dynamic(() => import("./LiveMap"), {
  ssr: false,
  loading: () => (
    <p
      role="status"
      className="grid h-full place-items-center bg-cream text-sm text-muted"
    >
      Loading map…
    </p>
  ),
});
const apiKey = process.env.NEXT_PUBLIC_MAP_KEY;

function img(seed: string) {
  return `https://picsum.photos/seed/${seed}/300/300`;
}

function inBounds(l: Listing, b: Bounds) {
  return l.lat <= b.n && l.lat >= b.s && l.lng <= b.e && l.lng >= b.w;
}

const fallbackPins = [
  { left: "27%", top: "34%" },
  { left: "58%", top: "42%" },
  { left: "43%", top: "66%" },
  { left: "74%", top: "56%" },
];
const areas = [
  { label: "Summerlin", left: "13%", top: "19%" },
  { label: "North Las Vegas", left: "58%", top: "15%" },
  { label: "Southwest", left: "17%", top: "80%" },
  { label: "Henderson", left: "72%", top: "82%" },
];

type Toggles = {
  newBuild: boolean;
  singleStory: boolean;
  pool: boolean;
  garage3: boolean;
};

type Props = {
  showFilters?: boolean;
  initialQuery?: string;
  initialPrice?: string;
};

export default function PropertySearch({
  showFilters = false,
  initialQuery = "",
  initialPrice = "any",
}: Props) {
  const [q, setQ] = useState(initialQuery);
  const [price, setPrice] = useState(initialPrice);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [type, setType] = useState("any");
  const [toggles, setToggles] = useState<Toggles>({
    newBuild: false,
    singleStory: false,
    pool: false,
    garage3: false,
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  // Map-driven search state
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [searchAsMove, setSearchAsMove] = useState(true);
  const [focus, setFocus] = useState<{
    lng: number;
    lat: number;
    zoom?: number;
  } | null>(null);
  const [fitSignal, setFitSignal] = useState(0);

  const mapRef = useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible] = useState(showFilters);
  useEffect(() => {
    if (showFilters || !mapRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, [showFilters]);
  const railRef = useRef<HTMLDivElement>(null);

  // Attribute + text filter (drives the markers on the map)
  const filtered = useMemo(() => {
    let list: Listing[] = listings;
    if (price === "under-500k") list = list.filter((l) => l.priceNum < 500000);
    else if (price === "500-750k")
      list = list.filter((l) => l.priceNum >= 500000 && l.priceNum <= 750000);
    else if (price === "750k-plus")
      list = list.filter((l) => l.priceNum > 750000);
    if (beds) list = list.filter((l) => l.beds >= beds);
    if (baths) list = list.filter((l) => l.baths >= baths);
    if (type !== "any") list = list.filter((l) => l.type === type);
    if (toggles.newBuild) list = list.filter((l) => l.newBuild);
    if (toggles.singleStory) list = list.filter((l) => l.singleStory);
    if (toggles.pool) list = list.filter((l) => l.pool);
    if (toggles.garage3) list = list.filter((l) => l.garage >= 3);
    if (q) {
      const term = q.toLowerCase().split(",")[0].trim();
      const matched = list.filter((l) =>
        `${l.area} ${l.address}`.toLowerCase().includes(term),
      );
      list = matched;
    }
    return list;
  }, [price, beds, baths, type, toggles, q]);

  // What the map shows as markers
  const mapPoints = useMemo(
    () => (showFilters ? filtered : filtered.slice(0, 4)),
    [showFilters, filtered],
  );

  // What the results rail shows (narrowed to the visible map area on the map page)
  const list = useMemo(() => {
    if (!showFilters) return filtered.slice(0, 4);
    if (searchAsMove && bounds)
      return filtered.filter((l) => inBounds(l, bounds));
    return filtered;
  }, [showFilters, filtered, searchAsMove, bounds]);

  // Refit the map to the marker set only when the filter/query set changes
  useEffect(() => {
    setFitSignal((n) => n + 1);
  }, [price, beds, baths, type, toggles, q]);

  // Keep a valid active property as the visible set changes
  useEffect(() => {
    if (list.length === 0) {
      setActiveId(null);
      return;
    }
    setActiveId((cur) =>
      cur && list.some((l) => l.address === cur) ? cur : list[0].address,
    );
  }, [list]);

  // Only a deliberate map selection scrolls the results rail, never the page.
  function selectFromMap(id: string) {
    setActiveId(id);
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(
      `[data-id="${CSS.escape(id)}"]`,
    );
    if (rail && card) {
      const offset =
        card.getBoundingClientRect().top - rail.getBoundingClientRect().top;
      rail.scrollTo({ top: rail.scrollTop + offset, behavior: "instant" });
    }
  }

  function pickSuggestion(s: LocationSuggestion) {
    setQ(s.name);
    if (typeof s.lat === "number" && typeof s.lon === "number") {
      setFocus({ lng: s.lon, lat: s.lat, zoom: 12 });
    }
  }

  const Heading = showFilters ? "h1" : "h2";
  const hasActiveFilters =
    price !== "any" ||
    beds > 0 ||
    baths > 0 ||
    type !== "any" ||
    q.trim() !== "" ||
    toggles.newBuild ||
    toggles.singleStory ||
    toggles.pool ||
    toggles.garage3;

  function clearAll() {
    setBounds(null);
    setFocus(null);
    setFitSignal((value) => value + 1);
    setPrice("any");
    setBeds(0);
    setBaths(0);
    setType("any");
    setQ("");
    setToggles({
      newBuild: false,
      singleStory: false,
      pool: false,
      garage3: false,
    });
  }

  const toggle = (k: keyof Toggles) =>
    setToggles((t) => ({ ...t, [k]: !t[k] }));

  return (
    <section
      id="search"
      className={`bg-cream ${showFilters ? "pb-16 pt-28" : "py-24"}`}
    >
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Heading className="display text-4xl text-ink sm:text-5xl">
              Search the whole valley on one map
            </Heading>
            <p className="subhead mt-4 max-w-2xl">
              {showFilters
                ? "Explore sample homes by price, beds, or community. Pan and zoom to narrow the area."
                : "Pan, zoom, and click a marker to explore homes across Las Vegas."}
            </p>
          </div>
          {!showFilters && (
            <Link href="/buy" className="btn-gold shrink-0">
              <MagnifyingGlass size={16} weight="bold" />
              Search with filters
            </Link>
          )}
        </Reveal>

        {/* Filter bar (map page only) */}
        {showFilters && (
          <div className="mt-8 rounded-xl2 border border-navy-900/10 bg-white p-4 shadow-soft">
            {/* Location search with autosuggest */}
            <div className="mb-4">
              <LocationSearch
                value={q}
                onChange={setQ}
                onSelect={pickSuggestion}
                label="Search city, community, or address"
                placeholder="City, community, or address"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Select
                label="Price"
                value={price}
                onChange={setPrice}
                options={[
                  ["any", "Any price"],
                  ["under-500k", "Under $500k"],
                  ["500-750k", "$500k to $750k"],
                  ["750k-plus", "$750k+"],
                ]}
              />
              <Select
                label="Beds"
                value={String(beds)}
                onChange={(v) => setBeds(Number(v))}
                options={[
                  ["0", "Beds"],
                  ["1", "1+"],
                  ["2", "2+"],
                  ["3", "3+"],
                  ["4", "4+"],
                  ["5", "5+"],
                ]}
              />
              <Select
                label="Baths"
                value={String(baths)}
                onChange={(v) => setBaths(Number(v))}
                options={[
                  ["0", "Baths"],
                  ["1", "1+"],
                  ["2", "2+"],
                  ["3", "3+"],
                ]}
              />
              <Select
                label="Type"
                value={type}
                onChange={setType}
                options={[
                  ["any", "Any type"],
                  ["Single Family", "Single Family"],
                  ["Townhome", "Townhome"],
                  ["Condo", "Condo"],
                ]}
              />
              <span className="mx-1 hidden h-6 w-px bg-navy-900/10 sm:block" />
              <Chip on={toggles.newBuild} onClick={() => toggle("newBuild")}>
                New Construction
              </Chip>
              <Chip
                on={toggles.singleStory}
                onClick={() => toggle("singleStory")}
              >
                Single-Story
              </Chip>
              <Chip on={toggles.pool} onClick={() => toggle("pool")}>
                Pool
              </Chip>
              <Chip on={toggles.garage3} onClick={() => toggle("garage3")}>
                3+ Garage
              </Chip>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-gold-600"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>
          </div>
        )}

        <div
          className={`mt-6 grid grid-cols-1 gap-6 ${
            showFilters ? "lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.7fr)]" : ""
          }`}
        >
          {/* Results rail (map page only) */}
          {showFilters && (
            <Reveal className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-xl border border-navy-900/10 bg-white px-4 py-3 text-sm">
                <span role="status" className="font-semibold text-ink">
                  <span className="tnum">{list.length}</span>{" "}
                  {list.length === 1 ? "home" : "homes"}
                  {showFilters && searchAsMove && (
                    <span className="font-normal text-muted">
                      {" "}
                      in this area
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-2 text-muted">
                  <SlidersHorizontal size={16} />{" "}
                  {showFilters ? "Filtered" : "Filters"}
                </span>
              </div>

              {list.length === 0 ? (
                <div className="rounded-xl border border-dashed border-navy-900/15 bg-white p-8 text-center">
                  <p className="text-sm text-muted">
                    {showFilters && searchAsMove && filtered.length > 0
                      ? "No homes in the current map view. Zoom out or move the map."
                      : "No homes match these filters."}
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="btn-ghost mt-4"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div
                  ref={railRef}
                  className="flex max-h-[544px] flex-col gap-3 overflow-y-auto pr-1 lg:max-h-[664px]"
                >
                  {list.map((l, i) => {
                    const on = l.address === activeId;
                    return (
                      <button
                        key={l.address}
                        type="button"
                        data-id={l.address}
                        onMouseEnter={() => setActiveId(l.address)}
                        onFocus={() => setActiveId(l.address)}
                        onClick={() => {
                          setActiveId(l.address);
                          setFocus({ lng: l.lng, lat: l.lat });
                        }}
                        aria-pressed={on}
                        className={`flex items-center gap-4 rounded-xl border bg-white p-3 text-left transition-colors duration-150 ${
                          on
                            ? "border-gold-400 shadow-soft ring-1 ring-gold-400"
                            : "border-navy-900/10 hover:border-navy-900/20"
                        }`}
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${img(l.seed)})` }}
                          />
                          <span
                            className={`absolute left-1 top-1 grid h-5 w-5 place-items-center rounded-md text-[11px] font-bold transition-colors ${
                              on
                                ? "bg-gold-400 text-navy-950"
                                : "bg-navy-950/80 text-gold-200"
                            }`}
                          >
                            {i + 1}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="tnum font-display text-lg font-semibold text-ink">
                            {l.price}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {l.beds} bd · {l.baths} ba · {l.sqft} sqft ·{" "}
                            {l.area}
                          </p>
                          <p className="truncate text-xs text-navy-700">
                            {l.address}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </Reveal>
          )}

          {/* Map */}
          <div ref={mapRef}>
            {apiKey ? (
              <div
                className={`relative overflow-hidden rounded-xl2 border border-navy-900/10 ${
                  showFilters
                    ? "h-[500px] lg:h-[720px]"
                    : "h-[440px] lg:h-[600px]"
                }`}
              >
                {mapVisible ? (
                  <LiveMap
                    points={mapPoints}
                    activeId={activeId}
                    onSelect={selectFromMap}
                    apiKey={apiKey}
                    onBoundsChange={setBounds}
                    focus={focus}
                    fitSignal={fitSignal}
                  />
                ) : (
                  <p className="grid h-full place-items-center bg-cream text-muted">
                    Map preview loads as you scroll
                  </p>
                )}
                {showFilters && (
                  <label className="absolute left-3 top-16 z-10 flex cursor-pointer items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-semibold text-navy-900 shadow-soft backdrop-blur">
                    <input
                      type="checkbox"
                      checked={searchAsMove}
                      onChange={(e) => setSearchAsMove(e.target.checked)}
                      className="h-3.5 w-3.5 accent-sage-500"
                    />
                    Search within map
                  </label>
                )}
                {showFilters && !searchAsMove && (
                  <button
                    type="button"
                    onClick={() => setSearchAsMove(true)}
                    className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy-950 px-5 py-2.5 text-xs font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 hover:-translate-x-1/2"
                  >
                    <MagnifyingGlass size={14} weight="bold" />
                    Search this area
                  </button>
                )}
              </div>
            ) : (
              <div className="relative h-full min-h-[440px] overflow-hidden rounded-xl2 border border-navy-900/10 bg-navy-900">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/10 blur-3xl" />
                {areas.map((a) => (
                  <span
                    key={a.label}
                    className="absolute -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider text-white/30"
                    style={{ left: a.left, top: a.top }}
                  >
                    {a.label}
                  </span>
                ))}
                {list.slice(0, 4).map((l, i) => {
                  const on = l.address === activeId;
                  const p = fallbackPins[i];
                  return (
                    <button
                      key={l.address}
                      type="button"
                      aria-label={`${l.price}, ${l.area}`}
                      onMouseEnter={() => setActiveId(l.address)}
                      onClick={() => setActiveId(l.address)}
                      className="absolute -translate-x-1/2 -translate-y-full"
                      style={{ left: p.left, top: p.top, zIndex: on ? 20 : 10 }}
                    >
                      <AnimatePresence>
                        {on && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.9 }}
                            className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-left shadow-soft"
                          >
                            <p className="tnum font-display text-sm font-semibold text-ink">
                              {l.price}
                            </p>
                            <p className="text-[11px] text-muted">
                              {l.beds} bd · {l.area}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span
                        className={`grid h-9 w-9 rotate-45 place-items-center rounded-full rounded-bl-none text-[13px] font-bold ${
                          on
                            ? "bg-gold-400 text-navy-950 shadow-gold"
                            : "bg-gold-400/70 text-navy-950/80"
                        }`}
                      >
                        <span className="-rotate-45">{i + 1}</span>
                      </span>
                    </button>
                  );
                })}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-navy-900 shadow-soft">
                  <MagnifyingGlass size={14} weight="bold" />
                  Map preview · live map unavailable
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 cursor-pointer rounded-full border border-navy-900/15 bg-white py-2 pl-4 pr-8 text-sm text-navy-800 outline-none transition-colors hover:border-gold-400 focus:border-gold-400"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
        on
          ? "border-gold-400 bg-gold-400 text-navy-950"
          : "border-navy-900/15 text-navy-800 hover:border-gold-400"
      }`}
    >
      {children}
    </button>
  );
}
