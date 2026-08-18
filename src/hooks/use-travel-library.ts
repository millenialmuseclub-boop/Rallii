"use client";
import { useSyncExternalStore } from "react";
import { getTravelLibrary, setRouteStatus, subscribeToTravelLibrary, type TravelLibrary } from "@/lib/travel-library";
import { useEntitlements } from "@/hooks/use-entitlements";
const serverSnapshot: TravelLibrary = { version: 1, routes: {} };
export function useTravelLibrary() { const library = useSyncExternalStore(subscribeToTravelLibrary, getTravelLibrary, () => serverSnapshot); const entitlements = useEntitlements(); return { library, statuses: library.routes, getStatus: (slug: string) => library.routes[slug], setStatus: (slug: string, status?: "want_to_go") => setRouteStatus(slug, status, entitlements.personalLibraryLimit), entitlements }; }
