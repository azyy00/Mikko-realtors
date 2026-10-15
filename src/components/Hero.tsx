import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MagnifyingGlass,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import HeroVideo from "./HeroVideo";
import { googleRating } from "@/lib/data";
import Marquee from "./Marquee";

// One clear choice per visitor goal; each leads somewhere different.
const goals = [
  { label: "New Construction", href: "/guides/new-construction" },
  { label: "VA & Military Buyers", href: "/guides/va-loan" },
  { label: "Relocating to Vegas", href: "/guides/relocation" },
  { label: "Sell My Home", href: "/home-valuation" },
];

export default function Hero() {
  return (
    <>
      {/* Specialty marquee, then the edge-to-edge intro, under the fixed nav (72px, 80px from sm).
          The frame always spans the full width at 16:9, so nothing is cropped:
          the captions burned into the video stay visible on every screen. On
          wide monitors the bottom of the video continues just below the fold. */}
      <section
        id="top"
        aria-label="Mikko's introduction"
        className="bg-navy-950 pt-[72px] sm:pt-20"
      >
        <Marquee />
        <div className="relative aspect-video w-full">
          <HeroVideo />
        </div>
      </section>

      <section
        id="home-introduction"
        aria-labelledby="home-heading"
        className="relative isolate overflow-hidden bg-paper pb-10 pt-10 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20"
      >
        {/* Oversized outlined word, purely decorative, bleeding off the right edge. */}
        <span
          aria-hidden="true"
          className="intro-watermark pointer-events-none absolute -right-[4vw] top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[34vw] font-semibold leading-none tracking-tight text-transparent sm:text-[26vw]"
        >
          VEGAS
        </span>

        <div className="container-x">
          <h1
            id="home-heading"
            className="intro-rise display text-[clamp(2.75rem,8.6vw,8.25rem)] leading-[0.95] text-ink"
          >
            <span className="block">Find your home</span>
            <span className="block">
              in Vegas{" "}
              <span className="relative whitespace-nowrap text-gold-600">
                with Lucernas.
                <span
                  aria-hidden="true"
                  className="intro-underline absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-gold-400 sm:-bottom-2 sm:h-[5px]"
                />
              </span>
            </span>
          </h1>

          <div className="intro-rise intro-rise-late mt-8 grid gap-6 border-t border-navy-900/10 pt-6 sm:mt-12 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
            <p className="max-w-[36rem] text-pretty text-[15px] leading-relaxed text-muted sm:text-lg">
              Army veteran and Las Vegas REALTOR® Mikko Lucernas helps you buy,
              sell, or relocate, with a focus on new construction.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link href="/buy" className="btn-gold px-5 py-3.5 shadow-[0_10px_24px_-12px_rgba(140,102,55,0.7)] sm:px-7">
                <MagnifyingGlass size={18} weight="bold" />
                Search Homes
              </Link>
              <Link href="/#contact" className="btn-ghost px-5 sm:px-6">
                Talk to Mikko
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>

          <nav aria-label="Start with your goal" className="intro-rise intro-rise-late mt-8 sm:mt-12">
            <p className="text-sm text-muted">I want help with</p>
            <ul className="mt-2 grid sm:mt-3 sm:grid-cols-2 lg:grid-cols-4">
              {goals.map((goal) => (
                <li key={goal.label}>
                  <Link
                    href={goal.href}
                    className="goal-link group flex min-h-14 items-center justify-between gap-3 border-b border-navy-900/10 py-3 font-display text-xl font-medium text-ink sm:text-2xl lg:mr-6"
                  >
                    <span className="goal-label">{goal.label}</span>
                    <ArrowUpRight size={20} weight="bold" aria-hidden="true" className="shrink-0 text-gold-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/#reviews"
            className="intro-rise intro-rise-late mt-8 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 text-ink sm:mt-10"
          >
            <span className="tnum font-display text-3xl font-semibold leading-none">{googleRating.score}</span>
            <span className="flex self-center text-gold-400" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} weight="fill" />
              ))}
            </span>
            <span className="text-sm text-muted underline decoration-gold-400/60 underline-offset-4">
              from {googleRating.count} Google reviews
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
