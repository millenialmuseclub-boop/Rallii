# Rallii family integration

## Decision and first milestone

Rallii is the umbrella; Rail and Green are separate activities in one bundled Capacitor application. Keep Rail at its existing URLs and put Green at `/green`. Deliver the shared activity switcher, all existing Rail navigation, Green discovery and generated course detail pages first. Bring Green's supporting destinations, collections, trips, comparison, planning and library with their existing models so discovery links remain functional. Do not create a second native container.

## Code audit (7 September 2026)

Inspected Rail's current source, package lock, Capacitor configuration, native release workflows and readiness notes, and Green's local source at commit `db5c0e409900b9d81403a2bec20634aae8b06b0d`. Green's only local change was an untracked image, excluded from integration. Older native readiness documents describe preparation, not evidence of approval; the supplied approved Rail baseline remains the release identity.

| Area | Collision / decision |
| --- | --- |
| Routes | Both own `/`, `/plan`, `/compare`, `/gear`, `/privacy`, `/partner-widget`. Prefix every Green application route and internal link with `/green`; never redirect Rail's existing detail, Ride Mode or planning URLs. |
| Modules | Both use `@/components`, `@/data`, `@/lib`, `@/types`. Copy Green into `src/green` and rewrite its aliases; keep course and journey types independent. |
| CSS | Both define root variables and generic `.site-header`, `.eyebrow`, buttons and map styles. Scope application rules to activity wrappers; retain one shared Tailwind reset and MapLibre stylesheet. |
| Assets | Both own images, icons, manifests and service workers. Bundle Green media beneath `/green-assets`; keep Rail's existing native icons, root manifest and service worker. Do not register Green's service worker. |
| Storage | Rail uses `rallii:travel-library`, with existing `rallii:saved-routes` migration. Green uses `rallii-green:course-library`, `rallii-green-shopping-list` and session key `rallii-green-region`. Preserve these formats and keys; add only `rallii:activity:v1`. |
| Dependencies | Green uses Next, React, React DOM and MapLibre already present in Rail. Use Rail's lockfile; no new native plugin or runtime dependency. |
| Static export | Green discovery, comparison and planning read server `searchParams`. Replace these with bounded client query readers inside Suspense. Existing generated detail routes remain build-time catalogue pages. |
| Native release | Reuse `out/`, `scripts/build-native.mjs`, `com.rallii.rail`, signing, permissions, R2 manifest and Capgo verification unchanged. No OTA publication or deployment. |

## Shell and compatibility

One accessible Rail / Green navigation primitive appears in both desktop and mobile headers. Activity follows the URL, and visits update the remembered activity. First native root launch restores Green only if explicitly remembered; missing, invalid or unavailable storage defaults to Rail. Explicit deep links win. The public Rail website continues to open Rail at `/`, regardless of preferences; Green's independent public repository is not modified. Native relaunch restoration is separate from ordinary in-app navigation.

The activity registry includes only released activities. Trail and Snow can later add namespaced routes and independent models through the same shell; there are no unfinished tabs. Shared shell settings currently consist of remembered activity; broader settings and visual primitive consolidation are deferred until there is a concrete shared requirement.

Green browser saves on its public origin do **not** transfer to Capacitor storage. This milestone does not claim account sync or migration across origins. A later explicit export/import or account-based migration needs schema validation, consent and merge rules. Existing Rail saves remain in the same native origin and key, with the legacy migration unchanged.

## Implementation order

1. Add family registry, resilient remembered activity and shared switcher.
2. Bundle Green source and media; namespace routes, imports and styles.
3. Adapt query-dependent pages for static export while retaining query links.
4. Verify Rail regression tests, Green catalogue/library tests, TypeScript, lint, web and native static builds, and browser interaction/persistence.
5. Record results and unresolved device/release checks below.

## Release sequence and remaining priorities

1. Physical iPhone TestFlight upgrade from the approved Rail build: confirm existing saves, initial Rail launch, Green restoration after termination, deep links, safe areas, VoiceOver, larger text, maps, Ride Mode and offline/network recovery. Browser checks cannot certify these.
2. Review combined privacy/support wording, store screenshots, umbrella display name/icon and review notes. Make native branding changes only in a reviewed store update; do not change the bundle identifier or signing identity.
3. Use the existing manually triggered TestFlight workflow after review and separate authorization. Validate staging OTA compatibility and rollback on devices before any production consideration. Submit the combined feature expansion as a reviewed store update, not an unreviewed OTA launch.
4. Design explicit Green save import/export and optional shared settings. Keep public sites independently deployable; establish a deliberate catalogue update workflow to avoid source drift.
5. Add Trail and Snow only after their data, discovery/detail flows and release acceptance tests are ready.

