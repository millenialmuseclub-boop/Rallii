# Rallii app-store readiness

Rallii Rail’s web foundation includes installable PWA metadata, appropriately sized icons, safe mobile metadata, a navigation fallback for core editorial screens, public Privacy and Terms pages, and an affiliate disclosure. This is readiness work only. It is not Apple App Store or Google Play approval, compliance certification, or a submission.

## Capacitor foundation

The repository now includes Capacitor's official core, CLI, iOS, and Android packages plus a `capacitor.config.ts` identity for **Rallii Rail** (`com.rallii.rail`). The identifier is a development default and must be verified as available before registering it in Apple Developer and Google Play Console.

Rallii Rail intentionally does **not** yet include `ios/` or `android/` projects. Its current Next.js app has server-rendered route-selection and partner-widget endpoints, while Capacitor requires a separate built web-assets directory with a root `index.html`. Creating native projects before that static bundle exists would produce a wrapper that cannot faithfully run the app.

The planned native bundle directory is `native-web/`; it is ignored as generated output. `npm run cap:doctor` validates the Capacitor setup. `npm run cap:sync` becomes usable after the native bundle is implemented and after the iOS/Android projects are deliberately created.

## OTA policy

OTA is planned only for changes that can safely be represented by bundled web assets: editorial copy, presentation, route data, prepared geometry, and compatible web behavior. Native capabilities, permissions, Capacitor plugins, privacy-manifest changes, app icons, and platform configuration always require a new signed App Store / Play Store binary.

Choose one managed OTA provider before implementation—Capacitor’s documented Appflow workflow or another reviewed provider—and keep its credentials outside source control. The update channel must support staged rollout, rollback, version compatibility, and a clear release record. Rallii Rail will not enable arbitrary remote code execution or silently change native behavior through OTA.

## Still required before submission

- Build the static `native-web/` bundle: move URL-query state that belongs in the client, replace server-only partner-widget delivery with a native-compatible strategy, and prove all core route screens work without Next.js server rendering.
- On a Mac with Xcode and on a configured Android Studio environment, create and version-control the Capacitor `ios/` and `android/` projects; then run `npm run cap:sync` for each tested build.
- Choose, configure, and test a managed OTA provider and release workflow. Do not enable OTA until compatibility, rollback, and store-policy checks are complete.
- Enrol in the Apple Developer Program and Google Play Console.
- Add a maintained public support URL and contact address to the legal pages and store listings.
- Complete Apple App Privacy and Google Play Data Safety declarations using the final native build and every embedded partner SDK or web surface.
- Confirm tracking, consent, cookie, advertising, and affiliate obligations for every intended market with qualified counsel.
- Create final app icons, launch assets, phone and tablet screenshots, descriptions, age ratings, categories, and review notes.
- Test installation, offline behaviour, external links, safe areas, orientation, accessibility, account-deletion applicability, and partner redirects on physical iOS and Android devices.
- Review every embedded partner’s terms for permission to display its widget inside a packaged application.
- Configure signing, bundle identifiers, versioning, production monitoring, crash reporting decisions, and release tracks.
- Submit builds, answer reviewer questions, address findings, and obtain separate approval from Apple and Google.

Re-audit the current [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) and [Google Play policy centre](https://support.google.com/googleplay/android-developer/topic/9858052) immediately before submission.
