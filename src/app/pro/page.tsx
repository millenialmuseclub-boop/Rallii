import type { Metadata } from "next";
import { AppScreenShell } from "@/components/app-screen-shell";
import { ProMembership } from "@/components/pro-membership";
export const metadata: Metadata = { title: "Rallii Pro", description: "One membership for Rail, Green, Trail, MTB and Snow." };
export default function ProPage() {
  return <AppScreenShell title="Rallii Pro" context="Private trip collections, notes and more Rail saves." backHref="/my-rallii/" backLabel="My Rallii" family><ProMembership /></AppScreenShell>;
}
