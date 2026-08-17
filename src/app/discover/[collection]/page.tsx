import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RouteCard } from "@/components/route-card";
import { RouteMedia } from "@/components/route-media";
import { AppScreenShell } from "@/components/app-screen-shell";
import { getCollectionCover, getCollectionRoutes, getJourneyCollection, getRelatedCollections, journeyCollections } from "@/data/journey-collections";
import { getAllRoutes } from "@/data/routes";
import { buildComparePath } from "@/data/route-relationships";

export const dynamicParams = false;
export function generateStaticParams() { return journeyCollections.map(({ slug }) => ({ collection: slug })); }
export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> { const collection = getJourneyCollection((await params).collection); return collection ? { title: collection.title, description: collection.description } : {}; }
export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const collection = getJourneyCollection((await params).collection); if (!collection) notFound();
  const routes = getCollectionRoutes(collection, getAllRoutes());
  const neighbors = getRelatedCollections(collection);
  const allRoutes = getAllRoutes(); const cover = getCollectionCover(collection, allRoutes);
  return <AppScreenShell title={collection.title} context={`${routes.length} ${routes.length === 1 ? "journey" : "journeys"} · ${collection.description}`} backHref="/discover" backLabel="Discover">{cover ? <section className="collection-hero" aria-label={`${collection.title} introduction`}><RouteMedia summary={cover.summary} variant="hero" /><div><p className="eyebrow">Curated collection</p><h2>{collection.title}</h2><p>{collection.description}</p></div></section> : null}<div className="app-screen-actions">{routes.length > 1 ? <Link className="cta-button focus-ring" href={buildComparePath(routes[0].summary.slug, routes[1].summary.slug)}>Compare this collection</Link> : null}<Link className="action-button focus-ring" href="/plan">Plan a journey</Link></div><div className="compact-route-grid">{routes.map((route) => <RouteCard key={route.summary.slug} route={route} variant="compact" showStays />)}</div>{neighbors.length ? <section className="section-space border-t border-stone-300 pt-12" aria-labelledby="neighbor-title"><p className="eyebrow">Keep browsing</p><h2 id="neighbor-title" className="mt-2 font-serif text-4xl">Related collections</h2><div className="catalogue-collection-grid mt-6">{neighbors.map((item) => { const neighborCover = getCollectionCover(item, allRoutes); return <article className="catalogue-collection-card" key={item.slug}>{neighborCover ? <RouteMedia summary={neighborCover.summary} variant="card" /> : null}<div><strong>{item.title}</strong><span>{item.routeSlugs.length} journeys</span><Link className="focus-ring" href={`/discover/${item.slug}`}>Explore <span aria-hidden="true">→</span></Link></div></article>; })}</div><Link className="primary-link mt-8" href="/discover/collections">View all collections →</Link></section> : null}</AppScreenShell>;
}
