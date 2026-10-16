import Link from "next/link";
import { SealCheck, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SoldMarquee from "@/components/SoldMarquee";
import { soldPhotos } from "@/lib/sold";

export default function JustSold() {
  return (
    <section id="sold" aria-labelledby="sold-heading" className="bg-white py-20 text-ink sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-5xl text-center">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-600">
            <SealCheck size={18} weight="fill" className="text-sage-500" />
            Just Sold
          </p>
          <h2 id="sold-heading" className="display mt-3 text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
            Real families. Real keys handed over.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-muted sm:text-lg">
            These aren&apos;t stock photos. Every one is an actual Las Vegas
            family Mikko helped close, new-construction homes, VA and FHA
            buyers, first-time buyers, and California relocations.
          </p>
        </div>
      </div>

      <SoldMarquee className="mt-10" />

      <div className="container-x mt-8 flex justify-center">
        <Link href="/sold" className="btn-gold">
          View All Closings ({soldPhotos.length})
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </section>
  );
}
