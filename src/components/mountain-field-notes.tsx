import type { SnowGuide } from "@/snow/data";
import type { MtbDestination } from "@/mtb/types";
import { ridingPlans } from "@/mtb/ride-options";
import Link from "next/link";

export function SnowFieldNotes({ place }: { place: SnowGuide }) {
  return <section className="rallii-section field-notes"><div className="rallii-section-heading"><div><p className="rallii-kicker">Your mountain, beyond the piste</p><h2>Make a winter of it.</h2></div><p>Suggested plans, with room for the weather.</p></div>
    <div className="field-notes-grid">{[["Where to settle",place.lodging],["Getting there",place.transport],["Snow character",place.snowCharacter],["A family day",place.family],["After the lifts",place.offMountain],["Ability & terrain","Beginner lessons, intermediate pistes and more demanding terrain are different parts of a mountain. Choose named open trails from the official piste map; a destination label is not a run grade."]].map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
    <div className="perfect-day"><p className="rallii-kicker">A suggested perfect day</p><h2>One mountain. Your own pace.</h2><ol>{place.perfectDay.map((step,index)=><li key={step}><span>{["Morning","Midday","Later"][index]}</span><p>{step}</p></li>)}</ol></div>
    {place.planning ? <><h3>Choose your season</h3><p>{place.planning.seasonalNote}</p><p className="trail-fact-note">Planning sources reviewed September 19, 2026: {place.planning.sources.map((source,index)=><span key={source.url}>{index ? " · " : ""}<a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></span>)}</p></> : null}
    <p className="trail-fact-note">Planning months describe a typical seasonal window, not opening dates. Sightseeing access, lessons, winter transport and lift links need confirmation with the official destination. No live snow or weather feed is connected.</p>
    <Link className="rallii-text-link" href={`/snow/compare/?mountains=${place.slug},${place.slug === "whistler-blackcomb" ? "zermatt" : "whistler-blackcomb"}`}>Compare this mountain →</Link>
  </section>;
}

export function MtbFieldNotes({ ride }: { ride: MtbDestination }) {
  const plan = ridingPlans[ride.slug];
  return <section className="rallii-section field-notes"><p className="rallii-kicker">A day built around the ride</p><h2>Ride well. Stay a little longer.</h2>{plan ? <><p>{plan.logistics}</p><h3>Seasonal planning</h3><p>{plan.season}</p><div className="field-notes-grid ride-options">{plan.options.map(option=><article key={option.name}><h3>{option.name}</h3><p><strong>{option.grade}</strong></p><dl><dt>Distance</dt><dd>{option.distance}</dd><dt>Ascent</dt><dd>{option.ascent}</dd><dt>Time</dt><dd>{option.time}</dd></dl><p>{option.description}</p></article>)}</div><p className="trail-fact-note">Named options, not turn-by-turn navigation. Full-route distances exclude unlisted extensions and may change with diversions. <a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer">{plan.sourceLabel} ↗</a> · Reviewed September 19, 2026.</p></> : null}<div className="field-notes-grid">
    <article><h3>A useful base</h3><p>Stay near {ride.start.replace(/^A signed, bike-permitted trailhead near /, "")}. Ask about secure bike storage, a wash area and early breakfast before choosing lodging.</p></article>
    <article><h3>Rent & repair</h3><p>Reserve the correct size bike and confirm suspension, pedals, helmet and damage terms. Ask a local workshop about opening hours, spare tubes and a same-day repair plan.</p></article>
    <article><h3>Shuttles & lift access</h3><p>{ride.kind === "Bike park" ? "Check the operator’s current riding pass, uplift calendar and bike carriage rules before booking." : "Confirm whether your chosen route has a legitimate shuttle or lift option. A regional guide does not imply uplift is available."}</p></article>
    <article><h3>e-MTB access</h3><p>Check each trail with its land manager. Bike access does not automatically include electric bikes; battery range also depends on climbing, temperature and assist level.</p></article>
  </div><div className="perfect-day"><p className="rallii-kicker">A suggested riding day</p><ol><li><span>Before rolling</span><p>Collect rentals, check brakes and choose a short first route near {ride.sections[0]} using the current local map.</p></li><li><span>Find your rhythm</span><p>Consider {ride.sections[1]} only after assessing trail conditions and the group’s energy. Keep enough water and time for the return.</p></li><li><span>Back in town</span><p>Leave time for a bike check, coffee and a meal. Ask your local shop which nearby café or brewery welcomes riders and has secure bike parking.</p></li></ol></div></section>;
}
