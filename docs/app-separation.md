# App ownership and separation audit

Inspected 2026-09-09. This records verified configuration, not a claim that migration is finished.

| Resource | Rallii — travel | Let Them Eat — food | Fashion project — Jet Set mapping pending |
| --- | --- | --- | --- |
| GitHub repository | millenialmuseclub-boop/Rallii | millenialmuseclub-boop/Let-Them-Eat-Cake | millenialmuseclub-boop/Project-LuxeLook |
| Local project | Dev/Rallii | Documents/ChatGPT/Let Them Eat | Dev/Project LuxeLook |
| Existing native app ID | com.rallii.rail | com.letthemeatcake.app | com.luxejetter.app |
| Web deployment | Vercel project rallii; rallii-kappa.vercel.app | Netlify configuration exists; canonical production site still needs verification | Vercel luxe-jetter-frontend and luxe-jetter-backend |
| OTA provider | Manual signed bundles in Cloudflare R2 | Manual signed bundles in Cloudflare R2 | Capgo, scoped to com.luxejetter.app |
| OTA object prefix | updates/com.rallii.rail/{channel} | updates/{channel} | Capgo beta / production channels |
| OTA bucket | letthemeatcake-ota — shared; migration outstanding | letthemeatcake-ota | Separate provider; account access scope unverified |
| Database | TURSO_DATABASE_URL; defaults to local.db | Production server/data configuration not fully audited | Backend TURSO_DATABASE_URL; production ownership unverified |
| Saved items | Rallii-specific browser stores, separate keys per travel activity | letThemEat.savedItems.v1 | Requires complete store audit |
| Pro entitlement | rallii_pro; purchase provider interface exists | Not verified | Not verified |

## Required ownership boundaries

Each of the three product families owns its repository, deployments and domains, native app records, update destination and publishing permissions, database, authentication audience, and purchase products/entitlements. Never grant one app's Pro membership to another app implicitly.

An owner can administer all three using one GitHub/Vercel/Apple account. Resource isolation and least-privilege credentials are still required within that account; separate paid owner accounts are not assumed.

Rallii contains Rail, Green, Trail, and MTB. Existing local MTB changes remain uncommitted and unpublished. The user's earlier instruction prohibiting automatic deployment of that work remains in effect.

## Confirmed defect and migration requirements

Rallii's publisher still hardcodes Let Them Eat's bucket and public delivery host in `.github/workflows/ota-publish.yml`. Native build workflows also embed that host. The app-specific object prefix and manifest app-ID validation prevent the earlier manifest collision, but do not provide independent storage or publishing permissions.

1. Provision a Rallii-owned delivery bucket and enable its public delivery endpoint.
2. Issue a Rallii publishing credential scoped to that bucket. Verify signing-key ownership without exposing private key material; do not rotate keys before a compatible native rollout exists.
3. Update every Rallii native build and OTA publisher together to the verified destination. Publish the bundle before its manifest and verify the app ID, signature compatibility, URL, and download.
4. Keep the old food manifest intact for installed Let Them Eat clients. Do not repurpose the legacy path or remove bundles while installed clients use them.
5. Roll out compatible native binaries through the existing app records. TestFlight upload does not release an App Store version; App Review and release status must be verified separately.
6. Verify production database URLs are different and credentials are scoped to their own databases. Verify auth and purchase configurations from the service dashboards before claiming full separation.

No cloud resources, domains, app IDs, database records, secrets, or production releases were changed by this audit.

## Names requiring confirmation

The saved fashion repository is currently called Luxe Jetter / Project LuxeLook. Confirm whether Jet Set includes Glow Jetter and Little Jetter before moving or renaming those projects. Likewise, standalone Rallii Green and food subapp deployments should be mapped to their parent family before consolidation; do not delete them as duplicates.
