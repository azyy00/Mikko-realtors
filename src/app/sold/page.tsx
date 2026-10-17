import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CaretRight, SealCheck } from "@phosphor-icons/react/dist/ssr";
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
      <main id="main-content" tabIndex={-1} className="bg-white">
        <section aria-labelledby="sold-heading" className="pb-14 pt-24 sm:pb-20 sm:pt-32">
          <div className="container-x">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
              <Link href="/" className="hover:text-gold-600">Home</Link>
              <CaretRight size={12} aria-hidden="true" />
              <span aria-current="page" className="text-navy-900">Just Sold</span>
            </nav>
            <div className="mx-auto mt-6 max-w-5xl text-center sm:mt-10">
              <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-600">
                <SealCheck size={18} weight="fill" className="text-sage-500" />
                Just Sold
              </p>
              <h1 id="sold-heading" className="display mt-2 text-balance text-3xl sm:mt-3 text-ink sm:text-5xl lg:text-6xl">
                Real families. Real keys.
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-muted sm:mt-5 sm:text-lg">
                All {soldPhotos.length} closings are actual Las Vegas families
                Mikko helped buy or sell. Tap any photo to see it larger.
              </p>
            </div>
          </div>

          <div className="container-x mt-7 sm:mt-12">
            <SoldGallery photos={soldPhotos} />
          </div>

          <div className="container-x mt-10 sm:mt-14">
            <div className="flex flex-col items-start justify-between gap-6 rounded-xl2 bg-navy-950 p-6 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">Want to be the next one?</h2>
                <p className="mt-2 max-w-md text-sm text-white/65">
                  Whether you&apos;re buying or selling, let&apos;s talk about
                  your move in Las Vegas.
                </p>
              </div>
              <Link href="/#contact" className="btn-gold shrink-0">
                Talk to Mikko
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
            <Link
              href="/#sold"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-600"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
