# Rallii Rail native release readiness

Rallii Rail is prepared for **iOS first**, with Android kept buildable for a later Play Store release. This is release preparation, not store approval or submission.

## Current native baseline

- Native identity: `Rallii Rail` / `com.rallii.rail`.
- Both Capacitor projects are committed: `ios/` and `android/`.
- Native builds use the static `out/` bundle produced by `npm run native:build`.
- The branded Rallii Rail icon and portrait orientation are configured in both containers.
- The web service worker is disabled in Capacitor; the native app uses R2/Capgo OTA instead.
- OTA checks are best-effort. A missing, offline, invalid, or older manifest leaves the bundled app running normally.

## iOS TestFlight handoff

1. Enrol the Rallii Rail owner in the Apple Developer Program.
2. Create `com.rallii.rail` in Certificates, Identifiers & Profiles and create the matching App Store Connect record.
3. Configure distribution certificates, provisioning profiles, version/build numbers, and signing secrets in the macOS release workflow or Xcode Cloud.
4. Run the unsigned cloud validation first, then create a signed archive and upload it to TestFlight.
5. Test the first TestFlight build on physical iPhone hardware: launch, safe areas, maps, offline fallback, partner links, OTA rollback, privacy/terms, and accessibility.
6. Prepare final App Store Connect metadata: 1024px app icon, screenshots, description, category, support URL, privacy policy URL, review notes, age rating, and App Privacy declaration.

## Android preparation

1. Create the `com.rallii.rail` Play Console record only when ready for Android release.
2. Create and protect a release signing keystore; do not commit it.
3. Configure a signed Android App Bundle workflow and begin with an internal test track.
4. Complete Data Safety, store listing, screenshots, support URL, privacy policy, content rating, and testing requirements.
5. Test physical Android devices for navigation, maps, external links, offline fallback, OTA recovery, and accessibility before publishing.

## OTA boundary

R2 OTA updates are only for compatible web-layer changes such as editorial content, UI, GeoJSON, and route data. Native plugins, permissions, signing, app icons, native configuration, privacy manifests, or public-key rotation require a new signed store binary.