## Validation

Implemented on `codex/rallii-family` as local working-tree changes.

| Check | Result |
| --- | --- |
| Unit/regression tests | 112 passed, including Rail direction, geometry, Ride Mode, legacy-save migration, Green catalogue/media/library and activity launch policy. |
| TypeScript and lint | Passed. |
| Standard website build | Passed: 192 generated pages. Green's independent source repository was not changed. |
| Native static build | Passed after the final hydration fix: 192 generated pages, including 50 Green courses and all 36 Rail journey and Ride Mode routes. |
| Browser, actual `out/` bundle | Rail → Green switching; Green discovery → Pebble Beach detail; Want to Play → Played; reload persistence; Rail's saved Bernina Express retained in its original key; planner course query and comparison pairing query passed. |
| Visual checks | Desktop Rail/Green and 390 × 844 mobile Rail/course detail screenshots inspected. Green course detail had no horizontal document overflow. |
| Hydration | Initial Rail load exposed nested photo-credit anchors inside journey links. Cards now render credit text while hero images retain source/license links. Rebuilt and revisited Rail: valid card links rendered; the browser error log retained the two earlier errors, so a fresh clean-session error check remains outstanding. |
| Release configuration | Bundle ID, native project files, signing, permissions, OTA configuration, workflows and dependency lockfile unchanged. |

Browser verification is Chromium only, not a physical iPhone or signed native archive. Native launch restoration policy is unit-tested; physical relaunch/upgrade testing remains required. Map UI and attribution rendered on the course page, but physical-device GPS, offline tiles, external booking and OTA recovery were not verified. The final browser pass was blocked by automatic approval review reporting an account usage limit. No workaround was attempted. Remaining browser checks: fresh-session error log, discovery setting query, Rail Saved screen navigation, keyboard switcher flow and simulated native restoration.

The hydration repair also required updating a pre-existing source-string test that expected an obsolete extensionless widget URL. Green now reuses Rail's native-aware partner widget component. Green's media validator was adapted to the new asset prefix. Catalogue pagination was already retired in the current Green chapter-based UI; its stale `page` query is still removed by discovery.

Screenshots: `rail-desktop.png`, `green-desktop.png`, `rail-mobile.png`, `green-course-mobile.png` alongside this document. Reproduce the static preview with `npm run native:build` then `node scripts/serve-native.mjs` at `http://127.0.0.1:4173`.

No deployment, push, OTA publication, signing change or store submission was performed. Before release, finish the outstanding browser checks above, then follow the prioritized TestFlight and reviewed-store-update sequence.

## Global Rallii Pro and product cohesion — 8 September 2026

### Release decision

Continued the existing uncommitted integration on `codex/rallii-family` at `C:/Users/Jordann Lopez/.codex/worktrees/0677/Rallii`. The main checkout and its unrelated work were not changed. During this pass, the owner explicitly deferred purchase setup until **Trail and Snow are built**. Accordingly, this pass implements and tests the shared architecture, but does not install RevenueCat, create products, configure credentials, activate subscriptions, or expose a purchase override in the application.

### Rallii Pro architecture

Previously, `useEntitlements()` always returned a static free object. There was no purchase SDK, customer account binding, configured product, or active subscriber integration to migrate. The Rail Pro screen displayed speculative pricing and unfinished offline functionality.

Now the root layout owns one `ProProvider`, outside the activity shell. `useEntitlements()` exposes `isPro`, status, loading, refresh, restore, purchase and paywall navigation. `PurchaseProvider` is the adapter boundary for verified customer information and provider updates; `rallii_pro` is the single entitlement identifier for every activity. No feature queries a billing SDK, persists a paid flag, or creates mode-specific subscription state. Future provider setup belongs in a client bootstrap around this provider, using public SDK configuration and properly verified customer information, with account/expiry handling supplied by the SDK.

Concurrent requests are deduplicated; newer customer updates beat stale refresh results. Errors preserve the last verified entitlement for the current session and expose a retry message. Expiry removes Pro capabilities. Visibility and connection recovery trigger refresh when a provider is configured. With no provider, the application stays free and restoration explains that it is unavailable. No prices or checkout controls are shown in this release.

### Feature audit

