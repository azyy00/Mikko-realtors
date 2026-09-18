import {
  Camera,
  ShareNetwork,
  MagnifyingGlass,
  Handshake,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { marketingSteps, socials } from "@/lib/data";

const stepIcons = {
  camera: Camera,
  social: ShareNetwork,
  search: MagnifyingGlass,
  buyers: Handshake,
} as const;

export default function MarketingEngine() {
  return (
    <section id="marketing" className="bg-paper py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="display text-4xl text-ink sm:text-5xl">
            How I market your home
          </h2>
          <p className="subhead mt-4">
            Selling is more than a sign in the yard. Your home gets professional
            marketing that reaches buyers where they actually are, social,
            search, and everywhere in between.
          </p>
        </div>

        {/* Source chips, where your listing gets seen */}
        <Reveal>
          <p className="mt-9 text-xs font-semibold uppercase tracking-wider text-muted">
            Your listing, shared where buyers are looking
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {socials.map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-navy-900/12 bg-white px-4 py-2 text-sm font-medium text-navy-800 shadow-[0_1px_2px_rgba(10,26,47,0.04)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon} alt="" aria-hidden className="h-[18px] w-[18px] object-contain" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Threaded step flow, a connector line runs behind numbered nodes */}
        <div className="relative mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute left-7 top-7 hidden h-[calc(100%-3.5rem)] w-px bg-gradient-to-b from-gold-400/50 to-gold-400/5 sm:block lg:left-0 lg:right-0 lg:top-7 lg:h-px lg:w-auto lg:bg-gradient-to-r lg:from-gold-400/10 lg:via-gold-400/60 lg:to-gold-400/10"
          />
          <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {marketingSteps.map((s, i) => {
              const Icon = stepIcons[s.icon as keyof typeof stepIcons];
              return (
                <Reveal key={s.k} delay={i * 0.08}>
                  <div className="flex items-start gap-4 sm:block">
                    <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-300 ring-8 ring-paper">
                      <Icon size={24} weight="regular" />
                      <span className="tnum absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-gold-400 text-[11px] font-bold text-navy-950">
                        {i + 1}
                      </span>
                    </div>
                    <div className="sm:mt-5">
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-muted">
                        {s.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Seller CTA */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-6 rounded-xl2 bg-navy-950 p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h3 className="font-display text-2xl font-semibold">
                Thinking of selling?
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/65">
                Get a free, no-pressure home valuation based on what&apos;s
                actually selling in your neighborhood right now.
              </p>
            </div>
            <a href="#contact" className="btn-gold shrink-0">
              Request a home valuation
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
