import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  CaretRight,
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { guides, getGuide } from "@/lib/guides";

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

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="bg-cream pb-12 pt-28">
          <div className="container-x max-w-3xl">
            <nav className="flex items-center gap-1.5 text-xs text-muted">
              <Link href="/" className="hover:text-gold-600">
                Home
              </Link>
              <CaretRight size={12} />
              <span className="text-navy-700">Guides</span>
              <CaretRight size={12} />
              <span className="text-navy-900">{guide.audience}</span>
            </nav>
            <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {guide.intro}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="bg-paper py-16">
          <div className="container-x max-w-3xl">
            {guide.sections.map((s, i) => (
              <Reveal key={i} className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {s.heading}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-4 leading-relaxed text-navy-800">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-5 space-y-3">
                    {s.bullets.map((b, k) => (
                      <li key={k} className="flex items-start gap-3 text-navy-800">
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-sage-500"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}

            {/* FAQ */}
            {guide.faqs.length > 0 && (
              <Reveal className="mt-4 border-t border-navy-900/10 pt-10">
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Common questions
                </h2>
                <FaqAccordion faqs={guide.faqs} />
              </Reveal>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-paper pb-16">
          <div className="container-x max-w-3xl">
            <div className="flex flex-col items-start justify-between gap-6 rounded-xl2 bg-navy-950 p-8 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  Ready to get started?
                </h2>
                <p className="mt-2 max-w-md text-sm text-white/65">
                  Tell me a little about your plans and I&apos;ll follow up
                  personally, no pressure.
                </p>
              </div>
              <Link href="/#contact" className="btn-gold shrink-0">
                Talk to Mikko
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related guides */}
        <section className="bg-cream py-16">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold text-ink">
              More guides
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group flex items-start justify-between gap-3 rounded-xl2 border border-navy-900/10 bg-paper p-6 transition-colors hover:border-gold-400/60"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                      {g.audience}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                      {g.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-navy-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
