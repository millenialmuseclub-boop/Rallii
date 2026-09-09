import { MapExplorer } from "@/green/components/map-explorer";
import { ScreenCover } from "@/green/components/screen-cover";
import { getCourse, publishedCourses } from "@/green/data/courses";
import {publishedDestinations}from"@/green/data/destinations";
export const metadata = { title: "Map" };
export default function MapPage() { return <main className="screen shell map-screen"><ScreenCover course={getCourse("cape-kidnappers")!} eyebrow="Explore geography" title="The atlas, made legible." introduction="Move through the world by region, destination, or country, then open a course directly from the map."/><MapExplorer courses={publishedCourses} destinations={publishedDestinations}/></main>; }
