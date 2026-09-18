import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, SealCheck } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SoldGallery from "@/components/SoldGallery";
import { soldPhotos } from "@/lib/sold";

export const metadata: Metadata = {
  title: "Just Sold Gallery | Mikko Lucernas, Las Vegas REALTOR®",
  description:
    "Real closings and happy families across Las Vegas. Browse the full Just Sold gallery from REALTOR® Mikko Lucernas.",
};

export default function SoldPage() {
  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-cream pb-10 pt-28">
          <div className="container-x">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-600">
              <SealCheck size={18} weight="fill" className="text-sage-500" />
              Just Sold
            </p>
            <h1 className="display mt-3 text-4xl text-ink sm:text-5xl">
              Real families. Real keys.
            </h1>
          </div>
        </section>

        <section className="bg-paper py-14">
          <div className="container-x">
            <SoldGallery photos={soldPhotos} />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream pb-20">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-6 rounded-xl2 bg-navy-950 p-8 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  Want to be the next one?
                </h2>
                <p className="mt-2 max-w-md text-sm text-white/65">
                  Whether you&apos;re buying or selling, let&apos;s talk about
                  your move in Las Vegas.
                </p>
              </div>
              <Link href="/#contact" className="btn-gold shrink-0">
                Talk to Mikko
              </Link>
            </div>
            <Link
              href="/#sold"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-600"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
