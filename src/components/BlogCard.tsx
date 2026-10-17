import Link from "next/link";
import { Article, Play } from "@phosphor-icons/react/dist/ssr";
import { formatDate, type BlogPost } from "@/lib/blog";

/** Compact poster card: cover with overlay chips, one-line title, date below. */
export default function BlogCard({ post }: { post: BlogPost }) {
  const isVideo = !!(post.youTubeId || post.localVideo || post.source?.isVideo);
  const image = post.coverImage || `https://picsum.photos/seed/${post.coverSeed}/720/960`;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block min-w-0 rounded-xl focus-visible:outline-offset-4"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-navy-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute left-2 top-2 max-w-[calc(100%-3.5rem)] truncate rounded-full bg-navy-950/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm sm:left-3 sm:top-3 sm:text-xs">
          {post.category}
        </span>
        {isVideo && (
          <span
            aria-hidden="true"
            className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-navy-950/75 text-white backdrop-blur-sm sm:right-3 sm:top-3 sm:h-9 sm:w-9"
          >
            <Play size={14} weight="fill" />
          </span>
        )}
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-lg bg-navy-950/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm sm:bottom-3 sm:left-3 sm:text-xs">
          {isVideo ? <Play size={12} weight="fill" aria-hidden="true" /> : <Article size={12} weight="bold" aria-hidden="true" />}
          {isVideo ? "Watch" : "Read"}
        </span>
      </div>
      <div className="mt-3 flex min-w-0 items-center gap-2">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gold-400" />
        <h3 className="truncate font-display text-base font-semibold text-ink transition-colors group-hover:text-gold-600 sm:text-lg">
          {post.title}
        </h3>
      </div>
      <time dateTime={post.date} className="mt-1 block text-xs text-muted">
        {formatDate(post.date)}
      </time>
    </Link>
  );
}
