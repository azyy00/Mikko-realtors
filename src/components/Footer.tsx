import { agent, socials } from "@/lib/data";
import Link from "next/link";

const columns = [
  {
    title: "Buyers",
    links: [
      { label: "Search Homes", href: "/buy" },
      { label: "New Construction", href: "/new-construction" },
      { label: "First-Time Buyers", href: "/guides/first-time-buyers" },
      { label: "VA & Military", href: "/guides/va-loan" },
      { label: "Relocation", href: "/guides/relocation" },
    ],
  },
  {
    title: "Sellers",
    links: [
      { label: "What's My Home Worth?", href: "/home-valuation" },
      { label: "Selling Guide", href: "/guides/sellers" },
      { label: "Just Sold", href: "/#sold" },
    ],
  },
  {
    title: "Las Vegas",
    links: [
      { label: "Community & Local Spots", href: "/#local-connections" },
      { label: "Summerlin", href: "/communities/summerlin" },
      { label: "Henderson", href: "/communities/henderson" },
      { label: "Southwest", href: "/communities/southwest" },
      { label: "North Las Vegas", href: "/communities/north-las-vegas" },
      { label: "Tule Springs", href: "/communities/tule-springs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Mikko's Blog", href: "/blog" },
      { label: "Mortgage Calculator", href: "/resources/mortgage-calculator" },
      { label: "VA Loan Calculator", href: "/resources/va-loan-calculator" },
      { label: "Guides", href: "/guides" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-x pb-24 pt-10 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-1 sm:gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/#top"
              className="inline-flex text-white"
              aria-label={agent.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt={agent.name}
                width={412}
                height={236}
                className="h-11 w-auto sm:h-14"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm sm:mt-4">
              Modern Las Vegas real estate. New construction, relocation, and
              local expertise you can actually reach.
            </p>
            <div className="mt-4 flex gap-3 sm:mt-6">
              {socials.filter((s) => s.href).map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt=""
                    aria-hidden
                    className="h-[18px] w-[18px] object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white sm:text-sm">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2 text-sm sm:mt-4 sm:space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 hairline opacity-60 sm:mt-14" />

        <div className="mt-5 flex flex-col gap-2 text-xs sm:mt-6 sm:gap-4 text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {agent.name}. {agent.license} ·{" "}
            {agent.brokerage}.
          </p>
          <p className="max-w-md sm:text-right">
            Equal Housing Opportunity · MLS listing information is deemed reliable but not guaranteed and should be independently verified.
          </p>
        </div>
      </div>
    </footer>
  );
}
