import Link from "next/link";
import { ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr";
import { formatDate, type BlogPost } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  const isVideo = !!(post.youTubeId || post.localVideo || post.source?.isVideo);
  const image = post.coverImage || `https://picsum.photos/seed/${post.coverSeed}/720/1280`;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mx-auto block w-full max-w-sm rounded-xl2 focus-visible:outline-offset-8"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl2 bg-navy-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" className="h-full w-full object-contain" />
        {isVideo && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white">
            <Play size={16} weight="fill" aria-hidden="true" /> Watch video
          </span>
        )}
      </div>
      <div className="pt-4">
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
