export type CourseLibraryStatus = "want_to_play" | "played";
export interface CourseLibrary { version: 1; courses: Record<string, CourseLibraryStatus> }
export const COURSE_LIBRARY_KEY = "rallii-green:course-library";
const empty: CourseLibrary = { version: 1, courses: {} };

export function parseCourseLibrary(raw: string | null, knownSlugs?: ReadonlySet<string>): CourseLibrary {
  if (!raw) return empty;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return empty;
    const candidate = value as { version?: unknown; courses?: unknown };
    if (candidate.version !== 1 || !candidate.courses || typeof candidate.courses !== "object" || Array.isArray(candidate.courses)) return empty;
    const courses = Object.fromEntries(Object.entries(candidate.courses).filter(([slug, status]) => (!knownSlugs || knownSlugs.has(slug)) && (status === "want_to_play" || status === "played"))) as Record<string, CourseLibraryStatus>;
    return { version: 1, courses };
  } catch { return empty; }
}

export function updateCourseStatus(library: CourseLibrary, slug: string, status?: CourseLibraryStatus): CourseLibrary {
  const courses = { ...library.courses };
  if (status) courses[slug] = status; else delete courses[slug];
  return { version: 1, courses };
}

export function readCourseLibrary(): CourseLibrary { return typeof window === "undefined" ? empty : parseCourseLibrary(window.localStorage.getItem(COURSE_LIBRARY_KEY)); }
export function writeCourseStatus(slug: string, status?: CourseLibraryStatus) { if (typeof window === "undefined") return; const next = updateCourseStatus(readCourseLibrary(), slug, status); window.localStorage.setItem(COURSE_LIBRARY_KEY, JSON.stringify(next)); window.dispatchEvent(new Event("rallii-green:library-change")); }
