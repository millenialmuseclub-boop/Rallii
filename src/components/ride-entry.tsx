"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { parseJourneyDirection } from "@/lib/route-direction";
import type { RailRoute } from "@/types/route";
import { RideMode } from "./ride-mode";

/** Read direction in the client so the same page works in the OTA static export. */
export function RideEntry({ route }: { route: RailRoute }) {
  const params = useSearchParams();
  const direction = parseJourneyDirection(params.get("direction"));
  return <><Link className="back-link" href={`/routes/${route.summary.slug}/${direction === "reverse" ? "?direction=reverse" : ""}`}>← Back to journey</Link><RideMode key={`${route.summary.slug}:${direction}`} route={route} initialDirection={direction} /></>;
}
