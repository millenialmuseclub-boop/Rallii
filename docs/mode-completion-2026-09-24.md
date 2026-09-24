# Trail, Snow and MTB completion

Added eight selectable discovery collections per mode and dedicated `/trail/plan/`, `/snow/plan/` and `/mtb/plan/` pages. Destination guides link to a preselected planner. Existing mobile and desktop navigation expose Plan without changing Rail or Green navigation.

Planning choices live in the URL; explicitly saved preferences can be restored on the device. Destination save buttons continue using the existing mode libraries and My Rallii. Hiking filters combine distance, gain, shape, difficulty, region and scenery; unknown elevation is never treated as zero. MTB combines level, terrain, region, kind and documented uphill access. Snow uses region and seasonal month matching; experience, activity, family and après preferences tailor notes rather than making unsupported claims about terrain suitability. Trip duration is a time budget, not an invented itinerary or reservation.

The existing 34 trail, 52 snow and 45 MTB guides provide the underlying content. No places or operational details were invented. No new photo files were downloaded: the collections reuse the existing licensed, credited local photographs and responsive card assets. Each displayed rail suppresses duplicate image keys and mounts at most four cards; planners render at most six results. Catalogues remain mode-specific. The existing affiliate configuration and approved creatives remain intact; subtle links reuse the publisher's existing project registry.

## Editorial source checks

Checked on 2026-09-24; these support evergreen collection copy. The destination guides retain their original source links and seasonal notes.

- [NPS: Hoh Rain Forest](https://www.nps.gov/olym/planyourvisit/visiting-the-hoh.htm): Hall of Mosses is a short old-growth forest loop. No opening hours or permit inventory copied.
- [Zermatt tourism](https://zermatt.swiss/en): rail arrival and village planning. The Snow planner also links the existing Swiss winter rail guide and Glacier Express detail.
- [Forestry and Land Scotland: Glentress](https://forestryandland.gov.scot/visit/destinations/glentress/bike): skills practice and signed routes; existing guide supplies individual route details.
- [Discover Moab mountain biking](https://www.discovermoab.com/attractions/mountainbiking/): demanding Slickrock terrain; its shorter Practice Loop is not described as beginner riding.

## Widgets

Both legacy widget routes now use the existing isolated static widget document. Readiness waits for rendered controls, including Agoda/Trip.com shadow DOM, rather than script download alone. Empty or failed responses get a timeout and recovery message. Reload resets frame height and refreshes the document URL; messages must come from the expected frame and origin. Direct provider links provide recovery without invented affiliate URLs. Existing source IDs and attribution remain unchanged.

The local environment has no partner `.env.local`; optional embedded tools still require the documented public environment variables at build time. Live checks explicitly used the existing attribution IDs in `.env.example`, without submitting searches or purchases. All four creatives rendered; visible form fields accepted focus. DiscoverCars' own tracking script reported a MutationObserver error while its form remained usable; this is inside the remote provider frame, outside Rallii's code. The activity creative is the existing general GetYourGuide offer, not a destination-prefilled search.

## Validation

- TypeScript, ESLint, 157 unit tests, production web build and static native export passed.
- Browser regression script: `scripts/verify-mode-completion.mjs`; set `MODE_CHECK_BASE` for either the production server or the native export server. Covers 390/768/1440px layouts, all 24 discovery collections, detail → plan links, matching, destination saves, reload, restored preferences, My Rallii and mobile switching. Also visits Rail discovery/planning/detail/compare/ride and Green discovery/planning/detail.
- Widget fixtures cover empty scripts, delayed shadow-DOM forms and network failure. Live provider verification: `scripts/verify-live-widgets.mjs`. Screenshots and machine-readable evidence are in ignored `build/mode-completion/`.
- Native export compilation and browser checks are not a physical-device test. No native submission, OTA publication or store metadata changes.

Release uses the established GitHub OTA workflow: staging first, then the same commit on production after publication checks. The main-branch push triggers the established web deployment. Pre-existing untracked research files are excluded from this release.
