import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const url = "https://ai-builder-ecosystem-radar.vercel.app";
const description =
  "A market-intelligence view of AI app builders, agentic IDEs, and vibe-coding platforms, scored by Supabase integration depth and partnership opportunity. Built by Daniel Ramírez.";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "AI-Builder Ecosystem Radar",
  description,
  openGraph: {
    title: "AI-Builder Ecosystem Radar",
    description,
    url,
    siteName: "AI-Builder Ecosystem Radar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Builder Ecosystem Radar",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans text-ink antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 dot-grid opacity-70" />
        {children}
      </body>
    </html>
  );
}
