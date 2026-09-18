import type { Metadata } from "next";
import Link from "next/link";
import {
  CaretRight,
  ArrowRight,
  CurrencyDollar,
  House,
  Sun,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "California vs Las Vegas: Which Is Better for You? | Mikko Lucernas",
  description:
    "Thinking about leaving California for Las Vegas? Compare taxes, housing, commutes, and cost of living side by side, with relocation REALTOR® Mikko Lucernas.",
};

const rows = [
  { label: "Taxes", ca: "State income tax up to 13.3%", lv: "No state income tax" },
  { label: "Housing", ca: "Higher prices in many markets", lv: "More home for your budget" },
  { label: "Commute", ca: "Longer average commutes", lv: "Generally shorter commutes" },
  { label: "New homes", ca: "Limited new construction", lv: "Many master-planned communities" },
  { label: "Lifestyle", ca: "Beaches and coastline", lv: "Mountains, hiking, golf, desert" },
  { label: "Cost of living", ca: "Higher in many areas", lv: "Often lower overall" },
];

const benefits = [
  { icon: CurrencyDollar, title: "Lower tax burden", copy: "No state income tax means more of your paycheck stays yours." },
  { icon: House, title: "More home for less", copy: "Newer homes and bigger lots for what a condo costs in California." },
  { icon: Sun, title: "300+ days of sun", copy: "Year-round sunshine and endless outdoor weekends." },
  { icon: UsersThree, title: "Growing community", copy: "A fast-growing valley with new masterplans and amenities." },
];

export default function CaliforniaVsLasVegas() {
  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        {/* Split hero */}
        <section className="relative flex min-h-[58vh] items-center overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2">
            <div
              className="bg-cover bg-center"
              style={{ backgroundImage: "url(https://picsum.photos/seed/california-coast/1200/1000)" }}
            />
            <div
              className="bg-cover bg-center"
              style={{ backgroundImage: "url(https://picsum.photos/seed/las-vegas-skyline/1200/1000)" }}
            />
          </div>
          <div className="absolute inset-0 bg-navy-950/72" />
          <div className="container-x relative pt-28 text-center text-white">
            <nav className="flex items-center justify-center gap-1.5 text-xs text-white/70">
              <Link href="/" className="hover:text-gold-300">
                Home
              </Link>
              <CaretRight size={12} />
              <span>Relocation</span>
              <CaretRight size={12} />
              <span className="text-white">California vs Las Vegas</span>
            </nav>
            <h1 className="display mx-auto mt-5 max-w-3xl text-balance text-5xl sm:text-6xl">
              California <span className="text-gold-300">vs</span> Las Vegas
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider2 text-white/70">
              Compare. Save. Live better.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-paper py-20">
          <div className="container-x max-w-4xl">
            <Reveal>
              <div className="overflow-hidden rounded-xl2 border border-navy-900/10">
                <div className="grid grid-cols-[1fr_1fr] bg-cream text-sm font-semibold uppercase tracking-wider">
                  <div className="p-4 text-center text-navy-700">California</div>
                  <div className="bg-navy-950 p-4 text-center text-gold-300">
                    Las Vegas
                  </div>
                </div>
                {rows.map((r, i) => (
                  <div
                    key={r.label}
                    className={`grid grid-cols-[1fr_1fr] ${
                      i % 2 ? "bg-paper" : "bg-cream/40"
                    }`}
                  >
                    <div className="border-t border-navy-900/10 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {r.label}
                      </p>
                      <p className="mt-1 text-sm text-navy-800">{r.ca}</p>
                    </div>
                    <div className="border-t border-navy-900/10 bg-navy-950/[0.03] p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-600">
                        {r.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink">{r.lv}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-cream py-16">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Why Californians are moving to Las Vegas
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Reveal key={b.title} delay={i * 0.06}>
                    <div className="flex items-start gap-4 sm:block">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-950 text-gold-300">
                        <Icon size={24} />
                      </div>
                      <div className="sm:mt-4">
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {b.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {b.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-paper py-16">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-6 rounded-xl2 bg-navy-950 p-8 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  Making the move from California?
                </h2>
                <p className="mt-2 max-w-md text-sm text-white/65">
                  I help California families relocate to Las Vegas every month,
                  most of them before they ever fly in. Let&apos;s map out yours.
                </p>
              </div>
              <Link href="/#contact" className="btn-gold shrink-0">
                Start your move
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
