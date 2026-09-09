import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return { id: "/", name: "Rallii — One world, five ways outside", short_name: "Rallii", description: "Explore memorable journeys by rail, green, trail, mountain bike, and snow.", start_url: "/", scope: "/", display: "standalone", orientation: "portrait-primary", background_color: "#f5f2ea", theme_color: "#173f32", categories: ["travel", "lifestyle"], icons: [{ src: "/rallii-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" }, { src: "/rallii-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" }, { src: "/rallii-icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" }] };
}
