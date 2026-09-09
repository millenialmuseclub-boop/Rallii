"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CourseCard } from "@/green/components/course-card";
import { getCourseMedia } from "@/green/data/media";
import { filterCourses } from "@/green/lib/course-discovery";
import { courseRegionFor, courseRegions } from "@/green/lib/course-regions";
import type { AccessType, Course, Destination, Experience, Setting } from "@/green/types/course";

const chapters = courseRegions;
type Chapter = (typeof courseRegions)[number];

export function DiscoverCatalogue({ courses, destinations, initialSetting = "all" }: { courses: Course[]; destinations: Destination[]; initialSetting?: Setting | "all"; initialPage?: number }) {
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState<Chapter>("Pacific & Hawaii");
  const [setting, setSetting] = useState<Setting | "all">(initialSetting);
  const [access, setAccess] = useState<AccessType | "all">("all");
  const [experience, setExperience] = useState<Experience | "all">("all");
  const [destination, setDestination] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const chapterTabs = useRef<Array<HTMLButtonElement | null>>([]);
  const filtered = useMemo(() => filterCourses(courses, { query, setting, access, experience, destination }), [courses, query, setting, access, experience, destination]);
  const isRefined = Boolean(query || setting !== "all" || access !== "all" || experience !== "all" || destination !== "all");
  const shown = useMemo(() => {
    const selected = isRefined ? filtered : filtered.filter((course) => courseRegionFor(course) === chapter);
    return [...selected].sort((a, b) => Number(Boolean(getCourseMedia(b.slug))) - Number(Boolean(getCourseMedia(a.slug))));
  }, [chapter, filtered, isRefined]);
  const chapterCounts = Object.fromEntries(chapters.map((item) => [item, courses.filter((course) => courseRegionFor(course) === item).length])) as Record<Chapter, number>;
  const active = [setting !== "all" ? setting : "", access !== "all" ? access : "", experience !== "all" ? experience : "", destination !== "all" ? destinations.find((item) => item.slug === destination)?.name ?? destination : ""].filter(Boolean);
  const reset = () => { setQuery(""); setSetting("all"); setAccess("all"); setExperience("all"); setDestination("all"); };
  useEffect(() => {
    const saved = sessionStorage.getItem("rallii-green-region") as Chapter | null;
    const timer = saved && chapters.includes(saved) ? window.setTimeout(() => setChapter(saved), 0) : undefined;
    const url = new URL(window.location.href);
    if (url.searchParams.has("page")) { url.searchParams.delete("page"); window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`); }
    return () => { if (timer) window.clearTimeout(timer); };
  }, []);
  const chooseChapter = (item: Chapter) => { setChapter(item); sessionStorage.setItem("rallii-green-region", item); };
  const moveChapterFocus = (current: number, direction: number) => {
    const next = (current + direction + chapters.length) % chapters.length;
    chooseChapter(chapters[next]);
    chapterTabs.current[next]?.focus();
  };

  return <section className="catalogue shell" id="catalogue" aria-live="polite">
    <div className="section-heading"><div><p className="eyebrow">The Green atlas</p><h2>Browse by golf geography.</h2></div><Link href={`/green/map?region=${encodeURIComponent(chapter)}`}>Map this chapter →</Link></div>
    <label className="search"><span className="sr-only">Search courses, places, architects and collections</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the atlas…"/><button type="button" onClick={() => setQuery("")}>{query ? "Clear" : "Search"}</button></label>
    {!isRefined ? <div className="atlas-chapters" role="tablist" aria-label="Golf regions">{chapters.map((item, index) => <button key={item} ref={(element) => { chapterTabs.current[index] = element; }} type="button" role="tab" tabIndex={chapter === item ? 0 : -1} aria-selected={chapter === item} onClick={() => chooseChapter(item)} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); moveChapterFocus(index, 1); } if (event.key === "ArrowLeft") { event.preventDefault(); moveChapterFocus(index, -1); } }}><span>{item}</span><b>{chapterCounts[item]}</b></button>)}</div> : null}
    <div className="filter-summary"><button type="button" aria-expanded={filtersOpen} aria-controls="discover-filters" onClick={() => setFiltersOpen((value) => !value)}>{filtersOpen ? "Hide filters" : "Refine the atlas"}</button><span>{isRefined ? `${shown.length} matches${active.length ? ` · ${active.join(" · ")}` : ""}` : `${chapterCounts[chapter]} courses · ${chapter}`}</span>{isRefined ? <button type="button" onClick={reset}>Reset</button> : null}</div>
    <div className="filter-groups" id="discover-filters" hidden={!filtersOpen}><div><b>Setting</b><div className="filter-row">{(["all", "coastal", "links", "forest", "desert", "mountain", "parkland", "tropical"] as const).map((item) => <button key={item} type="button" aria-pressed={setting === item} onClick={() => setSetting(item)}>{item}</button>)}</div></div><div className="select-filters"><label>Access<select value={access} onChange={(event) => setAccess(event.target.value as AccessType | "all")}><option value="all">All access</option><option value="public">Public</option><option value="resort">Resort</option><option value="private">Private</option></select></label><label>Experience<select value={experience} onChange={(event) => setExperience(event.target.value as Experience | "all")}><option value="all">All experiences</option><option value="architecture">Architecture</option><option value="historic">Historic</option><option value="scenic">Scenic</option><option value="walkable">Walkable</option><option value="great-public-golf">Great public golf</option><option value="resort-golf">Resort golf</option></select></label><label>Destination<select value={destination} onChange={(event) => setDestination(event.target.value)}><option value="all">All destinations</option>{destinations.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label></div></div>
    {shown.length ? <><div className="atlas-heading"><div><p className="eyebrow">{isRefined ? "Atlas results" : `Chapter ${chapters.indexOf(chapter) + 1} of ${chapters.length}`}</p><h3>{isRefined ? "Courses matching your view" : chapter}</h3></div><span>Exact and labeled regional photography · swipe sideways · {shown.length} courses</span></div><div className="course-rail">{shown.map((course) => <CourseCard key={course.slug} course={course}/>)}</div></> : <div className="empty-state"><h3>No course fits that view yet.</h3><p>Try a broader place, architect or setting.</p><button type="button" onClick={reset}>Reset atlas</button></div>}
  </section>;
}
