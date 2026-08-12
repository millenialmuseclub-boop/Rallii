"use client";
import { useTravelLibrary } from "@/hooks/use-travel-library";

export function SaveRouteButton({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { getStatus, setStatus } = useTravelLibrary();
  const saved = getStatus(slug) === "want_to_go";
  return <button className={compact ? "text-link focus-ring" : "action-button focus-ring"} type="button" aria-pressed={saved} onClick={() => setStatus(slug, saved ? undefined : "want_to_go")}>{saved ? "Saved" : "Want to Go"}</button>;
}
