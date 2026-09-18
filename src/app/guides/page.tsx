import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  DownloadSimple,
  FilePdf,
} from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { guides, downloadGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Free Las Vegas Real Estate Guides & Checklists | Mikko Lucernas",
  description:
    "Download free Las Vegas real estate guides and checklists: VA loans, first-time buyers, closing costs, and more, from REALTOR® Mikko Lucernas.",
};

export default function GuidesIndex() {
  const [featured, ...rest] = downloadGuides;

  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-cream pb-10 pt-28">
          <div className="container-x">
            <h1 className="display text-4xl text-ink sm:text-5xl">
              Free guides &amp; checklists
            </h1>
            <p className="subhead mt-4 max-w-2xl">
              Mikko&apos;s own guides for buying, selling, and moving in Las
              Vegas. Free to download, no jargon, no pressure.
            </p>
          </div>
        </section>

        {/* Downloadable PDFs */}
        <section className="bg-paper py-14">
          <div className="container-x grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-stretch">
            {/* Featured download */}
            <Reveal>
              <a
                href={featured.file}
                download
                className="group flex h-full flex-col justify-between overflow-hidden rounded-xl3 bg-navy-950 p-8 text-white transition-transform duration-200 hover:-translate-y-0.5 sm:p-10"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-400/15 text-gold-300">
                      <FilePdf size={26} weight="fill" />
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-200">
                      {featured.tag}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-md leading-relaxed text-white/70">
                    {featured.blurb}
                  </p>
                </div>
                <span className="btn-gold mt-8 self-start">
                  <DownloadSimple size={16} weight="bold" />
                  Download PDF
                  <span className="tnum text-navy-950/70">· {featured.size}</span>
                </span>
              </a>
            </Reveal>

            {/* Rest */}
            <div className="grid gap-5 sm:grid-cols-2">
              {rest.map((g, i) => (
                <Reveal key={g.file} delay={i * 0.05}>
                  <a
                    href={g.file}
                    download
                    className="group flex h-full flex-col justify-between rounded-xl2 border border-navy-900/10 bg-cream p-6 transition-colors hover:border-gold-400/60"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-gold-500 shadow-soft">
                          <FilePdf size={20} weight="fill" />
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-600">
                          {g.tag}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                        {g.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {g.blurb}
                      </p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 group-hover:text-gold-600">
                      <DownloadSimple size={15} weight="bold" />
                      Download · {g.size}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Read online */}
        <section className="bg-cream py-16">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Read the guides online
            </h2>
            <p className="mt-2 text-muted">
              Prefer to read on the site? Here&apos;s the full library.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {guides.map((g, i) => (
                <Reveal key={g.slug} delay={i * 0.05}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="group flex h-full flex-col justify-between rounded-xl2 border border-navy-900/10 bg-paper p-8 transition-colors hover:border-gold-400/60"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                        {g.audience}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                        {g.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted">{g.intro}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 group-hover:text-gold-600">
                      Read the guide
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
