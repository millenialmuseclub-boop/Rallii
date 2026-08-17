import { getLoreForRoute } from "@/data/lore";
import { getPlacesForRoute } from "@/data/places";
import { getScenicMoments } from "@/data/scenic-moments";
import { RouteMedia } from "@/components/route-media";
import type { RailRoute } from "@/types/route";

export function RouteIntelligence({ route }: { route: RailRoute }) {
  const lore = getLoreForRoute(route.summary.slug);
  if (!lore.length) return null;
  const places = getPlacesForRoute(route).filter((place) => lore.some((entry) => entry.placeIds.includes(place.id))).slice(0, 4);
  const momentCount = getScenicMoments(route).filter((moment) => moment.alertEligible).length;
  return <section className="route-intelligence section-space" aria-labelledby="intelligence-title"><div className="section-heading"><div><p className="eyebrow">Places & Rallii Lore</p><h2 id="intelligence-title" className="mt-2 font-serif text-4xl sm:text-5xl">Read the railway landscape</h2></div>{momentCount ? <p>{momentCount} prepared Scenic Alerts</p> : null}</div>
    <div className="place-grid">{places.map((place) => <article className="place-card" key={place.id}><span>{place.type.replaceAll("-", " ")}</span><h3>{place.name}</h3><p>{place.description}</p><small>{place.railwaySignificance}</small></article>)}</div>
    <div className="lore-list">{lore.map((entry, index) => <details key={entry.id}><summary><span>{entry.category}</span><strong>{entry.title}</strong><small>{entry.summary}</small></summary><div>{index === 0 && entry.imageRouteSlug ? <RouteMedia summary={route.summary} variant="card" /> : null}<p>{entry.body}</p><a href={entry.source.url} target="_blank" rel="noreferrer">Source: {entry.source.label}</a><small>Editorial confidence · Checked {entry.source.retrievedAt}</small></div></details>)}</div>
  </section>;
}
