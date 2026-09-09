import { Suspense } from "react";
import { SnowDiscover } from "@/snow/discover";
export default function SnowPage(){return <Suspense fallback={<main className="rallii-container rallii-section" aria-busy="true"><h1>Following winter…</h1></main>}><SnowDiscover/></Suspense>}
