import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import BlogCard from "./BlogCard";
import { getBlogPosts } from "@/lib/blog-feed";

export default async function BlogTeaser() {
  const posts = (await getBlogPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="bg-paper py-24">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-4xl text-ink sm:text-5xl">
            Mikko&apos;s Blog
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-600"
          >
            View all posts
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
