"use client";
import Link from "next/link";
import { useState } from "react";
import type { DiscoveryEntry } from "@/data/discovery-catalogue";
import { searchDiscovery } from "@/lib/discovery-search";
export function GlobalSearch({entries}:{entries:DiscoveryEntry[]}){
 const [query,setQuery]=useState(""),[mode,setMode]=useState("all"),[country,setCountry]=useState("All"),[limit,setLimit]=useState(12);
 const results=searchDiscovery(entries,query,mode,country);
 return <section className="rallii-section"><p className="rallii-kicker">One world, five ways outside</p><h2>Search all of Rallii.</h2><div className="trail-filters"><label>Place or landscape<input type="search" value={query} onChange={e=>{setQuery(e.target.value);setLimit(12);}} placeholder="Try Japan, alpine or forest"/></label><label>Mode<select aria-label="Discovery mode" value={mode} onChange={e=>{setMode(e.target.value);setLimit(12);}}>{["all","rail","trail","mtb","snow","green"].map(value=><option key={value} value={value}>{value.toUpperCase()}</option>)}</select></label><label>Country<select aria-label="Discovery country" value={country} onChange={e=>{setCountry(e.target.value);setLimit(12);}}>{["All",...new Set(entries.map(p=>p.country))].sort((a,b)=>a==="All"?-1:b==="All"?1:a.localeCompare(b)).map(value=><option key={value}>{value}</option>)}</select></label></div><p role="status">{results.length} places and journeys</p><div className="field-notes-grid">{results.slice(0,limit).map(p=><article key={p.id}><p className="rallii-kicker">{p.mode} / {p.country}</p><h3><Link href={p.href}>{p.name}</Link></h3><p>{p.summary}</p><Link className="rallii-text-link" href={p.href}>Explore →</Link></article>)}</div>{results.length>limit?<button className="rallii-button" onClick={()=>setLimit(limit+12)}>Show more results</button>:null}</section>;
}
