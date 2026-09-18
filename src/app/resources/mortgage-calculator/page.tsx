import type { Metadata } from "next";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator | Las Vegas Home Payments | Mikko Lucernas",
  description:
    "Estimate your monthly Las Vegas mortgage payment: principal, interest, taxes, insurance, and HOA, with this free calculator from REALTOR® Mikko Lucernas.",
};

export default function MortgageCalculatorPage() {
  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-cream pb-8 pt-28">
          <div className="container-x">
            <nav className="flex items-center gap-1.5 text-xs text-muted">
              <Link href="/" className="hover:text-gold-600">
                Home
              </Link>
              <CaretRight size={12} />
              <span>Resources</span>
              <CaretRight size={12} />
              <span className="text-navy-900">Mortgage Calculator</span>
            </nav>
            <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">
              Mortgage calculator
            </h1>
            <p className="subhead mt-4 max-w-2xl">
              Move the sliders to estimate your monthly payment on a Las Vegas
              home, including taxes, insurance, and HOA.
            </p>
          </div>
        </section>

        <section className="bg-paper py-12 pb-20">
          <div className="container-x max-w-5xl">
            <LoanCalculator variant="mortgage" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
