import Link from "next/link";
import { RouteCard } from "@/components/route-card";
import { RouteMedia } from "@/components/route-media";
import { SiteHeader } from "@/components/site-header";
import { featuredRouteSlugs } from "@/data/featured-routes";
import { journeyCollections } from "@/data/journey-collections";
import { getAllRoutes } from "@/data/routes";
import { buildComparePath } from "@/data/route-relationships";

export default function HomePage() {
  const routes = getAllRoutes();
  const featuredRoutes = featuredRouteSlugs.map((slug) => routes.find((route) => route.summary.slug === slug)).filter((route) => route !== undefined);
  const [leadRoute, ...supportingRoutes] = featuredRoutes;

  return <><SiteHeader /><main>
    <section className="home-opening" aria-labelledby="home-title"><div className="site-shell home-opening__grid">
      <div className="home-opening__copy"><p className="eyebrow">Rail journeys, made visible</p><h1 id="home-title">Know where to sit, what to see, and when to look.</h1><p>Rallii turns remarkable train routes into clear, directional guides for the view outside your window.</p><div className="home-opening__actions"><Link className="cta-button focus-ring" href="/discover">Find a journey</Link><Link className="home-search-link focus-ring" href="/search"><span>Search routes, places, landmarks</span><b aria-hidden="true">⌕</b></Link></div></div>
      {leadRoute ? <article className="home-lead"><RouteMedia summary={leadRoute.summary} variant="hero" /><div className="home-lead__identity"><div><p className="eyebrow">Start here · {leadRoute.summary.country}</p><h2><Link className="focus-ring" href={`/routes/${leadRoute.summary.slug}`}>{leadRoute.summary.name}</Link></h2><p>{leadRoute.summary.origin} → {leadRoute.summary.destination} · {formatDuration(leadRoute.summary.durationMinutes)}</p></div><Link className="home-circle-link focus-ring" href={`/routes/${leadRoute.summary.slug}`} aria-label={`Explore ${leadRoute.summary.name}`}>→</Link></div></article> : null}
    </div></section>

    <section className="home-route-index" aria-labelledby="route-index-title"><div className="site-shell"><div className="section-heading"><div><p className="eyebrow">Seven prepared journeys</p><h2 id="route-index-title">Choose a window</h2></div><Link className="secondary-link focus-ring" href="/discover">Open Discover →</Link></div><nav aria-label="All Rallii journeys"><ol className="home-route-rail">{routes.map((route, index) => <li key={route.summary.slug}><Link className="focus-ring" href={`/routes/${route.summary.slug}`}><span>0{index + 1}</span><b>{route.summary.name}</b><small>{route.summary.country}<br />{route.summary.origin} → {route.summary.destination}</small><i aria-hidden="true">→</i></Link></li>)}</ol></nav></div></section>

    <section className="editorial-section home-alternatives" aria-labelledby="alternatives-title"><div className="site-shell"><div className="section-heading"><div><p className="eyebrow">Two different ways to travel</p><h2 id="alternatives-title">Journeys worth comparing</h2></div>{supportingRoutes.length === 2 ? <Link className="secondary-link focus-ring" href={buildComparePath(supportingRoutes[0].summary.slug, supportingRoutes[1].summary.slug)}>Compare these journeys →</Link> : null}</div><div className="home-alternative-grid">{supportingRoutes.map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" />)}</div></div></section>

    <section className="editorial-section" aria-labelledby="browse-title"><div className="site-shell"><p className="eyebrow">Browse by feeling</p><h2 id="browse-title">What do you want outside the window?</h2><div className="home-collection-links">{journeyCollections.map((collection) => <Link className="focus-ring" href={`/discover/${collection.slug}`} key={collection.slug}><span>{collection.title}</span><small>{collection.routeSlugs.length} {collection.routeSlugs.length === 1 ? "journey" : "journeys"}</small><b aria-hidden="true">→</b></Link>)}</div></div></section>

    <section className="editorial-section" aria-labelledby="tools-title"><div className="site-shell"><p className="eyebrow">Plan your way</p><h2 id="tools-title">From inspiration to the right train.</h2><div className="home-tool-grid"><Link className="home-tool focus-ring" href="/search"><span>01</span><h3>Search</h3><p>Find a route by country, village, landmark, or landscape.</p><b>Find a journey →</b></Link><Link className="home-tool focus-ring" href="/compare"><span>02</span><h3>Compare</h3><p>See duration, landscapes, reservations, and Best Side guidance together.</p><b>Compare two routes →</b></Link><Link className="home-tool focus-ring" href="/saved"><span>03</span><h3>My Journeys</h3><p>Keep Want to Go and Been routes privately on this device.</p><b>Open your library →</b></Link></div></div></section>

    <section className="home-closing"><div className="site-shell"><p className="eyebrow">The Rallii difference</p><h2>Look up at the right moment.</h2><div className="home-promises">{[["Sit", "Direction-aware seat guidance, section by section."], ["See", "Prepared landmarks tied directly to the route map."], ["Look", "A scenic timeline in the order you’ll experience it."]].map(([title, copy]) => <div key={title}><b>{title}</b><p>{copy}</p></div>)}</div><Link className="cta-button focus-ring" href="/discover">Choose your first journey</Link></div></section>
  </main></>;
}

function formatDuration(minutes: number): string { const hours = Math.floor(minutes / 60); const rest = minutes % 60; return rest ? `${hours} hr ${rest} min` : `${hours} hours`; }
