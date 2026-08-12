import type { Metadata } from "next";
import { TravelLibrary } from "@/components/travel-library";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getAllRoutes } from "@/data/routes";
export const metadata: Metadata = { title: "My Journeys", description: "Your private, browser-local rail journey library." };
export default function SavedPage() { return <AppScreenShell title="My Journeys" context="Your private, device-local journey workspace."><TravelLibrary routes={getAllRoutes()} /></AppScreenShell>; }
