# OTA product-quality sprint — September 24, 2026

## Scope and production baseline

Audited the existing public deployment at https://rallii-kappa.vercel.app before editing product code. `scripts/audit-sprint-production.mjs` visited 19 pages at 390px and exercised the Glacier Express workspace. All returned 200; no application exceptions, horizontal overflow or broken loaded images were detected. This is a sampled browser audit, not a claim that every external service or device is faultless.

The repository already contains 36 Rail journeys, 34 Trail guides, 45 MTB destinations and 52 Snow destinations, plus the existing Green mode. All remain intact. No new mode, destination, native code, permissions, plugin, paid service or paywall was introduced. Existing untracked research and artifacts were preserved. Saved-data keys and schemas were not changed.

## Findings and changes

| Area | Finding and outcome |
| --- | --- |
| Best Side to Sit | Hero used the first segment while the full guide used a different calculation. Both now use one supported-distance summary. Empty/unknown/zero-length data no longer defaults to Left; equal leading totals say Varies. Segment reasons and travel-relative side context are visible. |
| Scenic timeline | Subtitles hid actual landmark names; items without map associations acted like buttons. Names are retained, unlinked notes are static, times are labelled approximate, and a linked moment opens the matching mobile map. |
| Maps | Selection could arrive before markers were ready; geometry failure could reject before the map style loaded; failed initialization could throw. Selection now waits for readiness, failure states are bounded and handled, and marker CSS preserves absolute coordinate positioning. Map code loads separately. |
| Ride Mode | Reverse links were ignored by the static page. Location errors left watches alive, old direction state could be reused, and distant matches still showed progress/alerts. Client direction handling, watch cleanup, unreliable-match suppression and retryable geometry loading are fixed. Scenic distance uses the same editorial route scale as the timeline. Existing availability remains Bernina and Flåm only. |
| Comparisons | Existing Rail and Snow URL-backed selections, duplicate handling and sourced comparison content retained. Unit tests and browser checks cover these paths. |
| Rail content | Reviewed the five named core experiences. Existing landmarks, stops, seasonal/operational notes and operator sources remain the source of truth. Seat reasons and real timeline names now make that data more useful. No schedules, fares, opening dates or unsupported route facts added. |
| Snow | Existing hemisphere-aware planning windows and nine sourced detailed profiles retained. Global discovery supports Snow month selection; detail season labels now say Typical season. Added same-country destination suggestions and a contextual Zermatt link to the existing Glacier Express and Swiss winter guide. No live conditions implied. |
| MTB / Trail | Existing collections, route options, difficulty, local map links, planner filters and saved controls retained and regression-tested. Destination sharing and previews added; existing cross-season connections remain. Unknown distance/elevation continues to be explicit. |
| Discovery | Global search now restores and shares URL state. Country filtering includes each country on cross-border Rail routes. Search normalizes punctuation/diacritics and includes season text. Surprise me chooses only among current matches; empty results have a reset. Rail landmark search follows the same query URL. |
| Traffic / sharing | Added public-origin sharing with native share sheet, clipboard and manual-copy fallbacks. Reverse Rail direction is preserved. Rail, Trail, MTB and Snow use destination-specific canonical/OG/Twitter photo metadata. Added a static sitemap and robots file. No fabricated last-modified dates or live claims. |
| Affiliate widgets | Existing Agoda, Trip.com, DiscoverCars and GetYourGuide creatives rendered in a fresh mobile browser using existing publisher IDs. Empty-script, delayed shadow-DOM and network-error fixtures pass. DiscoverCars' own tracking frame still throws a MutationObserver error; its controls remain usable. No attribution or affiliate URLs changed. |
| Ecosystem | Existing verified contextual Jet Set article placements retained. Removed the indiscriminate list of portfolio products from outdoor planners; Snow links to Luxe Jetter specifically for transfer/village clothing. No verified Little Jetter entry exists in the project registry, so no URL or placement was invented. The existing homepage portfolio was left intact. |
| Photography / UX | Reused licensed local destination photography and existing responsive variants; no AI images or new downloads. Existing photograph/source checks pass. Rail headings use the app's sans font. Share controls wrap on mobile. Representative-location imagery retains its existing captions. |
| Performance | Deferred Rail and Ride map component bundles; kept bounded discovery lists and existing lazy photos. No architecture replacement, new dependencies or cache/storage migrations. |
| Measurement | Extended the existing local `rallii:analytics` hook for mode selection, search/filter, Best Side, timeline, Ride Mode, share, related-route and ecosystem clicks. Existing save/comparison/affiliate/Jet Set events remain. Planner URLs no longer count as route views. No search text, notes or coordinates added to events. These events have no collector: they are not a persistent analytics dashboard. |

