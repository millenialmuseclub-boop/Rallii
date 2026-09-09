"use client";
import { useState } from "react";
import { useTrailLibrary } from "./use-trail-library";
export function SaveTrail({ slug, name, compact = false }: { slug: string; name: string; compact?: boolean }) {
  const { library, setStatus } = useTrailLibrary();
  const [error, setError] = useState("");
  const current = library.trails[slug];
  return <div className="trail-save" aria-label={`Save ${name}`}>
    <button type="button" aria-label={`Want to Go: ${name}`} aria-pressed={current === "want_to_go"} onClick={() => setError(setStatus(slug, current === "want_to_go" ? undefined : "want_to_go") ? "" : "Could not save. Device storage is unavailable.")}><span aria-hidden="true">{current === "want_to_go" ? "✓" : "+"}</span> Want to Go</button>
    {!compact || current === "been" ? <button type="button" aria-label={`Been: ${name}`} aria-pressed={current === "been"} onClick={() => setError(setStatus(slug, current === "been" ? undefined : "been") ? "" : "Could not save. Device storage is unavailable.")}>Been {current === "been" ? "✓" : ""}</button> : null}
    {error ? <small role="alert">{error}</small> : null}
  </div>;
}
