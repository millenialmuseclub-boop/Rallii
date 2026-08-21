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
import { theGhanRoute } from "./the-ghan.ts";
import { kandyEllaRailwayRoute } from "./kandy-ella-railway.ts";
import { coastStarlightRoute } from "./coast-starlight.ts";
import { theCanadianRoute } from "./the-canadian.ts";
import { easternExpressRoute } from "./eastern-express.ts";
import { hiramBinghamRoute } from "./hiram-bingham.ts";
import { alishanForestRailwayRoute } from "./alishan-forest-railway.ts";
import { belgradeBarRoute } from "./belgrade-bar.ts";
import { konkanRailwayRoute } from "./konkan-railway.ts";
import { blueTrainRoute } from "./blue-train.ts";
import { elChepeExpressRoute } from "./el-chepe-express.ts";
import { inlandsbananRoute } from "./inlandsbanan.ts";
import { trainDesMerveillesRoute } from "./train-des-merveilles.ts";
import { jacobiteSteamTrainRoute } from "./jacobite-steam-train.ts";
import { saganoScenicRailwayRoute } from "./sagano-scenic-railway.ts";
import { raumaLineRoute } from "./rauma-line.ts";
import { madarakaExpressRoute } from "./madaraka-express.ts";
import { reunificationExpressRoute } from "./reunification-express.ts";
import { eastRiftValleyRailwayRoute } from "./east-rift-valley-railway.ts";
import { kurandaScenicRailwayRoute } from "./kuranda-scenic-railway.ts";
import { kalkaShimlaRailwayRoute } from "./kalka-shimla-railway.ts";
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
  [theGhanRoute.summary.slug, theGhanRoute],
  [kandyEllaRailwayRoute.summary.slug, kandyEllaRailwayRoute],
  [coastStarlightRoute.summary.slug, coastStarlightRoute],
  [theCanadianRoute.summary.slug, theCanadianRoute],
  [easternExpressRoute.summary.slug, easternExpressRoute],
  [hiramBinghamRoute.summary.slug, hiramBinghamRoute],
  [alishanForestRailwayRoute.summary.slug, alishanForestRailwayRoute],
  [belgradeBarRoute.summary.slug, belgradeBarRoute],
  [konkanRailwayRoute.summary.slug, konkanRailwayRoute],
  [blueTrainRoute.summary.slug, blueTrainRoute],
  [elChepeExpressRoute.summary.slug, elChepeExpressRoute],
  [inlandsbananRoute.summary.slug, inlandsbananRoute],
  [trainDesMerveillesRoute.summary.slug, trainDesMerveillesRoute],
  [jacobiteSteamTrainRoute.summary.slug, jacobiteSteamTrainRoute],
  [saganoScenicRailwayRoute.summary.slug, saganoScenicRailwayRoute],
  [raumaLineRoute.summary.slug, raumaLineRoute],
  [madarakaExpressRoute.summary.slug, madarakaExpressRoute],
  [reunificationExpressRoute.summary.slug, reunificationExpressRoute],
  [eastRiftValleyRailwayRoute.summary.slug, eastRiftValleyRailwayRoute],
  [kurandaScenicRailwayRoute.summary.slug, kurandaScenicRailwayRoute],
  [kalkaShimlaRailwayRoute.summary.slug, kalkaShimlaRailwayRoute],
];
const routesBySlug: ReadonlyMap<string, RailRoute> = new Map(routeEntries);

export function getRouteBySlug(slug: string): RailRoute | undefined {
  return routesBySlug.get(slug);
}

export function getAllRoutes(): RailRoute[] {
  return Array.from(routesBySlug.values()).filter((route) => route.summary.status === "published");
}
