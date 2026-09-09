import Link from "next/link";
import { CourseVisual } from "@/green/components/course-visual";
import type { Course } from "@/green/types/course";

export function MagazineHero({ eyebrow, title, introduction, course, meta = [] }: { eyebrow: string; title: string; introduction: string; course: Course; meta?: string[] }) {
  return <header className="magazine-hero"><CourseVisual course={course} hero /><div className="magazine-hero__copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="headline">{introduction}</p>{meta.length ? <div className="essential-meta">{meta.map((item) => <span key={item}>{item}</span>)}</div> : null}<Link href={`/green/courses/${course.slug}`}>Begin with {course.shortName ?? course.name} →</Link></div></header>;
}
