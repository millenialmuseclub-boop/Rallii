import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RouteCard } from "@/components/route-card";
import { SiteHeader } from "@/components/site-header";
import { getCollectionRoutes, getJourneyCollection, getRelatedCollections, journeyCollections } from "@/data/journey-collections";
import { getAllRoutes } from "@/data/routes";
import { buildComparePath } from "@/data/route-relationships";

export const dynamicParams = false;
export function generateStaticParams() { return journeyCollections.map(({ slug }) => ({ collection: slug })); }
export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> { const collection = getJourneyCollection((await params).collection); return collection ? { title: collection.title, description: collection.description } : {}; }
export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const collection = getJourneyCollection((await params).collection); if (!collection) notFound();
  const routes = getCollectionRoutes(collection, getAllRoutes());
  const neighbors = getRelatedCollections(collection);
  return <><SiteHeader /><main className="site-shell page-intro"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/discover">Discover</Link><span aria-hidden="true">/</span><span>{collection.title}</span></nav><p className="eyebrow mt-8">Editorial collection</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">{collection.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">{collection.description}</p><div className="mt-8 flex flex-wrap gap-3"><Link className="secondary-link focus-ring" href="/discover">Back to Discover</Link>{routes.length > 1 ? <Link className="cta-button focus-ring" href={buildComparePath(routes[0].summary.slug, routes[1].summary.slug)}>Compare journeys in this collection</Link> : null}</div><div className="mt-12 grid gap-7 lg:grid-cols-2">{routes.map((route) => <RouteCard key={route.summary.slug} route={route} />)}</div>{neighbors.length ? <section className="section-space border-t border-stone-300 pt-12" aria-labelledby="neighbor-title"><p className="eyebrow">Keep browsing</p><h2 id="neighbor-title" className="mt-2 font-serif text-4xl">Related collections</h2><div className="mt-6 flex flex-wrap gap-3">{neighbors.map((item) => <Link className="context-link focus-ring" href={`/discover/${item.slug}`} key={item.slug}>{item.title} →</Link>)}</div></section> : null}</main></>;
}
