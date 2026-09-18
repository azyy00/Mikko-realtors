import type { Metadata } from "next";
import Link from "next/link";
import { CaretRight, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cost of Living in Las Vegas | Mikko Lucernas",
  description:
    "What does it cost to live in Las Vegas? A plain breakdown of taxes, housing, and everyday costs for people relocating to Nevada, from REALTOR® Mikko Lucernas.",
};

const stats = [
  { value: "0%", label: "State income tax" },
  { value: "8.375%", label: "Clark County sales tax" },
  { value: "300+", label: "Sunny days a year" },
  { value: "No", label: "Estate or inheritance tax" },
];

const sections = [
  {
    heading: "Taxes: where Nevada wins",
    body: "Nevada has no state income tax, no estate tax, and no inheritance tax. For anyone moving from a high-tax state like California, that difference alone can be worth thousands of dollars a year that stay in your pocket instead of going to the state.",
  },
  {
    heading: "Housing: more home for the money",
    body: "Home prices in Las Vegas are generally well below coastal California, and there's a lot of newer construction. Buyers relocating here routinely get a bigger, newer home, often with a yard and a garage, for what a smaller place would cost back home.",
  },
  {
    heading: "Everyday costs",
    body: "Groceries, dining, and services sit around the national average, and gas is typically cheaper than California. Utilities run higher in the summer months because of air conditioning, so it's worth budgeting for the July and August bills.",
  },
];

export default function CostOfLiving() {
  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="relative flex min-h-[52vh] items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://picsum.photos/seed/vegas-cost-living/1800/1000)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/45" />
          <div className="container-x relative pb-14 pt-32 text-white">
            <nav className="flex items-center gap-1.5 text-xs text-white/70">
              <Link href="/" className="hover:text-gold-300">
                Home
              </Link>
              <CaretRight size={12} />
              <span>Relocation</span>
              <CaretRight size={12} />
              <span className="text-white">Cost of Living</span>
            </nav>
            <h1 className="display mt-4 max-w-2xl text-5xl sm:text-6xl">
              Cost of living in Las Vegas
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              What it really costs to live here, in plain numbers, so you can
              plan your move with no surprises.
            </p>
          </div>
        </section>

        {/* Stat strip */}
        <section className="bg-navy-950 py-12 text-white">
          <div className="container-x grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="tnum num-gold font-display text-4xl font-semibold sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Breakdown */}
        <section className="bg-paper py-16">
          <div className="container-x max-w-3xl">
            {sections.map((s, i) => (
              <Reveal key={i} className="mb-10">
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {s.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-navy-800">
                  {s.body}
                </p>
              </Reveal>
            ))}
            <p className="mt-4 text-xs text-muted">
              Figures are approximate and for general guidance. Tax rates and
              prices change, so check current numbers before you plan around them.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream py-16">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-6 rounded-xl2 bg-navy-950 p-8 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  Want the real numbers for your budget?
                </h2>
                <p className="mt-2 max-w-md text-sm text-white/65">
                  Tell me where you&apos;re coming from and what you spend now,
                  and I&apos;ll help you see what the same life costs in Las Vegas.
                </p>
              </div>
              <Link href="/#contact" className="btn-gold shrink-0">
                Talk to Mikko
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
