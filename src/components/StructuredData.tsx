import { agent, googleRating, reviews } from "@/lib/data";

// JSON-LD structured data so search engines understand the business and can
// show the star rating (rich result) in results. Swap "url"/"image" for the
// real domain once it's live.
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Mikko Lucernas - Pinoy Vegas Real Estate Agent",
    description:
      "Las Vegas REALTOR® specializing in new construction, relocation, and helping veterans and first-time buyers across Las Vegas, Henderson, and North Las Vegas.",
    image: "/profile/mikko.png",
    telephone: "+1-702-488-1206",
    email: agent.email,
    priceRange: "$$",
    areaServed: [
      "Las Vegas, NV",
      "Henderson, NV",
      "North Las Vegas, NV",
      "Summerlin, NV",
    ],
    knowsLanguage: ["English", "Filipino"],
    memberOf: { "@type": "Organization", name: agent.brokerage },
    sameAs: [googleRating.url],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: googleRating.score,
      reviewCount: String(googleRating.count),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.slice(0, 3).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: r.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
