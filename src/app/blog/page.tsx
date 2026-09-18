import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogArchive from "@/components/BlogArchive";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Mikko's Blog | Mikko Lucernas",
  description:
    "Las Vegas real estate updates, new-construction news, buyer and seller tips, and market insights from REALTOR® Mikko Lucernas.",
};

export default function BlogIndex() {
  return (
    <>
      <Nav solid />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-cream pb-8 pt-28">
          <div className="container-x">
            <h1 className="display text-4xl text-ink sm:text-5xl">
              Mikko&apos;s Blog
            </h1>
            <p className="subhead mt-4 max-w-2xl">
              Fresh posts and clips, straight from Mikko&apos;s social feeds.
            </p>
          </div>
        </section>

        <section className="bg-paper pb-16 pt-6">
          <div className="container-x">
            <BlogArchive posts={blogPosts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
