"use client";

import { getDirectionalEndpoints, getDirectionalLandmarks, getDirectionalSegments } from "@/lib/route-direction";
import type { BestSideSegment, JourneyDirection, RailRoute, ViewSide } from "@/types/route";
import { seatRecommendation } from "@/lib/seat-guidance";

interface BestSideToSitProps { route: RailRoute; direction: JourneyDirection; }

export function BestSideToSit({ route, direction }: BestSideToSitProps) {
  const segments = getDirectionalSegments(route, direction);
  const landmarks = getDirectionalLandmarks(route, direction);
  const endpoints = getDirectionalEndpoints(route, direction);
  const recommendation = seatRecommendation(segments, direction);

  return (
    <section className="signature-panel scroll-section" id="best-side" aria-labelledby="best-side-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow">Seat view guide</p>
          <h2 id="best-side-title" className="mt-2 font-serif text-3xl sm:text-4xl">Best Side to Sit</h2>
          <p className="mt-2 text-sm text-stone-600">
            {endpoints.origin} → {endpoints.destination}
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-stone-300 pt-7 sm:grid sm:grid-cols-[0.7fr_1.3fr] sm:gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Overall recommendation</p>
          <p className="mt-2 font-serif text-5xl text-accent">{formatSide(recommendation.side)}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-600">
            {recommendation.explanation}
          </p>
        </div>
        <div className="mt-8 sm:mt-0">
          <h3 className="text-sm font-semibold">It changes along the way</h3>
          <p className="mt-2 text-sm text-stone-600">Left and right are relative to your direction of travel, not your seat number. Seat orientation and availability depend on the train.</p>
          <ul className="mt-3 divide-y divide-stone-300">
            {segments.map((segment) => {
              const landmark = landmarks.find(
                (item) => item.distanceAlongRouteKm >= segment.startDistanceKm && item.distanceAlongRouteKm <= segment.endDistanceKm,
              );
              const side = direction === "reverse" ? segment.reverseDirectionSide : segment.forwardDirectionSide;
              return (
                <li className="best-side-segment" key={segment.id}>
                  <span><b>{landmark?.name ?? "Scenic section"}</b><small>{segment.reason}</small><small>{Math.round(segment.startDistanceKm)}–{Math.round(segment.endDistanceKm)} km · {formatConfidenceLabel(segment.confidenceType)}</small></span>
                  <strong>{formatSide(side)}</strong>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs text-stone-500">
            {formatConfidence(segments.map((segment) => segment.confidenceType))}
          </p>
        </div>
      </div>
    </section>
  );
}

function formatSide(side: ViewSide): string {
  return side === "both" ? "Both sides" : `${side.charAt(0).toUpperCase()}${side.slice(1)}`;
}

function formatConfidence(values: BestSideSegment["confidenceType"][]): string {
  return values.includes("limited-data") ? "Some sections are early guidance based on limited reports." : "Prepared as Rallii editorial guidance.";
}
function formatConfidenceLabel(value: BestSideSegment["confidenceType"]): string { return value === "limited-data" ? "Limited data" : value === "community" ? "Community guidance" : "Editorial guidance"; }
