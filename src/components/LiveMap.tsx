"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { layers, namedTheme } from "protomaps-themes-base";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Listing } from "@/lib/data";

export type Bounds = { n: number; s: number; e: number; w: number };
type Basemap = "map" | "satellite";

type LiveMapProps = {
  points: Listing[];
  activeId: string | null;
  onSelect: (id: string) => void;
  apiKey: string;
  onBoundsChange?: (b: Bounds) => void;
  focus?: { lng: number; lat: number; zoom?: number } | null;
  fitSignal?: number;
};

const NAVY = "#173047";
const SAGE = "#789c67";

function shortPrice(n: number) {
  if (n >= 1_000_000)
    return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  return `$${Math.round(n / 1000)}K`;
}

function img(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/320/180`;
}

function popupNode(p: Listing) {
  const card = document.createElement("div");
  card.className = "llcard";
  const image = document.createElement("img");
  image.src = img(p.seed);
  image.alt = "";
  card.append(image);

  const body = document.createElement("div");
  body.className = "body";
  const addText = (className: string, value: string) => {
    const element = document.createElement("div");
    element.className = className;
    element.textContent = value;
    body.append(element);
  };
  addText("price", p.price);
  addText("specs", `${p.beds} bd · ${p.baths} ba · ${p.sqft} sqft`);
  addText("addr", p.address);
  addText("area", p.area);
  const link = document.createElement("a");
  link.href = "/#contact";
  link.textContent = "Request a tour →";
  body.append(link);
  card.append(body);
  return card;
}

function toFeatures(points: Listing[]) {
  return {
    type: "FeatureCollection" as const,
    features: points.map((p) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [p.lng, p.lat] },
      properties: {
        id: p.address,
        price: p.price,
        priceShort: shortPrice(p.priceNum),
      },
    })),
  };
}

function vectorStyle(apiKey: string): maplibregl.StyleSpecification {
  return {
    version: 8,
    glyphs:
      "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
    sources: {
      protomaps: {
        type: "vector",
        url: `https://tiles.latlng.work/v1/metadata?key=${apiKey}`,
      },
    },
    layers: layers("protomaps", namedTheme("light"), { lang: "en" }),
  };
}

function satelliteStyle(): maplibregl.StyleSpecification {
  return {
    version: 8,
    glyphs:
      "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sources: {
      sat: {
        type: "raster",
        tiles: [
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
      },
    },
    layers: [{ id: "sat", type: "raster", source: "sat" }],
  };
}

