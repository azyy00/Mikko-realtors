import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CaretRight,
  Check,
  DownloadSimple,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import GuideDownload from "@/components/GuideDownload";
import { agent } from "@/lib/data";
import { guides, getGuide, getDownloadForSlug } from "@/lib/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: { title: guide.metaTitle, description: guide.metaDescription },
  };
}

const anchor = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const download = getDownloadForSlug(guide.slug);
  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const contents = [
    ...guide.sections.map((s) => ({ id: anchor(s.heading), label: s.heading })),
    ...(guide.faqs.length ? [{ id: "common-questions", label: "Common questions" }] : []),
  ];

  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        {/* Header: the promise of the guide and the two ways to act on it. */}
        <header className="border-b border-navy-900/10 bg-paper pb-12 pt-28 sm:pb-16 sm:pt-36">
          <div className="container-x">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
              <Link href="/" className="hover:text-gold-600">Home</Link>
              <CaretRight size={12} aria-hidden="true" />
              <Link href="/guides" className="hover:text-gold-600">Guides</Link>
              <CaretRight size={12} aria-hidden="true" />
              <span aria-current="page" className="text-navy-900">{guide.audience}</span>
            </nav>

            <h1 className="display mt-6 max-w-5xl text-balance text-[clamp(2.6rem,6.4vw,5.75rem)] leading-[0.98] text-ink">
              {guide.title}
            </h1>
            <p className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {guide.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/#contact" className="btn-gold px-6 sm:px-7">
                Talk to Mikko
                <ArrowRight size={16} weight="bold" />
              </Link>
              {download && (
                <GuideDownload file={download.file} title={download.title} className="btn-ghost">
                  <DownloadSimple size={16} weight="bold" />
                  Get the PDF guide
                </GuideDownload>
              )}
            </div>
          </div>
        </header>

        {/* Body: sticky contents rail beside a comfortable reading column. */}
        <div className="container-x grid gap-12 py-14 sm:py-20 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden lg:block">
            <nav aria-label="In this guide" className="sticky top-32">
              <p className="text-sm font-semibold text-ink">In this guide</p>
              <ul className="mt-4 space-y-1 border-l border-navy-900/10">
                {contents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-muted transition-colors hover:border-gold-400 hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="max-w-[68ch]">
            {guide.sections.map((s, i) => (
              <section
                key={s.heading}
                id={anchor(s.heading)}
                className={`scroll-mt-28 ${i > 0 ? "mt-14 border-t border-navy-900/10 pt-14" : ""}`}
              >
                <h2 className="display text-balance text-3xl text-ink sm:text-4xl">{s.heading}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-5 text-[17px] leading-[1.75] text-navy-800">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-7 space-y-3.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3.5 text-[17px] leading-relaxed text-navy-800">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-400 text-navy-950">
                          <Check size={12} weight="bold" aria-hidden="true" />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {guide.faqs.length > 0 && (
              <section
                id="common-questions"
                className="mt-14 scroll-mt-28 border-t border-navy-900/10 pt-14"
              >
                <h2 className="display text-3xl text-ink sm:text-4xl">Common questions</h2>
                <FaqAccordion faqs={guide.faqs} />
              </section>
            )}
          </article>
        </div>

        {/* Call to action */}
        <section className="pb-16 sm:pb-20">
          <div className="container-x">
            <div className="grid gap-8 rounded-xl3 bg-navy-950 px-6 py-10 text-white sm:px-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h2 className="display text-balance text-4xl sm:text-5xl lg:text-6xl">
                  Ready to get started?
                </h2>
                <p className="mt-4 max-w-[46ch] text-white/70 sm:text-lg">
                  Tell me a little about your plans and I&apos;ll follow up
                  personally, no pressure.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/#contact" className="btn-gold px-6 sm:px-7">
                  Talk to Mikko
                  <ArrowRight size={16} weight="bold" />
                </Link>
                <a href={agent.phoneHref} className="btn-ghost-light">
                  <Phone size={16} weight="fill" />
                  {agent.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related guides, set as the same text links as the homepage. */}
        <section aria-labelledby="more-guides" className="border-t border-navy-900/10 py-14 sm:py-20">
          <div className="container-x">
            <h2 id="more-guides" className="display text-3xl text-ink sm:text-4xl">More guides</h2>
            <ul className="mt-6 grid sm:grid-cols-3 sm:gap-x-8">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="goal-link group flex min-h-20 items-center justify-between gap-4 border-b border-navy-900/10 py-5"
                  >
                    <span className="block">
                      <span className="block text-sm text-muted">{g.audience}</span>
                      <span className="goal-label mt-1 inline-block font-display text-xl font-medium leading-tight text-ink sm:text-2xl">
                        {g.title}
                      </span>
                    </span>
                    <ArrowUpRight size={20} weight="bold" aria-hidden="true" className="shrink-0 text-gold-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
