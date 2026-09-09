import type { CourseMedia } from "@/green/types/course";
import existing from "./course-photography.json" with { type: "json" };
import additions from "./photography.json" with { type: "json" };

export const courseMedia: CourseMedia[] = [
  ...existing as CourseMedia[],
  ...Object.entries(additions).map(([slug, photo]): CourseMedia => ({
    id: `${slug}-hero`, courseSlug: slug, src: photo.src, alt: photo.alt,
    caption: photo.caption, creator: photo.credit, license: photo.license,
    licenseUrl: photo.licenseUrl, sourceUrl: photo.sourceUrl,
    accessedAt: photo.accessedAt, role: "hero", width: photo.width,
    height: photo.height, fileSize: photo.fileSize, focalPoint: photo.position,
    representative: photo.representative, reuseNotes: photo.reuseNotes,
    attribution: `${photo.credit} · ${photo.license} · Wikimedia Commons`, status: "published",
  })),
];
export function getCourseMedia(slug: string, role: CourseMedia["role"] = "hero") { return courseMedia.find((item) => item.courseSlug === slug && item.role === role && item.status === "published"); }
export function firstPhotographedSlug(slugs: string[]) { return slugs.find((slug) => Boolean(getCourseMedia(slug))) ?? slugs[0]; }
