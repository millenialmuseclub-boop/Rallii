# Rallii Rail native plan

Rallii Rail will ship as one web product and two native Capacitor applications. The web app remains on Vercel; the iOS and Android apps will ship a reviewed static bundle and use a controlled OTA channel for compatible web updates.

## Current state

- Capacitor core, CLI, iOS, and Android packages are installed.
- `capacitor.config.ts` reserves the native identity `com.rallii.rail` and the display name **Rallii Rail**.
- Native projects are not generated yet.
- `native-web/` is reserved for the generated static bundle and is intentionally not committed.
- The existing PWA remains the production web experience.

## Required migration before native projects

1. Produce a static `native-web/index.html` bundle from the Next.js app.
2. Move query-driven selection for Discover, Search, Compare, Plan, and Stays into client-side state or static-compatible routes.
3. Replace the server-only partner-widget endpoint with a native-safe, user-triggered embedding strategy; verify every partner permits in-app webview use.
4. Test maps, route GeoJSON, local Saved data, external links, offline fallbacks, deep links, safe areas, and accessibility on physical devices.
5. Only then run `npx cap add ios` on macOS/Xcode and `npx cap add android` with Android Studio.

## Release boundary

| Change | OTA eligible after approval | New store binary required |
| --- | --- | --- |
| Route copy, images, prepared GeoJSON, collections | Yes | No |
| Web UI and compatible bug fixes | Yes, after staged testing | No |
| Native plugin, permissions, signing, icon, splash screen | No | Yes |
| Privacy manifest, platform SDK, entitlement, native configuration | No | Yes |

## OTA workflow to implement

1. Build and test the static native bundle.
2. Attach it to a versioned update channel compatible with the installed native binary.
3. Roll out to an internal channel first, then a small production percentage.
4. Monitor failures and retain an immediate rollback bundle.
5. Record the web bundle version, native app version, release notes, and rollback target.

No OTA provider or credentials are configured in this repository yet. That decision needs an account owned by Rallii Rail and a review of pricing, data handling, store-policy support, and rollback controls.
