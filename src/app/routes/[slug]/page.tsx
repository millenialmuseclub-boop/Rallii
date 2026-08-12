import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoutePage } from "@/components/route-page";
import { getAllRoutes, getRouteBySlug } from "@/data/routes";
import type { RailRoute } from "@/types/route";

export const dynamicParams = false;
export function generateStaticParams() { return getAllRoutes().map((route) => ({ slug: route.summary.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const route = getRouteBySlug((await params).slug);
  if (!route) return {};
  const { summary } = route;
  const title = `${summary.name}: ${summary.origin} to ${summary.metadataDestination ?? summary.destination}`;
  const description = summary.metadataDescription ?? `Know where to sit, what to see, and when to look on the ${summary.name} from ${summary.origin} to ${summary.destination}.`;
  return { title, description, alternates: { canonical: `/routes/${summary.slug}` }, openGraph: { title: `${title} | Rallii`, description, siteName: "Rallii", type: "article", url: `/routes/${summary.slug}` }, twitter: { card: "summary", title: `${title} | Rallii`, description } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const route = getRouteBySlug((await params).slug);
  if (!route) notFound();
  const relatedSlugs = route.relatedRouteSlugs ?? getAllRoutes().filter((item) => item.summary.slug !== route.summary.slug).map((item) => item.summary.slug);
  const nextRoutes = relatedSlugs.map(getRouteBySlug).filter((item): item is RailRoute => Boolean(item)).slice(0, 2);
  return <RoutePage route={route} nextRoutes={nextRoutes} />;
}
