import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { id: "/", name: "Rallii — Curated Rail Journeys", short_name: "Rallii", description: "Know where to sit, what to see, and when to look.", start_url: "/", scope: "/", display: "standalone", orientation: "portrait-primary", background_color: "#f5f2ea", theme_color: "#173f32", categories: ["travel", "lifestyle"], icons: [{ src: "/pwa-icon/192", sizes: "192x192", type: "image/png", purpose: "any" }, { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "any" }, { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" }] };
}
