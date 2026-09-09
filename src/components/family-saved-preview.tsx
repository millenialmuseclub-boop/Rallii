"use client";
import Link from "next/link";
import { useTravelLibrary } from "@/hooks/use-travel-library";
import { useCourseLibrary } from "@/green/hooks/use-course-library";
import { useTrailLibrary } from "@/trail/use-trail-library";
import { useMtbLibrary } from "@/mtb/use-mtb-library";
import { mtbDestinations } from "@/mtb/data";
import { trails } from "@/trail/data";
export function FamilySavedPreview() {
  const { statuses } = useTravelLibrary();
  const { library: green } = useCourseLibrary();
  const { library: trail } = useTrailLibrary();
  const { library: mtb } = useMtbLibrary();
  const mtbCount = Object.keys(mtb.rides).length;
  const railCount = Object.keys(statuses).length;
  const greenCount = Object.keys(green.courses).length;
  const trailCount = Object.keys(trail.trails).length;
  const been = Object.values(mtb.rides).filter(value => value.status === "ridden").length + Object.values(green.courses).filter(value => value === "played").length + Object.values(trail.trails).filter(value => value === "been").length;
  const recentTrails = [...trails.filter(item => trail.trails[item.slug]).map(item => ({ ...item, href: `/trail/${item.slug}/` })), ...mtbDestinations.filter(item => mtb.rides[item.slug]).map(item => ({ ...item, href: `/mtb/${item.slug}/` }))].slice(0, 3);
  return <section className="rallii-container rallii-section family-saved-preview"><div><p className="rallii-kicker">My Rallii / Your places</p><h2>Keep a little<br /><em>“one day” list.</em></h2><p>{railCount + greenCount + trailCount + mtbCount ? "The journeys, rounds, trails and rides you’re making room for." : "A train through the Alps. A round by the sea. A trail you can’t stop thinking about. Start saving your next adventure."}</p><Link className="rallii-text-link" href="/my-rallii/">Open My Rallii →</Link></div>
    <div><div className="family-saved-counts"><Link href="/saved/"><strong>{railCount}</strong><span>Rail journeys</span></Link><Link href="/green/my-green/"><strong>{greenCount}</strong><span>Golf courses</span></Link><Link href="/my-rallii/"><strong>{trailCount}</strong><span>Hiking trails</span></Link><Link href="/my-rallii/"><strong>{mtbCount}</strong><span>MTB rides</span></Link></div><p className="family-saved-summary">{railCount + greenCount + trailCount + mtbCount - been} Want to Go <span> / </span> {been} Been</p>{recentTrails.length ? <ul className="family-preview-list">{recentTrails.map(item => <li key={item.slug}><Link href={item.href}>{item.name} <span>→</span></Link></li>)}</ul> : <p className="trail-fact-note">Saved privately on this device.</p>}</div>
  </section>;
}
