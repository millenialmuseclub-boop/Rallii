import type { Metadata } from "next";
import { AppScreenShell } from "@/components/app-screen-shell";
import { ProMembership } from "@/components/pro-membership";
export const metadata: Metadata = { title: "Rallii Pro", description: "One membership for Rail, Green and every supported Rallii experience." };
export default function ProPage() {
  return <AppScreenShell title="Rallii Pro" context="Discover, plan and experience more, together." backHref="/my-rallii/" backLabel="My Rallii" family><ProMembership /></AppScreenShell>;
}
