"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  CalendarBlank,
  X,
  House,
  Handshake,
  Tag,
  Blueprint,
} from "@phosphor-icons/react";

const options = [
  { label: "Tour a Home", icon: House },
  { label: "Buying Consultation", icon: Handshake },
  { label: "Selling Consultation", icon: Tag },
  { label: "New Construction Tour", icon: Blueprint },
];

export default function ScheduleTour() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 print:hidden"
    >
      {open && (
        <div
          id="tour-options"
          className="popover-enter absolute bottom-full right-0 mb-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-navy-950 p-2 text-white shadow-soft"
        >
          <div className="px-3 py-2">
            <p className="font-display text-base font-semibold">
              Schedule with Mikko
            </p>
            <p className="text-xs text-white/55">Pick what fits your move.</p>
          </div>
          {options.map(({ label, icon: Icon }) => (
            <Link
              key={label}
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-gold-200"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-gold-300">
                <Icon size={16} />
              </span>
              {label}
            </Link>
          ))}
          <p className="px-3 py-2 text-[11px] text-white/70">
            Send Mikko your preferred date and time. He will confirm
            availability with you.
          </p>
        </div>
      )}

      <button
        ref={trigger}
        aria-controls="tour-options"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Schedule a tour"
        className="btn-gold shadow-soft"
      >
        {open ? (
          <X size={16} weight="bold" />
        ) : (
          <CalendarBlank size={16} weight="fill" />
        )}
        Schedule a Tour
      </button>
    </div>
  );
}
