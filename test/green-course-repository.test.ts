import assert from "node:assert/strict";
import test from "node:test";
import { publishedCourses, searchCourses } from "../src/green/data/courses.ts";

test("published courses have unique identities and complete core data", () => { const slugs = new Set<string>(); for (const course of publishedCourses) { assert.ok(!slugs.has(course.slug)); slugs.add(course.slug); assert.equal(course.holes, 18); assert.ok(course.signatureHoles.length > 0); assert.ok(course.journey.length > 0); assert.ok(course.sources.every((source) => source.url.startsWith("https://"))); assert.ok(course.character.scenery >= 1 && course.character.scenery <= 5); } });
test("search spans architect, place and collection", () => { assert.ok(searchCourses("Doak").some((c) => c.slug === "pacific-dunes")); assert.ok(searchCourses("San Diego").some((c) => c.slug === "torrey-pines-south")); assert.ok(searchCourses("Architectural Masterpieces").length >= 2); });
