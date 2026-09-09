"use client";
import { useState } from "react";
import { useMtbLibrary } from "./use-mtb-library";
export function SaveMtb({ slug, name, compact = false }: { slug: string; name: string; compact?: boolean }) {
  const { library, setSave } = useMtbLibrary();
  const [error, setError] = useState("");
  const current = library.rides[slug];
  return <div className="trail-save mtb-save" aria-label={`Save ${name}`}>
    {([ ["want_to_ride", "Want to Ride"], ...(!compact ? [["ridden", "Ridden"], ["favorite", "Favorite"]] : []) ] as ["want_to_ride" | "ridden" | "favorite", string][]).map(([value, label]) => <button key={value} type="button" aria-label={`${label}: ${name}`} aria-pressed={value === "favorite" ? current?.favorite === true : current?.status === value} onClick={() => setError(setSave(slug, value) ? "" : "Could not save. Device storage is unavailable.")}>{label}{(value === "favorite" ? current?.favorite : current?.status === value) ? " ✓" : ""}</button>)}
    {error ? <small role="alert">{error}</small> : null}
  </div>;
}
