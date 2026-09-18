import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FeaturedListings from "@/components/FeaturedListings";
import PropertySearch from "@/components/PropertySearch";

export const metadata: Metadata = {
  title: "Buy a Home in Las Vegas | Mikko Lucernas",
  description:
    "Browse homes for sale across Summerlin, Henderson, and North Las Vegas, new construction to move-in ready, with Las Vegas REALTOR® Mikko Lucernas.",
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; price?: string }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const price =
    typeof params.price === "string" &&
    ["under-500k", "500-750k", "750k-plus"].includes(params.price)
      ? params.price
      : "any";

  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        <PropertySearch
          key={`${q}-${price}`}
          showFilters
          initialQuery={q}
          initialPrice={price}
        />
        <FeaturedListings />

        {/* Back to full site / contact */}
        <section className="bg-paper py-20">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-6 rounded-xl2 bg-navy-950 p-8 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  Not sure where to start?
                </h2>
                <p className="mt-2 max-w-md text-sm text-white/65">
                  Tell me what you&apos;re looking for and I&apos;ll send you
                  homes that actually fit, before they hit the big portals.
                </p>
              </div>
              <Link href="/#contact" className="btn-gold shrink-0">
                Talk to Mikko
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
