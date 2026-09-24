export const PUBLIC_SITE_URL = "https://rallii-kappa.vercel.app";

/** A native-local URL must never escape into a shared journey link. */
export function journeyShareUrl(path: string, direction?: string) {
  const url = new URL(path, PUBLIC_SITE_URL);
  if (url.origin !== PUBLIC_SITE_URL) throw new Error("Expected a Rallii journey path");
  if (direction === "reverse") url.searchParams.set("direction", "reverse");
  return url.href;
}
