"use client";

import { useState } from "react";
import Link from "next/link";
import { useTravelLibrary } from "@/hooks/use-travel-library";
import type { JourneyDirection } from "@/types/route";

interface JourneyActionsProps {
  routeName: string;
  routeSlug: string;
  rideModeAvailable: boolean;
  direction: JourneyDirection;
}

export function JourneyActions({ routeName, routeSlug, rideModeAvailable, direction }: JourneyActionsProps) {
  const { getStatus, setStatus } = useTravelLibrary();
  const routeStatus = getStatus(routeSlug);
  const [actionStatus, setActionStatus] = useState<string>();

  function updateStatus(status: "want_to_go") {
    const nextStatus = routeStatus === status ? undefined : status;
    const result = setStatus(routeSlug, nextStatus);
    setActionStatus(!result.ok ? "The free library holds two journeys. Rallii Pro removes this limit." : nextStatus === "want_to_go" ? `${routeName} saved.` : `${routeName} removed from Saved.`);
  }

  return (
    <div className="journey-actions" aria-label="Journey actions">
      <div className="journey-actions__personal"><button className="action-button action-button--primary focus-ring" type="button" aria-pressed={routeStatus === "want_to_go"} onClick={() => updateStatus("want_to_go")}>{routeStatus === "want_to_go" ? "Saved" : "Save journey"}</button></div>
      <div className="journey-actions__contextual"><Link className="action-button focus-ring" href={`/compare?routes=${routeSlug}`}>Compare</Link><Link className="action-button focus-ring" href={`/plan?route=${routeSlug}`}>Plan</Link>{rideModeAvailable ? <Link className="action-button focus-ring" href={`/ride/${routeSlug}${direction === "reverse" ? "?direction=reverse" : ""}`}>Start Ride Mode</Link> : null}</div>
      <p className="journey-actions__status" role="status" aria-live="polite">{actionStatus}</p>
    </div>
  );
}
