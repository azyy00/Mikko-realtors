import type { Metadata } from "next";
import Link from "next/link";
import { CaretRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import HomeValuationForm from "@/components/HomeValuationForm";

export const metadata: Metadata = {
  title: "What's My Home Worth? Free Las Vegas Home Valuation | Mikko Lucernas",
  description:
    "Find out what your Las Vegas home could sell for in today's market. Request a free, no-obligation home valuation from REALTOR® Mikko Lucernas.",
};

const resources = [
  "Preparing your house for sale",
  "Home improvements that actually pay off",
  "Pricing it right the first time",
  "A realistic selling timeline",
  "What selling actually costs",
  "Recently sold homes in your area",
];

export default function HomeValuationPage() {
  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-cream pb-10 pt-28">
          <div className="container-x">
            <nav className="flex items-center gap-1.5 text-xs text-muted">
              <Link href="/" className="hover:text-gold-600">
                Home
              </Link>
              <CaretRight size={12} />
              <span>Sellers</span>
              <CaretRight size={12} />
              <span className="text-navy-900">Home Valuation</span>
            </nav>
            <h1 className="display mt-4 max-w-2xl text-4xl text-ink sm:text-5xl">
              Thinking about selling your Las Vegas home?
            </h1>
            <p className="subhead mt-4 max-w-2xl">
              Find out what your home could sell for in today&apos;s market,
              priced on real, current comps, not an automated estimate.
            </p>
          </div>
        </section>

        <section className="bg-paper py-14">
          <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
            <Reveal>
              <HomeValuationForm />
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Selling resources
              </h2>
              <p className="mt-3 text-muted">
                Once you know your number, here&apos;s what goes into getting the
                most for your home:
              </p>
              <ul className="mt-6 space-y-4">
                {resources.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-navy-800">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-sage-500"
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl2 bg-navy-950 p-6 text-white">
                <p className="text-sm text-white/75">
                  Want the full playbook? Read the{" "}
                  <Link href="/guides/sellers" className="text-gold-300 underline">
                    Las Vegas home selling guide
                  </Link>{" "}
                  or see Mikko&apos;s{" "}
                  <Link href="/#sold" className="text-gold-300 underline">
                    recent closings
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
