# Review cleanup changelog

- Navigation and home/planning copy: src/components/family-header.tsx, mobile-shell.tsx, site-footer.tsx, family-home.tsx, plan-journey.tsx; src/app/rail/page.tsx, saved/page.tsx, green/my-green/page.tsx, mtb/[slug]/page.tsx. Removed Pro entry points and described existing free trip tools.
- Legacy route: src/app/pro/page.tsx now renders the free My Rallii library and its metadata.
- Free access and preserved functionality: src/lib/entitlements.ts and src/components/my-rallii.tsx. Enabled existing collections, route access, supported scenic alerts and unlimited Rail saves without a membership.
- Removed payment-limit messaging: src/components/journey-actions.tsx, save-route-button.tsx and ride-mode.tsx.
- Updated existing entitlement regressions: test/pro-store.test.ts and test/route-repository.test.ts.
- Added only these three release documents under docs/ios-resubmission/.

No catalogue data, storage schema, native configuration, plugins, build numbers or unrelated local files changed.

- Upload follow-up: .github/workflows/ios-testflight.yml stamps the embedded OTA version during sync so a stale production OTA cannot restore Pro. Review submission remains manual.
