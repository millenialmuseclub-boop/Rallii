# Rallii Rail app-store readiness

Rallii Rail has PWA metadata, public Privacy and Terms pages, affiliate disclosure, and an offline fallback. This is readiness work only—not App Store or Google Play approval, compliance certification, or a submission.

## Capacitor and OTA foundation

The repository includes Capacitor core, CLI, iOS, Android, and the Capgo updater, with the native identity **Rallii Rail** (`com.rallii.rail`). The app can generate a static Capacitor bundle with `npm run native:build`; Vercel builds remain unchanged.

OTA is self-hosted on Cloudflare R2. The packaged app manually polls R2 for an encrypted manifest and uses the Capgo plugin only to verify and decrypt bundles provided by Rallii. It does not use Capgo-hosted infrastructure. See [capacitor-native-plan.md](./capacitor-native-plan.md).

Only compatible web-layer updates can use OTA: UI, editorial content, route data, prepared GeoJSON, and web behavior. Native plugins, permissions, native configuration, signing, app icons, privacy manifests, and public-key rotation require a new signed store binary.

## Still required before submission

- The generated `ios/` and `android/` Capacitor projects are committed. Validate `npm run cap:sync` with each static native bundle; cloud CI provides the macOS runner needed for iOS, so a local Mac is not required.
- Configure Rallii Rail's own signing certificates, provisioning profile/keystore, bundle IDs, versioning, and cloud release workflows.
- Test staging and production R2 OTA updates on physical iOS and Android devices, including rollback.
- Enrol in Apple Developer Program and Google Play Console.
- Add a maintained public support URL and contact address to legal pages and store listings.
- Complete Apple App Privacy and Google Play Data Safety declarations for the final native build and every embedded partner surface.
- Confirm consent, tracking, cookie, advertising, affiliate, and partner-widget obligations for intended markets with qualified counsel.
- Create final icons, launch assets, screenshots, descriptions, age ratings, categories, review notes, and release notes.
- Test installation, offline behavior, external links, safe areas, orientation, accessibility, partner redirects, and update recovery on physical devices.
- Submit builds, respond to review questions, and obtain separate Apple and Google approval.

Re-check the current [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) and [Google Play policy centre](https://support.google.com/googleplay/android-developer/topic/9858052) immediately before submission.
