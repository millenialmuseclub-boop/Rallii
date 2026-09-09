# Rallii MTB implementation

## Added

- `/mtb/` is a separate mountain biking mode with 30 destination, trail-system and bike-park guides, searchable by place/terrain and filterable by rider level, region and riding style.
- `/mtb/[slug]/` provides overview, terrain, technical character, starting area, suggested areas to explore, season, bike choice, practical notes and official map/condition links.
- The catalogue covers Canada, the US, Europe, New Zealand and Australia. Source links are stored per destination. Automated source checks are in `build/mtb-research/sources.json`; some official sites restrict automated requests and were checked through indexed official pages instead.
- Twenty-six locally bundled, credited photographs are listed in `src/mtb/media.json`. Captions distinguish actual trail images from regional scenery and archival imagery. Ordinary builds do not download images. `scripts/prepare-mtb-media.mjs` can rebuild the derivatives explicitly.
- These are area guides rather than measured routes. Distance and ascent remain null and are shown as route dependent. Planning time is not presented as a measured ride time. No coordinates, geometry, elevation profiles, closures or operating schedules were invented.

## Preserved and extended

- Rail, Green and all 30 existing Trail hikes retain their routes and domain schemas. Trail remains hiking; MTB owns `/mtb/`.
- The existing activity registry and remembered-path store now include MTB. Explicit deep links still take precedence over a remembered native launch mode.
- Existing Rail/Green/Trail storage keys and data are unchanged. MTB uses a versioned domain adapter, `rallii:mtb-library:v1`, integrated into the same My Rallii view, home summary and Pro collections. It supports Want to Ride, Ridden and independent Favorites. Removing a ride removes that ride's favorite too.
- The single existing Rallii Pro entitlement controls editing of shared collections. MTB discovery and saves are free. Existing collections remain readable without Pro. No separate subscription or entitlement override was added.
- Four-mode navigation and the family home use the established Source Sans typography and shared components. No native configuration, signing, bundle IDs, iOS version or OTA configuration changed in this pass.

## Verification

- 138 unit tests passed, including catalogue integrity, filters, MTB storage round trips, four-mode routing, legacy collections and shared Pro access rules.
- TypeScript, lint, web build and native static export passed. The export includes all 30 MTB detail pages and 248 normalized native segment aliases.
- `scripts/verify-mtb-browser.mjs` runs against the actual static export. It retains the Trail regression checks and adds four-mode switching, remembered MTB filters, save/reload, Ridden, Favorites, empty results, storage failures and four-mode collection rendering without a Pro bypass.
- Layout coverage includes desktop, 390px, 768px and narrow 320px viewports. Browser output and screenshots are under `build/mtb-verification/`.

## Limits and next step

No implementation blocker remains. Physical iPhone/WKWebView testing is still needed; Chromium viewport checks do not replace it. MTB navigation, offline maps and elevation profiles are explicitly future work requiring verified route geometry.

The best next step is a device review of the four-mode experience before including this work in the next iOS release. This pass is local only: no commit, push, production deploy, OTA publication or Apple upload was performed.
