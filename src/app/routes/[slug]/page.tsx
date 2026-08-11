import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoutePage } from "@/components/route-page";
import { getAllRoutes, getRouteBySlug } from "@/data/routes";

export const dynamicParams = false;
export function generateStaticParams() { return getAllRoutes().map((route) => ({ slug: route.summary.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const route = getRouteBySlug((await params).slug);
  if (!route) return {};
  const { summary } = route;
  const title = `${summary.name}: ${summary.origin} to ${summary.metadataDestination ?? summary.destination}`;
  const description = `Know where to sit, what to see, and when to look on the ${summary.name} from ${summary.origin} to ${summary.destination}.`;
  return { title, description, openGraph: { title: `${title} | Rallii`, description, siteName: "Rallii", type: "article" } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const route = getRouteBySlug((await params).slug);
  if (!route) notFound();
  const nextRoutes = getAllRoutes().filter((item) => item.summary.slug !== route.summary.slug).slice(0, 2);
  return <RoutePage route={route} nextRoutes={nextRoutes} />;
}
