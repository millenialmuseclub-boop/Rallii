"use client";

import { getViewSide } from "@/lib/route-direction";
import type { JourneyDirection, Landmark } from "@/types/route";

export function JourneyHighlights({ landmarks, direction, onSelectLandmark }: { landmarks: Landmark[]; direction: JourneyDirection; onSelectLandmark: (id: string) => void }) {
  const highlights = landmarks.filter((item) => item.importance !== "normal").slice(0, 4);
  return (
    <section className="section-space scroll-section" id="highlights" aria-labelledby="highlights-title">
      <p className="eyebrow">Look out for</p>
      <h2 id="highlights-title" className="mt-2 font-serif text-4xl sm:text-5xl">Journey Highlights</h2>
      <div className="mt-8 grid gap-px bg-stone-300 sm:grid-cols-2">
        {highlights.map((landmark) => {
          const side = getViewSide(landmark.bestSideForward, landmark.bestSideReverse, direction);
          return (
          <button className="highlight-card focus-ring" key={landmark.id} type="button" onClick={() => onSelectLandmark(landmark.id)}>
            <span className="timeline-label">{landmark.importance === "dont-miss" ? "Don’t miss" : "Journey highlight"} · {Math.round(landmark.distanceAlongRouteKm)} km</span>
            <span className="mt-2 block font-serif text-2xl">{landmark.name}</span>
            <span className="mt-3 block text-sm leading-6 text-stone-600">{landmark.shortDescription}</span>
            {side !== "unknown" ? <span className="mt-4 block text-xs font-semibold text-accent">View: {formatSide(side)}</span> : null}
          </button>
        );})}
      </div>
    </section>
  );
}

function formatSide(side: Landmark["bestSideForward"]): string {
  return side === "both" ? "both sides" : side;
}
