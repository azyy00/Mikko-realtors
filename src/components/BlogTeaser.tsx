import Link from "next/link";
import { ArrowUpRight, DownloadSimple, FilePdf } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import BlogCard from "./BlogCard";
import GuideDownload from "./GuideDownload";
import { getBlogPosts } from "@/lib/blog-feed";
import { downloadGuides } from "@/lib/guides";

/** Homepage resources: free guides first, then Mikko's educational posts. */
export default async function BlogTeaser() {
  const posts = (await getBlogPosts()).slice(0, 4);
  const featuredGuides = downloadGuides.slice(0, 3);

  return (
    <section id="guides" aria-labelledby="guides-heading" className="bg-paper py-14 sm:py-24">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="guides-heading" className="display text-3xl text-ink sm:text-5xl">
              Helpful guides &amp; tips
            </h2>
            <p className="subhead mt-2 text-sm sm:mt-3 sm:text-base">
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

        <div className="mt-6 grid gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {featuredGuides.map((guide, i) => (
            <Reveal key={guide.file} delay={i * 0.06}>
              <GuideDownload
                file={guide.file}
                title={guide.title}
                className="group flex h-full flex-col justify-between rounded-xl2 border border-navy-900/10 bg-cream p-4 transition-colors sm:p-6 hover:border-gold-400/60"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white sm:h-10 sm:w-10 sm:rounded-xl text-gold-500 shadow-soft">
                      <FilePdf size={20} weight="fill" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-600">
                      {guide.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink sm:mt-4 sm:text-xl">
                    {guide.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted sm:mt-2 sm:line-clamp-none">{guide.blurb}</p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 sm:mt-5 text-sm font-semibold text-navy-700 group-hover:text-gold-600">
                  <DownloadSimple size={15} weight="bold" />
                  Get the free guide
                </span>
              </GuideDownload>
            </Reveal>
          ))}
        </div>

        {posts.length > 0 && (
          <>
            <Reveal className="mt-12 flex sm:mt-20 flex-wrap items-end justify-between gap-4">
              <h3 className="display text-2xl text-ink sm:text-4xl">From Mikko&apos;s blog</h3>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-600"
              >
                View all posts
                <ArrowUpRight size={16} />
              </Link>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
              {posts.map((post, i) => (
                // The 4th post evens out the 2-column rows; 3 columns show 3.
                <Reveal key={post.slug} delay={i * 0.06} className={i === 3 ? "lg:hidden" : undefined}>
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
