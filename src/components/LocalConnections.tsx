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
    description: "This is a place where you can invite or join amazing people to drink, hangout, make friends, socialize and have fun with filipinos in Metro Las Vegas.",
    href: "https://www.facebook.com/share/g/1EnLoPA1EL/?mibextid=wwXIfr",
    action: "View Facebook group",
  },
  {
    name: "Tambayan sa Las Vegas Chat",
    logo: "/tambayan-sa-las-vegas-chat.png",
    logoWidth: 1254,
    logoHeight: 1254,
    logoBackground: "bg-white",
    category: "Messenger group chat",
    description: "Open the Tambayan sa Las Vegas Chat invitation on Messenger.",
    href: "https://m.me/cm/AbZm7_EaZJIdHh6O/?send_source=cm%3Acopy_invite_link",
    action: "Open Messenger chat",
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
      className="border-b border-navy-900/10 bg-white py-14 sm:py-16"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="local-connections-heading"
            className="display text-4xl text-navy-950 sm:text-5xl"
          >
            Community &amp; local spots
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            There&apos;s more to settling in than finding a home. Connect with a
            community and discover a place to eat.
          </p>
          <p className="mt-4 text-sm text-muted">External links open in a new tab.</p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-y-8 divide-y divide-navy-900/15 lg:mt-12 lg:grid-cols-3 lg:gap-x-10 lg:divide-y-0">
          {destinations.map((destination) => (
            <li key={destination.href} className="flex min-w-0 flex-col items-center pt-8 text-center first:pt-0 lg:pt-0">
              <div className={`flex h-32 w-48 shrink-0 items-center justify-center overflow-hidden rounded-xl ${destination.logoBackground}`}>
                <Image
                  src={destination.logo}
                  alt={`${destination.name} logo`}
                  width={destination.logoWidth}
                  height={destination.logoHeight}
                  sizes="192px"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-5 flex w-full min-w-0 flex-1 flex-col items-center">
                <h3 className="display text-2xl text-navy-950 sm:text-3xl">
                  {destination.name}
                </h3>
                <span className="mt-2 text-sm text-muted">{destination.category}</span>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {destination.description}
                </p>
                <div className="mt-auto pt-4">
                  <a
                    href={destination.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-800 underline decoration-gold-500 underline-offset-4 transition-colors hover:text-gold-600 focus-visible:outline-gold-600"
                  >
                    {destination.action}
                    <ArrowUpRight size={18} aria-hidden="true" className="shrink-0" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
