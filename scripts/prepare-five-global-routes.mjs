import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDirectory = path.join(root, "public", "data", "routes");
const userAgent = "Rallii-Rail-route-research/1.0 (prepared editorial route geometry)";

const routes = [
  { slug: "madaraka-express", relationId: 7190306, origin: [36.8980718, -1.3553597], destination: [39.5793699, -4.0214386], label: "Nairobi Terminus to Mombasa SGR Terminus" },
  { slug: "reunification-express", relationId: 2709148, origin: [105.8410067, 21.0242336], destination: [108.2092693, 16.0715831], label: "Hanoi to Da Nang" },
  { slug: "east-rift-valley-railway", relationId: 20450147, origin: [121.6009524, 23.9926399], destination: [121.123301, 22.792424], label: "Hualien to Taitung" },
  { slug: "kuranda-scenic-railway", relationId: 2632233, origin: [145.7712597, -16.9256672], destination: [145.6390891, -16.818485], label: "Cairns to Kuranda" },
];

function radians(value) { return value * Math.PI / 180; }
function distance(a, b) {
  const dLat = radians(b[1] - a[1]);
  const dLon = radians(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a[1])) * Math.cos(radians(b[1])) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
function key(point) { return `${point[0].toFixed(7)},${point[1].toFixed(7)}`; }
function routeLength(coordinates) { return coordinates.slice(1).reduce((total, point, index) => total + distance(coordinates[index], point), 0); }

function shortestPath(ways, origin, destination) {
  const coordinates = new Map();
  const edges = new Map();
  const add = (a, b, id) => {
    const from = key(a); const to = key(b); const weight = distance(a, b);
    coordinates.set(from, a); coordinates.set(to, b);
    if (!edges.has(from)) edges.set(from, []);
    edges.get(from).push({ to, weight, id });
  };
  for (const way of ways) for (let index = 1; index < way.coordinates.length; index += 1) {
    add(way.coordinates[index - 1], way.coordinates[index], way.id);
    add(way.coordinates[index], way.coordinates[index - 1], way.id);
  }
  const components = [];
  const remaining = new Set(coordinates.keys());
  while (remaining.size) {
    const first = remaining.values().next().value;
    const component = []; const queue = [first]; remaining.delete(first);
    while (queue.length) {
      const node = queue.pop(); component.push(node);
      for (const edge of edges.get(node) ?? []) if (remaining.delete(edge.to)) queue.push(edge.to);
    }
    components.push(component);
  }
  const nearest = (target, nodes = coordinates.keys()) => [...nodes].reduce((best, node) => {
    const point = coordinates.get(node);
    const candidate = distance(target, point);
    return !best || candidate < best.distance ? { node, point, distance: candidate } : best;
  }, undefined);
  const selected = components.map((component) => ({ start: nearest(origin, component), end: nearest(destination, component) })).sort((a, b) => a.start.distance + a.end.distance - (b.start.distance + b.end.distance))[0];
  const start = selected.start; const end = selected.end;
  if (!start || !end || start.distance > 2 || end.distance > 2) throw new Error(`Could not snap endpoints: ${start?.distance} km / ${end?.distance} km`);
  const costs = new Map([[start.node, 0]]); const previous = new Map(); const heap = [[0, start.node]];
  const push = (entry) => { heap.push(entry); heap.sort((a, b) => a[0] - b[0]); };
  while (heap.length) {
    const [cost, current] = heap.shift();
    if (cost !== costs.get(current)) continue;
    if (current === end.node) break;
    for (const edge of edges.get(current) ?? []) if (cost + edge.weight < (costs.get(edge.to) ?? Infinity)) {
      costs.set(edge.to, cost + edge.weight); previous.set(edge.to, { node: current, id: edge.id }); push([cost + edge.weight, edge.to]);
    }
  }
  if (!previous.has(end.node)) throw new Error("No continuous path found");
  const nodes = [end.node]; const wayIds = [];
  while (nodes[0] !== start.node) { const prior = previous.get(nodes[0]); wayIds.unshift(prior.id); nodes.unshift(prior.node); }
  return { coordinates: nodes.map((node) => coordinates.get(node)), wayIds: [...new Set(wayIds)], startSnapKm: start.distance, endSnapKm: end.distance };
}

async function relationWays(relationId) {
  const response = await fetch(`https://api.openstreetmap.org/api/0.6/relation/${relationId}/full.json`, { headers: { "User-Agent": userAgent } });
  if (!response.ok) throw new Error(`OSM relation ${relationId}: ${response.status}`);
  const data = await response.json();
  const nodeById = new Map(data.elements.filter((element) => element.type === "node").map((node) => [node.id, [node.lon, node.lat]]));
  return data.elements
    .filter((element) => element.type === "way" && element.nodes?.length > 1)
    .map((way) => ({ id: way.id, coordinates: way.nodes.map((id) => nodeById.get(id)).filter(Boolean) }));
}

function writeRoute(slug, label, coordinates, metadata) {
  const calculatedDistanceKm = Number(routeLength(coordinates).toFixed(2));
  const data = {
    type: "FeatureCollection",
    metadata: { ...metadata, coordinateCount: coordinates.length, calculatedDistanceKm, orientation: label, source: "OpenStreetMap", license: "ODbL" },
    features: [{ type: "Feature", properties: { ...metadata, coordinateCount: coordinates.length, calculatedDistanceKm, orientation: label }, geometry: { type: "LineString", coordinates } }],
  };
  fs.writeFileSync(path.join(outputDirectory, `${slug}.geojson`), `${JSON.stringify(data)}\n`);
  console.log(`${slug}: ${coordinates.length} coordinates, ${calculatedDistanceKm} km`);
  return calculatedDistanceKm;
}

for (const route of routes) {
  const pathData = shortestPath(await relationWays(route.relationId), route.origin, route.destination);
  writeRoute(route.slug, route.label, pathData.coordinates, { osmRelationIds: [route.relationId], contributingWayIds: pathData.wayIds, endpointSnapKm: [Number(pathData.startSnapKm.toFixed(3)), Number(pathData.endSnapKm.toFixed(3))] });
}

const kalkaRelationId = 331109;
const kalkaPath = shortestPath(await relationWays(kalkaRelationId), [76.9315647, 30.8392295], [77.1600593, 31.1024672]);
writeRoute("kalka-shimla-railway", "Kalka to Shimla", kalkaPath.coordinates, { osmRelationIds: [kalkaRelationId], contributingWayIds: kalkaPath.wayIds, endpointSnapKm: [Number(kalkaPath.startSnapKm.toFixed(3)), Number(kalkaPath.endSnapKm.toFixed(3))] });
