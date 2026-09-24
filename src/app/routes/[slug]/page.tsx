import { journeyMetadata } from "@/lib/journey-metadata";
import { getRouteMedia } from "@/data/route-media";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoutePage } from "@/components/route-page";
import { getAllRoutes, getRouteBySlug } from "@/data/routes";
import type { RailRoute } from "@/types/route";
import { getRouteRelationships } from "@/data/route-relationships";

export const dynamicParams = false;
export function generateStaticParams() { return getAllRoutes().map((route) => ({ slug: route.summary.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const route = getRouteBySlug((await params).slug);
  if (!route) return {};
  const { summary } = route;
  const title = `${summary.name}: ${summary.origin} to ${summary.metadataDestination ?? summary.destination}`;
  const description = summary.metadataDescription ?? `Know where to sit, what to see, and when to look on the ${summary.name} from ${summary.origin} to ${summary.destination}.`;
  const media = getRouteMedia(summary.slug);
  return journeyMetadata({ title, description, path: `/routes/${summary.slug}/`, image: media ? { ...media, src: media.path } : undefined });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const route = getRouteBySlug((await params).slug);
  if (!route) notFound();
  const nextRoutes = getRouteRelationships(route.summary.slug).map((relationship) => ({ route: getRouteBySlug(relationship.slug), reason: relationship.reason })).filter((item): item is { route: RailRoute; reason: string } => Boolean(item.route));
  return <RoutePage route={route} nextRoutes={nextRoutes} />;
}
