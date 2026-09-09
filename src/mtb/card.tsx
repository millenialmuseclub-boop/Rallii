import Link from "next/link";
import type { MtbDestination } from "./types";
import { MtbPhoto, MtbCredit } from "./photo";
import { SaveMtb } from "./save-mtb";
export function MtbCard({ ride }: { ride: MtbDestination }) {
  return <article className="trail-card mtb-card"><Link className="trail-card-photo" href={`/mtb/${ride.slug}/`} aria-label={`Explore ${ride.name}`}><MtbPhoto imageKey={ride.imageKey} /><span>{ride.kind}</span></Link><div className="trail-card-body"><p className="rallii-kicker">{ride.location}</p><h2><Link href={`/mtb/${ride.slug}/`}>{ride.name}</Link></h2><p className="mtb-card-summary">{ride.summary}</p><p className="trail-card-facts">{ride.skills.join(" · ")}</p><p className="trail-character">{ride.character}</p><SaveMtb slug={ride.slug} name={ride.name} compact /><MtbCredit imageKey={ride.imageKey} /></div></article>;
}
