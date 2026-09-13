"use client";
import { useState } from "react";
import Link from "next/link";
import { snowDestinations } from "./data";
import { SnowPhoto, SnowCredit } from "./photo";
import { SaveSnow } from "./save-snow";
export function SnowCompare(){
  const [selected,setSelected]=useState(["whistler-blackcomb","zermatt"]);
  return <main className="rallii-editorial snow-editorial"><div className="rallii-container rallii-section"><Link href="/snow/">← Snow collection</Link><p className="rallii-kicker">Two places. One winter.</p><h1>Compare mountains.</h1><div className="expansion-compare">{selected.map((slug,index)=>{const place=snowDestinations.find(item=>item.slug===slug)!;return <article key={index}><label>Mountain {index+1}<select aria-label={`Mountain ${index+1}`} value={slug} onChange={event=>setSelected(selected.map((value,i)=>i===index?event.target.value:value))}>{snowDestinations.map(item=><option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><Link className="snow-card-photo" href={`/snow/${slug}/`}><SnowPhoto imageKey={place.imageKey}/></Link><SnowCredit imageKey={place.imageKey}/><h2>{place.name}</h2><SaveSnow slug={slug} name={place.name}/>{[["Country",place.country],["Season",place.season],["Terrain",place.terrain],["Stay",place.lodging],["Arrival airport options",place.airport],["Away from skiing",place.offMountain]].map(([label,value])=><section key={label}><h3>{label}</h3><p>{value}</p></section>)}<Link className="rallii-text-link" href={`/snow/${slug}/`}>Read mountain guide →</Link></article>})}</div></div></main>;
}
