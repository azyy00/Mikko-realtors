"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowsOut, CaretLeft, CaretRight, SealCheck, X } from "@phosphor-icons/react";

const chip = "bg-navy-950/75 text-[11px] font-semibold text-white backdrop-blur-sm";

export default function SoldGallery({ photos }: { photos: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const isOpen = open !== null;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );
  const prev = useCallback(
    () =>
      setOpen((i) =>
        i === null ? i : (i - 1 + photos.length) % photos.length,
      ),
    [photos.length],
  );

  // Keyboard nav + lock scroll while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const trigger = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      trigger?.focus({ preventScroll: true });
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, next, prev]);

  return (
    <>
      {/* Phones: two-up poster cards like the blog. From sm up: masonry of whole flyers. */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:block sm:columns-2 sm:gap-4 lg:columns-3">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View closing photo ${i + 1}`}
            className="group block w-full min-w-0 rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:mb-4 sm:break-inside-avoid sm:rounded-xl2"
          >
            <span className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-navy-950 sm:aspect-auto sm:rounded-xl2 sm:border sm:border-navy-900/10 sm:bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Sold in Las Vegas with Mikko Lucernas (${i + 1})`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] sm:h-auto"
              />
              <span className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full py-1 pl-1.5 pr-2.5 sm:hidden ${chip}`}>
                <SealCheck size={13} weight="fill" className="text-sage-300" aria-hidden="true" />
                Sold
              </span>
              <span aria-hidden="true" className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full sm:hidden ${chip}`}>
                <ArrowsOut size={14} weight="bold" />
              </span>
            </span>
            <span className="mt-2.5 flex min-w-0 items-center gap-2 sm:hidden">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gold-400" />
              <span className="tnum truncate font-display text-base font-semibold text-ink">
                Closing {String(i + 1).padStart(2, "0")}
              </span>
            </span>
            <span className="mt-0.5 block text-xs text-muted sm:hidden">Las Vegas · Tap to view</span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && open !== null && (
        <dialog
          ref={dialogRef}
          onCancel={close}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const buttons =
              event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}
          className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center border-0 bg-navy-950/95 p-4 text-white backdrop:bg-navy-950/80 open:flex"
          onClick={close}
          aria-modal="true"
          aria-label="Sold photo viewer"
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} weight="bold" />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-400 hover:text-navy-950 sm:left-6"
          >
            <CaretLeft size={22} weight="bold" />
          </button>

          {/* Image */}
          <figure
            className="flex max-h-[86vh] max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[open]}
              alt={`Sold in Las Vegas with Mikko Lucernas (${open + 1})`}
              className="max-h-[80dvh] max-w-full w-auto rounded-xl2 object-contain shadow-2xl"
            />
            <figcaption
              aria-live="polite"
              className="tnum mt-4 text-sm font-medium text-white/70"
            >
              {open + 1} / {photos.length}
            </figcaption>
          </figure>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-400 hover:text-navy-950 sm:right-6"
          >
            <CaretRight size={22} weight="bold" />
          </button>
        </dialog>
      )}
    </>
  );
}
