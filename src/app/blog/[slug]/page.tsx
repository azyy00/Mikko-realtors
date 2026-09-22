import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CaretRight, ArrowRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { blogPosts, formatDate } from "@/lib/blog";
import { getBlogPost } from "@/lib/blog-feed";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
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
            <nav className="flex items-center gap-1.5 text-xs text-muted">
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

            {/* Side by side: media on the left, the post content on the right */}
            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
              {/* LEFT: media (video or image) */}
              <div className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-xl2 border border-navy-900/10 shadow-soft">
                  {post.youTubeId ? (
                    <div className="relative aspect-video">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${post.youTubeId}`}
                        title={post.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : post.localVideo ? (
                    <video
                      className="aspect-video w-full bg-navy-950 object-cover"
                      controls
                      playsInline
                      poster={`https://picsum.photos/seed/${post.coverSeed}/1200/675`}
                    >
                      <source src={post.localVideo} type="video/mp4" />
                    </video>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={post.coverImage || `https://picsum.photos/seed/${post.coverSeed}/1200/900`}
                      alt={post.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* RIGHT: caption / content */}
              <div className="lg:pt-1">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="font-semibold uppercase tracking-wider text-gold-600">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readMinutes} min read</span>
                </div>
                <h1 className="display mt-3 text-3xl text-ink sm:text-4xl">
                  {post.title}
                </h1>

                <div className="mt-6">
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
