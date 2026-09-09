import Link from "next/link";
import type { Trail } from "./types";
import { TrailPhoto, TrailCredit } from "./trail-photo";
import { SaveTrail } from "./save-trail";
export function TrailCard({ trail }: { trail: Trail }) {
  return <article className="trail-card">
    <Link href={`/trail/${trail.slug}/`} className="trail-card-photo" tabIndex={-1} aria-hidden="true"><TrailPhoto imageKey={trail.imageKey} /><span>{trail.difficulty}</span></Link>
    <div className="trail-card-body"><p className="rallii-kicker">{trail.destination}</p><h2><Link href={`/trail/${trail.slug}/`}>{trail.name}</Link></h2>
      <p className="trail-card-facts">{trail.distanceKm} km <i>·</i> {trail.duration} <i>·</i> {trail.elevationGainM === null ? "Gain unverified" : `${trail.elevationGainM} m gain`}</p>
      <p className="trail-character">{trail.routeType} <span> / </span> {trail.tags.slice(0, 2).join(" · ")}</p><SaveTrail slug={trail.slug} name={trail.name} compact /><TrailCredit imageKey={trail.imageKey} />
    </div>
  </article>;
}
