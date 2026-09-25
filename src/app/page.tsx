import { Suspense } from "react";
import Nav from "@/components/Nav";
import StructuredData from "@/components/StructuredData";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import LocalConnections from "@/components/LocalConnections";
import FeaturedListings from "@/components/FeaturedListings";
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
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Marquee />
        <LocalConnections />
        <FeaturedListings />
        <PropertySearch />
        <JustSold />
        <About />
        <Reviews />
        <Suspense fallback={<section aria-label="Blog updates" aria-busy="true" className="min-h-96 bg-paper" />}>
          <BlogTeaser />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
