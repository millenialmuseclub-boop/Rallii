import { getRouteMedia } from "@/data/route-media";
import { getCourseMedia } from "@/green/data/media";
import { trailMedia } from "@/trail/media";
import { mtbMedia } from "@/mtb/media";
import { snowMedia } from "@/snow/media";
import { AppScreenShell } from "@/components/app-screen-shell";
import { MyRallii, type SavedExperience } from "@/components/my-rallii";
import { getAllRoutes } from "@/data/routes";
import { publishedCourses } from "@/green/data/courses";
import { mtbDestinations } from "@/mtb/data";
import { trails } from "@/trail/data";
import { snowDestinations } from "@/snow/data";
export const metadata = { title: "My Rallii", description: "Your private Rail, Green, Trail, MTB and Snow saves, collections and trip notes." };
export default function MyRalliiPage() {
  const experiences: SavedExperience[] = [
    ...getAllRoutes().map(route => ({ activity: "rail" as const, slug: route.summary.slug, name: route.summary.name, href: `/routes/${route.summary.slug}/`, photo: railPhoto(route.summary.slug) })),
    ...publishedCourses.map(course => ({ activity: "green" as const, slug: course.slug, name: course.name, href: `/green/courses/${course.slug}/`, photo: greenPhoto(course.slug) })),
    ...trails.map(trail => ({ activity: "trail" as const, slug: trail.slug, name: trail.name, href: `/trail/${trail.slug}/`, photo: trailMedia[trail.imageKey] })),
    ...mtbDestinations.map(ride => ({ activity: "mtb" as const, slug: ride.slug, name: ride.name, href: `/mtb/${ride.slug}/`, photo: mtbMedia[ride.imageKey] })),
    ...snowDestinations.map(place => ({ activity: "snow" as const, slug: place.slug, name: place.name, href: `/snow/${place.slug}/`, photo: snowMedia[place.imageKey] })),
  ];
  return <AppScreenShell title="My Rallii" context="Every way you experience a place." family><MyRallii experiences={experiences} /></AppScreenShell>;
}

function railPhoto(slug: string) {
  const m = getRouteMedia(slug);
  return m && { src:m.path, alt:m.alt, caption:m.caption, credit:m.creator, sourceUrl:m.sourcePageUrl, license:m.licenseName, licenseUrl:m.licenseUrl };
}
function greenPhoto(slug: string) {
  const m = getCourseMedia(slug);
  return m && { src:m.src, alt:m.alt, caption:m.caption ?? m.alt, credit:m.creator, sourceUrl:m.sourceUrl, license:m.license, licenseUrl:m.licenseUrl, position:m.focalPoint };
}
