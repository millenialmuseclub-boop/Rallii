import { AppScreenShell } from "@/components/app-screen-shell";
import { MyRallii, type SavedExperience } from "@/components/my-rallii";
import { getAllRoutes } from "@/data/routes";
import { publishedCourses } from "@/green/data/courses";
export const metadata = { title: "My Rallii", description: "Your private Rail and Green saves, collections and trip notes." };
export default function MyRalliiPage() {
  const experiences: SavedExperience[] = [
    ...getAllRoutes().map(route => ({ activity: "rail" as const, slug: route.summary.slug, name: route.summary.name, href: `/routes/${route.summary.slug}/` })),
    ...publishedCourses.map(course => ({ activity: "green" as const, slug: course.slug, name: course.name, href: `/green/courses/${course.slug}/` })),
  ];
  return <AppScreenShell title="My Rallii" context="Every way you experience a place." family><MyRallii experiences={experiences} /></AppScreenShell>;
}
