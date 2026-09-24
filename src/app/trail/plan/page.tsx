import { Suspense } from "react";
import { TrailPlanner } from "@/trail/planner";
export const metadata = { title: "Plan a hiking trip" };
export default function TrailPlanPage() { return <Suspense fallback={<main className="rallii-container rallii-section" aria-busy="true">Preparing your Trail planner…</main>}><TrailPlanner/></Suspense>; }
