import Link from "next/link";
import type { Metadata } from "next";
import { AppScreenShell } from "@/components/app-screen-shell";
import { TravelLibrary } from "@/components/travel-library";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Saved Journeys", description: "Your private Rallii journey library and rail map." };

export default function SavedPage() {
  return <AppScreenShell title="Saved" context="Your private journey library and rail map." backHref="/" backLabel="Home" mediaKey="saved"><p className="family-actions"><Link href="/my-rallii/">All saves in My Rallii →</Link><Link href="/pro/">Rallii Pro</Link></p><TravelLibrary routes={getAllRoutes()} /></AppScreenShell>;
}
