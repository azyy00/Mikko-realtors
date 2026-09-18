"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="container-x flex min-h-[80dvh] flex-col items-start justify-center py-28"
    >
      <p className="text-sm font-medium text-muted">Something went wrong</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">
        This page couldn’t load.
      </h1>
      <p className="mt-5 max-w-lg text-muted">
        Please try again. You can also return home to explore the site.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn-gold">
          Try again
        </button>
        <Link href="/" className="btn-ghost">
          Back to home
        </Link>
      </div>
    </main>
  );
}
