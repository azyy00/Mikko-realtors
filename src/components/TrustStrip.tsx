import {
  AirplaneTilt,
  HouseLine,
  MapPin,
  Medal,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { googleRating } from "@/lib/data";

const credentials = [
  { icon: MapPin, label: "Trusted Local Expert" },
  { icon: HouseLine, label: "New Construction Specialist" },
  { icon: Medal, label: "VA & Military Friendly" },
  { icon: AirplaneTilt, label: "Relocation Specialist" },
];

/** Early proof that sits directly under the hero. */
export default function TrustStrip() {
  return (
    <section aria-label="Client rating and credentials" className="border-y border-navy-900/10 bg-cream py-6">
      <div className="container-x flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/#reviews"
          className="group flex flex-wrap items-center gap-x-3 gap-y-1 text-ink"
        >
          <span className="tnum font-display text-3xl font-semibold">{googleRating.score}</span>
          <span className="flex text-gold-400" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} weight="fill" />
            ))}
          </span>
          <span className="text-sm text-muted group-hover:text-gold-600">
            {googleRating.count} Google reviews from Las Vegas clients
          </span>
        </Link>

        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy-800">
          {credentials.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon size={18} className="text-gold-600" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
