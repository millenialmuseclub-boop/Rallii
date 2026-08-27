export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/plan", label: "Plan" },
  { href: "/saved", label: "Saved" },
] as const;

export const secondaryNavigation = [{ href: "/gear", label: "Rail Gear" }] as const;

export function isNavigationItemActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
