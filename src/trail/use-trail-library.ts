"use client";
import { useSyncExternalStore } from "react";
import { parseTrailLibrary, subscribeToTrails, trailSnapshot, writeTrailStatus } from "./library";
const serverSnapshot = () => "";
export function useTrailLibrary() {
  const raw = useSyncExternalStore(subscribeToTrails, trailSnapshot, serverSnapshot);
  return { library: parseTrailLibrary(raw), setStatus: writeTrailStatus };
}
