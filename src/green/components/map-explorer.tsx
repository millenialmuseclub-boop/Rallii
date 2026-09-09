"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CourseMap } from "@/green/components/course-map";
import { CourseVisual } from "@/green/components/course-visual";
import { courseRegionFor, courseRegions, type CourseRegion } from "@/green/lib/course-regions";
import type { Course, Destination } from "@/green/types/course";

export function MapExplorer({ courses, destinations }: { courses: Course[]; destinations: Destination[] }) {
  const [region, setRegion] = useState<CourseRegion | "all">("all");
  const [destination, setDestination] = useState("all");
  const [country, setCountry] = useState("all");
  const countries = useMemo(() => Array.from(new Set(courses.map((course) => course.location.country))).sort(), [courses]);
  useEffect(() => { const requested = new URLSearchParams(window.location.search).get("region") as CourseRegion | null; const timer = requested && courseRegions.includes(requested) ? window.setTimeout(() => setRegion(requested), 0) : undefined; return () => { if (timer) window.clearTimeout(timer); }; }, []);
  const shown = courses.filter((course) => (region === "all" || courseRegionFor(course) === region) && (destination === "all" || course.destinationSlug === destination) && (country === "all" || course.location.country === country));
  const reset = () => { setRegion("all"); setDestination("all"); setCountry("all"); };
  return <>
    <div className="map-controls"><label>Region<select value={region} onChange={(event) => setRegion(event.target.value as CourseRegion | "all")}><option value="all">All regions</option>{courseRegions.map((item) => <option key={item}>{item}</option>)}</select></label><label>Destination<select value={destination} onChange={(event) => setDestination(event.target.value)}><option value="all">All destinations</option>{destinations.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><label>Country<select value={country} onChange={(event) => setCountry(event.target.value)}><option value="all">All countries</option>{countries.map((item) => <option key={item} value={item}>{item}</option>)}</select></label><button type="button" onClick={reset} disabled={region === "all" && destination === "all" && country === "all"}>Reset</button><p aria-live="polite">{region === "all" ? "World atlas" : region} · {shown.length} {shown.length === 1 ? "course" : "courses"}</p></div>
    {shown.length ? <CourseMap courses={shown} /> : <div className="empty-state"><h2>No courses in this view.</h2><button type="button" onClick={reset}>Reset map filters</button></div>}
    <details className="map-course-list"><summary>Accessible course list <span>{shown.length}</span></summary><div>{shown.map((course) => <article key={course.slug}><CourseVisual course={course} compact /><div><p className="eyebrow">{course.location.region}</p><h3><Link href={`/green/courses/${course.slug}`}>{course.name}</Link></h3><p>{course.editorial.shortDescription}</p><div><Link href={`/green/courses/${course.slug}`}>Profile</Link><Link href={`/green/plan?course=${course.slug}`}>Plan</Link></div></div></article>)}</div></details>
  </>;
}
