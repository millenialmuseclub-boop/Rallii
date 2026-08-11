import { berninaExpressRoute } from "./bernina-express.ts";
import { glacierExpressRoute } from "./glacier-express.ts";
import { goldenPassExpressRoute } from "./goldenpass-express.ts";
import { westHighlandLineRoute } from "./west-highland-line.ts";
import type { RailRoute } from "../../types/route.ts";

const routeEntries: Array<readonly [string, RailRoute]> = [
  [glacierExpressRoute.summary.slug, glacierExpressRoute],
  [berninaExpressRoute.summary.slug, berninaExpressRoute],
  [goldenPassExpressRoute.summary.slug, goldenPassExpressRoute],
  [westHighlandLineRoute.summary.slug, westHighlandLineRoute],
];
const routesBySlug: ReadonlyMap<string, RailRoute> = new Map(routeEntries);

export function getRouteBySlug(slug: string): RailRoute | undefined {
  return routesBySlug.get(slug);
}

export function getAllRoutes(): RailRoute[] {
  return Array.from(routesBySlug.values()).filter((route) => route.summary.status === "published");
}
