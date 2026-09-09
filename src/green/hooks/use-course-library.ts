"use client";
import { useSyncExternalStore } from "react";
import { COURSE_LIBRARY_KEY, parseCourseLibrary, writeCourseStatus, type CourseLibraryStatus } from "@/green/lib/course-library";

const server = () => "";
const snapshot = () => { try { return typeof window === "undefined" ? "" : window.localStorage.getItem(COURSE_LIBRARY_KEY) ?? ""; } catch { return ""; } };
function subscribe(callback: () => void) { const storage = (event: StorageEvent) => { if (event.key === COURSE_LIBRARY_KEY) callback(); }; window.addEventListener("storage", storage); window.addEventListener("rallii-green:library-change", callback); return () => { window.removeEventListener("storage", storage); window.removeEventListener("rallii-green:library-change", callback); }; }
export function useCourseLibrary() { const raw = useSyncExternalStore(subscribe, snapshot, server); const library = parseCourseLibrary(raw || null); return { library, status: (slug: string) => library.courses[slug], setStatus: (slug: string, value?: CourseLibraryStatus) => writeCourseStatus(slug, value) }; }

