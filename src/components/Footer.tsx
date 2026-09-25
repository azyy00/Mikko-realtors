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
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div>
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
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm">
              Modern Las Vegas real estate. New construction, relocation, and
              local expertise you can actually reach.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
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
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
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

        <div className="mt-14 hairline opacity-60" />

        <div className="mt-6 flex flex-col gap-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {agent.name}. {agent.license} ·{" "}
            {agent.brokerage}.
          </p>
          <p className="max-w-md sm:text-right">
            Equal Housing Opportunity · Listing data for demonstration only.
          </p>
        </div>
      </div>
    </footer>
  );
}
