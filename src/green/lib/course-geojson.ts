import type { Course } from "@/green/types/course";

export type CourseFeature = { type: "Feature"; properties: { slug: string; name: string }; geometry: { type: "Point"; coordinates: [number, number] } };

export function coursesToFeatureCollection(courses: Course[]) {
  return { type: "FeatureCollection" as const, features: courses.map<CourseFeature>((course) => ({ type: "Feature", properties: { slug: course.slug, name: course.name }, geometry: { type: "Point", coordinates: [course.location.longitude, course.location.latitude] } })) };
}
