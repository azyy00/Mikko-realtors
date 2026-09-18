"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SealCheck, ArrowRight } from "@phosphor-icons/react";
import { soldPhotos } from "@/lib/sold";

const images = soldPhotos.map((src, i) => ({
  src,
  alt: `Just sold in Las Vegas with Mikko Lucernas (${i + 1})`,
}));

// Rightward drop shadow that gives the fanned deck its depth.
const cardShadow = `
  rgba(0, 0, 0, 0.02) 0.8px 0px 0.8px 0px,
  rgba(0, 0, 0, 0.06) 2.4px 0px 2.4px 0px,
  rgba(0, 0, 0, 0.14) 6.4px 0px 6.4px 0px,
  rgba(0, 0, 0, 0.35) 20px 0px 20px 0px
`;

const MAX_LIFT = 120;

export default function JustSold() {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section
      id="sold"
      className="relative overflow-hidden bg-navy-950 py-24 text-white"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-300">
            <SealCheck size={18} weight="fill" className="text-sage-300" />
            Just Sold
          </p>
          <h2 className="display mt-3 text-4xl text-white sm:text-5xl">
            Real families.
            <br />
            Real keys handed over.
          </h2>
          <p className="mt-5 max-w-lg text-white/70">
            These aren&apos;t stock photos. Every one is an actual Las Vegas
            family Mikko helped close, new-construction homes, VA and FHA
            buyers, first-time buyers, and California relocations.
          </p>
        </div>
      </div>

      {/* Desktop: 3D fanned deck of closings */}
      <div className="relative mt-8 hidden h-[480px] overflow-hidden md:block">
        <div className="flex -space-x-56 items-end justify-center pt-44 lg:-space-x-64">
          {images.map((image, index) => {
            const middle = Math.floor(images.length / 2);
            const distance = Math.abs(index - middle);
            const staggerOffset = MAX_LIFT - distance * 14;
            const isHovered = hovered === index;
            const isOtherHovered = hovered !== null && hovered !== index;
            const yOffset = isHovered
              ? -150
              : isOtherHovered
                ? 0
                : -staggerOffset;

            return (
              <motion.a
                href="/sold"
                aria-label={`View closing photo ${index + 1} in the gallery`}
                key={index}
                className="group flex-shrink-0 cursor-pointer"
                style={{ zIndex: isHovered ? 100 : images.length - index }}
                initial={false}
                animate={{
                  transform: `perspective(5000px) rotateY(-45deg) translateY(${reduce ? -staggerOffset : yOffset}px)`,
                }}
                transition={{
                  duration: reduce ? 0 : 0.2,
                  ease: [0.23, 1, 0.32, 1],
                }}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                onHoverStart={() => setHovered(index)}
                onHoverEnd={() => setHovered(null)}
              >
                <div
                  className="relative aspect-[4/3] w-72 overflow-hidden rounded-xl2 border border-white/10 transition-transform duration-300 motion-safe:group-hover:scale-[1.025] lg:w-80"
                  style={{ boxShadow: cardShadow }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Mobile: swipeable closings, no forced auto-scrolling. */}
      <div className="relative mt-10 overflow-x-auto md:hidden">
        <div className="flex w-max gap-4 px-4 pb-4">
          {images.map((image, i) => (
            <div key={i} className="w-60 shrink-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View the full gallery */}
      <div className="container-x relative mt-10 flex justify-center">
        <Link href="/sold" className="btn-gold">
          Browse the full gallery
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </section>
  );
}
