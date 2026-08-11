import type { Metadata } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rallii — Curated Rail Journeys",
    template: "%s | Rallii",
  },
  description: "Know where to sit, what to see, and when to look on the world's great rail journeys.",
  applicationName: "Rallii",
  openGraph: {
    title: "Rallii — Curated Rail Journeys",
    description: "Know where to sit, what to see, and when to look.",
    siteName: "Rallii",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
