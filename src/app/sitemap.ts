import type { MetadataRoute } from "next";
import { discoveryCatalogue } from "@/data/discovery-catalogue";
import { journeyGuides } from "@/data/journey-guides";
import { PUBLIC_SITE_URL } from "@/lib/share-journey";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/rail/", "/discover/", "/trail/", "/mtb/", "/snow/", "/guides/", ...discoveryCatalogue.map(item => item.href), ...journeyGuides.map(guide => `/guides/${guide.slug}/`)];
  return [...new Set(paths)].map(path => ({ url: `${PUBLIC_SITE_URL}${path}` }));
}
