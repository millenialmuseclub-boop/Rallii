import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RouteCard } from "@/components/route-card";
import { SiteHeader } from "@/components/site-header";
import { getCollectionRoutes, getJourneyCollection, journeyCollections } from "@/data/journey-collections";
import { getAllRoutes } from "@/data/routes";

export const dynamicParams = false;
export function generateStaticParams() { return journeyCollections.map(({ slug }) => ({ collection: slug })); }
export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> { const collection = getJourneyCollection((await params).collection); return collection ? { title: collection.title, description: collection.description } : {}; }
export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) { const collection = getJourneyCollection((await params).collection); if (!collection) notFound(); const routes = getCollectionRoutes(collection, getAllRoutes()); return <><SiteHeader /><main className="site-shell py-14 pb-28 sm:py-20"><p className="eyebrow">Discover collection</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">{collection.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">{collection.description}</p><div className="mt-10 grid gap-7 lg:grid-cols-2">{routes.map((route) => <RouteCard key={route.summary.slug} route={route} />)}</div></main></>; }
