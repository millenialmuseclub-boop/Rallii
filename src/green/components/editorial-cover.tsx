import Link from "next/link";
import { CourseVisual } from "@/green/components/course-visual";
import { getCourse } from "@/green/data/courses";

type Props = {
  courseSlug: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
};

export function EditorialCover({ courseSlug, href, eyebrow, title, description, meta }: Props) {
  const course = getCourse(courseSlug);
  if (!course) return null;

  return <Link className="editorial-cover" href={href}>
    <CourseVisual course={course} compact />
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      {meta ? <span>{meta}</span> : null}
    </div>
  </Link>;
}
