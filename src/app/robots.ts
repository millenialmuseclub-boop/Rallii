import type { MetadataRoute } from "next";
import { PUBLIC_SITE_URL } from "@/lib/share-journey";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/partner-widget", "/green/partner-widget"] }, sitemap: `${PUBLIC_SITE_URL}/sitemap.xml` };
}
