import { Suspense } from "react";
import { SnowPlanner } from "@/snow/planner";
export const metadata = { title: "Plan a snow trip" };
export default function SnowPlanPage() { return <Suspense fallback={<main className="rallii-container rallii-section" aria-busy="true">Preparing your Snow planner…</main>}><SnowPlanner/></Suspense>; }
