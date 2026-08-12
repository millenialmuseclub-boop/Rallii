import Link from "next/link";
import { JourneyCollections } from "@/components/journey-collections";
import { RouteCard } from "@/components/route-card";
import { SiteHeader } from "@/components/site-header";
import { featuredRouteSlugs } from "@/data/featured-routes";
import { getAllRoutes } from "@/data/routes";

export default function HomePage() {
  const routes = getAllRoutes();
  const featuredRoutes = featuredRouteSlugs.map((slug) => routes.find((route) => route.summary.slug === slug)).filter((route) => route !== undefined);
  return <><SiteHeader /><main>
    <section className="home-hero"><div className="site-shell"><p className="eyebrow">Curated rail journeys</p><h1>Rallii</h1><p className="home-promise">Know where to sit, what to see, and when to look.</p><p className="home-intro">Extraordinary railway journeys, curated around the experience outside your window.</p><div className="mt-9 flex flex-wrap gap-5"><Link className="cta-button focus-ring" href="/discover">Explore journeys</Link><Link className="secondary-link focus-ring" href="/search">Search Rallii <span aria-hidden="true">→</span></Link></div></div></section>
    <section className="editorial-section" aria-labelledby="featured-title"><div className="site-shell"><div className="section-heading"><div><p className="eyebrow">Curated for Rallii</p><h2 id="featured-title">Three journeys to begin with</h2></div><Link className="primary-link focus-ring" href="/discover">View all seven journeys <span aria-hidden="true">→</span></Link></div><div className="featured-grid">{featuredRoutes.map((route) => <RouteCard key={route.summary.slug} route={route} variant="featured" />)}</div></div></section>
    <section className="editorial-section" aria-labelledby="start-title"><div className="site-shell"><p className="eyebrow">Start with the journey you need</p><h2 id="start-title">Find your way into Rallii</h2><div className="editorial-paths">{[["Discover", "Browse by place, scenery, and time.", "/discover"], ["Search", "Find a route, landmark, or destination.", "/search"], ["Compare", "Put two journeys side by side.", "/compare"]].map(([title,copy,href], index) => <Link className="editorial-path focus-ring" href={href} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><b aria-hidden="true">→</b></Link>)}</div><JourneyCollections routes={routes} limit={3} /></div></section>
    <section className="editorial-section" aria-labelledby="why-title"><div className="site-shell"><p className="eyebrow">Why Rallii</p><h2 id="why-title">See more from the journey.</h2><div className="differentiators">{[["Know where to sit","Directional seat-view guidance that changes with the journey."],["Know what’s coming","Scenic landmarks arranged in the order you’ll meet them."],["Know when to look","A calm timeline for the moments worth your attention."]].map(([title,copy],i) => <div key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div><div className="library-invitation"><div><p className="eyebrow">Your private rail library</p><h3>Keep the journeys that matter to you.</h3><p>Save ideas, remember routes you’ve traveled, and see them together on My Rail Map.</p></div><Link className="cta-button focus-ring" href="/saved">Open My Journeys</Link></div></div></section>
  </main></>;
}
