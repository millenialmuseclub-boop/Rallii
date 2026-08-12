"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/discover", label: "Discover", icon: CompassIcon },
  { href: "/search", label: "Search", icon: SearchIcon },
  { href: "/saved", label: "Saved", icon: BookmarkIcon },
] as const;

export function MobileNavigation() {
  const pathname = usePathname();
  return <nav className="mobile-nav" aria-label="Mobile navigation"><ul>{items.map(({ href, label, icon: Icon }) => { const active = pathname === href; return <li key={href}><Link href={href} aria-current={active ? "page" : undefined}><Icon /><span>{label}</span></Link></li>; })}</ul></nav>;
}

function CompassIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="m15 9-2 4-4 2 2-4 4-2Z" /></svg>; }
function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 4 4" /></svg>; }
function BookmarkIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v16l-5-3-5 3V4Z" /></svg>; }
