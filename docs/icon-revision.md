# Rallii mountain-R icon revision

The approved enhanced mountain-R artwork replaces the previous R monogram. A cream R incorporates alpine peaks and a curved gold railway on forest green. Destination photography is unchanged.

Source: `assets/branding/rallii-monogram.png`. Regenerate exports with `node scripts/prepare-brand-icons.mjs`.

The shared RalliiMark component supplies desktop and mobile headers across Rail, Trail, MTB, Snow and Green. Exports also cover browser, Apple touch, PWA, the legacy PWA endpoint, and iOS/Android launcher assets. The maskable export retains a safe inset.

Web-layer branding can ship through the existing OTA workflow. Native launcher and App Store icons require a new signed iOS build; an OTA cannot replace those icons. App Review submission and metadata changes are separate actions.
