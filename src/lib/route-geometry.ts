export type RouteCoordinate = [number, number];

export interface RouteProjection {
  nearestCoordinate: RouteCoordinate;
  distanceFromRouteMeters: number;
  distanceAlongRouteKm: number;
  progress: number;
}

const earthRadiusMeters = 6_371_000;

function toLocalMeters(coordinate: RouteCoordinate, referenceLatitude: number): [number, number] {
  const radians = Math.PI / 180;
  return [coordinate[0] * radians * earthRadiusMeters * Math.cos(referenceLatitude * radians), coordinate[1] * radians * earthRadiusMeters];
}

export function distanceMeters(a: RouteCoordinate, b: RouteCoordinate): number {
  const latitude = (a[1] + b[1]) / 2;
  const [ax, ay] = toLocalMeters(a, latitude);
  const [bx, by] = toLocalMeters(b, latitude);
  return Math.hypot(bx - ax, by - ay);
}

export function routeLengthKm(coordinates: RouteCoordinate[]): number { return coordinates.slice(1).reduce((total, coordinate, index) => total + distanceMeters(coordinates[index], coordinate), 0) / 1000; }

export function projectCoordinateOntoRoute(point: RouteCoordinate, route: RouteCoordinate[]): RouteProjection {
  if (route.length < 2) throw new Error("Route geometry needs at least two coordinates.");
  let bestDistance = Number.POSITIVE_INFINITY;
  let bestAlong = 0;
  let bestCoordinate = route[0];
  let travelled = 0;
  const totalMeters = routeLengthKm(route) * 1000;
  for (let index = 1; index < route.length; index += 1) {
    const start = route[index - 1]; const end = route[index];
    const referenceLatitude = (start[1] + end[1] + point[1]) / 3;
    const [sx, sy] = toLocalMeters(start, referenceLatitude); const [ex, ey] = toLocalMeters(end, referenceLatitude); const [px, py] = toLocalMeters(point, referenceLatitude);
    const dx = ex - sx; const dy = ey - sy; const lengthSquared = dx * dx + dy * dy;
    const fraction = lengthSquared ? Math.max(0, Math.min(1, ((px - sx) * dx + (py - sy) * dy) / lengthSquared)) : 0;
    const projected: RouteCoordinate = [start[0] + (end[0] - start[0]) * fraction, start[1] + (end[1] - start[1]) * fraction];
    const offRoute = distanceMeters(point, projected); const segmentMeters = Math.sqrt(lengthSquared);
    if (offRoute < bestDistance) { bestDistance = offRoute; bestAlong = travelled + segmentMeters * fraction; bestCoordinate = projected; }
    travelled += segmentMeters;
  }
  return { nearestCoordinate: bestCoordinate, distanceFromRouteMeters: bestDistance, distanceAlongRouteKm: bestAlong / 1000, progress: totalMeters ? Math.max(0, Math.min(1, bestAlong / totalMeters)) : 0 };
}

export function interpolateRouteCoordinate(route: RouteCoordinate[], progress: number): RouteCoordinate {
  if (route.length < 2) throw new Error("Route geometry needs at least two coordinates.");
  const target = routeLengthKm(route) * 1000 * Math.max(0, Math.min(1, progress));
  let travelled = 0;
  for (let index = 1; index < route.length; index += 1) { const length = distanceMeters(route[index - 1], route[index]); if (travelled + length >= target) { const fraction = length ? (target - travelled) / length : 0; return [route[index - 1][0] + (route[index][0] - route[index - 1][0]) * fraction, route[index - 1][1] + (route[index][1] - route[index - 1][1]) * fraction]; } travelled += length; }
  return route.at(-1) as RouteCoordinate;
}
