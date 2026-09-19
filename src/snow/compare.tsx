"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { snowComparison } from "./comparison";
import { experienceEvent } from "@/lib/experience-events";
import Link from "next/link";
import { snowDestinations } from "./data";
import { SnowPhoto, SnowCredit } from "./photo";
import { SaveSnow } from "./save-snow";
export function SnowCompare(){
  const params = useSearchParams();
  const router = useRouter();
  const [first,second] = snowComparison(params.get("mountains"), snowDestinations.map(place=>place.slug));
  const selected = [first,second];
  function setSelected(next: string[]) { router.replace(`/snow/compare/?mountains=${next.join(",")}`,{scroll:false}); }
  useEffect(()=>{experienceEvent("comparison",{mode:"snow",route_id:first,comparison_ids:[first,second]});},[first,second]);
  return <main className="rallii-editorial snow-editorial"><div className="rallii-container rallii-section"><Link href="/snow/">← Snow collection</Link><p className="rallii-kicker">Two places. One winter.</p><h1>Compare mountains.</h1><div className="expansion-compare">{selected.map((slug,index)=>{const place=snowDestinations.find(item=>item.slug===slug)!;return <article key={index}><label>Mountain {index+1}<select aria-label={`Mountain ${index+1}`} value={slug} onChange={event=>setSelected(selected.map((value,i)=>i===index?event.target.value:value))}>{snowDestinations.map(item=><option key={item.slug} value={item.slug} disabled={item.slug === selected[1-index]}>{item.name}</option>)}</select></label><Link className="snow-card-photo" href={`/snow/${slug}/`}><SnowPhoto imageKey={place.imageKey}/></Link><SnowCredit imageKey={place.imageKey}/><h2>{place.name}</h2><SaveSnow slug={slug} name={place.name}/>{[["Country",place.country],["Season",place.season],["Seasonal context",place.planning?.seasonalNote ?? "Check the official calendar before booking."],["Terrain",place.terrain],["Stay",place.lodging],["Arrival airport options",place.airport],["Away from skiing",place.offMountain]].map(([label,value])=><section key={label}><h3>{label}</h3><p>{value}</p></section>)}<Link className="rallii-text-link" href={`/snow/${slug}/`}>Read mountain guide →</Link></article>})}</div></div></main>;
}
