"use client";

import Link from "next/link";
import { SealCheck, ArrowRight } from "@phosphor-icons/react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { soldPhotos } from "@/lib/sold";

const slides = soldPhotos.map((src, i) => ({
  id: src,
  imageSrc: src,
  alt: `Just sold in Las Vegas with Mikko Lucernas, closing ${i + 1} of ${soldPhotos.length}`,
}));

export default function JustSold() {
  return (
    <section id="sold" aria-labelledby="sold-heading" className="bg-white py-20 text-ink sm:py-24">
      <div className="container-x">
        <TestimonialSlider
          slides={slides}
          label="Just sold"
          action={
            <Link href="/sold" className="btn-gold">
              View All Closings
              <ArrowRight size={16} weight="bold" />
            </Link>
          }
        >
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-600">
            <SealCheck size={18} weight="fill" className="text-sage-500" />
            Just Sold
          </p>
          <h2 id="sold-heading" className="display mt-3 text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
            Real families. Real keys handed over.
          </h2>
          <p className="mt-5 max-w-[46ch] text-pretty text-muted sm:text-lg">
            These aren&apos;t stock photos. Every one is an actual Las Vegas
            family Mikko helped close, new-construction homes, VA and FHA
            buyers, first-time buyers, and California relocations.
          </p>
        </TestimonialSlider>
      </div>
    </section>
  );
}
