import { Suspense } from "react";
import { TrailDiscover } from "@/trail/discover";
export default function TrailPage() { return <Suspense fallback={<main className="rallii-container rallii-section" aria-busy="true"><h1>Finding your next trail…</h1></main>}><TrailDiscover /></Suspense>; }
