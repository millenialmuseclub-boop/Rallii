import type { Place } from "@/types/intelligence";
import type { RailRoute } from "@/types/route";

const preparedPlaces: Record<string, Partial<Place>> = {
  "bernina-express:lago-bianco": { railwaySignificance: "The railway reaches its high Alpine watershed beside Lago Bianco near Ospizio Bernina.", sourceIds: ["bernina-rhb", "bernina-unesco"] },
  "bernina-express:alp-grum-view": { railwaySignificance: "Alp Grüm is a remote railway viewpoint reached only by train and trail, overlooking the Palü Glacier and Val Poschiavo.", sourceIds: ["bernina-rhb", "bernina-unesco"] },
  "bernina-express:brusio-viaduct": { railwaySignificance: "The circular stone viaduct allows the adhesion railway to lose height without a rack system.", sourceIds: ["bernina-rhb", "bernina-unesco"] },
  "flam-railway:kjosfossen-waterfall": { railwaySignificance: "The railway includes a dedicated seasonal halt beside Kjosfossen, turning the waterfall into part of the operating experience.", sourceIds: ["flam-kjosfossen", "flam-vy"] },
  "flam-railway:myrdalsberget-ascent": { railwaySignificance: "Tunnels and tight curves carry the line through the steepest upper part of its climb toward Myrdal.", sourceIds: ["flam-bane-nor", "flam-vy"] },
  "kurobe-gorge-railway:atobiki-bridge": { railwaySignificance: "The narrow-gauge railway crosses a steep side valley on one of its most exposed bridge sections.", sourceIds: ["kurobe-official-route"] },
  "kurobe-gorge-railway:kurobe-river-gorge": { railwaySignificance: "The railway was developed alongside hydroelectric works and remains closely confined by the Kurobe River gorge.", sourceIds: ["kurobe-official-route", "kurobe-jnto"] },
};

export function getPlacesForRoute(route: RailRoute): Place[] {
  const stops: Place[] = route.stops.map((stop) => ({ id: `${route.summary.slug}:stop:${stop.id}`, name: stop.name, type: "station", latitude: stop.latitude, longitude: stop.longitude, description: stop.shortDescription ?? `${stop.name} is a prepared stop on the ${route.summary.name}.`, railwaySignificance: stop.sequence === 1 ? "Departure point for this prepared journey." : stop.sequence === route.stops.length ? "Arrival point for this prepared journey." : "An intermediate railway stop on this journey.", routeIds: [route.summary.slug], sourceIds: route.sources.filter((source) => source.category === "operator" || source.category === "infrastructure").map((source) => source.id) }));
  const landmarks: Place[] = route.landmarks.map((landmark) => {
    const id = `${route.summary.slug}:${landmark.id}`;
    const prepared = preparedPlaces[id];
    return { id, name: landmark.name, type: landmark.type, latitude: landmark.latitude, longitude: landmark.longitude, description: landmark.shortDescription, railwaySignificance: prepared?.railwaySignificance ?? `A visible ${landmark.type.replaceAll("-", " ")} that helps define the ${route.summary.name} experience.`, routeIds: [route.summary.slug], imageRouteSlug: prepared?.imageRouteSlug, sourceIds: prepared?.sourceIds ?? route.sources.filter((source) => source.category !== "railway-map").slice(0, 2).map((source) => source.id) };
  });
  return [...stops, ...landmarks];
}

export function getPlaceById(route: RailRoute, placeId: string): Place | undefined { return getPlacesForRoute(route).find((place) => place.id === placeId); }
