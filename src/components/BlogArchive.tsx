"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import BlogCard from "./BlogCard";
import { type BlogPost } from "@/lib/blog";

export default function BlogArchive({
  posts,
  // featured (1) + a full row of 3 below
  initial = 4,
}: {
  posts: BlogPost[];
  initial?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? posts : posts.slice(0, initial);
  const hidden = posts.length - initial;
  const [featured, ...others] = visible;

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        {featured && (
          <Reveal className="lg:col-span-3">
            <BlogCard post={featured} featured />
          </Reveal>
        )}
        {others.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 0.06}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>

      {hidden > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-6 py-3 text-sm font-semibold text-navy-800 shadow-soft transition-colors hover:border-gold-400 hover:text-gold-600"
          >
            {expanded ? "Show fewer posts" : `View all posts (${hidden} more)`}
            <CaretDown
              size={16}
              weight="bold"
              className={`transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </>
  );
}
