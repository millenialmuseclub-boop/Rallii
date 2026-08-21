import type { Metadata } from "next";
import { AppScreenShell } from "@/components/app-screen-shell";
import { PlanJourney } from "@/components/plan-journey";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = { title: "Plan Your Journey", description: "Keep rail ideas together and arrange the practical pieces around them." };

export default function PlanPage() {
  return <AppScreenShell title="Plan Your Journey" context="Keep your rail ideas together, then arrange the practical pieces around them." backHref="/" backLabel="Home" mediaKey="plan"><PlanJourney routes={getAllRoutes()} /></AppScreenShell>;
}
