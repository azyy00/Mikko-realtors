export default function Loading() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      aria-busy="true"
      className="container-x min-h-[70dvh] py-32"
    >
      <p role="status" className="text-sm text-muted">
        Loading page…
      </p>
      <div
        aria-hidden="true"
        className="mt-8 space-y-5 motion-safe:animate-pulse"
      >
        <div className="h-12 w-3/4 max-w-xl rounded-lg bg-navy-900/10" />
        <div className="h-5 w-full max-w-lg rounded bg-navy-900/5" />
        <div className="h-64 rounded-xl2 bg-navy-900/5" />
      </div>
    </main>
  );
}
