"use client";

import { useCallback, useState } from "react";
import { BestSideToSit } from "@/components/best-side-to-sit";
import { RouteMap } from "@/components/route-map";
import { ScenicTimeline } from "@/components/scenic-timeline";
import type { RailRoute } from "@/types/route";

interface RouteExperienceProps {
  route: RailRoute;
}

export function RouteExperience({ route }: RouteExperienceProps) {
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>();
  const selectLandmark = useCallback((landmarkId: string) => setSelectedLandmarkId(landmarkId), []);

  return (
    <>
      <BestSideToSit summary={route.summary} segments={route.bestSideSegments} landmarks={route.landmarks} />

      <section className="section-space" aria-labelledby="route-map-title">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Explore the route</p>
            <h2 id="route-map-title" className="mt-2 font-serif text-3xl sm:text-4xl">Interactive Route Map</h2>
          </div>
          <p className="hidden text-xs text-stone-600 sm:block">Pan and zoom to explore</p>
        </div>
        <RouteMap
          routeName={route.summary.name}
          geoJsonPath={route.geoJsonPath}
          stops={route.stops}
          landmarks={route.landmarks}
          selectedLandmarkId={selectedLandmarkId}
          onSelectLandmark={selectLandmark}
        />
        <p className="mt-3 text-sm leading-6 text-stone-600">
          From {route.summary.origin} to {route.summary.destination}, via {route.stops.slice(1, -1).map((stop) => stop.name).join(", ")}.
        </p>
      </section>

      <ScenicTimeline
        entries={route.timelineEntries}
        stops={route.stops}
        selectedLandmarkId={selectedLandmarkId}
        onSelectLandmark={selectLandmark}
      />
    </>
  );
}
