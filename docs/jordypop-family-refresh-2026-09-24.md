# Jordypop family refresh — September 24, 2026

Updated the shared family registry displayed in Rallii with current publisher-owned icons from Apple's public lookup API. Images are bundled locally with versioned filenames so web caches and OTA clients pick up the replacements. No native app icon, saved data or permissions changed.

| App | Verified App Store ID | Change |
| --- | --- | --- |
| Luxe Jetter | 6808023085 | Current burgundy/gold LJ artwork |
| Let Them Eat | 6801655009 | Current gold fork/pasta artwork and canonical listing slug |
| Jet Set LatAM | 6810912801 | Current pink J artwork and live App Store link |
| Little Jetter | 6810346538 | Added current compass/paper-plane artwork, live listing and kids' dress-up/travel description |

Source: `https://itunes.apple.com/lookup?id=6808023085,6801655009,6810912801,6810346538&country=us`. Artwork downloaded from the returned `artworkUrl512` values on September 24, 2026. Lookup response and mobile verification evidence are retained in ignored `build/family-refresh/`.

Release uses the existing production OTA workflow and main-branch web deployment. No App Store build or submission is required.
