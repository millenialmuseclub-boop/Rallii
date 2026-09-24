"use client";
import { OutdoorPlanner } from "@/components/outdoor-planner";
import { mtbDestinations } from "./data";
import { MtbCard } from "./card";
import { matchesMtbPlan } from "./trip-planning";

export function MtbPlanner() {
  return <OutdoorPlanner mode="mtb" title="MTB" items={mtbDestinations} matches={matchesMtbPlan} fields={[
    { key: "region", label: "Region", options: [...new Set(mtbDestinations.map(item => item.region))] },
    { key: "skill", label: "Rider level", options: ["Beginner", "Intermediate", "Advanced"] },
    { key: "kind", label: "Riding style", options: ["Bike park", "Trail system", "Riding region"] },
    { key: "terrain", label: "Terrain", options: ["Flow", "Technical", "Forest", "Desert", "Alpine"] },
    { key: "access", label: "Getting uphill", options: ["Lift-assisted", "Pedal-powered"] },
  ]} render={item => <MtbCard ride={item}/>} notes={(item, values) => <>
    <p><strong>Season:</strong> {item.season}</p><p><strong>Meet the terrain:</strong> {item.terrain}</p>
    <p><strong>Start:</strong> {item.start}. {item.notes}</p><p><strong>Bike:</strong> {item.bike}</p>
    <p>{values.get("days") === "Day trip" ? "Choose one signed route, with time for repairs and the return." : "Keep your first day for setup and a short orientation ride. Add longer days only after checking local grades and access."} Distance and elevation depend on the individual line; use the guide’s named ride options and official map.</p>
  </>} />;
}
