# Curated Exploration Architecture

## Purpose

Rallii is the first product built on a repeatable curated-exploration model. The product helps a person choose an experience, understand its route or path, know what matters along it, and organise a practical trip around it.

The reusable model is intentionally editorial and prepared. It is not live navigation, a booking engine, a social network, or a broad infrastructure database.

## Product formula

Every exploration product should answer four questions clearly:

1. What experience should I choose?
2. What should I know before I go?
3. What should I notice while I am there?
4. What practical planning can I do next?

For Rallii, that becomes a rail journey, Best Side guidance, Scenic Moments, a prepared railway map, and operator/partner planning links. For a future MTB product, it becomes a trail, ride direction and difficulty, trail moments, a prepared trail map, and local planning links.

## Reusable core

These concepts should remain product-neutral wherever possible:

- **Experience record**: name, identity, geography, duration, distance, characteristics, editorial summary, sources, and publication state.
- **Prepared geometry**: one reviewed canonical GeoJSON path, kept outside searchable catalogue metadata.
- **Places**: centrally stored, reusable destinations, landmarks, viewpoints, stations, trailheads, towns, and natural features.
- **Scenic moments**: ordered prepared moments along an experience, with distance, optional time, importance, confidence, source provenance, and reverse presentation when relevant.
- **Editorial lore**: sourced historical, cultural, engineering, and environmental context linked to Places and Scenic Moments.
- **Media registry**: licensed locally stored imagery with creator, licence, source, location, access date, and reuse context.
- **Catalogue taxonomy**: region, place, landscape, experience character, duration, and editorial collection membership.
- **Relationships**: exactly reviewable related experiences with an editorial reason; no opaque recommendation engine.
- **Journey guides**: a small, reusable editorial layer that sequences a few existing experiences around a larger travel idea. Guides reuse route, Place, ScenicMoment, media, collection, and planning data; they are not booking itineraries.
- **Personal library**: on-device saved experiences, with a simple entitlement boundary and no account required.
- **Planning placements**: centrally configured external planning links and embeds, never presented as first-party booking.
- **Entitlements**: a product-neutral Free/Pro boundary. Pro improves organization and in-experience utility; it does not gate ordinary discovery.

## Rail-specific Rallii layer

Keep these inside Rallii rather than forcing them into the reusable core:

- operator and reservation guidance
- stations and interchanges
- Best Side to Sit segments
- railway-source provenance
- train type and overnight rail context
- Ride Mode and future Scenic Alerts
- prepared railway geometry and railway-map attribution

## Future MTB-trails layer

An MTB product should introduce trail-native concepts rather than pretending a trail is a train route:

- trailhead and exit points instead of stations
- elevation, grade, technical difficulty, fitness demand, trail surface, and route type
- ascent/descent, direction suitability, and one-way versus loop status
- safety, weather, closure, permit, and land-manager guidance with clear changeable-data provenance
- trail features such as berms, bridges, rock gardens, river crossings, viewpoints, and bail-out points
- route etiquette and access guidance

The same Place, ScenicMoment, Lore, Media, Collection, Search, Saved, Map, and Planning structures can be reused. The MTB product must have its own trail-specific types and validation, not a renamed `RailRoute`.

## Catalogue scale: capped, curated, and indexable

Rallii is capped at 250 published routes. This is a quality boundary, not an arbitrary display limit.

- **1–75 routes**: local typed records, static route pages, local search, and editorial curation are appropriate.
- **76–250 routes**: retain local prepared geometry, add durable regional/country landing indexes, and keep Discover filtered to one browse group at a time with incremental results.
- **At 250 routes**: pause expansion unless an existing route is retired or replaced. Improve depth, photography, sourced intelligence, and maintenance before expanding the cap.
- **Only if a future product needs more than 250 experiences**: move searchable metadata to Turso with server-side filtering and pagination. Do not move geometry blobs into the catalogue database.

The same approach should apply to an MTB catalogue: define a deliberate cap appropriate to editorial quality and maintenance capacity before scaling ingestion.

## Content quality gate

An experience cannot be published until it has:

1. a verified, continuous, reviewed canonical geometry;
2. credible primary/operator, land-manager, tourism, infrastructure, or conservation sources as relevant;
3. clear separation of stable identity from changeable operational information;
4. sourced, direction-aware guidance where direction matters;
5. at least one locally stored, licensed image with complete attribution;
6. a small, useful prepared set of Places and Scenic Moments;
7. Search, catalogue, related-experience, Save, Compare, Map, and planning integration through shared systems;
8. tests for geometry, order, direction, search, relationships, and library compatibility.

Never publish decorative straight-line geometry, guessed viewing advice, stale schedules as facts, or unverified image licences.

## Design system rules

- Mobile app first; responsive web second.
- A compact contextual header and persistent mobile navigation establish product continuity.
- Screens should show one primary task at a time.
- Photography creates place; maps create orientation; editorial copy creates confidence.
- Use square or lightly rounded controls with clear touch targets. Avoid gamification, badges, fake urgency, carousels, and sales-page behavior.
- Headers may reuse licensed experience imagery through a central screen-media registry. Never duplicate media metadata in screen components.
- Home and core task screens use square-edged, image-led editorial entry surfaces from that registry. They establish orientation without becoming decorative website banners or delaying the primary task.
- Maps should foreground prepared geometry, then useful stops/features, then base-map context. They should not imitate live navigation.

## Monetization boundary

External planning tools are optional and user-initiated. They must be visibly disclosed as partner searches, have a fallback if unavailable, and never claim Rallii prices or availability.

Pro is a quiet utility upgrade for organization, future offline packs, and prepared in-experience alerts. It is not a reason to weaken the free discovery experience.

## Delivery checklist

Each milestone must state which shared systems changed, which product-specific systems changed, and what was deliberately deferred. It must pass TypeScript, lint, tests, production build, and mobile verification before shipping.
