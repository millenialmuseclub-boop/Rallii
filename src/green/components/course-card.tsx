import Link from "next/link";
import { CourseVisual } from "@/green/components/course-visual";
import { LibraryActions } from "@/green/components/library-actions";
import type { Course } from "@/green/types/course";

export function CourseCard({ course, compact = false }: { course: Course; compact?: boolean }) { return <article className={`course-card ${compact ? "course-card--compact" : ""}`}><Link href={`/green/courses/${course.slug}`} aria-label={`Explore ${course.name}`}><CourseVisual course={course} /></Link><div className="card-body"><p className="eyebrow">{course.location.region} · {course.access.type}</p><h3><Link href={`/green/courses/${course.slug}`}>{course.name}</Link></h3><p>{course.editorial.shortDescription}</p><div className="card-meta"><span>{course.holes} holes</span><span>Par {course.par}</span><span>{course.character.settings.join(" · ")}</span></div><LibraryActions slug={course.slug} compact /></div></article>; }
