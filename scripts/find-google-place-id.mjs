// Finds the Google Place ID for Mikko's business profile.
// Usage: GOOGLE_PLACES_API_KEY=... node scripts/find-google-place-id.mjs ["search text"]
const key = process.env.GOOGLE_PLACES_API_KEY;
const query = process.argv[2] || "Mikko Lucernas - Pinoy Vegas Real Estate Agent, Las Vegas, NV";
if (!key) {
  console.error("Set GOOGLE_PLACES_API_KEY first.");
  process.exit(1);
}
const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": key,
    "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
  },
  body: JSON.stringify({ textQuery: query }),
});
const data = await response.json();
if (!response.ok) {
  console.error(data.error?.message || data);
  process.exit(1);
}
for (const place of data.places ?? []) {
  console.log(`${place.id}  ${place.displayName?.text}  (${place.rating ?? "-"}★, ${place.userRatingCount ?? 0} reviews)  ${place.formattedAddress ?? ""}`);
}
