import Link from "next/link";
import { RouteCard } from "@/components/route-card";
import { RouteMedia } from "@/components/route-media";
import { SaveRouteButton } from "@/components/save-route-button";
import { SiteHeader } from "@/components/site-header";
import { featuredRouteSlugs } from "@/data/featured-routes";
import { journeyCollections } from "@/data/journey-collections";
import { getAllRoutes } from "@/data/routes";

const categorySlugs = ["mountain-journeys", "coastal-journeys", "river-journeys", "short-scenic-escapes", "multi-day-journeys"];

export default function HomePage() {
  const routes = getAllRoutes();
  const featured = featuredRouteSlugs.map((slug) => routes.find((route) => route.summary.slug === slug)).filter((route) => route !== undefined);
  const lead = featured[0];
  const editorial = routes.filter((route) => ["douro-line", "tranzalpine", "cinque-terre", "first-passage-west"].includes(route.summary.slug));
  const categories = journeyCollections.filter((item) => categorySlugs.includes(item.slug));
  return <><SiteHeader /><main className="home-app"><section className="home-dashboard"><div className="site-shell"><div className="home-dashboard__identity"><p className="eyebrow">Rallii</p><h1>Know where to sit, what to see, and when to look.</h1><p>Directional guides for remarkable train journeys.</p></div>{lead ? <article className="home-feature"><RouteMedia summary={lead.summary} variant="hero" /><div className="home-feature__body"><p className="eyebrow">Featured journey · {lead.summary.country}</p><h2>{lead.summary.name}</h2><p className="home-feature__route">{lead.summary.origin} → {lead.summary.destination} · {lead.summary.durationLabel ?? formatDuration(lead.summary.durationMinutes)}</p><p>{lead.summary.bestFor[0]}.</p><div className="home-feature__actions"><Link className="cta-button focus-ring" href={`/routes/${lead.summary.slug}`}>Explore journey</Link><Link className="action-button focus-ring" href={`/compare?routes=${lead.summary.slug}`}>Compare</Link><SaveRouteButton slug={lead.summary.slug} /></div></div></article> : null}<nav className="home-intent-grid" aria-label="Start with Rallii"><Link href="/discover"><b>Find a journey</b><span>Browse by landscape, place, or length →</span></Link><Link href="/compare"><b>Compare journeys</b><span>Put two experiences side by side →</span></Link><Link href="/plan"><b>Plan a journey</b><span>Save routes and arrange practical details →</span></Link></nav></div></section><section className="home-section"><div className="site-shell"><div className="screen-section-heading"><div><p className="eyebrow">Selected for you</p><h2>Four journeys to start with</h2></div><Link className="text-link" href="/discover">View all journeys</Link></div><div className="compact-route-grid">{editorial.map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" />)}</div></div></section><section className="home-section"><div className="site-shell"><p className="eyebrow">Browse by experience</p><h2>What belongs outside your window?</h2><div className="category-grid">{categories.map((category) => <Link key={category.slug} href={`/discover/${category.slug}`}><strong>{category.title}</strong><span>{category.routeSlugs.length} {category.routeSlugs.length === 1 ? "journey" : "journeys"}</span><b aria-hidden="true">→</b></Link>)}</div></div></section><section className="home-section home-difference"><div className="site-shell"><p className="eyebrow">The Rallii difference</p><h2>One journey, made easier to experience.</h2><div className="difference-grid"><div><b>Best Side to Sit</b><p>Directional guidance by route segment.</p></div><div><b>Scenic Timeline</b><p>The moments worth looking up for, in order.</p></div><div><b>Interactive Railway Map</b><p>Prepared geometry, stations, and landmarks together.</p></div></div><Link className="cta-button" href="/plan">Plan your journey</Link></div></section></main></>;
}

function formatDuration(minutes: number): string { const hours = Math.floor(minutes / 60); const rest = minutes % 60; return rest ? `${hours} hr ${rest} min` : `${hours} hours`; }
