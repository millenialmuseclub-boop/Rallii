import type { MtbDestination } from "./types";
export function matchesMtbPlan(item: MtbDestination, values: URLSearchParams) {
  const region = values.get("region"), skill = values.get("skill"), kind = values.get("kind"), terrain = values.get("terrain"), access = values.get("access");
  const words: Record<string, RegExp> = { Flow: /flow|berm/i, Technical: /technical|roots|rock slab/i, Forest: /forest|wood/i, Desert: /desert|sandstone/i, Alpine: /alpine|high.country/i };
  return (!region || item.region === region) && (!skill || item.skills.some(value => value === skill)) && (!kind || item.kind === kind)
    && (!terrain || !!words[terrain]?.test(`${item.terrain} ${item.summary} ${item.sections.join(" ")}`))
    && (!access || (access === "Lift-assisted" ? /lift-assisted|lift-served|uplift/i.test(item.character) : /pedal|climb|cross.country/i.test(item.character)));
}
