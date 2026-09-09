import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import "./mobile.css";
import { PwaRegistration } from "@/components/pwa-registration";
import { ProProvider } from "@/components/pro-provider";
import { FamilyShell } from "@/components/family-shell";
import { NativeOtaUpdater } from "@/components/native-ota-updater";

const sourceSans = localFont({
  src: "./fonts/SourceSans3-Upright.woff2",
  variable: "--font-source-sans",
  weight: "200 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rallii-kappa.vercel.app"),
  title: {
    default: "Rallii — Go somewhere worth remembering",
    template: "%s | Rallii",
  },
  description: "Know where to sit, what to see, and when to look on the world's great rail journeys.",
  applicationName: "Rallii",
  openGraph: {
    title: "Rallii — One world, five ways outside",
    description: "Explore memorable journeys by rail, green, trail, mountain bike, and snow.",
    siteName: "Rallii",
    type: "website",
  },
  twitter: { card: "summary", title: "Rallii — One world, five ways outside", description: "Explore memorable journeys by rail, green, trail, mountain bike, and snow." },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Rallii", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#173f32",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans.variable} data-scroll-behavior="smooth">
      <body><ProProvider><FamilyShell>{children}</FamilyShell></ProProvider><PwaRegistration /><NativeOtaUpdater /></body>
    </html>
  );
}
