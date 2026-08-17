"use client";
import Link from "next/link";
import { useState } from "react";
import { useTravelLibrary } from "@/hooks/use-travel-library";

export function SaveRouteButton({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { getStatus, setStatus } = useTravelLibrary();
  const [limitReached, setLimitReached] = useState(false);
  const saved = getStatus(slug) === "want_to_go";
  function update() { const result = setStatus(slug, saved ? undefined : "want_to_go"); setLimitReached(!result.ok && result.reason === "limit-reached"); }
  return <span><button className={compact ? "text-link focus-ring" : "action-button focus-ring"} type="button" aria-pressed={saved} onClick={update}>{saved ? "Saved" : "Want to Go"}</button>{limitReached ? <small className="library-limit-note" role="status">Free libraries hold two journeys. <Link href="/pro">See Rallii Pro</Link></small> : null}</span>;
}
