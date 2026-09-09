import Link from "next/link";
import type { SnowDestination } from "./data";
import { SnowPhoto, SnowCredit } from "./photo";
import { SaveSnow } from "./save-snow";
export function SnowCard({place}:{place:SnowDestination}){return <article className="snow-card"><Link className="snow-card-photo" href={`/snow/${place.slug}/`} aria-label={`Explore ${place.name}`}><SnowPhoto imageKey={place.imageKey}/></Link><SnowCredit imageKey={place.imageKey}/><p className="rallii-kicker">{place.location} / {place.kind}</p><h2><Link href={`/snow/${place.slug}/`}>{place.name}</Link></h2><p>{place.summary}</p><p className="trail-character">{place.terrain}</p><SaveSnow slug={place.slug} name={place.name} compact/><Link className="rallii-text-link" href={`/snow/${place.slug}/`}>Open snow guide →</Link></article>}
