import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CaretRight, Check, Phone } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HomeValuationForm from "@/components/HomeValuationForm";
import { agent } from "@/lib/data";

export const metadata: Metadata = {
  title: "What's My Home Worth? Free Las Vegas Home Valuation | Mikko Lucernas",
  description:
    "Find out what your Las Vegas home could sell for in today's market. Request a free, no-obligation home valuation from REALTOR® Mikko Lucernas.",
};

// The order matters here, so the steps are numbered.
const steps = [
  {
    title: "Mikko reviews your home",
    copy: "Your address is checked against recent sales and active listings nearby.",
  },
  {
    title: "You get a real price range",
    copy: "Based on current comps, not an automated online estimate.",
  },
  {
    title: "You decide what's next",
    copy: "Free and no obligation to list. Ask anything along the way.",
  },
];

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
        <header className="border-b border-navy-900/10 bg-paper pb-12 pt-28 sm:pb-16 sm:pt-36">
          <div className="container-x">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
              <Link href="/" className="hover:text-gold-600">Home</Link>
              <CaretRight size={12} aria-hidden="true" />
              <Link href="/guides/sellers" className="hover:text-gold-600">Sellers</Link>
              <CaretRight size={12} aria-hidden="true" />
              <span aria-current="page" className="text-navy-900">Home Valuation</span>
            </nav>
            <h1 className="display mt-6 max-w-5xl text-balance text-[clamp(2.6rem,6.4vw,5.75rem)] leading-[0.98] text-ink">
              Thinking about selling <span className="text-gold-600">your Las Vegas home?</span>
            </h1>
            <p className="mt-6 max-w-[58ch] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              Find out what your home could sell for in today&apos;s market,
              priced on real, current comps, not an automated estimate.
            </p>
          </div>
        </header>

        <section className="py-14 sm:py-20">
          <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <HomeValuationForm />
            </div>

            <div>
              <h2 className="display text-3xl text-ink sm:text-4xl">What happens next</h2>
              <ol className="mt-7 space-y-7">
                {steps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4">
                    <span className="tnum grid h-11 w-11 place-items-center rounded-full bg-navy-950 font-display text-lg text-gold-300">
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">{step.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted">{step.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-14 border-t border-navy-900/10 pt-12">
                <h2 className="display text-3xl text-ink sm:text-4xl">Selling resources</h2>
                <p className="mt-3 max-w-[48ch] leading-relaxed text-muted">
                  Once you know your number, here&apos;s what goes into getting
                  the most for your home:
                </p>
                <ul className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {resources.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-navy-800">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-400 text-navy-950">
                        <Check size={12} weight="bold" aria-hidden="true" />
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="mt-12">
                {[
                  { label: "Read the home selling guide", href: "/guides/sellers" },
                  { label: "See Mikko's recent closings", href: "/sold" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="goal-link group flex min-h-14 items-center justify-between gap-3 border-b border-navy-900/10 py-3 font-display text-xl font-medium text-ink sm:text-2xl"
                    >
                      <span className="goal-label">{link.label}</span>
                      <ArrowUpRight size={20} weight="bold" aria-hidden="true" className="shrink-0 text-gold-600" />
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-muted">
                Rather talk it through?{" "}
                <a href={agent.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-gold-400 underline-offset-4">
                  <Phone size={14} weight="fill" aria-hidden="true" />
                  Call {agent.phone}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
