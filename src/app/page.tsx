import { Suspense } from "react";
import Nav from "@/components/Nav";
import StructuredData from "@/components/StructuredData";
import Hero from "@/components/Hero";
import LocalConnections from "@/components/LocalConnections";
import PropertySearch from "@/components/PropertySearch";
import JustSold from "@/components/JustSold";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import BlogTeaser from "@/components/BlogTeaser";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Nav solid />
      {/* Order follows a visitor's questions: who and what, can I trust him,
          what's available, who is he, proof, help, local life, contact. */}
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <PropertySearch />
        <About />
        <Reviews />
        <JustSold />
        <Suspense fallback={<section aria-label="Guides and tips" aria-busy="true" className="min-h-96 bg-paper" />}>
          <BlogTeaser />
        </Suspense>
        <LocalConnections />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
