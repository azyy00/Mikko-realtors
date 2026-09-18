import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav solid />
      <main
        id="main-content"
        tabIndex={-1}
        className="container-x flex min-h-[75dvh] flex-col items-start justify-center py-28"
      >
        <p className="text-sm font-medium text-muted">404 · Page not found</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">
          Let’s get you back home.
        </h1>
        <p className="mt-5 max-w-lg text-muted">
          This link may have changed. Find homes or start again from the
          homepage.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-gold">
            Back to home
          </Link>
          <Link href="/buy" className="btn-ghost">
            Search homes
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
