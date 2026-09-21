"use client";

import Link from "next/link";
import BackgroundVideo from "./BackgroundVideo";
import {
  MagnifyingGlass,
  MapPin,
  Medal,
  HouseLine,
  AirplaneTilt,
  CaretDown,
} from "@phosphor-icons/react";
const trust = [
  { icon: MapPin, label: "Trusted Local Expert" },
  { icon: HouseLine, label: "New Construction Specialist" },
  { icon: Medal, label: "VA & Military Friendly" },
  { icon: AirplaneTilt, label: "Relocation Specialist" },
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh]">
      {/* Background video */}
      <BackgroundVideo src="/videos/hero.mp4" eager />

      {/* Navy wash, darker on the left for the asymmetric text column */}
      <div className="pointer-events-none hero-wash absolute inset-0" />
      <div className="pointer-events-none hero-wash-b absolute inset-0" />

      {/* Content */}
      <div className="container-x relative z-10 flex min-h-[100dvh] items-center pt-28 pb-16">
        <div className="max-w-2xl">
          <h1 className="display text-balance text-5xl text-white sm:text-6xl lg:text-7xl">
            Your next chapter
            <br />
            starts in <span className="text-gold-300">Las Vegas.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Homes, guidance, and a smoother way to move. Work with a REALTOR®
            focused on new construction, relocation, and getting you the right
            deal, not just any deal.
          </p>

          <div className="mt-9">
            <Link href="/buy" className="btn-gold px-6 py-3.5">
              <MagnifyingGlass size={18} weight="bold" />
              Search MLS Homes
            </Link>
            <p className="mt-3 text-sm text-white/75">
              Browse current listings and choose your location, price, and home features.
            </p>
          </div>

          {/* Immediate choices */}
          <div className="mt-4 flex flex-wrap gap-2.5">
            {[
              { label: "Search Homes", href: "/buy" },
              { label: "New Construction", href: "/guides/new-construction" },
              { label: "VA Buyers", href: "/guides/va-loan" },
              { label: "Military & Veteran Army", href: "/guides/va-loan" },
              { label: "Sell My Home", href: "/guides/sellers" },
            ].map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur transition-colors hover:border-gold-400 hover:text-gold-200"
              >
                {c.label}
              </Link>
            ))}
          </div>

          {/* Trust row */}
          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/80">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={18} className="text-gold-300" weight="regular" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#listings"
        aria-label="Scroll to listings"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60"
      >
        <CaretDown size={26} />
      </a>
    </section>
  );
}
