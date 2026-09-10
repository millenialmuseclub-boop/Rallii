# iOS resubmission status — 10 September 2026

## Release state
- Last confirmed App Review submission: version 1.2, build 15, submitted successfully on 9 September 2026. Evidence: https://github.com/millenialmuseclub-boop/Rallii/actions/runs/34377182725 (logs explicitly name version/build). Current App Store Connect review state was not independently queried.
- A later TestFlight workflow produced build 16: https://github.com/millenialmuseclub-boop/Rallii/actions/runs/34388835287. This is not evidence that build 16 was submitted for review.
- Latest successful production OTA workflow uses baseline commit 501e6c56820d0fa3c3e8f4d32b774b369ca873ab: https://github.com/millenialmuseclub-boop/Rallii/actions/runs/34395737349.

## Changes
Removed app-facing Pro links, membership promotion, purchase/restore entry points and payment-limit messages. Old /pro/ bookmarks now render My Rallii. Trip collections and notes, unlimited Rail saves, access to prepared routes and supported scenic alerts are free for all entitlement states. Existing storage keys, saved data, all five activities, maps and visual styles are preserved. Unused future purchase architecture remains dormant. No native source, configuration, plugin, entitlement, privacy, icon or build-number changes.

## Validation
- PASS: npm run native:build (production static export; 269 generated build entries and 261 native segment aliases).
- PASS: npm run build; npm run typecheck; npm test (147/147).
- PASS: audit of all 264 exported HTML files: no Rallii Pro, paywall, subscription, trial or restore-purchase prompts. Source audit includes navigation, metadata, native configuration and release workflow metadata. Remaining premium/pricing references describe third-party travel services or physical gear, not paid Rallii features; those existing links remain.
- PASS: local production-bundle browser launch, home-to-Saved navigation, all five loaded activity catalogues, cross-mode saves, free mixed collection creation/reload/edit, third Rail save surviving reload, Rail/Green map canvases, Ride Mode demo start/end and the legacy /pro/ URL. No browser console errors observed.
- Physical iOS installation, GPS, signing and App Store review acceptance were not tested here.

## OTA versus native build
Technical answer A: these changes are entirely web-bundle changes and the existing signed/encrypted R2 OTA workflow can distribute them without native source changes.
Resubmission answer: NEW BUILD REQUIRED to guarantee that Pro is absent from the first launch and offline launch of a fresh installation. The last submitted revision contains Pro navigation; its updater calls CapacitorUpdater.next(), applying a download on a later launch. OTA cannot replace the embedded fallback bundle in build 15. Consequently OTA alone does not meet the requested reviewer-cannot-encounter-Pro standard. This finding does not mean native APIs or configuration need alteration: the clean web assets must be packaged in a new binary.
Apple guideline 2.5.2 also restricts downloaded code that changes functionality; technical OTA support is not proof of review permission: https://developer.apple.com/app-store/review/guidelines/#software-requirements.

## Deployment and minimum next steps
Upload authorized by the owner on 10 September 2026. Cleanup is being committed and uploaded through the existing TestFlight workflow; review submission remains manual. No OTA manifest is being published. The workflow now passes the commit timestamp as APP_BUILD_VERSION during Capacitor sync, preventing an older OTA from replacing the cleaned embedded bundle. GitHub access works outside the network sandbox; initial authentication errors were misleading sandbox failures.
1. Review/commit/push only this cleanup and these documents, preserving unrelated local files.
2. Run the existing Upload iOS Build to TestFlight workflow on that commit with the production channel. It builds the static assets, syncs iOS and assigns its next workflow run number as the build number; no manual native refactor is necessary.
3. Verify the new build on a fresh iPhone installation, including first/offline launch, then attach that actual processed build to version 1.2 in App Store Connect. Do not reuse build 16, which predates this cleanup.
4. Submit the new build and use APP_REVIEW_RESPONSE.md after confirming its statements against that build. Check App Store Connect screenshots/metadata for old Pro references; repository metadata contains no stale subscription offer.

## Upload completed
- Version 1.2, build 17 uploaded successfully on 10 September 2026 at 18:58 UTC. Apple upload tooling reported UPLOAD SUCCEEDED with no errors.
- Source commit: d0d829e5a71f8b78204e7c85b99d7d961a0f92c8, pushed to codex/rallii-home-trail.
- Workflow: https://github.com/millenialmuseclub-boop/Rallii/actions/runs/34517225144 (success).
- No review submission was made. Apple processing/availability for selection was not independently verified. Owner should select build 17 once processing completes and submit for review.
- APP_REVIEW_RESPONSE.md now answers Apple’s four business-model questions.
