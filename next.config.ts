import type { NextConfig } from "next";

const nativeBuild = process.env.NATIVE_BUILD === "1";

const nextConfig: NextConfig = nativeBuild
  ? {
      // Native builds are fully static and written to `out/` for Capacitor.
      // Vercel builds retain the normal Next.js server rendering path.
      output: "export",
      images: { unoptimized: true },
      trailingSlash: true,
    }
  : {};

export default nextConfig;
