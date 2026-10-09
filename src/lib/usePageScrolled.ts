"use client";

import { useSyncExternalStore } from "react";

const subscribers = new Set<() => void>();

function notify() {
  subscribers.forEach((callback) => callback());
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  if (subscribers.size === 1) {
    window.addEventListener("scroll", notify, { passive: true });
  }
  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0) window.removeEventListener("scroll", notify);
  };
}

const getSnapshot = () => window.scrollY > 40;
const getServerSnapshot = () => false;

/** One passive listener shared by the header and floating homepage controls. */
export function usePageScrolled() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
