import { Suspense } from "react";
import { MtbDiscover } from "@/mtb/discover";
export default function MtbPage() { return <Suspense fallback={<main className="rallii-container rallii-section" aria-busy="true"><h1>Finding your next ride…</h1></main>}><MtbDiscover /></Suspense>; }
