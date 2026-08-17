# Prepared Route Architecture

## Current prototype

Rallii currently uses the Glacier Express from Zermatt to St. Moritz as its reference route. The prototype proves the path from structured route intelligence to a route page and an interactive MapLibre map.

## Separation of concerns

Railway geometry is prepared and reviewed before publication. The consumer application does not calculate railway routes, ingest GTFS, or query a live railway-routing service. A static GeoJSON `LineString` represents the published path.

Structured journey intelligence—route metadata, stops, landmarks, timeline entries, and directional seat-view segments—lives separately from geometry. The prototype source record is typed local data and can be seeded into libSQL with `npm run db:seed`. Keeping the large geometry in a prepared file makes it cacheable and avoids unnecessary database blobs.

The Glacier Express geometry was extracted from OpenStreetMap route master relation 301629, directional relation 14616806, at the OSM snapshot reported by Overpass as 2026-06-01 08:52:28 UTC. Its ordered railway ways were joined, reversed to Zermatt → St. Moritz, and lightly simplified. The result remains railway-aligned and retains ODbL attribution in the GeoJSON metadata and map.

## Adding another route

1. Create a `RailRoute` record under `src/data/routes`.
2. Validate and register its slug in the route repository.
3. Prepare a sourced, reviewed GeoJSON route under `public/data/routes`.
4. Point the record's `geoJsonPath` to that file and seed the structured data when needed.

Geometry sourcing and editorial seat-side recommendations both require human review before a route is published.

## Direction-aware presentation

Each route record and GeoJSON `LineString` has one canonical direction. Reverse travel is derived in the route experience rather than stored as duplicate route data or reverse GeoJSON.

- Stops, landmarks, timeline entries, and seat-view segments reverse their display order.
- A canonical distance `d` on a route of length `D` becomes `D - d` in reverse presentation.
- Prepared timeline minutes similarly become `durationMinutes - approximateJourneyMinutes` when an entry has an approximate time.
- Best Side always uses the explicitly prepared forward or reverse value; left and right are never inferred by automatic swapping.
- Direction-specific editorial exceptions use optional reverse titles, subtitles, or descriptions on the existing record.
- The default URL is canonical. `?direction=reverse` restores and shares reverse presentation, while invalid values fall back to the default direction. Canonical metadata remains attached to the base route URL.

Want to Go, Been, Compare, My Rail Map, and Flåm Ride Mode continue to use the canonical route identity. Direction changes presentation only.

## Controlled discovery taxonomy

Journey types describe the broad form of a route; experience tags describe reusable landscape and infrastructure traits used by Search, Discover, and Compare. Route #8 adds the generic tags `bridges`, `forest`, and `rivers`. Open-sided equipment remains train-character copy rather than a route-specific taxonomy value.

New values should be added only when they can describe more than one journey and should continue to format through the shared comparison and search helpers.

## Scaling the catalogue

Discover uses the centralized catalogue taxonomy in `src/data/catalogue-taxonomy.ts` and searches route summaries, geography, stations, landmarks, operators, journey types, and experience tags without loading GeoJSON. Results are revealed incrementally in groups of eight, while only one browse group is open at a time.

Typed local route records remain appropriate for the current curated catalogue and can support hundreds of prepared journeys. At roughly 300–500 published routes, retain incremental results and introduce durable pagination plus stronger regional index pages. Beyond roughly 1,000 routes—or earlier if the client index becomes measurably slow—move searchable route metadata into Turso and query it server-side. Keep prepared GeoJSON as separately cached static assets; catalogue browsing must never load every route geometry.

Partner placements are centralized in `src/data/partner-placements.ts`. This keeps Plan and Stays actions consistent as the catalogue grows without turning editorial route content into advertising inventory.