## Validation evidence

- Baseline: 157 existing unit tests passed.
- Updated suite: 161 tests passed, including unknown/tied seat guidance, public share URLs, cross-border/season discovery and planner event exclusions.
- ESLint, TypeScript and production web build passed.
- `npm run native:build` produces only the OTA static web export, not an iOS/Android binary. Export passed with 332 client-navigation segment aliases.
- Export link audit: 336 HTML pages, 14,716 local references, zero broken links.
- `scripts/verify-mode-completion.mjs`: 54 page visits at 390/768/1440px; all 24 outdoor collections, planner matching, save/reload/restore, My Rallii, mode switching and widget failure fixtures passed.
- `scripts/verify-ota-quality.mjs`: five core Rail experiences, seat consistency, timeline-to-map navigation, reverse sharing, outdoor canonical/photo metadata, URL discovery, constrained Surprise me, existing saved entries, reverse Bernina demo, distant-location suppression, location-denial watch cleanup and failed-geometry retry. Thirty page visits checked phone/tablet/desktop layouts; Rail comparison back navigation, Snow comparison reload and manual-copy sharing fallback also passed. The deliberate HTTP 503 is expected failure injection, not a production error.
- `scripts/verify-quality-map.mjs`: live map resources, prepared geometry, initial selected popup, station toggles, fit-route and geometry-failure handling. DOM markers, popups and controls passed. This Windows headless capture still does not establish that the WebGL basemap/route drawing renders correctly on a device; a physical iOS visual map check remains outstanding.
- Live widgets: all four rendered controls. Provider-side DiscoverCars tracking error remains outside the app's control; no forms were submitted and no bookings made.
- Evidence and screenshots: ignored `build/ota-quality/` and `build/mode-completion/` directories. Tests use separate browser contexts and synthetic location fixtures.

## Release state and existing OTA path

The initial request ended at “OTA DEPLOYMENT / After changes”. After reviewing the completed sprint, the user explicitly authorized committing, pushing, web deployment and production OTA publication on September 24, 2026. Publication uses the existing workflow; no App Store build, TestFlight/Codemagic trigger, native sync or store submission is included.

The existing `.github/workflows/ota-publish.yml` is manual-only. It builds the static web export, creates an encrypted/signed bundle using the existing updater tooling, uploads to R2 and updates the selected channel manifest. It uses the existing app ID, signing key and publisher attribution. Native clients poll R2 and activate a verified newer bundle on next launch; `notifyAppReady` participates in the existing rollback guard. Do not deploy the unconfigured local QA export directly: the workflow supplies the release OTA origin/channel and publisher variables.

For release, use the existing reviewed-commit process: publish that commit to staging, validate it with an already-installed compatible app, then publish the same commit to production. A main-branch push uses the established Vercel web deployment. Do not invoke the separate iOS/Android distribution workflows. Retain the preceding manifest/bundle for the established rollback process; the current updater rejects versions older than its running bundle, so recovery needs an appropriate newer version rather than simply pointing at an old timestamp.

## FUTURE NATIVE UPDATE

No native change is required for this sprint. Physical iOS validation of WebGL rendering, native share sheet and foreground location permissions remains a device-release check. Background location/alerts, additional permissions, new native SDKs and broad offline-map support were not implemented. They would need a separate native review. Extending Ride Mode to other routes also needs deliberate route-data/capability verification; it was not enabled by changing a flag.
