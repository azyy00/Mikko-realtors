import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CaretRight, ArrowRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FacebookVideo from "@/components/FacebookVideo";
import { formatDate } from "@/lib/blog";
import { getBlogPost } from "@/lib/blog-feed";

export function generateStaticParams() {
  // Facebook articles are generated on demand; no sample routes are prebuilt.
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Mikko Lucernas`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        <article className="bg-paper pb-16 pt-28">
          <div className="container-x">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
              <Link href="/" className="hover:text-gold-600">
                Home
              </Link>
              <CaretRight size={12} />
              <Link href="/blog" className="hover:text-gold-600">
                Blog
              </Link>
              <CaretRight size={12} />
              <span className="text-navy-900">{post.category}</span>
            </nav>

            {/* Title first on mobile; a bounded portrait player beside the copy on desktop. */}
            <div className="mt-8 grid gap-y-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-12">
              <header className="min-w-0 lg:col-start-2 lg:row-start-1">
                <h1 className="display break-words text-3xl text-ink sm:text-4xl">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readMinutes} min read</span>
                </div>
              </header>

              <div className="mx-auto w-full max-w-sm lg:col-start-1 lg:row-span-2 lg:row-start-1">
                <div className="overflow-hidden rounded-xl2 bg-navy-950">
                  {post.source?.isVideo ? (
                    <FacebookVideo
                      key={post.slug}
                      url={post.source.videoUrl || post.source.url}
                      poster={post.coverImage}
                      title={post.title}
                    />
                  ) : post.youTubeId ? (
                    <div className="relative aspect-[9/16]">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(post.youTubeId)}`}
                        title={post.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : post.localVideo ? (
                    <video
                      className="aspect-[9/16] w-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={post.title}
                      poster={post.coverImage}
                    >
                      <source src={post.localVideo} type="video/mp4" />
                    </video>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={post.coverImage || `https://picsum.photos/seed/${post.coverSeed}/720/1280`}
                      alt={post.title}
                      className="aspect-[9/16] w-full object-contain"
                    />
                  )}
                </div>
                {post.source?.isVideo && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Video not loading?{" "}
                    <a href={post.source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-700 underline underline-offset-4 hover:text-gold-600">
                      Open on Facebook<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                )}
              </div>

              <div className="min-w-0 lg:col-start-2 lg:row-start-2">
                <div className="max-w-prose break-words">
                  {post.body.map((p, i) => (
                    <p
                      key={i}
                      className="mt-5 whitespace-pre-line leading-relaxed text-navy-800 first:mt-0"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {post.source && (
                  <a
                    href={post.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-700 underline underline-offset-4 hover:text-gold-600"
                  >
                    {post.source.isVideo ? "Watch the original on Facebook" : "Read the original on Facebook"}
                    <span className="sr-only">(opens in a new tab)</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                )}

                {/* CTA */}
                <div className="mt-8 rounded-xl2 bg-navy-950 p-7 text-white">
                  <p className="font-medium">{post.cta}</p>
                  <Link href="/#contact" className="btn-gold mt-5">
                    Talk to Mikko
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </div>

                <div className="mt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600"
                  >
                    <ArrowLeft size={16} />
                    Back to all posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
