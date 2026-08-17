import type { ExperienceTag, RailRoute } from "@/types/route";

export const catalogueRegions = [
  { id: "europe", label: "Europe", countries: ["Switzerland", "Italy", "United Kingdom", "Norway", "Ireland", "Portugal", "Serbia", "Montenegro", "Türkiye", "Sweden", "France"] },
  { id: "north-america", label: "North America", countries: ["United States", "Canada", "Mexico"] },
  { id: "asia", label: "Asia", countries: ["Japan", "Sri Lanka", "Taiwan", "India"] },
  { id: "oceania", label: "Oceania", countries: ["Australia", "New Zealand"] },
  { id: "africa", label: "Africa", countries: ["South Africa"] },
  { id: "south-america", label: "South America", countries: ["Peru"] },
] as const;

export const catalogueExperiences: Array<{ id: ExperienceTag; label: string }> = [
  { id: "mountain-valleys", label: "Mountains" }, { id: "coast", label: "Coast" }, { id: "rivers", label: "Rivers" },
  { id: "forest", label: "Forest" }, { id: "desert", label: "Desert" }, { id: "glaciers", label: "Glaciers" },
  { id: "vineyards", label: "Vineyards" }, { id: "tunnels", label: "Railway engineering" },
];

export function routesInRegion(routes: RailRoute[], regionId: string): RailRoute[] {
  const region = catalogueRegions.find((item) => item.id === regionId);
  return region ? routes.filter((route) => route.summary.countries.some((country) => region.countries.includes(country as never))) : [];
}
