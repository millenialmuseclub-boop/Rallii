"use client";

import { useCallback, useMemo, useState } from "react";
import { BestSideToSit } from "@/components/best-side-to-sit";
import { JourneyHighlights } from "@/components/journey-highlights";
import { RouteMap } from "@/components/route-map";
import { ScenicTimeline } from "@/components/scenic-timeline";
import { getDirectionalEndpoints, getDirectionalLandmarks, getDirectionalStops, getDirectionalTimeline } from "@/lib/route-direction";
import type { JourneyDirection, RailRoute } from "@/types/route";

interface RouteExperienceProps {
  route: RailRoute;
  direction: JourneyDirection;
}

export function RouteExperience({ route, direction }: RouteExperienceProps) {
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>();
  const selectLandmark = useCallback((landmarkId: string) => setSelectedLandmarkId(landmarkId), []);
  const endpoints = useMemo(() => getDirectionalEndpoints(route, direction), [route, direction]);
  const stops = useMemo(() => getDirectionalStops(route, direction), [route, direction]);
  const landmarks = useMemo(() => getDirectionalLandmarks(route, direction), [route, direction]);
  const timeline = useMemo(() => getDirectionalTimeline(route, direction), [route, direction]);

  return (
    <>
      <BestSideToSit route={route} direction={direction} />

      <section className="section-space scroll-section" id="route" aria-labelledby="route-map-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore the route</p>
            <h2 id="route-map-title" className="mt-2 font-serif text-3xl sm:text-4xl">Interactive Route Map</h2>
          </div>
          <p className="hidden text-xs text-stone-600 sm:block">Pan and zoom to explore</p>
        </div>
        <div className="journey-explorer">
          <div className="journey-explorer__map"><RouteMap routeName={route.summary.name} originName={endpoints.origin} geoJsonPath={route.geoJsonPath} stops={stops} landmarks={landmarks} direction={direction} selectedLandmarkId={selectedLandmarkId} onSelectLandmark={selectLandmark} /><p className="mt-3 text-sm leading-6 text-stone-600">From {endpoints.origin} to {endpoints.destination}, via {stops.slice(1, -1).map((stop) => stop.name).join(", ")}.</p></div>
          <ScenicTimeline origin={endpoints.origin} destination={endpoints.destination} durationMinutes={route.summary.durationMinutes} entries={timeline} stops={stops} selectedLandmarkId={selectedLandmarkId} onSelectLandmark={selectLandmark} />
        </div>
      </section>

      <JourneyHighlights landmarks={landmarks} direction={direction} onSelectLandmark={selectLandmark} />
    </>
  );
}
