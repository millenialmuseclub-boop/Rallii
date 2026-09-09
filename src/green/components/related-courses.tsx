import { CourseCard } from "@/green/components/course-card";
import { getCourse } from "@/green/data/courses";
import { getRelatedCourses } from "@/green/data/relationships";
export function RelatedCourses({slug}:{slug:string}){const related=getRelatedCourses(slug).map(r=>({relationship:r,course:getCourse(r.sourceCourseSlug===slug?r.targetCourseSlug:r.sourceCourseSlug)})).filter(item=>item.course);if(!related.length)return null;return <section className="related"><p className="eyebrow">Nearby & related</p><h2>Continue the conversation.</h2><div className="course-grid">{related.map(({relationship,course})=><div key={course!.slug}><CourseCard course={course!}/><p className="relationship-reason">{relationship.reason}</p></div>)}</div></section>}
