import type { RailRoute } from "../types/route.ts";

export type SearchMatchType = "route" | "endpoint" | "geography" | "stop" | "landmark" | "operator" | "journey-type";

export interface RouteSearchResult {
  route: RailRoute;
  matchType: SearchMatchType;
  matchLabel?: string;
}

interface SearchField {
  value: string;
  type: SearchMatchType;
  priority: number;
  label?: string;
}

export function searchRoutes(routes: RailRoute[], rawQuery: string): RouteSearchResult[] {
  const query = normalizeSearchText(rawQuery);
  if (!query) return [];
  const ranked: Array<RouteSearchResult & { score: number }> = [];
  for (const route of routes) {
    const matches = searchableFields(route).map((field) => ({ field, score: scoreField(field, query) })).filter((match) => match.score > 0).sort((a, b) => b.score - a.score);
    const best = matches[0];
    if (best) ranked.push({ route, matchType: best.field.type, matchLabel: best.field.label, score: best.score });
  }
  ranked.sort((a, b) => b.score - a.score || a.route.summary.name.localeCompare(b.route.summary.name));
  return ranked.map((result) => ({ route: result.route, matchType: result.matchType, matchLabel: result.matchLabel }));
}

export function normalizeSearchText(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function searchableFields(route: RailRoute): SearchField[] {
  const { summary } = route;
  return [
    { value: summary.name, type: "route", priority: 700 },
    ...(summary.searchAliases ?? []).map((alias) => ({ value: alias, type: "route" as const, priority: 680, label: summary.name })),
    { value: summary.origin, type: "endpoint", priority: 600, label: `From ${summary.origin}` },
    { value: summary.destination, type: "endpoint", priority: 600, label: `To ${summary.destination}` },
    { value: summary.country, type: "geography", priority: 500, label: summary.country },
    ...summary.countries.map((country) => ({ value: country, type: "geography" as const, priority: 500, label: country })),
    ...route.stops.map((stop) => ({ value: stop.name, type: "stop" as const, priority: 400, label: `Via ${stop.name}` })),
    ...route.landmarks.flatMap((landmark) => [
      { value: landmark.name, type: "landmark" as const, priority: 300, label: `Landmark: ${landmark.name}` },
      { value: landmark.shortDescription, type: "landmark" as const, priority: 280, label: `Landmark: ${landmark.name}` },
    ]),
    { value: summary.operator, type: "operator", priority: 200, label: `Operated by ${summary.operator}` },
    ...summary.journeyTypes.map((type) => ({ value: type, type: "journey-type" as const, priority: 100, label: `${titleCase(type)} journey` })),
  ];
}

function scoreField(field: SearchField, query: string): number {
  const value = normalizeSearchText(field.value);
  if (value === query) return field.priority + 90;
  if (value.startsWith(query)) return field.priority + 60;
  if (value.split(" ").some((word) => word.startsWith(query))) return field.priority + 40;
  if (value.includes(query)) return field.priority + 20;
  const tokens = query.split(" ");
  return tokens.every((token) => value.includes(token)) ? field.priority + 10 : 0;
}

function titleCase(value: string): string {
  return value.split("-").map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(" ");
}
