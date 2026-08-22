"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavigationItemActive, primaryNavigation } from "@/data/navigation";

export function PrimaryNavigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  return (
    <nav className={mobile ? "mobile-nav" : "desktop-nav"} aria-label={mobile ? "Mobile navigation" : "Primary navigation"}>
      <ul>
        {primaryNavigation.map((item) => {
          const active = isNavigationItemActive(pathname, item.href);
          return <li key={item.href}><Link className="nav-link focus-ring" href={item.href} aria-current={active ? "page" : undefined}>{mobile ? <NavigationIcon href={item.href} /> : null}<span>{item.label}</span></Link></li>;
        })}
      </ul>
    </nav>
  );
}

function NavigationIcon({ href }: { href: string }) {
  if (href === "/") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 10 8-6 8 6v9H4z" /><path d="M9 19v-6h6v6" /></svg>;
  if (href === "/discover") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="m15 9-2 4-4 2 2-4z" /></svg>;
  if (href === "/plan") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v16H6z" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>;
}
