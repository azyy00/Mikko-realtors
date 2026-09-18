"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { List, X, Phone, CaretDown } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { nav, agent } from "@/lib/data";

export default function Nav({ solid = false }: { solid?: boolean }) {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        dark
          ? "bg-navy-950/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1760px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
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
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Desktop links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 text-sm text-white/80 lg:flex"
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
                  className={`flex items-center gap-1 py-1 transition-colors hover:text-gold-300 ${
                    openGroup === item.label ? "text-gold-300" : ""
                  }`}
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
                    <div className="popover-enter min-w-[248px] overflow-hidden rounded-2xl border border-white/10 bg-navy-950/95 p-2 shadow-soft backdrop-blur-md">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          aria-current={
                            pathname === c.href ? "page" : undefined
                          }
                          onClick={() => setOpenGroup(null)}
                          className="block rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-gold-300"
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
                className="py-1 transition-colors hover:text-gold-300"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/#contact"
          className="hidden items-center gap-2 rounded-full border border-gold-400/60 px-5 py-2.5 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold-400 hover:text-navy-950 lg:inline-flex"
        >
          <Phone size={16} weight="fill" />
          Let&apos;s Talk
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
      </div>

      {/* Mobile sheet */}

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="max-h-[70vh] overflow-y-auto border-t border-white/10 bg-navy-950 backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto flex w-full max-w-[1760px] flex-col px-5 py-3 sm:px-8">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  data-nav-group
                  className="border-b border-white/5"
                >
                  <button
                    aria-expanded={openGroup === item.label}
                    aria-controls={`mobile-${item.label.replaceAll(" ", "-")}`}
                    onClick={() =>
                      setOpenGroup((g) =>
                        g === item.label ? null : item.label,
                      )
                    }
                    className="flex w-full items-center justify-between py-3 text-white/85"
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
                            className="py-2 text-sm text-white/70"
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
                  className="border-b border-white/5 py-3 text-white/85"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn-gold mt-4"
            >
              <Phone size={16} weight="fill" /> Let&apos;s Talk
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
