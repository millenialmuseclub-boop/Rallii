import { berninaExpressRoute } from "./bernina-express.ts";
import { glacierExpressRoute } from "./glacier-express.ts";
import { goldenPassExpressRoute } from "./goldenpass-express.ts";
import { westHighlandLineRoute } from "./west-highland-line.ts";
import { flamRailwayRoute } from "./flam-railway.ts";
import { cinqueTerreRoute } from "./cinque-terre.ts";
import { tranzAlpineRoute } from "./tranzalpine.ts";
import { kurobeGorgeRailwayRoute } from "./kurobe-gorge-railway.ts";
import { belfastDerryRoute } from "./belfast-derry.ts";
import { dublinRosslareRoute } from "./dublin-rosslare.ts";
import { douroLineRoute } from "./douro-line.ts";
import { firstPassageWestRoute } from "./first-passage-west.ts";
import { settleCarlisleRoute } from "./settle-carlisle.ts";
import { californiaZephyrRoute } from "./california-zephyr.ts";
import { bergenLineRoute } from "./bergen-line.ts";
import type { RailRoute } from "../../types/route.ts";

const routeEntries: Array<readonly [string, RailRoute]> = [
  [glacierExpressRoute.summary.slug, glacierExpressRoute],
  [berninaExpressRoute.summary.slug, berninaExpressRoute],
  [goldenPassExpressRoute.summary.slug, goldenPassExpressRoute],
  [westHighlandLineRoute.summary.slug, westHighlandLineRoute],
  [flamRailwayRoute.summary.slug, flamRailwayRoute],
  [cinqueTerreRoute.summary.slug, cinqueTerreRoute],
  [tranzAlpineRoute.summary.slug, tranzAlpineRoute],
  [kurobeGorgeRailwayRoute.summary.slug, kurobeGorgeRailwayRoute],
  [belfastDerryRoute.summary.slug, belfastDerryRoute],
  [dublinRosslareRoute.summary.slug, dublinRosslareRoute],
  [douroLineRoute.summary.slug, douroLineRoute],
  [firstPassageWestRoute.summary.slug, firstPassageWestRoute],
  [settleCarlisleRoute.summary.slug, settleCarlisleRoute],
  [californiaZephyrRoute.summary.slug, californiaZephyrRoute],
  [bergenLineRoute.summary.slug, bergenLineRoute],
];
const routesBySlug: ReadonlyMap<string, RailRoute> = new Map(routeEntries);

export function getRouteBySlug(slug: string): RailRoute | undefined {
  return routesBySlug.get(slug);
}

export function getAllRoutes(): RailRoute[] {
  return Array.from(routesBySlug.values()).filter((route) => route.summary.status === "published");
}
