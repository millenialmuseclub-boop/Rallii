import { Suspense } from "react";
import { MtbPlanner } from "@/mtb/planner";
export const metadata = { title: "Plan a mountain-bike trip" };
export default function MtbPlanPage() { return <Suspense fallback={<main className="rallii-container rallii-section" aria-busy="true">Preparing your MTB planner…</main>}><MtbPlanner/></Suspense>; }
