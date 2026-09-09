"use client";
import { useSyncExternalStore } from "react";
import { CourseCard } from "@/green/components/course-card";
import { courseOfTheDay } from "@/green/lib/course-discovery";
import type { Course } from "@/green/types/course";
const subscribe=()=>()=>undefined;const serverSnapshot=()=>"";const localDate=()=>{const now=new Date();return [now.getFullYear(),String(now.getMonth()+1).padStart(2,"0"),String(now.getDate()).padStart(2,"0")].join("-")};
export function CourseOfDay({courses}:{courses:Course[]}){const date=useSyncExternalStore(subscribe,localDate,serverSnapshot);const selected=date?courseOfTheDay(courses,date):undefined;return <section className="daily-course shell"><div><p className="eyebrow">Course of the day</p><h2>One place, chosen for today.</h2><p>A deterministic daily invitation—not a ranking and never a paid placement.</p></div>{selected?<CourseCard course={selected}/>:<div className="daily-skeleton" role="status">Choosing today’s course…</div>}</section>}
