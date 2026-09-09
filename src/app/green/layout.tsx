import type { Metadata } from "next";
import { SiteShell } from "@/green/components/site-shell";

export const metadata: Metadata = {
  title: { default: "Rallii Green — Remarkable Places to Play", template: "%s | Rallii Green" },
  description: "Discover remarkable golf courses and plan the journey around them.",
};

export default function GreenLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
