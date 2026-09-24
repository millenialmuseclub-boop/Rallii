"use client";
import { OutdoorPlanner } from "@/components/outdoor-planner";
import { snowDestinations } from "./data";
import { SnowCard } from "./card";
import { matchesSnowPlan } from "./trip-planning";
export function SnowPlanner() {
  return <OutdoorPlanner mode="snow" title="Snow" items={snowDestinations} matches={matchesSnowPlan} fields={[
    { key: "region", label: "Region", options: [...new Set(snowDestinations.map(item => item.region))] },
    { key: "month", label: "Travel month", options: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
    { key: "activity", label: "Your trip", options: ["Ski", "Snowboard", "Scenic-only"] },
    { key: "skill", label: "Your experience", options: ["First timer", "Intermediate", "Advanced"] },
    { key: "group", label: "Travelling with", options: ["Family", "Friends", "Solo"] },
    { key: "apres", label: "Après plans", options: ["Quiet evenings", "Food & village time"] },
  ]} render={item => <SnowCard place={item}/>} notes={(item, values) => <>
    <p><strong>Stay:</strong> {item.lodging}. <strong>Travel:</strong> {item.transport}</p>
    <p><strong>Season:</strong> {item.planning?.seasonalNote ?? item.season}</p>
    <p>{values.get("activity") === "Scenic-only" ? "Plan sightseeing separately from ski access. Confirm pedestrian lift tickets and open winter walks; a ski pass is not your itinerary." : values.get("skill") === "First timer" ? `Book a ${values.get("activity") === "Snowboard" ? "snowboard" : "ski"} lesson and rentals at the same base. Confirm the learning area before booking lodging.` : `Choose terrain from the current piste map. ${item.terrain}`}</p>
    {values.get("group") === "Family" ? <p>{item.family}</p> : null}
    <p>{values.get("apres") === "Quiet evenings" ? "Check accommodation location and evening transport before choosing a quieter base." : item.offMountain}</p>
    <p>{values.get("days") === "Day trip" ? "Confirm the last return transfer before buying a day ticket." : "Keep arrival day flexible; build ski or sightseeing days around the weather and allow a rest afternoon."} Activity, experience and group choices tailor these notes; they do not certify terrain suitability.</p>
  </>} />;
}