export default function LiveMap({
  points,
  activeId,
  onSelect,
  apiKey,
  onBoundsChange,
  focus,
  fitSignal = 0,
}: LiveMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [ready, setReady] = useState(false);
  const [basemap, setBasemap] = useState<Basemap>("map");

  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;
  const boundsRef = useRef(onBoundsChange);
  boundsRef.current = onBoundsChange;
  const pointsRef = useRef(points);
  pointsRef.current = points;
  const activeRef = useRef(activeId);
  activeRef.current = activeId;

  function addHomeLayers(map: maplibregl.Map) {
    if (map.getSource("homes")) return;
    map.addSource("homes", {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] },
      cluster: true,
      clusterRadius: 46,
      clusterMaxZoom: 12,
    });
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "homes",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": NAVY,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 2.5,
        "circle-radius": ["step", ["get", "point_count"], 17, 5, 21, 20, 27],
      },
    });
    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "homes",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["Noto Sans Medium"],
        "text-size": 13,
      },
      paint: { "text-color": "#ffffff" },
    });
    map.addLayer({
      id: "unclustered",
      type: "circle",
      source: "homes",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": NAVY,
        "circle-radius": 8,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 2.5,
      },
    });
    map.addLayer({
      id: "unclustered-active",
      type: "circle",
      source: "homes",
      filter: ["==", ["get", "id"], activeRef.current ?? "__none__"],
      paint: {
        "circle-color": SAGE,
        "circle-radius": 11,
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 3,
      },
    });
  }

  function syncData(map: maplibregl.Map) {
    const src = map.getSource("homes") as maplibregl.GeoJSONSource | undefined;
    src?.setData(toFeatures(pointsRef.current));
  }

  function applyActive(map: maplibregl.Map) {
    const id = activeRef.current;
    if (map.getLayer("unclustered-active")) {
      map.setFilter("unclustered-active", [
        "==",
        ["get", "id"],
        id ?? "__none__",
      ]);
    }
    popupRef.current?.remove();
    const p = pointsRef.current.find((x) => x.address === id);
    if (!p) return;
    popupRef.current = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      // MapLibre focuses the first link in a newly opened popup by default.
      // That moves the document viewport from the hero to this map on page load.
      focusAfterOpen: false,
      offset: 16,
      className: "llpopup",
      maxWidth: "230px",
    })
      .setLngLat([p.lng, p.lat])
      .setDOMContent(popupNode(p))
      .addTo(map);
  }

  // Init the map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    setError(false);
    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container: containerRef.current,
        style: vectorStyle(apiKey),
        center: [-115.18, 36.14],
        zoom: 9.4,
        attributionControl: false,
      });
    } catch {
      setError(true);
      return;
    }
    const timeout = window.setTimeout(() => setError(true), 12000);
    map.on("error", () => setError(true));
    mapRef.current = map;
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-left",
    );

    const report = () => {
      const b = map.getBounds();
      boundsRef.current?.({
        n: b.getNorth(),
        s: b.getSouth(),
        e: b.getEast(),
        w: b.getWest(),
      });
    };

    map.on("load", () => {
      window.clearTimeout(timeout);
      addHomeLayers(map);
      syncData(map);
      applyActive(map);
      setReady(true);
      report();
    });
    map.on("moveend", report);

    // Re-add our data layers after a basemap (setStyle) swap
    map.on("style.load", () => {
      if (!map.isStyleLoaded()) return;
      addHomeLayers(map);
      syncData(map);
      applyActive(map);
    });

    // Interactions
    map.on("click", "clusters", async (e) => {
      const f = map.queryRenderedFeatures(e.point, { layers: ["clusters"] })[0];
      if (!f) return;
      const clusterId = f.properties?.cluster_id;
      const src = map.getSource("homes") as maplibregl.GeoJSONSource;
      const zoom = await src.getClusterExpansionZoom(clusterId);
      const coords = (f.geometry as GeoJSON.Point).coordinates as [
        number,
        number,
      ];
      map.easeTo({ center: coords, zoom });
    });
    map.on("click", "unclustered", (e) => {
      const id = e.features?.[0]?.properties?.id;
      if (id) selectRef.current(String(id));
    });
    for (const layer of ["clusters", "unclustered"]) {
      map.on("mouseenter", layer, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", layer, () => {
        map.getCanvas().style.cursor = "";
      });
    }

    return () => {
      window.clearTimeout(timeout);
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, attempt]);

  // Push new data when the point set changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    syncData(map);
    applyActive(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, points]);

  // Fit to the current point set when explicitly signalled (filter/query change)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    if (points.length === 0) {
      map.easeTo({ center: [-115.18, 36.14], zoom: 9.4, duration: 500 });
      return;
    }
    const bounds = new maplibregl.LngLatBounds();
    points.forEach((p) => bounds.extend([p.lng, p.lat]));
    map.fitBounds(bounds, { padding: 80, maxZoom: 13, duration: 600 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, fitSignal]);

  // Fly to an externally chosen location (ZIP / city / community search)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !focus) return;
    map.flyTo({
      center: [focus.lng, focus.lat],
      zoom: focus.zoom ?? map.getZoom(),
      duration: 900,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, focus]);

  // Highlight + open the active property
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    applyActive(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, ready]);

  function changeBasemap(b: Basemap) {
    const map = mapRef.current;
    if (!map || b === basemap) return;
    setBasemap(b);
    map.setStyle(b === "satellite" ? satelliteStyle() : vectorStyle(apiKey));
  }

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        aria-label="Property map"
        className="h-full w-full"
      />
      {!ready && !error && (
        <div
          role="status"
          className="pointer-events-none absolute inset-0 grid place-items-center bg-cream/90 text-sm text-muted"
        >
          Loading property map…
        </div>
      )}
      {error && (
        <div
          role="status"
          className="absolute bottom-14 left-3 right-3 z-20 rounded-xl border border-navy-900/15 bg-paper p-4 text-sm text-ink shadow-soft"
        >
          <p>
            The map couldn’t load completely. You can still browse homes and use
            the filters.
          </p>
          <button
            type="button"
            onClick={() => setAttempt((value) => value + 1)}
            className="mt-2 min-h-11 font-semibold underline underline-offset-4"
          >
            Retry map
          </button>
        </div>
      )}
      <div className="absolute left-3 top-3 z-10 flex overflow-hidden rounded-lg border border-navy-900/10 bg-white shadow-soft">
        {(["map", "satellite"] as Basemap[]).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => changeBasemap(b)}
            aria-pressed={basemap === b}
            className={`min-h-11 px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
              basemap === b
                ? "bg-navy-950 text-white"
                : "text-navy-800 underline-offset-4 hover:underline"
            }`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}
