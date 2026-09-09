# Rallii family home and Trail

Implemented on `codex/rallii-home-trail`, continuing the existing Rail/Green integration commit `ee7a4ae`. The separate `fcc23b0` iOS release bump was intentionally not brought into this branch. Existing unrelated untracked route research files were left intact.

## What changed

- `/` is an editorial family home with a Yosemite photographic hero, Rail/Green/Trail introductions, cross-mode editor’s picks with save controls, a live My Rallii preview and a family Pro section.
- The complete former Rail home is preserved at `/rail/`. Rail discovery, detail, comparison, planning, guides, saves and Ride Mode URLs remain intact. Green’s catalogue, maps, course tools and URLs remain intact.
- Family navigation exposes Home, Explore, Saved and Pro. The mode switcher supports Rail, Green and Trail and remembers internal paths and query strings. Existing native activity preferences still work; explicitly opened detail links take precedence over launch preferences.
- `/trail/` has 30 curated hiking itineraries, photographic cards, search, intersecting difficulty/region filters, scenery tags and an empty state. Filter state lives in the URL.
- `/trail/[slug]/` has reusable, statically generated guides with facts, Why Go, route overview, scenery, seasonal guidance, trailhead names, official source links and photo credits.
- Trail saves support Want to Go, Been and removal, survive reloads and appear in My Rallii and the home preview. Unavailable device storage produces an error rather than a false saved state.

## Content and photography

The 30 itineraries cover California, the Pacific Northwest, Southwest, Rockies and Hawaii. They include easy valley/urban walks, desert routes, alpine hikes, forests, waterfalls, coast and volcanic landscapes. The catalogue includes Yosemite, Lands End, Point Reyes, Mount Tamalpais, Joshua Tree, Rainier, Olympic, Zion, Bryce, Grand Canyon, Rocky Mountain, Glacier, Yellowstone, Grand Teton, Diamond Head and Hawaiʻi Volcanoes.

Route facts are static editorial information, not live conditions or navigation instructions. Full-itinerary distances are rounded; durations are estimates. Unverified or conflicting elevation figures remain explicitly unknown. Official NPS, California State Parks and Hawaii State Parks references are attached to the entries. Seasonal access, construction, permits and weather must be checked with the land manager.

Twenty-two local WebP photographs retain source and license metadata in `src/trail/media.json`. Some represent the surrounding destination rather than the exact footpath; their captions identify the location shown. NPS photography and openly licensed Wikimedia images were used. Images are resized for display, with responsive CSS crops. `scripts/prepare-trail-media.mjs` can rebuild derivatives from the saved source manifest; ordinary builds need no image network access.

## Shared architecture

- Activity registration extends the existing family registry. `rallii:activity:v1` remains the preference key; a separate versioned path record stores the last internal location per mode.
- The existing Rail keys (`rallii:travel-library`, legacy `rallii:saved-routes`) and Green key (`rallii-green:course-library`) retain their schemas and migration behavior.
- `rallii:trail-library:v1` adds a versioned Trail store without rewriting existing user data. My Rallii adapts the three libraries into a shared view and supports status filters.
- The existing versioned Pro collection model accepts Trail references alongside Rail and Green. Older collections continue to parse and remain readable after entitlement expiry.
- The single existing `rallii_pro` entitlement and purchase provider remain authoritative. There are no separate Trail products or purchase bypasses. Trail discovery and saves are free. Shared collections use the existing Pro gate; Trail maps, offline guides and GPS are presented as planned. Purchases remain unavailable without a configured provider.
- `src/trail/types.ts` supports trailheads, sourced coordinates, typed waypoints, route geometry, source attribution, map previews and versioned offline packs. Geometry and GPS routes have deliberately not been invented. Suitability fields support future verified dog, family and accessibility information.

## Verification

The verification artifacts and final command output are under `docs/trail-verification/`.

| Check | Final result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed; generated native web assets excluded from source lint |
| `npm test` | 131 passed, 0 failed |
| `npm run build` | Passed, including all 30 Trail detail pages |
| `npm run native:build` | Passed; 217 native segment aliases normalized |
| Actual-export Chromium suite | Passed; 25 route/viewport visits, 7 interaction/layout groups, 0 console/page errors |
| `git diff --check` | Passed |

- Unit coverage includes all existing Rail/Green tests plus catalogue/media integrity, diacritic-aware filtering, Trail state transitions, malformed storage, mode-path validation and three-mode Pro collections.
- The browser suite serves the actual native static export. It checks Home → Rail/Green/Trail, Trail detail, search/filter restoration, save/reload, Been, My Rallii/home summaries, legacy Rail migration, Green preservation, empty results and unavailable storage.
- Layout checks cover desktop 1440px, iPhone-like 390px, iPad-like 768px and narrow 320px widths. Screenshots load all lazy images before capture. Browser console errors are recorded.
- Native/static builds use the existing `native:build` workflow and segment-normalization step. No Capacitor sync, signing, release configuration, native bundle identifiers, production deployment or TestFlight upload is performed.
- Physical iPhone/iPad, Safari and WKWebView testing are not available in this Windows environment. CSS safe-area support is present, but actual notch/home-indicator behavior and native cold starts still need device testing. Live GPS, offline downloads and billing are outside this pass.

## Recommended next Trail pass

Start with a small set of verified trailhead coordinates and licensed route geometry, then reuse the app’s MapLibre approach for interactive route previews. Add sourced scenic waypoints and a route timeline before implementing GPS progress. Follow with nearby discovery and “Best trail for…” filters backed by verified access, dog, family and accessibility data. Design versioned offline packs around that verified geometry; Trail Mode can then build on the same route/waypoint model without promising coverage before it exists.

## Production OTA follow-up

The requested typography update uses locally bundled Adobe Source Sans 3 under the SIL Open Font License. Family and Trail headings are upright, with semibold emphasis. The native export and all 131 tests pass; the browser suite also verifies the local font and upright emphasis, and waits for save-state hydration after reload. Production OTA publication was explicitly requested by the user.
