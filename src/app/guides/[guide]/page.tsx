import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppScreenShell } from "@/components/app-screen-shell";
import { RouteCard } from "@/components/route-card";
import { RouteMedia } from "@/components/route-media";
import { getGuideRoutes, getJourneyGuide, journeyGuides } from "@/data/journey-guides";
import { getJourneyCollection } from "@/data/journey-collections";
import { getAllRoutes } from "@/data/routes";
import { getScenicMoments } from "@/data/scenic-moments";

export function generateStaticParams() { return journeyGuides.map((guide) => ({ guide: guide.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ guide: string }> }): Promise<Metadata> { const guide = getJourneyGuide((await params).guide); return guide ? { title: guide.title, description: guide.description } : {}; }

export default async function JourneyGuidePage({ params }: { params: Promise<{ guide: string }> }) {
  const guide = getJourneyGuide((await params).guide); if (!guide) notFound();
  const allRoutes = getAllRoutes(); const routes = getGuideRoutes(guide, allRoutes); const cover = allRoutes.find((route) => route.summary.slug === guide.coverRouteSlug);
  const scenes = routes.flatMap((route) => getScenicMoments(route).filter((moment) => moment.importance !== "normal").slice(0, 2).map((moment) => ({ route, moment }))).slice(0, 5);
  const collections = guide.collectionSlugs.map(getJourneyCollection).filter((collection) => collection !== undefined);
  return <AppScreenShell title={guide.title} context={guide.description} backHref="/guides" backLabel="Guides"><section className="guide-hero">{cover ? <RouteMedia summary={cover.summary} variant="hero" /> : null}<div><p className="eyebrow">{guide.eyebrow}</p><h2>{guide.title}</h2><p>{guide.description}</p></div></section><section className="guide-sequence" aria-labelledby="guide-sequence-title"><p className="eyebrow">Suggested journey sequence</p><h2 id="guide-sequence-title">Follow the landscape</h2><ol>{routes.map((route, index) => <li key={route.summary.slug}><span>{index + 1}</span><div><strong>{route.summary.name}</strong><small>{route.summary.origin} → {route.summary.destination}</small></div><Link className="text-link focus-ring" href={`/routes/${route.summary.slug}`}>Explore</Link></li>)}</ol><p className="guide-connection-note">{guide.connectionNote}</p></section><section className="guide-scenes" aria-labelledby="guide-scenes-title"><p className="eyebrow">Scenes along the way</p><h2 id="guide-scenes-title">Where to look</h2><div>{scenes.map(({ route, moment }) => <article key={`${route.summary.slug}-${moment.id}`}><small>{route.summary.name}</small><strong>{moment.title}</strong><p>{moment.description}</p><Link className="text-link focus-ring" href={`/routes/${route.summary.slug}`}>Open route →</Link></article>)}</div></section><section className="section-space" aria-labelledby="guide-routes-title"><p className="eyebrow">The journeys</p><h2 id="guide-routes-title">Explore each rail experience</h2><div className="compact-route-grid">{routes.map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" showStays />)}</div></section>{collections.length ? <nav className="guide-collections" aria-label="Related collections">{collections.map((collection) => <Link className="context-link focus-ring" key={collection.slug} href={`/discover/${collection.slug}`}>{collection.title}</Link>)}</nav> : null}<div className="app-screen-actions"><Link className="cta-button focus-ring" href={`/plan?route=${routes[0]?.summary.slug ?? ""}`}>Plan a journey</Link><Link className="action-button focus-ring" href={`/stays?route=${routes[0]?.summary.slug ?? ""}`}>Find stays</Link></div></AppScreenShell>;
}
