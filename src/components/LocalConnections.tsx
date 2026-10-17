import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const destinations = [
  {
    name: "Tambayan sa Las Vegas",
    logo: "/community/tambayan-group.png",
    category: "Community group",
    description: "This is a place where you can invite or join amazing people to drink, hangout, make friends, socialize and have fun with filipinos in Metro Las Vegas.",
    href: "https://www.facebook.com/share/g/1EnLoPA1EL/?mibextid=wwXIfr",
    action: "View Facebook group",
  },
  {
    name: "Tambayan sa Las Vegas Chat",
    logo: "/community/tambayan-chat.png",
    category: "Messenger group chat",
    description: "Open the Tambayan sa Las Vegas Chat invitation on Messenger.",
    href: "https://m.me/cm/AbZm7_EaZJIdHh6O/?send_source=cm%3Acopy_invite_link",
    action: "Open Messenger chat",
  },
  {
    name: "Tambayan BBQ",
    logo: "/community/tambayan-bbq.png",
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
      className="border-b border-navy-900/10 bg-white py-10 sm:py-16"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="local-connections-heading"
            className="display text-3xl text-navy-950 sm:text-5xl"
          >
            Community &amp; local spots
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
            There&apos;s more to settling in than finding a home. Connect with a
            community and discover a place to eat.
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-y-5 divide-y sm:mt-10 sm:gap-y-8 divide-navy-900/15 lg:mt-12 lg:grid-cols-3 lg:gap-x-10 lg:divide-y-0">
          {destinations.map((destination) => (
            <li key={destination.href} className="flex min-w-0 items-start gap-4 pt-5 text-left first:pt-0 sm:flex-col sm:items-center sm:gap-0 sm:pt-8 sm:text-center lg:pt-0">
              {/* Every logo is a same-size circle cropped to its badge, so they line up. */}
              <Image
                src={destination.logo}
                alt={`${destination.name} logo`}
                width={512}
                height={512}
                sizes="(min-width: 640px) 128px, 64px"
                className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-32 sm:w-32"
              />
              <div className="flex min-w-0 flex-1 flex-col items-start sm:mt-5 sm:w-full sm:items-center">
                <h3 className="display text-xl text-navy-950 sm:text-3xl">
                  {destination.name}
                </h3>
                <span className="mt-0.5 text-xs text-muted sm:mt-2 sm:text-sm">{destination.category}</span>
                <p className="mt-1.5 line-clamp-2 max-w-md text-sm leading-relaxed text-muted sm:mt-3 sm:line-clamp-none">
                  {destination.description}
                </p>
                <div className="mt-auto sm:pt-4">
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
