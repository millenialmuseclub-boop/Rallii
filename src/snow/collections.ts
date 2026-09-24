import { snowDestinations } from "./data";
const picks = (...slugs: string[]) => slugs.flatMap(slug => snowDestinations.filter(item => item.slug === slug));
export const snowCollections = [
  { title: "Mountain-town weekends", description: "A town base, one mountain sector at a time and an afternoon beyond the lifts. Keep travel day flexible.", items: picks("park-city", "whistler-blackcomb", "aspen-snowmass", "chamonix") },
  { title: "First ski trip", description: "Start with a booked lesson and a confirmed learning area. These guides explain base logistics; the whole mountain is not beginner terrain.", items: picks("whistler-blackcomb", "lake-louise", "falls-creek", "coronet-peak") },
  { title: "Advanced terrain", description: "Steeper ambitions need current maps and local judgment. A resort guide is not permission to enter uncontrolled terrain.", items: picks("revelstoke", "jackson-hole", "chamonix", "niseko-united") },
  { title: "Family time", description: "Keep lessons, rentals and meeting points close together. Check age requirements and non-ski options before choosing a base.", items: picks("aspen-snowmass", "falls-creek", "park-city", "whistler-blackcomb") },
  { title: "Après & village life", description: "Leave room for food and a village afternoon. The destination guide includes off-mountain notes alongside skiing.", items: picks("niseko-united", "chamonix", "zermatt", "park-city") },
  { title: "Scenic rail + snow", description: "Zermatt pairs a rail arrival with a mountain village. Plan onward trains, luggage and sightseeing tickets separately from ski access.", items: picks("zermatt") },
  { title: "Midwinter snow", description: "Winter character, never a powder promise. Choose your dates using the seasonal notes, then check the mountain’s current report.", items: picks("niseko-united", "revelstoke", "banff-sunshine", "jackson-hole") },
  { title: "Southern winter", description: "Shift the calendar: July–September is an editorial starting window for these southern destinations. Wind and snow cover decide actual access.", items: snowDestinations.filter(item => item.bestMonths.includes(8)) },
];
