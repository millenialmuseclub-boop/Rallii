import { MyGreenLibrary } from "@/green/components/my-green-library";
import { ShoppingListPanel } from "@/green/components/shopping-list";
import { ScreenCover } from "@/green/components/screen-cover";
import { getCourse, publishedCourses } from "@/green/data/courses";
import { publishedTrips } from "@/green/data/trips";
export const metadata = { title: "My Green" };
export default function MyGreenPage() { return <main className="screen shell my-green-screen"><ScreenCover course={getCourse("royal-county-down")!} eyebrow="Your golf geography" title="My Green" introduction="A quiet record of the courses you want to play and the places you remember."/><nav className="my-green-tools" aria-label="My Green tools"><a href="/my-rallii/">All saved places</a><a href="#library">Course library</a><a href="#shopping-list">Shopping list</a><a href="/green/gear">Field kit</a></nav><section id="library"><MyGreenLibrary courses={publishedCourses} /></section><ShoppingListPanel courses={publishedCourses} trips={publishedTrips}/></main>; }

