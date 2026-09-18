import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { agent } from "@/lib/data";

const specialties = [
  "New Construction",
  "Relocation",
  "VA & Military",
  "First-Time Buyers",
  "Filipino Community",
  "Luxury & Summerlin",
];

export default function About() {
  return (
    <section id="about" className="bg-paper py-24">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Portrait */}
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-3 -z-10 rounded-xl3 bg-gradient-to-br from-gold-400/30 to-navy-900/10" />
              <div className="absolute -bottom-4 -right-4 -z-10 h-40 w-40 rounded-xl2 border border-gold-400/40" />
              <div className="overflow-hidden rounded-xl3 border border-navy-900/10 shadow-soft">
                <Image
                  src="/profile/mikko.png"
                  alt="Mikko Lucernas, Las Vegas REALTOR®"
                  width={1082}
                  height={1442}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.1}>
            <h2 className="display text-4xl text-ink sm:text-5xl">
              {agent.name}
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-gold-600">
              {agent.focus}
            </p>

            <div className="mt-6 flex gap-3 text-muted">
              <Quotes size={28} weight="fill" className="shrink-0 text-gold-400" />
              <p className="text-lg leading-relaxed">
                My job isn&apos;t to sell you a house, it&apos;s to make sure the
                one you buy is the right one. I grew up around hard-working
                families, served the community, and now I help people plant roots
                in Las Vegas with clear advice and zero pressure.
              </p>
            </div>

            <p className="mt-5 max-w-xl text-muted">
              I specialize in new construction and relocation, and I&apos;m proud
              to serve fellow veterans and the Filipino community across the
              valley. Whether you&apos;re moving from California or buying your
              first home, you&apos;ll always know exactly what the next step is.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-navy-900/15 bg-cream px-4 py-1.5 text-sm text-navy-800"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn-gold">
                Work with Mikko
              </a>
              <span className="text-sm text-muted">
                {agent.license} · {agent.brokerage}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
