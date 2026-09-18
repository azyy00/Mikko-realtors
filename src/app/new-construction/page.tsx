import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "New Construction Homes in Las Vegas | Mikko Lucernas",
  description:
    "Browse new construction communities across Las Vegas, Henderson, and North Las Vegas. Builder incentives, NextGen and single-story homes, quick move-ins, and VA-friendly options with REALTOR® Mikko Lucernas.",
};

const filters = [
  "Under $500K",
  "$500K to $700K",
  "$700K+",
  "NextGen Homes",
  "Single-Story",
  "Quick Move-In",
  "VA-Friendly",
];

const communities = [
  {
    name: "Hinson Hills",
    builder: "Lennar",
    area: "Southwest Las Vegas",
    price: "From the mid $500s",
    note: "Corner lots, ground-up builds, strong builder incentives.",
    seed: "nc-hinson-hills",
  },
  {
    name: "Symmetry Bay at Cadence",
    builder: "Cadence Masterplan",
    area: "Henderson, NV",
    price: "From the $500s",
    note: "NextGen options, community pool and parks, VA-friendly.",
    seed: "nc-symmetry-bay",
  },
  {
    name: "Paldona",
    builder: "Pulte Homes",
    area: "Spring Valley, Las Vegas",
    price: "From the $500s",
    note: "Near Costco, IKEA, and the 215. Rate buydown incentives.",
    seed: "nc-paldona",
  },
  {
    name: "Alia Pointe at Sunstone",
    builder: "Sunstone Masterplan",
    area: "Northwest Las Vegas",
    price: "From the $400s",
    note: "New masterplan with amenities and quick move-in homes.",
    seed: "nc-alia-pointe",
  },
  {
    name: "Villages at Tule Springs",
    builder: "Multiple builders",
    area: "North Las Vegas",
    price: "From the $400s",
    note: "Gated masterplans, best value new construction up north.",
    seed: "nc-tule-springs",
  },
  {
    name: "Skye Canyon",
    builder: "Multiple builders",
    area: "Northwest Las Vegas",
    price: "From the mid $400s",
    note: "Outdoor lifestyle masterplan near Kyle Canyon.",
    seed: "nc-skye-canyon",
  },
];

export default function NewConstructionHub() {
  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-cream pb-8 pt-28">
          <div className="container-x">
            <h1 className="display text-4xl text-ink sm:text-5xl">
              New construction homes in Las Vegas
            </h1>
            <p className="subhead mt-4 max-w-2xl">
              Explore builder communities across the valley. As your agent, I
              negotiate incentives and represent you at no cost to you, so more
              of the builder&apos;s value lands in your pocket.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {filters.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-navy-900/12 bg-white px-4 py-2 text-sm text-navy-800"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper py-14">
          <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl2 border border-navy-900/10 bg-paper shadow-soft">
                  <div className="relative h-44 overflow-hidden">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://picsum.photos/seed/${c.seed}/800/500)`,
                      }}
                    />
                    <span className="absolute bottom-3 left-4 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-medium text-gold-200 backdrop-blur">
                      {c.price}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-xl font-semibold text-ink">
                      {c.name}
                    </h2>
                    <p className="text-xs text-muted">
                      {c.builder} · {c.area}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {c.note}
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      <Link
                        href="/buy"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-gold-600"
                      >
                        View available homes
                        <ArrowRight size={15} />
                      </Link>
                      <Link
                        href="/#contact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-gold-600"
                      >
                        <CalendarBlank size={15} weight="fill" />
                        Schedule a builder tour
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="container-x mt-10">
            <p className="rounded-xl2 border border-navy-900/10 bg-cream p-5 text-xs leading-relaxed text-muted">
              <strong className="text-navy-800">Last verified: September 2026.</strong>{" "}
              Pricing, interest rates, builder incentives, availability, and
              qualification requirements change frequently and are not
              guaranteed. Contact Mikko for current details on any community.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
