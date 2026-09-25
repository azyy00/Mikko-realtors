import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const destinations = [
  {
    name: "Tambayan sa Las Vegas",
    logo: "/Tambayan%20sa%20Las%20Vegas.png",
    logoWidth: 1640,
    logoHeight: 856,
    logoBackground: "bg-white",
    category: "Community group",
    description: "Visit the group on Facebook to explore conversations and membership details.",
    href: "https://www.facebook.com/share/g/1EnLoPA1EL/?mibextid=wwXIfr",
    action: "View Facebook group",
  },
  {
    name: "Tambayan BBQ",
    logo: "/Tambayan%20BBQ.png",
    logoWidth: 448,
    logoHeight: 298,
    logoBackground: "bg-black",
    category: "Restaurant",
    description: "Explore Tambayan BBQ on the restaurant’s own website.",
    href: "https://tambayanbbqlv.com/",
    action: "Visit restaurant website",
  },
];

export default function LocalConnections() {
  return (
    <section
      id="local-connections"
      aria-labelledby="local-connections-heading"
      className="border-b border-navy-900/10 bg-cream py-14 sm:py-16"
    >
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <h2
            id="local-connections-heading"
            className="display max-w-sm text-4xl text-navy-950 sm:text-5xl"
          >
            Community &amp; local spots
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
            There&apos;s more to settling in than finding a home. Connect with a
            community and discover a place to eat.
          </p>
          <p className="mt-4 text-sm text-muted">External links open in a new tab.</p>
        </div>

        <ul className="divide-y divide-navy-900/15 border-y border-navy-900/15">
          {destinations.map((destination) => (
            <li key={destination.href} className="grid gap-5 py-6 first:pt-5 last:pb-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
              <div className={`flex h-32 w-48 items-center justify-center self-start overflow-hidden rounded-xl ${destination.logoBackground}`}>
                <Image
                  src={destination.logo}
                  alt={`${destination.name} logo`}
                  width={destination.logoWidth}
                  height={destination.logoHeight}
                  sizes="192px"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="display text-2xl text-navy-950 sm:text-3xl">
                  {destination.name}
                </h3>
                <span className="text-sm text-muted">{destination.category}</span>
              </div>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                {destination.description}
              </p>
              <a
                href={destination.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-800 underline decoration-gold-500 underline-offset-4 transition-colors hover:text-gold-600 focus-visible:outline-gold-600"
              >
                {destination.action}
                <ArrowUpRight size={18} aria-hidden="true" className="shrink-0" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
