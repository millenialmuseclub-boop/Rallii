"use client";

import { useState } from "react";
import Link from "next/link";
import { useTravelLibrary } from "@/hooks/use-travel-library";

interface JourneyActionsProps {
  routeName: string;
  routeSlug: string;
  rideModeAvailable: boolean;
}

export function JourneyActions({ routeName, routeSlug, rideModeAvailable }: JourneyActionsProps) {
  const { getStatus, setStatus } = useTravelLibrary();
  const routeStatus = getStatus(routeSlug);
  const [actionStatus, setActionStatus] = useState<string>();

  function updateStatus(status: "want_to_go" | "been") {
    const nextStatus = routeStatus === status ? undefined : status;
    setStatus(routeSlug, nextStatus);
    setActionStatus(nextStatus === "want_to_go" ? `${routeName} added to Want to Go.` : nextStatus === "been" ? `${routeName} marked Been.` : `${routeName} removed from Plan Journey.`);
  }

  async function shareJourney() {
    const shareData = {
      title: `${routeName} — Rallii`,
      text: `Explore ${routeName} on Rallii. Know where to sit, what to see, and when to look.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setActionStatus("Journey shared.");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setActionStatus("Direction-aware link copied.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setActionStatus("Unable to share this journey.");
    }
  }

  return (
    <div className="journey-actions" aria-label="Journey actions">
      <div className="journey-actions__personal">
        <button className="action-button action-button--primary focus-ring" type="button" aria-pressed={routeStatus === "want_to_go"} onClick={() => updateStatus("want_to_go")}>{routeStatus === "want_to_go" ? "Saved: Want to Go" : "Want to Go"}</button>
        <button className="action-button focus-ring" type="button" aria-pressed={routeStatus === "been"} onClick={() => updateStatus("been")}>{routeStatus === "been" ? "Marked Been" : "Been"}</button>
      </div>
      <div className="journey-actions__contextual"><button className="action-button focus-ring" type="button" onClick={shareJourney}>Share</button><Link className="action-button focus-ring" href={`/compare?routes=${routeSlug}`}>Compare</Link><Link className="action-button focus-ring" href={`/plan?route=${routeSlug}`}>Plan</Link>{rideModeAvailable ? <Link className="action-button focus-ring" href={`/ride/${routeSlug}`}>Start Ride Mode</Link> : null}</div>
      <p className="journey-actions__status" role="status" aria-live="polite">{actionStatus}</p>
    </div>
  );
}
