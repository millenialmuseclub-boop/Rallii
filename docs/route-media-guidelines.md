# Rallii route media guidelines

Rallii uses authentic photography only when its reuse terms are explicit and reviewable. Photography supports route identity and landmark intelligence; it never replaces the prepared journey guidance.

## Source hierarchy

1. Official railway or tourism media with explicit reuse permission.
2. Wikimedia Commons files with a clear Public Domain or Creative Commons license.
3. Other reputable open-license archives with creator, source, and license records.

Public visibility is not permission. Do not use travel-blog images, social posts, watermarked previews, ambiguous stock images, screenshots, or generated scenery.

## Manifest and attribution

Every approved asset is recorded in `src/data/route-media.ts`. The record must include its local path, intrinsic dimensions, descriptive alt text, editorial caption, creator, Commons or archive source page, original file URL, license name and URL, represented location, access date, and a landmark ID when the photograph directly supports prepared landmark intelligence.

Credits link to both the file description page and the applicable license. If an image is modified beyond resizing and format conversion, note that change in its manifest caption or credit.

## Local files

Store route photography in:

`public/images/routes/[route-slug]/[descriptive-name].webp`

Prepare a maximum dimension of approximately 1,800 pixels for current card and hero placements. Use WebP at a balanced photographic quality and remove unnecessary metadata. Do not hotlink source files or retain multi-megabyte originals in the repository.

## Selection and writing

A hero should identify the actual railway, landscape, or prepared route corridor. Prefer compositions that crop well at landscape and near-square ratios. Do not reuse one route’s scenery for another.

Alt text describes visible content and should not repeat the route title alone. Captions explain why the photographed location matters to the journey. Avoid subjective filler such as “beautiful scenery.”

Supporting photographs are optional and should be added only when they illuminate a prepared landmark or a meaningful change in landscape. Do not add a gallery or attach images to every timeline moment.

## Rendering and performance

Use the shared `RouteMedia` component and Next.js Image. Hero media may load eagerly on its route page; card and below-the-fold media should retain normal lazy loading. Supply accurate responsive `sizes`, preserve intrinsic aspect information in the manifest, and use intentional `object-position` rules only when a shared crop needs adjustment.

The editorial route motif remains the automatic fallback when a route has no verified media record. The fallback must include useful accessible text and must not imply that it is a photograph.

## Adding a future route image

1. Verify the source page and license.
2. Download a suitable source derivative rather than hotlinking it.
3. Convert and optimize it locally.
4. Add one complete manifest entry.
5. Link a prepared landmark only when the depicted location is verified.
6. Test cards and the route hero at 375px, tablet, and desktop widths.
7. Confirm attribution links, alt text, lazy loading, and fallback behavior with automated tests.
