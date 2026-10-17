import Link from "next/link";
import { ArrowUpRight, Article, Play } from "@phosphor-icons/react/dist/ssr";
import { formatDate, type BlogPost } from "@/lib/blog";

/**
 * Phones get a compact poster card (3:4 cover, overlay chips, one-line title)
 * so two fit per row; from sm up it's the full 9:16 card with the whole cover.
 */
export default function BlogCard({ post }: { post: BlogPost }) {
  const isVideo = !!(post.youTubeId || post.localVideo || post.source?.isVideo);
  const image = post.coverImage || `https://picsum.photos/seed/${post.coverSeed}/720/1280`;
  const chip = "bg-navy-950/75 text-[11px] font-semibold text-white backdrop-blur-sm";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block min-w-0 rounded-xl focus-visible:outline-offset-4 sm:mx-auto sm:w-full sm:max-w-sm sm:rounded-xl2 sm:focus-visible:outline-offset-8"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-navy-950 sm:aspect-[9/16] sm:rounded-xl2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" className="h-full w-full object-cover sm:object-contain" />

        {/* Phone overlay chips */}
        <span className={`absolute left-2 top-2 max-w-[calc(100%-3rem)] truncate rounded-full px-2.5 py-1 sm:hidden ${chip}`}>
          {post.category}
        </span>
        {isVideo && (
          <span aria-hidden="true" className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full sm:hidden ${chip}`}>
            <Play size={14} weight="fill" />
          </span>
        )}
        <span className={`absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 sm:hidden ${chip}`}>
          {isVideo ? <Play size={12} weight="fill" aria-hidden="true" /> : <Article size={12} weight="bold" aria-hidden="true" />}
          {isVideo ? "Watch" : "Read"}
        </span>

        {isVideo && (
          <span className="absolute bottom-4 left-4 hidden items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white sm:inline-flex">
            <Play size={16} weight="fill" aria-hidden="true" /> Watch video
          </span>
        )}
      </div>

      {/* Phone caption */}
      <div className="sm:hidden">
        <div className="mt-3 flex min-w-0 items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gold-400" />
          <h3 className="truncate font-display text-base font-semibold text-ink">{post.title}</h3>
        </div>
        <time dateTime={post.date} className="mt-1 block text-xs text-muted">
          {formatDate(post.date)}
        </time>
      </div>

      <div className="hidden pt-4 sm:block">
        <h3 className="font-display text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-gold-600">
          {post.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.category}</span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 group-hover:text-gold-600">
          {isVideo ? "Watch & read" : "Read post"}
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
