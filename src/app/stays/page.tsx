import type { Metadata } from "next";
import { AppScreenShell } from "@/components/app-screen-shell";
import { StayPlanner } from "@/components/stay-planner";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Find Places to Stay", description: "Find accommodation near prepared cities along a Rallii rail journey." };

export default async function StaysPage({ searchParams }: PageProps<"/stays">) {
  const { route } = await searchParams;
  return <AppScreenShell title="Find Places to Stay" context="Choose a useful base along your rail journey." backHref="/plan" backLabel="Plan"><StayPlanner routes={getAllRoutes()} initialRouteSlug={typeof route === "string" ? route : undefined} /></AppScreenShell>;
}
