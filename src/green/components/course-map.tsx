"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CourseVisual } from "@/green/components/course-visual";
import { coursesToFeatureCollection } from "@/green/lib/course-geojson";
import type { Course } from "@/green/types/course";
import type { GeoJSONSource, Map as MapLibreMap, MapMouseEvent } from "maplibre-gl";

export function CourseMap({ courses, height = "large" }: { courses: Course[]; height?: "large" | "small" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Course>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!ref.current || !courses.length) return;
    let disposed = false;
    let map: MapLibreMap | undefined;
    const features = coursesToFeatureCollection(courses);

    void import("maplibre-gl").then((maplibregl) => {
      if (disposed || !ref.current) return;
      map = new maplibregl.Map({ container: ref.current, style: "https://tiles.openfreemap.org/styles/liberty", center: [courses[0].location.longitude, courses[0].location.latitude], zoom: courses.length === 1 ? 10 : 2.2, maxZoom: 15, pitchWithRotate: false, renderWorldCopies: false, attributionControl: false });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
      map.on("load", () => {
        if (!map) return;
        setLoading(false);
        setError(false);
        map.addSource("courses", { type: "geojson", data: features, cluster: courses.length > 1, clusterMaxZoom: 10, clusterRadius: 54 });
        map.addLayer({ id: "course-clusters", type: "circle", source: "courses", filter: ["has", "point_count"], paint: { "circle-color": "#173f32", "circle-radius": ["step", ["get", "point_count"], 18, 10, 23, 25, 29], "circle-stroke-width": 2, "circle-stroke-color": "#fbf9f3" } });
        map.addLayer({ id: "cluster-count", type: "symbol", source: "courses", filter: ["has", "point_count"], layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 12 }, paint: { "text-color": "#ffffff" } });
        map.addLayer({ id: "course-points", type: "circle", source: "courses", filter: ["!", ["has", "point_count"]], paint: { "circle-color": "#1d6049", "circle-radius": 8, "circle-stroke-width": 3, "circle-stroke-color": "#ffffff" } });
        const bounds = new maplibregl.LngLatBounds();
        courses.forEach((course) => bounds.extend([course.location.longitude, course.location.latitude]));
        if (courses.length > 1) map.fitBounds(bounds, { padding: 54, maxZoom: 8, duration: 0 });
      });
      map.on("click", "course-clusters", async (event: MapMouseEvent) => {
        const feature = map?.queryRenderedFeatures(event.point, { layers: ["course-clusters"] })[0];
        const clusterId = Number(feature?.properties?.cluster_id);
        const source = map?.getSource("courses") as GeoJSONSource | undefined;
        if (!source || !Number.isFinite(clusterId)) return;
        const zoom = await source.getClusterExpansionZoom(clusterId);
        const coordinates = (feature?.geometry as { coordinates?: [number, number] })?.coordinates;
        if (coordinates) map?.easeTo({ center: coordinates, zoom });
      });
      map.on("click", "course-points", (event: MapMouseEvent) => {
        const feature = map?.queryRenderedFeatures(event.point, { layers: ["course-points"] })[0];
        const course = courses.find((item) => item.slug === feature?.properties?.slug);
        if (!disposed && course) setSelected(course);
      });
      for (const layer of ["course-clusters", "course-points"]) {
        map.on("mouseenter", layer, () => { if (map) map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", layer, () => { if (map) map.getCanvas().style.cursor = ""; });
      }
      map.on("error", () => { if (!disposed) setError(true); });
    }).catch(() => { if (!disposed) setError(true); });

    return () => { disposed = true; map?.remove(); };
  }, [courses, retryKey]);

  return <div className={`map-frame map-frame--${height}`}><div ref={ref} className="map-canvas" role="region" aria-label={`Map showing ${courses.length} golf courses`} />{loading && !error ? <div className="map-error" role="status"><b>Preparing the map</b><span>Plotting {courses.length} courses…</span></div> : null}{selected ? <article className="map-card"><button type="button" aria-label="Close course preview" onClick={() => setSelected(undefined)}>×</button><CourseVisual course={selected} compact /><div className="map-card__copy"><p className="eyebrow">{selected.location.region}</p><h3>{selected.name}</h3><p>{selected.editorial.headline}</p><div><Link href={`/green/courses/${selected.slug}`}>Course profile →</Link><Link href={`/green/plan?course=${selected.slug}`}>Plan →</Link></div></div></article> : null}{error ? <div className="map-error" role="status"><b>Map unavailable</b><span>Use the accessible course list below; no course information is lost.</span><button type="button" onClick={() => { setError(false); setLoading(true); setRetryKey((value) => value + 1); }}>Try map again</button></div> : null}</div>;
}
