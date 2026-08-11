import { glacierExpressRoute } from "./glacier-express.ts";
import type { RailRoute } from "../../types/route.ts";

const routesBySlug: ReadonlyMap<string, RailRoute> = new Map([
  [glacierExpressRoute.summary.slug, glacierExpressRoute],
]);

export function getRouteBySlug(slug: string): RailRoute | undefined {
  return routesBySlug.get(slug);
}
