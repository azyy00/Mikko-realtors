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
    <section id="about" className="bg-paper py-14 sm:py-16">
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
          {/* Portrait */}
          <Reveal>
            <div className="mx-auto max-w-md lg:mx-0">
              <div className="overflow-hidden rounded-xl3 shadow-soft">
                <Image
                  src="/profile/mikko.png"
                  alt="Mikko Lucernas, Las Vegas REALTOR®"
                  width={1082}
                  height={1442}
                  sizes="(min-width: 1280px) 448px, (min-width: 1024px) 40vw, (min-width: 640px) 448px, 92vw"
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.1} className="min-w-0">
            <div className="max-w-xl">
              <h2 className="display border-b border-navy-900/15 pb-3 text-4xl text-ink sm:text-6xl">
                {agent.name}
              </h2>
              <div className="mt-2 space-y-1">
                <p className="text-base font-semibold leading-relaxed text-gold-600">
                  Pinoy | Army Veteran
                </p>
                <p className="text-base font-semibold text-ink">
                  Las Vegas REALTOR®
                </p>
                <p className="text-sm font-semibold leading-relaxed text-ink">
                  <span className="sr-only">License </span>S.197749
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  REAL Broker, LLC
                </p>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-base font-semibold leading-relaxed text-gold-600">
                  New Construction | Relocation
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  Military &amp; Veterans Specialist
                </p>
              </div>
            </div>

            <div className="mt-3 flex gap-3 text-muted">
              <Quotes size={24} weight="fill" aria-hidden="true" className="mt-1 shrink-0 text-gold-400" />
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
