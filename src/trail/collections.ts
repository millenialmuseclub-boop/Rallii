import { trails } from "./data";
const scenery = (pattern: RegExp) => trails.filter(item => pattern.test(`${item.tags.join(" ")} ${item.whyGo}`));
export const trailCollections = [
  { title: "Iconic hikes", description: "Big landscapes worth building a day around. Read the full guide for trailhead, effort and access notes.", items: trails.filter(item => item.difficulty === "Moderate") },
  { title: "Short & gentle", description: "Easy routes under five kilometres, with room for pauses. Easy describes the ordinary hiking conditions, not guaranteed accessibility.", items: trails.filter(item => item.difficulty === "Easy" && item.distanceKm < 5) },
  { title: "Coastal air", description: "Ocean views and open headlands. Check wind, tide restrictions and exposed sections before setting off.", items: scenery(/coast|ocean|beach/i) },
  { title: "Forest days", description: "Moss, shade and a slower pace. At Hoh, the Hall of Mosses offers a short loop through old-growth forest.", items: scenery(/forest|moss|woodland/i) },
  { title: "Mountain weekends", description: "Make a base near the mountains and give the hike its own day. Leave room for travel, weather and a gentler second outing.", items: scenery(/alpine|mountain|peak/i) },
  { title: "Desert light", description: "Sandstone, canyons and wide horizons. Plan water and shade carefully; review each guide’s seasonal window before choosing dates.", items: scenery(/desert|sandstone|canyon/i) },
  { title: "A bigger day", description: "Strenuous routes for a deliberate plan: more daylight, more preparation and an honest turnaround time.", items: trails.filter(item => item.difficulty === "Strenuous") },
  { title: "Spring & autumn", description: "Routes whose field notes include a shoulder-season window. Local weather and access still determine the day.", items: trails.filter(item => /spring|autumn|fall/i.test(item.bestTime)) },
];
