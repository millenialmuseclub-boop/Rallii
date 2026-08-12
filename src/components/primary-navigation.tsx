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
          return <li key={item.href}><Link className="nav-link focus-ring" href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link></li>;
        })}
      </ul>
    </nav>
  );
}
