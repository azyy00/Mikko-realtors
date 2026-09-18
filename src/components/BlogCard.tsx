import Link from "next/link";
import { PlayCircle } from "@phosphor-icons/react";
import { formatDate, type BlogPost } from "@/lib/blog";

function cover(seed: string, w: number, h: number) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const isVideo = !!(post.youTubeId || post.localVideo);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative block overflow-hidden rounded-xl2 ${
        featured ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-[4/3]"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${cover(
            post.coverSeed,
            featured ? 1400 : 800,
            featured ? 760 : 600,
          )})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/5" />

      {/* Category badge */}
      <span className="absolute left-4 top-4 rounded-full bg-gold-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-950">
        {post.category}
      </span>
      {isVideo && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy-950/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          <PlayCircle size={13} weight="fill" /> Video
        </span>
      )}

      {/* Title + meta overlaid on the image */}
      <div className={`absolute inset-x-0 bottom-0 ${featured ? "p-6 sm:p-9" : "p-5"}`}>
        <h3
          className={`font-display font-semibold leading-tight text-white ${
            featured ? "max-w-2xl text-2xl sm:text-4xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/75">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile/mikko.png"
            alt=""
            className="h-6 w-6 rounded-full object-cover ring-1 ring-white/30"
          />
          <span className="font-medium text-white/90">Mikko Lucernas</span>
          <span aria-hidden>·</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
