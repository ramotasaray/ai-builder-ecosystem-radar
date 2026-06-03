import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI-Builder Ecosystem Radar — Supabase partnership signal",
  description:
    "A market-intelligence view of AI app builders, agentic IDEs, and vibe-coding platforms, scored by Supabase integration depth and partnership opportunity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
