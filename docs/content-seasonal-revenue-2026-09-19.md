# Content, seasonal planning and revenue pass — September 19, 2026

## Scope delivered

- Snow: one new destination, Brévent–Flégère; 52 total. Nine destinations now have sourced terrain, transport, family, off-mountain, seasonal and suggested-day profiles: Brévent–Flégère, Chamonix, Whistler Blackcomb, Lake Louise, Revelstoke, Zermatt, Niseko, Coronet Peak and Portillo. No live conditions, prices or operating dates added.
- MTB: 45 destinations retained. Ten named ride options added within six existing destinations: Slickrock, Glentress, Lost Lake, Whistler Bike Park, Tahoe Flume and Blue Derby. Published distances are scoped to the actual loop or segment; unknown ascent remains explicit. These are editorial options, not new navigable geometry.
- Trail: Johnston Canyon Upper Falls added, with 4.8 km return distance, 120 m ascent and about two hours; 34 total. Parks Canada's hiking guide supplies the current distance and its Banff walking brochure supports the ascent. The approach photograph is explicitly identified as Lower Falls.
- Rail: 36 routes retained; one new Swiss winter planning guide, bringing journey guides to ten. Reservation guidance checked against [RhB](https://www.rhb.ch/en/tickets/bernina-line-reservations/).
- Photography: five seasonal panels reuse attributed, real project photographs at Whistler and Bariloche/Catedral. New Brévent and Johnston pages use geographically accurate existing sector/approach images. No new image downloads or AI photography; no claim that these are current conditions.

## ShopMy links

Created through the publisher's authenticated ShopMy UI and individually opened through the full redirect to the named REI product. Retailer redirects retained ShopMy attribution. Six links generated and verified; five selected for Rallii. Exact generated URLs are centralized in `src/data/shopmy-products.ts`, with retailer URLs, verification date, product-specific reasons and allowlisted route placements. No credentials, session IDs, copied redirect tracking or price/stock promises stored.

| Product | Generated URL | Placement |
| --- | --- | --- |
| Smith Squad ChromaPop goggles | https://go.shopmy.us/p-87739849 | Nine expanded Snow profiles |
| Black Diamond Mercury mittens, men's sizing | https://go.shopmy.us/p-87742818 | Lake Louise, Revelstoke, Niseko, Portillo |
| Crankbrothers M19 tool | https://go.shopmy.us/p-87740761 | Six expanded MTB destinations |
| CamelBak M.U.L.E. EVO 12 | https://go.shopmy.us/p-87741175 | Slickrock, Tahoe Flume, Glentress, Blue Derby |
| Osprey Daylite Plus | https://go.shopmy.us/p-87741754 | Johnston Lower/Upper Falls, Preikestolen, Hooker Valley; Glacier Express, Bernina Express, California Zephyr, The Canadian |

The initial non-EVO CamelBak link, https://go.shopmy.us/p-87739071, also resolved correctly but was excluded after reviewing fit/strap concerns and variant availability. Its existing ShopMy account record was left intact.

Outdoor products appear inside the existing Plan this trip disclosure. Rail's daypack appears in Practical. Affiliate disclosure and sponsored link attributes are included. Replacement workflow: create a replacement in ShopMy, open the generated URL to confirm the actual product and attribution, then update the registry row and verification date.

## Other commerce and Jet Set

Existing approved booking integrations are preserved. This local build does not have the Travelpayouts publisher configuration, so those widgets remain hidden. No new booking affiliate program or fabricated booking URL was added. Official rentals, lessons, passes and operator links remain distinguished from affiliate bookings.

Hiram Bingham now links to the verified [Sacred Valley & the Andes article](https://thebrunchmanifesto.blog/2025/10/14/sacred-valley-the-andes-cultural-luxury-adventures-in-the-heart-of-peru/). The registry has no broad country fallback. Generic Latin America promotional copy in MTB details no longer renders without an actual matching article.

## Functionality and measurement

- Rail comparison selection now derives from the URL, fixing stale selections after swaps and browser navigation.
- Snow comparisons preserve a shareable pair in the URL, reject unknown IDs and duplicates, and link directly from destination pages.
- Snow favorites are available in the shared Saved filters. Existing storage keys and schemas are unchanged.
- Snow's planning-month filter includes all twelve months; profiles distinguish northern and southern seasons.
- Small-screen planning grids, suggested days and Snow comparisons stack into one column.
- Extended the existing local `rallii:analytics` event hook for route views, save actions, comparisons, ShopMy, official commercial and contextual Jet Set links. No analytics collector exists: these events are not stored or transmitted, and no dashboard or attribution reporting is claimed. Existing partner widget events measure opening the widget; cross-origin booking completion is not measurable here.

## Validation

- `npm run build`: passed, 337 generated routes/pages in build progress.
- `npm run lint`, `npm run typecheck`: passed.
- `npm test`: 154 passed, zero failures.
- `npm run native:build`: passed; native static export and 329 segment aliases generated.
- `scripts/audit-expansion.ts`: no duplicate slugs, missing local destination photos or malformed official source URLs.
- `scripts/audit-export-links.mjs`: 332 HTML pages, 13,697 local references, zero broken links.
- Twenty focused planning-source URLs checked. Seventeen returned HTTP 200; Coronet Peak and the two Whistler trail/park sources returned 403 to scripted requests but opened successfully in the authenticated browser session without a challenge. All six generated ShopMy redirects and the Jet Set article opened correctly.
- Browser QA used the actual native export at 390×844, 430×932, 768×1024 and 844×390. Checked Snow/MTB/Trail/Rail details, precise product placement, seasonal photography, Snow comparison reload, Rail swap/back, Snow Want to Go/Been/Favorite, shared favorites, and existing Rail saved/map associations. No horizontal overflow or broken images on checked pages; no captured application console errors.
- Temporary Lake Louise save/favorite was removed after verification. Existing saved journeys and collections were retained.
- Map marker popups, zoom controls and saved-route associations responded. The browser capture showed DOM markers but not the WebGL background/route drawing; complete map visual validation remains unconfirmed on this Windows browser. No speculative map rewrite was made.
- `npm run cap:doctor`: installed Capacitor core/CLI/iOS/Android all 8.5.0; Android check passed. Command exits nonzero because Xcode is unavailable on Windows. Remote latest-version lookup returned unknown. No native compilation, signing, sync, OTA upload or store submission performed.
- `git diff --check`: passed. Pre-existing untracked research files and artifacts were left untouched.

## Remaining actions

No action is needed to use the five ShopMy links. A Mac with Xcode is needed for full iOS/device validation, including a visual map check. Existing approved publisher configuration is needed if booking widgets should appear in this build. An existing analytics collector must be connected if persistent measurement is desired; none was installed.
