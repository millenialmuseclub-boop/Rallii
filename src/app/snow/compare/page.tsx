import { SnowCompare } from "@/snow/compare";
import { Suspense } from "react";
export const metadata={title:"Compare snow destinations"};
export default function Page(){return <Suspense fallback={<p>Loading mountain comparison…</p>}><SnowCompare/></Suspense>;}