| Feature | Implementation and release status |
| --- | --- |
| Unlimited Rail saves | Implemented through the shared entitlement; dormant in this release. Existing free limit of two remains, and older libraries over that limit remain readable. |
| Foreground Rail Scenic Alerts | Existing direction/progress logic is implemented on supported routes and consumes shared Pro. Fixed stale entitlement capture in an ongoing GPS callback. Physical GPS reliability still needs device testing. |
| Ride Mode demo | Implemented and remains free. Background/locked-screen alerts are not implemented. |
| Cross-mode collections and notes | Implemented Pro functionality in My Rallii: name/edit a collection, include saved Rail and Green references, and save private trip notes. Tested with an isolated provider; dormant in the shipped free state. |
| Green course organization | Uses those same collections and notes. Existing course saves, comparisons, filters, detail intelligence and planning remain free. No fabricated course data or newly imposed Green save limit. |
| Offline maps/journey packs | Partial preparatory architecture only; no supported download product. Capability is false for every tier and not advertised. |
| Exact/enhanced live timetables | Planned. Existing editorial operational context and official links are not a live schedule integration. Capability remains false. |
| Best Side to Sit, scenic timelines, existing course intelligence | Existing discovery/detail functionality; not newly restricted or advertised as an exclusive Pro benefit. |
| Course/Round, Trail and Snow companions | Future work; no new speculative companion system or unfinished activity tabs. |
| Billing, cross-device entitlement restoration, account sync | Deferred, not implemented as a live service. Purchase/restore behavior was exercised using test customer information only. |

### My Rallii, saves and shared structure

Added `/my-rallii/` with All / Rail / Green save filters and links to the original save-management screens. It reads `rallii:travel-library` and `rallii-green:course-library` directly, preserving Rail's existing legacy migration. Collections use the separate versioned key `rallii:collections:v1` with namespaced activity/slug references rather than duplicated destination records. Previously saved collections and notes remain readable after expiry; a storage write failure retains the editor's draft and reports the problem. Reading unavailable storage no longer blanks the shared screen.

Both activities link to the same Pro screen and My Rallii. Shared pages do not overwrite the remembered activity. The global screens reuse the existing shell, typography, surfaces, colors and mobile navigation, with responsive cards and at least 44px primary controls. Removed Rail-specific Pro branding and unused placeholder pricing.

Destination audit: Green has destination records with course relationships, while Rail primarily supplies route endpoints, countries, stops and places. They are not interchangeable destination entities. Kept both catalogues intact; the safe shared primitive today is the namespaced experience reference. Future normalization should introduce stable destination IDs and explicit experience associations, not infer identity from matching display names or destructively rewrite existing saves.

### Validation and fixes

- **126 tests passed**, preserving the original 112 and adding 14 focused tests for shared entitlement, failures, cancellation, restore, expiry, stale responses, saves, collections and native export aliases.
- **Production web and native static builds passed: 193 generated pages**, including all 50 Green course pages and existing Rail routes.
- **TypeScript and lint passed** after the final source fixes. Raw results are alongside this report.
- **Main browser suite passed with an empty console/runtime error log.** Tested shared screens at 390×844, 768×1000 and 1440×1000, with no document overflow. Tested legacy Rail migration, unified save filters, Green Played persistence, Rail/Green switching with keyboard activation, remembered activity across Pro visits, reload and back navigation, representative Rail and Green details, query routes, and unavailable restoration.
- All generated Rail journey, Green course, destination, collection and trip detail documents were checked for HTTP 200 and headings. Representative pages were hydrated and interacted with; this is not a claim that every generated page received exhaustive visual review.
- A separate browser fixture mounts the real Pro provider, membership and My Rallii components: free → restore → Rail Pro → Green Pro → mixed collection and notes → expiry → read-only persistence. It also mounts the real FamilyShell with simulated Capacitor/navigation to verify Green native root restoration and explicit Rail deep links. Generated fixture files live under ignored `build/pro-ui`, outside app routes, `public`, and `out`.
- Browser validation found Windows Next 16.3 export segments nested under `__next.*` directories while client requests use dot-separated filenames. Native build now adds missing aliases without changing originals or existing aliases (185 aliases for this build). This fixes actual bundle requests, not just the preview server. No native project settings changed.
- Hardened local preview 404 handling and optional service-worker registration. Blocked registration previously raised an unhandled error in the test browser; normal browsing now survives unavailable service workers.

