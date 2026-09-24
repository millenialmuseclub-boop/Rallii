import type { Metadata } from "next";
interface JourneyPreview { title: string; description: string; path: string; image?: { src: string; alt: string; width: number; height: number } }
export function journeyMetadata({ title, description, path, image }: JourneyPreview): Metadata {
  const images = image ? [{ url: image.src, alt: image.alt, width: image.width, height: image.height }] : undefined;
  return { title, description, alternates: { canonical: path }, openGraph: { title: `${title} | Rallii`, description, siteName: "Rallii", type: "article", url: path, images }, twitter: { card: image ? "summary_large_image" : "summary", title: `${title} | Rallii`, description, images: image ? [{ url: image.src, alt: image.alt }] : undefined } };
}
