import { Suspense } from "react";
import { ComparisonQuery } from "@/green/components/query-content";
import { ScreenCover } from "@/green/components/screen-cover";
import { getCourse } from "@/green/data/courses";
export const metadata = { title: "Compare" };
export default function ComparePage() {return <main className="screen shell"><ScreenCover course={getCourse("le-golf-national-albatros")!} eyebrow="Decision support" title="Compare the experience, not a winner." introduction="Choose two courses for the trip you are actually planning. The URL keeps the pairing shareable."/><Suspense fallback={<p role="status">Loading comparison…</p>}><ComparisonQuery /></Suspense></main>; }
