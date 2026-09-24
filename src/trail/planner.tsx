"use client";
import { OutdoorPlanner } from "@/components/outdoor-planner";
import { trails } from "./data";
import { TrailCard } from "./trail-card";
import { matchesTrailPlan } from "./trip-planning";

export function TrailPlanner() {
  return <OutdoorPlanner mode="trail" title="Trail" items={trails} matches={matchesTrailPlan} fields={[
    { key: "region", label: "Region", options: [...new Set(trails.map(item => item.region))] },
    { key: "difficulty", label: "Difficulty", options: ["Easy", "Moderate", "Strenuous"] },
    { key: "distance", label: "Trail length", options: ["Under 5 km", "5–15 km", "Over 15 km"] },
    { key: "gain", label: "Elevation gain", options: ["Under 300 m", "300–800 m", "Over 800 m"] },
    { key: "shape", label: "Route shape", options: ["Loop", "Out & Back", "Point to Point"] },
    { key: "scenery", label: "Scenery", options: ["Forest", "Coast", "Desert", "Alpine", "Waterfall"] },
  ]} render={item => <TrailCard trail={item}/>} notes={(item, values) => <>
    <p><strong>When:</strong> {item.bestTime}.</p><p><strong>Start:</strong> {item.map.trailhead.name}. {item.guidance}</p>
    <p>{values.get("days") === "Day trip" ? `Allow ${item.duration} for the hike plus travel and breaks.` : `Use ${item.destination} as a starting point for your stay. Keep arrival day flexible and reserve ${item.duration} for this route.`} {item.routeType === "Point to Point" ? "Arrange the return transfer before starting." : "Check trailhead access before leaving your base."}</p>
  </>} />;
}
