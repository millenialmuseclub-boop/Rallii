import type { CourseRelationship } from "@/green/types/course";
export const relationships: CourseRelationship[] = [
  {sourceCourseSlug:"pebble-beach",targetCourseSlug:"spyglass-hill",relationshipType:"same-destination",reason:"Compare Pebble’s sustained ocean edge with Spyglass Hill’s abrupt turn into forest."},
  {sourceCourseSlug:"pacific-dunes",targetCourseSlug:"old-macdonald",relationshipType:"architectural-contrast",reason:"Two Tom Doak courses: one intimate and restless, the other broad and referential."},
  {sourceCourseSlug:"pinehurst-no-2",targetCourseSlug:"pinehurst-no-4",relationshipType:"architectural-contrast",reason:"Crowned Ross greens beside Gil Hanse’s larger, more visibly dramatic Sandhills gestures."},
  {sourceCourseSlug:"old-course-st-andrews",targetCourseSlug:"north-berwick-west-links",relationshipType:"trip-companion",reason:"A Fife-and-Lothian pairing that makes shared fairways, walls and links invention tangible."},
  {sourceCourseSlug:"we-ko-pa-saguaro",targetCourseSlug:"we-ko-pa-cholla",relationshipType:"same-destination",reason:"Two public desert courses on the same property with different architectural voices."},
  {sourceCourseSlug:"kapalua-plantation",targetCourseSlug:"mauna-kea",relationshipType:"architectural-contrast",reason:"Compare immense sloping ground on Maui with direct lava-and-ocean carries on Hawaiʻi Island."}
];
export function getRelatedCourses(slug:string){return relationships.filter(r=>r.sourceCourseSlug===slug||r.targetCourseSlug===slug)}
