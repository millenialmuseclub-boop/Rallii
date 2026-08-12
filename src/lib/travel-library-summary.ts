import type { RailRoute } from "../types/route.ts";
export interface LibrarySummary { journeyCount: number; countryCount: number; distanceKm: number; countries: string[]; }
export function getBeenRoutes(routes: RailRoute[], statuses: Record<string, string>): RailRoute[] { return routes.filter((route) => statuses[route.summary.slug] === "been"); }
export function getWantToGoRoutes(routes: RailRoute[], statuses: Record<string, string>): RailRoute[] { return routes.filter((route) => statuses[route.summary.slug] === "want_to_go"); }
export function getLibrarySummary(routes: RailRoute[]): LibrarySummary { const countries = [...new Set(routes.flatMap((route) => route.summary.countries))]; return { journeyCount: routes.length, countryCount: countries.length, distanceKm: routes.reduce((total, route) => total + route.summary.distanceKm, 0), countries }; }
