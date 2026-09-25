import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  CaretRight,
  ArrowRight,
  MapPin,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { communities, getCommunity } from "@/lib/data";
import type { Community } from "@/lib/data";

export function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) return {};
  const title = `${c.name} Homes for Sale | Mikko Lucernas`;
  const description = `${c.intro} Search ${c.name} homes and new construction with Las Vegas REALTOR® Mikko Lucernas.`;
  return { title, description, openGraph: { title, description } };
}

function communityImage(community: Community) {
  return community.image ?? `https://picsum.photos/seed/${community.seed}/1800/1000`;
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) notFound();
  const others = communities.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        {/* Image hero */}
        <section className="relative flex min-h-[62vh] items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${communityImage(c)})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
          <div className="container-x relative pb-14 pt-32 text-white">
            <nav className="flex items-center gap-1.5 text-xs text-white/70">
              <Link href="/" className="hover:text-gold-300">
                Home
              </Link>
              <CaretRight size={12} />
              <span>Communities</span>
              <CaretRight size={12} />
              <span className="text-white">{c.name}</span>
            </nav>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-300">
              <MapPin size={16} weight="fill" /> Las Vegas Valley
            </p>
            <h1 className="display mt-2 text-5xl sm:text-6xl">{c.name}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">{c.blurb}</p>
            <span className="mt-5 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-gold-200 backdrop-blur">
              {c.priceNote}
            </span>
          </div>
        </section>

        {/* Body */}
        <section className="bg-paper py-16">
          <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Living in {c.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-navy-800">
                {c.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/buy" className="btn-gold">
                  Search {c.name} homes
                  <ArrowRight size={16} weight="bold" />
                </Link>
                <Link href="/#contact" className="btn-ghost">
                  Ask Mikko about {c.name}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-xl2 border border-navy-900/10 bg-cream p-8">
                <h3 className="font-display text-lg font-semibold text-ink">
                  Why buyers love it
                </h3>
                <ul className="mt-5 space-y-4">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-navy-800">
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="mt-0.5 shrink-0 text-sage-500"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Other communities */}
        <section className="bg-cream py-16">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Explore other communities
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/communities/${o.slug}`}
                  className="group relative h-52 overflow-hidden rounded-xl2"
                >
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${communityImage(o)})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {o.name}
                      </h3>
                      <p className="text-xs text-white/75">{o.blurb}</p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
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
