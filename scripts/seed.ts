import { createClient, type InStatement } from "@libsql/client";
import { glacierExpressRoute } from "../src/data/routes/glacier-express.ts";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:local.db",
  ...(process.env.TURSO_AUTH_TOKEN ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});

const schema = [
  `CREATE TABLE IF NOT EXISTS routes (
    id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, origin TEXT NOT NULL,
    destination TEXT NOT NULL, country TEXT NOT NULL, operator TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL, distance_km REAL NOT NULL, train_type TEXT NOT NULL,
    reservation_status TEXT NOT NULL, short_description TEXT NOT NULL, status TEXT NOT NULL,
    geojson_path TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS route_stops (
    id TEXT NOT NULL, route_id TEXT NOT NULL, name TEXT NOT NULL, latitude REAL NOT NULL,
    longitude REAL NOT NULL, sequence INTEGER NOT NULL, distance_along_route_km REAL NOT NULL,
    short_description TEXT, PRIMARY KEY (route_id, id), FOREIGN KEY (route_id) REFERENCES routes(id)
  )`,
  `CREATE TABLE IF NOT EXISTS landmarks (
    id TEXT NOT NULL, route_id TEXT NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL,
    latitude REAL NOT NULL, longitude REAL NOT NULL, distance_along_route_km REAL NOT NULL,
    short_description TEXT NOT NULL, importance TEXT NOT NULL, best_side_forward TEXT NOT NULL,
    best_side_reverse TEXT NOT NULL, PRIMARY KEY (route_id, id), FOREIGN KEY (route_id) REFERENCES routes(id)
  )`,
  `CREATE TABLE IF NOT EXISTS timeline_entries (
    id TEXT NOT NULL, route_id TEXT NOT NULL, title TEXT NOT NULL, subtitle TEXT,
    distance_along_route_km REAL NOT NULL, approximate_journey_minutes INTEGER, type TEXT NOT NULL,
    importance TEXT NOT NULL, best_side TEXT, related_landmark_id TEXT, short_description TEXT NOT NULL,
    PRIMARY KEY (route_id, id), FOREIGN KEY (route_id) REFERENCES routes(id)
  )`,
  `CREATE TABLE IF NOT EXISTS best_side_segments (
    id TEXT NOT NULL, route_id TEXT NOT NULL, start_distance_km REAL NOT NULL,
    end_distance_km REAL NOT NULL, forward_direction_side TEXT NOT NULL,
    reverse_direction_side TEXT NOT NULL, reason TEXT NOT NULL, confidence_type TEXT NOT NULL,
    PRIMARY KEY (route_id, id), FOREIGN KEY (route_id) REFERENCES routes(id)
  )`,
];

const route = glacierExpressRoute;
const routeId = route.summary.id;
const statements: InStatement[] = schema.map((sql) => ({ sql }));

statements.push(
  { sql: "DELETE FROM best_side_segments WHERE route_id = ?", args: [routeId] },
  { sql: "DELETE FROM timeline_entries WHERE route_id = ?", args: [routeId] },
  { sql: "DELETE FROM landmarks WHERE route_id = ?", args: [routeId] },
  { sql: "DELETE FROM route_stops WHERE route_id = ?", args: [routeId] },
  { sql: "DELETE FROM routes WHERE id = ?", args: [routeId] },
  {
    sql: `INSERT INTO routes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      routeId, route.summary.slug, route.summary.name, route.summary.origin,
      route.summary.destination, route.summary.country, route.summary.operator,
      route.summary.durationMinutes, route.summary.distanceKm, route.summary.trainType,
      route.summary.reservationStatus, route.summary.shortDescription, route.summary.status,
      route.geoJsonPath,
    ],
  },
);

for (const stop of route.stops) {
  statements.push({
    sql: "INSERT INTO route_stops VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    args: [stop.id, routeId, stop.name, stop.latitude, stop.longitude, stop.sequence, stop.distanceAlongRouteKm, stop.shortDescription ?? null],
  });
}
for (const landmark of route.landmarks) {
  statements.push({
    sql: "INSERT INTO landmarks VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    args: [landmark.id, routeId, landmark.name, landmark.type, landmark.latitude, landmark.longitude, landmark.distanceAlongRouteKm, landmark.shortDescription, landmark.importance, landmark.bestSideForward, landmark.bestSideReverse],
  });
}
for (const entry of route.timelineEntries) {
  statements.push({
    sql: "INSERT INTO timeline_entries VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    args: [entry.id, routeId, entry.title, entry.subtitle ?? null, entry.distanceAlongRouteKm, entry.approximateJourneyMinutes ?? null, entry.type, entry.importance, entry.bestSide ?? null, entry.relatedLandmarkId ?? null, entry.shortDescription],
  });
}
for (const segment of route.bestSideSegments) {
  statements.push({
    sql: "INSERT INTO best_side_segments VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    args: [segment.id, routeId, segment.startDistanceKm, segment.endDistanceKm, segment.forwardDirectionSide, segment.reverseDirectionSide, segment.reason, segment.confidenceType],
  });
}

await db.batch(statements, "write");
db.close();
console.log(`Seeded ${route.summary.name} into ${process.env.TURSO_DATABASE_URL ?? "file:local.db"}.`);
