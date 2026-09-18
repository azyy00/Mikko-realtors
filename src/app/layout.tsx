import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import ScheduleTour from "@/components/ScheduleTour";

const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Mikko Lucernas, Las Vegas Real Estate | New Construction & Relocation",
  description:
    "Las Vegas REALTOR® Mikko Lucernas helps buyers, sellers, veterans, and relocating families across Summerlin, Henderson, and North Las Vegas. New construction and relocation specialist.",
  keywords: [
    "Las Vegas real estate",
    "Summerlin homes",
    "Henderson new construction",
    "VA loan homes Las Vegas",
    "relocating to Las Vegas",
    "Filipino realtor Las Vegas",
  ],
  openGraph: {
    title: "Mikko Lucernas, Las Vegas Real Estate",
    description:
      "New construction and relocation specialist serving Las Vegas, Henderson, and North Las Vegas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-paper px-5 py-3 text-navy-950 shadow-soft focus:not-sr-only"
        >
          Skip to content
        </a>
        {children}
        <ScheduleTour />
      </body>
    </html>
  );
}
