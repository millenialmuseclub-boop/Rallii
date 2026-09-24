"use client";
import { useState } from "react";
import { journeyShareUrl } from "@/lib/share-journey";
import { experienceEvent } from "@/lib/experience-events";
import type { AffiliateMode } from "@/data/affiliate-offers";

export function ShareJourney({ name, path, mode, slug, direction }: { name: string; path: string; mode: AffiliateMode; slug: string; direction?: string }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState(false);
  const url = journeyShareUrl(path, direction);
  async function share() {
    setStatus(""); setManual(false);
    try {
      if (navigator.share) { await navigator.share({ title: `${name} | Rallii`, url }); setStatus("Share sheet completed."); }
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); setStatus("Journey link copied."); }
      else { setManual(true); setStatus("Copy the journey link below."); return; }
      experienceEvent("share", { mode, route_id: slug });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setManual(true); setStatus("Copy the journey link below.");
    }
  }
  return <div className="journey-share"><button type="button" className="action-button focus-ring" onClick={share}>Share journey</button><span role="status">{status}</span>{manual ? <label>Journey link<input readOnly value={url} onFocus={event => event.target.select()} /></label> : null}</div>;
}
