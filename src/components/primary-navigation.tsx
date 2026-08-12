"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavigationItemActive, primaryNavigation } from "@/data/navigation";

export function PrimaryNavigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  return <nav className={mobile ? "mobile-nav" : "desktop-nav"} aria-label={mobile ? "Mobile navigation" : "Primary navigation"}><ul>{primaryNavigation.map((item) => { const active = isNavigationItemActive(pathname, item.href); return <li key={item.href}><Link className="nav-link focus-ring" href={item.href} aria-current={active ? "page" : undefined}><NavIcon name={item.label} /><span>{item.label}</span></Link></li>; })}</ul></nav>;
}

function NavIcon({ name }: { name: string }) {
  if (name === "Home") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 11 8.5-7 8.5 7v8.5H15v-5h-6v5H3.5Z" /></svg>;
  if (name === "Discover") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8Z" /></svg>;
  if (name === "Search") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.25" /><path d="m15.5 15.5 4 4" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5h12v15l-6-3.5-6 3.5Z" /></svg>;
}
