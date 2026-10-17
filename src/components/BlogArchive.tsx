"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import BlogCard from "./BlogCard";
import { type BlogPost } from "@/lib/blog";

export default function BlogArchive({
  posts,
  initial = 6,
}: {
  posts: BlogPost[];
  initial?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? posts : posts.slice(0, initial);
  const hidden = posts.length - initial;

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
        {visible.map((post) => (
          <div key={post.slug} className="min-w-0">
            <BlogCard post={post} />
          </div>
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
