"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { List, X, Phone, CaretDown } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { nav, agent } from "@/lib/data";
import { usePageScrolled } from "@/lib/usePageScrolled";

export default function Nav({
  solid = false,
  revealAfterScroll = false,
}: {
  solid?: boolean;
  revealAfterScroll?: boolean;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const scrolled = usePageScrolled();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    if (revealAfterScroll && !scrolled && matchMedia("(min-width: 1024px)").matches) {
      setOpen(false);
      setOpenGroup(null);
    }
  }, [revealAfterScroll, scrolled]);

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setOpenGroup(null);
      }
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const focused = document.activeElement as HTMLElement;
      const group = focused.closest("[data-nav-group]");
      const trigger =
        group?.querySelector<HTMLButtonElement>("button") ??
        headerRef.current?.querySelector<HTMLButtonElement>(
          '[aria-controls="mobile-navigation"]',
        );
      if (openGroup) setOpenGroup(null);
      else setOpen(false);
      trigger?.focus();
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [openGroup]);

  const dark = solid || scrolled || open;

  return (
    <header
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpenGroup(null);
          setOpen(false);
        }
      }}
      className={`${revealAfterScroll ? "sticky lg:fixed" : "fixed"} inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950 ${
        revealAfterScroll && !scrolled ? "lg:invisible lg:pointer-events-none" : "visible"
      }`}
    >
      <div className="mx-auto grid h-[72px] w-full max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 sm:h-20 sm:px-8 lg:px-12">
        {/* Brand */}
        <Link
          href="/#top"
          className="flex items-center text-white"
          aria-label={`${agent.name}, ${agent.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={`${agent.name}, ${agent.title}`}
            width={412}
            height={236}
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        {/* Desktop links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center justify-center gap-1 text-sm font-medium lg:flex"
        >
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} data-nav-group className="relative">
                <button
                  aria-expanded={openGroup === item.label}
                  aria-controls={`desktop-${item.label.replaceAll(" ", "-")}`}
                  onClick={() =>
                    setOpenGroup((g) => (g === item.label ? null : item.label))
                  }
                  data-open={openGroup === item.label || undefined}
                  className="nav-link flex items-center gap-1"
                >
                  {item.label}
                  <CaretDown
                    size={12}
                    weight="bold"
                    className={`transition-transform duration-200 ${
                      openGroup === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Dropdown */}

                {openGroup === item.label && (
                  <div
                    id={`desktop-${item.label.replaceAll(" ", "-")}`}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                  >
                    <div className="popover-enter min-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-navy-900 p-1.5 shadow-[0_24px_48px_-24px_rgba(8,17,28,0.8)]">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          aria-current={
                            pathname === c.href ? "page" : undefined
                          }
                          onClick={() => setOpenGroup(null)}
                          className="block rounded-lg px-3 py-2.5 text-sm text-white/80 no-underline transition-colors hover:bg-white/[0.06] hover:text-white aria-[current=page]:text-gold-300"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href ?? "/"}
                aria-current={pathname === item.href ? "page" : undefined}
                className="nav-link"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop CTA */}
        <a
          href={agent.phoneHref}
          className="hidden items-center gap-2 justify-self-end rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-[background-color,transform] duration-150 hover:bg-gold-300 active:scale-[0.97] lg:inline-flex"
        >
          <Phone size={16} weight="fill" />
          {agent.phone}
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="col-start-3 grid h-11 w-11 place-items-center justify-self-end rounded-full border border-white/20 text-white transition-transform active:scale-[0.95] lg:hidden"
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
      </div>

      {/* Mobile sheet */}

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="max-h-[70vh] overflow-y-auto border-t border-white/10 bg-navy-950 lg:hidden"
        >
          <div className="mx-auto flex w-full max-w-[1760px] flex-col px-5 py-3 sm:px-8">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  data-nav-group
                  className="border-b border-white/10"
                >
                  <button
                    aria-expanded={openGroup === item.label}
                    aria-controls={`mobile-${item.label.replaceAll(" ", "-")}`}
                    onClick={() =>
                      setOpenGroup((g) =>
                        g === item.label ? null : item.label,
                      )
                    }
                    className="flex w-full items-center justify-between py-4 font-display text-xl text-white"
                  >
                    {item.label}
                    <CaretDown
                      size={14}
                      weight="bold"
                      className={`transition-transform ${
                        openGroup === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openGroup === item.label && (
                    <div
                      id={`mobile-${item.label.replaceAll(" ", "-")}`}
                      className="popover-enter overflow-hidden"
                    >
                      <div className="flex flex-col pb-2 pl-4">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="py-2.5 text-[15px] text-white/75"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? "/"}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-4 font-display text-xl text-white no-underline"
                >
                  {item.label}
                </Link>
              ),
            )}
            <a href={agent.phoneHref} className="btn-gold mt-4">
              <Phone size={16} weight="fill" /> Call {agent.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
