"use client";

import { Star } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-01-utils/marquee";
import type { Review } from "@/lib/data";

function ReviewCard({ name, role, text, rating = 5, url }: Review) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <Card role="listitem" className="w-64 shrink-0 p-4 shadow-none sm:w-80 sm:p-5">
      <CardContent className="flex h-full flex-col gap-3 p-0 sm:gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-950 text-xs font-semibold text-gold-200"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-gold-600">
                  {name}
                </a>
              ) : (
                name
              )}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
        <div className="flex gap-0.5 text-gold-500">
          <span className="sr-only">{rating} out of 5 stars</span>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={14} weight={index < Math.round(rating) ? "fill" : "regular"} aria-hidden="true" />
          ))}
        </div>
        <blockquote className="line-clamp-6 text-sm leading-relaxed text-navy-800 sm:line-clamp-none">
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
  const split = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, split), reviews.slice(split)].filter(
    (row) => row.length > 0,
  );
  if (rows.length === 0) return null;

  return (
    <div className="mt-6 sm:mt-8">
      <div
        id="review-marquee-rows"
        className="review-marquee-rows relative flex w-full flex-col gap-2"
      >
        {rows.map((row, index) => (
          <Marquee
            key={index}
            reverse={index === 1}
            pauseOnHover
            aria-label={`Client reviews, row ${index + 1}. Focus to browse with the arrow keys.`}
          >
            {row.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  );
}
