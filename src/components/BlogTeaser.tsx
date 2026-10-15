import Link from "next/link";
import { ArrowUpRight, DownloadSimple, FilePdf } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import BlogCard from "./BlogCard";
import GuideDownload from "./GuideDownload";
import { getBlogPosts } from "@/lib/blog-feed";
import { downloadGuides } from "@/lib/guides";

/** Homepage resources: free guides first, then Mikko's educational posts. */
export default async function BlogTeaser() {
  const posts = (await getBlogPosts()).slice(0, 3);
  const featuredGuides = downloadGuides.slice(0, 3);

  return (
    <section id="guides" aria-labelledby="guides-heading" className="bg-paper py-24">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="guides-heading" className="display text-4xl text-ink sm:text-5xl">
              Helpful guides &amp; tips
            </h2>
            <p className="subhead mt-3">
              Straight answers on buying, selling, and moving to Las Vegas.
            </p>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-600"
          >
            View all guides
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredGuides.map((guide, i) => (
            <Reveal key={guide.file} delay={i * 0.06}>
              <GuideDownload
                file={guide.file}
                title={guide.title}
                className="group flex h-full flex-col justify-between rounded-xl2 border border-navy-900/10 bg-cream p-6 transition-colors hover:border-gold-400/60"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-gold-500 shadow-soft">
                      <FilePdf size={20} weight="fill" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-600">
                      {guide.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{guide.blurb}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 group-hover:text-gold-600">
                  <DownloadSimple size={15} weight="bold" />
                  Get the free guide
                </span>
              </GuideDownload>
            </Reveal>
          ))}
        </div>

        {posts.length > 0 && (
          <>
            <Reveal className="mt-20 flex flex-wrap items-end justify-between gap-4">
              <h3 className="display text-3xl text-ink sm:text-4xl">From Mikko&apos;s blog</h3>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-600"
              >
                View all posts
                <ArrowUpRight size={16} />
              </Link>
            </Reveal>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.06}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
