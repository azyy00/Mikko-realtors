"use client";

import Link from "next/link";
import HeroVideo from "./HeroVideo";
import {
  MagnifyingGlass,
  MapPin,
  Medal,
  HouseLine,
  AirplaneTilt,
} from "@phosphor-icons/react";
const trust = [
  { icon: MapPin, label: "Trusted Local Expert" },
  { icon: HouseLine, label: "New Construction Specialist" },
  { icon: Medal, label: "VA & Military Friendly" },
  { icon: AirplaneTilt, label: "Relocation Specialist" },
];

export default function Hero() {
  return (
    <>
      <section id="top" aria-label="Mikko's introduction" className="relative aspect-video overflow-hidden bg-navy-950 lg:aspect-auto lg:h-[100svh]">
        <HeroVideo />
      </section>

      {/* Keep the headline and copy in the initial HTML, below the video. */}
      <section id="home-introduction" aria-labelledby="home-heading" className="bg-paper py-8 sm:py-12 lg:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <h1 id="home-heading" className="display text-balance text-5xl text-ink sm:text-6xl lg:text-7xl">
            Your next chapter
            <br />
            starts in <span className="text-gold-600">Las Vegas.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Homes, guidance, and a smoother way to move. Work with a REALTOR®
            focused on new construction, relocation, and getting you the right
            deal, not just any deal.
          </p>

          <div className="mt-9">
            <Link href="/buy" className="btn-gold px-6 py-3.5">
              <MagnifyingGlass size={18} weight="bold" />
              Search MLS Homes
            </Link>
            <p className="mt-3 text-sm text-muted">
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
                className="rounded-full border border-navy-900/20 px-4 py-2 text-sm text-navy-900 transition-colors hover:border-gold-400 hover:text-gold-600"
              >
                {c.label}
              </Link>
            ))}
          </div>

          {/* Trust row */}
          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={18} className="text-gold-600" weight="regular" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      </section>
    </>
  );
}
