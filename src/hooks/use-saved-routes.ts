"use client";
import { useSyncExternalStore } from "react";
import { getSavedRouteSlugs, setRouteSaved, subscribeToSavedRoutes } from "@/lib/saved-routes";
const empty: string[] = [];
export function useSavedRoutes() { const slugs = useSyncExternalStore(subscribeToSavedRoutes, getSavedRouteSlugs, () => empty); return { slugs, isSaved: (slug: string) => slugs.includes(slug), setSaved: setRouteSaved }; }
