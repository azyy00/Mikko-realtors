"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Records one anonymous page view per route change for the /admin dashboard.
export default function VisitTracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    if (navigator.doNotTrack === "1") return;
    // Only the landing page has a meaningful external referrer.
    const referrer = first.current ? document.referrer : "";
    first.current = false;
    const body = JSON.stringify({ path: pathname, referrer });
    const sent = navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }));
    if (!sent) {
      fetch("/api/track", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
