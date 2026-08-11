"use client";

import { useMemo, useState } from "react";
import type { BestSideSegment, Landmark, RouteSummary, ViewSide } from "@/types/route";

interface BestSideToSitProps {
  summary: RouteSummary;
  segments: BestSideSegment[];
  landmarks: Landmark[];
}

export function BestSideToSit({ summary, segments, landmarks }: BestSideToSitProps) {
  const [reversed, setReversed] = useState(false);
  const recommendation = useMemo(() => deriveRecommendation(segments, reversed), [segments, reversed]);

  return (
    <section className="signature-panel" aria-labelledby="best-side-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow">Seat view guide</p>
          <h2 id="best-side-title" className="mt-2 font-serif text-3xl sm:text-4xl">Best Side to Sit</h2>
          <p className="mt-2 text-sm text-stone-600">
            {reversed ? summary.destination : summary.origin} → {reversed ? summary.origin : summary.destination}
          </p>
        </div>
        <button
          className="direction-button focus-ring"
          type="button"
          aria-pressed={reversed}
          onClick={() => setReversed((current) => !current)}
        >
          Reverse direction
        </button>
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
          <ul className="mt-3 divide-y divide-stone-300">
            {segments.map((segment) => {
              const landmark = landmarks.find(
                (item) => item.distanceAlongRouteKm >= segment.startDistanceKm && item.distanceAlongRouteKm <= segment.endDistanceKm,
              );
              const side = reversed ? segment.reverseDirectionSide : segment.forwardDirectionSide;
              return (
                <li className="flex min-h-11 items-center justify-between gap-4 py-2 text-sm" key={segment.id}>
                  <span>{landmark?.name ?? segment.reason}</span>
                  <span className="font-semibold text-accent">{formatSide(side)}</span>
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

function deriveRecommendation(segments: BestSideSegment[], reversed: boolean): { side: ViewSide; explanation: string } {
  const totals: Record<ViewSide, number> = { left: 0, right: 0, both: 0, varies: 0, unknown: 0 };
  for (const segment of segments) {
    const side = reversed ? segment.reverseDirectionSide : segment.forwardDirectionSide;
    totals[side] += segment.endDistanceKm - segment.startDistanceKm;
  }
  const side = (Object.entries(totals) as Array<[ViewSide, number]>)
    .filter(([candidate]) => candidate === "left" || candidate === "right")
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? (totals.both > 0 ? "both" : totals.varies > 0 ? "varies" : "unknown");

  if (side === "both" || side === "varies" || side === "unknown") {
    return { side, explanation: side === "both" ? "The strongest supported views are shared across both sides." : "The line curves repeatedly, so no single side is supported for the full journey." };
  }

  return {
    side,
    explanation: `Best for the greatest share of the prepared scenic sections, with important ${side === "right" ? "left-side" : "right-side"} and both-side moments noted below.`,
  };
}

function formatSide(side: ViewSide): string {
  return side === "both" ? "Both sides" : `${side.charAt(0).toUpperCase()}${side.slice(1)}`;
}

function formatConfidence(values: BestSideSegment["confidenceType"][]): string {
  return values.includes("limited-data") ? "Some sections are early guidance based on limited reports." : "Prepared as Rallii editorial guidance.";
}
