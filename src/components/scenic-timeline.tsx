"use client";

import type { RouteStop, ScenicTimelineEntry } from "@/types/route";

interface ScenicTimelineProps {
  entries: ScenicTimelineEntry[];
  origin: string;
  destination: string;
  durationMinutes: number;
  stops: RouteStop[];
  selectedLandmarkId?: string;
  onSelectLandmark: (landmarkId: string) => void;
}

type JourneyMoment =
  | { id: string; distance: number; minutes?: number; kind: "endpoint" | "stop"; title: string; label: string }
  | { id: string; distance: number; minutes?: number; kind: "landmark"; title: string; label: string; description: string; landmarkId: string; bestSide?: string };

export function ScenicTimeline({ entries, origin, destination, durationMinutes, stops, selectedLandmarkId, onSelectLandmark }: ScenicTimelineProps) {
  const moments = buildMoments(entries, stops, durationMinutes);

  return (
    <section className="section-space scroll-section" id="timeline" aria-labelledby="timeline-title">
      <p className="eyebrow">Scenic journey timeline</p>
      <h2 id="timeline-title" className="mt-2 font-serif text-4xl sm:text-5xl">Along the Journey</h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-stone-600">
        A calm guide to the moments worth looking up for, arranged from {origin} to {destination}.
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
                  <span className="timeline-label">{formatMomentLabel(moment)}</span>
                  <span className="mt-1 block font-serif text-2xl">{moment.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-stone-600">{moment.description}</span>
                  {moment.bestSide ? <span className="mt-3 block text-xs font-semibold text-accent">Look {moment.bestSide}</span> : null}
                </button>
              ) : (
                <div className="timeline-content">
                  <span className="timeline-label">{formatMomentLabel(moment)}</span>
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

export function buildMoments(entries: ScenicTimelineEntry[], stops: RouteStop[], durationMinutes: number): JourneyMoment[] {
  const first = stops[0];
  const last = stops.at(-1);
  const majorStop = stops.find((stop, index) => index > 0 && index < stops.length - 1 && stop.shortDescription && !entries.some((entry) => Math.abs(entry.distanceAlongRouteKm - stop.distanceAlongRouteKm) < 0.2));
  const moments: JourneyMoment[] = entries.map((entry) => ({
    id: entry.id,
    distance: entry.distanceAlongRouteKm,
    minutes: entry.approximateJourneyMinutes,
    kind: "landmark",
    title: entry.subtitle ?? entry.title,
    label: entry.importance === "dont-miss" ? "Don’t miss" : entry.type === "station" ? "Major stop" : entry.importance === "highlight" ? "Journey highlight" : "Scenic section",
    description: entry.shortDescription,
    landmarkId: entry.relatedLandmarkId ?? "",
    bestSide: entry.bestSide && entry.bestSide !== "unknown" ? entry.bestSide : undefined,
  }));

  if (first) moments.push({ id: first.id, distance: first.distanceAlongRouteKm, minutes: 0, kind: "endpoint", title: first.name, label: "Departure" });
  if (majorStop) moments.push({ id: majorStop.id, distance: majorStop.distanceAlongRouteKm, kind: "stop", title: majorStop.name, label: "Major stop" });
  if (last) moments.push({ id: last.id, distance: last.distanceAlongRouteKm, minutes: durationMinutes, kind: "endpoint", title: last.name, label: "Arrival" });
  return moments.sort((a, b) => a.distance - b.distance);
}

function formatMomentLabel(moment: JourneyMoment): string {
  const distance = `${Math.round(moment.distance)} km`;
  if (moment.minutes === undefined) return `${moment.label} · ${distance}`;
  const hours = Math.floor(moment.minutes / 60);
  const minutes = moment.minutes % 60;
  const time = hours ? `${hours} hr${minutes ? ` ${minutes} min` : ""}` : `${minutes} min`;
  return `${moment.label} · ${distance} · ${time}`;
}
