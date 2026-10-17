import { Star, GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { googleRating } from "@/lib/data";
import { getGoogleReviews } from "@/lib/google-reviews";
import TestimonialMarquee from "./ui/marquee-01";

export default async function Reviews() {
  const { score, count, reviews } = await getGoogleReviews();
  return (
    <section id="reviews" className="bg-cream py-14 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <h2 className="display text-3xl text-ink sm:text-5xl">
            What my clients say
          </h2>
          <div className="mt-3 flex items-center gap-3 sm:mt-5">
            <span className="tnum font-display text-3xl font-semibold text-ink sm:text-4xl">
              {score}
            </span>
            <div className="flex text-gold-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} weight="fill" />
              ))}
            </div>
          </div>
          <p className="mt-1 text-sm text-muted sm:mt-2 sm:text-base">
            Based on {count} verified Google reviews
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-3">
            <a
              href={googleRating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-4 py-3 text-sm font-semibold sm:px-5 text-navy-800 transition-colors hover:border-gold-400 hover:text-gold-600"
            >
              <GoogleLogo size={18} weight="bold" />
              Read <span className="hidden sm:inline">reviews </span>on Google
            </a>
            <a
              href={googleRating.writeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-4 sm:px-6"
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
