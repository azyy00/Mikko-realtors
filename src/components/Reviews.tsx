import { Star, GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { reviews, googleRating } from "@/lib/data";
import TestimonialMarquee from "./ui/marquee-01";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-cream py-24">
      <div className="container-x">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <h2 className="display text-4xl text-ink sm:text-5xl">
            What clients say
          </h2>
          <div className="mt-5 flex items-center gap-3">
            <span className="tnum font-display text-4xl font-semibold text-ink">
              {googleRating.score}
            </span>
            <div className="flex text-gold-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} weight="fill" />
              ))}
            </div>
          </div>
          <p className="mt-2 text-muted">
            Based on {googleRating.count} verified Google reviews
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={googleRating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-gold-400 hover:text-gold-600"
            >
              <GoogleLogo size={18} weight="bold" />
              Read reviews on Google
            </a>
            <a
              href={googleRating.writeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <Star size={16} weight="fill" />
              Leave a review
            </a>
          </div>
        </Reveal>

        <TestimonialMarquee reviews={reviews} />
      </div>
    </section>
  );
}
