import type { SnowGuide } from "./data";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function matchesSnowPlan(item: SnowGuide, values: URLSearchParams) {
  const region = values.get("region"), month = values.get("month");
  return (!region || item.region === region) && (!month || item.bestMonths.includes(months.indexOf(month) + 1));
}
