import type { Metadata, Viewport } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { PwaRegistration } from "@/components/pwa-registration";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://rallii-kappa.vercel.app"),
  title: {
    default: "Rallii Rail — Curated Rail Journeys",
    template: "%s | Rallii Rail",
  },
  description: "Know where to sit, what to see, and when to look on the world's great rail journeys.",
  applicationName: "Rallii Rail",
  openGraph: {
    title: "Rallii Rail — Curated Rail Journeys",
    description: "Know where to sit, what to see, and when to look.",
    siteName: "Rallii",
    type: "website",
  },
  twitter: { card: "summary", title: "Rallii Rail — Curated Rail Journeys", description: "Know where to sit, what to see, and when to look." },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Rallii Rail", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#173f32" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}<SiteFooter /><PwaRegistration /></body>
    </html>
  );
}
