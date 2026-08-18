"use client";

import * as maplibregl from "maplibre-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { getViewSide } from "@/lib/route-direction";
import type { JourneyDirection, Landmark, RouteStop, ViewSide } from "@/types/route";

interface RouteMapProps {
  routeName: string;
  originName: string;
  destinationName: string;
  geoJsonPath: string;
  stops: RouteStop[];
  landmarks: Landmark[];
  direction: JourneyDirection;
  selectedLandmarkId?: string;
  onSelectLandmark: (landmarkId: string) => void;
}

type RouteCoordinate = [number, number];

interface RouteGeoJson {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: Record<string, unknown>;
    geometry: { type: "LineString"; coordinates: RouteCoordinate[] };
  }>;
}

export function RouteMap({
  routeName,
  originName,
  destinationName,
  geoJsonPath,
  stops,
  landmarks,
  direction,
  selectedLandmarkId,
  onSelectLandmark,
}: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map>(null);
  const landmarkMarkersRef = useRef(new Map<string, maplibregl.Marker>());
  const stopMarkersRef = useRef<maplibregl.Marker[]>([]);
  const routeBoundsRef = useRef<maplibregl.LngLatBounds | undefined>(undefined);
  const [error, setError] = useState<string>();
  const [ready, setReady] = useState(false);
  const [showStations, setShowStations] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(true);

  const fitRoute = useCallback(() => {
    if (mapRef.current && routeBoundsRef.current) mapRef.current.fitBounds(routeBoundsRef.current, { padding: 46, maxZoom: 11, duration: 500 });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;
    let markersAdded = false;
    const landmarkMarkers = landmarkMarkersRef.current;
    const geometryPromise = fetch(geoJsonPath).then(async (response) => {
      if (!response.ok) throw new Error(`Route geometry returned ${response.status}.`);
      return (await response.json()) as RouteGeoJson;
    });
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [8.75, 46.5],
      zoom: 6.5,
      maxZoom: 15,
      pitchWithRotate: false,
      renderWorldCopies: false,
      attributionControl: false,
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(
      new maplibregl.AttributionControl({ compact: true, customAttribution: "Route data © OpenStreetMap contributors" }),
      "bottom-right",
    );

    const renderRoute = async () => {
      try {
        applyEditorialBaseStyle(map);
        const geoJson = await geometryPromise;
        const coordinates = geoJson.features[0]?.geometry.coordinates;
        if (!coordinates?.length) throw new Error("Route geometry is empty.");
        if (disposed) return;

        if (!map.getSource("route")) {
          map.addSource("route", { type: "geojson", data: geoJson });
          map.addLayer({
            id: "route-halo",
            type: "line",
            source: "route",
            paint: { "line-color": "#d9f0e0", "line-width": 13, "line-opacity": 0.8, "line-blur": 2 },
          });
          map.addLayer({
            id: "route-outline",
            type: "line",
            source: "route",
            paint: { "line-color": "#0d4c3c", "line-width": 6, "line-opacity": 0.98 },
          });
          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            paint: { "line-color": "#f2c878", "line-width": 1.5, "line-opacity": 1 },
          });
        }

        const bounds = coordinates.reduce(
          (routeBounds, coordinate) => routeBounds.extend(coordinate),
          new maplibregl.LngLatBounds(coordinates[0], coordinates[0]),
        );
        routeBoundsRef.current = bounds;
        map.fitBounds(bounds, { padding: 42, maxZoom: 11, duration: 0 });

        if (markersAdded) return;
        markersAdded = true;

        stops.forEach((stop, index) => {
          const endpoint = index === 0 || index === stops.length - 1;
          const marker = document.createElement("button");
          marker.type = "button";
          marker.className = endpoint ? `route-marker route-marker--endpoint route-marker--${index === 0 ? "departure" : "arrival"}` : "route-marker";
          marker.dataset.kind = endpoint ? (index === 0 ? "Departure" : "Arrival") : "Station";
          marker.setAttribute("aria-label", stop.name);
          marker.title = stop.name;
          const stopMarker = new maplibregl.Marker({ element: marker })
            .setLngLat([stop.longitude, stop.latitude])
            .setPopup(new maplibregl.Popup({ offset: 12 }).setText(stop.name))
            .addTo(map);
          stopMarkersRef.current.push(stopMarker);
        });

        landmarks.forEach((landmark) => {
          const markerElement = document.createElement("button");
          markerElement.type = "button";
          markerElement.className = "landmark-marker";
          markerElement.dataset.kind = "Scenic moment";
          markerElement.setAttribute("aria-label", `View ${landmark.name}`);
          markerElement.addEventListener("click", () => onSelectLandmark(landmark.id));

          const popupContent = document.createElement("div");
          popupContent.className = "landmark-popup";
          const title = document.createElement("strong");
          title.textContent = landmark.name;
          const description = document.createElement("p");
          description.textContent = landmark.shortDescription;
          const side = document.createElement("span");
          side.textContent = `View from ${originName}: ${formatSide(getViewSide(landmark.bestSideForward, landmark.bestSideReverse, direction))}`;
          const distance = document.createElement("small");
          distance.textContent = `${Math.round(landmark.distanceAlongRouteKm)} km from ${originName} · Select the matching timeline moment below`;
          popupContent.append(title, description, distance, side);

          const mapMarker = new maplibregl.Marker({ element: markerElement })
            .setLngLat([landmark.longitude, landmark.latitude])
            .setPopup(new maplibregl.Popup({ offset: 16, maxWidth: "260px", closeButton: false }).setDOMContent(popupContent))
            .addTo(map);
          landmarkMarkers.set(landmark.id, mapMarker);
        });
        setReady(true);
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : "The route map could not load.");
      }
    };

    map.on("style.load", renderRoute);
    if (map.isStyleLoaded()) void renderRoute();

    map.on("error", (event) => {
      if (!disposed && event.error) setError("The map background could not load. Route details remain available below.");
    });

    return () => {
      disposed = true;
      landmarkMarkers.clear();
      stopMarkersRef.current = [];
      routeBoundsRef.current = undefined;
      mapRef.current = null;
      map.remove();
    };
  }, [direction, geoJsonPath, landmarks, onSelectLandmark, originName, stops]);

  useEffect(() => { stopMarkersRef.current.forEach((marker) => { marker.getElement().hidden = !showStations; }); }, [ready, showStations]);
  useEffect(() => { landmarkMarkersRef.current.forEach((marker) => { marker.getElement().hidden = !showLandmarks; }); }, [ready, showLandmarks]);

  useEffect(() => {
    if (!selectedLandmarkId) return;
    const landmark = landmarks.find((item) => item.id === selectedLandmarkId);
    const marker = landmarkMarkersRef.current.get(selectedLandmarkId);
    const map = mapRef.current;
    if (!landmark || !marker || !map) return;

    for (const [id, candidate] of landmarkMarkersRef.current) {
      candidate.getElement().classList.toggle("landmark-marker--selected", id === selectedLandmarkId);
      if (id !== selectedLandmarkId && candidate.getPopup().isOpen()) candidate.togglePopup();
    }
    map.flyTo({ center: [landmark.longitude, landmark.latitude], zoom: Math.max(map.getZoom(), 9), duration: 800 });
    if (!marker.getPopup().isOpen()) marker.togglePopup();
  }, [landmarks, selectedLandmarkId]);

  return (
    <div className={`route-map-frame${showStations ? "" : " route-map-frame--hide-stations"}${showLandmarks ? "" : " route-map-frame--hide-landmarks"}`}>
      <div
        ref={containerRef}
        role="region"
        aria-label={`Interactive map of the ${routeName} route`}
        className="route-map-canvas"
      />
      {ready ? <div className="map-tools" aria-label="Map display controls"><button type="button" onClick={fitRoute}>Fit route</button><button type="button" aria-pressed={showStations} onClick={() => setShowStations((value) => !value)}>{showStations ? "Stations on" : "Stations off"}</button><button type="button" aria-pressed={showLandmarks} onClick={() => setShowLandmarks((value) => !value)}>{showLandmarks ? "Landmarks on" : "Landmarks off"}</button></div> : null}
      {ready ? <div className="route-map-legend" aria-label="Map legend"><span><i className="route-map-legend__start" />{originName}</span><b aria-hidden="true">→</b><span><i className="route-map-legend__finish" />{destinationName}</span><small>{landmarks.length} scenic moments</small></div> : null}
      {!ready && !error ? <div className="map-preparing" role="status"><span>Preparing the route</span></div> : null}
      {error ? (
        <p className="absolute bottom-3 left-3 right-3 bg-stone-950/85 px-3 py-2 text-sm text-white" role="status">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function applyEditorialBaseStyle(map: maplibregl.Map): void {
  const paint = (
    layerId: string,
    property: Parameters<maplibregl.Map["setPaintProperty"]>[1],
    value: Parameters<maplibregl.Map["setPaintProperty"]>[2],
  ) => {
    if (map.getLayer(layerId)) map.setPaintProperty(layerId, property, value);
  };

  paint("background", "background-color", "#e9e5da");
  paint("natural_earth", "raster-saturation", -0.45);
  paint("natural_earth", "raster-contrast", 0.08);
  paint("park", "fill-color", "#cdddc7");
  paint("landcover_wood", "fill-color", "#b9d0b7");
  paint("landcover_grass", "fill-color", "#d6e1ca");
  paint("landcover_ice", "fill-color", "#e7eef0");
  paint("water", "fill-color", "#a8c5cb");
  paint("waterway_river", "line-color", "#8fb5c0");
  paint("building", "fill-color", "#e4ddd1");
  paint("road_minor", "line-color", "#ded8cd");
  paint("road_secondary_tertiary", "line-color", "#d4cfc4");
  paint("road_trunk_primary", "line-color", "#cec7bb");
  paint("road_major_rail", "line-color", "#6d8678");
  paint("road_major_rail", "line-opacity", 0.72);
  paint("bridge_major_rail", "line-color", "#6d8678");
  paint("tunnel_major_rail", "line-color", "#6d8678");
  ["label_other", "label_village", "label_town", "label_city", "label_city_capital", "label_country_1", "label_country_2", "label_country_3"].forEach((layerId) => {
    paint(layerId, "text-color", "#33453b");
    paint(layerId, "text-halo-color", "#f5f1e7");
    paint(layerId, "text-halo-width", 1.2);
  });
}

function formatSide(side: ViewSide): string {
  if (side === "both") return "both sides";
  return side;
}
