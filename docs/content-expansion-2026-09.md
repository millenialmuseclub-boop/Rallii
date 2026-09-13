# Global content and discovery expansion — September 2026

## Delivered

| Collection | Total | Added in this release |
| --- | ---: | --- |
| Rail routes | 36 | 4 editorial journey guides (9 guides total); route count unchanged |
| Trail routes | 33 | 3 sourced international walks |
| MTB destinations | 45 | 15 destinations |
| Snow destinations | 51 | 39 mountains/resort areas |
| Green courses / destination guides | 50 / 10 | 3 destination guides; course count unchanged |

Added 57 licensed destination photographs, 135 compact card derivatives, and one official Apple download badge. Media registries retain creator, source and license attribution. Images describe the actual setting and season; area photography does not imply a surveyed trail alignment. Cards use responsive, lazy-loaded images and controlled result lists.

Snow gains planning profiles, perfect-day ideas, country/month discovery and a two-mountain comparison. MTB gains trip-planning notes and Latin American coverage. Global search combines all five collections with mode and country filters. Existing Rail landmark search, saved collections and native navigation remain available.

A shared affiliate registry supplies contextual stays, flights, cars and activities through the existing configured Travelpayouts integrations. Outdoor guides also expose official rental/pass/guide resources and editorial gear checklists. Impression and click events carry destination context through the local `rallii:analytics` event hook. No invented product links, prices, live conditions or unapproved affiliate IDs were added. Product affiliate URLs and downstream analytics ingestion still require actual publisher configuration.

The home collection links to LuxeJetter and Let Them Eat Cake using their verified App Store listings and the official Apple badge, plus JetSet LATAM's actual website. Relevant Latin American MTB guides include a restrained JetSet LATAM placement.

## Fixes and validation

Fixed stale collection counts, accessible names on new filters, repeated Snow copy, comparison photo spacing, unsafe non-HTTPS attribution URLs, and several initially mismatched photo selections. TypeScript's unused-local/parameter check passed; no unverified legacy functionality was deleted.

- TypeScript and ESLint passed.
- All 150 tests passed, including saved-data compatibility, catalogue uniqueness, search isolation, affiliate URL validation and photography attribution.
- Production web build and native static export passed (334 generated pages).
- Static link audit: 329 HTML documents, 13,520 references, zero broken internal targets.
- Catalogue/image audit: zero duplicate identifiers, missing images or invalid source protocols.
- Browser checks: 44 visits across 390, 430, 768 and 844-pixel widths, including landscape; no page errors, horizontal overflow, broken images or missing image descriptions. Country filtering, controlled MTB lists, Snow comparison and global mode isolation passed.
- Capacitor doctor: Android checks passed; iOS tooling check requires Xcode, unavailable on this Windows host. No signing or native identity changes were made.

## Reproduction and limits

Use `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and `npm run native:build`. Expansion audits live in `scripts/audit-expansion.ts`, `scripts/audit-export-links.mjs`, and `scripts/audit-external-links.mjs`. Browser verification uses the repository's local Playwright installation under `build/photography-tools`; set `RALLII_VERIFY_URL` to the running preview. Media preparation requires the existing sharp tooling and Wikimedia network access.

Some official tourism/operator sites reject automated requests with HTTP 403, so those external endpoints could not all be machine-verified. Snow conditions are explicitly not connected to a live feed. New MTB entries are destination guides, not fabricated GPX routes or measured rides. Physical iPhone/iPad testing and App Store submission were not performed. OTA publication is authorized separately by the user and uses the existing production workflow scoped to `com.rallii.rail`.
