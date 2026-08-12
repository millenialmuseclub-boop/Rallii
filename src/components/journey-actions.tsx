"use client";

import { useState } from "react";
import Link from "next/link";
import { useSavedRoutes } from "@/hooks/use-saved-routes";

interface JourneyActionsProps {
  routeName: string;
  routeSlug: string;
  rideModeAvailable: boolean;
}

export function JourneyActions({ routeName, routeSlug, rideModeAvailable }: JourneyActionsProps) {
  const { isSaved, setSaved } = useSavedRoutes();
  const saved = isSaved(routeSlug);
  const [shareStatus, setShareStatus] = useState<string>();

  async function shareJourney() {
    const shareData = {
      title: `${routeName} — Rallii`,
      text: `Explore ${routeName} on Rallii. Know where to sit, what to see, and when to look.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("Shared");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Link copied");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareStatus("Unable to share");
    }
  }

  return (
    <div className="mt-7 flex flex-wrap items-center gap-2" aria-label="Journey actions">
      <button
        className="action-button focus-ring"
        type="button"
        aria-pressed={saved}
        onClick={() => setSaved(routeSlug, !saved)}
      >
        {saved ? "Saved" : "Save"}
      </button>
      <button className="action-button focus-ring" type="button" onClick={shareJourney}>
        Share
      </button>
      <Link className="action-button focus-ring" href={`/compare?routes=${routeSlug}`}>Compare</Link>
      {rideModeAvailable ? <Link className="action-button action-button--primary focus-ring" href={`/ride/${routeSlug}`}>Start Ride Mode</Link> : null}
      <span className="text-xs text-stone-600" aria-live="polite">{shareStatus}</span>
    </div>
  );
}
