import Link from "next/link";
import { RouteMedia } from "@/components/route-media";
import { getGuideRoutes, type JourneyGuide } from "@/data/journey-guides";
import type { RailRoute } from "@/types/route";

export function JourneyGuides({ guides, routes, limit }: { guides: readonly JourneyGuide[]; routes: readonly RailRoute[]; limit?: number }) {
  return <section className="journey-guides" aria-labelledby="journey-guides-title"><div className="section-heading"><div><p className="eyebrow">Journey guides</p><h2 id="journey-guides-title">A few journeys, one bigger trip idea</h2></div><Link className="secondary-link focus-ring" href="/guides">View all guides →</Link></div><div className="journey-guide-grid">{guides.slice(0, limit).map((guide) => {
    const cover = routes.find((route) => route.summary.slug === guide.coverRouteSlug);
    const guideRoutes = getGuideRoutes(guide, routes);
    return <article className="journey-guide-card" key={guide.slug}>{cover ? <RouteMedia summary={cover.summary} variant="card" /> : null}<div><p className="eyebrow">{guide.eyebrow}</p><h3>{guide.title}</h3><p>{guide.description}</p><small>{guideRoutes.map((route) => route.summary.name).join(" → ")}</small><Link className="primary-link focus-ring" href={`/guides/${guide.slug}`}>Open guide <span aria-hidden="true">→</span></Link></div></article>;
  })}</div></section>;
}
