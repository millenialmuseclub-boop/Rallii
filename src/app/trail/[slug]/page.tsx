import Link from "next/link";
import { notFound } from "next/navigation";
import { findTrail, trails } from "@/trail/data";
import { TrailPhoto, TrailCredit } from "@/trail/trail-photo";
import { TrailCard } from "@/trail/trail-card";
import { SaveTrail } from "@/trail/save-trail";
export function generateStaticParams() { return trails.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const trail = findTrail((await params).slug);
  return { title: trail?.name ?? "Trail not found", description: trail?.whyGo };
}
export default async function TrailDetail({ params }: { params: Promise<{ slug: string }> }) {
  const trail = findTrail((await params).slug);
  if (!trail) notFound();
  const related = trails.filter(item => item.slug !== trail.slug && (item.region === trail.region || item.tags.some(tag => trail.tags.includes(tag)))).slice(0, 3);
  return <main className="rallii-editorial trail-detail">
    <nav className="rallii-container trail-breadcrumb" aria-label="Breadcrumb"><Link href="/">Rallii</Link><span>/</span><Link href="/trail/">Trail</Link><span>/</span><span>{trail.name}</span></nav>
    <div className="trail-detail-hero"><TrailPhoto imageKey={trail.imageKey} priority /></div>
    <div className="rallii-container"><TrailCredit imageKey={trail.imageKey} />
      <header className="trail-detail-title"><div><p className="rallii-kicker">{trail.destination} / {trail.region}</p><h1>{trail.name}</h1></div><SaveTrail slug={trail.slug} name={trail.name} /></header>
      <dl className="trail-facts">{[["Distance", `${trail.distanceKm} km`], ["Time", trail.duration], ["Elevation gain", trail.elevationGainM === null ? "Not verified" : `${trail.elevationGainM} m`], ["Difficulty", trail.difficulty], ["Route type", trail.routeType]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p className="trail-fact-note">Approximate full-route distance and hiking time. Conditions and pace change the effort required.</p>
      <div className="trail-detail-columns"><div><section><p className="rallii-kicker">01 / Why go</p><h2>{trail.tags[0]}, with a different perspective.</h2><p>{trail.whyGo}</p></section>
      <section><p className="rallii-kicker">02 / The route</p><h2>Start here. Take your time.</h2><p>{trail.route}</p><p className="trail-start"><strong>Start at</strong> {trail.map.trailhead.name}</p></section>
      <section><p className="rallii-kicker">03 / What you’ll see</p><ul className="trail-scenery">{trail.tags.map((tag, index) => <li key={tag}><span>0{index + 1}</span>{tag}</li>)}</ul></section></div>
      <aside className="trail-guide"><p className="rallii-kicker">Your field notes</p><h2>Know before you go.</h2><p>{trail.guidance}</p><h3>Best time</h3><p>{trail.bestTime}.</p><h3>Check before you leave</h3><p>Static editorial guidance, reviewed {trail.reviewedAt}. This page does not report live conditions, closures or permit availability.</p><a className="rallii-button" href={trail.sourceUrl} target="_blank" rel="noreferrer">Official trail guidance ↗</a><p className="trail-fact-note">Use the land manager’s current map for navigation. Route tracking and offline trail maps are not available yet.</p></aside></div>
      <section className="rallii-section"><div className="rallii-section-heading"><div><p className="rallii-kicker">Keep wandering</p><h2>Another day, another trail.</h2></div><Link href="/trail/">All trails →</Link></div><div className="trail-grid">{related.map(item => <TrailCard key={item.slug} trail={item} />)}</div></section>
    </div>
  </main>;
}

