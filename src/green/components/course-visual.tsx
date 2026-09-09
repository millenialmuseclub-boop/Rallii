import Image from "next/image";
import { getCourseMedia } from "@/green/data/media";
import type { Course } from "@/green/types/course";

export function CourseVisual({ course, hero = false, compact = false }: { course: Course; hero?: boolean; compact?: boolean }) {
  const media = getCourseMedia(course.slug);
  const sizes = hero ? "(max-width: 800px) 100vw, 58vw" : compact ? "(max-width: 800px) 40vw, 24vw" : "(max-width: 800px) 100vw, 33vw";
  return <figure className={`course-visual setting-${course.character.settings[0]} ${hero ? "course-visual--hero" : ""} ${compact ? "course-visual--compact" : ""}`} role={media ? undefined : "img"} aria-label={media ? undefined : `Intentional illustrated placeholder representing the ${course.character.settings.join(" and ")} setting of ${course.name}; documentary photography is not yet licensed.`}>
    {media ? <Image className="course-photo" src={media.src} alt={media.alt} fill preload={hero} sizes={sizes} style={{ objectPosition: media.focalPoint }} /> : <><div className="contours" /><div className="flag" aria-hidden="true"><i /><b /></div></>}
    <span>{course.location.region}</span>
    <figcaption>{media?.representative ? <span className="course-representative">{media.caption}</span> : null}{media ? hero ? <>Photo: <a href={media.sourceUrl} target="_blank" rel="noreferrer">{media.creator}</a> · <a href={media.licenseUrl} target="_blank" rel="noreferrer">{media.license}</a></> : <>Photo: {media.creator} · {media.license}</> : "Photography pending rights review"}</figcaption>
  </figure>;
}
