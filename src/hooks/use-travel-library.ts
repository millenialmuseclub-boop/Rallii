"use client";
import { useSyncExternalStore } from "react";
import { getTravelLibrary, setRouteStatus, subscribeToTravelLibrary, type TravelLibrary } from "@/lib/travel-library";
const serverSnapshot: TravelLibrary = { version: 1, routes: {} };
export function useTravelLibrary() { const library = useSyncExternalStore(subscribeToTravelLibrary, getTravelLibrary, () => serverSnapshot); return { library, statuses: library.routes, getStatus: (slug: string) => library.routes[slug], setStatus: setRouteStatus }; }