Evidence: `pro-test-results.txt`, `pro-typecheck-results.txt`, `pro-lint-results.txt`, `pro-web-build.txt`, `pro-native-build.txt`, `pro-browser-results.json`, `pro-mobile.png`, `my-rallii-desktop.png`, and `pro-active-fixture-mobile.png`. The active-Pro screenshot is explicitly a test fixture, not an active purchasable membership.

Reproduce with `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run native:build`, then `node scripts/serve-native.mjs` and `node scripts/verify-family-browser.mjs`. Browser scripts require Playwright and installed Chrome; `RALLII_PLAYWRIGHT_PATH` can point to the bundled Playwright package. The scripts run local browser fixtures and do not create purchase products or contact a billing provider.

### Native / Store readiness and remaining steps

Bundle identifier, Capacitor configuration, iOS/Android projects, signing, permissions, icons, OTA configuration, workflows and dependency lockfile remain unchanged. Native static compilation and Chromium sizing checks pass; this Windows environment did not produce a signed iOS archive or certify Safari/WKWebView behavior.

Before TestFlight:

1. Review these local changes and the combined app's screenshots, support/privacy text and review notes. Update metadata to describe Rail + Green and device-local collections accurately; do not advertise purchasable Pro or unsupported offline/background features. No purchase metadata setup is required for this deferred release.
2. On macOS, use the existing native build/sync and signed archive workflow with the current identity. Check the generated segment requests in WKWebView, including an ordinary macOS static export.
3. Install an upgrade over the existing Rail build on physical iPhone and iPad. Verify old saves, Green restoration after termination, explicit deep links, safe areas, keyboard and larger text, VoiceOver, orientation, modal/scroll behavior, external booking links, real GPS/Ride Mode, offline/error recovery, and OTA rollback compatibility. Browser tests do not replace these checks.
4. After review and explicit release authorization, upload using the existing TestFlight workflow and complete internal testing. No push, deployment, OTA publication or Apple submission was performed in this pass.
5. After Trail and Snow are built, configure the purchase SDK/products with one `rallii_pro` entitlement, connect the adapter, and validate sandbox purchases, cancellation, restore, expiration, account changes and cross-activity access on devices before enabling billing.

Remaining release blockers are physical-device/upgrade validation and signed TestFlight verification. Billing is deliberately deferred by the owner, not a blocker to reviewing this free release. Account sync, destination normalization and additional Pro/data features are future work rather than hidden release claims.

### Files changed in this pass

- Shared state: `src/lib/entitlements.ts`, `src/lib/pro-store.ts`, `src/hooks/use-entitlements.ts`, `src/components/pro-provider.tsx`, `src/app/layout.tsx`.
- Collections/saves: `src/lib/pro-collections.ts`, `src/components/my-rallii.tsx`, `src/app/my-rallii/page.tsx`, `src/app/saved/page.tsx`, `src/app/green/my-green/page.tsx`, `src/lib/travel-library.ts`, `src/green/hooks/use-course-library.ts`.
- Membership/cohesion: `src/components/pro-membership.tsx`, `src/app/pro/page.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/components/app-screen-shell.tsx`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/journey-actions.tsx`, `src/components/activity-switcher.tsx`, `src/components/family-shell.tsx`, `src/lib/activities.ts`; removed unused `src/data/pro.ts`.
- Runtime/build: `src/components/ride-mode.tsx`, `src/components/pwa-registration.tsx`, `scripts/build-native.mjs`, `scripts/normalize-native-segments.mjs`, `scripts/normalize-native-segments.d.mts`, `scripts/serve-native.mjs`.
- Verification: `test/pro-store.test.ts`, `test/native-segments.test.ts`, `scripts/verify-family-browser.mjs`, `scripts/verify-family-interactions.mjs`, this report and the evidence files above.

Pre-existing integration changes remain uncommitted and preserved. In particular, the Green catalogue/assets, CSS scoping, route-media repair, package script change and previous regression-test adjustment were not recreated or discarded.

### Final interaction verification

`node scripts/verify-family-interactions.mjs` passed against the final native bundle with an empty error log. Verified the coastal discovery query through the visible filter panel, typed course search, comparison A/B selection and planner course query, Green map rendering, Rail's mobile Map tab, Rail save/reload persistence, and Ride Mode demo start → 50% progress → end. Evidence: `pro-interaction-results.json`. Map canvases and interaction were verified in Chromium; physical GPS, offline tiles and device rendering remain in the device checklist above.
