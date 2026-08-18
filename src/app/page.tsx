import Link from "next/link";
import { RouteMedia } from "@/components/route-media";
import { SaveRouteButton } from "@/components/save-route-button";
import { SiteHeader } from "@/components/site-header";
import { featuredRouteSlugs } from "@/data/featured-routes";
import { getCollectionCover, getCollectionRoutes, journeyCollections } from "@/data/journey-collections";
import { getAllRoutes } from "@/data/routes";

const categorySlugs = ["mountain-journeys", "coastal-journeys", "river-journeys", "short-scenic-escapes", "multi-day-journeys"];
const homeActions = [
  { href: "/discover", label: "Find a journey", description: "Browse remarkable routes by place, landscape, or time.", routeSlug: "glacier-express" },
  { href: "/compare", label: "Compare journeys", description: "Put the scenery, pace, and practical details side by side.", routeSlug: "bergen-line" },
  { href: "/plan", label: "Plan a journey", description: "Keep the inspiration close while you arrange the trip.", routeSlug: "douro-line" },
] as const;

export default function HomePage() {
  const routes = getAllRoutes();
  const featured = featuredRouteSlugs.map((slug) => routes.find((route) => route.summary.slug === slug)).filter((route) => route !== undefined);
  const lead = featured[0];
  const visualAlternatives = featured.slice(1);
  const categories = journeyCollections.filter((item) => categorySlugs.includes(item.slug) && item.slug !== "coastal-journeys");
  const homeCollection = journeyCollections.find((item) => item.slug === "coastal-journeys");
  const collectionCover = homeCollection ? getCollectionRoutes(homeCollection, routes)[0] : undefined;
  const actions = homeActions.map((action) => ({ ...action, route: routes.find((route) => route.summary.slug === action.routeSlug) })).filter((action) => action.route !== undefined);

  return <><SiteHeader /><main className="home-app">
    <section className="home-dashboard"><div className="site-shell">
      <div className="home-dashboard__identity"><p className="eyebrow">Rallii · Curated rail journeys</p><h1>Know where to sit, what to see, and when to look.</h1><p>Directional guides for remarkable train journeys.</p></div>
      {lead ? <article className="home-feature home-feature--immersive"><RouteMedia summary={lead.summary} variant="hero" /><div className="home-feature__body"><p className="eyebrow">Featured journey · {lead.summary.country}</p><h2>{lead.summary.name}</h2><p className="home-feature__route">{lead.summary.origin} → {lead.summary.destination} · {lead.summary.durationLabel ?? formatDuration(lead.summary.durationMinutes)}</p><p>{lead.summary.bestFor[0]}.</p><div className="home-feature__actions"><Link className="cta-button focus-ring" href={`/routes/${lead.summary.slug}`}>Explore journey</Link><Link className="action-button focus-ring" href={`/compare?routes=${lead.summary.slug}`}>Compare</Link><SaveRouteButton slug={lead.summary.slug} /></div></div></article> : null}
      {visualAlternatives.length ? <section className="home-visual-alternatives" aria-label="More featured journeys">{visualAlternatives.map((route) => <Link key={route.summary.slug} className="home-visual-alternative focus-ring" href={`/routes/${route.summary.slug}`}><RouteMedia summary={route.summary} variant="card" /><span><small>{route.summary.country}</small><strong>{route.summary.name}</strong><b>Explore →</b></span></Link>)}</section> : null}
      <nav className="home-action-grid" aria-label="Start with Rallii">{actions.map((action) => action.route ? <Link key={action.href} className="home-action-tile focus-ring" href={action.href}><RouteMedia summary={action.route.summary} variant="card" /><span><small>Rallii tools</small><strong>{action.label}</strong><em>{action.description}</em><b>Open →</b></span></Link> : null)}</nav>
      <aside className="home-pro-note"><div><p className="eyebrow">Rallii Pro</p><strong>A quieter way to keep your rail plans together.</strong><p>Prepared for deeper organization, not a paywall around discovery.</p></div><Link className="text-link focus-ring" href="/pro">See Pro</Link></aside>
    </div></section>
    <section className="home-section"><div className="site-shell"><p className="eyebrow">Browse by experience</p><h2>What belongs outside your window?</h2>{homeCollection && collectionCover ? <article className="home-collection-feature"><RouteMedia summary={collectionCover.summary} variant="card" /><div><p className="eyebrow">Editorial collection</p><h3>{homeCollection.title}</h3><p>{homeCollection.description}</p><Link className="primary-link focus-ring" href={`/discover/${homeCollection.slug}`}>Explore {homeCollection.title} <span aria-hidden="true">→</span></Link></div></article> : null}<div className="category-grid category-grid--visual">{categories.map((category) => { const cover = getCollectionCover(category, routes); return <Link key={category.slug} href={`/discover/${category.slug}`}>{cover ? <RouteMedia summary={cover.summary} variant="card" /> : null}<span><strong>{category.title}</strong><small>{category.routeSlugs.length} {category.routeSlugs.length === 1 ? "journey" : "journeys"}</small><b aria-hidden="true">Explore →</b></span></Link>; })}</div></div></section>
    <section className="home-section home-difference"><div className="site-shell"><p className="eyebrow">The Rallii difference</p><h2>One journey, made easier to experience.</h2><div className="difference-grid"><div><b>Best Side to Sit</b><p>Directional guidance by route segment.</p></div><div><b>Scenic Timeline</b><p>The moments worth looking up for, in order.</p></div><div><b>Interactive Railway Map</b><p>Prepared geometry, stations, and landmarks together.</p></div></div></div></section>
  </main></>;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} hr ${rest} min` : `${hours} hours`;
}
