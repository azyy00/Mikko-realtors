import "server-only";
import { googleRating, reviews as savedReviews, type Review } from "@/lib/data";

// Live Google rating and reviews via the Places API (New), refreshed daily.
// Without GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID, or if Google fails, the
// site falls back to the reviews transcribed in data.ts.

export type GoogleReviews = {
  score: string;
  count: number;
  reviews: Review[];
  live: boolean;
};

type PlaceReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string; uri?: string };
};

type PlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlaceReview[];
};

const REFRESH_SECONDS = 60 * 60 * 24;

const fallback: GoogleReviews = {
  score: googleRating.score,
  count: googleRating.count,
  reviews: savedReviews,
  live: false,
};

const nameKey = (name: string) => name.toLowerCase().replace(/[^a-z]/g, "");

export async function getGoogleReviews(): Promise<GoogleReviews> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return fallback;

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      signal: AbortSignal.timeout(8_000),
      next: { revalidate: REFRESH_SECONDS, tags: ["google-reviews"] },
    });
    if (!response.ok) throw new Error(`Places API returned ${response.status}`);
    const place = (await response.json()) as PlaceDetails;

    // Google returns at most five reviews; show those first, then the saved
    // reviews Google didn't return, so the marquee stays full.
    const live: Review[] = (place.reviews ?? [])
      .map((r) => ({
        name: r.authorAttribution?.displayName?.trim() ?? "",
        role: r.relativePublishTimeDescription ? `Google review · ${r.relativePublishTimeDescription}` : "Google review",
        text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        rating: r.rating,
        url: r.authorAttribution?.uri,
      }))
      .filter((r) => r.name && r.text);
    const seen = new Set(live.map((r) => nameKey(r.name)));
    const merged = [...live, ...savedReviews.filter((r) => !seen.has(nameKey(r.name)))];

    return {
      score: typeof place.rating === "number" ? place.rating.toFixed(1) : fallback.score,
      count: typeof place.userRatingCount === "number" ? place.userRatingCount : fallback.count,
      reviews: merged,
      live: true,
    };
  } catch (error) {
    console.error("Google reviews fetch failed; using saved reviews", error);
    return fallback;
  }
}
