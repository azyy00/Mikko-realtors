import "server-only";
import { googleRating, reviews as savedReviews, type Review } from "@/lib/data";

// Live Google rating and reviews via the Places API (New), refreshed daily.
// GOOGLE_PLACE_ID is optional: without it the listing is found by its Google
// business name. Without GOOGLE_PLACES_API_KEY, or if Google fails, the site
// falls back to the reviews transcribed in data.ts.

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
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type PlaceDetails = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: PlaceReview[];
};

const REFRESH_SECONDS = 60 * 60 * 24;
// Mikko's listing name exactly as it appears on Google.
const BUSINESS_NAME = "Mikko Lucernas - Pinoy Vegas Real Estate Agent";
const FIELDS = ["displayName", "rating", "userRatingCount", "reviews"];

const fallback: GoogleReviews = {
  score: googleRating.score,
  count: googleRating.count,
  reviews: savedReviews,
  live: false,
};

const nameKey = (name: string) => name.toLowerCase().replace(/[^a-z]/g, "");

export async function getGoogleReviews(): Promise<GoogleReviews> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return fallback;

  try {
    const place = await fetchPlace(key, process.env.GOOGLE_PLACE_ID);

    // Google returns at most five reviews; show those first, then the saved
    // reviews Google didn't return, so the marquee stays full.
    const live: Review[] = (place.reviews ?? [])
      .map((r) => ({
        name: r.authorAttribution?.displayName?.trim() ?? "",
        role: r.relativePublishTimeDescription ? `Google review · ${r.relativePublishTimeDescription}` : "Google review",
        text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        rating: r.rating,
        url: r.authorAttribution?.uri,
        photo: r.authorAttribution?.photoUri,
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

async function fetchPlace(key: string, placeId?: string): Promise<PlaceDetails> {
  const init = {
    signal: AbortSignal.timeout(8_000),
    next: { revalidate: REFRESH_SECONDS, tags: ["google-reviews"] },
  };

  if (placeId) {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      ...init,
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": FIELDS.join(",") },
    });
    if (!response.ok) throw new Error(`Places API returned ${response.status}`);
    return (await response.json()) as PlaceDetails;
  }

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    ...init,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": FIELDS.map((field) => `places.${field}`).join(","),
    },
    // Mikko's listing has no public address (a service-area business), which
    // Text Search leaves out unless asked.
    body: JSON.stringify({ textQuery: `${BUSINESS_NAME}, Las Vegas, NV`, includePureServiceAreaBusinesses: true }),
  });
  if (!response.ok) throw new Error(`Places API search returned ${response.status}`);
  const { places = [] } = (await response.json()) as { places?: PlaceDetails[] };
  // Only trust a result that is clearly Mikko's listing, never a nearby agent.
  const place = places.find((p) => p.displayName?.text?.toLowerCase().includes("lucernas"));
  if (!place) throw new Error(`No Google listing named "${BUSINESS_NAME}" found`);
  return place;
}
