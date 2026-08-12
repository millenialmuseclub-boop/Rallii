"use client";

import type { RouteStop, RouteSummary, ScenicTimelineEntry } from "@/types/route";

interface ScenicTimelineProps {
  entries: ScenicTimelineEntry[];
  summary: RouteSummary;
  stops: RouteStop[];
  selectedLandmarkId?: string;
  onSelectLandmark: (landmarkId: string) => void;
}

type JourneyMoment =
  | { id: string; distance: number; kind: "endpoint" | "stop"; title: string; label: string }
  | { id: string; distance: number; kind: "landmark"; title: string; label: string; description: string; landmarkId: string; bestSide?: string };

export function ScenicTimeline({ entries, summary, stops, selectedLandmarkId, onSelectLandmark }: ScenicTimelineProps) {
  const moments = buildMoments(entries, stops);

  return (
    <section className="section-space scroll-section" id="timeline" aria-labelledby="timeline-title">
      <p className="eyebrow">Scenic journey timeline</p>
      <h2 id="timeline-title" className="mt-2 font-serif text-4xl sm:text-5xl">Along the Journey</h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-stone-600">
        A calm guide to the moments worth looking up for, arranged from {summary.origin} to {summary.destination}.
      </p>

      <ol className="timeline mt-9">
        {moments.map((moment) => {
          const selected = moment.kind === "landmark" && moment.landmarkId === selectedLandmarkId;
          return (
            <li className="timeline-item" key={moment.id}>
              <span className={`timeline-dot${selected ? " timeline-dot--selected" : ""}`} aria-hidden="true" />
              {moment.kind === "landmark" ? (
                <button
                  className={`timeline-content focus-ring${selected ? " timeline-content--selected" : ""}`}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelectLandmark(moment.landmarkId)}
                >
                  <span className="timeline-label">{moment.label}</span>
                  <span className="mt-1 block font-serif text-2xl">{moment.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-stone-600">{moment.description}</span>
                  {moment.bestSide ? <span className="mt-3 block text-xs font-semibold text-accent">Look {moment.bestSide}</span> : null}
                </button>
              ) : (
                <div className="timeline-content">
                  <span className="timeline-label">{moment.label}</span>
                  <span className="mt-1 block font-serif text-xl">{moment.title}</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function buildMoments(entries: ScenicTimelineEntry[], stops: RouteStop[]): JourneyMoment[] {
  const first = stops[0];
  const last = stops.at(-1);
  const majorStop = stops.find((stop, index) => index > 0 && index < stops.length - 1 && stop.shortDescription && !entries.some((entry) => Math.abs(entry.distanceAlongRouteKm - stop.distanceAlongRouteKm) < 0.2));
  const moments: JourneyMoment[] = entries.map((entry) => ({
    id: entry.id,
    distance: entry.distanceAlongRouteKm,
    kind: "landmark",
    title: entry.subtitle ?? entry.title,
    label: entry.importance === "dont-miss" ? "Don’t miss" : "Scenic section",
    description: entry.shortDescription,
    landmarkId: entry.relatedLandmarkId ?? "",
    bestSide: entry.bestSide && entry.bestSide !== "unknown" ? entry.bestSide : undefined,
  }));

  if (first) moments.push({ id: first.id, distance: first.distanceAlongRouteKm, kind: "endpoint", title: first.name, label: "Departure" });
  if (majorStop) moments.push({ id: majorStop.id, distance: majorStop.distanceAlongRouteKm, kind: "stop", title: majorStop.name, label: "Major stop" });
  if (last) moments.push({ id: last.id, distance: last.distanceAlongRouteKm, kind: "endpoint", title: last.name, label: "Arrival" });
  return moments.sort((a, b) => a.distance - b.distance);
}
