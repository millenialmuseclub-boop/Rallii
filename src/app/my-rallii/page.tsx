import { AppScreenShell } from "@/components/app-screen-shell";
import { MyRallii, type SavedExperience } from "@/components/my-rallii";
import { getAllRoutes } from "@/data/routes";
import { publishedCourses } from "@/green/data/courses";
import { mtbDestinations } from "@/mtb/data";
import { trails } from "@/trail/data";
export const metadata = { title: "My Rallii", description: "Your private Rail, Green, Trail and MTB saves, collections and trip notes." };
export default function MyRalliiPage() {
  const experiences: SavedExperience[] = [
    ...getAllRoutes().map(route => ({ activity: "rail" as const, slug: route.summary.slug, name: route.summary.name, href: `/routes/${route.summary.slug}/` })),
    ...publishedCourses.map(course => ({ activity: "green" as const, slug: course.slug, name: course.name, href: `/green/courses/${course.slug}/` })),
    ...trails.map(trail => ({ activity: "trail" as const, slug: trail.slug, name: trail.name, href: `/trail/${trail.slug}/` })),
    ...mtbDestinations.map(ride => ({ activity: "mtb" as const, slug: ride.slug, name: ride.name, href: `/mtb/${ride.slug}/` })),
  ];
  return <AppScreenShell title="My Rallii" context="Every way you experience a place." family><MyRallii experiences={experiences} /></AppScreenShell>;
}
