import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Rallii — Curated Rail Journeys", short_name: "Rallii", description: "Know where to sit, what to see, and when to look.", start_url: "/", display: "standalone", background_color: "#f5f2ea", theme_color: "#173f32", icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }, { src: "/apple-icon", sizes: "180x180", type: "image/png" }] };
}
