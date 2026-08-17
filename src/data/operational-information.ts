import type { OperationalInformation } from "@/types/intelligence";
import type { RailRoute } from "@/types/route";

export function getOperationalInformation(route: RailRoute): OperationalInformation[] {
  const sourceIds = route.sources.filter((source) => source.category === "operator" || source.category === "infrastructure").map((source) => source.id);
  return route.journeyInformation.map((item) => ({ id: item.id, label: item.label, detail: item.detail, sourceIds, status: /current|season|ticket|reservation|service|2026/i.test(`${item.label} ${item.detail}`) ? "changeable" : "stable", confidence: sourceIds.length ? "editorial" : "limited-data" }));
}
