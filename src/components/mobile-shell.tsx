"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activityForPath, isFamilyPath } from "@/lib/activities";
import { ActivitySwitcher } from "./activity-switcher";
import { RalliiMark } from "./rallii-mark";

export function MobileShell() {
  const path = usePathname().replace(/\/$/, "") || "/";
  const family = isFamilyPath(path);
  const activity = activityForPath(path);
  const items = family
    ? [{ href: "/", label: "Explore", icon: "compass" }, { href: "/my-rallii", label: "Saved", icon: "save" }]
    : activity === "rail"
      ? [{ href: "/rail", label: "Rail home", icon: "home" }, { href: "/discover", label: "Discover", icon: "compass" }, { href: "/plan", label: "Plan", icon: "plan" }, { href: "/saved", label: "Saved", icon: "save" }]
      : activity === "green"
        ? [{ href: "/green", label: "Discover", icon: "compass" }, { href: "/green/map", label: "Map", icon: "map" }, { href: "/green/compare", label: "Compare", icon: "compare" }, { href: "/green/plan", label: "Plan", icon: "plan" }, { href: "/green/my-green", label: "Saved", icon: "save" }]
        : [{ href: `/${activity}`, label: "Discover", icon: "compass" }, { href: "/my-rallii", label: "Saved", icon: "save" }, { href: "/", label: "All activities", icon: "home" }];
  return <>
    <header className="phone-header">
      <Link href="/" className="phone-brand" aria-label="Rallii home"><RalliiMark title="Rallii" /><strong>Rallii</strong></Link>
      <ActivitySwitcher compact />
    </header>
    <nav className="phone-nav" aria-label={family ? "Rallii navigation" : `${activity === "mtb" ? "MTB" : activity.charAt(0).toUpperCase() + activity.slice(1)} navigation`}><ul>{items.map(item => {
      const active = path === item.href || (item.href === "/discover" && (path.startsWith("/routes/") || path.startsWith("/discover/"))) || (item.href === "/green" && /^\/green\/(courses|destinations|collections|trips)(\/|$)/.test(path)) || (item.href === `/${activity}` && !family && (activity === "trail" || activity === "mtb" || activity === "snow"));
      return <li key={item.href}><Link href={item.href} aria-current={active ? "page" : undefined}><ShellIcon kind={item.icon} /><span>{item.label}</span></Link></li>;
    })}</ul></nav>
  </>;
}

function ShellIcon({ kind }: { kind: string }) {
  const paths: Record<string, string> = { home: "m3 10 9-7 9 7v11H3z M9 21v-8h6v8", compass: "m16 8-3 5-5 3 3-5z", save: "M6 3h12v18l-6-4-6 4z", map: "m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2z M9 3v16 M15 5v16", compare: "M4 7h16m-4-4 4 4-4 4 M20 17H4m4-4-4 4 4 4", plan: "M5 4h14v17H5z M8 9h8 M8 13h8 M8 17h5" };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{kind === "compass" ? <circle cx="12" cy="12" r="10" /> : null}<path d={paths[kind]} /></svg>;
}
