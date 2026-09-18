"use client";

import { useState } from "react";
import { Pause, Play, Star } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-01-utils/marquee";
import type { Review } from "@/lib/data";

function ReviewCard({ name, role, text }: Review) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <Card role="listitem" className="w-72 shrink-0 p-5 shadow-none sm:w-80">
      <CardContent className="flex h-full flex-col gap-4 p-0">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-950 text-xs font-semibold text-gold-200"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
        <div aria-hidden="true" className="flex gap-0.5 text-gold-500">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={14} weight="fill" />
          ))}
        </div>
        <blockquote className="text-sm leading-relaxed text-navy-800">
          {text}
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function TestimonialMarquee({
  reviews,
}: {
  reviews: readonly Review[];
}) {
  const [paused, setPaused] = useState(false);
  const split = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, split), reviews.slice(split)].filter(
    (row) => row.length > 0,
  );
  if (rows.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="mb-4 flex justify-center">
        <button
          type="button"
          aria-pressed={paused}
          aria-controls="review-marquee-rows"
          onClick={() => setPaused((value) => !value)}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-800 underline underline-offset-4 motion-reduce:hidden"
        >
          {paused ? (
            <Play size={14} aria-hidden="true" />
          ) : (
            <Pause size={14} aria-hidden="true" />
          )}
          {paused ? "Resume reviews" : "Pause reviews"}
        </button>
      </div>
      <div
        id="review-marquee-rows"
        className="review-marquee-rows relative flex w-full flex-col gap-2"
      >
        {rows.map((row, index) => (
          <Marquee
            key={index}
            reverse={index === 1}
            pauseOnHover
            paused={paused}
            aria-label={`Client reviews, row ${index + 1}. Focus to browse with the arrow keys.`}
          >
            {row.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
        ))}
        <div
          aria-hidden="true"
          className="review-marquee-fade pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-cream to-transparent sm:w-14"
        />
        <div
          aria-hidden="true"
          className="review-marquee-fade pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-cream to-transparent sm:w-14"
        />
      </div>
    </div>
  );
}
