# Rallii photography review

The implementation is ready for local review. No deployment, OTA update, native upload, or App Store submission change was made. Existing routing, save schemas, affiliate links and compact destination drawers are preserved. Unrelated untracked railway research files were left untouched.

| Mode | Published records covered | Result |
| --- | ---: | --- |
| Snow | 12 / 12 | Twelve distinct, named winter photographs; dedicated registry and photo/credit components; landing, family tile, expanded cards and detail pages. |
| Green | 50 / 50 | Existing 32 course photographs optimized; 18 gaps filled with explicitly labeled regional/resort photographs. All seven destination overviews and collection, comparison, saved and planning views resolve photos. |
| Rail | 36 / 36 | Local files and metadata audited; photography optimized to WebP; credits restored on previously hidden surfaces. |
| Trail | 30 / 30 | Fourteen new named trail/attraction photographs replace shared park views; every record now has distinct imagery; card credits added. |
| MTB | 30 / 30 | Four duplicated record photographs replaced; regional context is explicitly labeled representative. |

Green's 18 additions are **representative**, not exact-course photography. Captions and alt text identify the photographed place and state the distinction, including Streamsong Black used as resort context for the Red course. The reviewed Commons searches did not establish reusable exact-course alternatives for those entries. These can be replaced independently when licensed exact-course files become available.

## Shared screens and accessibility

Family saves now show the photo associated with each saved experience. Collections use the first included experience as an intentional overview/detail pairing. Empty saved views offer a labeled catalogue photograph rather than an empty workspace. The shared renderer handles photos and linked credits; each mode retains its own data and device storage.

Credits wrap instead of being truncated or hidden. New credit links have 44px touch targets, and Snow card body text is at least 16px. Images retain descriptive alt text and per-asset focal positions. Snow still opens a region, then one destination at a time; it does not introduce an infinite feed.

## Assets and provenance

All production photo references are local. New photographs were selected from Wikimedia Commons metadata, then visually reviewed and encoded as WebP. No AI-generated destination photography was used.

- [Reviewed selections](../scripts/photography-selections.json) records the 48 new/replacement photographs and their intended captions.
- [Source evidence](photography-source-evidence.json) preserves retrieved source descriptions, creators, licenses, source URLs and original image information.
- The mode registries record source, creator, license and license URL, caption, alt text, actual local dimensions, file size in bytes and focal position.
- Rail's referenced images decreased from 49.5 MB to 11.2 MB, approximately 77%. Fifty-three superseded JPEG/PNG originals were removed only after verifying a WebP replacement existed and no runtime file referenced the old path.
- Reuse of a photograph across its catalogue card, detail page, save and collection overview is intentional. Distinct records do not share an identical photo within a mode.

## Validation

- Typecheck: passed.
- ESLint: passed.
- Tests: 148 passed, including coverage for all 158 records, local path safety, actual decoded dimensions/file sizes, unique image identities, attribution fields, source URLs and Snow's compact browser.
- Native production export: passed; 269 static pages and 261 native segment aliases.
- Browser verification: 65 page/viewport combinations, at 1440px desktop and 390px phone widths; all five modes, comparison/planning/collection/saved screens, all 12 Snow detail pages and populated family saves/collections.
- Zero browser console/page errors, broken images, missing alt text, hotlinked production photos, clipped credit text or horizontal document overflow in the verified pages.

The browser pass caught a nested-credit-link hydration issue on Rail's linked overview tiles; those tiles now use concise plain attribution, with full linked attribution on their destination pages. The final export was verified after that fix and the image optimization.

Evidence and representative screenshots are in [photography-review](photography-review/). The local preview can be served with `node scripts/serve-photography-review.mjs` and opened at `http://127.0.0.1:4184/snow/`.

## Reproducing checks

Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run native:build`. The native build only creates the local export.

For browser checks, install `playwright` under the ignored `build/photography-tools` directory, start the local review server, and run `node --experimental-strip-types scripts/verify-photography-browser.mjs`. The verifier uses a fresh Chrome context and creates its own save fixtures without changing the user's browser storage.

Photo acquisition is explicit, separate from builds: `scripts/prepare-photography.mjs` can read the checked-in source evidence. Source-site rate limits may require retrying. `scripts/audit-photography.mjs` measures local metadata; `scripts/finalize-photography.mjs` bounds new photo dimensions. The original-file migration scripts are one-time maintenance utilities, not build hooks.
