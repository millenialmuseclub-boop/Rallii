

"use client";
import * as maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import type { RouteCoordinate } from "@/lib/route-geometry";
import type { Landmark, RouteStop } from "@/types/route";
interface RideMapProps { geoJsonPath: string; endpoints: RouteStop[]; position: RouteCoordinate; upcoming?: Landmark }
interface RideGeoJson { type: "FeatureCollection"; features: Array<{ type: "Feature"; properties: Record<string, unknown>; geometry: { type: "LineString"; coordinates: RouteCoordinate[] } }> }

export function RideMap({ geoJsonPath, endpoints, position, upcoming }: RideMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map>(null);
  const positionMarker = useRef<maplibregl.Marker>(null);
  const upcomingMarker = useRef<maplibregl.Marker>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const origin = endpoints[0], destination = endpoints[1];
  useEffect(() => {
    if (!container.current) return;
    let disposed = false;
    const controller = new AbortController();
    const fail = () => { if (!disposed) setError("The map could not load. Journey progress remains available below."); };
    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({ container: container.current, style: "https://tiles.openfreemap.org/styles/positron", center: [origin.longitude, origin.latitude], zoom: 10, attributionControl: false });
    } catch { void Promise.resolve().then(fail); return () => { disposed = true; }; }
    mapRef.current = map;
    map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: "Route data © OpenStreetMap contributors" }));
    const timeout = window.setTimeout(fail, 15000);
    map.on("error", fail);
    map.on("style.load", async () => {
      try {
        const response = await fetch(geoJsonPath, { signal: controller.signal });
        if (!response.ok) throw new Error("Route unavailable");
        const data = await response.json() as RideGeoJson;
        const coordinates = data.features?.[0]?.geometry?.coordinates;
        if (!coordinates || coordinates.length < 2) throw new Error("Empty route");
        if (disposed || map.getSource("ride-route")) return;
        map.addSource("ride-route", { type: "geojson", data });
        map.addLayer({ id: "ride-route-shadow", type: "line", source: "ride-route", paint: { "line-color": "#f5f1e8", "line-width": 7 } });
        map.addLayer({ id: "ride-route-line", type: "line", source: "ride-route", paint: { "line-color": "#17634a", "line-width": 4 } });
        const bounds = coordinates.reduce((value, coordinate) => value.extend(coordinate), new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));
        map.fitBounds(bounds, { padding: 36, maxZoom: 11, duration: 0 });
        [origin, destination].forEach(stop => {
          const element = document.createElement("span"); element.className = "route-marker route-marker--endpoint"; element.title = stop.name;
          new maplibregl.Marker({ element }).setLngLat([stop.longitude, stop.latitude]).addTo(map);
        });
        window.clearTimeout(timeout); setReady(true);
      } catch { fail(); }
    });
    return () => { disposed = true; controller.abort(); window.clearTimeout(timeout); positionMarker.current = null; upcomingMarker.current = null; mapRef.current = null; map.remove(); };
  }, [destination, geoJsonPath, origin]);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    if (!positionMarker.current) {
      const element = document.createElement("span"); element.className = "ride-position-marker";
      positionMarker.current = new maplibregl.Marker({ element }).setLngLat(position).addTo(map);
    } else positionMarker.current.setLngLat(position);
  }, [position, ready]);
  useEffect(() => {
    const map = mapRef.current;
    if (!upcoming) { upcomingMarker.current?.remove(); upcomingMarker.current = null; return; }
    if (!map || !ready) return;
    if (!upcomingMarker.current) {
      const element = document.createElement("span"); element.className = "ride-upcoming-marker";
      upcomingMarker.current = new maplibregl.Marker({ element }).setLngLat([upcoming.longitude, upcoming.latitude]).addTo(map);
    } else upcomingMarker.current.setLngLat([upcoming.longitude, upcoming.latitude]);
    upcomingMarker.current.getElement().title = upcoming.name;
  }, [ready, upcoming]);
  return <div><div ref={container} className="ride-map" role="region" aria-label="Ride Mode route map showing your approximate position and upcoming highlight" />{error ? <p role="status">{error}</p> : !ready ? <p role="status">Preparing the map…</p> : null}</div>;
}
