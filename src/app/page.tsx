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
  const stories = routes.filter((route) => ["glacier-express", "settle-carlisle", "douro-line", "cinque-terre", "first-passage-west"].includes(route.summary.slug));
  return <><SiteHeader /><main className="home-app"><section className="home-dashboard"><div className="site-shell"><div className="home-dashboard__identity"><p className="eyebrow">Curated rail journeys</p><h1>Where will the window take you?</h1><p>Know where to sit, what to see, and when to look.</p></div><nav className="story-strip" aria-label="Quick journey stories">{stories.map((route) => <Link key={route.summary.slug} href={`/routes/${route.summary.slug}`}><span><RouteMedia summary={route.summary} variant="card" /></span><b>{route.summary.name.replace(" Express", "")}</b></Link>)}</nav>{lead ? <article className="home-feature"><RouteMedia summary={lead.summary} variant="hero" /><div className="home-feature__body"><p className="eyebrow">Featured journey · {lead.summary.country}</p><h2>{lead.summary.name}</h2><p className="home-feature__route">{lead.summary.origin} → {lead.summary.destination}</p><div className="home-feature__meta"><span>{lead.summary.durationLabel ?? formatDuration(lead.summary.durationMinutes)}</span><span>{lead.summary.experienceTags[0].replaceAll("-", " ")}</span></div><div className="home-feature__actions"><Link className="cta-button focus-ring" href={`/routes/${lead.summary.slug}`}>Explore journey</Link><SaveRouteButton slug={lead.summary.slug} /></div></div></article> : null}<nav className="home-intent-grid" aria-label="Start with Rallii"><Link href="/discover"><b>Explore</b><span>Browse curated routes →</span></Link><Link href="/compare"><b>Compare</b><span>Two journeys, side by side →</span></Link><Link href="/plan"><b>Plan</b><span>Keep your shortlist →</span></Link></nav></div></section><section className="home-section"><div className="site-shell"><div className="screen-section-heading"><div><p className="eyebrow">Made for the view</p><h2>Journeys to remember</h2></div><Link className="text-link" href="/discover">See all</Link></div><div className="swipe-rail">{editorial.map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" />)}</div></div></section><section className="home-section"><div className="site-shell"><p className="eyebrow">Find your feeling</p><h2>Travel by mood</h2><div className="vibe-grid">{categories.map((category) => <Link key={category.slug} href={`/discover/${category.slug}`}><strong>{category.title.replace(" Journeys", "")}</strong><span>{category.routeSlugs.length} routes</span></Link>)}</div></div></section><section className="home-section home-difference"><div className="site-shell"><p className="eyebrow">Made for the moment</p><h2>See the journey differently.</h2><div className="difference-grid"><div><b>Best Side</b><p>Direction-aware seat guidance.</p></div><div><b>Timeline</b><p>Know exactly when to look.</p></div><div><b>Route Map</b><p>Stations and landmarks together.</p></div></div><Link className="cta-button" href="/plan">Start planning</Link></div></section></main></>;
}

function formatDuration(minutes: number): string { const hours = Math.floor(minutes / 60); const rest = minutes % 60; return rest ? `${hours} hr ${rest} min` : `${hours} hours`; }
