import type { Trail } from "./types";
export function matchesTrailPlan(item: Trail, values: URLSearchParams) {
  const region = values.get("region"), difficulty = values.get("difficulty"), distance = values.get("distance"), gain = values.get("gain"), shape = values.get("shape"), scenery = values.get("scenery");
  const words: Record<string, RegExp> = { Forest: /forest|wood|moss/i, Coast: /coast|ocean|beach/i, Desert: /desert|sandstone|canyon/i, Alpine: /alpine|mountain|peak/i, Waterfall: /waterfall|falls/i };
  return (!region || item.region === region) && (!difficulty || item.difficulty === difficulty) && (!shape || item.routeType === shape)
    && (!scenery || !!words[scenery]?.test(item.tags.join(" ") + " " + item.whyGo))
    && (!distance || (distance === "Under 5 km" ? item.distanceKm < 5 : distance === "5–15 km" ? item.distanceKm >= 5 && item.distanceKm <= 15 : item.distanceKm > 15))
    && (!gain || (item.elevationGainM !== null && (gain === "Under 300 m" ? item.elevationGainM < 300 : gain === "300–800 m" ? item.elevationGainM >= 300 && item.elevationGainM <= 800 : item.elevationGainM > 800)));
}
