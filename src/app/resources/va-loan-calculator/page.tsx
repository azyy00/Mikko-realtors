import type { Metadata } from "next";
import Link from "next/link";
import { CaretRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "VA Loan Calculator | 0% Down Las Vegas | Mikko Lucernas",
  description:
    "Estimate your monthly VA loan payment on a Las Vegas home: 0% down, no PMI, funding fee financed, with this free VA calculator from veteran-friendly REALTOR® Mikko Lucernas.",
};

const perks = [
  "0% down payment for eligible buyers",
  "No monthly private mortgage insurance",
  "Funding fee can be financed into the loan",
];

export default function VaLoanCalculatorPage() {
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
              <span className="text-navy-900">VA Loan Calculator</span>
            </nav>
            <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">
              VA loan calculator
            </h1>
            <p className="subhead mt-4 max-w-2xl">
              See what a $0-down VA loan could cost per month on a Las Vegas
              home. Built for veterans and active military.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-navy-800">
                  <CheckCircle size={18} weight="fill" className="text-sage-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-paper py-12 pb-20">
          <div className="container-x max-w-5xl">
            <LoanCalculator variant="va" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
