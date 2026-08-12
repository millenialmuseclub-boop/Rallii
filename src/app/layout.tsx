import type { Metadata, Viewport } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rallii-kappa.vercel.app"),
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
  twitter: { card: "summary", title: "Rallii — Curated Rail Journeys", description: "Know where to sit, what to see, and when to look." },
};

export const viewport: Viewport = { themeColor: "#f4f0e8", viewportFit: "cover" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><div className="pwa-frame">{children}</div></body>
    </html>
  );
}
