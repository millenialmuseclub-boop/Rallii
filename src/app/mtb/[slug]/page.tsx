import { OutdoorTripPlanning } from "@/components/outdoor-trip-planning";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findMtbDestination, mtbDestinations } from "@/mtb/data";
import { MtbPhoto, MtbCredit } from "@/mtb/photo";
import { MtbCard } from "@/mtb/card";
import { SaveMtb } from "@/mtb/save-mtb";
export function generateStaticParams() { return mtbDestinations.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const ride = findMtbDestination((await params).slug); return { title: ride?.name ?? "Ride not found", description: ride?.summary }; }
export default async function MtbDetail({ params }: { params: Promise<{ slug: string }> }) {
  const ride = findMtbDestination((await params).slug);
  if (!ride) notFound();
  const nearby = mtbDestinations.filter(item => item.slug !== ride.slug && item.region === ride.region).slice(0, 3);
  return <main className="rallii-editorial mtb-editorial"><nav className="rallii-container trail-breadcrumb" aria-label="Breadcrumb"><Link href="/">Rallii</Link><span>/</span><Link href="/mtb/">MTB</Link><span>/</span><span>{ride.name}</span></nav>
    <div className="trail-detail-hero"><MtbPhoto imageKey={ride.imageKey} priority /></div><div className="rallii-container"><MtbCredit imageKey={ride.imageKey} />
    <header className="trail-detail-title"><div><p className="rallii-kicker">{ride.location} / {ride.kind}</p><h1>{ride.name}</h1></div><SaveMtb slug={ride.slug} name={ride.name} /></header>
    <dl className="trail-facts mtb-facts">{[["Riding options", ride.skills.join(" / ")], ["Distance", ride.distanceKm === null ? "Choose your route" : `${ride.distanceKm} km`], ["Elevation gain", ride.elevationGainM === null ? "Route dependent" : `${ride.elevationGainM} m`], ["Ride time", ride.time]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <p className="trail-fact-note">This guide covers a riding area, not one measured route. Time is planning guidance; distance, ascent and technical grade depend on your chosen trail.</p>
    <div className="trail-detail-columns"><div><section><p className="rallii-kicker">01 / Ride overview</p><h2>Why ride here.</h2><p>{ride.summary}</p></section><section><p className="rallii-kicker">02 / Terrain & difficulty</p><h2>{ride.character}.</h2><p>{ride.terrain}</p><p className="trail-start"><strong>Starting area</strong>{ride.start}</p></section><section><p className="rallii-kicker">03 / Explore the area</p><h2>Build your riding day.</h2><ul className="trail-scenery">{ride.sections.map((section, index) => <li key={section}><span>0{index + 1}</span>{section}</li>)}</ul></section></div>
    <aside className="trail-guide"><p className="rallii-kicker">Your ride notes</p><h2>What to know.</h2><p>{ride.notes}</p><h3>Season & conditions</h3><p>{ride.season}</p><h3>Bike choice</h3><p>{ride.bike}</p><h3>Map & elevation</h3><p>Use the local operator’s map for route distance, elevation and trail grades. Rallii does not yet provide MTB navigation, elevation profiles or offline maps.</p><a className="rallii-button" href={ride.sourceUrl} target="_blank" rel="noreferrer">Local maps & riding guidance ↗</a><p className="trail-fact-note">Static destination notes prepared September 2026. Access, passes, uplift and weather must be checked with the local source.</p></aside></div><OutdoorTripPlanning place={ride.location} />
    <section className="mtb-pro-note"><div><p className="rallii-kicker">One Rallii Pro</p><h2>A ride can be part of a bigger trip.</h2><p>Save rides freely. With Rallii Pro, add them to the same trip collections and notes as Rail, Green and Trail.</p></div><Link className="rallii-text-link" href="/my-rallii/">Open My Rallii →</Link></section>
    {nearby.length ? <section className="rallii-section"><div className="rallii-section-heading"><div><p className="rallii-kicker">More in {ride.region}</p><h2>Keep the wheels turning.</h2></div><Link href="/mtb/">All riding destinations →</Link></div><div className="trail-grid">{nearby.map(item => <MtbCard key={item.slug} ride={item} />)}</div></section> : null}</div>
  </main>;
}
