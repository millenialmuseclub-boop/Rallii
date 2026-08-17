"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RideMap } from "@/components/ride-map";
import { getScenicMoments } from "@/data/scenic-moments";
import { useEntitlements } from "@/hooks/use-entitlements";
import { formatAheadDistance, formatRideSide, getMatchConfidence } from "@/lib/ride-guidance";
import { getDirectionalEndpoints } from "@/lib/route-direction";
import { interpolateRouteCoordinate, projectCoordinateOntoRoute, routeLengthKm, type RouteCoordinate } from "@/lib/route-geometry";
import { getDirectionalScenicMoments, getForegroundScenicAlert, getUpcomingScenicMoment } from "@/lib/scenic-alerts";
import type { JourneyDirection, RailRoute } from "@/types/route";

type Mode = "landing" | "location" | "demo";
interface RouteGeoJson { features: Array<{ geometry: { coordinates: RouteCoordinate[] } }> }

export function RideMode({ route, initialDirection = "forward" }: { route: RailRoute; initialDirection?: JourneyDirection }) {
  const entitlements = useEntitlements();
  const [geometry, setGeometry] = useState<RouteCoordinate[]>();
  const [mode, setMode] = useState<Mode>("landing");
  const [direction, setDirection] = useState<JourneyDirection>(initialDirection);
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState<RouteCoordinate>();
  const [distanceFromRoute, setDistanceFromRoute] = useState(0);
  const [status, setStatus] = useState("");
  const [alertId, setAlertId] = useState<string>();
  const watchId = useRef<number | undefined>(undefined);
  const previousCanonicalProgress = useRef<number | undefined>(undefined);
  const firedAlertIds = useRef(new Set<string>());

  useEffect(() => {
    fetch(route.geoJsonPath).then((response) => response.json()).then((data: RouteGeoJson) => setGeometry(data.features[0]?.geometry.coordinates)).catch(() => setStatus("The prepared route could not be loaded."));
  }, [route.geoJsonPath]);

  const stopWatching = useCallback(() => {
    if (watchId.current !== undefined) navigator.geolocation.clearWatch(watchId.current);
    watchId.current = undefined;
  }, []);
  useEffect(() => stopWatching, [stopWatching]);

  const totalKm = geometry ? routeLengthKm(geometry) : route.summary.distanceKm;
  const distanceKm = Math.min(totalKm, totalKm * progress);
  const moments = useMemo(() => getDirectionalScenicMoments(getScenicMoments(route), totalKm, direction), [route, totalKm, direction]);
  const upcoming = getUpcomingScenicMoment(moments, distanceKm);
  const activeAlert = moments.find((moment) => moment.id === alertId);
  const endpoints = getDirectionalEndpoints(route, direction);
  const landmarkId = upcoming?.placeId?.split(":").at(-1);
  const landmark = landmarkId ? route.landmarks.find((item) => item.id === landmarkId) : undefined;
  const arrived = progress >= 0.995;

  function considerAlert(nextProgress: number, nextDirection: JourneyDirection, allowPreview: boolean) {
    if (!route.capabilities.scenicAlerts || (!entitlements.canUseScenicAlerts && !allowPreview)) return;
    const directional = getDirectionalScenicMoments(getScenicMoments(route), totalKm, nextDirection);
    const alert = getForegroundScenicAlert(directional, totalKm * nextProgress, firedAlertIds.current);
    if (!alert) return;
    firedAlertIds.current.add(alert.id);
    setAlertId(alert.id);
  }

  function startDemo() {
    stopWatching();
    if (!geometry) return setStatus("The prepared route is still loading.");
    firedAlertIds.current.clear(); setAlertId(undefined); setMode("demo"); setProgress(0);
    setPosition(interpolateRouteCoordinate(geometry, direction === "forward" ? 0 : 1));
    setStatus("Demo Mode previews the prepared journey without using your location.");
  }

  function updateDemo(value: number) {
    if (!geometry) return;
    setProgress(value); setPosition(interpolateRouteCoordinate(geometry, direction === "forward" ? value : 1 - value));
    considerAlert(value, direction, true);
  }

  function useLocation() {
    if (!geometry) return setStatus("The prepared route is still loading.");
    if (!("geolocation" in navigator)) return setStatus("Location is not supported by this browser. Try Demo Mode instead.");
    stopWatching(); firedAlertIds.current.clear(); setAlertId(undefined); setMode("location"); setStatus("Waiting for your location…");
    watchId.current = navigator.geolocation.watchPosition(({ coords }) => {
      const projection = projectCoordinateOntoRoute([coords.longitude, coords.latitude], geometry);
      const prior = previousCanonicalProgress.current;
      const detectedDirection = prior !== undefined && Math.abs(projection.progress - prior) > 0.0002 ? (projection.progress >= prior ? "forward" : "reverse") : direction;
      previousCanonicalProgress.current = projection.progress;
      const journeyProgress = detectedDirection === "forward" ? projection.progress : 1 - projection.progress;
      setDirection(detectedDirection); setPosition(projection.nearestCoordinate); setDistanceFromRoute(projection.distanceFromRouteMeters); setProgress(journeyProgress);
      const confidence = getMatchConfidence(projection.distanceFromRouteMeters);
      setStatus(confidence === "on-route" ? `You’re matched to ${route.summary.name}.` : confidence === "near-route" ? `You appear to be near ${route.summary.name}; progress is approximate.` : `You don’t appear to be near ${route.summary.name}.`);
      considerAlert(journeyProgress, detectedDirection, false);
    }, (error) => {
      setMode("landing");
      setStatus(error.code === error.PERMISSION_DENIED ? "Location access is off. Try Demo Mode or enable location and try again." : "We couldn’t determine your location. Try again or use Demo Mode.");
    }, { enableHighAccuracy: true, timeout: 12_000, maximumAge: 5_000 });
  }

  function switchDirection(next: JourneyDirection) {
    if (next === direction) return;
    setDirection(next); setProgress(1 - progress); firedAlertIds.current.clear(); setAlertId(undefined);
  }

  function endRide() { stopWatching(); previousCanonicalProgress.current = undefined; setMode("landing"); setPosition(undefined); setProgress(0); setAlertId(undefined); setStatus(""); }

  if (mode === "landing") return <section className="ride-landing"><p className="eyebrow">Ride Mode</p><h2 className="mt-2 font-serif text-4xl">Follow your progress</h2><p className="mt-4 max-w-xl leading-7 text-stone-600">See what’s coming as Rallii compares your location with the prepared {route.summary.name} route.</p><ul className="ride-privacy"><li>Your location stays in this browser.</li><li>No account is required.</li><li>Rallii does not store or transmit your coordinates.</li></ul><div className="ride-direction" aria-label="Journey direction"><button type="button" aria-pressed={direction === "forward"} onClick={() => switchDirection("forward")}>{route.summary.origin} → {route.summary.destination}</button><button type="button" aria-pressed={direction === "reverse"} onClick={() => switchDirection("reverse")}>{route.summary.destination} → {route.summary.origin}</button></div><div className="mt-7 flex flex-wrap gap-3"><button className="cta-button" type="button" onClick={useLocation}>Use My Location</button><button className="action-button" type="button" onClick={startDemo}>Try Demo Mode</button></div>{route.capabilities.scenicAlerts && !entitlements.canUseScenicAlerts ? <p className="ride-pro-note">Live Scenic Alerts are a Pro preview. Demo Mode remains available to try.</p> : null}<p className="mt-5 text-sm text-stone-600" role="status" aria-live="polite">{status}</p></section>;

  const ahead = upcoming ? Math.max(0, upcoming.journeyDistanceKm - distanceKm) : 0;
  return <div className="ride-active"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">{mode === "demo" ? "Demo Mode" : "Ride Mode"}</p><h2 className="mt-2 font-serif text-4xl">You’re on {route.summary.name}</h2></div><button className="action-button" type="button" onClick={endRide}>End Ride Mode</button></div><p className="mt-4 text-sm text-stone-600" role="status" aria-live="polite">{status}</p>{activeAlert ? <section className="scenic-alert" role="alert" aria-live="assertive"><p className="eyebrow">Scenic alert · Look soon</p><h3>{activeAlert.title}</h3><p>{activeAlert.description}</p><button type="button" onClick={() => setAlertId(undefined)}>Dismiss</button></section> : null}{position ? <RideMap geoJsonPath={route.geoJsonPath} endpoints={[route.stops[0], route.stops.at(-1)!]} position={position} upcoming={landmark} /> : null}<section className="ride-progress" aria-labelledby="progress-title"><p className="eyebrow">Your journey</p><h3 id="progress-title" className="sr-only">Journey progress</h3><div className="ride-progress-labels"><span>{endpoints.origin}</span><span>{endpoints.destination}</span></div><div className="ride-progress-track"><span style={{ width: `${progress * 100}%` }} /></div><p><strong>About {distanceKm.toFixed(1)} km of {totalKm.toFixed(1)} km</strong> · {Math.round(progress * 100)}% of the journey</p>{mode === "location" && distanceFromRoute > 150 ? <p className="mt-2 text-xs text-stone-500">Position match is approximate.</p> : null}</section>{arrived ? <section className="ride-up-next ride-up-next--now"><p className="eyebrow">{endpoints.destination}</p><h3 className="mt-2 font-serif text-4xl">You’ve reached the end of the journey.</h3><Link className="primary-link mt-6" href={`/routes/${route.summary.slug}?direction=${direction}`}>View journey →</Link></section> : upcoming ? <section className={`ride-up-next${ahead <= upcoming.leadDistanceKm ? " ride-up-next--now" : ""}`}><p className="eyebrow">{ahead <= upcoming.leadDistanceKm ? "Look soon" : "Up next"}</p><h3 className="mt-2 font-serif text-4xl">{upcoming.title}</h3><p className="mt-3 text-sm font-semibold text-stone-600">{formatAheadDistance(ahead)}</p><p className="mt-4 max-w-xl text-sm leading-6 text-stone-600">{upcoming.description}</p><p className="mt-5 text-xl font-semibold text-accent">{formatRideSide(upcoming.viewingSide ?? "unknown")}</p></section> : null}{mode === "demo" ? <section className="ride-demo-control"><label htmlFor="demo-progress">Demo progress <strong>{Math.round(progress * 100)}%</strong></label><input id="demo-progress" type="range" min="0" max="100" value={Math.round(progress * 100)} onChange={(event) => updateDemo(Number(event.target.value) / 100)} /><div><span>{endpoints.origin}</span><span>{endpoints.destination}</span></div></section> : null}</div>;
}
