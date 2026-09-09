import { CourseVisual } from "@/green/components/course-visual";
import type { Course } from "@/green/types/course";

export function ScreenCover({ course, eyebrow, title, introduction }: { course: Course; eyebrow: string; title: string; introduction: string }) {
  return <header className="screen-cover"><CourseVisual course={course} hero /><div className="screen-cover__copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{introduction}</p></div></header>;
}
